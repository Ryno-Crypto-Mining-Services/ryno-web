export default function LogoShowcase() {
  return (
    <section className="py-16 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Ryno Crypto Services Logo */}
            <div className="flex flex-col items-center justify-center p-8 bg-card/30 rounded-xl border border-border hover:border-primary/50 transition-all">
              <img
                src="/ryno-logo-transparent.png"
                alt="Ryno Crypto Services"
                className="w-full max-w-md h-auto mb-4"
              />
              <p className="text-center text-muted-foreground text-sm">
                Premier Bitcoin Mining Facility Operator
              </p>
            </div>

            {/* TerraHash Stack Logo */}
            <div className="flex flex-col items-center justify-center p-8 bg-card/30 rounded-xl border border-border hover:border-primary/50 transition-all">
              <img
                src="/terrahash-logo-transparent.png"
                alt="TerraHash Stack"
                className="w-full max-w-md h-auto mb-4"
              />
              <p className="text-center text-muted-foreground text-sm">
                Next-Generation Mining Platform Technology
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
