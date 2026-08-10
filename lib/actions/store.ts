"use server"

import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { deleteFile } from "@/lib/supabase-storage"
import { normalizeWaNumber } from "@/lib/utils"
import { revalidatePath } from "next/cache"

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim()
}

export async function getStores(search = "") {
  const where = search
    ? { name: { contains: search, mode: "insensitive" as const } }
    : {}

  return prisma.store.findMany({
    where,
    include: {
      user: { select: { id: true, name: true, email: true } },
      _count: { select: { products: true } },
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function getStore(id: string) {
  return prisma.store.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true } },
      _count: { select: { products: true } },
    },
  })
}

export async function createStore(data: {
  name: string
  description?: string
  address?: string
  whatsapp?: string
  sellerName: string
}) {
  const baseSlug = slugify(data.name)
  let slug = baseSlug
  let counter = 1
  while (await prisma.store.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`
    counter++
  }

  const autoEmail = `${slug}@umkm.pataka`
  const autoPassword = "umkm123"
  const hashedPassword = await bcrypt.hash(autoPassword, 12)

  const store = await prisma.store.create({
    data: {
      name: data.name,
      slug,
      description: data.description,
      address: data.address,
      whatsapp: data.whatsapp ? normalizeWaNumber(data.whatsapp) : data.whatsapp,
      user: {
        create: {
          name: data.sellerName,
          email: autoEmail,
          password: hashedPassword,
          role: "SELLER",
        },
      },
    },
  })

  revalidatePath("/admin/umkm")
  revalidatePath("/profil")
  return store
}

export async function updateStore(
  id: string,
  data: {
    name: string
    description?: string
    address?: string
    whatsapp?: string
    isActive: boolean
  }
) {
  const existing = await prisma.store.findUnique({ where: { id } })
  if (!existing) throw new Error("UMKM tidak ditemukan")

  const baseSlug = slugify(data.name)
  let slug = baseSlug
  if (slug !== existing.slug) {
    let counter = 1
    while (await prisma.store.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }
  } else {
    slug = existing.slug
  }

  const store = await prisma.store.update({
    where: { id },
    data: {
      name: data.name,
      slug,
      description: data.description,
      address: data.address,
      whatsapp: data.whatsapp ? normalizeWaNumber(data.whatsapp) : data.whatsapp,
      isActive: data.isActive,
    },
  })

  revalidatePath("/admin/umkm")
  revalidatePath("/profil")
  return store
}

export async function deleteStore(id: string) {
  const store = await prisma.store.findUnique({
    where: { id },
    include: {
      galleries: { select: { url: true } },
      products: { include: { images: { select: { url: true } } } },
    },
  })
  if (!store) throw new Error("UMKM tidak ditemukan")

  await prisma.store.delete({ where: { id } })

  const remainingStores = await prisma.store.count({ where: { userId: store.userId } })
  if (remainingStores === 0) {
    await prisma.user.delete({ where: { id: store.userId } }).catch(() => {})
  }

  const imageUrls = [
    store.logo,
    store.banner,
    ...store.galleries.map((g) => g.url),
    ...store.products.flatMap((p) => p.images.map((img) => img.url)),
  ].filter((url): url is string => Boolean(url))

  for (const url of imageUrls) {
    await deleteFile(url).catch(() => {})
  }

  revalidatePath("/admin/umkm")
  revalidatePath("/profil")
}
