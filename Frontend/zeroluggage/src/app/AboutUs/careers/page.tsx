"use client"

import { motion } from "framer-motion"
import {
  Heart,
  Users,
  Zap,
  Trophy,
  Umbrella,
  GraduationCap,
  MapPin,
  Briefcase,
  Clock,
  Plane,
  Luggage,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Img from "@/public/team.jpg"

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const stagger = {
  whileInView: {
    transition: { staggerChildren: 0.15 },
  },
}

const cultureValues = [
  {
    icon: Luggage,
    title: "Customer-First Thinking",
    description:
      "Every decision we make starts with one question: how does this improve the travel experience?",
  },
  {
    icon: Zap,
    title: "Fast & Fearless",
    description:
      "We move quickly, experiment boldly, and aren’t afraid to challenge traditional travel systems.",
  },
  {
    icon: Users,
    title: "One Team, One Mission",
    description:
      "From tech to operations, we collaborate closely to deliver seamless luggage solutions.",
  },
  {
    icon: Trophy,
    title: "Ownership & Growth",
    description:
      "We trust our people with responsibility and support continuous learning and career growth.",
  },
  {
    icon: Umbrella,
    title: "Work-Life Balance",
    description:
      "Flexible schedules and remote options help you do your best work without burnout.",
  },
  {
    icon: GraduationCap,
    title: "Inclusive Culture",
    description:
      "We value diverse perspectives and believe innovation thrives in inclusive teams.",
  },
]

const benefits = [
  {
    icon: "💼",
    title: "Competitive Salary",
    description: "Market-aligned compensation with performance incentives",
  },
  {
    icon: "🏖️",
    title: "Flexible Time Off",
    description: "Paid leaves, holidays, and personal days",
  },
  {
    icon: "🏡",
    title: "Remote-Friendly",
    description: "Work remotely or hybrid depending on your role",
  },
  {
    icon: "📚",
    title: "Learning Budget",
    description: "Courses, certifications, and upskilling support",
  },
  {
    icon: "🧘",
    title: "Wellness Support",
    description: "Mental wellness resources and flexible work hours",
  },
  {
    icon: "🚀",
    title: "Fast Growth",
    description: "Be part of a rapidly growing travel-tech startup",
  },
]

const jobs = [
  {
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote / India",
    type: "Full-time",
    experience: "1–3 years",
  },
  {
    title: "Backend Developer",
    department: "Engineering",
    location: "Remote / India",
    type: "Full-time",
    experience: "2–4 years",
  },
  {
    title: "Operations Executive",
    department: "Operations",
    location: "On-site (Metro Cities)",
    type: "Full-time",
    experience: "1+ year",
  },
  {
    title: "Customer Support Associate",
    department: "Support",
    location: "Remote",
    type: "Full-time",
    experience: "0–2 years",
  },
  {
    title: "Marketing Associate",
    department: "Marketing",
    location: "Hybrid",
    type: "Full-time",
    experience: "1–3 years",
  },
]

export default function CareersPage() {
  return (
    <div className="bg-sky-100 border-t border-sky-300 overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] bg-slate-100">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-white/60 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-white/40 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">

          {/* ABOUT HEADING */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center pt-14 pb-12"
          >
            <h2 className="text-3xl md:text-7xl font-bold text-slate-900">
              Career At <span className="text-slate-700">ZeroLuggage</span>
            </h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 bg-slate-900 mx-auto mt-4 rounded-full"
            />
          </motion.div>

          {/* MAIN CONTENT */}
          <div className="grid md:grid-cols-2 gap-14 items-center pb-20">
            <motion.div {...fadeUp}>
              <Badge className="mb-4 bg-sky-200 text-slate-900">
                Careers at ZeroLuggage
              </Badge>

              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-slate-900">
                Redefining Travel,
                <br />
                <span className="text-slate-700 font-semibold">
                  Smoother Journeys
                </span>
              </h1>

              <p className="text-lg text-slate-700 mb-8 max-w-xl">
                Join ZeroLuggage and help build seamless luggage transfer
                solutions that make travel lighter, smarter, and stress-free.
              </p>

              <Button className="bg-slate-900 text-white px-10 py-6 text-lg hover:scale-105 transition">
                Explore Open Roles
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative h-[420px] rounded-3xl overflow-hidden shadow-lg"
            >
              <Image
                src={Img}
                alt="ZeroLuggage team"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CULTURE */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2 {...fadeUp} className="text-4xl font-bold text-center mb-16">
            Life at ZeroLuggage
          </motion.h2>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
          >
            {cultureValues.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-white rounded-3xl p-8 shadow-lg"
                >
                  <Icon className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.h2 {...fadeUp} className="text-4xl font-bold text-center mb-16">
            Why You’ll Love Working Here
          </motion.h2>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-3xl p-8 shadow-md text-center"
              >
                <div className="text-4xl mb-4">{b.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
                <p className="text-gray-600">{b.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* JOBS */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2 {...fadeUp} className="text-4xl font-bold text-center mb-16">
            Open Positions
          </motion.h2>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {jobs.map((job, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-3xl p-6 shadow-lg"
              >
                <Badge className="mb-4">{job.department}</Badge>
                <h3 className="text-xl font-semibold mb-4">{job.title}</h3>

                <div className="text-sm text-gray-600 space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {job.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> {job.type}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {job.experience}
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Apply Now
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-sky-200 text-center">
        <motion.h2 {...fadeUp} className="text-4xl font-bold mb-6">
          Ready to build the future of travel?
        </motion.h2>
        <motion.p {...fadeUp} className="text-lg mb-8 text-slate-800">
          Join ZeroLuggage and help travelers move freely.
        </motion.p>
        <Button className="bg-white text-indigo-700 px-12 py-6 text-lg shadow-xl hover:scale-110 transition">
          View All Openings
        </Button>
      </section>
    </div>
  )
}
