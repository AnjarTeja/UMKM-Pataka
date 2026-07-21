import { Metadata } from "next"
import HelpSection from "@/components/help-section"

export const metadata: Metadata = {
  title: "Bantuan — Patakaharja",
  description: "Pertanyaan yang sering diajukan seputar belanja di UMKM Patakaharja.",
}

export default function BantuanPage() {
  return (
    <div className="py-12">
      <HelpSection />
    </div>
  )
}
