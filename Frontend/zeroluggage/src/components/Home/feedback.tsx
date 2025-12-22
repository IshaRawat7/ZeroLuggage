"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<{ id: number; message: string; user: { name: string } }[]>([])

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/feedback`)
      const data = await res.json()
      setFeedbacks(data)
    } catch (err) {
      console.error("Failed to fetch feedbacks:", err)
    }
  }

  return (
    <div className="mx-auto max-w-8xl px-6 py-6">
      <header>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-sky-700 mb-16 text-center"
        >
        
          User Feedback
        
        </motion.h2>
      </header>

      {feedbacks.length === 0 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted-foreground text-center">
          No feedback yet.
        </motion.p>
      )}

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {feedbacks.map((f, index) => (
          <motion.div
            key={f.id}
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.9 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            whileHover={{
              scale: 1.05,
              rotate: [0, -1, 1, 0],
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="bg-gradient-to-br from-sky-50 to-sky-100/50 border-sky-200 shadow-lg hover:shadow-xl hover:shadow-sky-200/50 transition-shadow duration-300 h-full">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-sky-600 flex items-center gap-2">
                  <motion.div
                    className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-bold"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {f.user.name.charAt(0).toUpperCase()}
                  </motion.div>
                  {f.user.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="relative pl-4 border-l-2 border-sky-400"
                >
                  {f.message}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
