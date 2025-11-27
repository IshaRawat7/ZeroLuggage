"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, easeOut } from "framer-motion"
import { Github, Twitter, Linkedin } from "lucide-react"

const columns = [
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
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
      { label: "Contact", href: "#support" },
      { label: "Safety", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
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
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
}

const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
  hover: {
    x: 4,
    color: "var(--foreground)",
    transition: { duration: 0.2 },
  },
}

const socialIconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
  hover: {
    scale: 1.2,
    rotate: 5,
    transition: { duration: 0.2 },
  },
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-secondary/40" id="support">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <motion.div
          className="grid gap-12 md:grid-cols-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="mb-4 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                Z
              </span>
              <span className="text-xl font-bold tracking-tight">ZeroLuggage</span>
            </motion.div>
            <motion.p
              className="text-base leading-relaxed text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Smarter luggage pickup, storage, and delivery—anytime, anywhere.
            </motion.p>
            <motion.div
              className="mt-6 flex gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
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
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon size={20} />
                  </motion.a>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Footer Columns */}
          {columns.map((col, idx) => (
            <motion.div key={col.title} variants={itemVariants}>
              <motion.h3
                className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground"
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
                    <Link href={l.href} className="text-base text-muted-foreground transition-colors duration-200">
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
              className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Ready to lighten your trip?
            </motion.h3>
            <form
              onSubmit={(e) => {
                e.preventDefault()
              }}
              className="flex max-w-md gap-2"
              aria-label="Subscribe to updates"
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <motion.div className="flex-1" whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Input id="email" type="email" placeholder="Enter your email" className="flex-1 text-base" required />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
                <Button type="submit" className="bg-sky-600 text-white hover:bg-sky-600 hover:text-white font-semibold">
                  Subscribe
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.p className="font-medium">© {new Date().getFullYear()} ZeroLuggage, Inc.</motion.p>
          <motion.div
            className="flex items-center gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            {["Privacy", "Terms", "Status"].map((item) => (
              <motion.div key={item} variants={linkVariants}>
                <Link href="#" className="font-medium transition-colors duration-200 hover:text-foreground">
                  {item}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
