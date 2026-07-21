import { Metadata } from "next"
import MapSection from "@/components/map-section"

export const metadata: Metadata = {
  title: "Peta Lokasi UMKM — Patakaharja",
  description: "Temukan lokasi UMKM di Desa Patakaharja dan kunjungi langsung para pengrajin.",
}

export default function PetaPage() {
  return (
    <div className="py-12">
      <MapSection />
    </div>
  )
}
