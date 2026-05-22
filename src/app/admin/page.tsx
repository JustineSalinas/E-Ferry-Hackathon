'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  Ship, Landmark, Activity, ShieldCheck, TrendingUp, Anchor, 
  Users, Banknote, AlertTriangle, FileText, CheckCircle2, XCircle, Ban, Bell
} from 'lucide-react'

// ─── Main page ────────────────────────────────────────────────────────────────

const navGroups = [
  {
    title: 'Core',
    items: [
      { key: 'overview', label: 'Dashboard Overview', icon: <Activity className="w-5 h-5" /> },
    ]
  },
  {
    title: 'Lending & Finance',
    items: [
      { key: 'loans', label: 'Loan Pipeline', icon: <FileText className="w-5 h-5" /> },
      { key: 'payments', label: 'Payments & Billing', icon: <Banknote className="w-5 h-5" /> },
    ]
  },
  {
    title: 'Directory & Users',
    items: [
      { key: 'borrowers', label: 'Borrowers (Operators)', icon: <Ship className="w-5 h-5" /> },
      { key: 'institutions', label: 'Institutions & LGUs', icon: <Landmark className="w-5 h-5" /> },
      { key: 'investors', label: 'Independent Investors', icon: <Users className="w-5 h-5" /> },
    ]
  }
]

