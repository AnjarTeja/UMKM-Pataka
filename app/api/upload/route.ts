import { NextRequest, NextResponse } from "next/server"
import { uploadFile, deleteFile } from "@/lib/supabase-storage"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = formData.get("folder") as string

    if (!file || !folder) {
      return NextResponse.json({ error: "File dan folder harus diisi" }, { status: 400 })
    }

    const url = await uploadFile(file, folder)
    return NextResponse.json({ url })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload gagal" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { url, folder } = await request.json()

    if (!url || !folder) {
      return NextResponse.json({ error: "URL dan folder harus diisi" }, { status: 400 })
    }

    await deleteFile(url, folder)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Hapus gagal" },
      { status: 500 }
    )
  }
}
