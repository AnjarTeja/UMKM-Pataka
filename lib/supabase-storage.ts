import { createClient } from "@supabase/supabase-js"

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY harus diisi di .env")
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

export async function uploadFile(file: File, bucket: string): Promise<string> {
  const supabase = getSupabase()
  const ext = file.name.split(".").pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`
  const filePath = fileName

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (error) throw new Error(error.message)

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath)
  return urlData.publicUrl
}

export async function deleteFile(url: string, bucket: string) {
  const supabase = getSupabase()
  const path = url.split("/").pop()
  if (!path) return

  const { error } = await supabase.storage.from(bucket).remove([path])
  if (error) throw new Error(error.message)
}
