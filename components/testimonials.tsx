"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { formatPrice, normalizeWaNumber } from "@/lib/utils"

interface ProductItem {
  id: string
  name: string
  price: string
  image: string
  store: string
  storeId: string
  storeWhatsapp: string | null
  category: string
  orderCount: number
}

function waOrder(product: ProductItem) {
  const waNumber = normalizeWaNumber(product.storeWhatsapp) || "6281234567890"
  const msg = encodeURIComponent(
    `Halo, saya tertarik dengan produk *${product.name}* (${product.store}) seharga ${formatPrice(product.price)}. Apakah masih tersedia?`
  )
  window.open(`https://wa.me/${waNumber}?text=${msg}`, "_blank")

  if (product.id && product.storeId) {
    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product.id,
        storeId: product.storeId,
        quantity: 1,
      }),
    }).catch(() => {})
  }
}

export default function Testimonials() {
  const [products, setProducts] = useState<ProductItem[]>([])
  const [loading, setLoading] = useState(true)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    fetch("/api/produk?popular=true")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const prev = () => setCurrent((c) => (c === 0 ? products.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === products.length - 1 ? 0 : c + 1))

  const p = products[current]

  if (loading) {
    return (
      <section className="max-w-[1400px] mx-auto px-6 mt-16">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Pilihan</span>
          <h2 className="font-heading text-3xl font-semibold text-primary">Produk Populer</h2>
          <p className="text-on-surface-variant mt-1 max-w-md mx-auto">Produk favorit dari UMKM Patakaharja — pesan langsung via WhatsApp</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="relative bg-surface-container-lowest rounded-2xl clay-shadow border border-outline-variant/20 overflow-hidden">
            <div className="h-72 bg-surface-container animate-pulse" />
            <div className="p-6 space-y-3">
              <div className="h-4 w-24 bg-surface-container animate-pulse rounded" />
              <div className="h-3 w-16 bg-surface-container animate-pulse rounded" />
              <div className="h-6 w-48 bg-surface-container animate-pulse rounded" />
              <div className="h-8 w-32 bg-surface-container animate-pulse rounded" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <section className="max-w-[1400px] mx-auto px-6 mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
          Pilihan
        </span>
        <h2 className="font-heading text-3xl font-semibold text-primary">
          Produk Populer
        </h2>
        <p className="text-on-surface-variant mt-1 max-w-md mx-auto">
          Produk favorit dari UMKM Patakaharja — pesan langsung via WhatsApp
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <div className="relative bg-surface-container-lowest rounded-2xl clay-shadow border border-outline-variant/20 overflow-hidden">
          <div className="relative min-h-[400px] flex flex-col">
            <div className="h-72 overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" as const }}
                className="p-6 space-y-3 flex-1 flex flex-col justify-between"
              >
                <div>
                  {p.store && (
                    <p className="text-sm text-primary font-medium">{p.store}</p>
                  )}
                  <p className="text-xs font-medium text-on-secondary-container uppercase tracking-wide">
                    {p.category}
                  </p>
                  <h3 className="font-heading text-xl font-semibold text-primary mt-1">
                    {p.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-2xl text-on-surface">
                    {formatPrice(p.price)}
                  </span>
                  <button
                    onClick={() => waOrder(p)}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition-all active:scale-90 shadow-sm"
                  >
                    <Image src="/whatsapp-logo.png" alt="WhatsApp" width={16} height={16} className="h-4 w-4" />
                    Pesan WA
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between px-6 pb-6">
            <div className="flex items-center gap-1.5">
              {products.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-primary"
                      : "w-2 bg-outline-variant hover:bg-outline"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="h-9 w-9 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-primary-fixed hover:text-primary transition-all active:scale-90"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                className="h-9 w-9 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-primary-fixed hover:text-primary transition-all active:scale-90"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
