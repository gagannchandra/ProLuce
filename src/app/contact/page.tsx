import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Pro-Luce Lighting",
  description: "Get in touch with our team for project inquiries and catalogue requests.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <header className="mb-20 md:mb-32">
          <h1 className="font-serif text-5xl md:text-7xl font-light text-foreground mb-6 tracking-wide leading-tight">Inquiries</h1>
          <p className="font-sans text-foreground/60 text-lg md:text-xl max-w-xl tracking-wide leading-relaxed">
            Our specialists are available to consult on complex architectural requirements and bespoke lighting configurations.
          </p>
          <div className="w-16 h-[1px] bg-[#D9B780] mt-10"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-32">
          
          <form className="space-y-10">
            <div className="space-y-3 relative group">
              <label htmlFor="name" className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-foreground/50 transition-colors group-focus-within:text-[#D9B780]">Full Name</label>
              <input type="text" id="name" className="w-full bg-transparent border-b border-border/40 py-2 text-foreground focus:outline-none focus:border-[#D9B780] transition-colors placeholder:text-foreground/20 text-lg" placeholder="John Doe" />
            </div>
            <div className="space-y-3 relative group">
              <label htmlFor="email" className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-foreground/50 transition-colors group-focus-within:text-[#D9B780]">Email Address</label>
              <input type="email" id="email" className="w-full bg-transparent border-b border-border/40 py-2 text-foreground focus:outline-none focus:border-[#D9B780] transition-colors placeholder:text-foreground/20 text-lg" placeholder="john@example.com" />
            </div>
            <div className="space-y-3 relative group">
              <label htmlFor="company" className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-foreground/50 transition-colors group-focus-within:text-[#D9B780]">Company / Studio</label>
              <input type="text" id="company" className="w-full bg-transparent border-b border-border/40 py-2 text-foreground focus:outline-none focus:border-[#D9B780] transition-colors placeholder:text-foreground/20 text-lg" placeholder="Architecture Firm" />
            </div>
            <div className="space-y-3 relative group">
              <label htmlFor="message" className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-foreground/50 transition-colors group-focus-within:text-[#D9B780]">Message</label>
              <textarea id="message" rows={4} className="w-full bg-transparent border-b border-border/40 py-2 text-foreground focus:outline-none focus:border-[#D9B780] transition-colors resize-none placeholder:text-foreground/20 text-lg leading-relaxed" placeholder="Tell us about your project..."></textarea>
            </div>
            <button type="submit" className="bg-foreground text-background px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#D9B780] transition-colors duration-300 w-full md:w-auto shadow-sm">
              Submit Inquiry
            </button>
          </form>

          <div className="space-y-20 relative">
            <div className="hidden md:block absolute -left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-border/30 to-transparent"></div>
            <div>
              <h3 className="font-serif text-3xl mb-6 text-foreground tracking-wide italic text-[#D9B780]">Global Headquarters</h3>
              <p className="font-sans text-foreground/80 leading-loose text-lg tracking-wide">
                Pro-Luce Architecture<br />
                Via della Luce, 24<br />
                20121 Milano MI, Italy
              </p>
            </div>
            <div>
              <h3 className="font-serif text-3xl mb-6 text-foreground tracking-wide italic text-[#D9B780]">Direct Contact</h3>
              <p className="font-sans text-foreground/80 leading-loose text-lg tracking-wide flex flex-col gap-2">
                <a href="mailto:info@pro-luce.com" className="hover:text-[#D9B780] transition-colors inline-block w-fit group">
                  info@pro-luce.com
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-[#D9B780]"></span>
                </a>
                <a href="tel:+390212345678" className="hover:text-[#D9B780] transition-colors inline-block w-fit group">
                  +39 02 1234 5678
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-[#D9B780]"></span>
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
