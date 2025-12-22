"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User, X, MessageCircle, Sparkles } from "lucide-react"

type Msg = {
  sender: "user" | "bot"
  text: string
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([
    { sender: "bot", text: "Hi 👋 I'm ZeroLuggage Assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userText = input.trim()
    setMessages((prev) => [...prev, { sender: "user", text: userText }])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      })

      const data = await res.json()
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }])
    } catch {
      setMessages((prev) => [...prev, { sender: "bot", text: "⚠️ Something went wrong. Please try again." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 
                   hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500
                   text-white rounded-full w-16 h-16 flex items-center justify-center 
                   shadow-2xl shadow-purple-500/50 transition-all duration-300"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle className="w-7 h-7" />
              <motion.div
                className="absolute inset-0 rounded-full bg-white"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-28 right-8 z-50 w-[480px] max-w-[calc(100vw-4rem)] h-[650px]
                       backdrop-blur-2xl bg-gradient-to-br from-white/95 via-white/90 to-purple-50/90
                       border border-white/60 rounded-3xl shadow-2xl shadow-purple-500/20 
                       overflow-hidden flex flex-col"
          >
            <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">ZeroLuggage Assistant</h3>
                  <p className="text-xs text-white/80">Always here to help</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(false)}
                className="text-white/90 hover:text-white w-8 h-8 rounded-full 
                          hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`flex items-end gap-3 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {m.sender === "bot" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                        className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 
                                  text-white flex items-center justify-center shadow-lg shrink-0"
                      >
                        <Bot className="w-5 h-5" />
                      </motion.div>
                    )}

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`px-5 py-3 rounded-2xl max-w-[75%] leading-relaxed shadow-sm ${
                        m.sender === "user"
                          ? "bg-gradient-to-br from-violet-600 to-purple-600 text-white rounded-br-md shadow-purple-500/20"
                          : "bg-white/80 backdrop-blur-sm text-gray-800 rounded-bl-md border border-gray-200/50"
                      }`}
                    >
                      {m.text}
                    </motion.div>

                    {m.sender === "user" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                        className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 
                                  text-white flex items-center justify-center shadow-lg shrink-0"
                      >
                        <User className="w-5 h-5" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-3"
                >
                  <div
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 
                                text-white flex items-center justify-center shadow-lg shrink-0"
                  >
                    <Bot className="w-5 h-5" />
                  </div>
                  <div
                    className="px-5 py-3 rounded-2xl rounded-bl-md bg-white/80 backdrop-blur-sm 
                                border border-gray-200/50 shadow-sm flex gap-1.5"
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-purple-600 rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            <div className="p-5 border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
              <div className="flex gap-3">
                <input
                  className="flex-1 border-2 border-gray-200 rounded-2xl px-5 py-3.5 
                            focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20
                            transition-all duration-200 bg-white/80 backdrop-blur-sm
                            placeholder:text-gray-400 text-gray-800"
                  placeholder="Ask about booking, safety, pricing..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="bg-gradient-to-br from-violet-600 to-purple-600 
                            hover:from-violet-500 hover:to-purple-500
                            text-white px-6 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed
                            shadow-lg shadow-purple-500/30 transition-all duration-200
                            flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
