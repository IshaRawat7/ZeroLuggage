"use client"

import { motion } from "framer-motion"
import { FileText, Users, TrendingUp, Shield, Lightbulb, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"

import Img from "@/public/about.jpg"
import Img1 from "@/public/travel.jpg"
import Img2 from "@/public/log.jpg"
import Img3 from "@/public/booking.jpg"

/* Animations */
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

/* Data */
const principles = [
  {
    icon: FileText,
    title: "Integrity First",
    description:
      "We uphold the highest ethical standards in every decision, ensuring transparency and trust with our clients and partners.",
  },
  {
    icon: Users,
    title: "Pioneering Innovation",
    description:
      "We continuously push boundaries, leveraging cutting-edge technology to deliver transformative solutions.",
  },
  {
    icon: TrendingUp,
    title: "Client-Centricity",
    description:
      "Our clients' success drives everything we do. We tailor solutions to meet their unique needs and exceed expectations.",
  },
  {
    icon: Shield,
    title: "Collaborative Growth",
    description:
      "We believe in the power of partnership, working closely with clients to achieve shared goals and sustainable growth.",
  },
  {
    icon: Lightbulb,
    title: "Strategic Expertise",
    description:
      "Our team combines deep industry knowledge with strategic thinking to deliver solutions that create lasting value.",
  },
  {
    icon: Globe,
    title: "Global Perspective",
    description:
      "We operate with a global mindset, understanding diverse markets and adapting solutions for worldwide impact.",
  },
]

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="relative min-h-screen bg-slate-100">
        <div className="absolute -top-40 -left-40 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white/60 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-40 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white/40 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center pt-12 pb-10"
          >
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-slate-900">
              About <span className="text-slate-700">ZeroLuggage</span>
            </h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 bg-slate-900 mx-auto mt-4 rounded-full"
            />
          </motion.div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-10 items-center pb-16">
            <motion.div {...fadeUp} className="text-center md:text-left">
              <Badge className="mb-4 bg-sky-200 text-slate-900">
                About ZeroLuggage
              </Badge>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 text-slate-900 leading-tight">
                Your Bags, Our Journey
                <br />
                <span className="text-slate-700 font-semibold">
                  Smoother Journeys
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 mb-8 max-w-xl mx-auto md:mx-0">
                We believe travel should be about experiences, not carrying burdens.
                Affordable, transparent, and convenient — that’s our promise.
              </p>

              <Button className="bg-slate-900 text-white px-8 py-5 text-base sm:text-lg hover:scale-105 transition">
                Explore More
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative h-[260px] sm:h-[320px] md:h-[420px] rounded-3xl overflow-hidden shadow-lg"
            >
              <Image src={Img} alt="ZeroLuggage team" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            Our Journey
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            ZeroLuggage was created to make travel effortless and stress-free.
            We handle your bags so you can enjoy your journey.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Using reliable logistics and real-time tracking, we ensure your luggage
            arrives safely and on time.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 bg-gray-50 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
          Our Core Principles
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {principles.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
          What We Do
        </h2>

        <div className="space-y-16 max-w-6xl mx-auto">
          {[Img1, Img3, Img2].map((img, i) => (
            <div
              key={i}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div className={`${i % 2 !== 0 ? "md:order-2" : ""}`}>
                <h3 className="text-xl font-bold mb-3">
                  Smart Travel Solutions
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Seamless luggage delivery, optimized logistics, and
                  hassle-free travel experiences for everyone.
                </p>
              </div>

              <div className="relative h-56 sm:h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
                <Image src={img} alt="Service" fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
