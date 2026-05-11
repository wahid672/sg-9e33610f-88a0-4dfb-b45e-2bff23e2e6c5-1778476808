import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, ShoppingBag, Package, DollarSign, Users, 
  Link2, Wallet, Settings, Plus, Eye, Edit
} from "lucide-react";
import { authService } from "@/services/authService";
import { profileService } from "@/services/profileService";
import { SEO } from "@/components/SEO";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeRole, setActiveRole] = useState<"buyer" | "seller" | "affiliate">("buyer");

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const session = await authService.getCurrentSession();
      if (!session) {
        router.push("/auth/login");
        return;
      }

      setUser(session.user);
      const profileData = await profileService.getProfile(session.user.id);
      setProfile(profileData);
      
      // Set default role based on user's roles
      if (profileData.roles.includes("seller")) {
        setActiveRole("seller");
      } else if (profileData.roles.includes("affiliate")) {
        setActiveRole("affiliate");
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await authService.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background pt-20 pb-24 md:pb-8">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-24 bg-muted/20 rounded-2xl" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-muted/20 rounded-2xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const mockStats = {
    buyer: {
      totalOrders: 12,
      totalSpent: 1250000,
      pendingOrders: 2,
      completedOrders: 10
    },
    seller: {
      totalSales: 8500000,
      totalOrders: 145,
      totalProducts: 8,
      pendingWithdrawal: 2100000
    },
    affiliate: {
      totalEarnings: 1850000,
      totalClicks: 1250,
      totalConversions: 42,
      conversionRate: 3.36
    }
  };

  return (
    <>
      <SEO 
        title="Dashboard - DigiMart"
        description="Manage your digital marketplace activities"
      />
      
      <Navigation />
      
      <main className="min-h-screen bg-background pt-20 pb-24 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold mb-1">
                Welcome back, {profile?.full_name || user?.email}
              </h1>
              <p className="text-muted-foreground">
                Manage your marketplace activities
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/dashboard/settings">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Link>
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>

          {/* Role Tabs */}
          <Tabs value={activeRole} onValueChange={(v) => setActiveRole(v as any)} className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full sm:w-auto">
              {profile?.roles.includes("buyer") && (
                <TabsTrigger value="buyer">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Buyer
                </TabsTrigger>
              )}
              {profile?.roles.includes("seller") && (
                <TabsTrigger value="seller">
                  <Package className="w-4 h-4 mr-2" />
                  Seller
                </TabsTrigger>
              )}
              {profile?.roles.includes("affiliate") && (
                <TabsTrigger value="affiliate">
                  <Link2 className="w-4 h-4 mr-2" />
                  Affiliate
                </TabsTrigger>
              )}
            </TabsList>

            {/* Buyer Dashboard */}
            <TabsContent value="buyer" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Orders
                    </CardTitle>
                    <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStats.buyer.totalOrders}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {mockStats.buyer.pendingOrders} pending
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Spent
                    </CardTitle>
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      Rp {(mockStats.buyer.totalSpent / 1000).toFixed(0)}K
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Lifetime purchases
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Completed
                    </CardTitle>
                    <Package className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStats.buyer.completedOrders}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Successfully delivered
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Wishlist
                    </CardTitle>
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Saved items
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    No orders yet. Start shopping!
                  </div>
                  <Button className="w-full" asChild>
                    <Link href="/products">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Browse Products
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Seller Dashboard */}
            <TabsContent value="seller" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Sales
                    </CardTitle>
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      Rp {(mockStats.seller.totalSales / 1000000).toFixed(1)}M
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      +12.5% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Orders
                    </CardTitle>
                    <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStats.seller.totalOrders}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      All time
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Products
                    </CardTitle>
                    <Package className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStats.seller.totalProducts}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Active listings
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Balance
                    </CardTitle>
                    <Wallet className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      Rp {(mockStats.seller.pendingWithdrawal / 1000).toFixed(0)}K
                    </div>
                    <Button variant="link" className="p-0 h-auto text-xs">
                      Request withdrawal
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>My Products</CardTitle>
                    <Button size="sm" asChild>
                      <Link href="/dashboard/seller/products/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      No products yet. Create your first product!
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      No sales yet
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Affiliate Dashboard */}
            <TabsContent value="affiliate" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Earnings
                    </CardTitle>
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      Rp {(mockStats.affiliate.totalEarnings / 1000).toFixed(0)}K
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      +8.2% this week
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Clicks
                    </CardTitle>
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStats.affiliate.totalClicks}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      All time
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Conversions
                    </CardTitle>
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStats.affiliate.totalConversions}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Successful sales
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Conv. Rate
                    </CardTitle>
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockStats.affiliate.conversionRate}%</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Click to sale
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Affiliate Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    Browse products to generate affiliate links
                  </div>
                  <Button className="w-full" asChild>
                    <Link href="/products">
                      <Link2 className="w-4 h-4 mr-2" />
                      Browse Products
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </>
  );
}