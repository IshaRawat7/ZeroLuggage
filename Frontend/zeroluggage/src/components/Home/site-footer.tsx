"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, easeOut } from "framer-motion"
import { Github, Twitter, Linkedin, ArrowUp } from "lucide-react"

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "./AboutUs/aboutUs" },
      { label: "Careers", href: "./AboutUs/careers" },
      { label: "Press", href: "./AboutUs/press" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#" },
      { label: "Help Center", href: "#support" },
      { label: "Guides", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "./Contact" },
      { label: "Safety & Security", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
]

const socialLinks = [
  { icon: Github, href: "https://Github.com", label: "Github" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  hover: { x: 4, color: "var(--foreground)", transition: { duration: 0.2 } },
}

const socialIconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.3, rotate: 10, transition: { duration: 0.2 } },
}

export function SiteFooter() {
  return (
    <footer className="bg-gradient-to-t from-sky-600 to-sky-700 text-white border-t border-sky-700">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <motion.div
          className="grid gap-12 md:grid-cols-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <motion.div className="mb-4 flex items-center gap-3" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white text-sky-900 font-bold text-lg">
                Z
              </span>
              <span className="text-2xl font-bold tracking-tight text-white">ZeroLuggage</span>
            </motion.div>
            <motion.p className="text-base leading-relaxed text-white/90" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
              Travel hands-free. Pick up, store, or deliver your luggage anytime, anywhere.
            </motion.p>
            <motion.div className="mt-6 flex gap-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    variants={socialIconVariants}
                    whileHover="hover"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white hover:text-sky-800 shadow-lg"
                  >
                    <Icon size={20} />
                  </motion.a>
                )
              })}
            </motion.div>

            {/* Feature badges */}
            <div className="mt-6 flex flex-wrap gap-3">
              {["Fast Pickup", "Secure Storage", "Real-time Tracking"].map((feat) => (
                <span key={feat} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 hover:bg-white/30 transition">
                  {feat}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Footer Columns */}
          {columns.map((col, idx) => (
            <motion.div key={col.title} variants={itemVariants}>
              <motion.h3
                className="mb-4 text-sm font-bold uppercase tracking-wider text-white/90"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 + idx * 0.05 }}
              >
                {col.title}
              </motion.h3>
              <ul className="space-y-3">
                {col.links.map((l, linkIdx) => (
                  <motion.li
                    key={l.label}
                    variants={linkVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    transition={{ delay: linkIdx * 0.05 }}
                  >
                    <Link href={l.href} className="text-white/70 hover:text-white transition-colors duration-200">
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter Section */}
          <motion.div variants={itemVariants} className="md:col-span-2 md:col-start-4">
            <motion.h3
              className="mb-4 text-sm font-bold uppercase tracking-wider text-white/90"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Ready to travel hands-free?
            </motion.h3>
            <motion.p className="mb-4 text-white/70 text-sm">
              Subscribe to get tips, discounts, and updates about our luggage services.
            </motion.p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row max-w-md gap-3"
              aria-label="Subscribe to updates"
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <motion.div className="flex-1" whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 text-base h-12 bg-white/10 placeholder:text-white/70 text-white border-white/30 focus:border-white focus:bg-white/20"
                  required
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
                <Button type="submit" className="bg-gradient-to-r from-sky-500 to-sky-600 h-12 text-white font-semibold hover:brightness-110">
                  Subscribe
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-sky-700 pt-8 text-sm md:flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.p className="font-medium text-white/80">
            © {new Date().getFullYear()} ZeroLuggage, Inc. | Travel lighter, smarter.
          </motion.p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Status"].map((item) => (
              <motion.div key={item} variants={linkVariants}>
                <Link href="#" className="font-medium text-white/70 hover:text-white transition-colors duration-200">
                  {item}
                </Link>
              </motion.div>
            ))}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1 text-white/70 hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
            >
              Back to top <ArrowUp size={16} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
