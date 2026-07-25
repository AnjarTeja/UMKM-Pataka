"use client"

import { motion } from "framer-motion"
import { MapPin, Users, Trees, Building2, Quote, Flower2 } from "lucide-react"

const facts = [
  { icon: Building2, label: "Luas Desa", value: "479,850 Ha" },
  { icon: Users, label: "Jumlah Penduduk", value: "2.222 Jiwa (2023)" },
  { icon: Trees, label: "Produk Unggulan", value: "Gerabah" },
  { icon: Flower2, label: "UMKM Aktif", value: "43 Unit Usaha" },
]

export default function VillageInfo() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3"
        >
          <div className="relative rounded-2xl overflow-hidden clay-shadow border border-outline-variant/20">
            <img
              src="/images/sekilas-desa.jpg"
              alt="Suasana Desa Patakaharja"
              className="w-full h-72 lg:h-80 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs">
                <MapPin className="h-3 w-3" />
                Desa Patakaharja, Kec. Cilimus, Kuningan
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-2"
        >
          <span className="text-xs font-semibold text-primary uppercase tracking-widest flex items-center gap-1.5 mb-2">
            <Quote className="h-4 w-4" />
            Sekilas Desa
          </span>
          <h2 className="font-heading text-3xl font-bold text-primary mb-4 leading-tight">
            Patakaharja:{" "}
            <span className="text-gradient">Desa dengan Seribu Karya</span>
          </h2>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
            Terletak di kaki Gunung Ciremai, Desa Patakaharja telah dikenal sejak
            puluhan tahun lalu sebagai sentra kerajinan tanah liat dan gerabah
            tradisional. Keahlian menenun dan menganyam bambu juga turun-temurun
            dijaga oleh para pengrajin lokal. Setiap produk yang lahir dari desa
            ini bukan sekadar barang — melainkan warisan budaya yang dihidupkan
            kembali dalam bentuk modern.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {facts.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.06 }}
                  className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/20 clay-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant">{f.label}</p>
                      <p className="font-heading text-sm font-bold text-primary">
                        {f.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
