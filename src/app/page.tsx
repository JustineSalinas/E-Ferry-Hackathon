import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans antialiased">
      {/* ─────────────────────────── NAVIGATION ─────────────────────────── */}
      <header className="bg-[#002D40] sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚓</span>
            <span className="text-white font-bold text-xl tracking-tight">
              MarineSync
            </span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {["How It Works", "Impact", "For Operators", "For Banks"].map(
              (label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-slate-300 hover:text-white text-sm font-medium transition-colors duration-150"
                >
                  {label}
                </a>
              )
            )}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="outline"
              className="border-slate-400 text-slate-200 bg-transparent hover:bg-white/10 hover:text-white text-sm"
            >
              <Link href="/login">Operator Login</Link>
            </Button>
            <Button
              asChild
              className="bg-[#005E7A] hover:bg-[#004d65] text-white text-sm"
            >
              <Link href="/login">Bank Portal</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section
        id="impact"
        className="bg-[#002D40] py-28 px-6 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-[#005E7A]/30 text-[#7ecfe4] border border-[#005E7A]/50 text-xs tracking-widest uppercase">
            Institutional-Grade Maritime Finance
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
            De-risking Electric Propulsion for{" "}
            <span className="text-[#7ecfe4]">Inter-Island Ferries</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            MarineSync is the digital brain behind E-Ferry conversions — turning
            real-time vessel telemetry and route performance into bankable,
            ESG-compliant loan packages for cooperatives and financial
            institutions alike.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[#005E7A] hover:bg-[#004d65] text-white px-8 py-3 text-base font-semibold shadow-lg"
            >
              <Link href="/login">Get Your Bankability Score</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white/10 px-8 py-3 text-base font-semibold"
            >
              <Link href="/login">View Pre-Vetted Portfolios</Link>
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="max-w-4xl mx-auto mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/10 pt-14">
          {[
            { value: "50,000+", unit: "Tons CO₂ Saved" },
            { value: "35%", unit: "Fuel Reduction" },
            { value: "12", unit: "Routes Optimized" },
          ].map(({ value, unit }) => (
            <div key={unit} className="flex flex-col items-center gap-1">
              <span className="text-4xl md:text-5xl font-extrabold text-[#7ecfe4]">
                {value}
              </span>
              <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                {unit}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────── HOW IT WORKS ─────────────────────────── */}
      <section id="how-it-works" className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#005E7A] text-sm font-semibold uppercase tracking-widest mb-2">
              The Platform
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#002D40]">
              How It Works
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Three integrated layers convert raw vessel data into institutional
              financing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: "☀️💨",
                title: "Hardware Layer",
                subtitle: "Hybrid Solar-Wind Controller",
                description:
                  "Each vessel is fitted with our proprietary Hybrid Solar-Wind Controller that harvests renewable energy, manages battery discharge cycles, and logs propulsion metrics at 1-second granularity.",
              },
              {
                step: "02",
                icon: "📡",
                title: "Telemetry Engine",
                subtitle: "Real-Time Data Ingestion",
                description:
                  "Onboard IoT nodes stream GPS position, fuel burn, battery state-of-health, and passenger load directly to the MarineSync cloud — processed in real time against route benchmarks.",
              },
              {
                step: "03",
                icon: "📊",
                title: "Marine Bankability Score",
                subtitle: "Credit Score · 0 – 1,000",
                description:
                  "Proprietary scoring engine aggregates 90-day telemetry history, operator compliance, DSCR projections, and ESG deltas into a single bankability score used by partner lenders.",
              },
            ].map(({ step, icon, title, subtitle, description }) => (
              <Card
                key={step}
                className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-2xl"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#005E7A] text-white text-xs font-bold">
                      {step}
                    </span>
                    <span className="text-2xl">{icon}</span>
                  </div>
                  <CardTitle className="text-[#002D40] text-lg font-bold">
                    {title}
                  </CardTitle>
                  <p className="text-[#005E7A] text-sm font-semibold">
                    {subtitle}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────── FOR OPERATORS ─────────────────────────── */}
      <section id="for-operators" className="bg-[#f0f6f9] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[#005E7A] text-sm font-semibold uppercase tracking-widest mb-2">
              For Operators
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#002D40]">
              Turn Your Route Data Into Capital
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Feature list */}
            <div className="space-y-6">
              {[
                {
                  heading: "Bankability Score System",
                  body: "Your 90-day operational track record is continuously scored on a 0–1,000 scale. A score above 700 automatically qualifies your cooperative for pre-approved loan packages from our institutional partners.",
                },
                {
                  heading: "Automated Subsidy Matching",
                  body: "MarineSync cross-references your route geography and vessel class against active national and multilateral green-shipping subsidy programs — surfacing matches you'd otherwise miss.",
                },
                {
                  heading: "Compliance Dashboard",
                  body: "Stay audit-ready. Real-time alerts flag deviations from MARINA and DOE regulatory requirements, protecting your score and your subsidy eligibility.",
                },
                {
                  heading: "Investor-Ready Reports",
                  body: "Generate one-click PDF or JSON data rooms with DSCR projections, CO₂ reduction curves, and route profitability analysis — formatted to bank underwriting standards.",
                },
              ].map(({ heading, body }) => (
                <div key={heading} className="flex gap-4">
                  <div className="mt-1 w-2 h-2 rounded-full bg-[#005E7A] flex-shrink-0" />
                  <div>
                    <p className="text-[#002D40] font-semibold text-sm mb-1">
                      {heading}
                    </p>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Mock Score Card */}
            <div className="flex justify-center">
              <Card className="w-full max-w-sm border-2 border-[#005E7A]/30 rounded-2xl shadow-xl bg-white">
                <CardHeader className="pb-2 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 uppercase tracking-widest font-medium">
                      Marine Bankability Score
                    </span>
                    <Badge className="bg-green-700 text-white text-xs font-semibold">
                      ELIGIBLE FOR FINANCING
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-5">
                  <div className="text-center">
                    <span className="text-6xl font-extrabold text-[#005E7A]">
                      780
                    </span>
                    <span className="text-2xl font-bold text-slate-400">
                      {" "}
                      / 1000
                    </span>
                    <p className="text-slate-400 text-xs mt-1 uppercase tracking-wider">
                      Composite Score
                    </p>
                  </div>

                  <div className="space-y-2">
                    {[
                      { label: "Operational Uptime", value: "97.2%" },
                      { label: "Fuel Efficiency", value: "↓ 31%" },
                      { label: "DSCR (Projected)", value: "1.42×" },
                      { label: "ESG Delta", value: "−22 tCO₂" },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="flex justify-between items-center py-1.5 border-b border-slate-100 last:border-0"
                      >
                        <span className="text-slate-500 text-xs">{label}</span>
                        <span className="text-[#002D40] text-xs font-semibold">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    asChild
                    className="w-full bg-[#005E7A] hover:bg-[#004d65] text-white text-sm font-semibold"
                  >
                    <Link href="/login">View Full Report →</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── FOR INSTITUTIONS ─────────────────────────── */}
      <section id="for-banks" className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[#005E7A] text-sm font-semibold uppercase tracking-widest mb-2">
              For Financial Institutions
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#002D40]">
              Pre-Vetted, De-Risked Loan Packages
            </h2>
            <p className="text-slate-500 mt-3 max-w-2xl leading-relaxed">
              Access a curated pipeline of E-Ferry conversion loans — each
              complete with verified telemetry history, DSCR projections, and
              ESG quota contributions — delivered through the MarineSync Kanban
              Credit Portal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {[
              {
                icon: "🗂️",
                title: "Kanban Credit Portal",
                body: "Visualise your entire pipeline from Application → In Review → Approved → Disbursed with real-time status synced to operator telemetry.",
              },
              {
                icon: "📉",
                title: "Live DSCR Metrics",
                body: "Debt Service Coverage Ratios are not modelled — they are back-tested against 90 days of actual vessel revenue and fuel-cost data.",
              },
              {
                icon: "🌿",
                title: "ESG Quota Tracking",
                body: "Each approved loan is tagged with verified CO₂ reduction tonnage, helping institutions meet green-portfolio mandates and regulatory ESG targets.",
              },
            ].map(({ icon, title, body }) => (
              <Card
                key={title}
                className="border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-2">
                  <span className="text-3xl mb-2 block">{icon}</span>
                  <CardTitle className="text-[#002D40] text-base font-bold">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500 text-sm leading-relaxed">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mock Pipeline Table */}
          <Card className="border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-slate-50 px-6 py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#002D40] text-sm font-bold uppercase tracking-wide">
                  Active Loan Pipeline — Sample View
                </CardTitle>
                <Badge
                  variant="outline"
                  className="text-[#005E7A] border-[#005E7A] text-xs"
                >
                  Live Data
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="text-left px-6 py-3 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                      Cooperative
                    </th>
                    <th className="text-left px-6 py-3 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                      Route
                    </th>
                    <th className="text-left px-6 py-3 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                      Score
                    </th>
                    <th className="text-left px-6 py-3 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                      Loan Amount
                    </th>
                    <th className="text-left px-6 py-3 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      coop: "Batangas Bay Ferry Coop",
                      route: "Batangas → Calapan",
                      score: 780,
                      amount: "₱12.4M",
                      status: "Approved",
                      color: "bg-green-700",
                    },
                    {
                      coop: "Visayas Green Maritime",
                      route: "Cebu → Bohol",
                      score: 714,
                      amount: "₱8.9M",
                      status: "In Review",
                      color: "bg-amber-500",
                    },
                    {
                      coop: "Mindanao Blue Shipping",
                      route: "Davao → Samal",
                      score: 651,
                      amount: "₱6.2M",
                      status: "Pending",
                      color: "bg-slate-400",
                    },
                  ].map(({ coop, route, score, amount, status, color }) => (
                    <tr
                      key={coop}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-[#002D40]">
                        {coop}
                      </td>
                      <td className="px-6 py-4 text-slate-500">{route}</td>
                      <td className="px-6 py-4 font-bold text-[#005E7A]">
                        {score}
                      </td>
                      <td className="px-6 py-4 text-slate-700 font-medium">
                        {amount}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          className={`${color} text-white text-xs font-semibold`}
                        >
                          {status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ─────────────────────────── FOOTER ─────────────────────────── */}
      <footer className="bg-[#002D40] py-14 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <span className="text-xl">⚓</span>
              <span className="text-white font-bold text-lg tracking-tight">
                MarineSync
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
              The digital infrastructure layer for bankable, ESG-compliant
              E-Ferry conversions across the Philippine archipelago.
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-slate-500 text-xs">
              © 2026 MarineSync Technologies, Inc. All rights reserved.
            </p>
            <p className="text-slate-600 text-xs mt-1">
              Regulated maritime fintech. All data encrypted in transit and at
              rest.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
