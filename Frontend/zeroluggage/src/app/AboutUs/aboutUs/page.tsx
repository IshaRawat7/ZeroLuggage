"use client"

import { motion } from "framer-motion"
import { FileText, Users, TrendingUp, Shield, Lightbulb, Globe} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Img from "@/public/about.jpg"
import Img1 from "@/public/travel.jpg"
import Img3 from "@/public/booking.jpg"
import Img2 from "@/public/log.jpg"
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
    <div className="min-h-screen bg-white">
     
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
              About <span className="text-slate-700">ZeroLuggage</span>
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
                About ZeroLuggage
              </Badge>

              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-slate-900">
                Your Bags, Our Journey
                <br />
                <span className="text-slate-700 font-semibold">
                  Smoother Journeys
                </span>
              </h1>

              <p className="text-lg text-slate-700 mb-8 max-w-xl">
                We believe travel should be about experiences, not carrying burdens.Affordable, transparent, and convenient — that’s our promise to you.
              </p>

              <Button className="bg-slate-900 text-white px-10 py-6 text-lg hover:scale-105 transition">
                Explore More!
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

      

      {/* Our Journey */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
              Our Journey: A Legacy of Innovation and Trust
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                At ZeroLuggage, our mission is simple: to make travel effortless and stress-free. We understand that carrying luggage through stations, airports, and city streets can be exhausting, so we created a service that allows you to travel freely while we handle your bags with care.
              </p>
              <p>
                ZeroLuggage is a modern luggage pickup and delivery platform designed for busy travelers, students, professionals, and tourists. We combine cutting-edge logistics, reliable partners, and real-time tracking to ensure your belongings reach their destination safely and on time.
              </p>
              <p>
               Founded with the vision of simplifying travel, ZeroLuggage started as a small initiative to solve a common problem—cumbersome luggage. Over time, we have grown into a trusted service connecting cities, providing convenient solutions, and creating a seamless experience for travelers across the country.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            The Principles That Guide Our Success
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {principles.map((principle, index) => {
              const Icon = principle.icon
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="bg-white rounded-lg p-8 shadow-sm hover:shadow-xl transition-all border"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6"
                  >
                    <Icon className="w-7 h-7 text-blue-600" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3">{principle.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{principle.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-6">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-3xl md:text-4xl font-bold text-center mb-16"
    >
      What We Do: Making Travel Hassle-Free
    </motion.h2>

    <div className="space-y-20 max-w-6xl mx-auto">
      {/* Smart Luggage Delivery */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        <div>
          <h3 className="text-2xl font-bold mb-4">Smart Luggage Delivery</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            We pick up your luggage from your doorstep and deliver it safely to your destination, so you can travel
            light and stress-free.
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Door-to-door luggage pickup and delivery
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Real-time tracking of your luggage
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Guaranteed safe and timely delivery
            </li>
          </ul>
        </div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative h-80 rounded-lg overflow-hidden shadow-lg"
        >
          <Image src={Img1} alt="Smart luggage delivery" fill className="object-cover" />
        </motion.div>
      </motion.div>

      {/* Travel Management & Booking Assistance */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative h-80 rounded-lg overflow-hidden shadow-lg md:order-1 order-2"
        >
          <Image src={Img3} alt="Travel management" fill className="object-cover" />
        </motion.div>
        <div className="md:order-2 order-1">
          <h3 className="text-2xl font-bold mb-4">Travel Management & Booking Assistance</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            We assist travelers with streamlined booking, flexible schedules, and seamless travel experiences,
            making your journey comfortable and convenient.
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Integrated booking and delivery services
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Personalized travel assistance
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Timely notifications and updates
            </li>
          </ul>
        </div>
      </motion.div>

      {/* AI-Powered Route & Logistics Optimization */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        <div>
          <h3 className="text-2xl font-bold mb-4">AI-Powered Route & Logistics Optimization</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            Our smart algorithms optimize delivery routes and schedules, ensuring faster delivery times and lower
            operational costs while maintaining reliability.
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Intelligent route planning for quick delivery
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Predictive delivery time estimation
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Data-driven operational insights
            </li>
          </ul>
        </div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative h-80 rounded-lg overflow-hidden shadow-lg"
        >
          <Image src={Img2} alt="AI logistics" fill className="object-cover" />
        </motion.div>
      </motion.div>
    </div>
  </div>
</section>

    </div>
  )
}
