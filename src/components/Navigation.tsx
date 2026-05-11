import Link from "next/link";
import { ShoppingBag, Search, User, Home, LayoutDashboard, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Navigation() {
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border hidden md:block">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 font-heading font-bold text-xl">
              <ShoppingBag className="w-6 h-6 text-primary" />
              DigiMart
            </Link>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Cari produk digital..." 
                  className="pl-10 bg-muted/50"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/products">Jelajah</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/sell">Jadi Seller</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">
                  <User className="w-4 h-4 mr-2" />
                  Masuk
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Daftar</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden">
        <div className="grid grid-cols-4 gap-1 p-2">
          <Link 
            href="/" 
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </Link>
          <Link 
            href="/products" 
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Search className="w-5 h-5" />
            <span className="text-xs font-medium">Jelajah</span>
          </Link>
          <Link 
            href="/dashboard" 
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-xs font-medium">Dashboard</span>
          </Link>
          <Link 
            href="/profile" 
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <User className="w-5 h-5" />
            <span className="text-xs font-medium">Profil</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border md:hidden">
        <div className="flex items-center gap-3 p-4">
          <Link href="/" className="flex items-center gap-2 font-heading font-bold text-lg">
            <ShoppingBag className="w-5 h-5 text-primary" />
            DigiMart
          </Link>
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Cari..." 
                className="pl-10 h-9 bg-muted/50"
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}