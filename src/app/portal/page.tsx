'use client'

import React, { useState } from 'react'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LayoutDashboard, ShieldAlert, Briefcase, Settings, Landmark, ShieldCheck } from 'lucide-react'
import { useSharedState } from '@/lib/useSharedState'


// ─── Types ───────────────────────────────────────────────────────────────────

type KanbanStatus = 'pending' | 'in-review' | 'approved'

interface Cooperative {
  id: string
  name: string
  score: number
  loan: string
  vessels: number
  status: KanbanStatus
}

// ─── Static data ─────────────────────────────────────────────────────────────

const INITIAL_COOPERATIVES: Cooperative[] = [
  {
    id: 'boracay',
    name: 'Boracay Transport Cooperative',
    score: 620,
    loan: '₱800,000',
    vessels: 8,
    status: 'pending',
  },
  {
    id: 'romblon',
    name: 'Romblon Ferry Network',
    score: 598,
    loan: '₱600,000',
    vessels: 6,
    status: 'pending',
  },
  {
    id: 'mindoro',
    name: 'Mindoro Strait Ferry Group',
    score: 540,
    loan: '₱450,000',
    vessels: 4,
    status: 'pending',
  },
  {
    id: 'iloilo',
    name: 'Iloilo-Guimaras Ferry Association',
    score: 780,
    loan: '₱1,500,000',
    vessels: 12,
    status: 'in-review',
  },
  {
    id: 'leyte',
    name: 'Leyte Gulf Maritime Coop',
    score: 710,
    loan: '₱950,000',
    vessels: 9,
    status: 'in-review',
  },
  {
    id: 'cebu',
    name: 'Cebu Maritime Eco-Fleet',
    score: 850,
    loan: '₱3,000,000',
    vessels: 20,
    status: 'approved',
  },
  {
    id: 'palawan',
    name: 'Palawan Green Ferry Corp',
    score: 812,
    loan: '₱2,100,000',
    vessels: 15,
    status: 'approved',
  },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: KanbanStatus }) {
  if (status === 'pending') {
    return (
      <Badge variant="secondary" className="text-[10px] font-semibold tracking-wide uppercase bg-secondary text-secondary-foreground hover:bg-secondary/80">
        Pending
      </Badge>
    )
  }
  if (status === 'in-review') {
    return (
      <Badge variant="default" className="text-[10px] font-semibold tracking-wide uppercase bg-primary text-primary-foreground hover:bg-primary/90">
        In Review
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="text-[10px] font-semibold tracking-wide uppercase border-teal-500/50 text-teal-600 dark:text-teal-500 bg-teal-500/10">
      Approved
    </Badge>
  )
}

function ScoreBar({ score }: { score: number }) {
  const pct = Math.min(100, (score / 1000) * 100)
  const color =
    score >= 750
      ? 'bg-teal-500'
      : score >= 600
      ? 'bg-amber-400'
      : 'bg-destructive'
  return (
    <div className="mt-3">
      <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
        <span>Bankability Score</span>
        <span className="font-semibold text-foreground">{score} / 1000</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function PendingCard({ coop, onClick, onMove }: { coop: Cooperative; onClick: () => void; onMove?: (e: React.MouseEvent) => void }) {
  return (
    <Card 
      onClick={onClick}
      className="mb-3 bg-card/80 backdrop-blur-sm border border-border/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer animate-in fade-in zoom-in-95 duration-500"
    >
      <CardContent className="pt-4 pb-3 px-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-sm font-semibold text-foreground leading-tight">
            {coop.name}
          </p>
          <StatusBadge status={coop.status} />
        </div>
        <div className="flex gap-3 text-[11px] text-muted-foreground mt-2">
          <span>
            Loan:{' '}
            <span className="font-medium text-foreground">{coop.loan}</span>
          </span>
          <span>
            Vessels:{' '}
            <span className="font-medium text-foreground">{coop.vessels}</span>
          </span>
        </div>
        <ScoreBar score={coop.score} />

        {/* Quick metrics */}
        <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between text-[10px]">
          <span className="text-muted-foreground">Est. DSCR</span>
          <span className="font-bold text-foreground">{coop.score >= 700 ? '1.35' : coop.score >= 600 ? '1.12' : '0.94'}</span>
        </div>
        <p className="text-[9px] text-muted-foreground/70 mt-1 italic">Full metrics available after review starts</p>

        {/* Action buttons */}
        <div className="mt-3 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-[10px] h-7 bg-background/50 border-border/50 hover:bg-secondary"
          >
            Review Details
          </Button>
          <Button
            size="sm"
            onClick={onMove}
            className="flex-1 text-[10px] h-7 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Start Review
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function InReviewCard({ coop, onClick, onMove, onMoveBack }: { coop: Cooperative; onClick: () => void; onMove?: (e: React.MouseEvent) => void; onMoveBack?: (e: React.MouseEvent) => void }) {
  return (
    <Card 
      onClick={onClick}
      className="mb-3 bg-card/80 backdrop-blur-sm border-2 border-primary/30 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer animate-in fade-in zoom-in-95 duration-500 delay-75 fill-mode-both"
    >
      <CardContent className="pt-4 pb-4 px-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-sm font-semibold text-foreground leading-tight">
            {coop.name}
          </p>
          <StatusBadge status={coop.status} />
        </div>
        <div className="flex gap-3 text-[11px] text-muted-foreground mt-2">
          <span>
            Loan:{' '}
            <span className="font-medium text-foreground">{coop.loan}</span>
          </span>
          <span>
            Vessels:{' '}
            <span className="font-medium text-foreground">{coop.vessels}</span>
          </span>
        </div>
        <ScoreBar score={coop.score} />

        {/* Mini detail strip */}
        <div className="mt-4 pt-3 border-t border-border/50 grid grid-cols-3 gap-2">
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground leading-none">Route Consistency</p>
            <p className="text-xs font-bold text-teal-600 dark:text-teal-500 mt-1.5">97.3%</p>
          </div>
          <div className="text-center border-x border-border/50">
            <p className="text-[10px] text-muted-foreground leading-none">Monthly Rev.</p>
            <p className="text-xs font-bold text-primary mt-1.5">₱1.87M</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground leading-none">DSCR</p>
            <p className="text-xs font-bold text-teal-600 dark:text-teal-500 mt-1.5">1.45</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMoveBack}
            className="text-[10px] h-7 text-muted-foreground hover:text-foreground hover:bg-secondary px-2"
          >
            ← Pending
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-[10px] h-7 bg-background/50 border-border/50 hover:bg-secondary"
          >
            Request Info
          </Button>
          <Button
            size="sm"
            onClick={onMove}
            className="flex-1 text-[10px] h-7 bg-teal-600 text-white hover:bg-teal-700"
          >
            Recommend Approval
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ApprovedCard({ coop, onClick, onMoveBack }: { coop: Cooperative; onClick: () => void; onMoveBack?: (e: React.MouseEvent) => void }) {
  return (
    <Card 
      onClick={onClick}
      className="mb-3 bg-card/80 backdrop-blur-sm border border-teal-500/20 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer animate-in fade-in zoom-in-95 duration-500 delay-150 fill-mode-both"
    >
      <CardContent className="pt-4 pb-3 px-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-sm font-semibold text-foreground leading-tight">
            {coop.name}
          </p>
          <StatusBadge status={coop.status} />
        </div>
        <div className="flex gap-3 text-[11px] text-muted-foreground mt-2">
          <span>
            Loan:{' '}
            <span className="font-medium text-foreground">{coop.loan}</span>
          </span>
          <span>
            Vessels:{' '}
            <span className="font-medium text-foreground">{coop.vessels}</span>
          </span>
        </div>
        <ScoreBar score={coop.score} />
        <div className="mt-3 flex items-center gap-1.5 pb-3 border-b border-border/50">
          <div className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
          <span className="text-[10px] text-teal-600 dark:text-teal-500 font-medium">
            Disbursement Scheduled
          </span>
        </div>
        <div className="mt-3 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMoveBack}
            className="text-[10px] h-7 text-muted-foreground hover:text-foreground hover:bg-secondary px-2"
          >
            ← Review
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-[10px] h-7 bg-background/50 border-border/50 hover:bg-secondary"
          >
            View Docs
          </Button>
          <Button
            size="sm"
            className="flex-1 text-[10px] h-7 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Disburse Funds
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Column wrapper ───────────────────────────────────────────────────────────

interface ColumnProps {
  title: string
  count: number
  id: string
  children: React.ReactNode
}

function KanbanColumn({
  title,
  count,
  id,
  children,
}: ColumnProps) {
  return (
    <div className="flex-1 min-w-0 flex flex-col bg-secondary/20 backdrop-blur-md border-none rounded-2xl p-3 h-[600px] shadow-inner">
      <div className="px-2 py-2 mb-2 flex items-center justify-between">
        <span className="text-xs font-bold tracking-widest uppercase text-foreground/80">
          {title}
        </span>
        <span className="text-xs font-semibold bg-background/60 backdrop-blur rounded-full px-2.5 py-0.5 text-muted-foreground shadow-sm">
          {count}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto pr-1 pb-2 space-y-3 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {children}
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

const navItems = [
  { key: 'pipeline', label: 'Loan Pipeline', icon: <LayoutDashboard className="w-5 h-5" />, comingSoon: false },
  { key: 'risk', label: 'Risk Profiles', icon: <ShieldAlert className="w-5 h-5" />, comingSoon: false },
  { key: 'portfolio', label: 'Portfolio', icon: <Briefcase className="w-5 h-5" />, comingSoon: true },
  { key: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" />, comingSoon: false },
]

export default function PortalPage() {
  const [cooperatives, setCooperatives] = useSharedState<Cooperative[]>('marineSync_loans', INITIAL_COOPERATIVES)
  const [activeNav, setActiveNav] = useState('pipeline')
  const [selectedCoop, setSelectedCoop] = useState<Cooperative>(INITIAL_COOPERATIVES[2]) // default to Iloilo
  const [approveClicked, setApproveClicked] = useState(false)
  const [declineClicked, setDeclineClicked] = useState(false)

  const [interestRate, setInterestRate] = useState(8)
  const [subsidy, setSubsidy] = useState(5)
  const [loanTerm, setLoanTerm] = useState(10)

  const finalRate = interestRate - subsidy;
  const baseDscr = 1.45;
  const calculatedDscr = (baseDscr * (10 / loanTerm) * (8 / (finalRate || 1))).toFixed(2);
  const dscrValue = parseFloat(calculatedDscr);
  const isDscrAcceptable = dscrValue >= 1.25;

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const pending = cooperatives.filter((c) => c.status === 'pending')
  const inReview = cooperatives.filter((c) => c.status === 'in-review')
  const approved = cooperatives.filter((c) => c.status === 'approved')

  const handleCardClick = (coop: Cooperative) => {
    setSelectedCoop(coop)
    setActiveNav('risk')
    setApproveClicked(false)
    setDeclineClicked(false)
  }

  const handleMoveCard = (id: string, newStatus: 'pending' | 'in-review' | 'approved') => {
    setCooperatives((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    )
  }

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background font-sans transition-colors duration-300">
      {/* ── Top Navigation Bar ─────────────────────────────────────────── */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border/60 px-6 py-0 flex items-center justify-between h-14 sticky top-0 z-50">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded bg-primary flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 text-primary-foreground fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.79-.12-.25-.33-.43-.58-.5L20 11V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v5l-1.29.42c-.26.07-.47.26-.59.51-.12.24-.14.52-.06.78zm5.05-8h8v1.88l-4-1.33-4 1.33z" />
            </svg>
          </div>
          <span className="text-foreground font-bold text-lg tracking-tight">
            MarineSync
          </span>
        </div>

        {/* Center label */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-foreground text-sm font-semibold tracking-wide">
            Institutional Portal
          </span>
          <span className="text-muted-foreground text-[11px] tracking-wider uppercase font-medium">
            LandBank of the Philippines
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary border-2 border-primary/20 flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">LB</span>
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-foreground text-xs font-medium">LB Officer</span>
              <span className="text-muted-foreground text-[10px]">Risk Division</span>
            </div>
          </div>
          <div className="h-5 w-px bg-border/60" />

          <div className="h-5 w-px bg-border/60" />
          <Link
            href="/login"
            className="text-muted-foreground hover:text-foreground text-xs font-medium transition-colors flex items-center gap-1"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </Link>
        </div>
      </header>

      {/* ── Sidebar ── */}
      <aside className="fixed top-14 left-0 bottom-0 z-20 w-56 bg-secondary/50 backdrop-blur-md flex flex-col py-6 shadow-xl border-r border-border/40">
        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const isActive = activeNav === item.key
            return (
              <button
                key={item.key}
                onClick={() => !item.comingSoon && setActiveNav(item.key)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left w-full
                  ${
                    item.comingSoon
                      ? 'text-muted-foreground/50 cursor-not-allowed border-l-4 border-transparent'
                      : isActive
                      ? 'border-l-4 border-primary text-primary bg-primary/10 pl-2'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80 border-l-4 border-transparent'
                  }`}
              >
                <span className={`text-base ${item.comingSoon ? 'opacity-40' : ''}`}>{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.comingSoon && (
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-secondary text-muted-foreground px-1.5 py-0.5 rounded">Soon</span>
                )}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* ── Main Content Container ── */}
      <div className="ml-56 flex-1 flex flex-col min-h-[calc(100vh-3.5rem)]">
        {/* ── Summary Stats Bar ──────────────────────────────────────────── */}
        <div className="bg-secondary/30 px-6 py-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm border-b border-border/50 animate-in fade-in slide-in-from-top-2 duration-500">
          <StatPill label="Pending Review" value={String(pending.length)} color="text-foreground" />
          <Divider />
          <StatPill label="In Review" value={String(inReview.length)} color="text-primary" />
          <Divider />
          <StatPill label="Approved" value={String(approved.length)} color="text-teal-600 dark:text-teal-500" />
          <Divider />
          <StatPill
            label="Total Exposure"
            value={`₱${(cooperatives.reduce((sum, c) => sum + parseFloat(c.loan.replace(/[₱,]/g, '')), 0) / 1000000).toFixed(1)}M`}
            color="text-foreground"
          />
          <Divider />
          <StatPill
            label="Total ESG Impact"
            value="2,030 tons CO₂"
            color="text-teal-600 dark:text-teal-500"
            icon
          />
        </div>

        <main className="px-6 py-8 max-w-screen-xl w-full mx-auto space-y-8">
          {activeNav === 'pipeline' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Section header */}
        <div className="flex items-center justify-between animate-in fade-in slide-in-from-left-4 duration-500">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Loan Application Pipeline
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Cooperative e-ferry loan applications — classified by review stage
            </p>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-medium bg-secondary/50 px-3 py-1.5 rounded-full">
            <div className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
            Live — last updated 15:39 PHT
          </div>
        </div>

        {/* ── Kanban Board ─────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* Column 1 — Pending */}
          <KanbanColumn
            title="Pending"
            count={pending.length}
            id="pending"
          >
            {pending.map((c) => (
              <div key={c.id}>
                <PendingCard 
                  coop={c} 
                  onClick={() => handleCardClick(c)} 
                  onMove={(e) => { e.stopPropagation(); handleMoveCard(c.id, 'in-review') }}
                />
              </div>
            ))}
          </KanbanColumn>

          {/* Column 2 — In Review */}
          <KanbanColumn
            title="In Review"
            count={inReview.length}
            id="in-review"
          >
            {inReview.map((c) => (
              <div key={c.id}>
                <InReviewCard 
                  coop={c} 
                  onClick={() => handleCardClick(c)}
                  onMove={(e) => { e.stopPropagation(); handleMoveCard(c.id, 'approved') }}
                  onMoveBack={(e) => { e.stopPropagation(); handleMoveCard(c.id, 'pending') }}
                />
              </div>
            ))}
          </KanbanColumn>

          {/* Column 3 — Approved */}
          <KanbanColumn
            title="Approved"
            count={approved.length}
            id="approved"
          >
            {approved.map((c) => (
              <div key={c.id}>
                <ApprovedCard 
                  coop={c} 
                  onClick={() => handleCardClick(c)}
                  onMoveBack={(e) => { e.stopPropagation(); handleMoveCard(c.id, 'in-review') }}
                />
              </div>
            ))}
          </KanbanColumn>
        </div>

        {/* ── Summary Footer ─────────────────────────────────────── */}
        <div className="mt-6 grid grid-cols-3 gap-5">
          <div className="bg-secondary/30 border border-border/40 rounded-xl px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">Pending Exposure</p>
              <p className="text-lg font-black text-foreground">
                ₱{(pending.reduce((sum, c) => sum + parseFloat(c.loan.replace(/[₱,]/g, '')), 0) / 1000000).toFixed(2)}M
              </p>
            </div>
            <span className="text-2xl font-black text-muted-foreground/20">{pending.length}</span>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-xl px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">Under Review</p>
              <p className="text-lg font-black text-primary">
                ₱{(inReview.reduce((sum, c) => sum + parseFloat(c.loan.replace(/[₱,]/g, '')), 0) / 1000000).toFixed(2)}M
              </p>
            </div>
            <span className="text-2xl font-black text-primary/20">{inReview.length}</span>
          </div>
          <div className="bg-teal-500/5 border border-teal-500/20 rounded-xl px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">Approved & Disbursing</p>
              <p className="text-lg font-black text-teal-600">
                ₱{(approved.reduce((sum, c) => sum + parseFloat(c.loan.replace(/[₱,]/g, '')), 0) / 1000000).toFixed(2)}M
              </p>
            </div>
            <span className="text-2xl font-black text-teal-500/20">{approved.length}</span>
          </div>
        </div>
      </div>
    )}

          {activeNav === 'risk' && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
          {/* ── Risk Profile Detail Panel ─────────────────────────────────── */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-6 w-1.5 rounded-full bg-primary" />
            <h2 className="text-lg font-bold text-foreground tracking-tight">
              Risk Profile —{' '}
              <span className="text-primary">
                {selectedCoop.name}
              </span>
            </h2>
            <Badge variant="secondary" className="text-[10px] font-semibold uppercase tracking-wider bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20">
              Active Dossier
            </Badge>
          </div>

          <Card className="bg-card/80 backdrop-blur-md border border-border/50 shadow-xl rounded-2xl overflow-hidden transition-all">
            {/* Key Metrics Row */}
            <div className="border-b border-border/50 bg-background/50">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border/50">
                {/* Metric 1 */}
                <div className="px-6 py-6 transition-colors hover:bg-muted/30">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold mb-2">
                    Marine Bankability Score
                  </p>
                  <div className="flex items-baseline gap-1">
                    <p className="text-4xl font-black text-primary leading-none">
                      {selectedCoop.score}
                    </p>
                    <span className="text-lg font-semibold text-muted-foreground/60">
                      /1000
                    </span>
                  </div>
                  <div className="mt-4 h-2 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(selectedCoop.score / 1000) * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-2 font-medium">
                    Above average — Category: A
                  </p>
                </div>

                {/* Metric 2 */}
                <div className="px-6 py-6 transition-colors hover:bg-muted/30">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold mb-2">
                    Verified Monthly Revenue
                  </p>
                  <p className="text-4xl font-black text-teal-600 dark:text-teal-500 leading-none">
                    ₱1.87M
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-3 font-medium">
                    12-month average · LTFRB verified
                  </p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-teal-500 shadow-sm" />
                    <span className="text-[10px] text-teal-700 dark:text-teal-500 font-semibold tracking-wide">
                      Verified by DOTr data feed
                    </span>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="px-6 py-6 transition-colors hover:bg-muted/30">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold mb-2">
                    DSCR — Debt Service Coverage
                  </p>
                  <div className="flex items-baseline gap-1">
                    <p className={`text-4xl font-black ${isDscrAcceptable ? 'text-teal-600 dark:text-teal-500' : 'text-destructive'} leading-none transition-all duration-300`}>
                      {calculatedDscr}
                    </p>
                    <span className={`text-lg font-bold ${isDscrAcceptable ? 'text-teal-500/60' : 'text-destructive/60'}`}>
                      x
                    </span>
                  </div>
                  <div className={`mt-3.5 inline-flex items-center gap-1.5 ${isDscrAcceptable ? 'bg-teal-500/10 border-teal-500/20 text-teal-600 dark:text-teal-500' : 'bg-destructive/10 border-destructive/20 text-destructive'} border rounded-md px-2.5 py-1 transition-colors duration-300`}>
                    <svg
                      className="h-3.5 w-3.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d={isDscrAcceptable ? "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" : "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"}
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {isDscrAcceptable ? 'Acceptable (>1.25)' : 'High Risk (<1.25)'}
                    </span>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="px-6 py-6 transition-colors hover:bg-muted/30">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold mb-2">
                    Subsidized Loan Rate
                  </p>
                  <div className="flex items-baseline gap-1">
                    <p className="text-4xl font-black text-foreground leading-none transition-all duration-300">
                      {finalRate}%
                    </p>
                    <span className="text-sm font-semibold text-muted-foreground">
                      p.a.
                    </span>
                  </div>
                  <div className="mt-3.5 space-y-1.5">
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <span className="line-through text-muted-foreground/70 font-medium">{interestRate}% standard rate</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-teal-600 dark:text-teal-500 font-bold transition-all duration-300">
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd"/>
                      </svg>
                      {subsidy}% LGU green subsidy
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Underwriting Sliders */}
            <CardContent className="bg-background px-6 py-7 border-b border-border/50 shadow-inner">
              <div className="flex items-center gap-2 mb-6">
                <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
                <h3 className="text-sm font-black text-foreground uppercase tracking-widest">
                  Live Underwriting Simulator
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Interest Rate */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Base Interest Rate</label>
                    <span className="font-black text-lg text-primary">{interestRate}%</span>
                  </div>
                  <input type="range" min="4" max="15" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full accent-primary h-2 bg-secondary rounded-lg appearance-none cursor-pointer" />
                </div>
                {/* Subsidy */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Green Subsidy</label>
                    <span className="font-black text-lg text-teal-600">{subsidy}%</span>
                  </div>
                  <input type="range" min="0" max="10" value={subsidy} onChange={(e) => setSubsidy(Number(e.target.value))} className="w-full accent-teal-500 h-2 bg-secondary rounded-lg appearance-none cursor-pointer" />
                </div>
                {/* Loan Term */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Loan Term (Years)</label>
                    <span className="font-black text-lg text-foreground">{loanTerm}</span>
                  </div>
                  <input type="range" min="5" max="25" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} className="w-full accent-primary h-2 bg-secondary rounded-lg appearance-none cursor-pointer" />
                </div>
              </div>
            </CardContent>

            {/* ESG Impact Section */}
            <CardContent className="bg-secondary/10 px-6 py-7 border-b border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <svg
                  className="h-5 w-5 text-teal-600 dark:text-teal-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.382 4.282a9 9 0 0113.16 11.16l-1.462-1.461a7 7 0 10-9.24 1.18l1.16 1.26a9 9 0 01-3.618-12.14zm12.3 12.3l-1.41-1.41a5 5 0 01-8.02-3.45l1.99-.37a3 3 0 104.88 2.24l1.56 2.99z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="text-sm font-black text-teal-700 dark:text-teal-500 uppercase tracking-widest">
                  ESG Environmental Impact
                </h3>
                <div className="h-px flex-1 bg-teal-500/20" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <EsgStat
                  label="Carbon Savings"
                  value="520"
                  unit="tons/yr"
                  color="text-teal-600 dark:text-teal-500"
                />
                <EsgStat
                  label="Fuel Reduction"
                  value="35%"
                  unit="vs. diesel"
                  color="text-teal-600 dark:text-teal-500"
                />
                <EsgStat
                  label="Vessels Converting"
                  value="12"
                  unit="units"
                  color="text-primary"
                />
                <div className="bg-background/80 backdrop-blur rounded-xl border border-border/60 p-4 text-center col-span-2 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mb-3">
                    SDG Goals Addressed
                  </p>
                  <div className="flex justify-center gap-2.5 flex-wrap">
                    {[7, 11, 13].map((sdg) => (
                      <span
                        key={sdg}
                        className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-teal-600 dark:bg-teal-700 text-white text-sm font-black shadow-md hover:-translate-y-0.5 transition-transform"
                      >
                        {sdg}
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] text-teal-700 dark:text-teal-500 mt-2.5 font-bold tracking-wide">
                    Clean Energy · Sustainable Cities · Climate Action
                  </p>
                </div>
              </div>
            </CardContent>

            {/* Action Bar */}
            <div className="bg-background/60 px-6 py-6">
              <div className="flex flex-col gap-4">
                {approveClicked ? (
                  <div className="w-full rounded-2xl bg-teal-500/10 border-2 border-teal-500/30 p-6 text-center animate-in zoom-in-95 duration-300">
                    <p className="text-teal-700 dark:text-teal-500 font-black text-lg flex items-center justify-center gap-2">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Loan Package Approved — Disbursement Initiated
                    </p>
                    <p className="text-xs text-teal-600/80 dark:text-teal-500/80 mt-2 font-medium">
                      Reference: LB-EFERRY-2025-0042 · Logged at 15:39 PHT
                    </p>
                  </div>
                ) : declineClicked ? (
                  <div className="w-full rounded-2xl bg-destructive/10 border-2 border-destructive/30 p-6 text-center animate-in zoom-in-95 duration-300">
                    <p className="text-destructive font-black text-lg">
                      Application Declined
                    </p>
                    <p className="text-xs text-destructive/80 mt-2 font-medium">
                      Applicant notified. Action logged and auditable.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <Button
                      className="w-full sm:w-auto flex-1 h-12 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold tracking-wide rounded-xl shadow-md transition-all active:scale-[0.98]"
                      onClick={() => setApproveClicked(true)}
                    >
                      <svg
                        className="h-4 w-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      APPROVE LOAN PACKAGE ✓
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto h-12 px-10 border-destructive/30 text-destructive hover:bg-destructive/10 font-bold rounded-xl"
                      onClick={() => setDeclineClicked(true)}
                    >
                      Decline
                    </Button>
                  </div>
                )}

                {/* Disclaimer */}
                {!approveClicked && !declineClicked && (
                  <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl px-5 py-4 mt-2">
                    <svg
                      className="h-5 w-5 text-amber-500 mt-0.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-[11px] sm:text-xs text-amber-700 dark:text-amber-400/90 leading-relaxed">
                      <span className="font-bold uppercase tracking-wider text-amber-800 dark:text-amber-500">Official Action Notice:</span>{' '}
                      By approving, LandBank commits to disbursing{' '}
                      <span className="font-bold">{selectedCoop.loan}</span> at{' '}
                      <span className="font-bold">3% subsidized rate</span> to
                      {selectedCoop.name}. This action is{' '}
                      <span className="font-bold underline decoration-amber-500/30 underline-offset-2">logged, timestamped, and fully auditable</span>{' '}
                      under BSP Circular No. 1148 and RA 11659.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
          )}

          {activeNav === 'portfolio' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="bg-card/50 backdrop-blur-md border border-border/40 shadow-lg p-12 text-center flex flex-col items-center justify-center">
                <Briefcase className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                <h2 className="text-2xl font-bold text-foreground">Active Loan Portfolio</h2>
                <p className="text-muted-foreground mt-2 max-w-md">
                  View and manage currently disbursed loans, repayment schedules, and operator ESG compliance reports.
                </p>
                <Button className="mt-6 font-semibold bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30">
                  Generate Portfolio Report
                </Button>
              </Card>
            </div>
          )}

          {activeNav === 'settings' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="bg-card/50 backdrop-blur-md border border-border/40 shadow-lg max-w-2xl mx-auto">
                <div className="p-6 border-b border-border/40">
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Settings className="w-5 h-5 text-primary" /> Institutional Settings
                  </h2>
                </div>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Officer Name</label>
                    <input type="text" disabled value="LandBank Officer - Risk Division" className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-sm text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Approval Thresholds</label>
                    <div className="flex items-center justify-between p-3 border border-border rounded-md bg-background">
                      <span className="text-sm">Auto-approve Bankability Scores &gt; 800</span>
                      <input type="checkbox" defaultChecked className="accent-primary w-4 h-4" />
                    </div>
                  </div>
                  <Button className="w-full font-bold">Save Settings</Button>
                </CardContent>
              </Card>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

// ─── Tiny helpers ─────────────────────────────────────────────────────────────

function StatPill({
  label,
  value,
  color,
  icon,
}: {
  label: string
  value: string
  color: string
  icon?: boolean
}) {
  return (
    <div className="flex items-center gap-2">
      {icon && (
        <svg
          className="h-4 w-4 text-teal-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      )}
      <span className="text-muted-foreground text-xs font-semibold tracking-wide">{label}:</span>
      <span className={`text-sm font-black ${color}`}>{value}</span>
    </div>
  )
}

function Divider() {
  return <div className="h-5 w-px bg-border/60 mx-2" />
}

function EsgStat({
  label,
  value,
  unit,
  color,
}: {
  label: string
  value: string
  unit: string
  color: string
}) {
  return (
    <div className="bg-background/80 backdrop-blur rounded-xl border border-border/60 p-4 text-center shadow-sm hover:shadow-md transition-shadow">
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mb-2">
        {label}
      </p>
      <p className={`text-2xl font-black ${color} leading-none tracking-tight`}>{value}</p>
      <p className="text-[10px] text-muted-foreground mt-1.5 font-medium">{unit}</p>
    </div>
  )
}
