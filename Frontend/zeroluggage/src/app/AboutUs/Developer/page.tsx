"use client"

import DeveloperCard from "@/components/Developer/developer"
import HeroSection from "@/components/Developer/hero_section"
import SearchBar from "@/components/Developer/search_bar"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const DEVELOPERS = [
  {
    id: 1,
    name: "Isha Rawat",
    role: "Full Stack Engineer",
    bio: "Building scalable web applications with React, Node.js, and PostgreSQL",
    skills: ["React", "TypeScript", "PostgreSQL","NextJs", "Node.Js"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    github: "https://github.com",
    twitter: "https://twitter.com",
    website: "https://example.com",
  },
  {
    id: 2,
    name: "Kanchan Arya",
    role: "Frontend Specialist",
    bio: "Passionate about creating beautiful UIs with Tailwind CSS and modern animation techniques",
    skills: ["HTML", "CSS", "Animation", "UX Design","Javascript"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    github: "https://github.com",
    twitter: "https://twitter.com",
    website: "https://example.com",
  },
  
 {
  id: 5,
  name: "Harshita Martolia",
  role: "AI / Chatbot Engineer",
  bio: "Building intelligent conversational chatbots using NLP, LLMs, and modern AI frameworks.",
  skills: [
    "Python",
    "NLP",
    "Chatbot Development",
    "LLMs",
    "LangChain",
  ],
   avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=maya",
  github: "https://github.com",
  twitter: "https://twitter.com",
  website: "https://example.com",
}
,
  {
    id: 6,
    name: "Parth Aggarwal",
    role: "AI/ML Engineer",
    bio: "Leveraging machine learning to solve real-world problems",
    skills: ["Python", "TensorFlow", "PyTorch", "OpenCV"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=liam",
    github: "https://github.com",
    twitter: "https://twitter.com",
    website: "https://example.com",
  },
]

export default function Home() {
  const [filteredDevelopers, setFilteredDevelopers] = useState(DEVELOPERS)
  const [searchTerm, setSearchTerm] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const filtered = DEVELOPERS.filter(
      (dev) =>
        dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dev.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dev.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredDevelopers(filtered)
  }, [searchTerm])

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-sky-50/50 to-white">
         <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center pt-12 pb-10"
          >
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-slate-900">
              Developers <span className="text-slate-700">ZeroLuggage</span>
            </h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 bg-slate-900 mx-auto mt-4 rounded-full"
            />
          </motion.div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-sky-300/15 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-300/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-sky-200/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Developers Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div
            ref={containerRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 animate-slide-up"
          >
            {filteredDevelopers.map((dev, index) => (
              <div
                key={dev.id}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
                className="animate-slide-up"
              >
                <DeveloperCard developer={dev} />
              </div>
            ))}
          </div>

          {filteredDevelopers.length === 0 && (
            <div className="text-center py-12 sm:py-20">
              <p className="text-foreground/60 text-base sm:text-lg">No developers found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
