import { NextRequest, NextResponse } from "next/server"
import {
  uploadFile,
  deleteFile,
  SUPABASE_BUCKET,
  MAX_FILE_SIZE,
} from "@/lib/supabase-storage"

export const runtime = "nodejs"

function hasSupabaseConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

export async function POST(request: NextRequest) {
  try {
    if (!hasSupabaseConfig()) {
      return NextResponse.json(
        {
          error:
            "Konfigurasi Supabase belum tersedia. Pastikan NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY sudah diisi di Vercel.",
        },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const folder = formData.get("folder") as string | null

    if (!file) {
      return NextResponse.json({ error: "File harus diisi" }, { status: 400 })
    }

    if (!folder) {
      return NextResponse.json({ error: "Folder harus diisi" }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Ukuran file maksimal 5MB" },
        { status: 400 }
      )
    }

    const url = await uploadFile(file, folder)
    return NextResponse.json({ url, bucket: SUPABASE_BUCKET })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload gagal. Coba lagi." },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!hasSupabaseConfig()) {
      return NextResponse.json(
        { error: "Konfigurasi Supabase belum tersedia" },
        { status: 500 }
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
