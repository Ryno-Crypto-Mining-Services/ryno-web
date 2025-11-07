# Ryno Crypto Services & TerraHash Stack Website

Modern, professional marketing website for Ryno Crypto Services, LLC and the TerraHash Stack platform - a next-generation bitcoin mining infrastructure combining open-source hardware with proprietary AI optimization.

## 🚀 Features

- **Modern Dark Theme Design** - Eye-catching dark mode with vibrant teal (#32B8C6) and orange (#E68161) accents
- **Animated Statistics** - Count-up animations triggered on scroll for key performance metrics
- **Responsive Navigation** - Fixed header with mobile menu and smooth scrolling
- **Interactive Technology Section** - Tabbed interface showcasing Hardware, Software, and Network modules
- **Professional Branding** - Official Ryno and TerraHash logos with transparent backgrounds
- **Performance Optimized** - Built with React 19, Vite, and Tailwind CSS 4

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Routing**: Wouter
- **Icons**: Lucide React
- **Language**: TypeScript

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ryno-terrahash-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

   The site will be available at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   # or
   pnpm build
   ```

   Built files will be in the `client/dist` directory.

## 📁 Project Structure

```
ryno-terrahash-website/
├── client/
│   ├── public/              # Static assets (logos, images)
│   │   ├── ryno-logo-transparent.png
│   │   └── terrahash-logo-transparent.png
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── ui/         # shadcn/ui components
│   │   │   ├── Navigation.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Platform.tsx
│   │   │   ├── Technology.tsx
│   │   │   └── LogoShowcase.tsx
│   │   ├── hooks/          # Custom React hooks
│   │   │   ├── useInView.ts      # Intersection observer
│   │   │   └── useCountUp.ts     # Count-up animation
│   │   ├── pages/          # Page components
│   │   │   ├── Home.tsx
│   │   │   └── NotFound.tsx
│   │   ├── contexts/       # React contexts (theme, etc.)
│   │   ├── lib/            # Utility functions
│   │   ├── App.tsx         # Main app component with routing
│   │   ├── main.tsx        # Entry point
│   │   └── index.css       # Global styles and design tokens
│   ├── index.html
│   └── package.json
├── shared/                  # Shared types and constants
├── README.md
├── TEMPLATE_README.md      # Original template documentation
└── todo.md                 # Development task tracker
```

## 🎨 Design System

### Colors
- **Primary (Teal)**: `#32B8C6` - Main CTAs and accents
- **Secondary (Orange)**: `#E68161` - Secondary accents
- **Background**: `#1F2121` (Charcoal 700)
- **Surface**: `#262828` (Charcoal 800)
- **Additional Accents**: Gold, Green, Magenta, Purple, Blue, Yellow

### Typography
- **Headings**: Space Grotesk (Google Fonts)
- **Body**: Inter (Google Fonts)
- **Code**: JetBrains Mono (Google Fonts)

### Spacing & Layout
- Container max-width with responsive padding
- Consistent section spacing (py-24)
- Grid-based layouts for feature cards

## 🔑 Key Sections

1. **Hero Section** - Eye-catching "MINING EVOLVED" headline with animated background and key statistics (40%, 69%, 65%, 30%)
2. **Logo Showcase** - Official Ryno and TerraHash branding display
3. **About Ryno Crypto Services** - Company mission, expert leadership, innovation focus, and core values
4. **Platform Overview** - Six key benefits: OpEx reduction, cooling efficiency, lifespan extension, uptime improvement, hash rate increase, and energy reduction
5. **Technology Deep Dive** - Interactive tabbed interface with:
   - **Hardware Modules**: Braiins BCB-100, Chilldyne cooling, rack infrastructure, environmental monitoring
   - **Software Architecture**: AI agents, monitoring platform, data pipeline, optimization engine
   - **Network Infrastructure**: Tailscale zero-trust, security controls, high-availability, encrypted communications
6. **Retrofitting Services** - (Placeholder for future content)
7. **Technology Stack** - (Placeholder for future content)
8. **Strategic Partners** - (Placeholder for future content)
9. **Contact** - (Placeholder for future content)

## 🌐 Deployment

The website is designed to be deployed as a static site and can be hosted on:
- **Vercel** (Recommended) - Zero-config deployment
- **Netlify** - Continuous deployment from Git
- **GitHub Pages** - Free hosting for public repos
- **AWS S3 + CloudFront** - Scalable static hosting
- **Any static hosting provider**

### Deployment Steps (Vercel)
1. Push code to GitHub repository
2. Import project in Vercel dashboard
3. Configure build settings:
   - Build Command: `npm run build` or `pnpm build`
   - Output Directory: `client/dist`
4. Deploy!

## 📝 Development Notes

- All logos are transparent PNG files optimized for dark backgrounds
- Statistics animations use Intersection Observer API for performance
- Custom hooks (`useInView`, `useCountUp`) provide reusable animation logic
- Responsive design tested across mobile, tablet, and desktop viewports
- Dark theme is the default and only theme (no light mode toggle)
- Smooth scrolling navigation with fixed header that blurs on scroll

## 🔧 Customization

### Adding New Sections
1. Create a new component in `client/src/components/`
2. Import and add it to `client/src/pages/Home.tsx`
3. Add navigation link in `client/src/components/Navigation.tsx` if needed

### Modifying Colors
Edit the CSS variables in `client/src/index.css`:
```css
.dark {
  --primary: #32B8C6;  /* Teal */
  --accent: #E68161;   /* Orange */
  /* ... other colors ... */
}
```

### Adding Animations
Use the custom hooks:
```tsx
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

const { ref, isInView } = useInView({ threshold: 0.3 });
const count = useCountUp({ end: 100, duration: 2000 });
```

## 🤝 Contributing

This is a private project for Ryno Crypto Services, LLC. For questions or contributions, please contact the development team.

## 📄 License

© 2025 Ryno Crypto Services, LLC. All rights reserved.

## 🔗 Links

- **Bluesky**: [@rynomining.bsky.social](https://bsky.app/profile/rynomining.bsky.social)
- **X/Twitter**: [@RynoMining](https://x.com/RynoMining)
- **YouTube**: [Ryno Mining Channel](https://www.youtube.com/channel/UCQxX-_FZ8NUIFK1MdSse2AQ)
- **HashGrid**: [hashgrid.net](https://hashgrid.net/)

---

Built with ❤️ by the Ryno Crypto Services team
