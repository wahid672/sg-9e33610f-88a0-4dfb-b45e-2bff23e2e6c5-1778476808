import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BookOpen, 
  Code, 
  Palette, 
  Video, 
  Music, 
  FileText,
  Camera,
  GraduationCap 
} from "lucide-react";

const CATEGORIES = [
  { name: "Ebook", icon: BookOpen, count: 2543, color: "text-blue-500" },
  { name: "Course", icon: GraduationCap, count: 1832, color: "text-purple-500" },
  { name: "Template", icon: Palette, count: 1456, color: "text-pink-500" },
  { name: "Source Code", icon: Code, count: 987, color: "text-green-500" },
  { name: "Video", icon: Video, count: 764, color: "text-red-500" },
  { name: "Audio", icon: Music, count: 532, color: "text-yellow-500" },
  { name: "Foto", icon: Camera, count: 421, color: "text-indigo-500" },
  { name: "Dokumen", icon: FileText, count: 356, color: "text-orange-500" },
];

export function Categories() {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3">
            Kategori Produk Digital
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Temukan berbagai jenis produk digital sesuai kebutuhan Anda
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.name} href={`/category/${category.name.toLowerCase()}`}>
                <Card className="group hover:shadow-md hover:border-primary/30 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-muted group-hover:bg-primary/10 transition-colors">
                      <Icon className={`w-7 h-7 ${category.color} group-hover:scale-110 transition-transform`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm md:text-base mb-1">
                        {category.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {category.count.toLocaleString("id-ID")} produk
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}