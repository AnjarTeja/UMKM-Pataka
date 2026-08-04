"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { LogOut, ChevronLeft } from "lucide-react"

export default function AdminFooter() {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push("/admin/login")
  }

  return (
    <div className="border-t border-gray-200 bg-white px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
      <p className="text-xs text-gray-400">
        &copy; {new Date().getFullYear()} UMKM Patakaharja
      </p>
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:text-violet-700 hover:bg-violet-50 transition-all"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Website
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="h-3.5 w-3.5" />
          Keluar
        </button>
      </div>
    </div>
  )
}
