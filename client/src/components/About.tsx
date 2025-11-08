import {
  Building2,
  Users,
  Award,
  TrendingUp,
  Code,
  Lock,
  Leaf,
  Eye,
  Layers,
  Bitcoin,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function About() {
  const missionStatement =
    "Ryno Crypto Services and our core technology TerraHash Stack are pioneering sustainable, autonomous bitcoin mining operations that maximize efficiency, profitability, and environmental stewardship through innovative liquid cooling, AI-driven optimization, and decentralized finance integration. We empower miners from enthusiasts to institutional operators to scale profitably while advancing the bitcoin ecosystem. As stewards of open-source mining technology and leading contributors to the global open-source mining development movement, we accelerate the democratization of mining and strengthen the resilience of the Bitcoin network through transparent, community-driven innovation.";

  const leadership = [
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
        "Led by industry veterans Elvis Nuno (CEO) and Jacob Dobie (COO) with decades of combined experience in large scale crypto and infrastructure deployments and operations.",
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

  const coreValues = [
    {
      icon: Code,
      title: "Open Source Stewardship",
      description:
        "Leading the open-source mining development movement with transparent contributions and community leadership",
    },
    {
      icon: TrendingUp,
      title: "Efficiency Through Innovation",
      description:
        "Constantly improving mining technology and operations, sharing innovations to strengthen the entire ecosystem",
    },
    {
      icon: Lock,
      title: "Autonomy & Decentralization",
      description:
        "Empowering miners with open tools that avoid lock-in and support independence",
    },
    {
      icon: Leaf,
      title: "Sustainability as Advantage",
      description:
        "Clean energy and resource recovery make mining more profitable and sustainable long-term",
    },
    {
      icon: Bitcoin,
      title: "Proof of Work Economics",
      description:
        "Real value comes from visible effort, investment, and productive work—not speculation",
    },
    {
      icon: Eye,
      title: "Transparency & Integrity",
      description:
        "Radical transparency in financials, performance, and technology builds trust and accountability",
    },
    {
      icon: Layers,
      title: "Scalable Excellence",
      description:
        "Maintaining quality and reliability as we scale from enthusiast to 100MW+ commercial operations",
    },
    {
      icon: Users,
      title: "Community Stewardship",
      description:
        "Building strong relationships and contributing value to local, developer, and Bitcoin communities",
    },
    {
      icon: Bitcoin,
      title: "Bitcoin Maximalism",
      description:
        "Committed to bitcoin as superior money while pragmatically balancing fiat realities for long-term holdings",
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
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
            <h3 className="text-2xl font-bold mb-4 text-center text-primary">
              Our Mission
            </h3>
            <p className="text-lg text-foreground/90 leading-relaxed">
              {missionStatement}
            </p>
          </Card>
        </div>

        {/* Leadership & Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-16">
          {leadership.map((item, index) => (
            <Card
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Core Values Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-primary">Core Values</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Nine foundational principles that guide every decision, partnership,
              and innovation at Ryno Crypto Services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreValues.map((value, index) => (
              <Card
                key={index}
                className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold">{value.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
