import { Building2, Users, Award, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function About() {
  const features = [
    {
      icon: Building2,
      title: "Premier Mining Operator",
      description:
        "Leading bitcoin mining facility operator utilizing cutting-edge TerraHash Stack technology for sustainable, efficient operations.",
    },
    {
      icon: Users,
      title: "Expert Leadership",
      description:
        "Led by industry veterans Ken Ward (CEO), Patrick Kodjoe (COO), and Elvis Nuno (CEO Crypto Services) with decades of combined experience.",
    },
    {
      icon: Award,
      title: "Innovation First",
      description:
        "Pioneering autonomous bitcoin mining operations that combine open-source hardware with proprietary AI optimization.",
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description:
        "Delivering 40% equipment lifespan extension, 69% uptime improvement, and 65% operational cost reduction.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-card/30 relative overflow-hidden">
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
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            About Us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-primary">Ryno Crypto Services</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Premier bitcoin mining facility operator leveraging TerraHash Stack
            technology to deliver sustainable, autonomous mining operations at
            scale.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="p-8 md:p-12 bg-card/50 backdrop-blur-sm border-primary/20">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Our Mission
            </h3>
            <p className="text-lg text-foreground/90 text-center leading-relaxed">
              Ryno Crypto Services and our core technology TerraHash Stack are
              pioneering sustainable, autonomous bitcoin mining operations that
              combine cutting-edge hardware with AI-powered management systems.
              We're committed to revolutionizing the mining industry through
              innovation, efficiency, and environmental responsibility.
            </p>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Core Values */}
        <div className="max-w-4xl mx-auto mt-16">
          <h3 className="text-3xl font-bold text-center mb-8">Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                Innovation
              </div>
              <p className="text-muted-foreground">
                Pushing boundaries with AI-powered autonomous operations
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                Sustainability
              </div>
              <p className="text-muted-foreground">
                50% energy reduction through renewable integration
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                Excellence
              </div>
              <p className="text-muted-foreground">
                24/7 enterprise support and comprehensive training
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
