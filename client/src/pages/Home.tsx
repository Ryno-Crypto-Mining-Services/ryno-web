import { useAuth } from "@/_core/hooks/useAuth";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import { ScrollProgressIndicator } from "@/components/ScrollProgressIndicator";
import LogoShowcase from "@/components/LogoShowcase";
import About from "@/components/About";
import MissionStatement from "@/components/MissionStatement";
import Leadership from "@/components/Leadership";
import Platform from "@/components/Platform";
import Technology from "@/components/Technology";
import Retrofitting from "@/components/Retrofitting";
import Partnerships from "@/components/Partnerships";
import CallToAction from "@/components/CallToAction";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

/**
 * All content in this page are only for example, replace with your own feature implementation
 * When building pages, remember your instructions in Frontend Workflow, Frontend Best Practices, Design Guide and Common Pitfalls
 */
export default function Home() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();

  // If theme is switchable in App.tsx, we can implement theme toggling like this:
  // const { theme, toggleTheme } = useTheme();

  // Use APP_LOGO (as image src) and APP_TITLE if needed

  return (
    <>
      <ScrollProgressIndicator />
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
      <Hero />
      <LogoShowcase />
      <About />
      <MissionStatement />
      <Leadership />
      <Platform />
      <Technology />
      <Retrofitting />
      <Partnerships />
      <CallToAction />
      <FAQ />
      <ContactForm />
      <Footer />
      </div>
    </>
  );
}
