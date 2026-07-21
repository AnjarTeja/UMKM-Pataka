import { Share2, Mail, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-primary mt-16">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center py-12 px-6 gap-8">
        <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
          <span className="font-heading text-lg font-bold text-white">
            Patakaharja
          </span>
          <p className="text-primary-fixed-dim/80 text-sm max-w-xs">
            Memberdayakan UMKM lokal melalui inovasi digital dan pelestarian
            seni tradisional Indonesia.
          </p>
          <p className="text-primary-fixed-dim/60 text-xs flex items-center gap-1">
            Made with <Heart className="h-3 w-3 fill-primary-fixed-dim" /> in
            Patakaharja
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-secondary-fixed mb-1">
              Bantuan
            </span>
            <a
              href="#"
              className="text-primary-fixed-dim/70 text-sm hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-primary-fixed-dim/70 text-sm hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-secondary-fixed mb-1">
              Layanan
            </span>
            <a
              href="#"
              className="text-primary-fixed-dim/70 text-sm hover:text-white transition-colors"
            >
              Cara Pemesanan
            </a>
            <a
              href="#"
              className="text-primary-fixed-dim/70 text-sm hover:text-white transition-colors"
            >
              Hubungi Artisan
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center md:items-end">
          <div className="flex gap-3">
            <button className="h-10 w-10 rounded-full border border-primary-fixed-dim/30 flex items-center justify-center text-primary-fixed-dim hover:bg-white/10 hover:text-white transition-all active:scale-90">
              <Share2 className="h-4 w-4" />
            </button>
            <button className="h-10 w-10 rounded-full border border-primary-fixed-dim/30 flex items-center justify-center text-primary-fixed-dim hover:bg-white/10 hover:text-white transition-all active:scale-90">
              <Mail className="h-4 w-4" />
            </button>
          </div>
          <p className="text-primary-fixed-dim/60 text-xs">
            &copy; {new Date().getFullYear()} Patakaharja UMKM. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
