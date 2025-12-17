"use client"

import { motion } from "framer-motion"
import {
  Users,
  Zap,
  Trophy,
  Umbrella,
  GraduationCap,
  MapPin,
  Briefcase,
  Clock,
  Luggage,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Img from "@/public/team.jpg"

/* Animations */
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

/* Data */
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
      "We move quickly, experiment boldly, and challenge traditional travel systems.",
  },
  {
    icon: Users,
    title: "One Team, One Mission",
    description:
      "From tech to operations, we collaborate closely to deliver seamless solutions.",
  },
  {
    icon: Trophy,
    title: "Ownership & Growth",
    description:
      "We trust our people with responsibility and support continuous learning.",
  },
  {
    icon: Umbrella,
    title: "Work-Life Balance",
    description:
      "Flexible schedules and remote options help you avoid burnout.",
  },
  {
    icon: GraduationCap,
    title: "Inclusive Culture",
    description:
      "Diverse perspectives drive innovation and better outcomes.",
  },
]

const benefits = [
  { icon: "💼", title: "Competitive Salary", description: "Market-aligned pay" },
  { icon: "🏖️", title: "Flexible Time Off", description: "Paid leaves & holidays" },
  { icon: "🏡", title: "Remote-Friendly", description: "Work from anywhere" },
  { icon: "📚", title: "Learning Budget", description: "Upskilling support" },
  { icon: "🧘", title: "Wellness Support", description: "Mental wellness focus" },
  { icon: "🚀", title: "Fast Growth", description: "High-impact startup role" },
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
]

export default function CareersPage() {
  return (
    <div className="bg-sky-100 overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-screen bg-slate-100">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">

          <motion.div
            {...fadeUp}
            className="text-center pt-12 pb-10"
          >
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-slate-900">
              Career At <span className="text-slate-700">ZeroLuggage</span>
            </h2>
            <div className="h-1 w-16 bg-slate-900 mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 items-center pb-16">
            <motion.div {...fadeUp} className="text-center md:text-left">
              <Badge className="mb-4 bg-sky-200 text-slate-900">
                Careers at ZeroLuggage
              </Badge>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                Redefining Travel
                <br />
                <span className="text-slate-700 font-semibold">
                  Smoother Journeys
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 mb-8 max-w-xl mx-auto md:mx-0">
                Join us to build luggage solutions that make travel lighter and stress-free.
              </p>

              <Button className="bg-slate-900 text-white px-8 py-5 text-base sm:text-lg">
                Explore Open Roles
              </Button>
            </motion.div>

            <motion.div
              {...fadeUp}
              className="relative h-[240px] sm:h-[320px] md:h-[420px] rounded-3xl overflow-hidden shadow-lg"
            >
              <Image src={Img} alt="Team" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CULTURE */}
      <section className="py-16 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
          Life at ZeroLuggage
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cultureValues.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                {...fadeUp}
                className="bg-white rounded-2xl p-6 shadow-md"
              >
                <Icon className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
          Why You’ll Love Working Here
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              className="bg-white rounded-2xl p-6 shadow text-center"
            >
              <div className="text-3xl mb-3">{b.icon}</div>
              <h3 className="font-semibold">{b.title}</h3>
              <p className="text-sm text-gray-600">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* JOBS */}
      <section className="py-16 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
          Open Positions
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {jobs.map((job, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <Badge className="mb-3">{job.department}</Badge>
              <h3 className="text-lg font-semibold mb-4">{job.title}</h3>

              <div className="text-sm text-gray-600 space-y-2 mb-4">
                <div className="flex gap-2 items-center">
                  <MapPin className="w-4 h-4" /> {job.location}
                </div>
                <div className="flex gap-2 items-center">
                  <Briefcase className="w-4 h-4" /> {job.type}
                </div>
                <div className="flex gap-2 items-center">
                  <Clock className="w-4 h-4" /> {job.experience}
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Apply Now
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-sky-200 text-center px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          Ready to build the future of travel?
        </h2>
        <p className="text-base sm:text-lg mb-8 text-slate-800">
          Join ZeroLuggage and help travelers move freely.
        </p>
        <Button className="bg-white text-indigo-700 px-10 py-5 text-base sm:text-lg">
          View All Openings
        </Button>
      </section>

    </div>
  )
}
