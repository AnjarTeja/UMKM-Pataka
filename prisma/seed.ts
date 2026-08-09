import "dotenv/config"
import { PrismaClient } from "../lib/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import bcrypt from "bcryptjs"

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("Missing DIRECT_URL or DATABASE_URL environment variable")
}

const adapter = new PrismaPg({
  connectionString,
  ssl: { rejectUnauthorized: false },
})

const prisma = new PrismaClient({ adapter })

const ADMIN_EMAIL = "admin@umkmpataka.id"
const ADMIN_PASSWORD = "AdminPataka2026!"
const SELLER_PASSWORD = "SellerPataka2026!"
const STORE_ADDRESS = "Desa Patakaharja, Kecamatan Rancah, Kabupaten Ciamis"
const BCRYPT_ROUNDS = 12

type ProductSeed = {
  name: string
  price: number
  stock: number
  description: string
}

type StoreSeed = {
  name: string
  category: string
  description: string
  products: ProductSeed[]
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

function emailFor(name: string): string {
  const local = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, ".")
  return `${local}@umkmpataka.id`
}

function placeholder(text: string, width = 800, height = 600): string {
  return `https://placehold.co/${width}x${height}/png?text=${encodeURIComponent(text)}`
}

const CATEGORY_NAMES = ["Fashion", "Kriya", "Makanan Ringan", "Makanan", "Jasa Menjahit"]

