"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Download } from "lucide-react"
import Image from "next/image"
import Img from "@/public/press.jpg"
import { Badge } from "@/components/ui/badge"

/* Animations */
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  whileInView: {
    transition: { staggerChildren: 0.1 },
  },
}

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-screen bg-slate-100">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">

          <motion.div {...fadeInUp} className="text-center pt-12 pb-10">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-slate-900">
              Press <span className="text-slate-700">ZeroLuggage</span>
            </h2>
            <div className="h-1 w-16 bg-slate-900 mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 items-center pb-16">
            <motion.div {...fadeInUp} className="text-center md:text-left">
              <Badge className="mb-4 bg-sky-200 text-slate-900">
                Press ZeroLuggage
              </Badge>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                Stay Connected With
                <br />
                <span className="text-slate-700 font-semibold">
                  ZeroLuggage
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 mb-8 max-w-xl mx-auto md:mx-0">
                Access the latest news, press releases, and media resources from ZeroLuggage.
              </p>

              <Button className="bg-slate-900 text-white px-8 py-5 text-base sm:text-lg">
                Know More
              </Button>
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="relative h-[220px] sm:h-[300px] md:h-[420px] rounded-3xl overflow-hidden shadow-lg"
            >
              <Image src={Img} alt="Press" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRESS RELEASES */}
      <section className="py-14 bg-gray-50 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
          Press Releases & Announcements
        </h2>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          className="grid sm:grid-cols-2 gap-6 max-w-6xl mx-auto"
        >
          {[
            {
              title: "Latest Press Releases",
              items: [
                { date: "Dec 10, 2024", heading: "AI-Powered Platform Launch" },
                { date: "Nov 28, 2024", heading: "Global Partnership Expansion" },
                { date: "Nov 15, 2024", heading: "Q3 Financial Results" },
              ],
            },
            {
              title: "Company Announcements",
              items: [
                { date: "Dec 8, 2024", heading: "New Leadership Appointment" },
                { date: "Nov 22, 2024", heading: "Carbon Neutral Initiative" },
                { date: "Nov 10, 2024", heading: "New Office Expansion" },
              ],
            },
          ].map((section, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-white border rounded-xl p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold mb-5">{section.title}</h3>
              <div className="space-y-4">
                {section.items.map((item, idx) => (
                  <div key={idx} className="border-b last:border-none pb-3">
                    <p className="text-xs text-gray-400">{item.date}</p>
                    <p className="font-medium text-gray-800">
                      {item.heading}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* MEDIA ASSETS */}
      <section className="py-14 bg-gray-100 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
          Downloadable Media Assets
        </h2>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {[
            "Company Logo Pack",
            "Executive Photos",
            "Product Images",
            "Brand Guidelines",
            "Event Photos",
            "Infographics",
          ].map((title, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-white rounded-xl p-5 shadow-md flex flex-col"
            >
              <div className="aspect-video rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                <Download className="w-7 h-7 text-gray-400" />
              </div>
              <h3 className="font-semibold mb-3">{title}</h3>
              <Button variant="outline" className="mt-auto w-full">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CONTACT */}
      <section className="py-14 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
          Contact for Media Inquiries
        </h2>

        <div className="grid sm:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div>
            <h3 className="text-lg font-semibold mb-5">Media Relations</h3>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium mb-3">zeroluggage123@gmail.com</p>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-medium">+91 81930 64679</p>
          </div>

          <form className="space-y-4">
            <Input placeholder="Your Name" />
            <Input placeholder="Email Address" type="email" />
            <Input placeholder="Subject" />
            <Textarea placeholder="Your Message" rows={4} />
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Send Message
            </Button>
          </form>
        </div>
      </section>

    </div>
  )
}
