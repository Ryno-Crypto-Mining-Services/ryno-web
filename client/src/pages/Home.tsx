import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
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
import Footer from "@/components/Footer";

export default function Home() {
  return (
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
      <ContactForm />
      <Footer />
    </div>
  );
}
