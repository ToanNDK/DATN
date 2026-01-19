"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

type Message = {
  role: "user" | "bot";
  text: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  // Auto scroll xuống cuối
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      const reply = data.answer || "Xin lỗi, mình chưa hiểu câu hỏi của bạn.";

      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "❌ Lỗi kết nối, vui lòng thử lại sau." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating button */}
      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-20 right-6 w-96 h-130 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 flex items-center justify-between">
              <span className="font-semibold">🤖 Tư vấn sản phẩm</span>
              <button onClick={toggleChat}>
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
              {messages.length === 0 && (
                <div className="text-gray-500 text-center mt-10">
                  👋 Xin chào! <br /> Bạn muốn tìm điện thoại nào hôm nay?
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2 text-xs">
                      BOT
                    </div>
                  )}

                  <div
                    className={`px-4 py-2 rounded-2xl max-w-[75%] shadow ${
                      msg.role === "user"
                        ? "bg-linear-to-r from-blue-500 to-indigo-500 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <ReactMarkdown
  components={{
    a: ({ href, children }) => {
      if (!href) return null;

      return (
        <Link
          href={href}
          className="text-blue-600 font-medium underline hover:text-blue-800"
          onClick={() => {
            // Optional: đóng chatbot khi chuyển trang
            setIsOpen(false);
          }}
        >
          {children}
        </Link>
      );
    },
  }}
>
  {msg.text}
</ReactMarkdown>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center space-x-2 text-gray-500">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                    BOT
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                    <span className="animate-pulse">Đang trả lời...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-3 flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập câu hỏi..."
                className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
