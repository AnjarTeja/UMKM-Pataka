"use client"

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_FILE_SIZE = 20 * 1024 * 1024

function uploadWithProgress(
  signedUrl: string,
  file: File,
  onProgress: (percent: number) => void
): Promise<boolean> {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()
    xhr.open("PUT", signedUrl)
    xhr.setRequestHeader("Content-Type", file.type)
    xhr.setRequestHeader("x-upsert", "true")

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100))
      }
    }

    xhr.onload = () => resolve(xhr.status >= 200 && xhr.status < 300)
    xhr.onerror = () => resolve(false)

    xhr.send(file)
  })
}

export async function uploadProductImage(
  file: File,
  onProgress: (percent: number) => void
): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(`Format ${file.name} tidak didukung. Gunakan: JPG, PNG, atau WebP`)
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`Ukuran ${file.name} melebihi 20MB`)
  }

  const presignRes = await fetch("/api/upload/presign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      folder: "produk",
      fileName: file.name,
      contentType: file.type,
      size: file.size,
    }),
  })

  const presign = await presignRes.json().catch(() => null)

  if (!presignRes.ok || !presign?.signedUrl) {
    throw new Error(presign?.error || "Gagal menyiapkan upload")
  }

  const ok = await uploadWithProgress(presign.signedUrl, file, onProgress)
  if (!ok) {
    throw new Error("Gagal mengunggah file ke penyimpanan")
  }

  return presign.publicUrl as string
}
