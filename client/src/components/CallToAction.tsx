import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-24 bg-gradient-to-r from-primary/10 via-background to-primary/5 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(50, 184, 198, 0.5) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA Card */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                Ready to Transform Your Mining?
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Your Mining Evolution Today
            </h2>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the next generation of bitcoin mining operators. Discover how
              TerraHash Stack can increase your efficiency, reduce costs, and
              maximize profitability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="gap-2 text-base font-semibold px-8 py-6"
              >
                Schedule a Consultation
                <ArrowRight className="w-5 h-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-base font-semibold px-8 py-6"
              >
                Download Whitepaper
              </Button>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
              <div className="text-3xl font-bold text-primary mb-2">40%</div>
              <p className="text-muted-foreground">
                Increase in ASIC lifespan with direct-to-chip cooling
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
              <div className="text-3xl font-bold text-primary mb-2">69%</div>
              <p className="text-muted-foreground">
                Improvement in facility uptime with autonomous management
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <p className="text-muted-foreground">
                Cooling efficiency with renewable energy integration
              </p>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
