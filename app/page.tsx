import HeroSection from "@/components/hero-section"
import StatsCards from "@/components/stats-cards"
import VillageInfo from "@/components/village-info"
import FeaturedProducts from "@/components/featured-products"
import VillageGallery from "@/components/village-gallery"
import Testimonials from "@/components/testimonials"
import MapMini from "@/components/map-mini"

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsCards />
      <VillageInfo />
      <FeaturedProducts />
      <VillageGallery />
      <Testimonials />
      <MapMini />
    </>
  )
}
