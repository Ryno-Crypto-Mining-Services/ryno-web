# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack web application for Ryno Crypto Services and TerraHash Stack bitcoin mining platform. Built with React 19, Express, tRPC, and MySQL.

## Development Commands

```bash
# Development server (tsx watch mode)
pnpm dev

# Type checking (no emit)
pnpm check

# Build for production (client + server)
pnpm build

# Run production build
pnpm start

# Format code with Prettier
pnpm format

# Run tests
pnpm test

# Database migrations
pnpm db:push
```

**Package Manager:** This project uses `pnpm` exclusively. Do not use `npm` or `yarn`.

## Architecture

### Full-Stack Structure

```
├── client/                 # React 19 frontend (Vite)
│   ├── src/
│   │   ├── components/    # React components (includes shadcn/ui)
│   │   ├── hooks/         # Custom hooks (useInView, useCountUp, useParallax, etc.)
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts (ThemeContext)
│   │   └── lib/           # Utilities and tRPC client setup
├── server/                # Express backend
│   ├── _core/            # Core server infrastructure
│   │   ├── index.ts      # Express server entry point
│   │   ├── trpc.ts       # tRPC setup with middleware
│   │   ├── context.ts    # tRPC context creation
│   │   ├── vite.ts       # Vite dev server integration
│   │   └── oauth.ts      # OAuth authentication flow
│   ├── routers/          # tRPC routers (email, etc.)
│   ├── lib/              # Server utilities
│   └── db.ts             # Drizzle ORM database client
├── drizzle/              # Database schema and migrations
│   └── schema.ts         # Drizzle table definitions
└── shared/               # Shared types and constants between client/server
```

### Client-Server Communication

**tRPC** provides end-to-end type safety between client and server:

- Server routers defined in `server/routers.ts` using `router()` and procedures
- Three procedure types: `publicProcedure`, `protectedProcedure`, `adminProcedure`
- Client setup in `client/src/lib/trpc.ts` with React Query integration
- Superjson transformer for Date/Map/Set serialization
- Automatic redirect to login on unauthorized errors (`UNAUTHED_ERR_MSG`)

**Adding a new API endpoint:**
1. Create router in `server/routers/` using `router()` and `publicProcedure/protectedProcedure`
2. Import and register in `server/routers.ts` under `appRouter`
3. Use in client with `trpc.{routerName}.{procedureName}.useQuery()` or `.useMutation()`

### Database Layer

**Drizzle ORM** with MySQL:

- Schema defined in `drizzle/schema.ts` using `mysqlTable()`
- Connection string from `DATABASE_URL` environment variable
- Migrations stored in `drizzle/` directory
- Database client exported from `server/db.ts`

**Existing tables:**
- `users` - Core user table with OAuth authentication
- `contactFormRateLimits` - Rate limiting for contact form submissions

### Routing

**Client-side:** Wouter library (lighter alternative to React Router)
- Routes defined in `client/src/App.tsx`
- Use `<Route path="..." component={...} />` for routing
- Use `useLocation()` and `useRoute()` hooks for programmatic navigation

**Server-side:**
- `/api/trpc/*` - tRPC API endpoints
- `/api/oauth/callback` - OAuth authentication callback
- Development: Vite dev server for client assets
- Production: Static files from `dist/public/`

### Authentication

OAuth-based authentication flow:
- OAuth routes registered in `server/_core/oauth.ts`
- Session cookies managed with `COOKIE_NAME` constant
- User stored in tRPC context (`ctx.user`)
- Protected procedures automatically enforce authentication
- Unauthorized errors trigger redirect to login page

### Path Aliases

TypeScript path aliases configured in `tsconfig.json` and `vite.config.ts`:

```typescript
import { Component } from "@/components/Component"     // client/src/
import { type } from "@shared/types"                   // shared/
import { asset } from "@assets/file"                   // attached_assets/
```

### Custom Animation Hooks

The project includes several custom React hooks for scroll-based animations:

- **`useInView`** - Intersection Observer wrapper to detect when elements enter viewport
- **`useCountUp`** - Animated number counter that triggers on scroll
- **`useParallax`** - Parallax scrolling effects
- **`useScrollAnimation`** - General-purpose scroll-triggered animations

These hooks are used extensively in the homepage statistics and platform sections.

## Email Integration

Contact form emails sent via **Mailgun API**:

- Router: `server/routers/email.ts`
- Sends two emails: admin notification + user confirmation
- Rate limiting: 3 submissions per hour per IP (tracked in database)
- Environment variables required: `MAILGUN_API_KEY`, `MAILGUN_SENDER_EMAIL`, `MAILGUN_RECEIVER_EMAIL`

## Design System

**Theme:** Dark mode only (controlled by `ThemeProvider` with `defaultTheme="dark"`)

**Primary Colors:**
- Teal: `#32B8C6` (primary actions, accents)
- Orange: `#E68161` (secondary accents)
- Charcoal: `#1F2121` (background), `#262828` (surface)

**Typography:**
- Configured in `client/src/index.css` with custom CSS variables
- shadcn/ui components styled with Tailwind CSS 4

## Environment Variables

Required environment variables (see `.env.example`):

- `DATABASE_URL` - MySQL connection string
- `MAILGUN_API_KEY` - Mailgun API key for email sending
- `MAILGUN_SENDER_EMAIL` - Sender email address
- `MAILGUN_RECEIVER_EMAIL` - Admin recipient email
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - "development" or "production"

## Build Process

**Development:**
- Server: `tsx watch server/_core/index.ts` (hot reload)
- Client: Vite dev server integrated into Express (HMR)

**Production:**
- Client: Vite builds to `dist/public/`
- Server: esbuild bundles to `dist/index.js` (ESM format)
- Single Node.js process serves both static files and API

## Testing

**Vitest** configured for unit tests:
- Config: `vitest.config.ts`
- Run with `pnpm test`
- Test files: `**/*.test.ts`

## Key Architectural Patterns

1. **Type Safety:** Full type safety from database → server → client via Drizzle + tRPC
2. **Monorepo Structure:** Client, server, and shared types in single repository
3. **Authentication Middleware:** tRPC middleware enforces auth on protected procedures
4. **Rate Limiting:** Database-backed rate limiting for public endpoints
5. **Error Handling:** Centralized error handling with TRPCError and error codes
6. **Scroll Animations:** Custom hooks provide reusable animation primitives with IntersectionObserver

## Manus Runtime

This project uses `vite-plugin-manus-runtime` for enhanced development experience. The Vite dev server is configured to allow specific Manus Computer domains in `vite.config.ts`.
