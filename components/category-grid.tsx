"use client"

import { motion } from "framer-motion"
import { Flower2, Utensils, Home, Sparkles } from "lucide-react"

const categories = [
  { name: "Vase", icon: Flower2 },
  { name: "Tableware", icon: Utensils },
  { name: "Home Decor", icon: Home },
  { name: "Artisan Specials", icon: Sparkles },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
}

export default function CategoryGrid() {
  return (
    <section id="categories" className="max-w-[1400px] mx-auto px-6 mt-section-gap">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-heading text-3xl font-semibold text-primary">
            Kategori Unggulan
          </h2>
          <p className="text-on-surface-variant mt-1">
            Temukan keindahan dalam setiap lekukan
          </p>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <motion.button
              key={cat.name}
              variants={item}
              className="group flex flex-col items-center gap-4 p-8 rounded-2xl bg-surface hover:bg-secondary-container transition-all clay-shadow clay-card-hover border border-outline-variant/20 cursor-pointer"
            >
              <div className="h-16 w-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Icon className="h-7 w-7" />
              </div>
              <span className="text-sm font-semibold text-on-surface">
                {cat.name}
              </span>
            </motion.button>
          )
        })}
      </motion.div>
    </section>
  )
}
