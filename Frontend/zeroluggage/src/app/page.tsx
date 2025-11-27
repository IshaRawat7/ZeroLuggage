import { SiteHeader } from "@/components/Home/site-header"
import { Hero } from "@/components/Home/hero"
import { HowItWorks, WhyChoose } from "@/components/Home/feature-grid"
import { Testimonials } from "@/components/Home/testimonials"
import { SiteFooter } from "@/components/Home/site-footer"
import BookingHero from "@/components/Home/book"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <HowItWorks />
        <WhyChoose />
      <BookingHero />
        <Testimonials />
      </main>
      <SiteFooter />
    </>
  )
}
