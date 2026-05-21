'use client'

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
      <Badge className="bg-slate-200 text-slate-700 hover:bg-slate-200 text-[11px] font-semibold tracking-wide uppercase">
        Pending
      </Badge>
    )
  }
  if (status === 'in-review') {
    return (
      <Badge className="bg-[#e8f4f8] text-[#005E7A] border border-[#005E7A] hover:bg-[#e8f4f8] text-[11px] font-semibold tracking-wide uppercase">
        In Review
      </Badge>
    )
  }
  return (
    <Badge className="bg-green-100 text-green-700 border border-green-600 hover:bg-green-100 text-[11px] font-semibold tracking-wide uppercase">
      Approved
    </Badge>
  )
}

function ScoreBar({ score }: { score: number }) {
  const pct = Math.min(100, (score / 1000) * 100)
  const color =
    score >= 750
      ? 'bg-green-500'
      : score >= 650
      ? 'bg-yellow-400'
      : 'bg-red-400'
  return (
    <div className="mt-2">
      <div className="flex justify-between text-[10px] text-slate-500 mb-0.5">
        <span>Bankability Score</span>
        <span className="font-semibold text-slate-700">{score} / 1000</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
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
    <Card className="mb-3 border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-default">
      <CardContent className="pt-4 pb-3 px-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-sm font-semibold text-slate-800 leading-tight">
            {coop.name}
          </p>
          <StatusBadge status={coop.status} />
        </div>
        <div className="flex gap-3 text-[11px] text-slate-500 mt-1">
          <span>
            Loan:{' '}
            <span className="font-medium text-slate-700">{coop.loan}</span>
          </span>
          <span>
            Vessels:{' '}
            <span className="font-medium text-slate-700">{coop.vessels}</span>
          </span>
        </div>
        <ScoreBar score={coop.score} />
      </CardContent>
    </Card>
  )
}

