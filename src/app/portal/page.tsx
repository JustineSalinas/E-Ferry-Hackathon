'use client'

import React, { useState } from 'react'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


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
    id: 'iloilo',
    name: 'Iloilo-Guimaras Ferry Association',
    score: 780,
    loan: '₱1,500,000',
    vessels: 12,
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
    <Badge variant="outline" className="text-[10px] font-semibold tracking-wide uppercase border-emerald-500/50 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10">
      Approved
    </Badge>
  )
}

function ScoreBar({ score }: { score: number }) {
  const pct = Math.min(100, (score / 1000) * 100)
  const color =
    score >= 750
      ? 'bg-emerald-500'
      : score >= 650
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

function PendingCard({ coop }: { coop: Cooperative }) {
  return (
    <Card className="mb-3 bg-card/80 backdrop-blur-sm border border-border/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-default animate-in fade-in zoom-in-95 duration-500">
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
      </CardContent>
    </Card>
  )
}

function InReviewCard({ coop }: { coop: Cooperative }) {
  return (
    <Card className="mb-3 bg-card/80 backdrop-blur-sm border-2 border-primary/30 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all animate-in fade-in zoom-in-95 duration-500 delay-75 fill-mode-both">
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
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1.5">97.3%</p>
          </div>
          <div className="text-center border-x border-border/50">
            <p className="text-[10px] text-muted-foreground leading-none">Monthly Rev.</p>
            <p className="text-xs font-bold text-primary mt-1.5">₱1.87M</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground leading-none">DSCR</p>
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1.5">1.45</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-[10px] h-7 bg-background/50 border-border/50 hover:bg-secondary"
          >
            Request More Info
          </Button>
          <Button
            size="sm"
            className="flex-1 text-[10px] h-7 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Move to Approved
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ApprovedCard({ coop }: { coop: Cooperative }) {
  return (
    <Card className="mb-3 bg-card/80 backdrop-blur-sm border border-emerald-500/20 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-default animate-in fade-in zoom-in-95 duration-500 delay-150 fill-mode-both">
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
        <div className="mt-3 flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
            Disbursement Scheduled
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Column wrapper ───────────────────────────────────────────────────────────

interface ColumnProps {
  title: string
  count: number
  children: React.ReactNode
}

function KanbanColumn({
  title,
  count,
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

export default function PortalPage() {
  const [cooperatives] = useState<Cooperative[]>(INITIAL_COOPERATIVES)
  const [approveClicked, setApproveClicked] = useState(false)
  const [declineClicked, setDeclineClicked] = useState(false)

  const pending = cooperatives.filter((c) => c.status === 'pending')
  const inReview = cooperatives.filter((c) => c.status === 'in-review')
  const approved = cooperatives.filter((c) => c.status === 'approved')

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

      {/* ── Summary Stats Bar ──────────────────────────────────────────── */}
      <div className="bg-secondary/30 px-6 py-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm border-b border-border/50 animate-in fade-in slide-in-from-top-2 duration-500">
        <StatPill label="Pending Review" value="3" color="text-foreground" />
        <Divider />
        <StatPill label="In Review" value="2" color="text-primary" />
        <Divider />
        <StatPill label="Approved" value="8" color="text-emerald-600 dark:text-emerald-400" />
        <Divider />
        <StatPill
          label="Total ESG Impact"
          value="2,030 tons CO₂"
          color="text-emerald-600 dark:text-emerald-400"
          icon
        />
      </div>

      {/* ── Main Content ───────────────────────────────────────────────── */}
      <main className="px-6 py-8 max-w-screen-xl mx-auto space-y-8">
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
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Live — last updated 15:39 PHT
          </div>
        </div>

        {/* ── Kanban Board ─────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* Column 1 — Pending */}
          <KanbanColumn
            title="Pending"
            count={pending.length}
          >
            {pending.map((c) => (
              <PendingCard key={c.id} coop={c} />
            ))}
          </KanbanColumn>

          {/* Column 2 — In Review */}
          <KanbanColumn
            title="In Review"
            count={inReview.length}
          >
            {inReview.map((c) => (
              <InReviewCard key={c.id} coop={c} />
            ))}
          </KanbanColumn>

          {/* Column 3 — Approved */}
          <KanbanColumn
            title="Approved"
            count={approved.length}
          >
            {approved.map((c) => (
              <ApprovedCard key={c.id} coop={c} />
            ))}
          </KanbanColumn>
        </div>

        {/* ── Risk Profile Detail Panel ─────────────────────────────────── */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-6 w-1.5 rounded-full bg-primary" />
            <h2 className="text-lg font-bold text-foreground tracking-tight">
              Risk Profile —{' '}
              <span className="text-primary">
                Iloilo-Guimaras Ferry Association
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
                      780
                    </p>
                    <span className="text-lg font-semibold text-muted-foreground/60">
                      /1000
                    </span>
                  </div>
                  <div className="mt-4 h-2 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: '78%' }}
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
                  <p className="text-4xl font-black text-emerald-600 dark:text-emerald-500 leading-none">
                    ₱1.87M
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-3 font-medium">
                    12-month average · LTFRB verified
                  </p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold tracking-wide">
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
                    <p className="text-4xl font-black text-emerald-600 dark:text-emerald-500 leading-none">
                      1.45
                    </p>
                    <span className="text-lg font-bold text-emerald-500/60">
                      x
                    </span>
                  </div>
                  <div className="mt-3.5 inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md px-2.5 py-1">
                    <svg
                      className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider">
                      Acceptable (&gt;1.25)
                    </span>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="px-6 py-6 transition-colors hover:bg-muted/30">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold mb-2">
                    Subsidized Loan Rate
                  </p>
                  <div className="flex items-baseline gap-1">
                    <p className="text-4xl font-black text-foreground leading-none">
                      3%
                    </p>
                    <span className="text-sm font-semibold text-muted-foreground">
                      p.a.
                    </span>
                  </div>
                  <div className="mt-3.5 space-y-1.5">
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <span className="line-through text-muted-foreground/70 font-medium">8% standard rate</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd"/>
                      </svg>
                      5% LGU green e-ferry subsidy
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ESG Impact Section */}
            <CardContent className="bg-secondary/10 px-6 py-7 border-b border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <svg
                  className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.382 4.282a9 9 0 0113.16 11.16l-1.462-1.461a7 7 0 10-9.24 1.18l1.16 1.26a9 9 0 01-3.618-12.14zm12.3 12.3l-1.41-1.41a5 5 0 01-8.02-3.45l1.99-.37a3 3 0 104.88 2.24l1.56 2.99z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="text-sm font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
                  ESG Environmental Impact
                </h3>
                <div className="h-px flex-1 bg-emerald-500/20" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <EsgStat
                  label="Carbon Savings"
                  value="520"
                  unit="tons/yr"
                  color="text-emerald-600 dark:text-emerald-400"
                />
                <EsgStat
                  label="Fuel Reduction"
                  value="35%"
                  unit="vs. diesel"
                  color="text-emerald-600 dark:text-emerald-400"
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
                        className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-emerald-600 dark:bg-emerald-700 text-white text-sm font-black shadow-md hover:-translate-y-0.5 transition-transform"
                      >
                        {sdg}
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-2.5 font-bold tracking-wide">
                    Clean Energy · Sustainable Cities · Climate Action
                  </p>
                </div>
              </div>
            </CardContent>

            {/* Action Bar */}
            <div className="bg-background/60 px-6 py-6">
              <div className="flex flex-col gap-4">
                {approveClicked ? (
                  <div className="w-full rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/30 p-6 text-center animate-in zoom-in-95 duration-300">
                    <p className="text-emerald-700 dark:text-emerald-400 font-black text-lg flex items-center justify-center gap-2">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Loan Package Approved — Disbursement Initiated
                    </p>
                    <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80 mt-2 font-medium">
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
                      className="w-full sm:w-auto flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold tracking-wide rounded-xl shadow-md transition-all active:scale-[0.98]"
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
                      <span className="font-bold">₱1,500,000</span> at{' '}
                      <span className="font-bold">3% subsidized rate</span> to
                      Iloilo-Guimaras Ferry Association. This action is{' '}
                      <span className="font-bold underline decoration-amber-500/30 underline-offset-2">logged, timestamped, and fully auditable</span>{' '}
                      under BSP Circular No. 1148 and RA 11659.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </main>
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
          className="h-4 w-4 text-emerald-500"
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
