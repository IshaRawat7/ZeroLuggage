import { Hero } from "@/components/Home/hero"
import { HowItWorks, WhyChoose } from "@/components/Home/feature-grid"
import { Testimonials } from "@/components/Home/testimonials"
import { SiteFooter } from "@/components/Home/site-footer"
import BookingHero from "@/components/Home/book"
import { SiteHeader } from "@/components/Home/site-header"
import Destination from "@/components/Home/destination"

export default function Page() {
  return (
    <>
      <SiteHeader />

      <main className="overflow-x-hidden">
        {/* Hero usually needs full width */}
        <Hero />

        {/* Content Sections */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-24">
          <HowItWorks />
          <WhyChoose />
          <BookingHero />
          <Destination />
          <Testimonials />
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
