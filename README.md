# Web App Template (Static Frontend)

Pure React + Tailwind template with shadcn/ui baked in. **Use this README as the checklist for shipping static experiences.**

> **Note:** This template includes a minimal `shared/` and `server/` directory with placeholder types to support imported templates. These are just compatibility placeholders - web-static remains a true static-only template without API functionality.

---

## 🤖 AI Development Guide

### Stack Overview
- Client-only routing powered by React + Wouter.
- Design tokens are provided through `client/src/index.css` and `tailwind.config.ts`—keep them intact.

### Component Patterns

```tsx
// Compose pages from shadcn/ui primitives
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="rounded-3xl bg-white p-10 shadow-xl">
      <h1 className="text-4xl font-bold text-slate-900">Launch Quickly</h1>
      <Button size="lg" className="mt-6">Get Started</Button>
    </section>
  );
}
```

### File Structure

```
client/
  public/         ← Static assets copied verbatim to '/'
  src/
    pages/        ← Page-level components
    components/   ← Reusable UI & shadcn/ui
    contexts/     ← React contexts
    hooks/        ← Custom React hooks
    lib/          ← Utility helpers
    App.tsx       ← Routes & top-level layout
    main.tsx      ← React entry point
    index.css     ← global style
server/         ← Placeholder for imported template compatibility
shared/         ← Placeholder for imported template compatibility
  const.ts      ← Shared constants
```

Assets placed under `client/public` are served with aggressive caching, so add a content hash to filenames (for example, `logo.3fa9b2e4.svg`) whenever you replace a file and update its references to avoid stale assets.

Files in `client/public` are available at the root of your site—reference them with absolute paths (`/logo.3fa9b2e4.svg`, `/robots.txt`, etc.) from HTML templates, JSX, or meta tags.

---

## 🎯 Development Workflow

1. **Compose pages** in `client/src/pages/`. Keep sections modular so they can be reused across routes.
2. **Share primitives** via `client/src/components/`—extend shadcn/ui when needed instead of duplicating markup.
3. **Keep styling consistent** by relying on existing Tailwind tokens (spacing, colors, typography).
4. **Fetch external data** with `useEffect` if the site needs dynamic content from public APIs.

---

## 🧱 Tailwind Safeguards

- Preserve the `@layer base` block in `client/src/index.css`; removing it breaks utilities like `border-border`.
- Do not strip values from `theme.extend` in `tailwind.config.ts`—they power the design tokens used in the UI kit.
- Stick to utility classes for responsiveness (mobile-first by default).
## ✅ Launch Checklist
- [ ] UI layout and navigation structure correct, all image src valid.
- [ ] Success + error paths verified in the browser

---

## 🎨 Frontend Best Practices (shadcn-first)

- Prefer shadcn/ui components for interactions to keep a modern, consistent look; import from `@/components/ui/*` (e.g., `button`, `card`, `dialog`).
- Compose Tailwind utilities with component variants for layout and states; avoid excessive custom CSS. Use built-in `variant`, `size`, etc. where available.
- Preserve design tokens: keep the `@layer base` rules in `client/src/index.css`. Utilities like `border-border` and `font-sans` depend on them.
- Consistent design language: use spacing, radius, shadows, and typography via tokens. Extract shared UI into `components/` for reuse instead of copy‑paste.
- Accessibility and responsiveness: keep visible focus rings and ensure keyboard reachability; design mobile‑first with thoughtful breakpoints.
- Theming: Choose dark/light theme to start with for ThemeProvider according to your design style (dark or light bg), then manage colors pallette with CSS variables in `client/src/index.css` instead of hard‑coding to keep global consistency;
- Micro‑interactions and empty states: add motion, empty states, and icons tastefully to improve quality without distracting from content.
- Navigation: Design clear and intuitive navigation structure appropriate for the app type (e.g., top/side nav for multi-page apps, breadcrumbs or contextual navigation for SPAs)'. When building dashboard-like experience, use sidebar-nav to keep all page entry easy to access.

**React component rules:**
- Never call setState/navigation in render phase → wrap in `useEffect`

---

## Common Pitfalls

### Infinite loading loops from unstable references
**Anti-pattern:** Creating new objects/arrays in render that are used as query inputs
```tsx
// ❌ Bad: New Date() creates new reference every render → infinite queries
const { data } = trpc.items.getByDate.useQuery({
  date: new Date(), // ← New object every render!
});

// ❌ Bad: Array/object literals in query input
const { data } = trpc.items.getByIds.useQuery({
  ids: [1, 2, 3], // ← New array reference every render!
});
```

