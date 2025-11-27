"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import Img2 from "@/public/imageP.png"

export function AnimatedHeroImage() {
  return (
    <div className="aspect-video w-full max-w-[520px] overflow-hidden rounded-lg border bg-card shadow-sm">
      <motion.div
        className="relative h-full w-full"
        animate={{
          y: [0, -8, 0],
          scale: [1, 1.02, 1],
          rotate: [0, 1.5, 0],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <Image src={Img2} alt="Travelers with luggage illustration" fill className="object-contain p-4" priority />
      </motion.div>
    </div>
  )
}
