"use client"

import { motion } from "framer-motion"
import { Image as ImageIcon } from "lucide-react"

const images = [
  {
    src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80",
    alt: "Suasana pedesaan Patakaharja",
    label: "Pesona Alam Desa",
  },
  {
    src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe8ef?w=600&q=80",
    alt: "Pengrajin gerabah tradisional",
    label: "Proses Pembuatan Gerabah",
  },
  {
    src: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80",
    alt: "Hasil kerajinan tanah liat",
    label: "Karya Unggulan UMKM",
  },
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

export default function VillageGallery() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-2"
      >
        <ImageIcon className="h-5 w-5 text-primary" />
        <span className="text-xs font-semibold text-primary uppercase tracking-widest">
          Galeri Desa
        </span>
      </motion.div>

      <div className="mb-8">
        <h2 className="font-heading text-3xl font-semibold text-primary">
          Potret Patakaharja
        </h2>
        <p className="text-on-surface-variant mt-1">
          Sekilas suasana dan hasil karya UMKM Desa Patakaharja
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {images.map((img, i) => (
          <motion.div
            key={img.label}
            variants={item}
            className={`relative rounded-2xl overflow-hidden clay-shadow group border border-outline-variant/20 ${
              i === 0 ? "sm:row-span-2" : ""
            }`}
          >
            <div
              className={`overflow-hidden ${
                i === 0 ? "h-80 sm:h-[520px]" : "h-52 sm:h-60"
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <span className="text-white text-sm font-semibold drop-shadow-lg">
                {img.label}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
