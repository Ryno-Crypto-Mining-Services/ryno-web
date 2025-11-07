import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Platform from "@/components/Platform";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <About />
      <Platform />

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

      {/* Footer - Placeholder */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2025 Ryno Crypto Services, LLC. All rights reserved.</p>
            <div className="mt-4 flex justify-center gap-6">
              <a href="https://bsky.app/profile/rynomining.bsky.social" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                Bluesky
              </a>
              <a href="https://x.com/RynoMining" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                X/Twitter
              </a>
              <a href="https://www.youtube.com/channel/UCQxX-_FZ8NUIFK1MdSse2AQ" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                YouTube
              </a>
              <a href="https://hashgrid.net/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                HashGrid
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
