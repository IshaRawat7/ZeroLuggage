"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import Img2 from "@/public/imageP.png"

export function AnimatedHeroImage() {
  return (
    <div
      className="
        w-full
        max-w-[520px]
        overflow-hidden
        border
        bg-card
        shadow-sm
        rounded-md sm:rounded-lg
        h-[220px] sm:aspect-video
      "
    >
      <motion.div
        className="relative h-full w-full"
        animate={{
          y: [0, -6, 0],
          scale: [1, 1.015, 1],
          rotate: [0, 1, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src={Img2}
          alt="Travelers with luggage illustration"
          fill
          className="object-contain p-3 sm:p-4"
          priority
        />
      </motion.div>
    </div>
  )
}
