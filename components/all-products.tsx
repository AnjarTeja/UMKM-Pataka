"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ProductCard from "./product-card"

const allProducts = [
  { store: "Keramik Mbah Kasidi", category: "Vase Artisan", name: "Amethyst Curve Vase", price: "Rp 450.000", image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80" },
  { store: "Gerabah Ibu Sumini", category: "Tableware", name: "Rustic Earth Bowl Set", price: "Rp 325.000", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&q=80" },
  { store: "Anyaman Pak Jaja", category: "Home Decor", name: "Lavender Lumina Base", price: "Rp 890.000", image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&q=80" },
  { store: "Kriya Mang Udin", category: "Artisan Specials", name: "Midnight Bloom Cups", price: "Rp 180.000", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80" },
  { store: "Tenun Nining", category: "Fashion", name: "Songket Pataka Modern", price: "Rp 1.250.000", image: "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=600&q=80" },
  { store: "Kuliner Mang Eman", category: "Food & Beverage", name: "Kopi Pataka Roast", price: "Rp 85.000", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80" },
  { store: "Keramik Mbah Kasidi", category: "Vase Artisan", name: "Candi Mini Pataka", price: "Rp 650.000", image: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=600&q=80" },
  { store: "Gerabah Ibu Sumini", category: "Tableware", name: "Piring Tanah Liat Set", price: "Rp 275.000", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&q=80" },
  { store: "Anyaman Pak Jaja", category: "Home Decor", name: "Tikar Modern Motif Pataka", price: "Rp 520.000", image: "https://images.unsplash.com/photo-1602874801007-bd1d3c3e6a8f?w=600&q=80" },
  { store: "Tenun Nining", category: "Fashion", name: "Selendang Pataka", price: "Rp 450.000", image: "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=600&q=80" },
  { store: "Kuliner Mang Eman", category: "Food & Beverage", name: "Kripik Pisang Pataka", price: "Rp 35.000", image: "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=600&q=80" },
  { store: "Kriya Mang Udin", category: "Artisan Specials", name: "Patung Mini Pataka", price: "Rp 750.000", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80" },
]

const categories = ["Semua", "Vase Artisan", "Tableware", "Home Decor", "Artisan Specials", "Fashion", "Food & Beverage"]

export default function AllProducts() {
  const [activeCategory, setActiveCategory] = useState("Semua")

  const filtered = activeCategory === "Semua"
    ? allProducts
    : allProducts.filter((p) => p.category === activeCategory)

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

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
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
              key={`${product.store}-${product.name}`}
              product={product}
              index={i}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-on-surface-variant">
          Tidak ada produk di kategori ini
        </div>
      )}
    </div>
  )
}
