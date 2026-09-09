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
    title: "Simplify Your Life with Simple Products",
    excerpt:
      "Why a handful of well-made, honest lighting pieces will always outlast a room full of trend-driven clutter.",
    date: "2025-04-12",
    category: "Simple Living",
    image: "/images/blog/simplify-your-life.webp",
    content: [
      "Good lighting rarely asks for attention. It sits quietly in the corner of a room, does its job well, and disappears into the background of daily life — which is exactly why it's so easy to overlook when we're furnishing a home.",
      "The temptation is to buy in bulk: a cheap lamp for every surface, picked up on a whim, replaced within a year. A simpler approach is to choose fewer pieces, but choose them properly — a task lamp that survives being knocked off a desk, a pendant with a shade that won't yellow in the sun.",
      "Start with the rooms you spend the most time in. A single well-placed floor lamp can do more for a living room than three mismatched ceiling fixtures. Layer light at different heights — overhead, eye level, and low — rather than relying on one bright source.",
      "Simplicity isn't about owning less for its own sake. It's about making sure everything you do own is doing real work.",
    ],
  },
  {
    slug: "the-next-generation-of-design",
    title: "The Next Generation of Design",
    excerpt:
      "Smart fixtures, modular systems, and materials built to be repaired rather than replaced — where lighting design is heading next.",
    date: "2025-04-12",
    category: "Design",
    image: "/images/blog/next-generation-design.webp",
    content: [
      "For most of the last century, a light fixture was a fixed decision: pick a shape, a finish, a bulb type, and live with it for a decade. That's changing quickly. Tunable, app-controlled bulbs mean the same fixture can shift from a cool, bright work light in the morning to a warm, dim glow in the evening.",
      "Modularity is following the same path. Track and rail systems that once felt strictly commercial are showing up in homes, letting a single ceiling run be reconfigured as furniture moves — no electrician required for every change.",
      "There's also a quieter shift toward repairability. Shades that can be swapped independently of the frame, standard-fit hardware instead of proprietary parts, and finishes designed to age well rather than needing constant replacement.",
      "The best new lighting design doesn't necessarily look different — it just gives you more control over how a room feels, without asking you to start over every time your needs change.",
    ],
  },
  {
    slug: "the-future-is-in-your-hands",
    title: "The Future Is In Your Hands",
    excerpt:
      "Small, considered choices — one fixture at a time — add up to a home that actually reflects how you live.",
    date: "2025-04-12",
    category: "Interiors",
    image: "/images/blog/future-in-your-hands.webp",
    content: [
      "It's easy to feel like a finished, coherent home happens all at once, arriving fully formed from a single big renovation. In practice, most of the rooms we love were built slowly, one considered decision at a time.",
      "Lighting is one of the easiest places to make that kind of incremental progress. Swapping a single overhead fixture, adding a warm reading lamp, or replacing a harsh bulb with a dimmable one costs very little but changes how a room feels immediately.",
      "Pay attention to how you actually use a space before buying anything. A home office needs different light at 9am than at 9pm. A kitchen island used for both cooking and homework needs brightness that a single pendant often can't provide alone.",
      "The future of your home isn't a single purchase away — it's built from the small, deliberate choices you make one fixture at a time.",
    ],
  },
];

export function getAllPosts() {
  return blogPosts;
}

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
