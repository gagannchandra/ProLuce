import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-secondary text-foreground py-20 mt-auto border-t border-border/40">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center border border-foreground p-[3px] group transition-transform duration-300 hover:scale-[1.02] mb-8">
              <span className="bg-foreground text-secondary font-sans font-bold tracking-[0.2em] text-xs md:text-sm px-3 py-1.5 uppercase">
                PRO -
              </span>
              <span className="bg-transparent text-foreground font-sans font-bold tracking-[0.2em] text-xs md:text-sm px-3 py-1.5 uppercase">
                LUCE
              </span>
            </Link>
            <p className="text-foreground/70 text-sm max-w-xs text-balance leading-loose tracking-wide">
              Designed to illuminate exceptional spaces. The pinnacle of architectural lighting.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg md:text-xl mb-6 text-accent tracking-wide italic">Collections</h4>
            <ul className="space-y-4">
              <li><Link href="/collections#architectural" className="text-foreground/70 hover:text-accent transition-colors duration-300 text-sm tracking-wider uppercase font-semibold text-[10px]">Architectural</Link></li>
              <li><Link href="/collections#commercial" className="text-foreground/70 hover:text-accent transition-colors duration-300 text-sm tracking-wider uppercase font-semibold text-[10px]">Commercial</Link></li>
              <li><Link href="/collections#hospitality" className="text-foreground/70 hover:text-accent transition-colors duration-300 text-sm tracking-wider uppercase font-semibold text-[10px]">Hospitality</Link></li>
              <li><Link href="/collections#residential" className="text-foreground/70 hover:text-accent transition-colors duration-300 text-sm tracking-wider uppercase font-semibold text-[10px]">Residential</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg md:text-xl mb-6 text-accent tracking-wide italic">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-foreground/70 hover:text-accent transition-colors duration-300 text-sm tracking-wider uppercase font-semibold text-[10px]">About Us</Link></li>
              <li><Link href="/projects" className="text-foreground/70 hover:text-accent transition-colors duration-300 text-sm tracking-wider uppercase font-semibold text-[10px]">Projects</Link></li>
              <li><Link href="/journal" className="text-foreground/70 hover:text-accent transition-colors duration-300 text-sm tracking-wider uppercase font-semibold text-[10px]">Journal</Link></li>
              <li><Link href="/contact" className="text-foreground/70 hover:text-accent transition-colors duration-300 text-sm tracking-wider uppercase font-semibold text-[10px]">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg md:text-xl mb-6 text-accent tracking-wide italic">Newsletter</h4>
            <p className="text-foreground/70 text-sm mb-6 leading-relaxed">Subscribe for the latest releases and inspiration.</p>
            <form className="flex group">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent border-b border-foreground/30 px-0 py-3 text-sm focus:outline-none focus:border-accent transition-all duration-300 w-full hover:border-foreground/60 text-foreground placeholder:text-foreground/40"
                suppressHydrationWarning
              />
              <button 
                type="submit"
                className="border-b border-foreground/30 text-accent px-4 py-3 text-xs font-bold tracking-[0.2em] uppercase hover:border-accent transition-colors duration-300"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-foreground/10 mt-24 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-foreground/50 text-xs">
            © {new Date().getFullYear()} Pro-Luce Lighting. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-foreground/50 hover:text-foreground transition-colors text-xs">Privacy Policy</Link>
            <Link href="/terms" className="text-foreground/50 hover:text-foreground transition-colors text-xs">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
