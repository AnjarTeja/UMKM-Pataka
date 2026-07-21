import { Metadata } from "next"
import AllProducts from "@/components/all-products"

export const metadata: Metadata = {
  title: "Produk UMKM — Patakaharja",
  description: "Jelajahi dan pesan produk kerajinan UMKM Desa Patakaharja langsung via WhatsApp.",
}

export default function ProdukPage() {
  return (
    <div className="py-12">
      <AllProducts />
    </div>
  )
}
