import Link from "next/link";
import { ShoppingBag, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border mt-20">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-heading font-bold text-xl">
              <ShoppingBag className="w-6 h-6 text-primary" />
              DigiMart
            </Link>
            <p className="text-sm text-muted-foreground">
              Platform marketplace produk digital terpercaya di Indonesia. 
              Jual beli ebook, course, template, dan produk digital lainnya dengan mudah.
            </p>
          </div>

          {/* Produk */}
          <div>
            <h3 className="font-semibold mb-4">Produk</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/ebook" className="text-muted-foreground hover:text-primary transition-colors">
                  Ebook
                </Link>
              </li>
              <li>
                <Link href="/category/course" className="text-muted-foreground hover:text-primary transition-colors">
                  Online Course
                </Link>
              </li>
              <li>
                <Link href="/category/template" className="text-muted-foreground hover:text-primary transition-colors">
                  Template
                </Link>
              </li>
              <li>
                <Link href="/category/source-code" className="text-muted-foreground hover:text-primary transition-colors">
                  Source Code
                </Link>
              </li>
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <h3 className="font-semibold mb-4">Perusahaan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/sell" className="text-muted-foreground hover:text-primary transition-colors">
                  Jadi Seller
                </Link>
              </li>
              <li>
                <Link href="/affiliate" className="text-muted-foreground hover:text-primary transition-colors">
                  Program Affiliate
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-primary transition-colors">
                  Pusat Bantuan
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2026 DigiMart. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="mailto:support@digimart.id" className="hover:text-primary transition-colors">
                support@digimart.id
              </a>
              <a href="https://wa.me/6281234567890" className="hover:text-primary transition-colors">
                +62 812-3456-7890
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Spacing */}
      <div className="h-20 md:hidden" />
    </footer>
  );
}