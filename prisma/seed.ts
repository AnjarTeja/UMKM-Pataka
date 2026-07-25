import { PrismaClient } from "../lib/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import bcrypt from "bcryptjs"

const adapter = new PrismaPg(process.env.DIRECT_URL || process.env.DATABASE_URL!)
const prisma = new PrismaClient({ adapter })

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim()
}

async function main() {
  const email = "umkmpataka2026"
  const password = "p@takaharja26"

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    console.log("Admin already exists, skipping seed.")
    return
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  await prisma.user.create({
    data: {
      name: "Admin Patakaharja",
      email,
      password: hashedPassword,
      role: "ADMIN",
      isActive: true,
    },
  })

  console.log(`Admin created: ${email}`)

  const categoryNames = ["Fashion", "Kriya", "Makanan Ringan", "Makanan"]
  for (const name of categoryNames) {
    const existingCat = await prisma.category.findUnique({ where: { slug: slugify(name) } })
    if (!existingCat) {
      await prisma.category.create({
        data: { name, slug: slugify(name), isActive: true },
      })
      console.log(`Category created: ${name}`)
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
