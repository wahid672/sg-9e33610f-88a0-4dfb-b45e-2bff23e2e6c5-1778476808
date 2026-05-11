import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, MapPin, Link2, Mail, Users, TrendingUp, 
  Package, ExternalLink 
} from "lucide-react";
import { storeService } from "@/services/storeService";
import { productService } from "@/services/productService";
import { SEO } from "@/components/SEO";

export default function StorefrontPage() {
  const router = useRouter();
  const { username } = router.query;
  const [store, setStore] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username) {
      // Remove @ prefix if present
      const cleanUsername = (username as string).replace("@", "");
      loadStorefront(cleanUsername);
    }
  }, [username]);

  const loadStorefront = async (username: string) => {
    setLoading(true);
    try {
      const storeData = await storeService.getStoreByUsername(username);
      setStore(storeData);
      
      const productsData = await productService.getProducts({
        storeId: storeData.id,
        isActive: true
      });
      setProducts(productsData);
    } catch (error) {
      console.error("Error loading storefront:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background pt-20 pb-24 md:pb-8">
          <div className="animate-pulse space-y-6">
            <div className="h-64 bg-muted/20" />
            <div className="container mx-auto px-4">
              <div className="h-48 bg-muted/20 rounded-2xl" />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!store) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background pt-20 pb-24 md:pb-8 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-heading font-bold mb-4">Store Not Found</h2>
            <Button asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO 
        title={`${store.display_name} (@${store.username}) - DigiMart`}
        description={store.description || `Shop digital products from ${store.display_name}`}
        image={store.logo_url}
      />
      
      <Navigation />
      
      <main className="min-h-screen bg-background pt-20 pb-24 md:pb-8">
        {/* Store Banner */}
        <div className="relative h-64 bg-gradient-to-br from-primary/20 to-accent/20">
          {store.banner_url && (
            <img
              src={store.banner_url}
              alt={store.display_name}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4">
          {/* Store Info */}
          <div className="relative -mt-20 mb-8">
            <div className="bg-card rounded-2xl p-6 shadow-xl border border-border/50">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                  <AvatarImage src={store.logo_url || undefined} />
                  <AvatarFallback className="text-2xl">
                    {store.display_name?.[0] || "S"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h1 className="text-3xl font-heading font-bold mb-1">
                    {store.display_name}
                  </h1>
                  <p className="text-muted-foreground mb-3">
                    @{store.username}
                  </p>
                  
                  {store.description && (
                    <p className="text-sm text-muted-foreground mb-4">
                      {store.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Package className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{store.total_products}</span>
                      <span className="text-muted-foreground">Products</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{store.total_sales}</span>
                      <span className="text-muted-foreground">Sales</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="font-medium">{store.rating.toFixed(1)}</span>
                      <span className="text-muted-foreground">Rating</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {store.social_links?.website && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={store.social_links.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  <Button>
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Seller
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <Tabs defaultValue="products" className="space-y-6">
            <TabsList>
              <TabsTrigger value="products">
                Products ({products.length})
              </TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              {products.length === 0 ? (
                <div className="text-center py-16 bg-muted/10 rounded-2xl">
                  <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                  <p className="text-muted-foreground">No products available yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      title={product.title}
                      price={product.price}
                      discountPrice={product.discount_price}
                      thumbnail={product.thumbnail_url}
                      sellerName={store.display_name}
                      sellerAvatar={store.logo_url}
                      totalSales={product.total_sales}
                      slug={product.slug}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="about" className="space-y-6">
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <h2 className="font-heading font-bold text-xl mb-4">About this store</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {store.description || "No description available"}
                </p>

                {store.social_links && Object.keys(store.social_links).length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Connect</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(store.social_links).map(([key, value]: [string, any]) => (
                        <Button key={key} variant="outline" size="sm" asChild>
                          <a href={value} target="_blank" rel="noopener noreferrer">
                            <Link2 className="w-4 h-4 mr-2" />
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </>
  );
}
