"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Loader2 } from "lucide-react"
import ProductCard from "./product-card"

interface ProductData {
  id: string
  name: string
  price: string
  image: string
  store: string
  storeId: string
  storeWhatsapp: string | null
  category: string
  categorySlug: string
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ProductData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/produk?featured=true")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.products || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])
  return (
    <section className="max-w-[1400px] mx-auto px-6 mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-2"
      >
        <Sparkles className="h-5 w-5 text-primary" />
        <span className="text-xs font-semibold text-primary uppercase tracking-widest">
          Pilihan Terbaik
        </span>
      </motion.div>

      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-heading text-3xl font-semibold text-primary">
            Produk Unggulan
          </h2>
          <p className="text-on-surface-variant mt-1">
            Karya terbaik pilihan dari UMKM Patakaharja
          </p>
        </div>
        <Link
          href="/produk"
          className="hidden sm:inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline group"
        >
          Lihat Semua
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="ml-2 text-on-surface-variant text-sm">Memuat...</span>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-on-surface-variant text-sm py-12">Belum ada produk unggulan</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-8 text-center sm:hidden"
      >
        <Link
          href="/produk"
          className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline group"
        >
          Lihat Semua Produk
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </section>
  )
}
