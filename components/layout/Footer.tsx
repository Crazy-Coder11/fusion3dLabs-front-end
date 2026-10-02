'use client'

import Link from 'next/link'
import Image from 'next/image'

const FOOTER_LINKS = {
  explore: [
    { label: 'Sculpture', href: '/shop?category=Sculpture' },
    { label: 'Decor', href: '/shop?category=Decor' },
    { label: 'Desk Series', href: '/shop?category=Desk Series' },
    { label: 'Wearable', href: '/shop?category=Wearable' },
    { label: 'Custom', href: '/shop?category=Custom' },
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
    <footer className="py-20 bg-bg-2 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Image
                src="/logo.png"
                alt="Fusion3DLabs"
                width={180}
                height={54}
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs">
              Premium 3D printing and rapid prototyping. We transform imagination into reality with exceptional quality.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="https://wa.me/919999999999?text=Hi%20Fusion3D%20Labs!%20I%20have%20a%20question%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full font-medium hover:bg-highlight-1 transition-colors text-sm"
              >
                Chat on WhatsApp
              </Link>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-text-muted mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.explore.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-text-muted mb-4">Company</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} Fusion3DLabs. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            No online payments — all orders confirmed via WhatsApp.
          </p>
        </div>
      </div>
    </footer>
  )
}