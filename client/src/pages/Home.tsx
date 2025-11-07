import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import LogoShowcase from "@/components/LogoShowcase";
import About from "@/components/About";
import Platform from "@/components/Platform";
import Technology from "@/components/Technology";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <LogoShowcase />
      <About />
      <Platform />
      <Technology />

      {/* Retrofitting Section - Placeholder */}
      <section id="retrofitting" className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Retrofitting Services
            </h2>
            <p className="text-xl text-muted-foreground">
              Transform your existing mining operation with TerraHash Stack technology
            </p>
          </div>
        </div>
      </section>

      {/* Technology Section - Placeholder */}
      <section id="technology" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Technology Stack
            </h2>
            <p className="text-xl text-muted-foreground">
              Advanced hardware and software modules for optimal mining performance
            </p>
          </div>
        </div>
      </section>

      {/* Partners Section - Placeholder */}
      <section id="partners" className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Strategic Partners
            </h2>
            <p className="text-xl text-muted-foreground">
              Collaborating with industry leaders to deliver exceptional mining solutions
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section - Placeholder */}
      <section id="contact" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Ready to revolutionize your mining operation? Let's talk.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
