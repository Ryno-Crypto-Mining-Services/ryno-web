import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { ExternalLink, Cpu, Droplet, Shield, Cloud, Database, Brain, Server } from "lucide-react";

export default function Partnerships() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: partnersRef, isVisible: partnersVisible } = useScrollAnimation();

  const partners = [
    {
      name: "Braiins",
      category: "Firmware & Pool",
      icon: Cpu,
      description:
        "Open-source firmware (BraiinsOS+) and mining pool provider. Powers our ASIC control boards with transparent, auditable firmware that maximizes hashrate efficiency and eliminates proprietary vendor lock-in.",
      features: ["BraiinsOS+ Firmware", "Stratum V2 Protocol", "Auto-tuning", "Pool Services"],
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      website: "https://braiins.com",
    },
    {
      name: "Chilldyne",
      category: "Cooling Solutions",
      icon: Droplet,
      description:
        "Direct-to-chip liquid cooling technology provider. Delivers 95%+ cooling efficiency with dramatically reduced energy consumption compared to traditional air cooling systems.",
      features: [
        "Direct-to-Chip Cooling",
        "95% Efficiency",
        "Heat Recovery",
        "Modular Design",
      ],
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      website: "https://chilldyne.com",
    },
    {
      name: "Tailscale",
      category: "Network Infrastructure",
      icon: Shield,
      description:
        "Zero-trust network platform built on WireGuard. Provides secure, encrypted mesh networking for distributed mining operations with seamless device connectivity and access control.",
      features: [
        "Zero-Trust Security",
        "WireGuard VPN",
        "Mesh Networking",
        "Access Control",
      ],
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      website: "https://tailscale.com",
    },
    {
      name: "Cloudflare",
      category: "Edge & Security",
      icon: Cloud,
      description:
        "Global edge network and security platform. Protects mining operations with DDoS mitigation, provides edge computing capabilities, and ensures reliable connectivity for distributed infrastructure.",
      features: ["DDoS Protection", "Edge Computing", "DNS Services", "Load Balancing"],
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
      website: "https://cloudflare.com",
    },
    {
      name: "Pinecone",
      category: "Vector Database",
      icon: Database,
      description:
        "High-performance vector database for AI/ML workloads. Powers our autonomous AI agents with fast semantic search and similarity matching for intelligent mining optimization and anomaly detection.",
      features: [
        "Vector Search",
        "Real-time Indexing",
        "AI/ML Integration",
        "Scalable Performance",
      ],
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      website: "https://pinecone.io",
    },
    {
      name: "Pulumi",
      category: "Infrastructure as Code",
      icon: Brain,
      description:
        "Modern infrastructure as code platform. Enables programmatic deployment and management of mining infrastructure across cloud and on-premise environments with full automation and version control.",
      features: [
        "Infrastructure as Code",
        "Multi-Cloud Support",
        "Automation",
        "Version Control",
      ],
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      website: "https://pulumi.com",
    },
    {
      name: "ServerDomes",
      category: "Immersion Cooling",
      icon: Server,
      description:
        "Premier immersion cooling infrastructure provider. Delivers turnkey immersion cooling solutions with pre-engineered containers, advanced thermal management, and modular scalability for high-density mining operations.",
      features: [
        "Immersion Cooling",
        "Turnkey Solutions",
        "Modular Design",
        "Thermal Management",
      ],
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      website: "https://serverdomes.com",
    },
  ];

  return (
    <section id="partners" className="py-24 bg-background relative overflow-hidden">
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
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerVisible ? "visible" : "hidden"}
          variants={fadeInUp}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            Technology Partnerships
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Built on <span className="text-primary">Best-in-Class</span> Technology
          </h2>
          <p className="text-xl text-muted-foreground">
            TerraHash Stack integrates industry-leading open-source and enterprise
            technologies to deliver unmatched performance, security, and reliability for
            bitcoin mining operations.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          ref={partnersRef}
          initial="hidden"
          animate={partnersVisible ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {partners.map((partner, index) => (
            <motion.div key={index} variants={staggerItem}>
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${partner.bgColor}`}>
                  <partner.icon className={`w-8 h-8 ${partner.color}`} />
                </div>
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  title={`Visit ${partner.name}`}
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              {/* Partner Info */}
              <h3 className="text-2xl font-bold mb-1">{partner.name}</h3>
              <p className={`text-sm font-medium mb-3 ${partner.color}`}>
                {partner.category}
              </p>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {partner.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {partner.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-foreground/80"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${partner.color.replace('text-', 'bg-')}`}></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Integration Ecosystem */}
        <div className="max-w-4xl mx-auto mt-20">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-6">
              Integrated <span className="text-primary">Ecosystem</span>
            </h3>
            <p className="text-lg text-foreground/90 leading-relaxed mb-6">
              Our technology partnerships aren't just vendor relationships—they're deeply
              integrated components of the TerraHash Stack platform. Each partner was
              selected for their commitment to{" "}
              <strong>open standards, security, and operational excellence</strong>.
            </p>
            <p className="text-lg text-foreground/90 leading-relaxed">
              From Braiins' open-source firmware to Tailscale's zero-trust networking,
              from Chilldyne's revolutionary cooling to Cloudflare's global edge
              infrastructure—every technology choice reinforces our core values of{" "}
              <strong>
                transparency, autonomy, efficiency, and community stewardship
              </strong>
              .
            </p>
          </Card>
        </div>

        {/* Additional Partners Note */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Interested in partnering with Ryno Crypto Services?{" "}
            <a
              href="#contact"
              className="text-primary hover:underline font-medium"
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector("#contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
