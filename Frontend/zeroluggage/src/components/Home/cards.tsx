"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Img from "@/public/travel.jpg"
import type { StaticImageData } from "next/image"

interface DestinationCardProps {
   image?: StaticImageData | string
  imageTitle: string
  title: string
  location: string
  description: string
  tags: string[]
  onExplore?: () => void
}



export function DestinationCard({
  image,
  imageTitle,
  title,
  location,
  description,
  tags,
  onExplore,
}: DestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl"
    >
      {/* Image Section */}
      <motion.div
        className="relative h-48 w-full  overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
          <Image
  src={image ? image : Img}
  alt={title}
  fill
  className="object-cover"
  priority
/>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        {/* Image Title */}
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="absolute bottom-6 left-6 text-2xl font-bold text-white drop-shadow-lg"
        >
          {imageTitle}
        </motion.h3>
      </motion.div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-xl font-bold text-gray-900 leading-tight"
        >
          {title}
        </motion.h2>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center gap-2 text-gray-600"
        >
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">{location}</span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-sm text-gray-600 leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-wrap gap-2"
        >
          {tags.map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <Badge
                variant="secondary"
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors px-3 py-1 text-xs font-medium"
              >
                {tag}
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="pt-2"
        >
          <Button
            onClick={onExplore}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Explore Now
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
