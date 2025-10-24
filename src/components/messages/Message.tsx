import clsx from "clsx";
import { Clipboard, ClipboardCheck } from "lucide-react";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
}

export default function Message({ role, content }: MessageProps) {
  const codeBlocks = [...content.matchAll(/```(\w+)?\n([\s\S]*?)```/g)];

  if (codeBlocks.length > 0) {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    codeBlocks.forEach((match, i) => {
      const [full, language, code] = match;
      const start = match.index ?? 0;

      if (start > lastIndex) {
        parts.push(<p key={`text-${i}`}>{content.slice(lastIndex, start)}</p>);
      }
      
      const [copied, setCopied] = useState(false);

      const handleCopy = async () => {
        try {
          await navigator.clipboard.writeText(code.trim());
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch (err) {
          console.error("Failed to copy:", err);
        }
      };

      parts.push(
        <div
          key={`code-${i}`}
          className="relative group my-2 rounded-lg overflow-hidden"
        >
          {/* Copy button */}
          <button
            onClick={handleCopy}
            className={clsx(
              "absolute top-2 right-2 flex items-center gap-1 cursor-pointer text-xs px-2 py-1 rounded-md bg-gray-700/80 text-white opacity-0",
              "group-hover:opacity-100 transition-opacity duration-200"
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
          </button>

          {/* Syntax Highlighter */}
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
            {code.trim()}
          </SyntaxHighlighter>
        </div>
      );

      lastIndex = start + full.length;
    });

    if (lastIndex < content.length) {
      parts.push(<p key="text-last">{content.slice(lastIndex)}</p>);
    }

    return (
      <div
        className={clsx(
          "mb-5 max-w-[80%]",
          role === "user"
            ? "self-end bg-[#33363D] text-indigo-50 rounded-l-3xl rounded-tr-3xl px-4 py-2"
            : "self-start bg-[#0A0A0A]/10 text-slate-100 rounded-r-3xl rounded-tl-3xl px-4 py-2"
        )}
      >
        {parts}
      </div>
    );
  }

  return (
    <span
      className={clsx(
        "mb-5 max-w-[80%]",
        role === "user"
          ? "self-end bg-[#33363D] text-indigo-50 rounded-l-3xl rounded-tr-3xl px-4 py-2"
          : "self-start bg-[#0A0A0A]/10 text-slate-100 rounded-r-3xl rounded-tl-3xl px-4 py-2"
      )}
    >
      {content}
    </span>
  );
}
