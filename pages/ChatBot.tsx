
import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Database, Loader2 } from "lucide-react";
import { ChatMessage } from "../types";

/**
 * Put your n8n webhook URL here:
 * Example: "http://10.10.10.69:5678/webhook/08563812-ddcd-4a96-b977-51c25ca8e82a/chat"
 */
const N8N_CHAT_WEBHOOK_URL = "http://localhost:5678/webhook/08563812-ddcd-4a96-b977-51c25ca8e82a/chat";

export const ChatBot: React.FC = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hola. Soy tu asistente de Ciberseguridad IA. Estoy conectado a la base de datos vectorial interna a través de n8n. ¿En qué puedo ayudarte hoy?",
      timestamp: new Date(),
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Persist a sessionId so n8n can keep conversational context if needed
  const getSessionId = () => {
    const key = "mecha_chat_session_id";
    let sessionId = localStorage.getItem(key);
    if (!sessionId) {
      sessionId = (crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`).toString();
      localStorage.setItem(key, sessionId);
    }
    return sessionId;
  };

  const extractReply = (data: any): string => {
    // Accept common shapes from n8n workflows
    return (
      data?.reply ??
      data?.text ??
      data?.answer ??
      data?.output ??
      data?.message ??
      "Sin respuesta del workflow."
    );
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const currentInput = input;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: currentInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      if (!N8N_CHAT_WEBHOOK_URL || N8N_CHAT_WEBHOOK_URL === "http://localhost:5678/webhook/08563812-ddcd-4a96-b977-51c25ca8e82a/chat") {
        throw new Error("Webhook URL is not set. Replace HERE_WE_GO with your n8n webhook URL.");
      }

      const sessionId = getSessionId();

      const res = await fetch(N8N_CHAT_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
          sessionId,
          ts: Date.now(),
        }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`n8n HTTP ${res.status} ${res.statusText} ${errText ? `- ${errText}` : ""}`);
      }

      const data = await res.json().catch(() => ({}));
      const replyText = extractReply(data);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: replyText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Error:", error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "Error de conexión. Por favor, verifica el estado del servidor (n8n) y el webhook.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3 tracking-tight">
            <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20">
              <Bot className="text-white" size={24} />
            </div>
            Asistente RAG
          </h2>
          <p className="text-slate-500 text-sm mt-1">Conexión directa con PostgreSQL y flujos n8n.</p>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100 shadow-sm">
          <Database size={12} />
          Vector Engine Online
        </div>
      </header>

      <div className="flex-1 bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden flex flex-col mt-2">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/20">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-4 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                  msg.sender === "user" ? "bg-blue-600 text-white" : "bg-emerald-600 text-white"
                }`}
              >
                {msg.sender === "user" ? <User size={18} /> : <Bot size={18} />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm shadow-sm ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-white border border-slate-200 text-slate-700 rounded-tl-none"
                }`}
              >
                {msg.text}
                <div className="text-[10px] mt-2 text-right opacity-50">
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                <Bot size={18} />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-5 py-3.5 flex items-center gap-3 text-slate-500 text-sm shadow-sm">
                <Loader2 size={16} className="animate-spin text-emerald-500" />
                Analizando vectores.
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 bg-white border-t border-slate-100">
          <form onSubmit={handleSend} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu consulta de seguridad."
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl pl-5 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-slate-400 text-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-3 top-2.5 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
