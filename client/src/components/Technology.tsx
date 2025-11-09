import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Cpu,
  Droplets,
  Network,
  Brain,
  Shield,
  Zap,
  Server,
  Thermometer,
  Activity,
  Database,
  Lock,
  Gauge,
  Cloud,
  Workflow,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

export default function Technology() {
  const [activeTab, setActiveTab] = useState<"hardware" | "software" | "network" | "edge" | "automation">("hardware");

  const hardwareModules = [
    {
      icon: Cpu,
      name: "Braiins BCB-100 Control Boards",
      category: "ASIC Control",
      description:
        "Open-source ASIC control boards enabling per-chip optimization and advanced monitoring capabilities.",
      specs: [
        "Per-chip frequency and voltage control",
        "Real-time temperature monitoring",
        "Advanced power management",
        "Open-source firmware (Braiins OS+)",
        "Remote configuration and updates",
      ],
      color: "text-cyan-400",
    },
    {
      icon: Droplets,
      name: "Chilldyne Direct-to-Chip Cooling",
      category: "Thermal Management",
      description:
        "Industry-leading liquid cooling solution that removes heat directly at the chip level with 95% efficiency.",
      specs: [
        "95% heat removal efficiency",
        "Direct-to-chip cold plate technology",
        "Heat recovery for secondary applications",
        "Reduced facility cooling requirements",
        "Extended equipment lifespan (40%+)",
      ],
      color: "text-blue-400",
    },
    {
      icon: Server,
      name: "Custom Rack Infrastructure",
      category: "Physical Layer",
      description:
        "Purpose-built server racks designed for optimal airflow, power distribution, and maintenance access.",
      specs: [
        "High-density ASIC mounting",
        "Integrated liquid cooling manifolds",
        "Redundant power distribution",
        "Hot-swap capability",
        "Modular expansion design",
      ],
      color: "text-purple-400",
    },
    {
      icon: Thermometer,
      name: "Environmental Monitoring",
      category: "Sensors & Telemetry",
      description:
        "Comprehensive sensor network monitoring temperature, humidity, power consumption, and equipment health.",
      specs: [
        "Real-time temperature tracking",
        "Power consumption analytics",
        "Humidity and airflow monitoring",
        "Predictive maintenance alerts",
        "Historical data logging",
      ],
      color: "text-orange-400",
    },
  ];

  const softwareModules = [
    {
      icon: Cpu,
      name: "Braiins Mining Software",
      category: "ASIC Firmware & Management",
      description:
        "Open-source firmware and management tools providing complete control over mining hardware with transparency and efficiency.",
      features: [
        "BraiinsOS - Open-source ASIC firmware",
        "Braiins Farm Monitor - Fleet management",
        "Braiins Farm Proxy - Stratum proxy",
        "Auto-tuning optimization",
        "Stratum V2 protocol support",
      ],
      links: [
        { name: "BraiinsOS", url: "https://braiins.com/os-firmware" },
        { name: "Farm Monitor", url: "https://academy.braiins.com/en/farm-monitor/about/" },
        { name: "Farm Proxy", url: "https://academy.braiins.com/en/farm-proxy/about/" },
      ],
      color: "text-orange-400",
    },
    {
      icon: Brain,
      name: "Autonomous AI Agents",
      category: "Operations Management",
      description:
        "AI-powered agents that continuously optimize mining operations, detect anomalies, and resolve issues autonomously.",
      features: [
        "Real-time performance optimization",
        "Predictive failure detection",
        "Automated issue resolution",
        "Load balancing and scheduling",
        "Self-healing capabilities",
      ],
      color: "text-green-400",
    },
    {
      icon: Activity,
      name: "Monitoring & Analytics Platform",
      category: "Observability",
      description:
        "Comprehensive monitoring dashboard providing real-time visibility into all aspects of mining operations.",
      features: [
        "Real-time hashrate monitoring",
        "Power consumption analytics",
        "Temperature and cooling metrics",
        "Equipment health dashboards",
        "Custom alerting and notifications",
      ],
      color: "text-yellow-400",
    },
    {
      icon: Database,
      name: "Data Pipeline & Storage",
      category: "Data Infrastructure",
      description:
        "High-performance data pipeline collecting, processing, and storing operational metrics for analysis and optimization.",
      features: [
        "Time-series data collection",
        "Real-time stream processing",
        "Long-term data retention",
        "Advanced analytics and ML",
        "API access for integrations",
      ],
      color: "text-indigo-400",
    },
    {
      icon: Gauge,
      name: "Performance Optimization Engine",
      category: "Efficiency",
      description:
        "Intelligent optimization engine that continuously tunes mining parameters for maximum efficiency and profitability.",
      features: [
        "Dynamic frequency scaling",
        "Power efficiency optimization",
        "Pool selection and switching",
        "Profitability maximization",
        "Adaptive cooling control",
      ],
      color: "text-pink-400",
    },
    {
      icon: Database,
      name: "Pinecone Vector Database",
      category: "AI/ML Infrastructure",
      description:
        "High-performance vector database powering AI agents with fast semantic search and similarity matching for intelligent optimization.",
      features: [
        "Vector similarity search",
        "Real-time indexing",
        "Semantic query processing",
        "Anomaly detection support",
        "Scalable performance",
      ],
      links: [
        { name: "Pinecone.io", url: "https://pinecone.io" },
      ],
      color: "text-emerald-400",
    },
  ];

  const networkModules = [
    {
      icon: Network,
      name: "Tailscale Zero-Trust Network",
      category: "Network Security",
      description:
        "Modern zero-trust network architecture providing secure, encrypted access to mining infrastructure without VPNs.",
      capabilities: [
        "WireGuard-based encryption",
        "Zero-trust access control",
        "No exposed public endpoints",
        "Automatic key rotation",
        "Multi-factor authentication",
      ],
      color: "text-teal-400",
    },
    {
      icon: Shield,
      name: "Security & Access Control",
      category: "Identity Management",
      description:
        "Comprehensive security framework with role-based access control, audit logging, and compliance monitoring.",
      capabilities: [
        "Role-based access control (RBAC)",
        "Audit logging and compliance",
        "API key management",
        "IP whitelisting",
        "Intrusion detection",
      ],
      color: "text-red-400",
    },
    {
      icon: Zap,
      name: "High-Availability Architecture",
      category: "Reliability",
      description:
        "Redundant, fault-tolerant architecture ensuring 99.9%+ uptime for critical mining operations.",
      capabilities: [
        "Redundant network paths",
        "Automatic failover",
        "Load balancing",
        "Geographic distribution",
        "Disaster recovery",
      ],
      color: "text-amber-400",
    },
    {
      icon: Lock,
      name: "Encrypted Communications",
      category: "Data Security",
      description:
        "End-to-end encryption for all communications between mining hardware, management systems, and external services.",
      capabilities: [
        "TLS 1.3 encryption",
        "Certificate management",
        "Secure API endpoints",
        "Encrypted data at rest",
        "Regular security audits",
      ],
      color: "text-violet-400",
    },
  ];

  const edgeModules = [
    {
      icon: Cloud,
      name: "Cloudflare Workers",
      category: "Serverless Computing",
      description:
        "Deploy serverless functions at the edge for ultra-low latency processing and real-time mining operations management.",
      capabilities: [
        "Sub-millisecond response times",
        "Global edge deployment",
        "Automatic scaling",
        "Zero cold starts",
        "Built-in security",
      ],
      link: { name: "Cloudflare Workers", url: "https://workers.cloudflare.com" },
      color: "text-orange-400",
    },
    {
      icon: Database,
      name: "Cloudflare R2 Storage",
      category: "Object Storage",
      description:
        "Global object storage for mining data, logs, and analytics with zero egress fees and S3-compatible API.",
      capabilities: [
        "S3-compatible API",
        "Zero egress fees",
        "Global replication",
        "Automatic backups",
        "Cost-effective storage",
      ],
      link: { name: "Cloudflare R2", url: "https://www.cloudflare.com/developer-platform/products/r2/" },
      color: "text-blue-400",
    },
    {
      icon: Shield,
      name: "Cloudflare API Shield",
      category: "API Security",
      description:
        "Comprehensive API security with schema validation, rate limiting, and threat protection for mining infrastructure.",
      capabilities: [
        "Schema validation",
        "Rate limiting",
        "JWT authentication",
        "mTLS support",
        "Threat intelligence",
      ],
      link: { name: "API Shield", url: "https://www.cloudflare.com/application-services/solutions/api-security/" },
      color: "text-purple-400",
    },
    {
      icon: Shield,
      name: "Cloudflare DDoS Protection",
      category: "Network Security",
      description:
        "Enterprise-grade DDoS protection ensuring mining operations remain online during attacks with automatic mitigation.",
      capabilities: [
        "Automatic DDoS mitigation",
        "Network-layer protection",
        "Application-layer defense",
        "Real-time analytics",
        "Zero configuration",
      ],
      link: { name: "DDoS Protection", url: "https://www.cloudflare.com/ddos/" },
      color: "text-red-400",
    },
    {
      icon: Zap,
      name: "Cloudflare Web3 Services",
      category: "Blockchain Infrastructure",
      description:
        "Web3 gateway and infrastructure services for blockchain interactions, IPFS hosting, and decentralized applications.",
      capabilities: [
        "Ethereum gateway",
        "IPFS hosting",
        "Web3 APIs",
        "ENS resolution",
        "Blockchain analytics",
      ],
      link: { name: "Web3 Services", url: "https://www.cloudflare.com/application-services/products/web3/" },
      color: "text-cyan-400",
    },
  ];

  const automationModules = [
    {
      icon: Workflow,
      name: "Pulumi Infrastructure as Code",
      category: "Infrastructure Automation",
      description:
        "Modern infrastructure as code platform enabling programmatic deployment and management of mining infrastructure with full automation.",
      capabilities: [
        "Multi-cloud support",
        "TypeScript/Python SDKs",
        "State management",
        "Policy as code",
        "GitOps workflows",
      ],
      link: { name: "Pulumi", url: "https://pulumi.com" },
      color: "text-purple-400",
    },
    {
      icon: Activity,
      name: "Kestra Workflow Orchestration",
      category: "Process Automation",
      description:
        "Open-source workflow orchestration platform for automating complex mining operations, data pipelines, and maintenance tasks.",
      capabilities: [
        "Visual workflow builder",
        "Event-driven automation",
        "Scheduling & triggers",
        "Plugin ecosystem",
        "Real-time monitoring",
      ],
      link: { name: "Kestra", url: "https://kestra.io" },
      color: "text-green-400",
    },
  ];

  const tabs = [
    { id: "hardware" as const, label: "Hardware Modules", icon: Cpu },
    { id: "software" as const, label: "Software Architecture", icon: Brain },
    { id: "edge" as const, label: "Edge Computing", icon: Cloud },
    { id: "automation" as const, label: "Infrastructure Automation", icon: Workflow },
    { id: "network" as const, label: "Network Infrastructure", icon: Network },
  ];

  return (
    <section id="technology" className="py-24 bg-background relative overflow-hidden">
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
            Technical Deep Dive
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-primary">Technology</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            A comprehensive breakdown of the TerraHash Stack platform for
            technical audiences - from hardware to software to network
            infrastructure.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              size="lg"
              onClick={() => setActiveTab(tab.id)}
              className="gap-2"
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Hardware Tab */}
        {activeTab === "hardware" && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hardwareModules.map((module, index) => (
                <Card
                  key={index}
                  className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <module.icon className={`w-6 h-6 ${module.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">
                        {module.category}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{module.name}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {module.description}
                  </p>
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-foreground/90">
                      Key Specifications:
                    </div>
                    <ul className="space-y-1">
                      {module.specs.map((spec, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Software Tab */}
        {activeTab === "software" && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {softwareModules.map((module, index) => (
                <Card
                  key={index}
                  className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <module.icon className={`w-6 h-6 ${module.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">
                        {module.category}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{module.name}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {module.description}
                  </p>
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-foreground/90">
                      Key Features:
                    </div>
                    <ul className="space-y-1">
                      {module.features.map((feature, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* External Links */}
                  {'links' in module && module.links && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex flex-wrap gap-2">
                        {module.links.map((link: any, i: number) => (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {link.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Network Tab */}
        {activeTab === "network" && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {networkModules.map((module, index) => (
                <Card
                  key={index}
                  className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <module.icon className={`w-6 h-6 ${module.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">
                        {module.category}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{module.name}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {module.description}
                  </p>
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-foreground/90">
                      Capabilities:
                    </div>
                    <ul className="space-y-1">
                      {module.capabilities.map((capability, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Edge Computing Tab */}
        {activeTab === "edge" && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {edgeModules.map((module, index) => (
                <Card
                  key={index}
                  className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <module.icon className={`w-6 h-6 ${module.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">
                        {module.category}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{module.name}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {module.description}
                  </p>
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-foreground/90">
                      Capabilities:
                    </div>
                    <ul className="space-y-1">
                      {module.capabilities.map((capability, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* External Link */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <a
                      href={module.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {module.link.name}
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Infrastructure Automation Tab */}
        {activeTab === "automation" && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {automationModules.map((module, index) => (
                <Card
                  key={index}
                  className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <module.icon className={`w-6 h-6 ${module.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">
                        {module.category}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{module.name}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {module.description}
                  </p>
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-foreground/90">
                      Capabilities:
                    </div>
                    <ul className="space-y-1">
                      {module.capabilities.map((capability, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* External Link */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <a
                      href={module.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {module.link.name}
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Technical Specifications Summary */}
        <div className="max-w-5xl mx-auto mt-16">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Platform Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  Open Source
                </div>
                <div className="text-sm text-muted-foreground">
                  Braiins OS+ firmware and BCB-100 control boards
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  95% Efficient
                </div>
                <div className="text-sm text-muted-foreground">
                  Chilldyne direct-to-chip liquid cooling
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  Zero Trust
                </div>
                <div className="text-sm text-muted-foreground">
                  Tailscale WireGuard-based network security
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
