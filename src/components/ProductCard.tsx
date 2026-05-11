import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Download } from "lucide-react";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  seller: {
    name: string;
    username: string;
    avatar?: string;
  };
  rating?: number;
  sales?: number;
  category: string;
}

export function ProductCard({ 
  id, 
  title, 
  price, 
  thumbnail, 
  seller, 
  rating = 4.8, 
  sales = 0,
  category 
}: ProductCardProps) {
  return (
    <Link href={`/product/${id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <img 
              src={thumbnail} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <Badge className="absolute top-3 left-3 bg-background/90 text-foreground border-border">
              {category}
            </Badge>
          </div>
          
          <div className="p-4 space-y-3">
            <h3 className="font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={seller.avatar} />
                <AvatarFallback className="text-xs">
                  {seller.name[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground truncate">
                {seller.name}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{rating}</span>
                <span className="text-muted-foreground">({sales})</span>
              </div>
              <div className="font-heading font-bold text-lg text-primary">
                Rp {price.toLocaleString("id-ID")}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}