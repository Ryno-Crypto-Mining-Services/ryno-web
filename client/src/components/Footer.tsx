import { FileText, Github, Twitter, Mail, ExternalLink, Cloud, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const resources = [
    {
      icon: FileText,
      label: "Whitepaper",
      description: "Technical deep-dive into TerraHash Stack architecture",
      href: "/terrahash-whitepaper.pdf",
      external: true,
    },
    {
      icon: FileText,
      label: "Litepaper",
      description: "Executive summary and key features overview",
      href: "/terrahash-litepaper.pdf",
      external: true,
    },
  ];

  const socialLinks = [
    {
      icon: Twitter,
      label: "Twitter/X",
      href: "https://x.com/RynoMining",
      color: "hover:text-blue-400",
    },
    {
      icon: Cloud,
      label: "Bluesky",
      href: "https://bsky.app/profile/rynomining.bsky.social",
      color: "hover:text-blue-500",
    },
    {
      icon: Zap,
      label: "Nostr",
      href: "https://yakihonne.com/users/npub1jgzng58ux93r67dpju56rwgzzfejjdfe5rkazmvt3js547khendsxjweyj",
      color: "hover:text-purple-400",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Ryno-Crypto-Mining-Services",
      color: "hover:text-gray-400",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:dev@hashgrid.net",
      color: "hover:text-primary",
    },
  ];

  const footerLinks = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Platform", href: "#platform" },
    { label: "Technology", href: "#technology" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-background border-t border-border relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(50, 184, 198, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Ryno Crypto Services</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Pioneer sustainable, autonomous bitcoin mining operations through
              innovative technology and open-source stewardship.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-muted-foreground transition-colors ${link.color}`}
                  title={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.label}>
                  <a
                    href={resource.href}
                    target={resource.external ? "_blank" : undefined}
                    rel={resource.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <resource.icon className="w-4 h-4" />
                    <span>{resource.label}</span>
                    {resource.external && (
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Get Started
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Ready to revolutionize your mining operations?
            </p>
            <Button
              className="w-full"
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Contact Us
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border"></div>

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Ryno Crypto Services, LLC. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
