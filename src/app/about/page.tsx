import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Pro-Luce Lighting",
  description: "Learn about the heritage, engineering, and design philosophy behind Pro-Luce.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <header className="mb-20 md:mb-32">
          <h1 className="font-serif text-5xl md:text-7xl font-light text-foreground mb-6 tracking-wide leading-tight">Our Philosophy</h1>
          <div className="w-16 h-[1px] bg-[#D9B780] mt-8"></div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="font-sans text-lg md:text-xl text-foreground/80 space-y-8 leading-loose tracking-wide text-pretty">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-[#D9B780] first-letter:mr-2 first-letter:float-left">
              Light is the defining element of space. At Pro-Luce, we do not merely manufacture fixtures; we engineer the medium through which architecture is experienced.
            </p>
            <p>
              Founded on the principles of precision, materiality, and restraint, our collections are designed to seamlessly integrate into the most demanding environments, providing unparalleled visual comfort and aesthetic purity.
            </p>
            <p>
              Our engineering team works closely with leading architects and designers to develop lighting solutions that meet both rigorous technical standards and uncompromising design visions.
            </p>
          </div>
          <div className="aspect-[4/5] md:aspect-square bg-background border border-border/30 relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-tr from-foreground/5 to-transparent transition-opacity duration-1000 group-hover:opacity-50"></div>
             {/* Decorative abstract elements */}
             <div className="absolute right-12 top-12 bottom-12 w-[1px] bg-[#D9B780]/40 transform origin-top scale-y-0 transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-y-100"></div>
             <div className="absolute left-12 right-12 bottom-12 h-[1px] bg-[#D9B780]/40 transform origin-left scale-x-0 transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-x-100 delay-300"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#D9B780]/20 rounded-full opacity-0 scale-50 transition-all duration-1000 ease-out group-hover:opacity-100 group-hover:scale-100 delay-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
