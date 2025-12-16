
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
      <SiteHeader/>
      <main>
        
        <Hero />
        <HowItWorks />
        <WhyChoose />
      <BookingHero />
      <Destination/>
        <Testimonials />
      </main>
      <SiteFooter />
    </>
  )
}
