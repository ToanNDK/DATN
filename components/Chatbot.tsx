"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      const reply = data.answer || "Xin lỗi, mình chưa hiểu câu hỏi của bạn.";
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Lỗi kết nối, vui lòng thử lại sau." },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div>
      {/* Nút tròn bật/tắt chatbot */}
      <button
        onClick={toggleChat}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg focus:outline-none transition-all"
        aria-label="Mở chat"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Khung chat */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 h-96 bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col animate-fade-in">
          <div className="bg-blue-600 text-white text-center py-2 rounded-t-2xl font-semibold">
            Hỗ trợ khách hàng 💬
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.length === 0 && (
              <div className="text-gray-500 text-center mt-10">
                Xin chào 👋 <br /> Tôi có thể giúp gì cho bạn?
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 p-2 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập tin nhắn..."
              className="flex-1 border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
