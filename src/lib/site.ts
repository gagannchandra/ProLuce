export const siteConfig = {
  name: "Pro-Luce",
  tagline: "Architectural Lighting Systems",
  description:
    "Pro-Luce manufactures precision architectural lighting systems: trimless spotlights, linear profiles, 48V magnetic tracks, outdoor luminaires, and industrial highbays.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://proluce-lighting.com",
  catalogPdfUrl: "/pdf/Pro-Luce-Catalogue.pdf",
  ogImage: "/images/products/rona.png",
  links: {
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
  contact: {
    email: "specifications@pro-luce.com",
    phone: "+39 (0) 02 8934 2100",
    address: "Pro-Luce Architectural Lighting Design & Engineering Studio",
  },
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Catalogue",
    href: "/catalogue",
    children: [
      { label: "All Fixtures", href: "/catalogue" },
      { label: "Spot Lights", href: "/catalogue?category=Spot+Light" },
      { label: "Linear Profiles", href: "/catalogue?category=Linear+Light" },
      { label: "Track & Pendant", href: "/catalogue?category=Track+Light" },
      { label: "48V Magnetic Series", href: "/catalogue?category=Magnetic+Series" },
      { label: "Tube Magnetic (PTM)", href: "/catalogue?category=Tube+Magnetic" },
      { label: "Outdoor Luminaires", href: "/catalogue?category=Outdoor+Light" },
      { label: "Industrial Highbays", href: "/catalogue?category=Highbay+Light" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact / RFQ", href: "/contact" },
];

export const footerNav = {
  categories: [
    { label: "Spot Lights", href: "/catalogue?category=Spot+Light" },
    { label: "Linear Profiles", href: "/catalogue?category=Linear+Light" },
    { label: "Track Lights", href: "/catalogue?category=Track+Light" },
    { label: "48V Magnetic Series", href: "/catalogue?category=Magnetic+Series" },
    { label: "Tube Magnetic PTM", href: "/catalogue?category=Tube+Magnetic" },
    { label: "Outdoor & Landscape", href: "/catalogue?category=Outdoor+Light" },
    { label: "Industrial Highbays", href: "/catalogue?category=Highbay+Light" },
  ],
  engineering: [
    { label: "Master Catalogue (PDF)", href: "/pdf/Pro-Luce-Catalogue.pdf" },
    { label: "Specification Standards", href: "/about" },
    { label: "Request Architectural Quote", href: "/catalogue" },
    { label: "Project Consultations", href: "/contact" },
  ],
  company: [
    { label: "About Pro-Luce", href: "/about" },
    { label: "Engineering & Photometrics", href: "/about" },
    { label: "Contact Spec Team", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
};
