import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useParallax } from "@/hooks/useParallax";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import {
  Zap,
  Thermometer,
  TrendingUp,
  Shield,
  Cpu,
  Droplets,
} from "lucide-react";

export default function Platform() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: benefitsRef, isVisible: benefitsVisible } = useScrollAnimation();
  const parallax = useParallax({ speed: 0.2, direction: "up" });

  const benefits = [
    {
      icon: Zap,
      value: 65,
      suffix: "%",
      title: "OpEx Reduction",
      description:
        "AI-powered autonomous operations dramatically reduce operational expenses through intelligent optimization and predictive maintenance.",
      color: "text-yellow-400",
    },
    {
      icon: Thermometer,
      value: 95,
      suffix: "%",
      title: "Cooling Efficiency",
      description:
        "Chilldyne direct-to-chip liquid cooling removes heat at the source with industry-leading efficiency and heat recovery capabilities.",
      color: "text-blue-400",
    },
    {
      icon: TrendingUp,
      value: 40,
      suffix: "%",
      title: "Lifespan Extension",
      description:
        "Advanced cooling and monitoring extend equipment lifespan significantly, maximizing return on hardware investment.",
      color: "text-green-400",
    },
    {
      icon: Shield,
      value: 69,
      suffix: "%",
      title: "Uptime Improvement",
      description:
        "Autonomous AI agents detect and resolve issues before they cause downtime, ensuring maximum operational availability.",
      color: "text-purple-400",
    },
    {
      icon: Cpu,
      value: 30,
      suffix: "%",
      title: "Hash Rate Increase",
      description:
        "Per-chip optimization with Braiins BCB-100 control boards unlocks additional performance from every ASIC.",
      color: "text-cyan-400",
    },
    {
      icon: Droplets,
      value: 50,
      suffix: "%",
      title: "Energy Reduction",
      description:
        "Renewable energy integration and efficiency optimizations cut energy consumption in half compared to traditional operations.",
      color: "text-emerald-400",
    },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="platform" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5" style={parallax}>
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(50, 184, 198, 0.1) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(50, 184, 198, 0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
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
            Platform Overview
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-primary">TerraHash Stack</span> Platform
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Next-generation bitcoin mining infrastructure combining open-source
            hardware with proprietary AI optimization for unmatched efficiency
            and sustainability.
          </p>
        </motion.div>

        {/* Key Value Propositions */}
        <div className="max-w-6xl mx-auto mb-16">
          <motion.div
            ref={benefitsRef}
            initial="hidden"
            animate={benefitsVisible ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 group">
                <div className="mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors inline-block">
                    <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  <AnimatedCounter end={benefit.value} suffix={benefit.suffix} /> {benefit.title}
                </h3>
                <p className="text-muted-foreground">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Key Features Highlight */}
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">For Business Leaders</h3>
                <ul className="space-y-3 text-foreground/90">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Scale from $100K to 10MW seamlessly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>
                      550-1,045% ROI in moderate to bull market scenarios
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Minimal downtime retrofitting for existing facilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Comprehensive training and 24/7 enterprise support</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">For Technical Teams</h3>
                <ul className="space-y-3 text-foreground/90">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Open-source Braiins BCB-100 ASIC control boards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>
                      Chilldyne direct-to-chip liquid cooling with heat recovery
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>
                      Autonomous AI agents for real-time optimization
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Zero-trust network architecture with Tailscale</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button
                size="lg"
                onClick={() => scrollToSection("#technology")}
                className="group"
              >
                Explore Technical Details
                <Cpu className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Comparison Stats */}
        <div className="max-w-4xl mx-auto mt-16">
          <h3 className="text-3xl font-bold text-center mb-8">
            TerraHash Stack vs Traditional Mining
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-6 bg-card/30 rounded-lg border border-border">
              <div className="text-3xl font-bold text-primary mb-2">+40%</div>
              <div className="text-sm text-muted-foreground">
                Equipment Lifespan
              </div>
            </div>
            <div className="text-center p-6 bg-card/30 rounded-lg border border-border">
              <div className="text-3xl font-bold text-primary mb-2">+69%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center p-6 bg-card/30 rounded-lg border border-border">
              <div className="text-3xl font-bold text-primary mb-2">-65%</div>
              <div className="text-sm text-muted-foreground">OpEx</div>
            </div>
            <div className="text-center p-6 bg-card/30 rounded-lg border border-border">
              <div className="text-3xl font-bold text-primary mb-2">-50%</div>
              <div className="text-sm text-muted-foreground">
                Energy Use
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
