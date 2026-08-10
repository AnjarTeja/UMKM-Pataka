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

export async function createUploadUrl(
  folder: string,
  contentType: string
): Promise<{ signedUrl: string; path: string; publicUrl: string }> {
  const ext = ALLOWED_TYPES[contentType]
  if (!ext) {
    throw new Error("Format file tidak didukung. Gunakan: JPG, PNG, atau WebP")
  }

  const safeFolder = sanitizeFolder(folder)
  const fileName = `${Date.now()}-${crypto.randomUUID().replace(/-/g, "")}.${ext}`
  const filePath = `${safeFolder}/${fileName}`

  const supabase = getServiceClient()

  const { data, error } = await supabase.storage
    .from(SUPABASE_BUCKET)
    .createSignedUploadUrl(filePath)

  if (error) {
    throw new Error(`Gagal membuat URL upload: ${error.message}`)
  }

  const { data: publicData } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(filePath)

  return { signedUrl: data.signedUrl, path: filePath, publicUrl: publicData.publicUrl }
}

export async function deleteFile(url: string) {
  const match = url.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)$/)
  if (!match) return

  const bucket = match[1]
  const filePath = decodeURIComponent(match[2])

  const supabase = getServiceClient()
  await supabase.storage.from(bucket).remove([filePath])
}
