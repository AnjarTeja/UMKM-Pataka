"use client"

import { Store, MapPin, Phone, Clock } from "lucide-react"
import { motion } from "framer-motion"

const stores = [
  {
    name: "Keramik Mbah Kasidi",
    description: "Kerajinan gerabah dan keramik tradisional khas Patakaharja yang telah dirintis sejak 1980. Setiap produk dibuat dengan teknik putar tradisional.",
    owner: "Mbah Kasidi",
    since: "1980",
  },
  {
    name: "Gerabah Ibu Sumini",
    description: "Produk gerabah rumah tangga dengan desain modern namun tetap mempertahankan ciri khas tanah liat Patakaharja.",
    owner: "Ibu Sumini",
    since: "1995",
  },
  {
    name: "Anyaman Pak Jaja",
    description: "Anyaman bambu dan rotan berkualitas tinggi. Dari tikar, keranjang, hingga furnitur minimalis modern.",
    owner: "Pak Jaja",
    since: "2000",
  },
  {
    name: "Kriya Mang Udin",
    description: "Kriya kayu dan ukiran khas Patakaharja. Menggabungkan motif tradisional dengan fungsi kontemporer.",
    owner: "Mang Udin",
    since: "2005",
  },
  {
    name: "Tenun Nining",
    description: "Tenun tradisional dengan motif khas Patakaharja. Menggunakan pewarna alami dan teknik turun-temurun.",
    owner: "Nining",
    since: "2010",
  },
  {
    name: "Kuliner Mang Eman",
    description: "Aneka makanan ringan dan kopi khas Patakaharja. Bahan baku lokal berkualitas dengan resep tradisional.",
    owner: "Mang Eman",
    since: "2015",
  },
]

export default function StoreProfile() {
  return (
    <section className="max-w-[1400px] mx-auto px-6">
      <div className="text-center mb-10">
        <h2 className="font-heading text-3xl font-semibold text-primary">
          Profil UMKM Patakaharja
        </h2>
        <p className="text-on-surface-variant mt-2 max-w-xl mx-auto">
          Setiap produk memiliki cerita. Kenali para pengrajin di balik karya
          terbaik UMKM Desa Patakaharja.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="bg-surface-container-lowest rounded-xl p-6 clay-shadow border border-outline-variant/20 hover:border-primary-fixed-dim/40 transition-all duration-300"
          >
            <div className="h-12 w-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-4">
              <Store className="h-6 w-6" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-primary mb-1">
              {s.name}
            </h3>
            <p className="text-xs text-on-surface-variant flex items-center gap-1 mb-3">
              <MapPin className="h-3 w-3" />
              Desa Patakaharja
            </p>
            <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
              {s.description}
            </p>
            <div className="flex items-center gap-4 text-xs text-on-surface-variant border-t border-outline-variant/20 pt-3">
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3 text-primary" />
                {s.owner}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-primary" />
                Sejak {s.since}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
