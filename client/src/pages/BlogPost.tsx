import { useRoute, Link } from "wouter";
import { Calendar, Tag, ArrowLeft, Share2, Twitter, Linkedin, Mail, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

// Blog post type definition
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
}

// Sample blog posts data (same as Blog.tsx)
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Introducing TerraHash Stack: The Future of Bitcoin Mining Infrastructure",
    excerpt: "Discover how TerraHash Stack is revolutionizing bitcoin mining with open-source technology, AI-powered optimization, and direct-to-chip cooling for unprecedented efficiency.",
    content: `
# The Future of Bitcoin Mining is Here

TerraHash Stack represents a paradigm shift in bitcoin mining infrastructure. By combining open-source hardware, AI-powered software agents, and cutting-edge cooling technology, we've created a platform that delivers unprecedented efficiency and profitability.

## Key Innovations

### Open-Source Foundation
Our commitment to open-source stewardship means transparency, community collaboration, and continuous improvement. Every component of TerraHash Stack is built on open standards, ensuring interoperability and avoiding vendor lock-in.

### AI-Powered Optimization
Autonomous AI agents continuously monitor and optimize every aspect of your mining operation:
- Real-time performance tuning
- Predictive maintenance alerts
- Dynamic power management
- Automated failover and recovery

### Direct-to-Chip Cooling
Partnering with Chilldyne, we've integrated direct-to-chip liquid cooling that delivers:
- 40% energy savings compared to air cooling
- 700% greater cooling efficiency
- 100% leak-proof operation with patented negative pressure technology
- Extended equipment lifespan by 40%

## Results That Matter

Early adopters of TerraHash Stack are seeing remarkable improvements:
- **65% reduction** in operational costs
- **69% improvement** in uptime
- **30% increase** in hash rate efficiency
- **95% cooling efficiency** vs traditional systems

## Getting Started

Whether you're building a new facility or retrofitting an existing operation, TerraHash Stack provides the tools and technology you need to compete in today's mining landscape.

Ready to evolve your mining operation? [Contact us](#contact) to schedule a consultation.
    `,
    category: "TerraHash Updates",
    date: "2024-11-01",
    author: "Elvis Nuno",
    image: "/terrahash-logo.png",
    tags: ["TerraHash Stack", "Innovation", "Mining Technology"],
  },
  {
    id: "2",
    title: "40% Equipment Lifespan Extension: How Direct-to-Chip Cooling Changes Everything",
    excerpt: "Learn how Chilldyne's patented negative pressure cooling technology extends ASIC lifespan by 40% while reducing energy consumption and operational costs.",
    content: `
# The Cooling Revolution

Heat is the enemy of mining hardware. Traditional air cooling systems struggle to keep ASICs at optimal temperatures, leading to thermal throttling, reduced performance, and premature hardware failure. Chilldyne's direct-to-chip liquid cooling changes everything.

## The Problem with Air Cooling

Air cooling has fundamental limitations:
- Inefficient heat transfer
- High energy consumption for HVAC
- Inconsistent cooling across racks
- Noise pollution
- Large physical footprint

## Direct-to-Chip Liquid Cooling

Chilldyne's patented negative pressure technology delivers liquid cooling directly to ASIC chips:

### 40% Energy Savings
By eliminating the need for massive HVAC systems and fans, liquid cooling reduces energy consumption by 40% compared to air-cooled facilities.

### 700% Greater Efficiency
Liquid cooling is 700% more efficient at heat transfer than air, keeping ASICs at optimal temperatures even under maximum load.

### 100% Leak-Proof
The negative pressure system ensures that any breach in the cooling loop pulls air in rather than pushing coolant out, making it completely leak-proof.

### Extended Lifespan
By maintaining consistent, optimal temperatures, ASICs last 40% longer, dramatically improving ROI and reducing e-waste.

## Real-World Impact

A 5MW facility retrofitted with Chilldyne cooling saw:
- Monthly energy costs reduced from $180K to $108K
- Zero thermal-related downtime in 12 months
- Hardware replacement cycles extended from 3 years to 4.2 years

## Future-Proof Your Operation

As mining difficulty increases and margins tighten, efficient cooling isn't optional—it's essential for survival. TerraHash Stack integrates Chilldyne cooling as a core component, ensuring your operation stays competitive.

[Learn more about retrofitting](#retrofitting) your facility with TerraHash Stack.
    `,
    category: "Technology",
    date: "2024-10-28",
    author: "Elvis Nuno",
    image: "/chilldyne-logo.png",
    tags: ["Cooling", "Hardware", "Efficiency"],
  },
  {
    id: "3",
    title: "Retrofitting Your Mining Facility: A Complete Guide",
    excerpt: "Thinking about upgrading your existing mining operation? This comprehensive guide covers everything you need to know about retrofitting with TerraHash Stack.",
    content: `
# Retrofitting Made Simple

Upgrading an existing mining facility can seem daunting, but with the right approach and technology, retrofitting delivers exceptional ROI without the downtime and expense of building from scratch.

## Why Retrofit?

### Common Pain Points
- Overheating and thermal throttling
- High energy costs
- Frequent hardware failures
- Limited monitoring and control
- Outdated infrastructure

### TerraHash Stack Solution
Our retrofitting service addresses all these challenges with a proven 4-phase process.

## The Retrofitting Process

### Phase 1: Assessment (2-4 weeks)
- Facility audit and analysis
- Infrastructure evaluation
- ROI projections
- Custom solution design

### Phase 2: Planning (4-6 weeks)
- Detailed engineering
- Equipment procurement
- Installation scheduling
- Team training

### Phase 3: Implementation (8-12 weeks)
- Infrastructure upgrades
- Cooling system installation
- Network deployment
- Software integration

### Phase 4: Optimization (Ongoing)
- Performance tuning
- AI agent training
- Continuous monitoring
- Regular maintenance

## Service Tiers

### Small (Up to 1MW)
Perfect for boutique operations
- 4-6 month timeline
- Modular deployment
- Starting at custom pricing

### Medium (1-10MW)
Ideal for growing facilities
- 6-9 month timeline
- Phased rollout
- Volume discounts available

### Large (10-50MW)
Enterprise-scale operations
- 9-12 month timeline
- Full infrastructure overhaul
- Dedicated support team

### Mega (50+MW)
Hyperscale deployments
- 12-18 month timeline
- Custom engineering
- Strategic partnership

## Expected Results

Facilities retrofitted with TerraHash Stack typically see:
- 65% reduction in OpEx
- 69% improvement in uptime
- 40% extended equipment lifespan
- 30% increase in hash rate efficiency

## Getting Started

Ready to transform your mining operation? [Download our retrofitting guide](#) or [schedule a consultation](#contact) to discuss your specific needs.
    `,
    category: "Mining Industry",
    date: "2024-10-25",
    author: "Elvis Nuno",
    image: "/ryno-logo.png",
    tags: ["Retrofitting", "Operations", "ROI"],
  },
  {
    id: "4",
    title: "ServerDomes: Biomimetic Architecture for Next-Gen Data Centers",
    excerpt: "Explore how ServerDomes' revolutionary dome architecture delivers 40% lower operating costs and 8-12 month build times for mining facilities.",
    content: `
# Nature-Inspired Infrastructure

ServerDomes brings biomimetic design principles to data center architecture, creating facilities that are more efficient, sustainable, and cost-effective than traditional rectangular buildings.

## The Dome Advantage

### 40% Lower Operating Costs
The dome's natural airflow patterns reduce cooling requirements by 40%, while the efficient structure minimizes construction and maintenance costs.

### Rapid Deployment
Modular construction enables 2MW-5MW facilities to be deployed in just 8-12 months, compared to 24-36 months for traditional data centers.

### Flexible Interior
Truss-free design provides maximum flexibility for high-density configurations, easily accommodating mining racks, cooling systems, and support infrastructure.

### Sustainability Built In
- No refrigerants required
- 90% reduction in water usage
- Low carbon footprint
- ESG-compliant design

## Perfect for Mining

ServerDomes facilities are ideal for hosting TerraHash Stack infrastructure:
- Ultra-bandwidth, low-latency fiber WAN
- Scalable from 2MW to 50+MW
- Optimized for high-density computing
- Future-proof architecture

## Real-World Performance

A 5MW ServerDomes facility hosting TerraHash Stack operations:
- Built in 10 months vs 30 months traditional
- 40% lower monthly operating costs
- 99.9% uptime over 18 months
- Seamless scaling to 10MW capacity

## The Future of Mining Infrastructure

As bitcoin mining becomes more competitive, infrastructure efficiency becomes a critical differentiator. ServerDomes + TerraHash Stack delivers the most cost-effective, scalable solution available.

[Contact us](#contact) to discuss ServerDomes deployment for your operation.
    `,
    category: "Technology",
    date: "2024-10-20",
    author: "Elvis Nuno",
    image: "/serverdomes-logo.png",
    tags: ["Infrastructure", "Data Centers", "Sustainability"],
  },
  {
    id: "5",
    title: "Ryno Crypto Services Joins Forces with Leading Infrastructure Partners",
    excerpt: "Announcing strategic partnerships with ServerDomes and Chilldyne to deliver unparalleled mining infrastructure solutions.",
    content: `
# Strategic Partnerships Announced

Ryno Crypto Services is proud to announce strategic partnerships with two industry-leading infrastructure providers: ServerDomes and Chilldyne. These partnerships enable us to deliver the most advanced, efficient mining infrastructure available.

## ServerDomes Partnership

ServerDomes' biomimetic dome architecture provides the ideal foundation for TerraHash Stack deployments:
- 40% lower operating costs
- 8-12 month build times
- Modular scalability
- Sustainable design

## Chilldyne Partnership

Chilldyne's direct-to-chip liquid cooling technology delivers unprecedented efficiency:
- 40% energy savings
- 700% greater cooling efficiency
- 100% leak-proof operation
- 40% extended equipment lifespan

## Integrated Solution

By combining ServerDomes infrastructure with Chilldyne cooling and TerraHash Stack technology, we offer a complete, turnkey solution that delivers:
- 65% reduction in operational costs
- 69% improvement in uptime
- 95% cooling efficiency
- 30% increase in hash rate

## What This Means for You

Whether you're building a new facility or retrofitting an existing operation, these partnerships enable us to deliver:
- Faster deployment timelines
- Lower total cost of ownership
- Better performance and reliability
- Future-proof infrastructure

## Get Started Today

Ready to leverage these partnerships for your mining operation? [Schedule a consultation](#contact) to discuss your specific needs.
    `,
    category: "Company News",
    date: "2024-10-15",
    author: "Elvis Nuno",
    image: "/ryno-logo.png",
    tags: ["Partnerships", "Company News", "Growth"],
  },
  {
    id: "6",
    title: "Zero-Trust Security in Bitcoin Mining: Why It Matters",
    excerpt: "Understanding the importance of zero-trust network architecture in protecting your mining operations from cyber threats.",
    content: `
# Security First

Bitcoin mining operations are high-value targets for cyber attacks. From ransomware to cryptojacking, the threats are real and evolving. TerraHash Stack implements zero-trust network architecture to protect your investment.

## The Zero-Trust Model

Traditional network security relies on perimeter defense—keeping bad actors out while trusting everything inside. Zero-trust assumes breach and verifies every access request, regardless of origin.

### Key Principles

1. **Verify Explicitly**: Authenticate and authorize every user, device, and connection
2. **Least Privilege Access**: Grant minimum necessary permissions
3. **Assume Breach**: Monitor and validate all activity continuously

## TerraHash Stack Security

### Tailscale Integration
We use Tailscale's zero-trust network to secure all infrastructure:
- WireGuard-based encryption
- Identity-based access control
- Mesh networking
- Automatic key rotation

### Network Segmentation
- Isolated management plane
- Separate data and control networks
- Hardware-level security boundaries

### Continuous Monitoring
AI agents monitor for:
- Anomalous network activity
- Unauthorized access attempts
- Configuration changes
- Performance anomalies

## Real-World Threats

Mining operations face multiple attack vectors:
- **Ransomware**: Encrypts systems and demands payment
- **Cryptojacking**: Hijacks hashrate for attacker's benefit
- **DDoS**: Disrupts operations and connectivity
- **Insider Threats**: Malicious or negligent employees

## Protection in Practice

A TerraHash Stack facility detected and blocked:
- 127 unauthorized access attempts in 30 days
- 3 potential ransomware infections
- 1 insider threat (terminated employee)
- Zero successful breaches

## Compliance and Auditing

Zero-trust architecture also helps with:
- SOC 2 compliance
- Insurance requirements
- Audit trails
- Incident response

## Secure Your Operation

Don't wait for a breach to take security seriously. TerraHash Stack builds security in from day one.

[Learn more](#technology) about TerraHash Stack's security architecture.
    `,
    category: "Technology",
    date: "2024-10-10",
    author: "Elvis Nuno",
    image: "/terrahash-logo.png",
    tags: ["Security", "Network", "Best Practices"],
  },
];

