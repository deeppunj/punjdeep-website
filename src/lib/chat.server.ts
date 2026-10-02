import { convertToModelMessages, type UIMessage } from "ai";
import { createClient } from "@supabase/supabase-js";
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
  parts: z.array(
    z.object({
      type: z.string(),
    }).passthrough(),
  ),
}).passthrough();

const bodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(24),
});

export async function handleChat(request: Request): Promise<Response> {
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

  const messages = parsed.messages as unknown as UIMessage[];
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const questionText = lastUser?.parts
    ?.filter((p) => p.type === "text")
    .map((p) => (p as { text?: string }).text ?? "")
    .join(" ")
    .slice(0, 2000)
    .trim();

  // Fire-and-forget question log; never blocks or breaks the stream.
  if (questionText) {
    logQuestion(questionText, questionText).catch((error) => console.error("question log failed:", error));
  }

  const { result, response } = createResponsesCall(request, { baseURL: GATEWAY_URL, apiKey: process.env.LOVABLE_API_KEY!, model: MODEL }, [
    { role: "system", content: SYSTEM_PROMPT },
    ...(await convertToModelMessages(messages)),
  ]);

  // Persist a short answer summary when the stream finishes.
  if (questionText) {
    void result.text
      .then((text) => logAnswer(questionText, text.slice(0, 500)))
      .catch(() => {});
  }

  return response();
}

async function logQuestion(question: string, answerSummary: string | null) {
  const supabase = createClient(
    process.env.SUPABASE_URL ?? import.meta.env.VITE_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
  const { error } = await supabase.from("recruiter_questions").insert({
    question,
    answer_summary: answerSummary,
  });
  if (error) throw new Error(error.message);
}

async function logAnswer(question: string, answerSummary: string) {
  const supabase = createClient(
    process.env.SUPABASE_URL ?? import.meta.env.VITE_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
  await supabase.from("recruiter_questions").update({ answer_summary: answerSummary }).eq("question", question);
}
