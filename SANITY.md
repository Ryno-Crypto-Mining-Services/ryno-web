# Sanity CMS Integration

This project uses [Sanity.io](https://www.sanity.io) as a headless CMS for blog content management.

## Project Details

- **Project ID**: `mo8rs3o1`
- **Dataset**: `production`
- **Organization**: [Sanity Dashboard](https://www.sanity.io/organizations/orFfhsVr9/project/mo8rs3o1)

## Architecture

### Frontend (React)
- **Location**: `client/src/lib/sanity.ts`
- **Client**: `@sanity/client` for API queries
- **Image URLs**: `@sanity/image-url` for optimized images
- **Content Rendering**: Custom `PortableText` component for rich text

### Studio (CMS)
- **Location**: `studio/`
- **Schemas**: `studio/schemas/` (post, author, category, blockContent)
- **Config**: `studio/sanity.config.ts`

## Content Types

### Blog Post (`post`)
- Title, slug, excerpt, body (Portable Text)
- Author (reference), category (reference)
- Main image, tags, published date
- Featured flag

### Author (`author`)
- Name, slug, bio, image
- LinkedIn URL, Twitter handle

### Category (`category`)
- Title, slug, description

## Environment Variables

Required environment variables (already configured):

```bash
# Server-side (private)
SANITY_PROJECT_ID=mo8rs3o1
SANITY_DATASET=production
SANITY_API_TOKEN=<your-token>

# Client-side (public)
VITE_SANITY_PROJECT_ID=mo8rs3o1
VITE_SANITY_DATASET=production
```

## Running Sanity Studio Locally

### 1. Install Dependencies
```bash
cd studio
pnpm install
```

### 2. Start Studio
```bash
pnpm sanity dev
```

The Studio will be available at **http://localhost:3333**

### 3. Login
On first run, you'll be prompted to authenticate with Sanity. Use the same account you used to create the project.

## Deploying Sanity Studio

To host the Studio at a public URL:

```bash
cd studio
pnpm sanity deploy
```

When prompted for hostname, enter: `ryno-crypto-blog`

Your Studio will be available at: **https://ryno-crypto-blog.sanity.studio**

## Managing Content

### Creating a New Blog Post

1. Open Sanity Studio (locally or deployed)
2. Click "Blog Post" in the sidebar
3. Click "Create new document"
4. Fill in:
   - Title (auto-generates slug)
   - Author (select Elvis Nuno)
   - Category
   - Excerpt (max 200 characters)
   - Body content (rich text editor)
   - Main image (upload)
   - Tags (optional)
   - Published date
   - Featured checkbox
5. Click "Publish"

### Editing Existing Posts

1. Open Sanity Studio
2. Click "Blog Post" in the sidebar
3. Select the post to edit
4. Make changes
5. Click "Publish" to save

### Unpublishing Posts

Posts are always visible in the frontend once created. To hide a post, you would need to delete it or add a "draft" status field to the schema.

## Frontend Integration

### Fetching All Posts

```typescript
import { client, POSTS_QUERY } from '@/lib/sanity'

const posts = await client.fetch(POSTS_QUERY)
```

### Fetching Single Post

```typescript
import { client, POST_BY_SLUG_QUERY } from '@/lib/sanity'

const post = await client.fetch(POST_BY_SLUG_QUERY, { slug: 'post-slug' })
```

### Rendering Images

```typescript
import { urlFor } from '@/lib/sanity'

<img src={urlFor(post.mainImage).width(800).url()} alt={post.title} />
```

### Rendering Content

```typescript
import { PortableText } from '@/components/PortableText'

<PortableText value={post.body} />
```

## Migration

Initial blog posts were migrated using `studio/migrate-posts.mjs`. This script:

1. Created author (Elvis Nuno)
2. Created 4 categories
3. Created 6 blog posts with full content
4. Converted markdown to Portable Text blocks

**Migration Status**: ✅ Complete (6 posts, 1 author, 4 categories)

## Useful Sanity CLI Commands

```bash
# Start Studio locally
pnpm sanity dev

# Deploy Studio
pnpm sanity deploy

# Run GROQ queries
pnpm sanity exec <script.js>

# Check dataset
pnpm sanity dataset list

# Export dataset
pnpm sanity dataset export production backup.tar.gz

# Import dataset
pnpm sanity dataset import backup.tar.gz production
```

## Vision Tool (Query Playground)

Access the Vision tool to test GROQ queries:
https://www.sanity.io/manage/personal/project/mo8rs3o1/api/vision

Example queries:

```groq
// All posts
*[_type == "post"] | order(publishedAt desc)

// Featured posts
*[_type == "post" && featured == true]

// Posts by category
*[_type == "post" && category->slug.current == "technology"]

// Single post with author and category
*[_type == "post" && slug.current == "introducing-terrahash-stack"][0] {
  ...,
  author->,
  category->
}
```

## Troubleshooting

### Studio won't start
- Ensure dependencies are installed: `pnpm install`
- Check Node.js version: `node -v` (should be 18+)
- Clear cache: `rm -rf node_modules .sanity && pnpm install`

### Content not showing in frontend
- Check environment variables are set correctly
- Verify API token has read permissions
- Check browser console for errors
- Test query in Vision tool first

### Images not loading
- Ensure `mainImage` field is populated in Sanity
- Check image URL format: `urlFor(image).url()`
- Verify CORS settings in Sanity project settings

## Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Portable Text](https://www.sanity.io/docs/presenting-block-text)
- [Image URLs](https://www.sanity.io/docs/image-url)
