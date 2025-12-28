"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, MessageCircle, Sparkles, Bot } from "lucide-react"

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 
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
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="
              fixed z-50 flex flex-col overflow-hidden
              bottom-0 right-0
              w-full h-[100dvh]
              sm:bottom-28 sm:right-6 sm:w-[420px] sm:h-[620px]
              backdrop-blur-2xl bg-gradient-to-br from-white/95 via-white/90 to-purple-50/90
              border border-white/60 rounded-none sm:rounded-3xl
              shadow-2xl shadow-purple-500/20
            "
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white p-5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">ZeroLuggage Assistant</h3>
                  <p className="text-[11px] text-white/80">
                    Smart help • Instant answers
                  </p>
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

              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </div>

            {/* Chat Area */}
            <div className="relative flex-1 overflow-hidden bg-white/40">
              {/* Loader */}
              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 
                                    flex items-center justify-center shadow-xl">
                      <Bot className="w-6 h-6 text-white animate-pulse" />
                    </div>

                    <p className="text-sm font-medium text-gray-700">
                      Connecting to assistant…
                    </p>

                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-2 h-2 rounded-full bg-purple-600"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Botpress iframe */}
              <iframe
                src="https://cdn.botpress.cloud/webchat/v3.5/shareable.html?configUrl=https://files.bpcontent.cloud/2025/12/27/19/20251227195721-H07I4AIJ.json"
                className={`w-full h-full border-0 transition-opacity duration-300 ${
                  loading ? "opacity-0" : "opacity-100"
                }`}
                allow="microphone"
                onLoad={() => setLoading(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
