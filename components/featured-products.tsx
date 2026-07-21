"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import ProductCard from "./product-card"

const featured = [
  {
    store: "Keramik Mbah Kasidi",
    category: "Vase Artisan",
    name: "Amethyst Curve Vase",
    price: "Rp 450.000",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80",
  },
  {
    store: "Gerabah Ibu Sumini",
    category: "Tableware",
    name: "Rustic Earth Bowl Set",
    price: "Rp 325.000",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&q=80",
  },
  {
    store: "Anyaman Pak Jaja",
    category: "Home Decor",
    name: "Lavender Lumina Base",
    price: "Rp 890.000",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&q=80",
  },
  {
    store: "Kriya Mang Udin",
    category: "Artisan Specials",
    name: "Midnight Bloom Cups",
    price: "Rp 180.000",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80",
  },
]

export default function FeaturedProducts() {
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((product, i) => (
          <ProductCard
            key={`${product.store}-${product.name}`}
            product={product}
            index={i}
          />
        ))}
      </div>

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
