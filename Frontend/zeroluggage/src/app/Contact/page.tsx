"use client"

import type React from "react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, MessageSquare, Award } from "lucide-react"

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitStatus("success")
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      setTimeout(() => setSubmitStatus("idle"), 3000)
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-muted">

      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto text-center animate-slideInUp">
          <span className="inline-block px-4 py-2 bg-accent/20 text-secondary rounded-full text-sm font-semibold mb-6">
            Get In Touch
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Let's Connect with ZweoLuggage
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Have questions about our premium luggage collections? Need travel advice? Our team is here to help you find
            the perfect companion for your journey.
          </p>
        </div>
      </section>

      {/* Contact Stats */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: MessageSquare, label: "24/7 Support", value: "Always Available" },
              { icon: Clock, label: "Response Time", value: "Under 2 Hours" },
              { icon: Award, label: "Expert Team", value: "15+ Years" },
              { icon: Phone, label: "Dedicated Line", value: "+1-800-LUGGAGE" },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 bg-card rounded-xl border border-border hover:border-secondary/50 transition-all duration-300 hover:shadow-lg animate-slideInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <stat.icon className="w-8 h-8 text-secondary mb-3" />
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-lg font-semibold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6 animate-slideInLeft">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
              </div>

              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "support@zweoluggage.com",
                  secondary: "hello@zweoluggage.com",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+1 (800) 254-8232",
                  secondary: "+44 (20) 7946 0958",
                },
                {
                  icon: MapPin,
                  label: "Address",
                  value: "New York, USA",
                  secondary: "London, UK | Dubai, UAE",
                },
              ].map((contact, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-card border border-border hover:bg-accent/5 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <contact.icon className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground font-medium mb-1">{contact.label}</p>
                      <p className="text-foreground font-semibold">{contact.value}</p>
                      {contact.secondary && <p className="text-sm text-muted-foreground mt-1">{contact.secondary}</p>}
                    </div>
                  </div>
                </div>
              ))}

              {/* Social Links */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground font-medium mb-4">Follow Us</p>
                <div className="flex gap-3">
                  {["Instagram", "Twitter", "LinkedIn", "Facebook"].map((social) => (
                    <button
                      key={social}
                      className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary hover:text-white transition-all duration-300 flex items-center justify-center text-sm font-semibold"
                    >
                      {social[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 animate-slideInRight">
              <div className="p-8 bg-card rounded-2xl border border-border shadow-lg">
                <h3 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Full Name</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="h-11 bg-background border-border focus:border-secondary"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Email Address</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="h-11 bg-background border-border focus:border-secondary"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Phone Number</label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="h-11 bg-background border-border focus:border-secondary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Subject</label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        className="h-11 bg-background border-border focus:border-secondary"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Message</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      className="resize-none h-32 bg-background border-border focus:border-secondary"
                      required
                    />
                  </div>

                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200 text-sm">
                      Thank you! We'll get back to you shortly.
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200 text-sm">
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-lg transition-all duration-300"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>

              {/* Quick Response Promise */}
              <div className="mt-6 p-4 bg-accent/10 border border-accent/30 rounded-lg text-center">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">We promise a response within 24 hours.</span> Our team is committed to
                  helping you find the perfect ZweoLuggage solution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "What's the warranty on ZweoLuggage products?",
                a: "All our products come with a lifetime warranty covering manufacturing defects.",
              },
              {
                q: "Do you offer international shipping?",
                a: "Yes! We ship to over 150 countries with free shipping on orders over $500.",
              },
              {
                q: "How can I track my order?",
                a: "Once shipped, you'll receive a tracking number via email to monitor your package.",
              },
              {
                q: "What's your return policy?",
                a: "We offer a 30-day hassle-free return policy on all products.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="p-6 bg-card rounded-lg border border-border hover:shadow-md transition-all duration-300 animate-slideInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="font-semibold text-foreground mb-3">{faq.q}</h3>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-secondary to-primary rounded-2xl p-12 text-center text-white animate-scaleIn">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg mb-8 opacity-90">
            Explore our premium luggage collection and find your perfect travel companion.
          </p>
          <Button className="bg-accent text-secondary hover:bg-accent/90 text-lg px-8 py-6">Shop Now</Button>
        </div>
      </section>

      
    </div>
  )
}