**Correct approach:** Stabilize references with useState/useMemo
```tsx
// ✅ Good: Initialize once with useState
const [date] = useState(() => new Date());
const { data } = trpc.items.getByDate.useQuery({ date });

// ✅ Good: Memoize complex inputs
const ids = useMemo(() => [1, 2, 3], []);
const { data } = trpc.items.getByIds.useQuery({ ids });
```

**Why this happens:** TRPC queries trigger when input references change. Objects/arrays created in render have new references each time, causing infinite re-fetches.

### Navigation dead-ends in subpages
**Problem:** Creating nested routes without escape routes—no header nav, no sidebar, no back button.

**Solution:** Choose navigation based on app structure:
```tsx
// For dashboard/multi-section apps: Use persistent sidebar (from shadcn/ui)
import { SidebarProvider, Sidebar, SidebarContent, SidebarInset } from "@/components/ui/sidebar";

<SidebarProvider>
  <Sidebar>
    <SidebarContent>
      {/* Navigation menu items - always visible */}
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    {children}  {/* Page content */}
  </SidebarInset>
</SidebarProvider>

// For linear flows (detail pages, wizards): Use back button
import { useRouter } from "wouter";

const router = useRouter();
<div>
  <Button variant="ghost" onClick={() => router.back()}>
    ← Back
  </Button>
  <ItemDetailPage />
</div>
```

### Dark mode styling without theme configuration
**Problem:** Using dark foreground colors without setting the theme, making text invisible on default light backgrounds.

**Solution:** Set `defaultTheme="dark"` in App.tsx, then update CSS variables in `index.css`:
```tsx
// App.tsx: Set the default theme first
<ThemeProvider defaultTheme="dark">  {/* Applies .dark class to root */}
  <div className="text-foreground bg-background">
    Content  {/* Now uses dark theme CSS variables */}
  </div>
</ThemeProvider>
```

```css
/* index.css: Adjust color palette for dark theme */
.dark {
  --background: oklch(0.145 0 0);  /* Dark background */
  --foreground: oklch(0.985 0 0);  /* Light text */
  /* ... other variables ... */
}
```

---

## Core File References

`client/src/App.tsx`
```tsx
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;


```

`client/src/pages/Home.tsx`
```tsx
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import TrustedBrands from '@/components/TrustedBrands';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ScrollToAnchor from '@/components/ScrollToAnchor';

export default function Home() {
  return (
    <>
      <ScrollToAnchor />
      <div className="min-h-screen bg-gray-900 text-white">
        <Navigation />
        <main>
          <Hero />
          <TrustedBrands />
          <Features />
          <HowItWorks />
          <Testimonials />
          <Pricing />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}


```

`client/src/main.tsx`
```tsx
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

```

