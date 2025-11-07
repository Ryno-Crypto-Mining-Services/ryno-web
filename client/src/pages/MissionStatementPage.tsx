import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function MissionStatementPage() {
  const coreValues = [
    {
      number: "1",
      title: "OPEN SOURCE STEWARDSHIP AND COMMUNITY LEADERSHIP",
      summary: "Make mining technology open and share it freely so everyone can benefit.",
      description:
        "We are committed practitioners of open-source development and recognized leaders within the global mining development community. We contribute significant engineering resources to foundational projects like BraiinsOS, actively participate in mining protocol discussions, mentor emerging developers, and share knowledge freely. Our leadership in open-source mining technology reflects our belief that Bitcoin's security and decentralization are strengthened when mining innovation is transparent, auditable, and accessible to all participants—not gatekept by proprietary interests. We measure success not only by our own operational performance but by the velocity and quality of innovation flowing through the entire mining ecosystem.",
    },
    {
      number: "2",
      title: "EFFICIENCY THROUGH INNOVATION",
      summary:
        "Constantly improve mining technology and operations, sharing our innovations with the community to make mining more efficient and resilient for everyone.",
      description:
        "We obsessively pursue technical excellence in mining operations, continuously optimizing hardware performance, thermal management, and energy utilization. Every improvement compounds—whether through direct-to-chip liquid cooling, autonomous AI tuning, heat recovery systems, or firmware enhancements—we engineer solutions and release them to the community that outpace network difficulty and market volatility. Our innovations are validated in production operations and shared to accelerate industry-wide progress.",
    },
    {
      number: "3",
      title: "AUTONOMY AND DECENTRALIZATION",
      summary:
        "Give miners full control and freedom by using open tools that avoid lock-in and support independence from any single provider.",
      description:
        "We believe in empowering individuals and organizations to control their own mining destiny. Our platform leverages open-source firmware, non-custodial financial tools, and edge computing to minimize dependence on centralized intermediaries—reflecting bitcoin's core ethos of sovereignty and self-determination. We actively resist vendor lock-in and ensure miners maintain portability and optionality regardless of infrastructure provider.",
    },
    {
      number: "4",
      title: "SUSTAINABILITY AS COMPETITIVE ADVANTAGE",
      summary:
        "Use clean energy and resource recovery to make mining more profitable and sustainable for the long term.",
      description:
        "Bitcoin mining powered by renewable energy, waste heat recovery, and responsible thermal management is not merely ethical—it's economically superior. We integrate sustainable energy partnerships and circular economy principles to reduce operational costs, access favorable power pricing, and build community relationships that ensure long-term profitability and regulatory acceptance.",
    },
    {
      number: "5",
      title: "PROOF OF WORK ECONOMICS",
      summary:
        "Real value in bitcoin mining comes from visible effort, investment, and productive work—not speculation.",
      description:
        "We honor the principle that valuable creation requires tangible effort—energy conversion, capital investment, engineering expertise, and operational discipline. Our systems are designed to transparently demonstrate the real-world work underlying mining operations, building trust with stakeholders and positioning bitcoin mining as productive industrial infrastructure rather than speculative trading.",
    },
    {
      number: "6",
      title: "TRANSPARENCY AND INTEGRITY",
      summary:
        "Transparency in financials, performance, and technology builds trust and accountability for miners and the open-source community.",
      description:
        "We operate with radical transparency in our financial modeling, performance reporting, and technology partnerships. From conservative revenue projections to candid risk disclosure to open-source code contributions, we earn customer trust through honest communication and accountability, establishing Ryno as the operator miners can confidently partner with and the organization the open-source community can trust to maintain ethical stewardship.",
    },
    {
      number: "7",
      title: "SCALABLE EXCELLENCE",
      summary:
        "Scaling to any size is possible while always keeping quality, reliability, and results high.",
      description:
        "We architect systems that maintain quality and reliability as we scale from sub-$100K enthusiast operations to 5-100MW+ commercial and industrial scale facilities. Our modular platform, standardized processes, and rigorous quality controls ensure that growth never compromises operational integrity or customer outcomes.",
    },
    {
      number: "8",
      title: "COMMUNITY STEWARDSHIP",
      summary:
        "Success in mining comes from building strong relationships and contributing value to local communities, developers, and the Bitcoin ecosystem.",
      description:
        "Mining operations are embedded in multiple communities—local geographic communities, the global open-source developer community, and the broader Bitcoin ecosystem. We invest in long-term relationships across all communities: stable power agreements with utilities, heat recovery contracts with agricultural and industrial partners, workforce development, collaborative relationships with hardware manufacturers and firmware developers, transparent engagement with regulators and industry peers, and meaningful contributions to open-source projects that transcend commercial advantage. Bitcoin mining succeeds when it strengthens, not extracts from, its surrounding ecosystems.",
    },
    {
      number: "9",
      title: "BITCOIN MAXIMALISM GROUNDED IN PRAGMATISM",
      summary:
        "Bitcoin is held as superior money, but practical strategies balance fiat requirements and market realities so long-term holdings are never sold for short-term gains.",
      description:
        "We are philosophically committed to bitcoin as superior monetary technology, while pragmatically acknowledging the operational realities of fiat-denominated costs, institutional requirements, and market dynamics. Our treasury management and diversified revenue strategies ensure we never sacrifice long-term bitcoin holdings for short-term fiat pressures—embodying the ethos of holders, not traders.",
    },
  ];

  const strategicImperatives = [
    {
      title: "Lead the open-source mining development movement",
      description:
        "Through significant engineering contributions, developer community engagement, mentorship programs, and transparent collaboration with Braiins, pool operators, and independent firmware developers. Establish Ryno as the go-to operational partner for validating and scaling new mining technology innovations.",
    },
    {
      title: "Build defensible competitive advantages",
      description:
        "Through proprietary operational excellence and insights (AI optimization, deployment patterns, facility design) while maintaining commitment to open-source infrastructure that cannot be proprietary. Our sustainable supply chain partnerships, facility engineering, and autonomous management capabilities represent structural advantages competitors cannot quickly replicate.",
    },
    {
      title: "Prioritize customer success over rapid growth",
      description:
        "Our net promoter score, retention rates, and profitability per-customer reflect commitment to delivering sustained value. Open-source contributions create a halo effect that strengthens trust with both customers and the broader developer community.",
    },
    {
      title: "Advance bitcoin's institutional legitimacy",
      description:
        "By operating as transparent, compliant, professional mining infrastructure—demonstrating that bitcoin mining is productive industrial work worthy of major capital, regulatory acceptance, and long-term investment. Open-source leadership amplifies this positioning by showing bitcoin mining strengthens decentralization rather than threatening it.",
    },
    {
      title: "Reinvest profits strategically",
      description:
        "Into technology, geographic expansion, organizational capability, and open-source infrastructure to maintain market leadership through inevitable market cycles. Allocate dedicated budget to open-source development as a core business function, not a discretionary marketing activity.",
    },
    {
      title: "Balance extraction with regeneration",
      description:
        "Mining operations that generate wealth while healing ecosystems, supporting communities, advancing renewable energy, and strengthening the decentralized Bitcoin protocol create sustainable competitive moats and align incentives across all stakeholder groups.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <img
                src="/ryno-logo.png"
                alt="Ryno Crypto Services"
                className="h-12 w-auto hover:opacity-80 transition-opacity cursor-pointer"
              />
            </Link>
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Content */}
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Title */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Corporate Mission Statement <br />
                <span className="text-primary">and Core Values</span>
              </h1>
            </div>

            {/* Mission Statement */}
            <Card className="p-8 md:p-12 mb-16 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
              <h2 className="text-3xl font-bold mb-6 text-center">MISSION STATEMENT</h2>
              <p className="text-lg leading-relaxed">
                Ryno Crypto Services and our core technology TerraHash Stack are
                pioneering <strong>sustainable, autonomous bitcoin mining operations that
                maximize efficiency, profitability, and environmental stewardship</strong>{" "}
                through innovative liquid cooling, AI-driven optimization, and
                decentralized finance integration. We empower miners from enthusiasts to
                institutional operators to scale profitably while advancing the bitcoin
                ecosystem. As stewards of open-source mining technology and leading
                contributors to the global open-source mining development movement, we
                accelerate the democratization of mining and strengthen the resilience of
                the Bitcoin network through transparent, community-driven innovation.
              </p>
            </Card>

            {/* Core Values */}
            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-12 text-center">
                CORE <span className="text-primary">VALUES</span>
              </h2>
              <div className="space-y-8">
                {coreValues.map((value, index) => (
                  <Card
                    key={index}
                    className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-border"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                        {value.number}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                        <p className="text-muted-foreground italic mb-4">
                          {value.summary}
                        </p>
                      </div>
                    </div>
                    <p className="text-foreground/90 leading-relaxed pl-14">
                      {value.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Strategic Imperatives */}
            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-6 text-center">
                STRATEGIC <span className="text-primary">IMPERATIVES</span>
              </h2>
              <p className="text-lg text-muted-foreground text-center mb-12">
                These core values inform our strategic priorities:
              </p>
              <div className="space-y-6">
                {strategicImperatives.map((imperative, index) => (
                  <Card
                    key={index}
                    className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all"
                  >
                    <h3 className="text-lg font-bold mb-3 text-primary">
                      {index + 1}. {imperative.title}
                    </h3>
                    <p className="text-foreground/90 leading-relaxed">
                      {imperative.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Why These Values Matter */}
            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
              <h2 className="text-3xl font-bold mb-6 text-center">
                WHY THESE VALUES <span className="text-primary">MATTER</span>
              </h2>
              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                  Ryno's differentiation rests not merely on hardware or software, but on{" "}
                  <strong>clarity of purpose and authentic community integration</strong>.
                  We operate in an industry historically perceived as environmentally
                  irresponsible and driven by speculation. By anchoring our organization
                  to verifiable values—open-source stewardship, sustainability, autonomy,
                  transparency, and genuine community participation—we transform mining
                  from a marginalized activity into a{" "}
                  <strong>legitimate, scalable infrastructure business</strong> worthy of
                  institutional capital, regulatory acceptance, developer collaboration,
                  and long-term customer partnerships.
                </p>
                <p>
                  Our leadership in open-source mining technology differentiates us from
                  competitors by positioning Ryno not as a vendor seeking to extract value
                  from miners, but as{" "}
                  <strong>stewards committed to strengthening Bitcoin itself</strong>. This
                  authenticity creates gravitational pull among developers, operators, and
                  regulators who increasingly view open-source infrastructure as essential
                  to Bitcoin's long-term resilience. Every technical decision, hiring
                  choice, partner negotiation, open-source contribution, and customer
                  engagement either reinforces or undermines these values. Maintaining
                  discipline around our core values is what separates market leaders from
                  commoditized competitors in the mining space.
                </p>
              </div>
            </Card>

            {/* CTA */}
            <div className="text-center mt-16">
              <Link href="/">
                <Button size="lg" className="text-lg px-8">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