const STORES: StoreSeed[] = [
  {
    name: "Yana Heryana",
    category: "Fashion",
    description:
      "UMKM yang bergerak di bidang kerajinan dan fashion khas Sunda dengan produk unggulan berupa Iket Sunda. Mengutamakan kualitas bahan, kenyamanan saat digunakan, serta turut melestarikan budaya lokal melalui produk yang bernilai seni dan tradisi.",
    products: [
      {
        name: "Iket Sunda",
        price: 45000,
        stock: 20,
        description:
          "Iket Sunda khas dengan bahan berkualitas dan motif yang elegan. Nyaman digunakan serta turut melestarikan budaya Sunda.",
      },
    ],
  },
  {
    name: "Sukiwa",
    category: "Kriya",
    description:
      "UMKM yang memproduksi berbagai kerajinan tradisional seperti tungku dan cobek yang dibuat secara manual oleh pengrajin berpengalaman. Setiap produk dihasilkan dengan memperhatikan kualitas, kekuatan, dan fungsi sehingga cocok digunakan untuk kebutuhan rumah tangga maupun pelengkap dekorasi tradisional.",
    products: [
      {
        name: "Tungku",
        price: 75000,
        stock: 15,
        description:
          "Tungku tanah liat buatan tangan yang kokoh dan fungsional, cocok untuk memasak tradisional maupun hiasan.",
      },
      {
        name: "Cobek",
        price: 50000,
        stock: 20,
        description:
          "Cobek batu dari pengrajin berpengalaman dengan permukaan halus, cocok untuk menghaluskan bumbu dapur.",
      },
    ],
  },
  {
    name: "Juhana",
    category: "Kriya",
    description:
      "UMKM yang menghasilkan berbagai perlengkapan dapur tradisional seperti cetakan serabi, pas bunga, dan kelenting. Seluruh produk dibuat dengan teknik kerajinan yang telah diwariskan secara turun-temurun sehingga memiliki kualitas yang baik serta mempertahankan nilai budaya lokal.",
    products: [
      {
        name: "Cetakan Serabi",
        price: 25000,
        stock: 25,
        description:
          "Cetakan serabi tradisional berbahan tanah liat yang awet, cocok untuk membuat serabi di tungku maupun kompor.",
      },
      {
        name: "Pas Bunga",
        price: 30000,
        stock: 20,
        description:
          "Pas bunga kerajinan tangan yang artistik, cocok untuk tanaman hias maupun hiasan rumah.",
      },
      {
        name: "Kelenting",
        price: 20000,
        stock: 25,
        description:
          "Kelenting kerajinan tradisional dengan bentuk khas dan kualitas baik untuk kebutuhan rumah tangga.",
      },
    ],
  },
  {
    name: "Jumri",
    category: "Kriya",
    description:
      "UMKM yang bergerak di bidang kerajinan bambu dengan berbagai produk seperti tampah, ceceting, dingkul, dan dudukuy. Produk yang dihasilkan memiliki kualitas yang baik, ramah lingkungan, serta masih banyak digunakan untuk kebutuhan rumah tangga maupun kegiatan tradisional.",
    products: [
      {
        name: "Tampah",
        price: 45000,
        stock: 20,
        description:
          "Tampah anyaman bambu berkualitas dengan anyaman rapi, kuat, dan ramah lingkungan untuk kebutuhan dapur.",
      },
      {
        name: "Ceceting",
        price: 30000,
        stock: 25,
        description:
          "Ceceting anyaman bambu yang ringan dan kuat, cocok untuk wadah buah, sayur, maupun kebutuhan dapur lainnya.",
      },
      {
        name: "Dingkul",
        price: 40000,
        stock: 20,
        description:
          "Dingkul anyaman bambu tradisional yang kokoh, multifungsi untuk membawa dan menyimpan hasil panen.",
      },
      {
        name: "Dudukuy",
        price: 35000,
        stock: 20,
        description:
          "Dudukuy anyaman bambu khas dengan desain tradisional, nyaman digunakan sebagai penutup kepala.",
      },
    ],
  },
  {
    name: "Sumarna",
    category: "Kriya",
    description:
      "UMKM yang memproduksi kerajinan tradisional berupa Cireung dengan mengutamakan kualitas bahan dan proses pembuatan yang teliti. Produk yang dihasilkan memiliki nilai fungsional sekaligus menjadi bagian dari pelestarian kerajinan khas daerah.",
    products: [
      {
        name: "Cireung",
        price: 30000,
        stock: 20,
        description:
          "Cireung kerajinan tradisional khas daerah dengan pengerjaan teliti dan bahan berkualitas, bernilai fungsional.",
      },
    ],
  },
  {
    name: "Dodi",
    category: "Kriya",
    description:
      "UMKM yang menghasilkan berbagai produk kerajinan seperti sangkar burung dan kempis dengan desain yang menarik dan kokoh. Seluruh produk dibuat secara manual menggunakan bahan berkualitas sehingga memiliki daya tahan yang baik dan nilai estetika tinggi.",
    products: [
      {
        name: "Sangkar Burung",
        price: 150000,
        stock: 10,
        description:
          "Sangkar burung buatan tangan dengan desain menarik dan kokoh, terbuat dari bahan berkualitas.",
      },
      {
        name: "Kempis",
        price: 60000,
        stock: 15,
        description:
          "Kempis kerajinan tangan dengan desain estetis dan konstruksi kuat, cocok sebagai kerajinan dekoratif.",
      },
    ],
  },
  {
    name: "Roni Awaludin",
    category: "Kriya",
    description:
      "UMKM yang memproduksi miniatur rumah pohon dan berbagai souvenir berbahan kayu dengan sentuhan seni yang unik. Produk dibuat secara detail dan kreatif sehingga cocok dijadikan hiasan rumah, koleksi, maupun hadiah.",
    products: [
      {
        name: "Miniatur Rumah Pohon",
        price: 200000,
        stock: 10,
        description:
          "Miniatur rumah pohon dari kayu dengan detail kreatif dan unik, cocok untuk hiasan rumah, koleksi, maupun hadiah.",
      },
      {
        name: "Souvenir Kayu",
        price: 50000,
        stock: 20,
        description:
          "Souvenir berbahan kayu dengan sentuhan seni yang unik, cocok untuk oleh-oleh maupun koleksi.",
      },
    ],
  },
  {
    name: "Sarman",
    category: "Kriya",
    description:
      "UMKM yang memproduksi kerajinan tradisional berupa Osom dengan tetap mempertahankan teknik pembuatan khas masyarakat setempat. Produk dibuat menggunakan bahan pilihan sehingga memiliki kualitas yang baik serta mendukung pelestarian budaya lokal.",
    products: [
      {
        name: "Osom",
        price: 35000,
        stock: 20,
        description:
          "Osom kerajinan tradisional khas dengan teknik pembuatan yang dipertahankan secara turun-temurun.",
      },
    ],
  },
  {
    name: "Kartin",
    category: "Makanan Ringan",
    description:
      "UMKM yang bergerak di bidang makanan ringan dengan produk unggulan Rampeyek Ma Uhi yang gurih dan renyah. Diproduksi menggunakan bahan-bahan pilihan serta melalui proses yang higienis sehingga menghasilkan cita rasa yang khas dan berkualitas.",
    products: [
      {
        name: "Rampeyek Ma Uhi",
        price: 20000,
        stock: 30,
        description:
          "Rampeyek Ma Uhi yang gurih dan renyah, dibuat dari bahan pilihan dengan proses higienis dan cita rasa khas.",
      },
    ],
  },
  {
    name: "Johan",
    category: "Makanan Ringan",
    description:
      "UMKM yang memproduksi berbagai makanan ringan seperti pangsit bawang dan keripik singkong dengan aneka varian rasa. Mengutamakan kualitas bahan baku serta proses produksi yang bersih sehingga menghasilkan camilan yang renyah dan lezat.",
    products: [
      {
        name: "Pangsit Bawang",
        price: 15000,
        stock: 50,
        description:
          "Pangsit bawang renyah dan gurih, dibuat dari bahan baku berkualitas dengan proses produksi yang bersih.",
      },
      {
        name: "Keripik Singkong",
        price: 15000,
        stock: 50,
        description:
          "Keripik singkong renyah dengan aneka varian rasa, dibuat dari singkong pilihan dan diproses higienis.",
      },
    ],
  },
  {
    name: "Tarya",
    category: "Makanan Ringan",
    description:
      "UMKM yang memproduksi keripik gadung mentah dan matang dengan proses pengolahan yang aman dan higienis. Produk memiliki cita rasa khas serta diolah secara teliti agar menghasilkan makanan ringan yang berkualitas dan siap dinikmati.",
    products: [
      {
        name: "Keripik Gadung Mentah",
        price: 18000,
        stock: 40,
        description:
          "Keripik gadung mentah yang diproses secara aman dan higienis dengan cita rasa gurih yang khas.",
      },
      {
        name: "Keripik Gadung Matang",
        price: 20000,
        stock: 40,
        description:
          "Keripik gadung matang yang renyah dan gurih, diolah secara teliti agar menghasilkan camilan berkualitas.",
      },
    ],
  },
  {
    name: "Rudi Sumaryanto",
    category: "Makanan Ringan",
    description:
      "UMKM yang memproduksi keripik talas dengan berbagai pilihan rasa seperti original dan balado. Menggunakan talas berkualitas sebagai bahan utama sehingga menghasilkan camilan yang renyah, gurih, dan disukai oleh berbagai kalangan.",
    products: [
      {
        name: "Keripik Talas Original",
        price: 18000,
        stock: 40,
        description:
          "Keripik talas original dengan rasa gurih alami talas, renyah dan cocok untuk camilan segala usia.",
      },
      {
        name: "Keripik Talas Balado",
        price: 20000,
        stock: 40,
        description:
          "Keripik talas balado dengan rasa pedas gurih yang menggugah selera, renyah dan nikmat.",
      },
    ],
  },
  {
    name: "Eti Rosmiati",
    category: "Makanan Ringan",
    description:
      "UMKM yang memproduksi Sale Aroma, makanan ringan berbahan dasar pisang dengan rasa manis dan tekstur renyah. Diproses menggunakan bahan pilihan sehingga menghasilkan produk berkualitas yang cocok dijadikan camilan maupun oleh-oleh khas daerah.",
    products: [
      {
        name: "Sale Aroma",
        price: 25000,
        stock: 30,
        description:
          "Sale Aroma berbahan pisang pilihan dengan rasa manis dan tekstur renyah, cocok untuk camilan maupun oleh-oleh.",
      },
    ],
  },
  {
    name: "Dartini",
    category: "Makanan Ringan",
    description:
      "UMKM yang menghasilkan Sale Pisang Panjang dengan cita rasa manis alami serta tekstur yang renyah. Diproduksi menggunakan bahan baku berkualitas dan proses yang higienis sehingga menghasilkan produk yang lezat dan tahan lama.",
    products: [
      {
        name: "Sale Pisang Panjang",
        price: 25000,
        stock: 30,
        description:
          "Sale pisang panjang dengan cita rasa manis alami dan tekstur renyah, dibuat higienis dan tahan lama.",
      },
    ],
  },
  {
    name: "Entin",
    category: "Makanan Ringan",
    description:
      "UMKM yang memproduksi berbagai makanan ringan tradisional seperti kecimpring, opak panggang, dan kolontong. Produk dibuat menggunakan resep turun-temurun dengan cita rasa khas yang tetap terjaga sehingga cocok sebagai camilan maupun oleh-oleh.",
    products: [
      {
        name: "Kecimpring",
        price: 15000,
        stock: 50,
        description:
          "Kecimpring renyah berbahan singkong dengan rasa gurih khas, dibuat menggunakan resep turun-temurun.",
      },
      {
        name: "Opak Panggang",
        price: 15000,
        stock: 50,
        description:
          "Opak panggang gurih dan renyah dengan cita rasa tradisional yang tetap terjaga, cocok untuk camilan.",
      },
      {
        name: "Kolontong",
        price: 12000,
        stock: 50,
        description:
          "Kolontong manis dan renyah, jajanan tradisional khas yang cocok untuk camilan maupun oleh-oleh.",
      },
    ],
  },
  {
    name: "Suwilin",
    category: "Makanan Ringan",
    description:
      "UMKM yang memproduksi Wajit Jempol, makanan tradisional berbahan dasar ketan dan gula merah. Diproses menggunakan resep khas sehingga menghasilkan wajit dengan tekstur lembut, rasa manis alami, dan kualitas yang terjaga.",
    products: [
      {
        name: "Wajit Jempol",
        price: 25000,
        stock: 30,
        description:
          "Wajit Jempol berbahan ketan dan gula merah dengan tekstur lembut dan rasa manis alami.",
      },
    ],
  },
  {
    name: "Wiwin Hartiwin",
    category: "Makanan Ringan",
    description:
      "UMKM yang menghasilkan berbagai makanan ringan tradisional seperti Bolu Kijing dan Saroja. Menggunakan bahan-bahan berkualitas dan proses produksi yang higienis sehingga menghasilkan produk yang lezat serta cocok dinikmati oleh seluruh keluarga.",
    products: [
      {
        name: "Bolu Kijing",
        price: 30000,
        stock: 25,
        description:
          "Bolu Kijing lembut dan gurih dengan bahan berkualitas, cocok untuk dinikmati seluruh keluarga.",
      },
      {
        name: "Saroja",
        price: 20000,
        stock: 30,
        description:
          "Saroja renyah dengan rasa gurih khas, camilan tradisional yang diproduksi secara higienis.",
      },
    ],
  },
  {
    name: "Kiking",
    category: "Makanan Ringan",
    description:
      "UMKM yang memproduksi keripik pisang dengan bahan baku pisang pilihan dan proses pengolahan yang higienis. Produk memiliki tekstur renyah dan cita rasa khas sehingga menjadi salah satu camilan favorit masyarakat.",
    products: [
      {
        name: "Keripik Pisang",
        price: 18000,
        stock: 40,
        description:
          "Keripik pisang renyah dari pisang pilihan dengan proses pengolahan higienis dan cita rasa khas.",
      },
    ],
  },
  {
    name: "Nenti",
    category: "Makanan Ringan",
    description:
      "UMKM yang memproduksi kerupuk gendar berbahan dasar nasi dengan cita rasa gurih dan tekstur renyah. Produk dibuat menggunakan resep tradisional sehingga menghasilkan kerupuk berkualitas yang cocok sebagai pelengkap berbagai hidangan.",
    products: [
      {
        name: "Kerupuk Gendar",
        price: 15000,
        stock: 50,
        description:
          "Kerupuk gendar berbahan nasi dengan rasa gurih dan renyah, cocok sebagai pelengkap hidangan.",
      },
    ],
  },
  {
    name: "Aan",
    category: "Makanan Ringan",
    description:
      "UMKM yang menghasilkan kecimpring warna berbahan dasar singkong dengan tampilan menarik dan rasa yang khas. Diproduksi secara higienis menggunakan bahan pilihan sehingga menghasilkan camilan yang renyah dan disukai berbagai kalangan.",
    products: [
      {
        name: "Kecimpring Warna",
        price: 15000,
        stock: 50,
        description:
          "Kecimpring warna berbahan singkong dengan tampilan menarik dan rasa khas yang renyah.",
      },
    ],
  },
  {
    name: "Yoyo",
    category: "Makanan",
    description:
      "UMKM yang memproduksi gula merah alami dari air nira berkualitas. Produk diolah secara tradisional tanpa mengurangi kualitas sehingga menghasilkan gula merah dengan rasa manis alami yang cocok untuk kebutuhan rumah tangga maupun usaha kuliner.",
    products: [
      {
        name: "Gula Merah",
        price: 30000,
        stock: 25,
        description:
          "Gula merah alami dari air nira berkualitas dengan rasa manis alami, cocok untuk dapur maupun usaha kuliner.",
      },
    ],
  },
  {
    name: "Sabanda Sariksa",
    category: "Makanan Ringan",
    description:
      "Komunitas Ekonomi Kreatif yang menaungi berbagai pelaku UMKM Desa Patakaharja dalam memproduksi makanan ringan khas daerah seperti Ramini dan Kacang Sangrai. Berkomitmen mendukung pengembangan produk lokal, meningkatkan kualitas UMKM, serta memperluas pemasaran produk unggulan desa agar mampu bersaing di pasar yang lebih luas.",
    products: [
      {
        name: "Ramini",
        price: 15000,
        stock: 50,
        description:
          "Ramini camilan khas daerah yang gurih dan lezat, diproduksi dengan bahan berkualitas dan proses higienis.",
      },
      {
        name: "Kacang Sangrai",
        price: 18000,
        stock: 40,
        description:
          "Kacang sangrai gurih dan renyah, camilan tradisional yang nikmat untuk menemani waktu santai.",
      },
    ],
  },
  {
    name: "Imas M",
    category: "Jasa Menjahit",
    description:
      "UMKM yang bergerak di bidang jasa menjahit dan melayani berbagai kebutuhan jahit masyarakat. Mengutamakan ketelitian, kerapian, dan kualitas hasil jahitan sehingga dapat digunakan untuk kebutuhan pakaian, perbaikan pakaian, maupun pesanan jahit sesuai kebutuhan pelanggan.",
    products: [
      {
        name: "Jasa Menjahit",
        price: 50000,
        stock: 999,
        description:
          "Layanan jasa menjahit yang teliti dan rapi untuk pembuatan pakaian, perbaikan, maupun pesanan sesuai kebutuhan pelanggan.",
      },
    ],
  },
]

