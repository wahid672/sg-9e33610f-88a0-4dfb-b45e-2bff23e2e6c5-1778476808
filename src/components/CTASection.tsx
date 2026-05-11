import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Store, Users, TrendingUp, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Seller CTA */}
          <Card className="group hover:shadow-xl hover:border-primary/50 transition-all duration-300 overflow-hidden relative">
            <CardContent className="p-8 md:p-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                <Store className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-3">
                Mulai Jualan Digital
              </h3>
              
              <p className="text-muted-foreground mb-6">
                Buat toko digital Anda dalam hitungan menit. Upload produk, 
                atur harga, dan mulai menghasilkan. Sistem otomatis akan 
                menangani pembayaran dan delivery.
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  Setup gratis, tanpa biaya bulanan
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  Auto-delivery produk digital
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  Dashboard analytics lengkap
                </li>
              </ul>

              <Button className="w-full group/btn" size="lg" asChild>
                <Link href="/register?role=seller">
                  Daftar Jadi Seller
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />
          </Card>

          {/* Affiliate CTA */}
          <Card className="group hover:shadow-xl hover:border-accent/50 transition-all duration-300 overflow-hidden relative">
            <CardContent className="p-8 md:p-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 mb-6 group-hover:bg-accent/20 transition-colors">
                <Users className="w-7 h-7 text-accent" />
              </div>
              
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-3">
                Jadi Affiliate
              </h3>
              
              <p className="text-muted-foreground mb-6">
                Promosikan produk digital dan dapatkan komisi. Sistem tracking 
                otomatis, pembayaran transparan, dan dashboard real-time untuk 
                monitor performa Anda.
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  Komisi hingga 50% per penjualan
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  Tracking click & conversion real-time
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  Withdrawal mudah dan cepat
                </li>
              </ul>

              <Button className="w-full" variant="outline" size="lg" asChild>
                <Link href="/affiliate">
                  Pelajari Program Affiliate
                  <TrendingUp className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>

            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -z-10" />
          </Card>
        </div>
      </div>
    </section>
  );
}