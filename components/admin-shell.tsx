"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import AdminSidebar from "./admin-sidebar"
import { Menu, X } from "lucide-react"

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  return (
    <div className="flex min-h-screen bg-[#f5f5f7]">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 min-h-0 md:ml-64">
        <div className="sticky top-0 z-30 flex items-center gap-3 px-4 py-3 bg-[#341452] md:hidden shadow-md shadow-black/10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-heading text-sm font-bold text-white">Admin Panel</span>
        </div>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
