/**
 * ChatBot.jsx
 * -----------
 * A floating chat widget that lets visitors talk to an AI that knows
 * everything about Krishna's resume and portfolio.
 *
 * How it works:
 *  1. On first open, a session_id is generated (stored in state). This lets
 *     the FastAPI backend remember the conversation history for this visitor.
 *  2. Each message is sent as POST /chat to the FastAPI server on port 8000.
 *  3. The reply is appended to local `messages` state and rendered.
 *  4. When the chat is closed, we call DELETE /chat/:session_id to free
 *     server-side memory.
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// const API_URL = "http://localhost:8000";
const API_URL = "https://hypernormal-mahalia-trembly.ngrok-free.dev";

// Generates a random UUID — used as the session identifier.
const generateSessionId = () =>
  "session-" + Math.random().toString(36).substring(2, 11);

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Hi! 👋 I'm Krishna's AI assistant. Ask me anything about his projects, skills, or experience!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(generateSessionId);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to latest message whenever messages change.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when chat opens.
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  // When widget is closed, clear server-side history to free memory.
  const handleClose = () => {
    setIsOpen(false);
    fetch(`${API_URL}/chat/${sessionId}`, { method: "DELETE", headers: { "ngrok-skip-browser-warning": "true" } }).catch(() => {});
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    // Immediately show the user's message.
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
        body: JSON.stringify({ message: text, session_id: sessionId }),
      });

      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data = await res.json();

      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "⚠️ Couldn't reach the server. Make sure the FastAPI backend is running on port 8000.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ── Chat window ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-5 z-50 w-[350px] sm:w-[400px] rounded-2xl border border-white/10 flex flex-col overflow-hidden shadow-2xl"
            style={{
              background: "rgba(6, 9, 31, 0.92)",
              backdropFilter: "blur(20px)",
              height: "520px",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b border-white/10"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-semibold text-white">
                  Krishna's AI Assistant
                </span>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white"
              >
                <img src="assets/close.svg" className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-indigo-600/80 text-white rounded-br-sm"
                        : "bg-white/8 text-neutral-200 rounded-bl-sm border border-white/8"
                    }`}
                    style={
                      msg.role !== "user"
                        ? { background: "rgba(255,255,255,0.07)" }
                        : {}
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex justify-start">
                  <div
                    className="px-4 py-3 rounded-2xl rounded-bl-sm border border-white/8"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  >
                    <span className="flex gap-1 items-center">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-white/10">
              <div
                className="flex items-end gap-2 rounded-xl px-3 py-2"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Krishna's skills, projects…"
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/30 resize-none outline-none leading-relaxed max-h-24"
                  style={{ scrollbarWidth: "none" }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="p-1.5 rounded-lg transition-colors disabled:opacity-30"
                  style={{
                    background: input.trim() && !loading
                      ? "rgba(99,102,241,0.8)"
                      : "rgba(255,255,255,0.08)",
                  }}
                >
                  <img
                    src="assets/arrow-up.svg"
                    className="w-4 h-4"
                  />
                </button>
              </div>
              <p className="text-center text-xs text-white/20 mt-1.5">
                Powered by Gemma 3 via OpenRouter
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating button ───────────────────────────────────────────────── */}
      <motion.button
        onClick={() => (isOpen ? handleClose() : setIsOpen(true))}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          boxShadow: "0 8px 32px rgba(99,102,241,0.4)",
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.img
              key="close"
              src="assets/close.svg"
              className="w-5 h-5"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          ) : (
            <motion.span
              key="icon"
              className="text-xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              💬
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default ChatBot;
