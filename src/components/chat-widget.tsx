import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import assistantMark from "@/assets/assistant-mark.png";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";

const SUGGESTIONS = [
  "What makes Deep's ML approach different?",
  "Walk me through the PINN flow solver",
  "Which stack does Deep work in?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status, error, stop, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  // Focus the composer whenever the panel opens so typing starts immediately.
  useEffect(() => {
    if (open) {
      const raf = requestAnimationFrame(() => textareaRef.current?.focus());
      return () => cancelAnimationFrame(raf);
    }
  }, [open]);

  const busy = status === "submitted" || status === "streaming";

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label="Ask about Deep's work"
          className="fixed inset-x-3 bottom-3 z-50 flex max-h-[min(70vh,560px)] flex-col overflow-hidden rounded-xl border-2 border-border bg-card shadow-[var(--card-shadow-hover)] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[400px]"
        >
          <header className="flex items-center gap-3 border-b border-border px-4 py-3">
            <img
              src={assistantMark}
              alt=""
              aria-hidden
              loading="lazy"
              width={816}
              height={816}
              className="size-8 shrink-0 rounded-full bg-background object-cover p-0.5"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Ask about Deep</p>
              <p className="truncate font-mono text-xs text-muted-foreground">
                Answers from the portfolio content
              </p>
            </div>
            {messages.length > 0 && (
              <button
                type="button"
                className="rounded-md px-2 py-1 font-mono text-xs uppercase text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMessages([])}
              >
                Clear
              </button>
            )}
            <button
              type="button"
              aria-label="Close chat"
              className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              <X className="size-4" aria-hidden />
            </button>
          </header>

          <Conversation className="min-h-0 flex-1">
            <ConversationContent className="gap-5 p-4">
              {messages.length === 0 ? (
                <ConversationEmptyState
                  className="py-10"
                  icon={<img src={assistantMark} alt="" aria-hidden loading="lazy" width={816} height={816} className="mx-auto size-12 rounded-full bg-muted p-1" />}
                  title="Hi — I'm Deep's assistant"
                  description="Ask me about his background, skills, or projects. Nothing you type here is saved."
                >
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {SUGGESTIONS.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground/85 transition-colors hover:border-primary hover:text-primary"
                        onClick={() => sendMessage({ text: suggestion })}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </ConversationEmptyState>
              ) : (
                messages.map((message) => (
                  <Message key={message.id} from={message.role}>
                    <MessageContent
                      className={
                        message.role === "user"
                          ? "max-w-[85%] rounded-full bg-primary px-4 py-2.5 text-primary-foreground"
                          : ""
                      }
                    >
                      {message.parts.map((part, index) =>
                        part.type === "text" ? (
                          message.role === "assistant" ? (
                            <MessageResponse key={index} className="text-sm leading-relaxed [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2">
                              {part.text}
                            </MessageResponse>
                          ) : (
                            <span key={index} className="text-sm">{part.text}</span>
                          )
                        ) : null,
                      )}
                    </MessageContent>
                  </Message>
                ))
              )}
              {status === "submitted" && (
                <div className="pl-1 text-sm">
                  <Shimmer>Thinking…</Shimmer>
                </div>
              )}
              {error && (
                <p role="alert" className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error.message || "The assistant couldn't answer just now — please try again."}
                </p>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <div className="border-t border-border p-3">
            <PromptInput
              onSubmit={(message) => {
                if (busy || !message.text?.trim()) return;
                sendMessage({ text: message.text });
              }}
              className="rounded-lg"
            >
              <PromptInputTextarea
                ref={textareaRef}
                placeholder="Ask about Deep's work…"
                aria-label="Your question"
                rows={1}
                className="min-h-11 max-h-28"
              />
              <PromptInputFooter className="justify-end">
                <PromptInputSubmit status={status} onStop={stop} disabled={busy && false} />
              </PromptInputFooter>
            </PromptInput>
            <p className="mt-2 text-center font-mono text-[11px] text-muted-foreground">
              AI answers from the site content — details are best confirmed with Deep directly.
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        aria-label={open ? "Close chat" : "Ask about Deep's work"}
        aria-expanded={open}
        className="fixed bottom-4 right-4 z-50 inline-flex size-14 items-center justify-center rounded-full border-2 border-primary/50 bg-primary text-primary-foreground shadow-[var(--card-shadow-hover)] transition-transform hover:scale-105 sm:bottom-5 sm:right-5"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <X className="size-6" aria-hidden />
        ) : (
          <MessageCircle className="size-6" aria-hidden />
        )}
      </button>
    </>
  );
}
