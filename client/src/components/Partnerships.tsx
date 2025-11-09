import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useParallax } from "@/hooks/useParallax";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";import { ExternalLink, Droplet, Building2 } from "lucide-react";
import { AnimatedStat } from "@/components/AnimatedStat";export default function Partnerships() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: partnersRef, isVisible: partnersVisible } = useScrollAnimation();
  const parallax = useParallax({ speed: 0.15, direction: "down" });

  const partners = [
    {
      name: "ServerDomes",
      category: "Edge Data Centers",
      icon: Building2,
      logo: "/serverdomes-logo.png",
      description:
        "ServerDomes' next-generation biomimetic data center design delivers unparalleled efficiency, stability, and build speed.\n\n• Passive airflow architecture reduces power use by up to 40% and water needs by over 90%.\n\n• Modular deployment enables 2MW to 5MW sites in 8–12 months, fitting expansion plans and tight timelines.\n\n• Flexible, truss-free interiors support high-density AI, HPC, and mining workloads with maximum uptime.\n\n• Integrated ultra-bandwidth, low-latency fiber WAN ensures seamless edge and distributed AI connectivity.\n\n• Sustainability is built in—no refrigerants, low carbon footprint, and resilient design for ESG mandates.\n\n• Designed to meet rapidly growing industry demands, to meet the future scaling of TerraHash Stack AI management solutions.",
      features: [
        "Accelerated Launch",
        "Sustainable Operations",
        "Modular Scalability",
        "High Capacity, Low Latency Connectivity",
      ],
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      website: "https://serverdomes.com",
    },
    {
      name: "Chilldyne",
      category: "Cooling Solutions",
      icon: Droplet,
      logo: "/chilldyne-logo.png",
      description:
        "Chilldyne is a leader in direct-to-chip liquid cooling for next-generation datacenters.\n\n• Delivers up to 40% energy savings and 700% greater cooling efficiency compared to air systems.\n\n• Employs patented negative pressure technology for leak-proof, high-reliability operation.\n\n• Modular architecture minimizes downtime and eliminates the need for costly HVAC infrastructure.\n\n• Dramatically reduces operational carbon footprint and supports remote commissioning/management.\n\n• Future-proofs large-scale mining and AI facilities by sustaining exceptional uptime, serviceability, and sustainability for TerraHash Stack operations.",
      features: [
        "Direct-to-Chip Cooling",
        "95% Efficiency",
        "100% Leak-Proof",
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
            Strategic <span className="text-primary">Infrastructure</span> Partners
          </h2>
          <p className="text-xl text-muted-foreground">
            TerraHash Stack partners with industry-leading infrastructure and cooling technology providers to deliver next-generation edge data centers and thermal management solutions for high-density bitcoin mining and AI operations.
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
                {partner.logo ? (
                  <div className="h-12 flex items-center group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="h-10 object-contain"
                    />
                  </div>
                ) : (
                  <div className={`p-3 rounded-lg ${partner.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <partner.icon className={`w-8 h-8 ${partner.color} group-hover:rotate-12 transition-transform duration-300`} />
                  </div>
                )}
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
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed whitespace-pre-line">
                {partner.description}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-4">
                {partner.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-foreground/80"
                  > <div className={`w-1.5 h-1.5 rounded-full ${partner.color.replace('text-', 'bg-')}`}></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Learn More Button */}
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium text-sm transition-colors duration-300 group/btn"
              >
                Learn More
                <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
              </a>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison Tables */}
        <div className="max-w-6xl mx-auto mt-20">
          <h3 className="text-3xl font-bold text-center mb-12">
            Why <span className="text-primary">Our Partners</span> Lead the Industry
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ServerDomes Comparison */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
              <h4 className="text-xl font-bold mb-6 text-center">
                ServerDomes vs Traditional Data Centers
              </h4>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 pb-3 border-b border-border font-semibold text-sm">
                  <div className="text-muted-foreground">Metric</div>
                  <div className="text-center text-primary">ServerDomes</div>
                  <div className="text-center text-muted-foreground">Traditional</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-sm text-muted-foreground">Operating Costs</div>
                  <AnimatedStat value="40% Lower" className="text-center font-bold text-green-500" />
                  <div className="text-center text-muted-foreground">Baseline</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center bg-primary/5 -mx-2 px-2 py-2 rounded">
                  <div className="text-sm text-muted-foreground">Build Time</div>
                  <div className="text-center font-bold text-green-500">8-12 months</div>
                  <div className="text-center text-muted-foreground">24-36 months</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-sm text-muted-foreground">Architecture</div>
                  <div className="text-center font-bold text-primary">Biomimetic</div>
                  <div className="text-center text-muted-foreground">Conventional</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center bg-primary/5 -mx-2 px-2 py-2 rounded">
                  <div className="text-sm text-muted-foreground">Scalability</div>
                  <div className="text-center font-bold text-green-500">Modular</div>
                  <div className="text-center text-muted-foreground">Fixed</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-sm text-muted-foreground">Network</div>
                  <div className="text-center font-bold text-primary">High-Cap Fiber</div>
                  <div className="text-center text-muted-foreground">Standard</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center bg-primary/5 -mx-2 px-2 py-2 rounded">
                  <div className="text-sm text-muted-foreground">Sustainability</div>
                  <div className="text-center font-bold text-green-500">Optimized</div>
                  <div className="text-center text-muted-foreground">Variable</div>
                </div>
              </div>
            </Card>

            {/* Chilldyne Comparison */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
              <h4 className="text-xl font-bold mb-6 text-center">
                Chilldyne vs Air Cooling Systems
              </h4>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 pb-3 border-b border-border font-semibold text-sm">
                  <div className="text-muted-foreground">Metric</div>
                  <div className="text-center text-primary">Chilldyne</div>
                  <div className="text-center text-muted-foreground">Air Cooling</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-sm text-muted-foreground">Energy Savings</div>
                  <AnimatedStat value="40% Lower" className="text-center font-bold text-green-500" />
                  <div className="text-center text-muted-foreground">Baseline</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center bg-primary/5 -mx-2 px-2 py-2 rounded">
                  <div className="text-sm text-muted-foreground">Efficiency</div>
                  <AnimatedStat value="700% Better" className="text-center font-bold text-green-500" />
                  <div className="text-center text-muted-foreground">100%</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-sm text-muted-foreground">Technology</div>
                  <div className="text-center font-bold text-primary">Direct-to-Chip</div>
                  <div className="text-center text-muted-foreground">Ambient Air</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center bg-primary/5 -mx-2 px-2 py-2 rounded">
                  <div className="text-sm text-muted-foreground">Leak Protection</div>
                  <div className="text-center font-bold text-green-500">100% Sealed</div>
                  <div className="text-center text-muted-foreground">N/A</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-sm text-muted-foreground">HVAC Required</div>
                  <div className="text-center font-bold text-green-500">None</div>
                  <div className="text-center text-muted-foreground">Extensive</div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 items-center bg-primary/5 -mx-2 px-2 py-2 rounded">
                  <div className="text-sm text-muted-foreground">Carbon Footprint</div>
                  <div className="text-center font-bold text-green-500">Minimal</div>
                  <div className="text-center text-muted-foreground">High</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Integration Ecosystem */}
        <div className="max-w-4xl mx-auto mt-20">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-6">
              Infrastructure <span className="text-primary">Excellence</span>
            </h3>
            <p className="text-lg text-foreground/90 leading-relaxed mb-6">
              Our strategic partnerships combine next-generation edge data center infrastructure with revolutionary cooling technology. ServerDomes delivers biomimetic dome architecture with 40% lower operating costs and 8-12 month build times, while Chilldyne provides patented negative pressure liquid cooling with 700% greater efficiency than air-based systems.
            </p>
            <p className="text-lg text-foreground/90 leading-relaxed">
              Together, these partnerships enable TerraHash Stack to achieve <strong>95%+ cooling efficiency</strong>, <strong>100% leak-proof operations</strong>, dramatically reduced energy consumption, and megawatt-scale deployment capabilities—all while maintaining optimal operating temperatures for maximum hashrate performance and AI management system reliability.
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
