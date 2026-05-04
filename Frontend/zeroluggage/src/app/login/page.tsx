import type { Metadata } from "next"
import { Suspense } from "react"
import { LoginForm } from "@/components/Login/login-form"
import { AnimatedLoginArt } from "@/components/Login/login-animate"

export const metadata: Metadata = {
  title: "Login • ZeroLuggage",
  description: "Login to ZeroLuggage to manage your bookings and pickups.",
}

export default function login() {
  return (
    <main className=" min-h-screen bg-sky-100">
      <section className="container  mx-auto px-4 py-24 md:py-24">
        <div className="mx-auto grid max-w-5xl items-stretch gap-8 md:grid-cols-2">
          {/* Left: Form */}
          <div className="rounded-xl border bg-card p-6 shadow-sm md:p-8">
            <LoginForm />
          </div>

          {/* Right: Animated Illustration */}
          <div className="rounded-xl border bg-muted/30 p-2">
            <Suspense fallback={<div className="aspect-4/3 w-full rounded-lg bg-muted" aria-hidden />}>
              <AnimatedLoginArt />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  )
}
