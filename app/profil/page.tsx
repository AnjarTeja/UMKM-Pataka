import { Metadata } from "next"
import StoreProfile from "@/components/store-profile"

export const metadata: Metadata = {
  title: "Profil UMKM — Patakaharja",
  description: "Kenali para pengrajin dan UMKM di Desa Patakaharja.",
}

export default function ProfilPage() {
  return (
    <div className="py-12">
      <StoreProfile />
    </div>
  )
}
