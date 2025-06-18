"use client";

import { useEffect, useRef, useState } from "react";
import AIChat from "./components/AIChat";
import UserChat from "./components/UserChat";
import Loading from "./components/Loading";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("llama3-70b-8192");
  const sectionRef = useRef(null);

  const models = [
    { id: "llama3-70b-8192", name: "Llama 3 70B" },
    { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B" },
    { id: "gemma-7b-it", name: "Gemma 7B" },
  ];

  useEffect(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hi! I'm your AI assistant. How can I help you today?",
      },
    ]);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!message.trim()) return;

    const userMessage = message;
    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: userMessage },
      { role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: "user", content: userMessage },
          ],
          model: selectedModel,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setLoading(false);
      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1];
        let otherMessages = messages.slice(0, messages.length - 1);
        return [
          ...otherMessages,
          {
            ...lastMessage,
            content: data.content,
          },
        ];
      });
    } catch (error) {
      console.error("Error:", error);
      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1];
        let otherMessages = messages.slice(0, messages.length - 1);
        return [
          ...otherMessages,
          {
            ...lastMessage,
            content: "I'm sorry, but I encountered an error. Please try again later.",
          },
        ];
      });
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-900 text-white p-2 sm:p-4">
      <div className="w-full max-w-4xl h-[90vh] bg-gray-800/95 rounded-lg shadow-xl flex flex-col">
        {/* Header */}
        <div className="p-3 sm:p-4 border-b border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <div>
            <h2 className="text-lg sm:text-xl font-bold">AI Chat Assistant</h2>
            <p className="text-xs sm:text-sm text-gray-400">Powered by Groq</p>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-gray-700/80 text-white px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm flex-1 sm:flex-none"
            >
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
            <button
              onClick={clearChat}
              className="px-2 sm:px-3 py-1 bg-red-600/80 hover:bg-red-700 rounded-md text-xs sm:text-sm whitespace-nowrap"
            >
              Clear Chat
            </button>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4">
          {messages.map((item, id) => (
            <div key={id} className="flex flex-col space-y-2">
              {item.role === "user" ? (
                <UserChat text={item.content} />
              ) : (
                <AIChat text={item.content} />
              )}
            </div>
          ))}
          <div ref={sectionRef}></div>
        </div>

        {/* Input Area */}
        <div className="p-2 sm:p-4 border-t border-gray-700">
          <form onSubmit={sendMessage} className="flex space-x-2">
            <input
              className="flex-1 bg-gray-700/80 text-white rounded-lg px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-3 sm:px-4 py-2 bg-indigo-600/80 hover:bg-indigo-700 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
