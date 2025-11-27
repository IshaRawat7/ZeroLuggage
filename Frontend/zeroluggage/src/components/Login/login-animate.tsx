"use client"

import Image from "next/image"
import { motion, useMotionValue, animate } from "framer-motion"
import { useEffect } from "react"
import Img from "@/public/imageP.png"

export function AnimatedLoginArt() {
  // Subtle autonomous animation values to keep it moving
  const r = useMotionValue(0)
  const y = useMotionValue(0)
  const s = useMotionValue(1)

  // Looping sequences: rotate, bob, and breathe
  useEffect(() => {
    const controls = [
      animate(r, [0, -2, 2, 0], { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }),
      animate(y, [0, -6, 0, 6, 0], { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }),
      animate(s, [1, 1.02, 1], { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }),
    ]
    return () => controls.forEach((c) => c.stop())
  }, [r, y, s])

  // Border glow animation using CSS var swapping
  return (
    <div className="relative ">
      {/* Glow frame */}
      <div
        aria-hidden
        className="absolute inset-0 -z-0 rounded-lg "
        style={{
          background:
            "conic-gradient(from 0deg, hsl(var(--primary)) 0%, transparent 25%, hsl(var(--primary)) 50%, transparent 75%, hsl(var(--primary)) 100%)",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          padding: "2px",
        }}
      />
      <motion.div
        className="relative aspect-[4/3] w-full bg-sky-50 overflow-hidden rounded-lg  shadow-sm ring-1 ring-border"
        style={{ rotate: r, y, scale: s }}
        whileHover={{ scale: 1.03, y: -4, transition: { type: "spring", stiffness: 200, damping: 18 } }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        <Image
          src={Img}
          alt="Passengers with luggage at the airport illustration"
          fill
          priority
          sizes="(min-width: 768px) 40vw, 90vw"
          className="object-contain p-4 md:p-6"
        />
      </motion.div>
    </div>
  )
}
