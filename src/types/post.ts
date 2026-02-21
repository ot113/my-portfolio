// src/types/post.ts
export interface PostMeta {
    slug: string;                  // Filename without .mdx extension
    title: string;
    date: string;                  // ISO 8601, e.g. "2024-12-15"
    excerpt: string;               // Short — used on listing card
    thumbnail: string;             // Path relative to /public
    readingTime: number;           // Minutes — calculated at build time
    published: boolean;            // false = draft, excluded from listing
}
