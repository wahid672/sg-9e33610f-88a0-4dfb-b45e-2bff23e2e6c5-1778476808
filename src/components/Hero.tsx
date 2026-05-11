import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
            <Sparkles className="w-4 h-4" />
            Platform Marketplace Produk Digital #1 di Indonesia
          </div>
          
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
            Monetisasi Konten Digital Anda dengan Mudah
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Jual ebook, course, template, dan produk digital lainnya. 
            Sistem otomatis, pembayaran lengkap, dan affiliate marketing terintegrasi.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" className="w-full sm:w-auto group" asChild>
              <Link href="/register">
                Mulai Jualan Gratis
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
              <Link href="/products">
                Jelajahi Produk
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-border">
            <div className="space-y-1">
              <div className="font-heading font-bold text-2xl md:text-3xl text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Produk Digital</div>
            </div>
            <div className="space-y-1">
              <div className="font-heading font-bold text-2xl md:text-3xl text-primary">5K+</div>
              <div className="text-sm text-muted-foreground">Seller Aktif</div>
            </div>
            <div className="space-y-1">
              <div className="font-heading font-bold text-2xl md:text-3xl text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Pembeli</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}