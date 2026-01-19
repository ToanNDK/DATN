"use client";

import ReactMarkdown from "react-markdown";
import Link from "next/link";

/**
 * Chuẩn hóa text để Markdown hiểu được danh sách
 */
function normalizeProductList(text: string) {
  return (
    text
      // Đảm bảo có dòng trống trước dấu "-"
      .replace(/([^\n])\s*-\s*\*\*/g, "$1\n\n- **")

      // Mỗi "Giá:" xuống dòng cho đẹp
      .replace(/\s*(Giá:)/g, "\n  $1")

      // Mỗi "👉" xuống dòng
      .replace(/\s*👉/g, "\n  👉")

      // Gộp tối đa 2 dòng trống
      .replace(/\n{3,}/g, "\n\n")
  );
}

export default function ChatMessage({ text }: { text: string }) {
  const normalizedText = normalizeProductList(text);

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
        {normalizedText}
      </ReactMarkdown>
    </div>
  );
}
