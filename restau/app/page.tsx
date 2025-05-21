import Navbar from "@/components/navbar"
import HeroCarousel from "@/components/hero-carousel"
import AboutSection from "@/components/about-section"
import ReservationSection from "@/components/reservation-section"
import MapSection from "@/components/map-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroCarousel />
        <div className="flex items-center justify-center">
          <AboutSection />
        </div>
        <div className="flex items-center justify-center">
          <ReservationSection />
        </div>
        <MapSection />
      </main>
      <Footer />
    </div>
  )
}
