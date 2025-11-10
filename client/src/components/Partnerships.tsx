import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useParallax } from "@/hooks/useParallax";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { ExternalLink, Droplet, Server } from "lucide-react";

export default function Partnerships() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: partnersRef, isVisible: partnersVisible } = useScrollAnimation();
  const parallax = useParallax({ speed: 0.15, direction: "down" });

  const partners = [
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
  ];

  return (
    <section id="partners" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5" style={parallax}>
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
            Strategic Partnerships
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Cooling <span className="text-primary">Innovation</span> Partners
          </h2>
          <p className="text-xl text-muted-foreground">
            TerraHash Stack partners with industry-leading cooling technology providers to deliver unmatched thermal efficiency and operational performance for bitcoin mining operations.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          ref={partnersRef}
          initial="hidden"
          animate={partnersVisible ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {partners.map((partner, index) => (
            <motion.div 
              key={index} 
              variants={staggerItem}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${partner.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <partner.icon className={`w-8 h-8 ${partner.color} group-hover:rotate-12 transition-transform duration-300`} />
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
              Cooling <span className="text-primary">Excellence</span>
            </h3>
            <p className="text-lg text-foreground/90 leading-relaxed mb-6">
              Our cooling partnerships represent the cutting edge of thermal management technology for high-density bitcoin mining. ServerDomes provides turnkey immersion cooling infrastructure, while Chilldyne delivers revolutionary direct-to-chip liquid cooling solutions.
            </p>
            <p className="text-lg text-foreground/90 leading-relaxed">
              Together, these partnerships enable TerraHash Stack to achieve <strong>95%+ cooling efficiency</strong>, dramatically reduce energy consumption, and extend equipment lifespan by up to <strong>40%</strong>—all while maintaining optimal operating temperatures for maximum hashrate performance.
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