export default function BlogPost() {
  const [, params] = useRoute("/blog/:id");
  const postId = params?.id;
  
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="container mx-auto max-w-4xl px-4 pt-32 pb-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-foreground/70 mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  // Social sharing functions
  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(post.title);
    const body = encodeURIComponent(`Check out this article: ${window.location.href}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Article Header */}
      <article className="pt-32 pb-16">
        <div className="container mx-auto max-w-4xl px-4">
          {/* Back Button */}
          <Link href="/blog">
            <Button variant="outline" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          {/* Category and Date */}
          <div className="flex items-center gap-4 text-sm text-foreground/60 mb-6">
            <span className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

          {/* Author and Share */}
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                {post.author.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div className="font-medium">{post.author}</div>
                <div className="text-sm text-foreground/60">Author</div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground/60 mr-2 hidden sm:inline">
                <Share2 className="w-4 h-4 inline mr-1" />
                Share:
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={shareOnTwitter}
                className="gap-2"
              >
                <Twitter className="w-4 h-4" />
                <span className="hidden sm:inline">Twitter</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={shareOnLinkedIn}
                className="gap-2"
              >
                <Linkedin className="w-4 h-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={shareViaEmail}
                className="gap-2"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Email</span>
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video bg-muted rounded-lg mb-12 flex items-center justify-center overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-96 h-96 object-contain"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-invert max-w-none">
            {post.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('# ')) {
                return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{paragraph.replace('# ', '')}</h1>;
              } else if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{paragraph.replace('## ', '')}</h2>;
              } else if (paragraph.startsWith('### ')) {
                return <h3 key={index} className="text-xl font-bold mt-4 mb-2">{paragraph.replace('### ', '')}</h3>;
              } else if (paragraph.startsWith('- ')) {
                return <li key={index} className="ml-6 mb-2">{paragraph.replace('- ', '')}</li>;
              } else if (paragraph.includes('[') && paragraph.includes('](')) {
                // Simple link parsing
                const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
                const parts = paragraph.split(linkRegex);
                return (
                  <p key={index} className="mb-4 text-foreground/80 leading-relaxed">
                    {parts.map((part, i) => {
                      if (i % 3 === 1) {
                        return <a key={i} href={parts[i + 1]} className="text-primary hover:underline">{part}</a>;
                      } else if (i % 3 === 2) {
                        return null;
                      }
                      return part;
                    })}
                  </p>
                );
              } else if (paragraph.trim()) {
                return <p key={index} className="mb-4 text-foreground/80 leading-relaxed">{paragraph}</p>;
              }
              return null;
            })}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 bg-card/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                  <article className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer h-full flex flex-col">
                    <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="text-sm text-foreground/60 mb-3">
                        {new Date(relatedPost.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-foreground/70 text-sm line-clamp-3 flex-1">
                        {relatedPost.excerpt}
                      </p>
                      <span className="text-primary flex items-center gap-1 group-hover:gap-2 transition-all mt-4">
                        Read More <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
