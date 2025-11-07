import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Check,
  X,
  TrendingUp,
  Zap,
  Shield,
  Wrench,
  Clock,
  DollarSign,
  AlertTriangle,
  ThermometerSun,
  Activity,
} from "lucide-react";

export default function Retrofitting() {
  const painPoints = [
    {
      icon: ThermometerSun,
      title: "Overheating Equipment",
      description:
        "Traditional air cooling fails to manage heat effectively, leading to thermal throttling and reduced hashrate.",
      color: "text-destructive",
    },
    {
      icon: DollarSign,
      title: "High Operating Costs",
      description:
        "Excessive energy consumption from inefficient cooling and outdated firmware drains profitability.",
      color: "text-destructive",
    },
    {
      icon: AlertTriangle,
      title: "Frequent Downtime",
      description:
        "Manual monitoring and reactive maintenance result in unexpected failures and lost mining time.",
      color: "text-destructive",
    },
    {
      icon: Activity,
      title: "Limited Visibility",
      description:
        "Lack of real-time monitoring and analytics makes it impossible to optimize performance proactively.",
      color: "text-destructive",
    },
  ];

  const comparisonData = [
    {
      feature: "Cooling Technology",
      traditional: "Air cooling (fans)",
      terrahash: "Direct-to-chip liquid cooling",
    },
    {
      feature: "Energy Efficiency",
      traditional: "Standard PUE 1.8-2.0",
      terrahash: "Optimized PUE 1.05-1.15",
    },
    {
      feature: "Equipment Lifespan",
      traditional: "2-3 years typical",
      terrahash: "4-5 years (40% extension)",
    },
    {
      feature: "Monitoring",
      traditional: "Manual checks",
      terrahash: "24/7 AI-powered autonomous",
    },
    {
      feature: "Firmware",
      traditional: "Proprietary locked",
      terrahash: "Open-source (Braiins)",
    },
    {
      feature: "Uptime",
      traditional: "85-90% typical",
      terrahash: "98-99% with predictive maintenance",
    },
    {
      feature: "Cost Reduction",
      traditional: "Baseline",
      terrahash: "65% operational cost savings",
    },
  ];

  const serviceTiers = [
    {
      name: "Small Scale",
      capacity: "Up to 1 MW",
      price: "Custom Quote",
      features: [
        "Chilldyne cooling retrofit",
        "Braiins firmware upgrade",
        "Basic monitoring dashboard",
        "Email support",
        "Quarterly maintenance",
      ],
      recommended: false,
    },
    {
      name: "Medium Scale",
      capacity: "1-10 MW",
      price: "Custom Quote",
      features: [
        "Full TerraHash Stack deployment",
        "AI agent management",
        "Advanced analytics platform",
        "24/7 priority support",
        "Monthly optimization reviews",
        "Dedicated account manager",
      ],
      recommended: true,
    },
    {
      name: "Large Scale",
      capacity: "10-50 MW",
      price: "Custom Quote",
      features: [
        "Enterprise TerraHash Stack",
        "Custom AI optimization models",
        "Real-time financial automation",
        "White-glove support",
        "Weekly performance reviews",
        "On-site technical assistance",
        "SLA guarantees",
      ],
      recommended: false,
    },
    {
      name: "Mega Scale",
      capacity: "50+ MW",
      price: "Enterprise",
      features: [
        "Fully customized solution",
        "Dedicated engineering team",
        "Custom hardware integration",
        "Advanced predictive analytics",
        "24/7 on-site support",
        "Revenue optimization suite",
        "Strategic partnership benefits",
      ],
      recommended: false,
    },
  ];

  const retrofitProcess = [
    {
      phase: "Phase 1",
      title: "Assessment & Planning",
      duration: "1-2 weeks",
      description:
        "Comprehensive facility audit, infrastructure analysis, and customized retrofitting plan development.",
      icon: Wrench,
    },
    {
      phase: "Phase 2",
      title: "Hardware Installation",
      duration: "2-4 weeks",
      description:
        "Install Chilldyne cooling systems, Braiins control boards, and network infrastructure with minimal downtime.",
      icon: Zap,
    },
    {
      phase: "Phase 3",
      title: "Software Deployment",
      duration: "1-2 weeks",
      description:
        "Deploy AI agents, monitoring systems, and integrate with existing operations. Full training provided.",
      icon: Shield,
    },
    {
      phase: "Phase 4",
      title: "Optimization & Support",
      duration: "Ongoing",
      description:
        "Continuous monitoring, performance tuning, and 24/7 support to maximize ROI and uptime.",
      icon: TrendingUp,
    },
  ];

  return (
    <section id="retrofitting" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(230, 129, 97, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-6">
            Retrofitting Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transform Your <span className="text-secondary">Mining Operation</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Upgrade existing facilities with TerraHash Stack technology for dramatic
            improvements in efficiency, uptime, and profitability
          </p>
        </div>

        {/* Why Retrofit? - Pain Points */}
        <div className="max-w-6xl mx-auto mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">
            Common <span className="text-destructive">Challenges</span> We Solve
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {painPoints.map((point, index) => (
              <Card
                key={index}
                className="p-6 bg-card/50 backdrop-blur-sm border-destructive/30 hover:border-destructive/50 transition-all"
              >
                <point.icon className={`w-12 h-12 ${point.color} mb-4`} />
                <h4 className="text-lg font-bold mb-2">{point.title}</h4>
                <p className="text-sm text-muted-foreground">{point.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">
            Traditional vs <span className="text-primary">TerraHash Stack</span>
          </h3>
          <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-border overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-bold">Feature</th>
                  <th className="text-left py-4 px-4 font-bold text-muted-foreground">
                    Traditional Setup
                  </th>
                  <th className="text-left py-4 px-4 font-bold text-primary">
                    TerraHash Stack
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-border/50 hover:bg-primary/5 transition-colors"
                  >
                    <td className="py-4 px-4 font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-destructive flex-shrink-0" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-primary">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{row.terrahash}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Service Tiers */}
        <div className="max-w-7xl mx-auto mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">
            Retrofitting <span className="text-primary">Service Tiers</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceTiers.map((tier, index) => (
              <Card
                key={index}
                className={`p-6 bg-card/50 backdrop-blur-sm transition-all ${
                  tier.recommended
                    ? "border-primary ring-2 ring-primary/50 scale-105"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {tier.recommended && (
                  <div className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold mb-4">
                    RECOMMENDED
                  </div>
                )}
                <h4 className="text-2xl font-bold mb-2">{tier.name}</h4>
                <p className="text-muted-foreground text-sm mb-2">{tier.capacity}</p>
                <div className="text-3xl font-bold text-primary mb-6">{tier.price}</div>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={tier.recommended ? "default" : "outline"}>
                  Get Quote
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Retrofitting Process */}
        <div className="max-w-6xl mx-auto mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">
            Retrofitting <span className="text-primary">Process</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {retrofitProcess.map((step, index) => (
              <Card
                key={index}
                className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30 hover:scale-105 transition-transform"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-primary">{step.phase}</span>
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{step.duration}</p>
                <p className="text-sm">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/50">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to <span className="text-primary">Upgrade</span>?
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Schedule a free consultation to discuss your retrofitting needs and get a
              customized quote for your facility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Download Retrofitting Guide
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
