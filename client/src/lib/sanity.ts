import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'mo8rs3o1',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // Enable CDN for faster reads
  apiVersion: '2024-01-01',
})

// Helper for generating image URLs
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Type definitions for Sanity data
export interface SanityPost {
  _id: string
  _createdAt: string
  title: string
  slug: {current: string}
  author: {
    name: string
    slug: {current: string}
    image?: SanityImageSource
    linkedin?: string
  }
  mainImage?: SanityImageSource
  category: {
    title: string
    slug: {current: string}
  }
  tags?: string[]
  publishedAt: string
  excerpt: string
  body: any[] // Portable Text blocks
  featured?: boolean
}

// GROQ queries
export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  _createdAt,
  title,
  "slug": slug.current,
  author->{name, "slug": slug.current, image, linkedin},
  mainImage,
  category->{title, "slug": slug.current},
  tags,
  publishedAt,
  excerpt,
  body,
  featured
}`

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  _createdAt,
  title,
  "slug": slug.current,
  author->{name, "slug": slug.current, image, linkedin},
  mainImage,
  category->{title, "slug": slug.current},
  tags,
  publishedAt,
  excerpt,
  body,
  featured
}`

export const FEATURED_POSTS_QUERY = `*[_type == "post" && featured == true] | order(publishedAt desc) {
  _id,
  _createdAt,
  title,
  "slug": slug.current,
  author->{name, "slug": slug.current, image, linkedin},
  mainImage,
  category->{title, "slug": slug.current},
  tags,
  publishedAt,
  excerpt,
  body,
  featured
}`

export const POSTS_BY_CATEGORY_QUERY = `*[_type == "post" && category->slug.current == $category] | order(publishedAt desc) {
  _id,
  _createdAt,
  title,
  "slug": slug.current,
  author->{name, "slug": slug.current, image, linkedin},
  mainImage,
  category->{title, "slug": slug.current},
  tags,
  publishedAt,
  excerpt,
  body,
  featured
}`
