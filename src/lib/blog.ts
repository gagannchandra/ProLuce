export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "simplify-your-life-with-simple-products",
    title: "The Art of Dark-Light: Glare Suppression in Cultural & Museum Spaces",
    excerpt:
      "How micro-faceted TIR optics and deep dark-light cutoff angles eliminate visual fatigue (UGR < 12) while celebrating architectural material.",
    date: "2025-04-12",
    category: "Optical Engineering",
    image: "/images/blog/simplify-your-life.webp",
    content: [
      "In world-class museums, galleries, and high-end hospitality venues, the most successful lighting is invisible. The luminaire itself recedes into the ceiling plane, allowing the eye to engage solely with the texture of concrete, the grain of timber, or the brushstroke on canvas.",
      "Traditional downlights often disperse high-angle stray light, creating glare zones that cause ocular fatigue. By engineering precision deep-recessed baffles with a 45° physical cutoff angle and micro-faceted total internal reflection (TIR) lenses, Pro-Luce achieves certified Unified Glare Ratings below 12 (UGR < 12).",
      "Optical purity also demands uncompromising spectral fidelity. Every LED die in our architectural spot series is selected within a 2-step MacAdam ellipse (SDCM ≤ 2) with a Color Rendering Index of Ra ≥ 98 and saturated red rendering R9 > 94.",
      "When light is controlled with millimetric precision, space feels calmer, textures appear richer, and architecture takes center stage.",
    ],
  },
  {
    slug: "the-next-generation-of-design",
    title: "48V Low-Voltage Magnetic Tracks: Dynamic Modularity for Modern Interiors",
    excerpt:
      "Exploring the shift toward tool-free, field-reconfigurable magnetic luminaire systems in luxury retail and evolving commercial workspaces.",
    date: "2025-04-12",
    category: "Systems Architecture",
    image: "/images/blog/next-generation-design.webp",
    content: [
      "Static ceiling grids no longer suffice for dynamic commercial and hospitality environments that reconfigure quarterly. The modern architectural brief demands lighting infrastructure that evolves alongside the floorplan.",
      "Pro-Luce's 48V Magnetic Series addresses this with ultra-slim recessed and surface-mounted aluminum extrusion tracks. High-permeability neodymium magnets paired with secure mechanical dual-latches allow specifiers to snap spotlight projectors, linear diffusers, and suspended globes into place without tools or electrical shutdown.",
      "Integrated with DALI-2 DT8 broadcast and Casambi Bluetooth mesh drivers, each individual magnetic module can be addressed, grouped, and dimmed independently down to 0.1% without perceptible pulse-width modulation (PWM) flicker.",
      "The result is a unified architectural ceiling canvas that accommodates exhibition rotations, retail merchandising shifts, and circadian wellness routines effortlessly.",
    ],
  },
  {
    slug: "the-future-is-in-your-hands",
    title: "Continuous Linear Geometries: Zero-Tolerance Extrusions in Architectural Space",
    excerpt:
      "Technical strategies for achieving uninterrupted 50-meter continuous illuminated profiles with zero joint shadows or thermal bowing.",
    date: "2025-04-12",
    category: "Precision Fabrication",
    image: "/images/blog/future-in-your-hands.webp",
    content: [
      "Continuous linear profiles are fundamental to modern architectural expression, guiding circulation corridors, defining atrium perimeters, and accentuating spatial datum lines.",
      "However, executing flawless long-run extrusions presents severe thermal and optical challenges. Standard aluminum profiles expand and contract with ambient temperature swings, causing micro-gaps and visible joint shadows.",
      "Pro-Luce addresses this through CNC-machined 6063-T5 aluminum extrusions with overlapping internal light-bridge reflectors and continuous rollable opal diffusers up to 50 meters. This ensures a 100% homogenous beam profile from end to end with zero seam discoloration.",
      "Combined with precision 90° planar and vertical return miters, architects can sculpt pure continuous light that transitions seamlessly across ceiling planes and downward along vertical wall reveals.",
    ],
  },
];

export function getAllPosts() {
  return blogPosts;
}

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
