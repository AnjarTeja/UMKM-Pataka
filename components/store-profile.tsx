"use client"

import { useEffect, useState } from "react"
import { Store, MapPin, Phone, Package, Loader2 } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { normalizeWaNumber } from "@/lib/utils"

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

const AVATAR_COLORS = [
  "from-violet-500 to-purple-600",
  "from-emerald-500 to-teal-600",
  "from-blue-500 to-indigo-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
  "from-cyan-500 to-sky-600",
]

function waChat(store: StoreItem) {
  const waNumber = normalizeWaNumber(store.whatsapp) || "6281234567890"
  const msg = encodeURIComponent(
    `Halo, saya tertarik dengan produk dari *${store.name}*. Apakah masih tersedia?`
  )
  window.open(`https://wa.me/${waNumber}?text=${msg}`, "_blank")
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
          {stores.map((s, i) => {
            const gradient = AVATAR_COLORS[i % AVATAR_COLORS.length]
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group bg-surface-container-lowest rounded-xl clay-shadow border border-outline-variant/20 hover:border-primary-fixed-dim/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="p-5 pb-3">
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shrink-0 shadow-sm`}>
                      <Store className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading text-lg font-semibold text-primary truncate">
                        {s.name}
                      </h3>
                      {s.address && (
                        <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5 truncate">
                          <MapPin className="h-3 w-3 shrink-0" />
                          {s.address}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-on-surface-variant mt-3 leading-relaxed line-clamp-3">
                    {s.description || "Tidak ada deskripsi"}
                  </p>
                </div>

                <div className="mx-5 border-t border-outline-variant/20" />

                <div className="p-5 pt-3 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-on-surface-variant">
                    <span className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-primary" />
                      {s.user.name}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Package className="h-3.5 w-3.5 text-primary" />
                      {s._count.products} Produk
                    </span>
                  </div>

                  {s.whatsapp && (
                    <button
                      onClick={() => waChat(s)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition-all active:scale-[0.98] shadow-sm"
                    >
                      <Image src="/whatsapp-logo.png" alt="WhatsApp" width={16} height={16} className="h-4 w-4" />
                      Hubungi via WhatsApp
                    </button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </section>
  )
}
