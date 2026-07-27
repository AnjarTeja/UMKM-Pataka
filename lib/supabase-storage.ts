import { writeFile, unlink, mkdir } from "fs/promises"
import path from "path"

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "image/bmp",
  "image/tiff",
  "image/svg+xml",
]

export async function uploadFile(file: File, folder: string): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Format file tidak didukung. Gunakan: JPG, PNG, WebP, GIF, AVIF, BMP, TIFF, SVG")
  }

  const ext = file.name.split(".").pop() || "jpg"
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`
  const uploadDir = path.join(process.cwd(), "public", "uploads", folder)
  const filePath = path.join(uploadDir, fileName)

  await mkdir(uploadDir, { recursive: true })

  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(filePath, buffer)

  return `/uploads/${folder}/${fileName}`
}

export async function deleteFile(url: string, _bucket: string) {
  const relativePath = url.replace(/^\//, "")
  const filePath = path.join(process.cwd(), "public", relativePath)
  await unlink(filePath).catch(() => {})
}
