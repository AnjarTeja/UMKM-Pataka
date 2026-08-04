"use client"

import { motion } from "framer-motion"
import {
  MapPin,
  Users,
  Trees,
  Building2,
  Quote,
  Landmark,
  ScrollText,
  Flag,
} from "lucide-react"

const facts = [
  { icon: Building2, label: "Kecamatan", value: "Rancah, Kab. Ciamis" },
  { icon: Users, label: "Kedusunan", value: "4 Dusun" },
  { icon: Landmark, label: "Pemekaran Desa", value: "Tahun 1979" },
  { icon: ScrollText, label: "Cikal Bakal", value: "Desa Bantardengdeng" },
]

const timeline = [
  {
    year: "Jaman Kerajaan",
    title: "Lahirnya Gunung Pataka",
    text: 'Sang Prabu Kebo Ngampuh Limpurdjaja dan Adipati Aria Kidang Wulung menancapkan bendera di puncak gunung seraya bergumam \u201Cdi sinilah kita tinggal\u201D. Gunung itu lalu disebut Pataka — yang berarti bendera.',
  },
  {
    year: "1 Juli 1909",
    title: "Berdirinya Desa Bantardengdeng",
    text: "Residen Priangan mengeluarkan Surat Keputusan menggabungkan Desa Cigintung, Janglapa, dan Curug menjadi satu wilayah, sementara Desa Bantardengdeng berdiri sendiri — cikal bakal Desa Patakaharja.",
  },
  {
    year: "19 Maret 1923",
    title: "Lahirnya Desa Dadiharja",
    text: "Melalui Surat Keputusan Residen Priangan, Desa Cigintung dan Desa Bantardengdeng digabung menjadi satu wilayah bernama Desa Dadiharja.",
  },
  {
    year: "1979",
    title: "Pemekaran Menjadi Patakaharja",
    text: "Desa Dadiharja dimekarkan menjadi empat desa: Bantardengdeng menjadi Desa Patakaharja, serta Dadiharja, Jangalaharja, dan Giriharja.",
  },
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
                Desa Patakaharja, Kec. Rancah, Kab. Ciamis
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
            <span className="text-gradient">Nama yang Lahir dari Sejarah</span>
          </h2>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
            Asal-usul nama Patakaharja berakar pada legenda jaman Kerajaan
            Pajajaran. Kala itu, Sang Prabu Kebo Ngampuh Limpurdjaja bersama
            Adipati Aria Kidang Wulung dan rombongannya melarikan diri dari
            pusat kerajaan karena terdesak Tentara Islam Banten dari arah barat
            dan Tentara Islam Cirebon dari arah utara. Menyusuri Sungai Cijolang
            hingga tiba di puncak sebuah gunung,             mereka menancapkan bendera
            seraya bergumam,{" "}
            <em className="italic">“di sinilah kita tinggal”</em>. Sejak itu
            gunung tersebut dikenal sebagai Gunung Pataka — pataka berarti
            bendera — yang menjadi cikal bakal nama desa ini.
          </p>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
            Di puncak gunung itu dibangun markas pertahanan sekaligus perangkat
            kerajaan, mulai dari keprabon, kepatihan, kejaksaan, paseban, hingga
            pangbuian. Hingga kini, Leuwi Ranto di Sungai Cijolang pun masih
            menyimpan legenda berupa pantangan yang diyakini masyarakat — dilarang
            menebang kayu, pejabat tidak boleh mendatanginya, serta tidak boleh
            mengenakan pakaian beludru dan topi laken.
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

      <div className="mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-8"
        >
          <Flag className="h-4 w-4 text-primary" />
          <h3 className="font-heading text-xl font-bold text-primary">
            Jejak Sejarah Desa Patakaharja
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {timeline.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/20 clay-shadow"
            >
              <span className="inline-block px-2.5 py-1 rounded-full bg-primary-fixed text-primary text-[11px] font-bold uppercase tracking-wide mb-3">
                {item.year}
              </span>
              <h4 className="font-heading text-sm font-bold text-primary mb-2">
                {item.title}
              </h4>
              <p className="text-on-surface-variant text-xs leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-on-surface-variant text-xs leading-relaxed flex items-start gap-2">
          <Trees className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <span>
            Saat ini, Desa Patakaharja merupakan salah satu dari tiga belas desa
            di Kecamatan Rancah, Kabupaten Ciamis, yang terdiri atas empat
            wilayah kedusunan: Dusun Langensari, Kowari, Cimulya, dan
            Bantardengdeng.
          </span>
        </p>
      </div>
    </section>
  )
}
