import { Card } from "@/components/ui/card";
import { Calendar, TrendingUp, Award, Users, Zap, Globe } from "lucide-react";

export default function CompanyHistory() {
  const milestones = [
    {
      year: "2023",
      title: "Company Founded",
      description:
        "Ryno Crypto Services established with a vision to revolutionize bitcoin mining through sustainable, autonomous operations.",
      icon: Calendar,
      color: "text-primary",
    },
    {
      year: "2024",
      title: "TerraHash Stack Launch",
      description:
        "Launched proprietary TerraHash Stack platform, integrating AI-driven optimization with open-source mining firmware.",
      icon: Zap,
      color: "text-secondary",
    },
    {
      year: "2024",
      title: "First Commercial Deployment",
      description:
        "Successfully deployed first commercial-scale mining operation, achieving 40% equipment lifespan extension and 65% cost reduction.",
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      year: "2025",
      title: "Open-Source Leadership",
      description:
        "Became leading contributor to open-source mining development movement, partnering with Braiins and major firmware developers.",
      icon: Award,
      color: "text-secondary",
    },
    {
      year: "2025",
      title: "Global Expansion",
      description:
        "Expanded operations to multiple facilities, serving clients from enthusiast miners to 100MW+ institutional operators.",
      icon: Globe,
      color: "text-primary",
    },
  ];

  const stats = [
    {
      value: "40%",
      label: "Equipment Lifespan Extension",
      description: "Through advanced cooling and AI optimization",
    },
    {
      value: "69%",
      label: "Uptime Improvement",
      description: "Autonomous monitoring and predictive maintenance",
    },
    {
      value: "65%",
      label: "Operational Cost Reduction",
      description: "Energy efficiency and automated management",
    },
    {
      value: "95%",
      label: "Cooling Efficiency",
      description: "Direct-to-chip liquid cooling technology",
    },
  ];

  return (
    <section id="company-history" className="py-24 bg-background relative overflow-hidden">
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
            Our Journey
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Company <span className="text-primary">History</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            From startup to industry leader in sustainable bitcoin mining operations
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary"></div>

            {/* Milestones */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${
                      index % 2 === 0
                        ? "md:pr-12 md:text-right"
                        : "md:pl-12 md:text-left"
                    } pl-20 md:pl-0`}
                  >
                    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all">
                      <div className="flex items-start gap-4 md:flex-row-reverse md:justify-end">
                        <div className={`p-3 rounded-lg bg-primary/10 ${index % 2 === 0 ? "md:order-last" : ""}`}>
                          <milestone.icon className={`w-6 h-6 ${milestone.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="text-2xl font-bold text-primary mb-2">
                            {milestone.year}
                          </div>
                          <h3 className="text-xl font-bold mb-2">
                            {milestone.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transform md:-translate-x-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Proven <span className="text-primary">Performance</span>
            </h3>
            <p className="text-lg text-muted-foreground">
              Real-world results from our mining operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30 hover:scale-105 transition-transform"
              >
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold mb-2">{stat.label}</div>
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Market Growth Infographic */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Market <span className="text-primary">Growth</span>
            </h3>
          </div>
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border">
            <img
              src="/market-growth.png"
              alt="Ryno Mining Market Growth"
              className="w-full h-auto rounded-lg"
            />
          </Card>
        </div>
      </div>
    </section>
  );
}
