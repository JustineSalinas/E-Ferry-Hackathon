'use client'

import React, { useState, useEffect } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Map, { Marker, Source, Layer } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'

import { Home, Radio, BarChart3, Banknote, Settings, Anchor } from 'lucide-react'

// ─── Mock Data ────────────────────────────────────────────────────────────────

const passengerData = [
  { day: 'Apr 1', passengerVolume: 1200 },
  { day: 'Apr 2', passengerVolume: 1250 },
  { day: 'Apr 3', passengerVolume: 1100 },
  { day: 'Apr 4', passengerVolume: 1300 },
  { day: 'Apr 5', passengerVolume: 1400 },
  { day: 'Apr 6', passengerVolume: 1420 },
  { day: 'Apr 7', passengerVolume: 1380 },
]

const revenueData = [
  { day: 'Apr 1', revenue: 60000 },
  { day: 'Apr 2', revenue: 62500 },
  { day: 'Apr 3', revenue: 55000 },
  { day: 'Apr 4', revenue: 65000 },
  { day: 'Apr 5', revenue: 70000 },
  { day: 'Apr 6', revenue: 71000 },
  { day: 'Apr 7', revenue: 69000 },
]

const routes = [
  {
    route: 'Iloilo–Guimaras',
    tripsToday: 24,
    onTime: 98.1,
    fuelSaved: 42.5,
    status: 'Active',
  },
  {
    route: 'Jordan Wharf–Parola',
    tripsToday: 18,
    onTime: 96.4,
    fuelSaved: 31.0,
    status: 'Active',
  },
  {
    route: 'Ortiz–Buenavista',
    tripsToday: 12,
    onTime: 97.5,
    fuelSaved: 28.3,
    status: 'Reduced',
  },
]

