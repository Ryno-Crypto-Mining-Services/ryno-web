import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "technical" | "retrofitting";
}

const faqItems: FAQItem[] = [
  {
    id: "general-1",
    category: "general",
    question: "What is Ryno Crypto Services?",
    answer:
      "Ryno Crypto Services is a premier bitcoin mining facility operator and technology provider. We develop and deploy the TerraHash Stack, an advanced mining infrastructure platform that combines open-source hardware, AI-driven software, and sustainable practices to deliver exceptional mining performance.",
  },
  {
    id: "general-2",
    category: "general",
    question: "What is the TerraHash Stack?",
    answer:
      "TerraHash Stack is our proprietary mining infrastructure platform consisting of hardware modules (Braiins BCB-100 ASICs, Chilldyne cooling systems), software agents for optimization and monitoring, and network infrastructure using Tailscale for zero-trust security. It delivers 40% extended lifespan, 69% uptime improvement, and 95% cooling efficiency.",
  },
  {
    id: "general-3",
    category: "general",
    question: "How does TerraHash Stack improve mining operations?",
    answer:
      "TerraHash Stack improves operations through advanced cooling efficiency (95%), AI-driven optimization agents, real-time monitoring, zero-trust network security, and modular architecture. This results in extended hardware lifespan, reduced operational costs, improved uptime, and better profitability.",
  },
  {
    id: "general-4",
    category: "general",
    question: "Is TerraHash Stack open-source?",
    answer:
      "Yes, TerraHash Stack is built on open-source foundations including Linux, Kubernetes, and various mining software. We believe in open-source stewardship and transparency in our technology stack.",
  },
  {
    id: "retrofitting-1",
    category: "retrofitting",
    question: "What is the retrofitting service?",
    answer:
      "Our retrofitting service helps existing mining operations upgrade their facilities with TerraHash Stack technology. We provide modular solutions in four tiers (Small, Medium, Large, Mega) that can be integrated into your current infrastructure without complete replacement.",
  },
  {
    id: "retrofitting-2",
    category: "retrofitting",
    question: "How long does a retrofitting project take?",
    answer:
      "Retrofitting timelines vary based on facility size and complexity. Small operations typically take 2-4 weeks, Medium 4-8 weeks, Large 8-12 weeks, and Mega facilities 12+ weeks. We work with your schedule to minimize operational disruption.",
  },
  {
    id: "retrofitting-3",
    category: "retrofitting",
    question: "What are the different retrofitting service tiers?",
    answer:
      "We offer four service tiers: Small (up to 100 miners), Medium (100-500 miners), Large (500-2000 miners), and Mega (2000+ miners). Each tier includes hardware upgrades, cooling system installation, software deployment, and training. Custom solutions are available for unique requirements.",
  },
  {
    id: "retrofitting-4",
    category: "retrofitting",
    question: "Can TerraHash Stack work with my existing hardware?",
    answer:
      "TerraHash Stack is designed to work with modern ASIC miners including Braiins BCB-100 and compatible hardware. We assess your current equipment during the consultation phase and provide recommendations for optimal integration.",
  },
  {
    id: "technical-1",
    category: "technical",
    question: "What hardware does TerraHash Stack use?",
    answer:
      "TerraHash Stack uses Braiins BCB-100 ASICs as the primary mining hardware, Chilldyne advanced cooling systems for thermal management, modular rack infrastructure, and comprehensive sensor networks for monitoring. All components are selected for reliability and efficiency.",
  },
  {
    id: "technical-2",
    category: "technical",
    question: "How does the cooling system work?",
    answer:
      "Our Chilldyne cooling system achieves 95% efficiency through advanced heat recovery, liquid cooling loops, and AI-optimized fan control. The system monitors temperature in real-time and adjusts cooling dynamically to maintain optimal operating conditions while minimizing energy consumption.",
  },
  {
    id: "technical-3",
    category: "technical",
    question: "What monitoring and management capabilities are included?",
    answer:
      "TerraHash Stack includes comprehensive monitoring through AI agents that track hashrate, temperature, power consumption, and hardware health. Real-time dashboards provide visibility into all metrics, automated alerts notify you of issues, and the system optimizes performance continuously.",
  },
  {
    id: "technical-4",
    category: "technical",
    question: "How secure is the TerraHash Stack network?",
    answer:
      "Security is built into TerraHash Stack through Tailscale zero-trust network architecture, encrypted communications, role-based access control, and continuous monitoring. All data is encrypted in transit and at rest, and the system provides audit logs for compliance.",
  },
];

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<"general" | "technical" | "retrofitting">("general");

  const categories = [
    { id: "general", label: "General" },
    { id: "technical", label: "Technical" },
    { id: "retrofitting", label: "Retrofitting" },
  ];

  const filteredItems = faqItems.filter((item) => item.category === activeCategory);

  return (
    <section id="faq" className="py-24 bg-card/30 relative overflow-hidden">
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
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about Ryno Crypto Services and TerraHash Stack
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id as "general" | "technical" | "retrofitting");
                  setExpandedId(null);
                }}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-background border border-border text-foreground hover:border-primary"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-background border border-border rounded-lg overflow-hidden transition-all hover:border-primary/50"
              >
                <button
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-card/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-foreground text-left">
                    {item.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                      expandedId === item.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedId === item.id && (
                  <div className="px-6 py-4 bg-card/30 border-t border-border">
                    <p className="text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 p-8 bg-primary/5 border border-primary/20 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-2">Didn't find your answer?</h3>
            <p className="text-muted-foreground mb-6">
              Get in touch with our team for personalized support and technical consultation.
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
