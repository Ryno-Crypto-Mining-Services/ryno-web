import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { sanityClient, POSTS_QUERY, POST_BY_SLUG_QUERY } from "../lib/sanity";
import type { SanityPost } from "../../shared/types";

export const blogRouter = router({
  // Get all blog posts
  getAllPosts: publicProcedure.query(async () => {
    try {
      const posts = await sanityClient.fetch<SanityPost[]>(POSTS_QUERY);
      return posts;
    } catch (error) {
      console.error('Error fetching posts from Sanity:', error);
      throw new Error('Failed to fetch blog posts');
    }
  }),

  // Get a single blog post by slug
  getPostBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      try {
        const post = await sanityClient.fetch<SanityPost>(
          POST_BY_SLUG_QUERY,
          { slug: input.slug }
        );
        return post;
      } catch (error) {
        console.error('Error fetching post from Sanity:', error);
        throw new Error('Failed to fetch blog post');
      }
    }),
});
