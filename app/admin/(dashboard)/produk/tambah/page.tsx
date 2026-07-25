"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react"
import { PageTransition, SlideIn } from "@/components/admin-page-transition"
import { motion } from "framer-motion"
import { toast } from "sonner"

interface Category { id: string; name: string }
interface Store { id: string; name: string }
interface ImageItem { url: string; file?: File; alt: string; isPrimary: boolean }

export default function AddProductPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("0")
  const [unit, setUnit] = useState("pcs")
  const [isFeatured, setIsFeatured] = useState(false)
  const [storeId, setStoreId] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [images, setImages] = useState<ImageItem[]>([])

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/produk/categories").then((r) => { if (!r.ok) throw new Error(); return r.json() }),
      fetch("/api/admin/produk/stores").then((r) => { if (!r.ok) throw new Error(); return r.json() }),
    ]).then(([cats, str]) => { setCategories(cats); setStores(str) })
      .catch(() => toast.error("Gagal memuat data"))
  }, [])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return
    setUploading(true)
    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "produk")
      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData })
        const data = await res.json()
        if (data.url) setImages((prev) => [...prev, { url: data.url, alt: "", isPrimary: prev.length === 0 }])
      } catch { toast.error("Gagal upload gambar") }
    }
    setUploading(false)
    e.target.value = ""
  }

  const removeImage = (index: number) => {
    setImages((prev) => { const next = prev.filter((_, i) => i !== index); if (prev[index]?.isPrimary && next.length > 0) next[0].isPrimary = true; return next })
  }
  const setPrimary = (index: number) => setImages((prev) => prev.map((img, i) => ({ ...img, isPrimary: i === index })))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!storeId || !categoryId || !name || !price) { toast.error("Lengkapi data yang wajib diisi"); return }
    setLoading(true)
    try {
      const res = await fetch("/api/admin/produk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price: Number(price), stock: Number(stock), unit, isFeatured, storeId, categoryId, images: images.map((img) => ({ url: img.url, alt: img.alt, isPrimary: img.isPrimary })) }),
      })
      if (res.ok) { toast.success("Produk berhasil ditambahkan"); router.push("/admin/produk") }
      else {
        const err = await res.json().catch(() => ({}))
        toast.error(err.error || "Gagal menambahkan produk")
      }
    } catch { toast.error("Terjadi kesalahan") } finally { setLoading(false) }
  }

  return (
    <PageTransition>
      <div className="p-6 lg:p-8 max-w-3xl">
        <SlideIn>
          <div className="flex items-center gap-3 mb-6">
            <Link href="/admin/produk" className="p-2 rounded-lg hover:bg-gray-100 transition-all"><ArrowLeft className="h-5 w-5 text-gray-500" /></Link>
            <div>
              <h1 className="text-2xl font-heading font-bold text-[#1a1a1a]">Tambah Produk</h1>
              <p className="text-gray-500 text-sm">Masukkan produk UMKM baru</p>
            </div>
          </div>
        </SlideIn>

        <SlideIn>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Produk *</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none" placeholder="Nama produk" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none resize-none" placeholder="Deskripsi produk" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Harga (Rp) *</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required min={0} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none" placeholder="0" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Stok</label>
                  <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} min={0} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Satuan</label>
                  <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">UMKM *</label>
                <select value={storeId} onChange={(e) => setStoreId(e.target.value)} required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none bg-white">
                  <option value="">Pilih UMKM</option>
                  {stores.length === 0 && <option value="" disabled>Tidak ada UMKM — tambah UMKM dulu</option>}
                  {stores.map((s) => (<option key={s.id} value={s.id}>{s.name}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori *</label>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none bg-white">
                  <option value="">Pilih Kategori</option>
                  {categories.length === 0 && <option value="" disabled>Belum ada kategori</option>}
                  {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
                </select>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
                  <span className="text-sm text-gray-700">Produk Unggulan</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Produk</label>
              <div className="flex flex-wrap gap-3 mb-3">
                {images.map((img, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} className="relative group w-24 h-24 rounded-xl overflow-hidden border border-gray-200">
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                      <button type="button" onClick={() => setPrimary(idx)} className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${img.isPrimary ? "bg-amber-400 text-white" : "bg-white/90 text-gray-700"}`}>
                        {img.isPrimary ? "Utama" : "Utama"}
                      </button>
                      <button type="button" onClick={() => removeImage(idx)} className="p-1 rounded bg-red-500/80 text-white"><X className="h-3 w-3" /></button>
                    </div>
                    {img.isPrimary && <span className="absolute top-1 left-1 bg-amber-400 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">Utama</span>}
                  </motion.div>
                ))}
                <label className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-200 hover:border-violet-400 hover:bg-violet-50 flex flex-col items-center justify-center cursor-pointer transition-all">
                  {uploading ? <Loader2 className="h-5 w-5 text-gray-400 animate-spin" /> : <><Upload className="h-5 w-5 text-gray-400" /><span className="text-[10px] text-gray-400 mt-1">Upload</span></>}
                  <input type="file" accept="image/*" multiple onChange={handleFileSelect} className="hidden" disabled={uploading} />
                </label>
              </div>
              <p className="text-xs text-gray-400">Format: JPG, PNG. Klik &quot;Utama&quot; untuk mengatur gambar utama.</p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button type="submit" disabled={loading || uploading} className="bg-[#341452] hover:bg-[#4b2c69] text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-50 shadow-lg shadow-violet-200/50">
                {loading ? <><Loader2 className="h-4 w-4 inline animate-spin mr-1.5" />Menyimpan...</> : "Simpan Produk"}
              </button>
              <Link href="/admin/produk" className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">Batal</Link>
            </div>
          </motion.form>
        </SlideIn>
      </div>
    </PageTransition>
  )
}
