// src/types/project.ts
export interface Project {
  id: string;                    // URL-safe slug, e.g. "where-is-araroi"
  title: string;
  description: string;           // Short — used on listing card
  role: string;                  // e.g. "Game Designer, Developer"
  year: number;
  tags: string[];                // Used for filtering — exact string match
  thumbnail: string;             // Path relative to /public, e.g. "/images/projects/araroi-thumb.jpg"
  images: string[];              // Gallery images — same path convention
  overview: string;              // Long-form markdown string
  technologies: string[];        // Displayed as tech tags on detail page
  links: {
    github?: string;
    demo?: string;
    external?: string;
  };
  featured: boolean;             // Reserved for future homepage highlight — not used at launch
}
