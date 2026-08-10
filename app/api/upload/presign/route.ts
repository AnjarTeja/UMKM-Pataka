import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { createUploadUrl, MAX_FILE_SIZE } from "@/lib/supabase-storage"

export const runtime = "nodejs"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]

export async function POST(request: NextRequest) {
  try {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized. Silakan login sebagai admin." },
        { status: 401 }
      )
    }

    const body = await request.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: "Request body tidak valid" }, { status: 400 })
    }

    const { folder, fileName, contentType, size } = body

    if (typeof folder !== "string" || !folder) {
      return NextResponse.json({ error: "Folder harus diisi" }, { status: 400 })
    }

    if (typeof fileName !== "string" || !fileName) {
      return NextResponse.json({ error: "Nama file harus diisi" }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(contentType)) {
      return NextResponse.json(
        { error: "Format file tidak didukung. Gunakan: JPG, PNG, atau WebP" },
        { status: 400 }
      )
    }

    if (typeof size !== "number" || !Number.isFinite(size) || size <= 0 || size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Ukuran file maksimal 20MB" }, { status: 400 })
    }

    const result = await createUploadUrl(folder, contentType)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gagal menyiapkan upload" },
      { status: 500 }
    )
  }
}
