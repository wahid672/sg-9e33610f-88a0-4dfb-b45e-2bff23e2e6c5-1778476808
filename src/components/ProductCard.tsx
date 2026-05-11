import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  thumbnail?: string;
  seller?: {
    name: string;
    username: string;
    avatar?: string;
  };
  rating?: number;
  sales?: number;
  category?: string;
  discountPrice?: number;
  sellerName?: string;
  sellerAvatar?: string;
  totalSales?: number;
  slug?: string;
}

export function ProductCard({ 
  id, 
  title, 
  price, 
  thumbnail, 
  seller, 
  rating = 4.8, 
  sales = 0,
  category,
  discountPrice,
  sellerName,
  sellerAvatar,
  totalSales,
  slug
}: ProductCardProps) {
  const displaySellerName = sellerName || seller?.name || "Unknown";
  const displaySellerAvatar = sellerAvatar || seller?.avatar;
  const displaySales = totalSales !== undefined ? totalSales : sales;
  const linkHref = slug ? `/products/${slug}` : `/products/${id}`;

  return (
    <Link href={linkHref}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <img 
              src={thumbnail || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80"} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {category && (
              <Badge className="absolute top-3 left-3 bg-background/90 text-foreground border-border">
                {category}
              </Badge>
            )}
            {discountPrice && (
              <Badge className="absolute top-3 right-3 bg-destructive">
                SALE
              </Badge>
            )}
          </div>
          
          <div className="p-4 space-y-3">
            <h3 className="font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={displaySellerAvatar} />
                <AvatarFallback className="text-xs">
                  {displaySellerName[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground truncate">
                {displaySellerName}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{rating}</span>
                <span className="text-muted-foreground">({displaySales})</span>
              </div>
              <div className="font-heading font-bold text-lg text-primary">
                Rp {(discountPrice || price).toLocaleString("id-ID")}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}