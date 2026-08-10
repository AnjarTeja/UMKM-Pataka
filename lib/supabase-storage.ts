import { createClient } from "@supabase/supabase-js"

export const SUPABASE_BUCKET = "product-images"
export const MAX_FILE_SIZE = 20 * 1024 * 1024

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
}

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Konfigurasi Supabase belum lengkap. Pastikan NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY sudah diisi."
    )
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

function sanitizeFolder(folder: string) {
  return folder.replace(/[^a-zA-Z0-9-_]/g, "").replace(/^\/+|\/+$/g, "") || "umum"
}

export async function uploadFile(file: File, folder: string): Promise<string> {
  if (!file || file.size === 0) {
    throw new Error("File kosong. Pilih gambar yang valid.")
  }

  const ext = ALLOWED_TYPES[file.type]
  if (!ext) {
    throw new Error("Format file tidak didukung. Gunakan: JPG, PNG, atau WebP")
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Ukuran file maksimal 20MB")
  }

  const safeFolder = sanitizeFolder(folder)
  const fileName = `${Date.now()}-${crypto.randomUUID().replace(/-/g, "")}.${ext}`
  const filePath = `${safeFolder}/${fileName}`

  const supabase = getServiceClient()
  const buffer = Buffer.from(await file.arrayBuffer())

  const { error } = await supabase.storage.from(SUPABASE_BUCKET).upload(filePath, buffer, {
    contentType: file.type,
    cacheControl: "3600",
    upsert: false,
  })

  if (error) {
    throw new Error(`Gagal upload ke Supabase Storage: ${error.message}`)
  }

  const { data } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(filePath)
  return data.publicUrl
}

export async function deleteFile(url: string) {
  const match = url.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)$/)
  if (!match) return

  const bucket = match[1]
  const filePath = decodeURIComponent(match[2])

  const supabase = getServiceClient()
  await supabase.storage.from(bucket).remove([filePath])
}
