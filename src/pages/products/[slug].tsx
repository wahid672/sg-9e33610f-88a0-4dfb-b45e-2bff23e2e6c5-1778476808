import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, Star, Shield, Download, Link as LinkIcon, 
  FileText, Award, Users, TrendingUp
} from "lucide-react";
import { productService } from "@/services/productService";
import { SEO } from "@/components/SEO";

export default function ProductDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadProduct();
    }
  }, [slug]);

  const loadProduct = async () => {
    setLoading(true);
    try {
      const data = await productService.getProductBySlug(slug as string);
      setProduct(data);
    } catch (error) {
      console.error("Error loading product:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background pt-20 pb-24 md:pb-8">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-96 bg-muted/20 rounded-2xl" />
              <div className="h-64 bg-muted/20 rounded-2xl" />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background pt-20 pb-24 md:pb-8 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-heading font-bold mb-4">Product Not Found</h2>
            <Button asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const discountPercentage = product.discount_price 
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  return (
    <>
      <SEO 
        title={`${product.title} - DigiMart`}
        description={product.description || `Buy ${product.title} digital product`}
        image={product.thumbnail_url}
      />
      
      <Navigation />
      
      <main className="min-h-screen bg-background pt-20 pb-24 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Product Image & Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Product Image */}
              <div className="relative rounded-2xl overflow-hidden bg-muted/20 aspect-video">
                {product.thumbnail_url ? (
                  <img
                    src={product.thumbnail_url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileText className="w-24 h-24 text-muted-foreground/30" />
                  </div>
                )}
                
                {product.discount_price && (
                  <Badge className="absolute top-4 right-4 bg-destructive">
                    {discountPercentage}% OFF
                  </Badge>
                )}
              </div>

              {/* Product Details */}
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h1 className="text-3xl font-heading font-bold mb-2">
                      {product.title}
                    </h1>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{product.category?.name}</Badge>
                      <Badge variant="outline">
                        {product.product_type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  {/* Description */}
                  <div>
                    <h3 className="font-semibold mb-3">About this product</h3>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {product.description || "No description available"}
                    </p>
                  </div>

                  {/* Tags */}
                  {product.tags && product.tags.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag: string, index: number) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* What's Included */}
                  <div>
                    <h3 className="font-semibold mb-3">What you'll get</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {product.file_url && (
                        <div className="flex items-center gap-2 text-sm">
                          <Download className="w-4 h-4 text-primary" />
                          <span>Instant download access</span>
                        </div>
                      )}
                      {product.external_link && (
                        <div className="flex items-center gap-2 text-sm">
                          <LinkIcon className="w-4 h-4 text-primary" />
                          <span>External access link</span>
                        </div>
                      )}
                      {product.license_key && (
                        <div className="flex items-center gap-2 text-sm">
                          <Award className="w-4 h-4 text-primary" />
                          <span>License key included</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <Shield className="w-4 h-4 text-primary" />
                        <span>Secure payment</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Purchase Box & Seller Info */}
            <div className="space-y-6">
              {/* Purchase Card */}
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-4">
                  <div>
                    {product.discount_price ? (
                      <>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-heading font-bold text-primary">
                            Rp {product.discount_price.toLocaleString("id-ID")}
                          </span>
                          <span className="text-lg text-muted-foreground line-through">
                            Rp {product.price.toLocaleString("id-ID")}
                          </span>
                        </div>
                        <p className="text-sm text-destructive font-medium mt-1">
                          Save Rp {(product.price - product.discount_price).toLocaleString("id-ID")}
                        </p>
                      </>
                    ) : (
                      <span className="text-3xl font-heading font-bold text-primary">
                        Rp {product.price.toLocaleString("id-ID")}
                      </span>
                    )}
                  </div>

                  <Button className="w-full" size="lg">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>

                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground pt-2">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {product.total_sales} sales
                    </div>
                    {product.is_affiliate_enabled && (
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {product.affiliate_commission_percentage}% commission
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Seller Card */}
              {product.store && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Sold by</h3>
                    
                    <Link 
                      href={`/@${product.store.username}`}
                      className="flex items-center gap-3 group mb-4"
                    >
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={product.store.logo_url || undefined} />
                        <AvatarFallback>
                          {product.store.display_name?.[0] || "S"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium group-hover:text-primary transition-colors">
                          {product.store.display_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          @{product.store.username}
                        </p>
                      </div>
                    </Link>

                    {product.store.description && (
                      <p className="text-sm text-muted-foreground mb-4">
                        {product.store.description}
                      </p>
                    )}

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {product.store.total_sales}
                        </div>
                        <div className="text-xs text-muted-foreground">Sales</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center justify-center gap-1 text-2xl font-bold text-primary">
                          {product.store.rating.toFixed(1)}
                          <Star className="w-5 h-5 fill-primary" />
                        </div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                    </div>

                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/@${product.store.username}`}>
                        Visit Store
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
