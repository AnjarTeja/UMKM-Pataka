import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import AdminSidebar from "@/components/admin-sidebar"
import { Toaster } from "sonner"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen bg-[#f5f5f7]">
      <AdminSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <main className="flex-1">{children}</main>
      </div>
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: { borderRadius: "12px", fontSize: "14px" },
        }}
      />
    </div>
  )
}
