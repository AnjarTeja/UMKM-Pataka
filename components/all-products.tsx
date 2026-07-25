"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Loader2 } from "lucide-react"
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

const categoryList = ["Semua", "Fashion", "Kriya", "Makanan Ringan", "Makanan"]

export default function AllProducts() {
  const [products, setProducts] = useState<ProductData[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("Semua")
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("/api/produk")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.products || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = products.filter((p) => {
    const matchCategory = activeCategory === "Semua" || p.category === activeCategory
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.store.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-20 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2 text-on-surface-variant text-sm">Memuat produk...</span>
      </div>
    )
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6">
      <div className="text-center mb-8">
        <h1 className="font-heading text-4xl font-bold text-primary">
          Semua Produk
        </h1>
        <p className="text-on-surface-variant mt-1">
          Pesan langsung via WhatsApp — tanpa ribet
        </p>
      </div>

      <div className="max-w-md mx-auto mb-6">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant h-4 w-4" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari produk atau UMKM..."
            className="w-full bg-surface-container border border-outline rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-on-surface placeholder:text-on-surface-variant"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categoryList.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-95 ${
              activeCategory === cat
                ? "bg-primary text-white shadow-sm"
                : "bg-surface-container text-on-surface-variant hover:bg-primary-fixed hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-on-surface-variant">
          Tidak ada produk
        </div>
      )}
    </div>
  )
}
