import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Pro-Luce Lighting | Exceptional Architectural Lighting",
  description: "Designed to illuminate exceptional spaces. The Pro-Luce 2026 Lighting Collection brings world-class architectural, commercial, hospitality, and residential lighting to your projects.",
  openGraph: {
    title: "Pro-Luce Lighting | Collection 2026",
    description: "Designed to illuminate exceptional spaces. Premium architectural lighting.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pro-Luce Lighting",
    description: "Designed to illuminate exceptional spaces.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body
        className={`${inter.variable} ${playfair.variable} bg-background text-foreground min-h-screen flex flex-col font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <Header />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
