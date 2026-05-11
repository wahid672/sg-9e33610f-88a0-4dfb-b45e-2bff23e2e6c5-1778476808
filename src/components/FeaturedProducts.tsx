import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const MOCK_PRODUCTS = [
  {
    id: "1",
    title: "Panduan Lengkap Instagram Marketing 2024",
    price: 149000,
    thumbnail: "https://images.unsplash.com/photo--1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    seller: {
      name: "Sarah Digital",
      username: "sarahdigital",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    rating: 4.9,
    sales: 1234,
    category: "Marketing"
  },
  {
    id: "2",
    title: "Template Website Landing Page Premium",
    price: 99000,
    thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop",
    seller: {
      name: "DesignHub",
      username: "designhub",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Design"
    },
    rating: 4.8,
    sales: 856,
    category: "Template"
  },
  {
    id: "3",
    title: "Ebook: Investasi Crypto untuk Pemula",
    price: 75000,
    thumbnail: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&h=400&fit=crop",
    seller: {
      name: "Crypto Academy",
      username: "cryptoacademy",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Crypto"
    },
    rating: 4.7,
    sales: 542,
    category: "Ebook"
  },
  {
    id: "4",
    title: "Course: Canva Mastery untuk Konten Kreator",
    price: 199000,
    thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop",
    seller: {
      name: "Kreativitas ID",
      username: "kreativitasid",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kreativ"
    },
    rating: 5.0,
    sales: 2103,
    category: "Course"
  }
];

export function FeaturedProducts() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-2">
              Produk Unggulan
            </h2>
            <p className="text-muted-foreground">
              Produk digital terlaris dan terpopuler minggu ini
            </p>
          </div>
          <Button variant="ghost" className="hidden md:flex" asChild>
            <Link href="/products">
              Lihat Semua
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link href="/products">
              Lihat Semua Produk
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}