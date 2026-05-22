import Link from "next/link";
import { ArrowLeft, BarChart2, Radio, ShieldCheck, Leaf, Landmark } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedBackground } from "@/components/animated-background";

export default function ScoreMethodologyPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] relative overflow-hidden selection:bg-[var(--color-accent-custom)] selection:text-white">
      <AnimatedBackground />
      
      {/* Navbar / Back Button */}
      <nav className="relative z-20 w-full max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--color-muted-custom)] hover:text-[var(--color-accent-custom)] transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Platform
        </Link>
      </nav>

      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-12 pb-24">
        <div className="mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-teal-500/10 border border-teal-500/20 rounded-xl mb-6">
            <BarChart2 className="w-6 h-6 text-[var(--color-teal)]" />
          </div>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-[var(--color-text)] leading-tight mb-4">
            Marine Bankability Score
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-muted-custom)] font-body max-w-2xl leading-relaxed">
            Our proprietary scoring engine synthesizes raw vessel data into a unified, institutional-grade credit score (0–1,000). Here is how we calculate it.
          </p>
        </div>

        <div className="space-y-6">
          {[
            {
              weight: "40%",
              title: "Propulsion & Telemetry Metrics",
              icon: <Radio className="w-6 h-6" />,
              description: "Direct IoT feeds measuring battery degradation, motor efficiency, and average fuel displacement. Consistent, efficient operation heavily boosts this core metric."
            },
            {
              weight: "30%",
              title: "Operator Compliance & Safety",
              icon: <ShieldCheck className="w-6 h-6" />,
              description: "Evaluates geofence adherence, maximum passenger capacity compliance, and route completion rates. Safe operators receive significantly lower risk premiums."
            },
            {
              weight: "20%",
              title: "ESG & Carbon Deltas",
              icon: <Leaf className="w-6 h-6" />,
              description: "Quantifies the exact tonnage of CO2 emissions avoided compared to legacy diesel baselines. Higher carbon deltas unlock specialized green infrastructure subsidies."
            },
            {
              weight: "10%",
              title: "DSCR & Financial Health",
              icon: <Landmark className="w-6 h-6" />,
              description: "Real-time Debt Service Coverage Ratio projections based on live ticket sales integration and drastically reduced daily fuel expenditure."
            }
          ].map((item, i) => (
            <Card key={i} className="bg-[var(--color-surface)] border border-[var(--color-border-custom)] shadow-sm hover:shadow-md hover:border-[var(--color-accent-custom)]/40 transition-all duration-300 rounded-2xl group overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="bg-[var(--color-surface-2)] md:w-32 flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-[var(--color-border-custom)]">
                  <span className="text-[var(--color-accent-custom)] font-display text-2xl font-bold">{item.weight}</span>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[var(--color-muted-custom)] mt-1">Weight</span>
                </div>
                <div className="flex-1 p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-accent-light)] text-[var(--color-accent-custom)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <CardTitle className="text-xl font-bold font-display text-[var(--color-text)]">
                      {item.title}
                    </CardTitle>
                  </div>
                  <CardContent className="p-0">
                    <p className="text-[var(--color-muted-custom)] leading-relaxed font-body">
                      {item.description}
                    </p>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
