export interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  href: string;
  date: string;
  category: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    title:
      "BYD Tech Tour Iloilo: A Weekend of Test Drives, Smart Tech, and Exclusive Deals.",
    excerpt:
      "The BYD Tech Tour made its stop at SM City Iloilo last August 15 to 17, transforming the Event Center into a showcase of smart design, advanced tech, and some of the most talked-about vehicles in the BYD lineup.",
    image: "/images/byd-sm-iloilo.webp",
    href: "#",
    date: "Aug 2025",
    category: "Technology",
  },
  {
    title: "Living Electric in the City",
    excerpt:
      "From daily commutes to weekend getaways—see how EV ownership fits effortlessly into modern life.",
    image: "/images/byd-dolphin.webp",
    href: "#",
    date: "Mar 2025",
    category: "Lifestyle",
  },
  {
    title: "Seagull: Compact, Capable, Connected",
    excerpt:
      "A refined driving experience wrapped in a compact footprint and intelligent features.",
    image: "/images/byd-seagull.webp",
    href: "#",
    date: "Feb 2025",
    category: "Models",
  },
];

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return BLOG_POSTS;
}

export async function getLatestBlogPosts(limit: number): Promise<BlogPost[]> {
  if (!Number.isFinite(limit) || limit <= 0) return [];
  return BLOG_POSTS.slice(0, limit);
}
