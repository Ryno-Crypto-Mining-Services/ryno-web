import {createClient} from '@sanity/client'

// Server-side Sanity client (no CSP restrictions)
export const sanityClient = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'mo8rs3o1',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Optional: for authenticated requests
})

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