const navItems = [
  { icon: <Home className="w-5 h-5" />, label: 'Overview', key: 'overview' },
  { icon: <Radio className="w-5 h-5" />, label: 'Telemetry', key: 'telemetry' },
  { icon: <BarChart3 className="w-5 h-5" />, label: 'Bankability Score', key: 'bankability' },
  { icon: <Banknote className="w-5 h-5" />, label: 'Subsidies & Loans', key: 'subsidies' },
  { icon: <Settings className="w-5 h-5" />, label: 'Settings', key: 'settings' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({
  value,
  color = 'bg-primary',
  height = 'h-2',
}: {
  value: number
  color?: string
  height?: string
}) {
  return (
    <div className={`w-full bg-secondary rounded-full ${height} overflow-hidden`}>
      <div
        className={`${color} ${height} rounded-full transition-all duration-700`}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  )
}

function StatCard({
  title,
  value,
  sub,
  subColor = 'text-teal-600',
}: {
  title: string
  value: string
  sub: string
  subColor?: string
}) {
  return (
    <Card className="bg-card/50 backdrop-blur-md border border-border/40 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <CardHeader className="pb-1">
        <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-foreground">{value}</p>
        <p className={`text-sm mt-1 font-medium ${subColor}`}>{sub}</p>
      </CardContent>
    </Card>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

import { useSharedState } from '@/lib/useSharedState'

export default function OperatorDashboard() {
  const [activeNav, setActiveNav] = useState('overview')
  const [mounted, setMounted] = useState(false)
  const [isSimulating, setIsSimulating] = useState(false)
  const [liveScore, setLiveScore] = useState(780)
  const [loans, setLoans] = useSharedState<any[]>('marineSync_loans', [])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Telemetry Simulation Loop
  const [vesselPositions, setVesselPositions] = useState({
    route1: { longitude: 122.5822, latitude: 10.6969 }, // Iloilo to Jordan
    route2: { longitude: 122.6180, latitude: 10.6865 }, // Buenavista to Iloilo
    route3: { longitude: 122.9416, latitude: 10.6750 }, // Bacolod to Buenavista
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating) {
      const startTime = Date.now();
      interval = setInterval(() => {
        // Score fluctuation
        setLiveScore(prev => {
          const change = Math.floor(Math.random() * 3) - 0.5;
          return Math.min(1000, Math.max(0, Math.round(prev + change)));
        });

        // Calculate positions along the route lines using a simple sine wave for back-and-forth motion
        const elapsed = (Date.now() - startTime) / 1000;
        
        // Iloilo (122.5822, 10.6969) to Jordan (122.5957, 10.6583)
        const t1 = (Math.sin(elapsed / 15 * Math.PI) + 1) / 2; // 15s dur
        // Buenavista (122.6180, 10.6865) to Iloilo (122.5822, 10.6969)
        const t2 = (Math.sin(elapsed / 25 * Math.PI) + 1) / 2; // 25s dur
        // Bacolod (122.9416, 10.6750) to Buenavista (122.6180, 10.6865)
        const t3 = (Math.sin(elapsed / 20 * Math.PI) + 1) / 2; // 20s dur

        setVesselPositions({
          route1: {
            longitude: 122.5822 + (122.5957 - 122.5822) * t1,
            latitude: 10.6969 + (10.6583 - 10.6969) * t1,
          },
          route2: {
            longitude: 122.6180 + (122.5822 - 122.6180) * t2,
            latitude: 10.6865 + (10.6969 - 10.6865) * t2,
          },
          route3: {
            longitude: 122.9416 + (122.6180 - 122.9416) * t3,
            latitude: 10.6750 + (10.6865 - 10.6750) * t3,
          }
        });

      }, 100); // Fast update for smooth map marker animation
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  const handleApplyLoan = () => {
    const newLoan = {
      id: `loan-${Date.now()}`,
      name: 'Iloilo Ferry Co.',
      score: liveScore,
      loan: '₱1,500,000',
      vessels: 12,
      status: 'pending'
    };
    setLoans([...loans, newLoan]);
    alert("Loan Application Submitted! The underwriting bank will see it immediately.");
  };

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* ── Top Navigation ── */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-background/80 backdrop-blur-md h-14 flex items-center px-6 shadow-sm border-b border-border/40">
        <div className="flex items-center gap-3 flex-1">
          <Anchor className="w-5 h-5 text-primary" />
          <span className="text-foreground font-extrabold text-xl tracking-tight">
            Marine<span className="text-primary">Sync</span>
          </span>
          <span className="text-muted-foreground text-sm hidden sm:block">|</span>
          <span className="text-muted-foreground text-sm hidden sm:block font-medium">
            Operator Dashboard
          </span>
        </div>
        <div className="flex items-center gap-4">

          <span className="text-muted-foreground text-xs hidden md:block">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
          <Link
            href="/login"
            className="text-muted-foreground text-sm hover:text-foreground transition-colors"
          >
            Logout
          </Link>
        </div>
      </header>

      {/* ── Left Sidebar ── */}
      <aside className="fixed top-14 left-0 bottom-0 z-20 w-56 bg-secondary/50 backdrop-blur-md flex flex-col py-6 shadow-xl border-r border-border/40">
        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const isActive = activeNav === item.key
            return (
              <button
                key={item.key}
                onClick={() => setActiveNav(item.key)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left w-full
                  ${
                    isActive
                      ? 'border-l-4 border-primary text-primary bg-primary/10 pl-2'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80 border-l-4 border-transparent'
                  }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="mt-auto px-4 pb-2">
          <div className="bg-card/50 backdrop-blur-md border border-border/40 rounded-lg p-3">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Operator</p>
            <p className="text-foreground text-sm font-semibold">Iloilo Ferry Co.</p>
            <p className="text-muted-foreground text-xs mt-0.5">License #IFC-2024-0032</p>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="ml-56 pt-14 min-h-screen">
        <div className="p-6 space-y-6 max-w-7xl">

          {/* Page Header */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {activeNav === 'overview' && 'Operations Overview'}
                {activeNav === 'telemetry' && 'Fleet Telemetry'}
                {activeNav === 'bankability' && 'Bankability Score'}
                {activeNav === 'subsidies' && 'Subsidies & Loans'}
                {activeNav === 'settings' && 'Account Settings'}
              </h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                {activeNav === 'overview' && 'Wednesday, 21 May 2026 · Fleet performance summary'}
                {activeNav === 'telemetry' && 'Real-time vessel tracking and route performance'}
                {activeNav === 'bankability' && 'Live credit scoring for ESG financing'}
                {activeNav === 'subsidies' && 'Matched green maritime funds and loans'}
                {activeNav === 'settings' && 'Manage your operator profile and preferences'}
              </p>
            </div>
            <Badge className="bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/30 text-xs px-3 py-1">
              ● All Systems Operational
            </Badge>
          </div>

          {activeNav === 'overview' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* ── 1. Overview Stat Cards ── */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard
              title="Today's Passengers"
              value="1,342"
              sub="▲ +8% vs yesterday"
              subColor="text-teal-600 dark:text-teal-400"
            />
            <StatCard
              title="Daily Revenue"
              value="₱67,100"
              sub="▲ +12% vs yesterday"
              subColor="text-teal-600 dark:text-teal-400"
            />
            <StatCard
              title="Active Vessels"
              value="12"
              sub="All operational"
              subColor="text-muted-foreground"
            />
            <StatCard
              title="Route Consistency"
              value="97.3%"
              sub="30-day rolling average"
              subColor="text-primary"
            />
          </div>


            </div>
          )}

          {activeNav === 'bankability' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* ── 2. Bankability Score Widget ── */}
              <Card className="bg-card/50 backdrop-blur-md border border-border/40 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardHeader className="pb-2 border-b border-border/40">
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground text-lg font-bold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" /> Marine Bankability Score
                </CardTitle>
                <Badge className="bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/30 font-semibold tracking-wide text-xs px-3 py-1">
                  ✓ ELIGIBLE FOR FINANCING
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Score Display */}
                <div className="flex flex-col items-center lg:items-start min-w-[180px]">
                  <p className="text-7xl font-black bg-gradient-to-br from-primary to-primary/50 text-transparent bg-clip-text leading-none transition-all duration-300">
                    {liveScore}
                  </p>
                  <p className="text-muted-foreground text-sm font-medium mt-1">/ 1000</p>
                  <div className="mt-4 w-full min-w-[160px]">
                    <ProgressBar value={Math.round(liveScore / 10)} height="h-3" color="bg-primary" />
                    <p className="text-xs text-muted-foreground mt-1 text-center">{Math.round(liveScore / 10)}th percentile</p>
                  </div>
                </div>

                {/* Score Factors */}
                <div className="flex-1 space-y-5 w-full">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-3">
                    Score Breakdown
                  </p>

                  {/* Factor 1 */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">
                          Route Consistency
                        </span>
                        <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                          40% weight
                        </span>
                      </div>
                      <span className="text-sm font-bold text-primary">92 / 100</span>
                    </div>
                    <ProgressBar value={92} height="h-2.5" color="bg-primary" />
                  </div>

                  {/* Factor 2 */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">
                          Average Daily Revenue
                        </span>
                        <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                          60% weight
                        </span>
                      </div>
                      <span className="text-sm font-bold text-primary">72 / 100</span>
                    </div>
                    <ProgressBar value={72} height="h-2.5" color="bg-primary" />
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-6 border-t border-border/40 pt-4 flex items-center gap-2">
                <Settings className="w-3.5 h-3.5" /> Score updated daily based on 30-day telemetry average · Next update in 14 hours
              </p>
            </CardContent>
          </Card>



              {/* Placeholder for Bankability History */}
              <Card className="bg-card/50 backdrop-blur-md border border-border/40 shadow-lg p-8 text-center flex flex-col items-center justify-center opacity-60">
                <BarChart3 className="w-8 h-8 text-muted-foreground mb-3" />
                <p className="text-foreground font-semibold">Historical Trend Analysis</p>
                <p className="text-sm text-muted-foreground mt-1">Unlock 6-month predictive scoring in Pro plan</p>
              </Card>
            </div>
          )}

          {activeNav === 'overview' && (
            <div className="space-y-6 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              {/* ── 3. Charts Row ── */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {/* Passenger Volume Area Chart */}
            <Card className="bg-card/50 backdrop-blur-md border border-border/40 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <CardHeader className="pb-1">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Passenger Volume (7 days)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={passengerData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      axisLine={false}
                      tickLine={false}
                      domain={[900, 1600]}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid hsl(var(--border))',
                        backgroundColor: 'hsl(var(--card))',
                        color: 'hsl(var(--card-foreground))',
                        fontSize: '12px',
                      }}
                      formatter={(value: any) => [Number(value).toLocaleString(), 'Passengers']}
                    />
                    <Area
                      type="monotone"
                      dataKey="passengerVolume"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorPv)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue Bar Chart */}
            <Card className="bg-card/50 backdrop-blur-md border border-border/40 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <CardHeader className="pb-1">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Ticket Revenue (7 days)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={revenueData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v: number) => `₱${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      cursor={{ fill: 'hsl(var(--secondary))', opacity: 0.4 }}
                      contentStyle={{
                        borderRadius: '8px',
                        border: '1px solid hsl(var(--border))',
                        backgroundColor: 'hsl(var(--card))',
                        color: 'hsl(var(--card-foreground))',
                        fontSize: '12px',
                      }}
                      formatter={(value: any) => [`₱${Number(value).toLocaleString()}`, 'Revenue']}
                    />
                    <Bar
                      dataKey="revenue"
                      fill="url(#colorRev)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>


            </div>
          )}

          {activeNav === 'subsidies' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* ── 4. Subsidy Matcher Card ── */}
              <div className="rounded-xl bg-gradient-to-r from-primary to-primary/80 p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              {/* Left: Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-primary-foreground/80 text-xs uppercase tracking-widest font-semibold mb-1 flex items-center gap-2">
                    Matched Subsidy Opportunity
                  </p>
                  <h2 className="text-primary-foreground text-2xl font-bold">
                    Iloilo Green Maritime Fund
                  </h2>
                  <p className="text-primary-foreground/90 text-sm mt-1">
                    Hybrid solar-wind kit conversion · Loan amount:{' '}
                    <span className="text-primary-foreground font-semibold">₱1,500,000</span>
                  </p>
                </div>

                {/* Rate Breakdown */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="bg-background/10 rounded-lg px-4 py-2 text-center min-w-[90px]">
                    <p className="text-primary-foreground/80 text-xs mb-0.5">Standard Rate</p>
                    <p className="text-primary-foreground font-bold text-xl">8%</p>
                  </div>
                  <span className="text-primary-foreground/60 text-xl font-light">→</span>
                  <div className="bg-background/10 rounded-lg px-4 py-2 text-center min-w-[120px]">
                    <p className="text-primary-foreground/80 text-xs mb-0.5">Subsidy Covers</p>
                    <p className="text-primary-foreground font-bold text-xl">−5%</p>
                  </div>
                  <span className="text-primary-foreground/60 text-xl font-light">→</span>
                  <div className="bg-teal-500/20 border border-teal-400/40 rounded-lg px-4 py-2 text-center min-w-[90px]">
                    <p className="text-primary-foreground/80 text-xs mb-0.5">Your Rate</p>
                    <p className="text-teal-300 font-extrabold text-2xl">3%</p>
                  </div>
                </div>

                <p className="text-primary-foreground/80 text-xs">
                  Automatically matched based on your Bankability Score and route data
                </p>
              </div>

              {/* Right: CTA */}
              <div className="flex flex-col items-start lg:items-end gap-3">
                <Button onClick={handleApplyLoan} className="bg-background text-foreground hover:bg-secondary font-bold px-6 py-3 text-sm shadow-md transition-all">
                  Generate Loan Packet & Apply →
                </Button>
                <p className="text-primary-foreground/80 text-xs lg:text-right">
                  Estimated savings vs standard rate:{' '}
                  <span className="text-teal-300 font-semibold">₱75,000/yr</span>
                </p>
              </div>
            </div>
          </div>



              {/* Available Grants Placeholder */}
              <Card className="bg-card/50 backdrop-blur-md border border-border/40 shadow-lg">
                <CardHeader className="pb-2 border-b border-border/40">
                  <CardTitle className="text-foreground font-bold text-base flex items-center gap-2">
                    <Banknote className="w-5 h-5 text-primary" /> Other Available Grants
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 text-center opacity-60">
                  <p className="text-foreground font-semibold">No other matching grants found at this time.</p>
                  <p className="text-sm text-muted-foreground mt-1">We continuously scan the DBP and LandBank databases for new programs.</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeNav === 'telemetry' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Live Vessel Tracking Map */}
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold">Visayas Routes</h2>
                <Button 
                  onClick={() => setIsSimulating(!isSimulating)}
                  variant={isSimulating ? "destructive" : "default"}
                  className="shadow-sm"
                >
                  {isSimulating ? "Stop Simulation" : "Simulate Live Voyage"}
                </Button>
              </div>
              <Card className="bg-card/80 backdrop-blur-md border border-border/40 shadow-xl overflow-hidden relative group h-[400px]">
                {/* Overlay UI */}
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm border-border text-foreground text-xs shadow-sm font-semibold px-2 py-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse mr-1.5 inline-block" />
                    Live AIS Feed
                  </Badge>
                  <Badge variant="outline" className="bg-background/90 backdrop-blur-sm text-muted-foreground text-xs shadow-sm px-2 py-1">
                    Region: Visayas
                  </Badge>
                </div>

                <div className="absolute top-4 right-4 z-10 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-4 shadow-sm text-xs font-medium min-w-[160px]">
                  <p className="text-muted-foreground mb-3 font-semibold uppercase tracking-wider text-[10px]">Active Fleet</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" /> IFC-01</span>
                    <span className="text-muted-foreground">14 kts</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" /> IFC-02</span>
                    <span className="text-muted-foreground">Docked</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-teal-500" /> IFC-03 <span className="text-[9px] text-teal-600 bg-teal-500/10 px-1 rounded">EV</span></span>
                    <span className="text-teal-600 font-bold">12 kts</span>
                  </div>
                </div>

                {/* Interactive MapLibre Map Component */}
                <div className="absolute inset-0 z-0">
                  <Map
                    initialViewState={{
                      longitude: 122.75, // Center of Visayas ports
                      latitude: 10.68,
                      zoom: 10.5
                    }}
                    mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
                    interactive={true}
                    dragPan={true}
                    scrollZoom={true}
                  >
                    {/* Routes (GeoJSON) */}
                    <Source id="routes" type="geojson" data={{
                      type: 'FeatureCollection',
                      features: [
                        { type: 'Feature', properties: { color: '#0ea5e9' }, geometry: { type: 'LineString', coordinates: [[122.5822, 10.6969], [122.5957, 10.6583]] } }, // Iloilo - Jordan
                        { type: 'Feature', properties: { color: '#0ea5e9' }, geometry: { type: 'LineString', coordinates: [[122.5822, 10.6969], [122.6180, 10.6865]] } }, // Iloilo - Buenavista
                        { type: 'Feature', properties: { color: '#14b8a6' }, geometry: { type: 'LineString', coordinates: [[122.6180, 10.6865], [122.9416, 10.6750]] } }, // Buenavista - Bacolod
                      ]
                    }}>
                      <Layer
                        id="route-lines"
                        type="line"
                        paint={{
                          'line-color': ['get', 'color'],
                          'line-width': 2,
                          'line-dasharray': [4, 4],
                          'line-opacity': 0.5
                        }}
                      />
                    </Source>

                    {/* Ports Markers */}
                    <Marker longitude={122.5822} latitude={10.6969} anchor="center">
                      <div className="flex flex-col items-center cursor-pointer group">
                        <div className="w-3 h-3 bg-card border-2 border-primary rounded-full group-hover:scale-125 transition-transform shadow-md" />
                        <span className="mt-1 text-[10px] font-bold text-foreground bg-background/80 px-1.5 py-0.5 rounded backdrop-blur whitespace-nowrap opacity-70 group-hover:opacity-100 shadow-sm border border-border/50">Iloilo City Port</span>
                      </div>
                    </Marker>
                    <Marker longitude={122.5957} latitude={10.6583} anchor="center">
                      <div className="flex flex-col items-center cursor-pointer group">
                        <div className="w-3 h-3 bg-card border-2 border-primary rounded-full group-hover:scale-125 transition-transform shadow-md" />
                        <span className="mt-1 text-[10px] font-bold text-foreground bg-background/80 px-1.5 py-0.5 rounded backdrop-blur whitespace-nowrap opacity-70 group-hover:opacity-100 shadow-sm border border-border/50">Jordan Wharf</span>
                      </div>
                    </Marker>
                    <Marker longitude={122.6180} latitude={10.6865} anchor="center">
                      <div className="flex flex-col items-center cursor-pointer group">
                        <div className="w-3 h-3 bg-card border-2 border-primary rounded-full group-hover:scale-125 transition-transform shadow-md" />
                        <span className="mt-1 text-[10px] font-bold text-foreground bg-background/80 px-1.5 py-0.5 rounded backdrop-blur whitespace-nowrap opacity-70 group-hover:opacity-100 shadow-sm border border-border/50">Buenavista Port</span>
                      </div>
                    </Marker>
                    <Marker longitude={122.9416} latitude={10.6750} anchor="center">
                      <div className="flex flex-col items-center cursor-pointer group">
                        <div className="w-3 h-3 bg-card border-2 border-primary rounded-full group-hover:scale-125 transition-transform shadow-md" />
                        <span className="mt-1 text-[10px] font-bold text-foreground bg-background/80 px-1.5 py-0.5 rounded backdrop-blur whitespace-nowrap opacity-70 group-hover:opacity-100 shadow-sm border border-border/50">Bacolod BREDCO</span>
                      </div>
                    </Marker>

                    {/* Vessel Markers (Live Simulation) */}
                    <Marker longitude={vesselPositions.route1.longitude} latitude={vesselPositions.route1.latitude} anchor="center">
                      <div className="relative">
                        <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_hsl(var(--primary))]" />
                        {isSimulating && <div className="absolute inset-0 w-3 h-3 border border-primary rounded-full animate-ping" />}
                      </div>
                    </Marker>
                    <Marker longitude={vesselPositions.route2.longitude} latitude={vesselPositions.route2.latitude} anchor="center">
                      <div className="relative">
                        <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_hsl(var(--primary))]" />
                      </div>
                    </Marker>
                    <Marker longitude={vesselPositions.route3.longitude} latitude={vesselPositions.route3.latitude} anchor="center">
                      <div className="relative">
                        <div className="w-3.5 h-3.5 bg-teal-500 rounded-full shadow-sm" />
                        {isSimulating && <div className="absolute inset-0 w-3.5 h-3.5 border border-teal-500 rounded-full animate-ping" />}
                      </div>
                    </Marker>
                  </Map>
                </div>
              </Card>

              {/* ── 5. Route Telemetry Table ── */}
              <Card className="bg-card/50 backdrop-blur-md border border-border/40 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardHeader className="pb-2 border-b border-border/40">
              <CardTitle className="text-foreground font-bold text-base flex items-center gap-2">
                <Radio className="w-5 h-5 text-primary" /> Route Telemetry — Live Feed
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary/50 border-b border-border/40">
                      <th className="text-left text-xs text-muted-foreground uppercase tracking-wider font-semibold px-6 py-3">
                        Route
                      </th>
                      <th className="text-right text-xs text-muted-foreground uppercase tracking-wider font-semibold px-4 py-3">
                        Trips Today
                      </th>
                      <th className="text-right text-xs text-muted-foreground uppercase tracking-wider font-semibold px-4 py-3">
                        On-Time %
                      </th>
                      <th className="text-right text-xs text-muted-foreground uppercase tracking-wider font-semibold px-4 py-3">
                        Fuel Saved (L)
                      </th>
                      <th className="text-center text-xs text-muted-foreground uppercase tracking-wider font-semibold px-6 py-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {routes.map((row, i) => (
                      <tr
                        key={i}
                        className="hover:bg-secondary/30 transition-colors"
                      >
                        <td className="px-6 py-4 font-semibold text-foreground">
                          {row.route}
                        </td>
                        <td className="px-4 py-4 text-right text-muted-foreground tabular-nums">
                          {row.tripsToday}
                        </td>
                        <td className="px-4 py-4 text-right tabular-nums">
                          <span
                            className={
                              row.onTime >= 97
                                ? 'text-teal-600 dark:text-teal-400 font-semibold'
                                : 'text-amber-600 dark:text-amber-400 font-semibold'
                            }
                          >
                            {row.onTime}%
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right text-teal-700 dark:text-teal-400 font-semibold tabular-nums">
                          {row.fuelSaved.toFixed(1)} L
                        </td>
                        <td className="px-6 py-4 text-center">
                          {row.status === 'Active' ? (
                            <Badge className="bg-primary/10 text-primary border border-primary/30 text-xs font-semibold px-3">
                              ● Active
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-semibold px-3">
                              ▼ Reduced
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-secondary/30 border-t border-border/40">
                      <td className="px-6 py-3 text-xs text-muted-foreground font-medium" colSpan={5}>
                        Showing 3 of 12 active routes · Data refreshes every 5 minutes
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
              </Card>
            </div>
          )}

          {activeNav === 'settings' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="bg-card/50 backdrop-blur-md border border-border/40 shadow-lg max-w-2xl mx-auto">
                <CardHeader className="pb-4 border-b border-border/40">
                  <CardTitle className="text-foreground font-bold text-lg flex items-center gap-2">
                    <Settings className="w-5 h-5 text-primary" /> Profile & Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Operator Name</label>
                    <input type="text" disabled value="Iloilo Ferry Co." className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Email Address</label>
                    <input type="email" disabled value="admin@iloiloferry.ph" className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Alert Preferences</label>
                    <div className="flex items-center justify-between p-3 border border-border rounded-md bg-background">
                      <span className="text-sm">Receive email when Bankability Score changes</span>
                      <input type="checkbox" defaultChecked className="accent-primary w-4 h-4" />
                    </div>
                  </div>
                  <Button className="w-full font-bold">Save Preferences</Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Bottom padding */}
          <div className="h-8" />
        </div>
      </main>
    </div>
  )
}
