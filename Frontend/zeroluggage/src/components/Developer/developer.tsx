"use client"

import { useState } from "react"
import { Github, Twitter, Globe, Plus } from "lucide-react"

interface Developer {
  id: number
  name: string
  role: string
  bio: string
  skills: string[]
  avatar: string
  github: string
  twitter: string
  website: string
}

interface DeveloperCardProps {
  developer: Developer
}

export default function DeveloperCard({ developer }: DeveloperCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="group relative">
      {/* Card glow effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-sky-200/40 via-blue-200/40 to-sky-200/40 rounded-2xl blur-xl transition-all duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Card */}
      <div className="relative bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 hover:border-sky-400 transition-all duration-300 h-full flex flex-col overflow-hidden group shadow-sm hover:shadow-md">
        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-500 to-sky-400 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative z-10">
          {/* Avatar section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4 flex-1">
              <div
                className={`relative w-14 sm:w-16 h-14 sm:h-16 rounded-full overflow-hidden border-2 border-sky-300 transition-all duration-300 flex-shrink-0 ${isHovered ? "border-sky-500 scale-110" : ""}`}
              >
                <img
                  src={developer.avatar || "/placeholder.svg"}
                  alt={developer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-foreground truncate">{developer.name}</h3>
                <p className="text-xs sm:text-sm text-sky-500 font-semibold truncate">{developer.role}</p>
              </div>
            </div>
            <button
              onClick={() => setIsConnected(!isConnected)}
              className={`p-2 rounded-full transition-all duration-300 flex-shrink-0 ${
                isConnected ? "bg-sky-100 text-sky-500" : "bg-sky-50 text-sky-400 hover:bg-sky-100 hover:text-sky-500"
              }`}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Bio */}
          <p className="text-xs sm:text-sm text-foreground/60 mb-4 sm:mb-6 line-clamp-2 leading-relaxed">
            {developer.bio}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            {developer.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 sm:px-3 py-1 text-xs font-medium bg-sky-100 text-sky-600 rounded-full hover:bg-sky-200 transition-colors duration-300 whitespace-nowrap"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Social links */}
          <div className="flex items-center gap-2 sm:gap-4 mt-auto pt-4 sm:pt-6 border-t border-sky-100 flex-wrap">
            <a
              href={developer.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-foreground/50 hover:text-sky-500 hover:bg-sky-50 transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={developer.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-foreground/50 hover:text-sky-500 hover:bg-sky-50 transition-all duration-300 hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href={developer.website}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-foreground/50 hover:text-sky-500 hover:bg-sky-50 transition-all duration-300 hover:scale-110"
              aria-label="Website"
            >
              <Globe className="w-5 h-5" />
            </a>
            <button className="ml-auto px-3 sm:px-4 py-2 bg-sky-100 text-sky-500 rounded-lg text-xs sm:text-sm font-semibold hover:bg-sky-500 hover:text-white transition-all duration-300 whitespace-nowrap">
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
