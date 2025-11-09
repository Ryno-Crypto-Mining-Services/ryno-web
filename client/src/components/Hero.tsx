import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { useParallax } from "@/hooks/useParallax";
import { CircuitBackground } from "@/components/CircuitBackground";
import { AnimatedProgressBar } from "@/components/AnimatedProgressBar";

function AnimatedStat({ value, label, suffix = "%" }: { value: number; label: string; suffix?: string }) {
  const counter = useCountUp({ end: value, duration: 2000, suffix });

  return (
    <div
      ref={counter.ref}
      className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:scale-105"
    >
      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
        {counter.value}
      </div>
      <AnimatedProgressBar value={value} className="mb-2" />
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const parallax = useParallax({ speed: 0.3, direction: "down" });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { value: 40, label: "Equipment Lifespan Extension" },
    { value: 69, label: "Uptime Improvement" },
    { value: 65, label: "OpEx Reduction" },
    { value: 30, label: "Hash Rate Increase" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden" style={parallax}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>
        
        {/* Circuit Board Pattern with Electrical Pulses */}
        <CircuitBackground />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div
          className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            Next-Generation Bitcoin Mining Platform
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground">MINING </span>
            <span className="text-primary">EVOLVED</span>
          </h1>

          {/* Subheadline */}
          <p className="text-2xl md:text-4xl font-semibold mb-4 text-foreground/90">
            Less Energy, Less Cooling, More Hash
          </p>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            TerraHash Stack - The Future of Sustainable Bitcoin Mining
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="text-lg px-8 py-6 group"
              onClick={() => scrollToSection("#contact")}
            >
              Schedule Consultation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              onClick={() => scrollToSection("#platform")}
            >
              Explore Platform
            </Button>
          </div>

          {/* Stats Ticker */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <AnimatedStat
                key={index}
                value={stat.value}
                label={stat.label}
                suffix="%"
              />
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection("#about")}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-sm">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
