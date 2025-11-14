/**
 * Unified type exports
 * Import shared types from this single entry point.
 */

export type * from "../drizzle/schema";
export * from "./_core/errors";

// Sanity CMS type definitions
export interface SanityImageSource {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

export interface SanityPost {
  _id: string;
  _createdAt: string;
  title: string;
  slug: string;
  author: {
    name: string;
    slug: string;
    image?: SanityImageSource;
    linkedin?: string;
  };
  mainImage?: SanityImageSource;
  category: {
    title: string;
    slug: string;
  };
  tags?: string[];
  publishedAt: string;
  excerpt: string;
  body: any[]; // Portable Text blocks
  featured?: boolean;
}
