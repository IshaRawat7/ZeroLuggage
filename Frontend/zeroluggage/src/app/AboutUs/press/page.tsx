"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Download } from "lucide-react"
import Image from "next/image"
import Img from "@/public/press.jpg"

import { Badge } from "@/components/ui/badge"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function MediaPage() {
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
                    Press <span className="text-slate-700">ZeroLuggage</span>
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
                      press ZeroLuggage
                    </Badge>
      
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-slate-900">
                     Stay Connected With 
                      <br />
                      <span className="text-slate-700 font-semibold">
                       ZeroLuggage
                      </span>
                    </h1>
      
                    <p className="text-lg text-slate-700 mb-8 max-w-xl">
                     Access the latest news, press releases, and media resources from ZeroLuggage. Stay informed about our innovations, partnerships, and industry insights.
                    </p>
      
                    <Button className="bg-slate-900 text-white px-10 py-6 text-lg hover:scale-105 transition">
                     Know More!
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

     
     {/* Press Releases & Announcements */}
<section className="py-16 bg-gray-50">
  <div className="container mx-auto px-6">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-3xl font-bold text-center mb-12"
    >
      Press Releases & Announcements
    </motion.h2>

    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
    >
      {[
        {
          title: "Latest Press Releases",
          items: [
            { date: "December 10, 2024", heading: "CorporateConnect Launches New AI-Powered Platform" },
            { date: "November 28, 2024", heading: "Partnership Announcement: Expanding Global Reach" },
            { date: "November 15, 2024", heading: "Q3 Financial Results Exceed Expectations" },
          ],
        },
        {
          title: "Company Announcements",
          items: [
            { date: "December 8, 2024", heading: "New Leadership Appointment: Chief Innovation Officer" },
            { date: "November 22, 2024", heading: "Sustainability Initiative: Carbon Neutral by 2025" },
            { date: "November 10, 2024", heading: "Office Expansion: New Innovation Hub Opens" },
          ],
        },
      ].map((section, idx) => (
        <motion.div
          key={idx}
          variants={fadeInUp}
          whileHover={{ scale: 1.03, boxShadow: "0 15px 25px rgba(0,0,0,0.15)" }}
          className="border rounded-xl p-6 bg-white transition-all duration-300 cursor-pointer"
        >
          <h3 className="text-xl font-semibold mb-6">{section.title}</h3>
          <div className="space-y-5">
            {section.items.map((item, i) => (
              <div
                key={i}
                className="pb-4 border-b last:border-none"
              >
                <p className="text-sm text-gray-400 mb-1">{item.date}</p>
                <h4 className="font-medium text-gray-800 hover:text-blue-600 transition-colors">
                  {item.heading}
                </h4>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

{/* Downloadable Media Assets */}
<motion.section
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="py-16 bg-gray-100"
>
  <div className="container mx-auto px-6">
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-3xl font-bold text-center mb-12"
    >
      Downloadable Media Assets
    </motion.h2>

    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
    >
      {[
        { title: "Company Logo Pack", desc: "High-resolution logos in various formats" },
        { title: "Executive Photos", desc: "Professional headshots of leadership team" },
        { title: "Product Images", desc: "Marketing materials and product photography" },
        { title: "Brand Guidelines", desc: "Complete brand identity documentation" },
        { title: "Event Photos", desc: "Recent company events and conferences" },
        { title: "Infographics", desc: "Data visualizations and statistics" },
      ].map((asset, idx) => (
        <motion.div
          key={idx}
          variants={fadeInUp}
          whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 30px rgba(0,0,0,0.12)" }}
          className="bg-white rounded-xl p-6 flex flex-col justify-between transition-all duration-300"
        >
          <div className="aspect-video rounded-lg mb-4 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
            <Download className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-semibold text-lg mb-2">{asset.title}</h3>
          <p className="text-sm text-gray-500 mb-4">{asset.desc}</p>
          <Button variant="outline" className="w-full bg-transparent flex items-center justify-center">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </motion.div>
      ))}
    </motion.div>
  </div>
</motion.section>


      {/* Contact for Media Inquiries */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16"
      >
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Contact for Media Inquiries
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-semibold mb-6">Media Relations</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="font-medium">zeroluggage123@gmail.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <p className="font-medium">+91 (8193064679)</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Connect with us</p>
                  <p className="font-medium">Sunday-Saturday</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-semibold mb-6">Send an Inquiry</h3>
              <form className="space-y-4">
                <motion.div variants={fadeInUp}>
                  <Input placeholder="Your Name" className="w-full h-12" />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Input placeholder="Email Address" type="email" className="w-full h-12" />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Input placeholder="Subject" className="w-full h-12" />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Textarea placeholder="Your Message" rows={4} className="w-full h-12" />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Send Message
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    
    </div>
  )
}
