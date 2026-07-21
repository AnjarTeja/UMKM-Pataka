"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react"
import { PageTransition, SlideIn } from "@/components/admin-page-transition"
import { motion } from "framer-motion"
import { toast } from "sonner"

export default function EditStorePage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [uploading, setUploading] = useState({ logo: false, banner: false })

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [logo, setLogo] = useState("")
  const [banner, setBanner] = useState("")
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    fetch(`/api/admin/umkm/${id}`).then((r) => r.json()).then((store) => {
      setName(store.name); setDescription(store.description || ""); setAddress(store.address || "")
      setPhone(store.phone || ""); setWhatsapp(store.whatsapp || ""); setLatitude(store.latitude ? String(store.latitude) : "")
      setLongitude(store.longitude ? String(store.longitude) : ""); setLogo(store.logo || ""); setBanner(store.banner || "")
      setIsActive(store.isActive); setFetchLoading(false)
    })
  }, [id])

  const handleUpload = async (file: File, field: "logo" | "banner") => {
    setUploading((prev) => ({ ...prev, [field]: true }))
    const formData = new FormData(); formData.append("file", file); formData.append("folder", "umkm")
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (data.url) { if (field === "logo") setLogo(data.url); else setBanner(data.url) }
    } catch { toast.error("Gagal upload gambar") } finally { setUploading((prev) => ({ ...prev, [field]: false })) }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name) { toast.error("Nama UMKM wajib diisi"); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/umkm/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description: description || undefined, logo: logo || undefined, banner: banner || undefined, address: address || undefined, phone: phone || undefined, whatsapp: whatsapp || undefined, latitude: latitude ? Number(latitude) : undefined, longitude: longitude ? Number(longitude) : undefined, isActive }),
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
                <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Alamat</label><input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1.5">No. Telepon</label><input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1.5">No. WhatsApp</label><input type="text" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Latitude</label><input type="number" step="any" value={latitude} onChange={(e) => setLatitude(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Longitude</label><input type="number" step="any" value={longitude} onChange={(e) => setLongitude(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none" /></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Logo</label>
                  <div className="flex items-center gap-3">
                    {logo && <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0"><img src={logo} alt="" className="w-full h-full object-cover" /><button type="button" onClick={() => setLogo("")} className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5"><X className="h-3 w-3" /></button></div>}
                    <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-gray-200 hover:border-violet-400 hover:bg-violet-50 cursor-pointer transition-all text-sm text-gray-400">
                      {uploading.logo ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                      {uploading.logo ? "Uploading..." : "Ganti Logo"}
                      <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "logo")} className="hidden" />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Banner</label>
                  <div className="flex items-center gap-3">
                    {banner && <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0"><img src={banner} alt="" className="w-full h-full object-cover" /><button type="button" onClick={() => setBanner("")} className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5"><X className="h-3 w-3" /></button></div>}
                    <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-gray-200 hover:border-violet-400 hover:bg-violet-50 cursor-pointer transition-all text-sm text-gray-400">
                      {uploading.banner ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                      {uploading.banner ? "Uploading..." : "Ganti Banner"}
                      <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "banner")} className="hidden" />
                    </label>
                  </div>
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