`client/src/index.css`
```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --animate-rainbow: rainbow var(--speed, 2s) infinite linear;
  --color-color-5: var(--color-5);
  --color-color-4: var(--color-4);
  --color-color-3: var(--color-3);
  --color-color-2: var(--color-2);
  --color-color-1: var(--color-1);
  @keyframes rainbow {
  0% {
    background-position: 0%;
    }
  100% {
    background-position: 200%;
    }
  }
  @keyframes marquee {
    0% {
      transform: translateY(0%);
    }
    100% {
      transform: translateY(-100%);
    }
  }
  --animate-marquee: marquee var(--duration) infinite linear;
  --animate-marquee-vertical: marquee-vertical var(--duration) linear infinite;
  @keyframes marquee {
  from {
    transform: translateX(0);}
  to {
    transform: translateX(calc(-100% - var(--gap)));}}
  @keyframes marquee-vertical {
  from {
    transform: translateY(0);}
  to {
    transform: translateY(calc(-100% - var(--gap)));}}}

:root {
  --radius: 0.625rem;
  /* Light mode is not used in the CRM dashboard, but keeping it for completeness */
  --background: #FFFFFF;
  --foreground: #121212;
  --card: #FFFFFF;
  --card-foreground: #121212;
  --popover: #FFFFFF;
  --popover-foreground: #121212;
  --primary: #7C5DFA;
  --primary-foreground: #FFFFFF;
  --secondary: #F9F9F9;
  --secondary-foreground: #121212;
  --muted: #F9F9F9;
  --muted-foreground: #6E6E6E;
  --accent: #FF8A65;
  --accent-foreground: #FFFFFF;
  --destructive: #FF5252;
  --border: #E0E0E0;
  --input: #E0E0E0;
  --ring: #7C5DFA;
  --chart-1: #7C5DFA;
  --chart-2: #FF8A65;
  --chart-3: #4CAF50;
  --chart-4: #FF9800;
  --chart-5: #FF5252;
  --sidebar: #FFFFFF;
  --sidebar-foreground: #121212;
  --sidebar-primary: #7C5DFA;
  --sidebar-primary-foreground: #FFFFFF;
  --sidebar-accent: #F9F9F9;
  --sidebar-accent-foreground: #121212;
  --sidebar-border: #E0E0E0;
  --sidebar-ring: #7C5DFA;
  --color-1: oklch(66.2% 0.225 25.9);
  --color-2: oklch(60.4% 0.26 302);
  --color-3: oklch(69.6% 0.165 251);
  --color-4: oklch(80.2% 0.134 225);
  --color-5: oklch(90.7% 0.231 133);
  
  /* Custom variables for commonly used colors */
  --primary-color: #7C5DFA;
  --primary-hover: #6B46C1;
  --accent-color: #FF8A65;
  --bg-dark: #121212;
  --bg-dark-alt: #1A1A1A;
  --bg-card: #1E1E1E;
  --bg-muted: #2A2A2A;
  --bg-gray-900: #111827;
  --bg-gray-800: #1F2937;
  --bg-gray-700: #374151;
  --text-primary: #FFFFFF;
  --text-secondary: #A0A0A0;
  --text-muted: #6E6E6E;
  --text-gray-300: #D1D5DB;
  --text-orange: #FED7AA;
  --border-light: rgba(255, 255, 255, 0.1);
  --border-primary: rgba(124, 93, 250, 0.3);
  --border-gray-800: #1F2937;
  --border-gray-700: #374151;
}

.dark {
  --background: #121212;
  --foreground: #FFFFFF;
  --card: #1E1E1E;
  --card-foreground: #FFFFFF;
  --popover: #1E1E1E;
  --popover-foreground: #FFFFFF;
  --primary: #7C5DFA;
  --primary-foreground: #FFFFFF;
  --secondary: #2A2A2A;
  --secondary-foreground: #FFFFFF;
  --muted: #2A2A2A;
  --muted-foreground: #A0A0A0;
  --accent: #FF8A65;
  --accent-foreground: #FFFFFF;
  --destructive: #FF5252;
  --border: rgba(255, 255, 255, 0.1);
  --input: rgba(255, 255, 255, 0.15);
  --ring: #7C5DFA;
  --chart-1: #7C5DFA;
  --chart-2: #FF8A65;
  --chart-3: #4CAF50;
  --chart-4: #FF9800;
  --chart-5: #FF5252;
  --sidebar: #1E1E1E;
  --sidebar-foreground: #FFFFFF;
  --sidebar-primary: #7C5DFA;
  --sidebar-primary-foreground: #FFFFFF;
  --sidebar-accent: #2A2A2A;
  --sidebar-accent-foreground: #FFFFFF;
  --sidebar-border: rgba(255, 255, 255, 0.1);
  --sidebar-ring: #7C5DFA;
  --color-1: oklch(66.2% 0.225 25.9);
  --color-2: oklch(60.4% 0.26 302);
  --color-3: oklch(69.6% 0.165 251);
  --color-4: oklch(80.2% 0.134 225);
  --color-5: oklch(90.7% 0.231 133);
  
  /* Dark mode overrides for custom variables */
  --primary-color: #7C5DFA;
  --primary-hover: #6B46C1;
  --accent-color: #FF8A65;
  --bg-dark: #121212;
  --bg-dark-alt: #1A1A1A;
  --bg-card: #1E1E1E;
  --bg-muted: #2A2A2A;
  --bg-gray-900: #111827;
  --bg-gray-800: #1F2937;
  --bg-gray-700: #374151;
  --text-primary: #FFFFFF;
  --text-secondary: #A0A0A0;
  --text-muted: #6E6E6E;
  --text-gray-300: #D1D5DB;
  --text-orange: #FED7AA;
  --border-light: rgba(255, 255, 255, 0.1);
  --border-primary: rgba(124, 93, 250, 0.3);
  --border-gray-800: #1F2937;
  --border-gray-700: #374151;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}


```

