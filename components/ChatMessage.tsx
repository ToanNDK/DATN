"use client";

import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default function ChatMessage({ text }: { text: string }) {
  return (
    <div className="whitespace-pre-line text-sm leading-relaxed">
      <ReactMarkdown
        components={{
          a: ({ href, children }) => (
            <Link
              href={href ?? "#"}
              className="text-blue-600 underline hover:text-blue-800"
            >
              {children}
            </Link>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
