import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Leaf,
  Cpu,
  Shield,
  TrendingUp,
  Users,
  Heart,
  Zap,
  Globe,
  Bitcoin,
} from "lucide-react";

export default function MissionStatement() {
  const coreValues = [
    {
      icon: Users,
      title: "Open Source Stewardship",
      description:
        "Leading the global open-source mining development movement, sharing innovations freely to strengthen the Bitcoin ecosystem.",
    },
    {
      icon: Zap,
      title: "Efficiency Through Innovation",
      description:
        "Obsessively pursuing technical excellence through liquid cooling, AI optimization, and continuous improvement.",
    },
    {
      icon: Shield,
      title: "Autonomy & Decentralization",
      description:
        "Empowering miners with full control through open-source tools that resist vendor lock-in.",
    },
    {
      icon: Leaf,
      title: "Sustainability as Advantage",
      description:
        "Integrating renewable energy and resource recovery to create profitable, long-term operations.",
    },
    {
      icon: Cpu,
      title: "Proof of Work Economics",
      description:
        "Demonstrating that real value comes from tangible effort, investment, and productive work.",
    },
    {
      icon: TrendingUp,
      title: "Transparency & Integrity",
      description:
        "Operating with radical transparency in financials, performance, and technology partnerships.",
    },
    {
      icon: Globe,
      title: "Scalable Excellence",
      description:
        "Maintaining quality and reliability from enthusiast operations to 100MW+ industrial facilities.",
    },
    {
      icon: Heart,
      title: "Community Stewardship",
      description:
        "Building strong relationships with local communities, developers, and the Bitcoin ecosystem.",
    },
    {
      icon: Bitcoin,
      title: "Bitcoin Maximalism",
      description:
        "Committed to bitcoin as superior money while pragmatically navigating market realities.",
    },
  ];

  return (
    <section id="mission" className="py-24 bg-card/30 relative overflow-hidden">
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
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            Our Mission
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pioneering <span className="text-primary">Sustainable</span> Bitcoin Mining
          </h2>
          <p className="text-xl text-foreground/90 leading-relaxed mb-8">
            Ryno Crypto Services and TerraHash Stack are pioneering{" "}
            <strong>sustainable, autonomous bitcoin mining operations</strong> that
            maximize efficiency, profitability, and environmental stewardship through
            innovative liquid cooling, AI-driven optimization, and decentralized finance
            integration. We empower miners from enthusiasts to institutional operators to
            scale profitably while advancing the bitcoin ecosystem.
          </p>
          <p className="text-lg text-muted-foreground mb-8">
            As stewards of open-source mining technology and leading contributors to the
            global open-source mining development movement, we accelerate the
            democratization of mining and strengthen the resilience of the Bitcoin
            network through transparent, community-driven innovation.
          </p>
          <Link href="/mission-statement">
            <Button size="lg" variant="outline" className="text-lg px-8">
              Read Full Mission Statement
            </Button>
          </Link>
        </div>

        {/* Core Values Grid */}
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            Our <span className="text-primary">Core Values</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => (
              <Card
                key={index}
                className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold mb-2">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Why These Values Matter */}
        <div className="max-w-4xl mx-auto mt-20">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-6">
              Why These Values <span className="text-primary">Matter</span>
            </h3>
            <p className="text-lg text-foreground/90 leading-relaxed mb-6">
              Ryno's differentiation rests not merely on hardware or software, but on{" "}
              <strong>clarity of purpose and authentic community integration</strong>. We
              operate in an industry historically perceived as environmentally
              irresponsible and driven by speculation. By anchoring our organization to
              verifiable values—open-source stewardship, sustainability, autonomy,
              transparency, and genuine community participation—we transform mining from
              a marginalized activity into a{" "}
              <strong>legitimate, scalable infrastructure business</strong> worthy of
              institutional capital, regulatory acceptance, developer collaboration, and
              long-term customer partnerships.
            </p>
            <p className="text-lg text-foreground/90 leading-relaxed">
              Our leadership in open-source mining technology differentiates us from
              competitors by positioning Ryno not as a vendor seeking to extract value
              from miners, but as{" "}
              <strong>stewards committed to strengthening Bitcoin itself</strong>. This
              authenticity creates gravitational pull among developers, operators, and
              regulators who increasingly view open-source infrastructure as essential to
              Bitcoin's long-term resilience.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
