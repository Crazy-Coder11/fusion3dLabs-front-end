import Link from 'next/link'
import Image from 'next/image'
import { whatsappUrl } from '@/lib/site'

const FOOTER_LINKS = {
  explore: [
    { label: '3D Printing Services', href: '/3d-printing-services' },
    { label: 'Custom 3D Keychains', href: '/custom-3d-printed-keychains' },
    { label: '3D Printed Ganesh Idols', href: '/3d-printed-lord-ganesh-idols' },
    { label: 'Sculpture', href: '/shop?category=Sculpture' },
    { label: 'Decor', href: '/shop?category=Decor' },
    { label: 'Desk Series', href: '/shop?category=Desk Series' },
    { label: 'Custom Products', href: '/shop?category=Custom' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Bulk Orders', href: '/bulk-order' },
    { label: 'Track Order', href: '/track' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative py-20 overflow-hidden bg-[linear-gradient(135deg,#031c13_0%,#064e3b_55%,#0f766e_100%)] border-t border-emerald-300/20">
      <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6 inline-flex rounded-2xl bg-white px-4 py-3 shadow-lg">
              <Image
                src="/fusion3dlabs-logo-header.png"
                alt="Fusion3DLabs 3D printing services"
                width={180}
                height={54}
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </div>
            <p className="text-sm !text-white leading-relaxed max-w-xs">
              Custom 3D printing, design support and rapid prototyping for projects delivered across India.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full font-semibold hover:bg-highlight-1 transition-colors text-sm shadow-sm"
              >
                Chat on WhatsApp
              </Link>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h2 className="text-xs uppercase tracking-widest !text-white mb-4">Explore</h2>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.explore.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white hover:text-lime-200 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h2 className="text-xs uppercase tracking-widest !text-white mb-4">Company</h2>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white hover:text-lime-200 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs !text-white">
            © {new Date().getFullYear()} Fusion3DLabs. All rights reserved.
          </p>
          <p className="text-xs !text-white">
            No online payments — all orders confirmed via WhatsApp.
          </p>
        </div>
      </div>
    </footer>
  )
}
