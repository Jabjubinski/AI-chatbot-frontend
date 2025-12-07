import clsx from "clsx";
import { ClipboardCheck, Clipboard } from "lucide-react"; 
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button"; 
import { useAuthStore } from "../../stores/authStore";
import type { SafeUser } from "../../types";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
  sent_by: SafeUser | null;
}

const CODE_BLOCK_REGEX = /```(\w+)?\n([\s\S]*?)```/g;

export default function Message({ role, content, sent_by }: MessageProps) {
  // We strictly don't need the auth store for alignment anymore, 
  // but keeping it if you need 'user' for other logic.
  const { user } = useAuthStore();

  // --- FIX START ---
  // We rely on 'role' for alignment. This fixes the "loading" and "first message"
  // glitches where 'sent_by' might be null during optimistic updates.
  const isOwnMessage = role === "user";
  const isAssistantMessage = role === "assistant";

  // We also update displayName to fallback to "You" if sent_by is missing 
  // (e.g., during that split second before the server returns the user object).
  const displayName = sent_by 
    ? sent_by.firstname 
    : isOwnMessage 
      ? "You" 
      : "Assistant";
  // --- FIX END ---

  const codeBlocks = [...content.matchAll(CODE_BLOCK_REGEX)];

  const [copied, setCopied] = useState(false);

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const messageClasses = clsx("mb-4 max-w-[70%] text-base p-4 rounded-xl", {
    "self-end ml-auto bg-blue-600 text-white rounded-br-none": isOwnMessage,
    "self-start mr-auto bg-gray-100 text-gray-900 rounded-tl-none":
      isAssistantMessage,
  });

  // --- SCENARIO 1: Message contains Code Blocks ---
  if (codeBlocks.length > 0) {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    codeBlocks.forEach((match, i) => {
      const [fullMatch, language, code] = match;
      const start = match.index ?? 0;
      const codeToCopy = code.trim();

      if (start > lastIndex) {
        parts.push(<p key={`text-${i}`}>{content.slice(lastIndex, start)}</p>);
      }

      parts.push(
        <div
          key={`code-${i}`}
          className="relative group my-2 rounded-lg overflow-hidden border border-gray-700/50"
        >
          <Button
            onClick={() => handleCopy(codeToCopy)}
            variant="ghost"
            size="sm"
            className={clsx(
              "absolute top-2 right-2 flex items-center gap-1 text-xs px-2 py-1 bg-gray-700/80 text-white hover:bg-gray-700",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            )}
          >
            {copied ? (
              <>
                <ClipboardCheck size={14} /> Copied
              </>
            ) : (
              <>
                <Clipboard size={14} /> Copy
              </>
            )}
          </Button>

          <SyntaxHighlighter
            language={language || "text"}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.9rem",
              background: "#1e1e1e",
              borderRadius: "0.5rem",
            }}
          >
            {codeToCopy}
          </SyntaxHighlighter>
        </div>
      );

      lastIndex = start + fullMatch.length;
    });

    if (lastIndex < content.length) {
      parts.push(<p key="text-last">{content.slice(lastIndex)}</p>);
    }

    return (
      <div
        className={clsx(
          "w-full flex",
          isOwnMessage ? "justify-end" : "justify-start"
        )}
      >
        <div className={messageClasses}>
          <span
            className={clsx(
              "text-xs font-bold mb-2 uppercase tracking-wide",
              isOwnMessage ? "text-white/80" : "text-gray-500"
            )}
          >
            {displayName}
          </span>
          <div className="space-y-3">{parts}</div>
        </div>
      </div>
    );
  }

  // --- SCENARIO 2: Plain Text Message ---
  return (
    <div
      className={clsx(
        "w-full flex",
        isOwnMessage ? "justify-end" : "justify-start"
      )}
    >
      <div className={messageClasses}>
        <span
          className={clsx(
            "text-xs font-bold mb-1 uppercase tracking-wide",
            isOwnMessage ? "text-white/80" : "text-gray-500"
          )}
        >
          {displayName}
        </span>

        <p className="whitespace-pre-wrap">{content}</p>

        {isAssistantMessage && (
          <div className="mt-2 flex justify-start">
            <Button
              onClick={() => handleCopy(content)}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-black hover:bg-gray-200 h-8"
            >
              {copied ? (
                <>
                  <ClipboardCheck size={16} className="mr-1" /> Copied!
                </>
              ) : (
                <>
                  <Clipboard size={16} className="mr-1" /> Copy
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}