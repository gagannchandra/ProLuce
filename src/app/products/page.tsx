import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Products Catalogue | Pro-Luce Lighting",
  description: "Browse the complete Pro-Luce architectural lighting catalogue.",
};

const products = [
  { id: "p1", name: "Aura Pendant", category: "Residential", image: "/images/residential.png" },
  { id: "p2", name: "Linea Profile", category: "Architectural", image: "/images/architectural.png" },
  { id: "p3", name: "Lumina Sconce", category: "Hospitality", image: "/images/hospitality.png" },
  { id: "p4", name: "Zenith Spotlight", category: "Commercial", image: "/images/commercial.png" },
  { id: "p5", name: "Halo Ring", category: "Architectural", image: "/images/architectural.png" },
  { id: "p6", name: "Vela Wall", category: "Hospitality", image: "/images/hospitality.png" },
];

export default function ProductsPage() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <header className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
          <div>
            <h1 className="font-serif text-5xl md:text-7xl font-light text-foreground mb-6 tracking-wide leading-tight">Catalogue</h1>
            <p className="font-sans text-foreground/60 text-lg md:text-xl max-w-md tracking-wide">
              Precision instruments for shaping light.
            </p>
          </div>
          <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
            {["All", "Architectural", "Commercial", "Hospitality", "Residential"].map((filter) => (
              <button key={filter} className={`px-5 py-2.5 text-xs tracking-[0.2em] uppercase font-semibold whitespace-nowrap transition-all duration-300 ${filter === 'All' ? 'bg-foreground text-background shadow-md' : 'border border-border/40 text-foreground/70 hover:border-foreground/50 hover:text-foreground'}`}>
                {filter}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {products.map((product) => (
            <a key={product.id} href={`/products/${product.id}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden mb-8">
                <div className="absolute inset-0 transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-[1.05]">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover" 
                  />
                </div>
                <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-700 ease-out"></div>
              </div>
              <div className="flex justify-between items-baseline pr-4 mt-6">
                <div>
                  <p className="text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase text-foreground/50 mb-3">{product.category}</p>
                  <h3 className="font-serif text-2xl md:text-3xl text-foreground tracking-wide">{product.name}</h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
