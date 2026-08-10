import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { deleteFile } from "@/lib/supabase-storage"

export const runtime = "nodejs"

export async function DELETE(request: NextRequest) {
  try {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized. Silakan login sebagai admin." },
        { status: 401 }
      )
    }

    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL harus diisi" }, { status: 400 })
    }

    await deleteFile(url)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Hapus gagal" },
      { status: 500 }
    )
  }
}
