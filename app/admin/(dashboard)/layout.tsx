import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { Toaster } from "sonner"
import AdminShell from "@/components/admin-shell"
import AdminFooter from "@/components/admin-footer"

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
    <AdminShell>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 overflow-y-auto">{children}</main>
        <AdminFooter />
      </div>
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: { borderRadius: "12px", fontSize: "14px" },
        }}
      />
    </AdminShell>
  )
}
