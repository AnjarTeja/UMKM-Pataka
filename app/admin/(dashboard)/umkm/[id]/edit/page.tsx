"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"
import { PageTransition, SlideIn } from "@/components/admin-page-transition"
import { motion } from "framer-motion"
import { toast } from "sonner"

export default function EditStorePage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [address, setAddress] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    fetch(`/api/admin/umkm/${id}`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json() })
      .then((store) => {
        setName(store.name); setDescription(store.description || ""); setAddress(store.address || "")
        setWhatsapp(store.whatsapp || ""); setIsActive(store.isActive); setFetchLoading(false)
      })
      .catch(() => { toast.error("Gagal memuat data UMKM"); setFetchLoading(false) })
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name) { toast.error("Nama UMKM wajib diisi"); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/umkm/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description: description || undefined, address: address || undefined, whatsapp: whatsapp || undefined, isActive }),
      })
      if (res.ok) { toast.success("UMKM berhasil diperbarui"); router.push("/admin/umkm") }
      else toast.error("Gagal memperbarui UMKM")
    } catch { toast.error("Terjadi kesalahan") } finally { setLoading(false) }
  }

  if (fetchLoading) return (
    <div className="p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
      <Loader2 className="h-6 w-6 animate-spin text-violet-600" />
    </div>
  )

  return (
    <PageTransition>
      <div className="p-6 lg:p-8 max-w-3xl">
        <SlideIn>
          <div className="flex items-center gap-3 mb-6">
            <Link href="/admin/umkm" className="p-2 rounded-lg hover:bg-gray-100 transition-all"><ArrowLeft className="h-5 w-5 text-gray-500" /></Link>
            <div><h1 className="text-2xl font-heading font-bold text-[#1a1a1a]">Edit UMKM</h1><p className="text-gray-500 text-sm">Perbarui informasi UMKM</p></div>
          </div>
        </SlideIn>

        <SlideIn>
          <motion.form initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h2 className="font-heading font-semibold text-[#1a1a1a]">Informasi UMKM</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama UMKM *</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none resize-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Alamat</label>
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">No. WhatsApp</label>
                  <input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none" placeholder="Contoh: 081234567890" />
                  <p className="text-xs text-gray-400 mt-1">Boleh diisi 08xxx atau 628xxx, otomatis dikonversi ke format internasional.</p>
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
                <span className="text-sm text-gray-700">UMKM Aktif</span>
              </label>
            </div>
            <div className="flex items-center gap-3">
              <button type="submit" disabled={loading} className="bg-[#341452] hover:bg-[#4b2c69] text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-50 shadow-lg shadow-violet-200/50">
                {loading ? <><Loader2 className="h-4 w-4 inline animate-spin mr-1.5" />Menyimpan...</> : "Simpan Perubahan"}
              </button>
              <Link href="/admin/umkm" className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">Batal</Link>
            </div>
          </motion.form>
        </SlideIn>
      </div>
    </PageTransition>
  )
}
