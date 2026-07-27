"use client"

import { useEffect, useState } from "react"
import { Store, MapPin, Phone, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

interface StoreItem {
  id: string
  name: string
  slug: string
  description: string | null
  address: string | null
  whatsapp: string | null
  user: { name: string }
  _count: { products: number }
}

export default function StoreProfile() {
  const [stores, setStores] = useState<StoreItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/umkm")
      .then((r) => r.json())
      .then((data) => { setStores(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

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

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : stores.length === 0 ? (
        <p className="text-center text-on-surface-variant py-20">Belum ada UMKM terdaftar</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((s, i) => (
            <motion.div
              key={s.id}
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
              {s.address && (
                <p className="text-xs text-on-surface-variant flex items-center gap-1 mb-3">
                  <MapPin className="h-3 w-3" />
                  {s.address}
                </p>
              )}
              <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
                {s.description || "Tidak ada deskripsi"}
              </p>
              <div className="flex items-center gap-4 text-xs text-on-surface-variant border-t border-outline-variant/20 pt-3">
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3 text-primary" />
                  {s.user.name}
                </span>
                <span className="flex items-center gap-1">
                  {s._count.products} Produk
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}
