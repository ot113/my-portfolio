// src/types/project.ts
export interface Project {
  id: string;                    // URL-safe slug, e.g. "where-is-araroi"
  title: string;
  description: string;           // Short — used on listing card
  role: string;                  // e.g. "Game Designer, Developer"
  year: number;
  tags: string[];                // Freeform tags, shown as technology chips
  category: "Games" | "Docs" | "Tools"; // Work page filter group
  type: string;                  // Genre descriptor for meta row, e.g. "Horror / PC"
  platform: string;              // e.g. "PC", "Mobile"
  thumbnail: string;             // Path relative to /public, e.g. "/images/projects/araroi-thumb.jpg"
  images: string[];              // Gallery images — same path convention
  video?: string;                // Optional muted hover-preview clip, path relative to /public
  overview: string;              // Long-form markdown string
  technologies: string[];        // Displayed as tech tags on detail page
  links: {
    github?: string;
    demo?: string;
    external?: string;
  };
  featured: boolean;             // Drives the homepage hero highlight
}
