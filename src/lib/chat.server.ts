import { convertToModelMessages, type UIMessage } from "ai";
import { z } from "zod";

import { createResponsesCall } from "./ai/responses";
import { PORTFOLIO_KNOWLEDGE } from "./portfolio-knowledge";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";

const SYSTEM_PROMPT = `You are the portfolio assistant for Deep Punj, PhD, a physics-informed data scientist and AI specialist. You answer recruiters' questions about Deep's background, skills, and projects.

RULES:
- Ground every answer strictly in the PORTFOLIO CONTENT below. Never invent employers, dates, publications, metrics, links, or credentials that are not in it.
- If something is not covered (e.g. salary expectations, availability, specific employment history), say briefly that it is not covered here and suggest emailing deep.punj@example.com.
- Write like a knowledgeable, warm colleague of Deep — confident and specific, never salesy.
- Keep answers tight: at most 4 short sentences plus, when useful, one compact bullet list. Recruiters skim.
- Plain text only. No markdown headings or code blocks.

PORTFOLIO CONTENT:
${PORTFOLIO_KNOWLEDGE}`;

/** Bounded in-memory rate limiter: 10 requests per 5 minutes per IP. */
const WINDOW_MS = 5 * 60 * 1000;
const MAX_REQUESTS = 10;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

const messageSchema = z.object({
  id: z.string().min(1),
  role: z.enum(["user", "assistant", "system"]),
  parts: z.array(z.object({ type: z.string() }).passthrough()),
}).passthrough();

const bodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(24),
});

export async function handleChat(request: Request): Promise<Response> {
  console.log("[chat] handler entered");
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return Response.json({ error: "Too many questions — please try again in a few minutes." }, { status: 429 });
  }

  let parsed: z.infer<typeof bodySchema>;
  try {
    parsed = bodySchema.parse(await request.json());
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  console.log("[chat] request parsed:", parsed.messages.length, "messages");


  const messages = parsed.messages as unknown as UIMessage[];
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const questionText = lastUser?.parts
    ?.filter((p) => p.type === "text")
    .map((p) => (p as { text?: string }).text ?? "")
    .join(" ")
    .slice(0, 2000)
    .trim();

  // Log the question (and later its answer summary); never blocks or breaks the stream.
  const logged = questionText ? logQuestion(questionText) : null;
  if (logged) {
    logged.catch((error) => console.error("question log failed:", error));
  }

  const { result, response } = createResponsesCall(
    request,
    { baseURL: GATEWAY_URL, apiKey: process.env['LOVABLE_API_KEY']!, model: MODEL },
    await convertToModelMessages(messages),
    SYSTEM_PROMPT,
  );

  if (logged) {
    void (async () => {
      try {
        const rowId = await logged;
        const text = await result.text;
        await updateAnswerSummary(rowId, text.slice(0, 500));
      } catch {
        // Logging is best-effort; the chat must keep working.
      }
    })();
  }

  console.log("[chat] responses call created");
  return response();
}

async function logQuestion(question: string): Promise<string> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("recruiter_questions")
    .insert({ question })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  return data.id;
}

async function updateAnswerSummary(rowId: string, answerSummary: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  await supabaseAdmin.from("recruiter_questions").update({ answer_summary: answerSummary }).eq("id", rowId);
}