const BANNERS = [
  {
    title: "Belanja UMKM Pataka",
    subtitle: "Dukung produk unggulan Desa Patakaharja",
    imageUrl: placeholder("Selamat Datang di UMKM Pataka", 1200, 400),
    linkUrl: "/stores",
    sortOrder: 1,
  },
  {
    title: "Kriya Khas Pataka",
    subtitle: "Kerajinan tangan berkualitas karya pengrajin lokal",
    imageUrl: placeholder("Kriya Khas Pataka", 1200, 400),
    linkUrl: "/kategori/kriya",
    sortOrder: 2,
  },
  {
    title: "Oleh-oleh Makanan Ringan",
    subtitle: "Camilan tradisional dengan cita rasa khas",
    imageUrl: placeholder("Makanan Ringan Pataka", 1200, 400),
    linkUrl: "/kategori/makanan-ringan",
    sortOrder: 3,
  },
]

async function main() {
  const adminPasswordHash = await bcrypt.hash(ADMIN_PASSWORD, BCRYPT_ROUNDS)
  const sellerPasswordHash = await bcrypt.hash(SELLER_PASSWORD, BCRYPT_ROUNDS)

  await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      name: "Administrator",
      password: adminPasswordHash,
      role: "ADMIN",
      isActive: true,
    },
    create: {
      name: "Administrator",
      email: ADMIN_EMAIL,
      password: adminPasswordHash,
      role: "ADMIN",
      isActive: true,
    },
  })

  const categories = new Map<string, { id: string }>()
  for (const name of CATEGORY_NAMES) {
    const slug = slugify(name)
    const category = await prisma.category.upsert({
      where: { slug },
      update: { name, isActive: true },
      create: { name, slug, isActive: true },
    })
    categories.set(name, { id: category.id })
  }

  for (const store of STORES) {
    const email = emailFor(store.name)
    const storeSlug = slugify(store.name)

    const seller = await prisma.user.upsert({
      where: { email },
      update: {
        name: store.name,
        password: sellerPasswordHash,
        role: "SELLER",
        isActive: true,
      },
      create: {
        name: store.name,
        email,
        password: sellerPasswordHash,
        role: "SELLER",
        isActive: true,
      },
    })

    const savedStore = await prisma.store.upsert({
      where: { slug: storeSlug },
      update: {
        name: store.name,
        description: store.description,
        address: STORE_ADDRESS,
        userId: seller.id,
        isActive: true,
      },
      create: {
        name: store.name,
        slug: storeSlug,
        description: store.description,
        address: STORE_ADDRESS,
        userId: seller.id,
        isActive: true,
      },
    })

    const category = categories.get(store.category)
    if (!category) {
      throw new Error(`Category not found for store ${store.name}: ${store.category}`)
    }

    for (const product of store.products) {
      const productSlug = slugify(product.name)
      const savedProduct = await prisma.product.upsert({
        where: { slug: productSlug },
        update: {
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          storeId: savedStore.id,
          categoryId: category.id,
          isActive: true,
        },
        create: {
          name: product.name,
          slug: productSlug,
          description: product.description,
          price: product.price,
          stock: product.stock,
          storeId: savedStore.id,
          categoryId: category.id,
          isActive: true,
        },
      })

      const imageUrl = placeholder(product.name)
      const existingImage = await prisma.productImage.findFirst({
        where: { productId: savedProduct.id, url: imageUrl },
      })
      if (!existingImage) {
        await prisma.productImage.create({
          data: {
            url: imageUrl,
            alt: product.name,
            productId: savedProduct.id,
            isPrimary: true,
            sortOrder: 0,
          },
        })
      }
    }

    const galleryUrl = placeholder(`Galeri ${store.name}`)
    const existingGallery = await prisma.gallery.findFirst({
      where: { storeId: savedStore.id, url: galleryUrl },
    })
    if (!existingGallery) {
      await prisma.gallery.create({
        data: {
          url: galleryUrl,
          alt: `Galeri ${store.name}`,
          storeId: savedStore.id,
        },
      })
    }
  }

  for (const banner of BANNERS) {
    const existingBanner = await prisma.banner.findFirst({
      where: { imageUrl: banner.imageUrl },
    })
    if (!existingBanner) {
      await prisma.banner.create({ data: banner })
    }
  }

  await prisma.websiteSetting.upsert({
    where: { id: "singleton" },
    update: {
      siteName: "UMKM Pataka",
      siteDescription: "Marketplace UMKM Desa Patakaharja",
      address: STORE_ADDRESS,
    },
    create: {
      id: "singleton",
      siteName: "UMKM Pataka",
      siteDescription: "Marketplace UMKM Desa Patakaharja",
      address: STORE_ADDRESS,
    },
  })

  const [users, stores, categoriesCount, products, productImages, galleries, banners] =
    await Promise.all([
      prisma.user.count(),
      prisma.store.count(),
      prisma.category.count(),
      prisma.product.count(),
      prisma.productImage.count(),
      prisma.gallery.count(),
      prisma.banner.count(),
    ])

  console.log("Seed selesai. Ringkasan data:")
  console.log(`- Jumlah user        : ${users}`)
  console.log(`- Jumlah store       : ${stores}`)
  console.log(`- Jumlah category    : ${categoriesCount}`)
  console.log(`- Jumlah product     : ${products}`)
  console.log(`- Jumlah productImage: ${productImages}`)
  console.log(`- Jumlah gallery     : ${galleries}`)
  console.log(`- Jumlah banner      : ${banners}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
