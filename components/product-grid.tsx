"use client"

import ProductCard from "./product-card"

const products = [
  {
    store: "Keramik Mbah Kasidi",
    category: "Vase Artisan",
    name: "Amethyst Curve Vase",
    price: "Rp 450.000",
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80",

  },
  {
    store: "Gerabah Ibu Sumini",
    category: "Tableware",
    name: "Rustic Earth Bowl Set",
    price: "Rp 325.000",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&q=80",
  },
  {
    store: "Anyaman Pak Jaja",
    category: "Home Decor",
    name: "Lavender Lumina Base",
    price: "Rp 890.000",
    image:
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&q=80",
  },
  {
    store: "Kriya Mang Udin",
    category: "Artisan Specials",
    name: "Midnight Bloom Cups",
    price: "Rp 180.000",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80",
  },
  {
    store: "Tenun Nining",
    category: "Fashion",
    name: "Songket Pataka Modern",
    price: "Rp 1.250.000",
    image:
      "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=600&q=80",
  },
  {
    store: "Kuliner Mang Eman",
    category: "Food & Beverage",
    name: "Kopi Pataka Roast",
    price: "Rp 85.000",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
  },
  {
    store: "Keramik Mbah Kasidi",
    category: "Vase Artisan",
    name: "Candi Mini Pataka",
    price: "Rp 650.000",
    image:
      "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=600&q=80",
  },
  {
    store: "Gerabah Ibu Sumini",
    category: "Tableware",
    name: "Piring Tanah Liat Set",
    price: "Rp 275.000",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&q=80",
  },
]

export default function ProductGrid() {
  return (
    <section id="produk" className="max-w-[1400px] mx-auto px-6 mt-section-gap scroll-mt-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-heading text-3xl font-semibold text-primary">
            Produk UMKM
          </h2>
          <p className="text-on-surface-variant mt-1">
            Pesan langsung via WhatsApp — tanpa ribet
          </p>
        </div>
        <a
          href="#"
          className="text-primary text-sm font-semibold hover:underline hidden sm:block"
        >
          Lihat Semua
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <ProductCard key={`${product.store}-${product.name}`} product={product} index={i} />
        ))}
      </div>
    </section>
  )
}
