import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Star, ArrowRight } from "lucide-react";

const TOP_SELLERS = [
  {
    username: "sarahdigital",
    name: "Sarah Digital",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    rating: 4.9,
    products: 45,
    sales: 12450,
    badge: "Top Seller"
  },
  {
    username: "designhub",
    name: "DesignHub Studio",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Design",
    rating: 4.8,
    products: 67,
    sales: 9876,
    badge: "Verified"
  },
  {
    username: "cryptoacademy",
    name: "Crypto Academy",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Crypto",
    rating: 4.9,
    products: 23,
    sales: 8432,
    badge: "Top Seller"
  },
  {
    username: "kreativitasid",
    name: "Kreativitas Indonesia",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kreativ",
    rating: 5.0,
    products: 34,
    sales: 15234,
    badge: "Featured"
  },
  {
    username: "codemaster",
    name: "Code Master Pro",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Code",
    rating: 4.7,
    products: 56,
    sales: 7654,
    badge: "Verified"
  },
  {
    username: "marketingguru",
    name: "Marketing Guru",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marketing",
    rating: 4.8,
    products: 41,
    sales: 6543,
    badge: "Top Seller"
  }
];

export function TopSellers() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl">
                Top Sellers
              </h2>
              <p className="text-muted-foreground mt-1">
                Seller terbaik dan terpercaya di DigiMart
              </p>
            </div>
          </div>
          <Button variant="ghost" className="hidden md:flex" asChild>
            <Link href="/sellers">
              Lihat Semua
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOP_SELLERS.map((seller) => (
            <Link key={seller.username} href={`/@${seller.username}`}>
              <Card className="group hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16 border-2 border-primary/20">
                      <AvatarImage src={seller.avatar} />
                      <AvatarFallback>{seller.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-base truncate group-hover:text-primary transition-colors">
                          {seller.name}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {seller.badge}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        @{seller.username}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{seller.rating}</span>
                        </div>
                        <div className="text-muted-foreground">
                          {seller.products} produk
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-border">
                        <div className="text-xs text-muted-foreground mb-1">
                          Total Penjualan
                        </div>
                        <div className="font-heading font-bold text-primary">
                          {seller.sales.toLocaleString("id-ID")}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link href="/sellers">
              Lihat Semua Seller
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}