export default function AdminPage() {
  const [activeNav, setActiveNav] = useState('overview')
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) return null;

  // Reusable Action Buttons for Tables
  const ActionButtons = ({ status, type }: { status: string, type?: 'loan' | 'payment' }) => (
    <div className="flex gap-2 justify-end">
      {status === 'Pending' && (
        <>
          <Button size="sm" className="h-7 text-[10px] bg-teal-600 hover:bg-teal-700 px-2">Approve</Button>
          <Button size="sm" variant="destructive" className="h-7 text-[10px] px-2">Reject</Button>
        </>
      )}
      {status === 'Active' && type !== 'payment' && (
        <Button size="sm" variant="outline" className="h-7 text-[10px] border-destructive text-destructive hover:bg-destructive/10 px-2">
          Deactivate
        </Button>
      )}
      {status === 'Overdue' && (
        <Button size="sm" variant="outline" className="h-7 text-[10px] border-amber-500 text-amber-500 hover:bg-amber-500/10 px-2">
          Flag & Alert
        </Button>
      )}
      {type === 'loan' && status === 'Funded' && (
        <Button size="sm" className="h-7 text-[10px] bg-teal-600 hover:bg-teal-700 px-2">Disburse</Button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-background font-sans transition-colors duration-300">
      {/* ── Top Navigation Bar ─────────────────────────────────────────── */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border/60 px-6 py-0 flex items-center justify-between h-14 sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded bg-primary flex items-center justify-center">
            <Anchor className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-foreground font-bold text-lg tracking-tight">
            MarineSync
          </span>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-foreground text-sm font-semibold tracking-wide flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-500" /> Full Approver Access
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary border-2 border-primary/20 flex items-center justify-center">
              <span className="text-xs font-bold text-white">SA</span>
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-foreground text-xs font-medium">System Admin</span>
            </div>
          </div>
          <div className="h-5 w-px bg-border/60" />
          <Link href="/login" className="text-muted-foreground hover:text-foreground text-xs font-medium transition-colors">
            Logout
          </Link>
        </div>
      </header>

      {/* ── Sidebar ── */}
      <aside className="fixed top-14 left-0 bottom-0 z-20 w-60 bg-secondary/30 backdrop-blur-md flex flex-col py-6 shadow-xl border-r border-border/40 overflow-y-auto">
        <nav className="flex flex-col gap-6 px-3">
          {navGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 mb-1">
                {group.title}
              </p>
              {group.items.map((item) => {
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
                    <span className="flex-1">{item.label}</span>
                  </button>
                )
              })}
            </div>
          ))}
        </nav>
      </aside>

      {/* ── Main Content Container ── */}
      <div className="ml-60 flex-1 flex flex-col min-h-[calc(100vh-3.5rem)]">
        <main className="px-8 py-8 max-w-[1600px] w-full mx-auto space-y-8">
          
          {/* ========================================== */}
          {/* 1. DASHBOARD OVERVIEW (6 KPIs)             */}
          {/* ========================================== */}
          {activeNav === 'overview' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground tracking-tight">Executive Dashboard</h1>
                  <p className="text-sm text-muted-foreground mt-1">Real-time system-wide KPIs and risk metrics</p>
                </div>
              </div>

              {/* The 6 Core KPIs requested by user */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                
                {/* 1. Total Funds Disbursed */}
                <Card className="bg-card/80 backdrop-blur-sm border border-border/50 shadow-md hover:border-primary/50 transition-all">
                  <CardContent className="p-5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-4">1. Total Funds Disbursed</p>
                    <p className="text-3xl font-black text-foreground">₱482.5M</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="text-teal-500 font-bold">▲ 12.4%</span> this quarter
                    </div>
                  </CardContent>
                </Card>

                {/* 2. Active Loans & Repayment Rate */}
                <Card className="bg-card/80 backdrop-blur-sm border border-border/50 shadow-md hover:border-primary/50 transition-all">
                  <CardContent className="p-5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-4">2. Active Loans & Repayment</p>
                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-black text-foreground">1,204</p>
                      <p className="text-2xl font-bold text-teal-600 dark:text-teal-500">98.2%</p>
                    </div>
                    <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                      <span>Active Contracts</span>
                      <span>Repayment Rate</span>
                    </div>
                  </CardContent>
                </Card>

                {/* 3. Overdue / Defaulted Payments */}
                <Card className="bg-card/80 backdrop-blur-sm border border-destructive/20 shadow-md hover:border-destructive/50 transition-all">
                  <CardContent className="p-5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-4">3. Overdue / Defaulted</p>
                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-black text-amber-500">18</p>
                      <p className="text-2xl font-bold text-destructive">2</p>
                    </div>
                    <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                      <span>Overdue (15+ days)</span>
                      <span>Defaulted</span>
                    </div>
                  </CardContent>
                </Card>

                {/* 4. Active Ferry Operators */}
                <Card className="bg-card/80 backdrop-blur-sm border border-border/50 shadow-md hover:border-primary/50 transition-all">
                  <CardContent className="p-5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-4">4. Active Borrowers</p>
                    <p className="text-3xl font-black text-primary">342</p>
                    <div className="mt-3 flex gap-3 text-[10px] text-muted-foreground uppercase font-bold">
                      <span>42 Coops</span> • <span>210 Fisherfolks</span> • <span>90 Bangkew</span>
                    </div>
                  </CardContent>
                </Card>

                {/* 5. Investor Count & Commission Paid */}
                <Card className="bg-card/80 backdrop-blur-sm border border-border/50 shadow-md hover:border-primary/50 transition-all">
                  <CardContent className="p-5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-4">5. Investors & Commissions</p>
                    <div className="flex items-end justify-between">
                      <p className="text-3xl font-black text-foreground">85</p>
                      <p className="text-2xl font-bold text-teal-600">₱12.4M</p>
                    </div>
                    <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                      <span>Independent Investors</span>
                      <span>Total Yield Paid</span>
                    </div>
                  </CardContent>
                </Card>

                {/* 6. Total CO2 Reduction */}
                <Card className="bg-card/80 backdrop-blur-sm border border-teal-500/20 shadow-md bg-teal-500/5 hover:border-teal-500/50 transition-all">
                  <CardContent className="p-5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-500 mb-4 flex items-center gap-2">
                      <Activity className="w-3 h-3" /> 6. ESG Impact: CO₂ Reduction
                    </p>
                    <p className="text-3xl font-black text-teal-600 dark:text-teal-400">8.5M tons</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-teal-700/80 dark:text-teal-500/80">
                      <span>Verified via live telemetry</span>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* 2. LOAN PIPELINE & DISBURSEMENT            */}
          {/* ========================================== */}
          {activeNav === 'loans' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Pipeline & Disbursement</h1>
                  <p className="text-sm text-muted-foreground">Workflow: Funding → State Change → Approve → Active</p>
                </div>
              </div>

              <Card className="bg-card/80 border-border/50 shadow-md">
                <table className="w-full text-sm text-left">
                  <thead className="bg-secondary/50 text-[10px] uppercase font-bold text-muted-foreground">
                    <tr>
                      <th className="px-5 py-4">Borrower</th>
                      <th className="px-5 py-4">Amount</th>
                      <th className="px-5 py-4">Workflow State</th>
                      <th className="px-5 py-4">Amortization Details</th>
                      <th className="px-5 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    <tr className="hover:bg-muted/30">
                      <td className="px-5 py-4 font-medium">Bacolod Transit (Coop)</td>
                      <td className="px-5 py-4 font-bold text-primary">₱2,500,000</td>
                      <td className="px-5 py-4"><Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20">Funded (Awaiting Approval)</Badge></td>
                      <td className="px-5 py-4 text-xs text-muted-foreground">Int: 8% | Prin: 92% (Monthly)</td>
                      <td className="px-5 py-4"><ActionButtons status="Funded" type="loan" /></td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="px-5 py-4 font-medium">Juan Dela Cruz (Fisherfolk)</td>
                      <td className="px-5 py-4 font-bold text-primary">₱150,000</td>
                      <td className="px-5 py-4"><Badge className="bg-teal-500/10 text-teal-500 border-teal-500/20">Active / Live</Badge></td>
                      <td className="px-5 py-4 text-xs text-muted-foreground">Int: 5% | Prin: 95% (Weekly)</td>
                      <td className="px-5 py-4 text-right"><Button variant="ghost" size="sm" className="h-7 text-xs">View Schedule</Button></td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="px-5 py-4 font-medium">Sitio Bangkew Association</td>
                      <td className="px-5 py-4 font-bold text-primary">₱800,000</td>
                      <td className="px-5 py-4"><Badge variant="outline" className="text-muted-foreground">Drafting</Badge></td>
                      <td className="px-5 py-4 text-xs text-muted-foreground">--</td>
                      <td className="px-5 py-4 text-right"><Button variant="ghost" size="sm" className="h-7 text-xs">Review App</Button></td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </div>
          )}

          {/* ========================================== */}
          {/* 3. PAYMENTS & BILLING MODULE               */}
          {/* ========================================== */}
          {activeNav === 'payments' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Payments Processing & Allocation</h1>
                  <p className="text-sm text-muted-foreground">Split allocations: Principal, Interest, Fees & Penalties. Trigger SMS/Email Billing.</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5 mb-6">
                <Card className="bg-card/80 border border-border/50 shadow-sm p-4 text-center"><p className="text-xs text-muted-foreground uppercase font-bold mb-1">Due This Week</p><p className="text-2xl font-black">₱4.2M</p></Card>
                <Card className="bg-card/80 border border-border/50 shadow-sm p-4 text-center"><p className="text-xs text-muted-foreground uppercase font-bold mb-1">Collected</p><p className="text-2xl font-black text-teal-500">₱3.8M</p></Card>
                <Card className="bg-card/80 border border-amber-500/50 shadow-sm p-4 text-center bg-amber-500/5"><p className="text-xs text-amber-600 uppercase font-bold mb-1">Automated Billing Alerts</p><p className="text-2xl font-black text-amber-600">42 Sent</p></Card>
              </div>

              <Card className="bg-card/80 border-border/50 shadow-md">
                <table className="w-full text-sm text-left">
                  <thead className="bg-secondary/50 text-[10px] uppercase font-bold text-muted-foreground">
                    <tr>
                      <th className="px-5 py-4">Borrower</th>
                      <th className="px-5 py-4">Payment Amount</th>
                      <th className="px-5 py-4">Allocation Split (Prin / Int / Fee)</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    <tr className="hover:bg-muted/30">
                      <td className="px-5 py-4 font-medium">BDO Loan #892</td>
                      <td className="px-5 py-4 font-bold">₱45,000</td>
                      <td className="px-5 py-4 text-xs">₱35k / ₱10k / ₱0</td>
                      <td className="px-5 py-4"><Badge className="bg-teal-500/10 text-teal-500">Paid</Badge></td>
                      <td className="px-5 py-4 text-right"><Button variant="ghost" size="sm" className="h-7 text-xs">Receipt</Button></td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="px-5 py-4 font-medium">Maria S. (Fisherfolk)</td>
                      <td className="px-5 py-4 font-bold text-amber-500">₱8,500</td>
                      <td className="px-5 py-4 text-xs text-muted-foreground">Pending Allocation</td>
                      <td className="px-5 py-4"><Badge variant="outline" className="text-amber-500 border-amber-500">Overdue</Badge></td>
                      <td className="px-5 py-4"><ActionButtons status="Overdue" type="payment" /></td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </div>
          )}

          {/* ========================================== */}
          {/* 4. BORROWERS (OPERATORS/FISHERFOLKS)       */}
          {/* ========================================== */}
          {activeNav === 'borrowers' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Borrower Records</h1>
                  <p className="text-sm text-muted-foreground">Manage Cooperatives, Bangkew Operators, and Fisherfolks</p>
                </div>
              </div>

              <Card className="bg-card/80 border-border/50 shadow-md">
                <table className="w-full text-sm text-left">
                  <thead className="bg-secondary/50 text-[10px] uppercase font-bold text-muted-foreground">
                    <tr>
                      <th className="px-5 py-4">Borrower Name</th>
                      <th className="px-5 py-4">Record Type</th>
                      <th className="px-5 py-4">Risk Score</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    <tr className="hover:bg-muted/30">
                      <td className="px-5 py-4 font-medium text-foreground">Iloilo-Guimaras Association</td>
                      <td className="px-5 py-4 text-muted-foreground">Cooperative</td>
                      <td className="px-5 py-4 font-bold text-teal-500">780</td>
                      <td className="px-5 py-4"><Badge className="bg-primary/10 text-primary">Active</Badge></td>
                      <td className="px-5 py-4"><ActionButtons status="Active" /></td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="px-5 py-4 font-medium text-foreground">San Juan Bangkew Group</td>
                      <td className="px-5 py-4 text-muted-foreground">Bangkew</td>
                      <td className="px-5 py-4 font-bold text-amber-500">610</td>
                      <td className="px-5 py-4"><Badge variant="outline">Pending</Badge></td>
                      <td className="px-5 py-4"><ActionButtons status="Pending" /></td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="px-5 py-4 font-medium text-foreground">Pedro Santos</td>
                      <td className="px-5 py-4 text-muted-foreground">Fisherfolk</td>
                      <td className="px-5 py-4 font-bold text-destructive">450</td>
                      <td className="px-5 py-4"><Badge className="bg-destructive/10 text-destructive">Deactivated</Badge></td>
                      <td className="px-5 py-4 text-right"><Button variant="ghost" size="sm" className="h-7 text-xs" disabled>Deactivated</Button></td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </div>
          )}

          {/* ========================================== */}
          {/* 5. INDEPENDENT INVESTORS                   */}
          {/* ========================================== */}
          {activeNav === 'investors' && (
            <div className="space-y-6 animate-in fade-in duration-500">
               <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Independent Investors</h1>
                  <p className="text-sm text-muted-foreground">Manage funding accounts and configure commission returns</p>
                </div>
                <Button size="sm" className="text-xs">+ Onboard Investor</Button>
              </div>

              <Card className="bg-card/80 border-border/50 shadow-md">
                <table className="w-full text-sm text-left">
                  <thead className="bg-secondary/50 text-[10px] uppercase font-bold text-muted-foreground">
                    <tr>
                      <th className="px-5 py-4">Investor / Entity</th>
                      <th className="px-5 py-4">Total Funds Deployed</th>
                      <th className="px-5 py-4">Commission Yield (%)</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    <tr className="hover:bg-muted/30">
                      <td className="px-5 py-4 font-medium">Blue Ocean Ventures</td>
                      <td className="px-5 py-4 font-bold text-foreground">₱25,000,000</td>
                      <td className="px-5 py-4 font-bold text-primary">4.5%</td>
                      <td className="px-5 py-4"><Badge className="bg-primary/10 text-primary">Active</Badge></td>
                      <td className="px-5 py-4"><ActionButtons status="Active" /></td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="px-5 py-4 font-medium">Manila Angel Network</td>
                      <td className="px-5 py-4 font-bold text-foreground">₱5,000,000</td>
                      <td className="px-5 py-4 font-bold text-primary">5.0%</td>
                      <td className="px-5 py-4"><Badge variant="outline">Pending</Badge></td>
                      <td className="px-5 py-4"><ActionButtons status="Pending" /></td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </div>
          )}

          {/* ========================================== */}
          {/* 6. INSTITUTIONS & LGUS                     */}
          {/* ========================================== */}
          {activeNav === 'institutions' && (
            <div className="space-y-6 animate-in fade-in duration-500">
               <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Institutions & LGUs</h1>
                  <p className="text-sm text-muted-foreground">Approve and manage Institutional lender accounts</p>
                </div>
              </div>

              <Card className="bg-card/80 border-border/50 shadow-md">
                <table className="w-full text-sm text-left">
                  <thead className="bg-secondary/50 text-[10px] uppercase font-bold text-muted-foreground">
                    <tr>
                      <th className="px-5 py-4">Institution Name</th>
                      <th className="px-5 py-4">Type</th>
                      <th className="px-5 py-4">Pool Size</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    <tr className="hover:bg-muted/30">
                      <td className="px-5 py-4 font-medium">LandBank of the Philippines</td>
                      <td className="px-5 py-4 text-xs text-muted-foreground">Gov Bank</td>
                      <td className="px-5 py-4 font-bold">₱500M</td>
                      <td className="px-5 py-4"><Badge className="bg-primary/10 text-primary">Active</Badge></td>
                      <td className="px-5 py-4"><ActionButtons status="Active" /></td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="px-5 py-4 font-medium">Cebu Provincial LGU</td>
                      <td className="px-5 py-4 text-xs text-muted-foreground">LGU</td>
                      <td className="px-5 py-4 font-bold">₱50M</td>
                      <td className="px-5 py-4"><Badge variant="outline">Pending</Badge></td>
                      <td className="px-5 py-4"><ActionButtons status="Pending" /></td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