function InReviewCard({ coop }: { coop: Cooperative }) {
  return (
    <Card className="mb-3 border-2 border-[#005E7A] shadow-md bg-white">
      <CardContent className="pt-4 pb-4 px-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-sm font-semibold text-[#002D40] leading-tight">
            {coop.name}
          </p>
          <StatusBadge status={coop.status} />
        </div>
        <div className="flex gap-3 text-[11px] text-slate-500 mt-1">
          <span>
            Loan:{' '}
            <span className="font-medium text-slate-700">{coop.loan}</span>
          </span>
          <span>
            Vessels:{' '}
            <span className="font-medium text-slate-700">{coop.vessels}</span>
          </span>
        </div>
        <ScoreBar score={coop.score} />

        {/* Mini detail strip */}
        <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2">
          <div className="text-center">
            <p className="text-[10px] text-slate-500 leading-none">Route Consistency</p>
            <p className="text-xs font-bold text-green-700 mt-0.5">97.3%</p>
          </div>
          <div className="text-center border-x border-slate-100">
            <p className="text-[10px] text-slate-500 leading-none">Monthly Rev.</p>
            <p className="text-xs font-bold text-[#005E7A] mt-0.5">₱1.87M</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-slate-500 leading-none">DSCR</p>
            <p className="text-xs font-bold text-green-700 mt-0.5">1.45</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-3 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-[11px] h-7 border-[#005E7A] text-[#005E7A] hover:bg-[#e8f4f8]"
          >
            Request More Info
          </Button>
          <Button
            size="sm"
            className="flex-1 text-[11px] h-7 bg-[#005E7A] text-white hover:bg-[#004a62]"
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
    <Card className="mb-3 border border-green-200 bg-green-50 shadow-sm hover:shadow-md transition-shadow cursor-default">
      <CardContent className="pt-4 pb-3 px-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-sm font-semibold text-slate-800 leading-tight">
            {coop.name}
          </p>
          <StatusBadge status={coop.status} />
        </div>
        <div className="flex gap-3 text-[11px] text-slate-500 mt-1">
          <span>
            Loan:{' '}
            <span className="font-medium text-slate-700">{coop.loan}</span>
          </span>
          <span>
            Vessels:{' '}
            <span className="font-medium text-slate-700">{coop.vessels}</span>
          </span>
        </div>
        <ScoreBar score={coop.score} />
        <div className="mt-2 flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-green-700 font-medium">
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
  headerClass: string
  borderClass: string
  titleColor: string
  children: React.ReactNode
}

function KanbanColumn({
  title,
  count,
  headerClass,
  borderClass,
  titleColor,
  children,
}: ColumnProps) {
  return (
    <div className="flex-1 min-w-0 flex flex-col">
      <div
        className={`${headerClass} ${borderClass} px-4 py-2.5 mb-3 flex items-center justify-between`}
      >
        <span className={`text-xs font-bold tracking-widest uppercase ${titleColor}`}>
          {title}
        </span>
        <span className="text-xs font-semibold bg-white/60 rounded-full px-2 py-0.5 text-slate-600">
          {count}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto pr-0.5">{children}</div>
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
    <div className="min-h-screen bg-[#f0f4f7] font-sans">
      {/* ── Top Navigation Bar ─────────────────────────────────────────── */}
      <header className="bg-[#002D40] px-6 py-0 flex items-center justify-between h-14 shadow-lg sticky top-0 z-50">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded bg-[#005E7A] flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 text-white fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.79-.12-.25-.33-.43-.58-.5L20 11V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v5l-1.29.42c-.26.07-.47.26-.59.51-.12.24-.14.52-.06.78zm5.05-8h8v1.88l-4-1.33-4 1.33z" />
            </svg>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            MarineSync
          </span>
        </div>

        {/* Center label */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-white text-sm font-semibold tracking-wide">
            Institutional Portal
          </span>
          <span className="text-[#7db8cc] text-[11px] tracking-wider uppercase font-medium">
            LandBank of the Philippines
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-[#005E7A] border-2 border-[#7db8cc] flex items-center justify-center">
              <span className="text-white text-xs font-bold">LB</span>
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-white text-xs font-medium">LB Officer</span>
              <span className="text-[#7db8cc] text-[10px]">Risk Division</span>
            </div>
          </div>
          <div className="h-5 w-px bg-white/20" />
          <Link
            href="/login"
            className="text-[#7db8cc] hover:text-white text-xs font-medium transition-colors flex items-center gap-1"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </Link>
        </div>
      </header>

      {/* ── Summary Stats Bar ──────────────────────────────────────────── */}
      <div className="bg-[#003a52] px-6 py-2.5 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm border-b border-[#005E7A]/30">
        <StatPill label="Pending Review" value="3" color="text-slate-300" />
        <Divider />
        <StatPill label="In Review" value="2" color="text-[#7db8cc]" />
        <Divider />
        <StatPill label="Approved" value="8" color="text-green-400" />
        <Divider />
        <StatPill
          label="Total ESG Impact"
          value="2,030 tons CO₂"
          color="text-green-300"
          icon
        />
      </div>

      {/* ── Main Content ───────────────────────────────────────────────── */}
      <main className="px-6 py-6 max-w-screen-xl mx-auto">
        {/* Section header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#002D40] tracking-tight">
              Loan Application Pipeline
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Cooperative e-ferry loan applications — classified by review stage
            </p>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Live — last updated 15:39 PHT
          </div>
        </div>

        {/* ── Kanban Board ─────────────────────────────────────────────── */}
        <div className="flex gap-5 items-start">
          {/* Column 1 — Pending */}
          <KanbanColumn
            title="Pending"
            count={pending.length}
            headerClass="bg-slate-100 rounded-t"
            borderClass="border-l-4 border-slate-400"
            titleColor="text-slate-600"
          >
            {pending.map((c) => (
              <PendingCard key={c.id} coop={c} />
            ))}
          </KanbanColumn>

          {/* Column 2 — In Review */}
          <KanbanColumn
            title="In Review"
            count={inReview.length}
            headerClass="bg-[#e8f4f8] rounded-t"
            borderClass="border-l-4 border-[#005E7A]"
            titleColor="text-[#005E7A]"
          >
            {inReview.map((c) => (
              <InReviewCard key={c.id} coop={c} />
            ))}
          </KanbanColumn>

          {/* Column 3 — Approved */}
          <KanbanColumn
            title="Approved"
            count={approved.length}
            headerClass="bg-green-50 rounded-t"
            borderClass="border-l-4 border-green-600"
            titleColor="text-green-700"
          >
            {approved.map((c) => (
              <ApprovedCard key={c.id} coop={c} />
            ))}
          </KanbanColumn>
        </div>

        {/* ── Risk Profile Detail Panel ─────────────────────────────────── */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-5 w-1 rounded-full bg-[#005E7A]" />
            <h2 className="text-base font-bold text-[#002D40] tracking-tight">
              Risk Profile —{' '}
              <span className="text-[#005E7A]">
                Iloilo-Guimaras Ferry Association
              </span>
            </h2>
            <Badge className="bg-[#e8f4f8] text-[#005E7A] border border-[#005E7A] text-[10px] font-semibold uppercase tracking-wider">
              Active Dossier
            </Badge>
          </div>

          <Card className="border border-slate-200 shadow-lg rounded-xl overflow-hidden">
            {/* Key Metrics Row */}
            <div className="border-b border-slate-100 bg-white">
              <div className="grid grid-cols-4 divide-x divide-slate-100">
                {/* Metric 1 */}
                <div className="px-6 py-5">
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mb-1">
                    Marine Bankability Score
                  </p>
                  <p className="text-4xl font-black text-[#005E7A] leading-none">
                    780
                    <span className="text-lg font-semibold text-slate-400">
                      /1000
                    </span>
                  </p>
                  <div className="mt-2 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#005E7A]"
                      style={{ width: '78%' }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Above average — Category: A
                  </p>
                </div>

                {/* Metric 2 */}
                <div className="px-6 py-5">
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mb-1">
                    Verified Monthly Revenue
                  </p>
                  <p className="text-4xl font-black text-green-700 leading-none">
                    ₱1.87M
                  </p>
                  <p className="text-[11px] text-slate-400 mt-2">
                    12-month average · LTFRB verified
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    <span className="text-[10px] text-green-700 font-medium">
                      Verified by DOTr data feed
                    </span>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="px-6 py-5">
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mb-1">
                    DSCR — Debt Service Coverage
                  </p>
                  <p className="text-4xl font-black text-green-700 leading-none">
                    1.45
                    <span className="text-lg font-semibold text-green-500">
                      x
                    </span>
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1 bg-green-50 border border-green-200 rounded px-2 py-0.5">
                    <svg
                      className="h-3 w-3 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-[10px] text-green-700 font-semibold">
                      Acceptable (&gt;1.25 threshold)
                    </span>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="px-6 py-5">
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mb-1">
                    Subsidized Loan Rate
                  </p>
                  <p className="text-4xl font-black text-[#002D40] leading-none">
                    3%
                    <span className="text-sm font-normal text-slate-400 ml-1">
                      p.a.
                    </span>
                  </p>
                  <div className="mt-2 space-y-0.5">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                      <span className="line-through text-slate-400">8% standard rate</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-green-700 font-medium">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd"/>
                      </svg>
                      5% LGU green e-ferry subsidy
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ESG Impact Section */}
            <CardContent className="bg-[#f7fafb] px-6 py-5 border-b border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="h-4 w-4 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.382 4.282a9 9 0 0113.16 11.16l-1.462-1.461a7 7 0 10-9.24 1.18l1.16 1.26a9 9 0 01-3.618-12.14zm12.3 12.3l-1.41-1.41a5 5 0 01-8.02-3.45l1.99-.37a3 3 0 104.88 2.24l1.56 2.99z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="text-sm font-bold text-green-800 uppercase tracking-wider">
                  ESG Environmental Impact
                </h3>
                <div className="h-px flex-1 bg-green-200" />
              </div>

              <div className="grid grid-cols-5 gap-4">
                <EsgStat
                  label="Carbon Savings"
                  value="520"
                  unit="tons/yr"
                  color="text-green-700"
                />
                <EsgStat
                  label="Fuel Reduction"
                  value="35%"
                  unit="vs. diesel"
                  color="text-green-700"
                />
                <EsgStat
                  label="Vessels Converting"
                  value="12"
                  unit="units"
                  color="text-[#005E7A]"
                />
                <div className="bg-white rounded-lg border border-green-100 p-3 text-center col-span-2">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">
                    SDG Goals Addressed
                  </p>
                  <div className="flex justify-center gap-2 flex-wrap">
                    {[7, 11, 13].map((sdg) => (
                      <span
                        key={sdg}
                        className="inline-flex items-center justify-center h-8 w-8 rounded bg-green-700 text-white text-xs font-black shadow-sm"
                      >
                        {sdg}
                      </span>
                    ))}
                  </div>
                  <p className="text-[9px] text-green-700 mt-1.5 font-medium">
                    Clean Energy · Sustainable Cities · Climate Action
                  </p>
                </div>
              </div>
            </CardContent>

            {/* Action Bar */}
            <div className="bg-white px-6 py-5">
              <div className="flex flex-col gap-3">
                {approveClicked ? (
                  <div className="w-full rounded-xl bg-green-50 border-2 border-green-500 p-4 text-center">
                    <p className="text-green-700 font-bold text-base flex items-center justify-center gap-2">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Loan Package Approved — Disbursement Initiated
                    </p>
                    <p className="text-[11px] text-green-600 mt-1">
                      Reference: LB-EFERRY-2025-0042 · Logged at 15:39 PHT
                    </p>
                  </div>
                ) : declineClicked ? (
                  <div className="w-full rounded-xl bg-red-50 border-2 border-red-400 p-4 text-center">
                    <p className="text-red-700 font-bold text-base">
                      Application Declined
                    </p>
                    <p className="text-[11px] text-red-500 mt-1">
                      Applicant notified. Action logged and auditable.
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Button
                      className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white text-sm font-bold tracking-wide rounded-xl shadow-md transition-all active:scale-[0.98]"
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
                      className="h-12 px-8 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 font-semibold rounded-xl"
                      onClick={() => setDeclineClicked(true)}
                    >
                      Decline
                    </Button>
                  </div>
                )}

                {/* Disclaimer */}
                {!approveClicked && !declineClicked && (
                  <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5">
                    <svg
                      className="h-4 w-4 text-amber-500 mt-0.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      <span className="font-semibold">Official Action Notice:</span>{' '}
                      By approving, LandBank commits to disbursing{' '}
                      <span className="font-bold">₱1,500,000</span> at{' '}
                      <span className="font-bold">3% subsidized rate</span> to
                      Iloilo-Guimaras Ferry Association. This action is{' '}
                      <span className="font-bold">logged, timestamped, and fully auditable</span>{' '}
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
          className="h-3.5 w-3.5 text-green-400"
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
      <span className="text-slate-400 text-[11px]">{label}:</span>
      <span className={`text-[12px] font-bold ${color}`}>{value}</span>
    </div>
  )
}

function Divider() {
  return <div className="h-4 w-px bg-white/10" />
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
    <div className="bg-white rounded-lg border border-green-100 p-3 text-center">
      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">
        {label}
      </p>
      <p className={`text-2xl font-black ${color} leading-none`}>{value}</p>
      <p className="text-[10px] text-slate-400 mt-0.5">{unit}</p>
    </div>
  )
}
