import { Card } from "@/components/ui/card";
import { Linkedin, Mail, ExternalLink } from "lucide-react";

export default function Leadership() {
  const leaders = [
    {
      name: "Elvis Nuno",
      title: "Chief Executive Officer",
      bio: "Technical architect and open-source advocate leading TerraHash Stack development and cryptocurrency services. Elvis champions our commitment to open-source mining technology and community collaboration.",
      expertise: [
        "Blockchain Technology",
        "Open-Source Development",
        "System Architecture",
        "Technical Leadership",
      ],
      linkedin: "https://www.linkedin.com/in/elvis-nuno/",
      email: "dev@hashgrid.net",
      website: "https://enuno.github.io/DynamicCareerCanvas/",
    },
    {
      name: "Jacob Dobie",
      title: "Chief Operating Officer",
      bio: "Operational excellence expert focused on infrastructure deployment and optimizing mining facility performance. Jacob oversees all day-to-day operations, ensuring world-class service delivery and process optimization.",
      expertise: [
        "Infrastructure Deployment",
        "Operations Excellence",
        "Process Optimization",
        "Quality Assurance",
      ],
      linkedin: "https://www.linkedin.com/in/jacob-dobie-87759833/",
      email: "jdobie@rynonzs.com",
    },
    {
      name: "Ken Ward",
      title: "Co-Founder",
      bio: "Visionary leader with decades of experience in technology infrastructure and operations. Ken co-founded Ryno with a vision for sustainable, scalable bitcoin mining operations.",
      expertise: [
        "Technology Infrastructure",
        "Operations Management",
        "Strategic Planning",
        "Business Development",
      ],
      linkedin: "https://www.linkedin.com/in/ken-ward-238683b0/",
      email: "kenward@rynoes.com",
    },
    {
      name: "Patrick Kodjoe",
      title: "Co-Founder",
      bio: "Co-founder and strategic advisor with deep expertise in facility management and operational excellence. Patrick's vision helps shape Ryno's long-term growth and industry leadership.",
      expertise: [
        "Strategic Advisory",
        "Facility Management",
        "Business Strategy",
        "Industry Relations",
      ],
      linkedin: "https://www.linkedin.com/in/patkodjoe/",
      email: "patrick@rynoes.com",
    },
  ];

  return (
    <section id="leadership" className="py-24 bg-card/30 relative overflow-hidden">
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
            Leadership Team
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Our <span className="text-primary">Leaders</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Industry veterans driving innovation in sustainable bitcoin mining
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {leaders.map((leader, index) => (
            <Card
              key={index}
              className="p-8 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all group"
            >
              {/* Profile Image Placeholder */}
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-4 border-primary/30 group-hover:border-primary/50 transition-all">
                <div className="text-5xl font-bold text-primary">
                  {leader.name.split(" ").map(n => n[0]).join("")}
                </div>
              </div>

              {/* Name and Title */}
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold mb-1">{leader.name}</h3>
                <p className="text-primary font-medium">{leader.title}</p>
              </div>

              {/* Bio */}
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                {leader.bio}
              </p>

              {/* Expertise Tags */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3">Expertise:</h4>
                <div className="flex flex-wrap gap-2">
                  {leader.expertise.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Links */}
              <div className="flex justify-center gap-4 pt-4 border-t border-border">
                <a
                  href={leader.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${leader.email}`}
                  className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                  title="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                {leader.website && (
                  <a
                    href={leader.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                    title="Personal Website"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Team Values */}
        <div className="max-w-4xl mx-auto mt-20">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-6">
              Leadership <span className="text-primary">Philosophy</span>
            </h3>
            <p className="text-lg text-foreground/90 leading-relaxed text-center mb-6">
              Our leadership team is united by a shared commitment to open-source
              stewardship, technical excellence, and sustainable growth. We believe
              in transparent operations, community collaboration, and building
              long-term value for all stakeholders.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <p className="text-sm text-muted-foreground">
                  Combined Years of Experience
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <p className="text-sm text-muted-foreground">
                  Committed to Open Source
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <p className="text-sm text-muted-foreground">
                  Dedicated to Client Success
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
