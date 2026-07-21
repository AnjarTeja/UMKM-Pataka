"use client"

import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

export interface ProductData {
  category: string
  name: string
  price: string
  image: string
  store?: string
}

interface Props {
  product: ProductData
  index: number
}

function waOrder(product: ProductData) {
  const msg = encodeURIComponent(
    `Halo, saya tertarik dengan produk *${product.name}* (${product.category}) seharga ${product.price}. Apakah masih tersedia?`
  )
  window.open(`https://wa.me/6281234567890?text=${msg}`, "_blank")
}

export default function ProductCard({ product, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="bg-surface rounded-2xl overflow-hidden clay-shadow clay-card-hover border border-outline-variant/20 group"
    >
      <div className="relative h-64 bg-surface-container overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-5">
        {product.store && (
          <p className="text-xs text-primary font-medium mb-0.5">{product.store}</p>
        )}
        <p className="text-xs font-medium text-on-secondary-container mb-1 uppercase tracking-wide">
          {product.category}
        </p>
        <h3 className="font-heading text-base font-semibold text-primary mb-3 line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg text-on-surface">{product.price}</span>
          <button
            onClick={() => waOrder(product)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500 text-white text-xs font-semibold hover:bg-green-600 transition-all active:scale-90 shadow-sm"
          >
            <MessageCircle className="h-4 w-4" />
            Pesan WA
          </button>
        </div>
      </div>
    </motion.div>
  )
}
