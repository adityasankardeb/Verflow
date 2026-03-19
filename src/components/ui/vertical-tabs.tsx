"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface Tab {
  id: string
  number: string
  label: string
  title: string
  description: string
  preview: React.ReactNode
}

interface VerticalTabsProps {
  tabs: Tab[]
}

export function VerticalTabs({ tabs }: VerticalTabsProps) {
  const [active, setActive] = useState(tabs[0]?.id ?? "")
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0]

  return (
    <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
      {/* Left: tab list */}
      <div className="flex flex-col gap-1">
        {tabs.map((tab) => {
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all duration-200",
                isActive
                  ? "bg-[rgba(108,71,255,0.12)] border border-[rgba(108,71,255,0.3)]"
                  : "hover:bg-[rgba(255,255,255,0.03)] border border-transparent"
              )}
            >
              <span className={cn(
                "text-xs font-bold tabular-nums transition-colors",
                isActive ? "text-[#6c47ff]" : "text-[#333340]"
              )} style={{ fontFamily: "var(--font-display)" }}>
                {tab.number}
              </span>
              <span className={cn(
                "text-sm font-medium transition-colors",
                isActive ? "text-white" : "text-[#55556a]"
              )} style={{ fontFamily: "var(--font-display)" }}>
                {tab.label}
              </span>
              {isActive && (
                <svg className="ml-auto w-3 h-3 text-[#6c47ff]" fill="currentColor" viewBox="0 0 6 10">
                  <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          )
        })}
      </div>

      {/* Right: content panel */}
      <div className="relative">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              "transition-all duration-400",
              active === tab.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
            )}
          >
            <div className="mb-6">
              <div className="text-xs font-medium text-[#6c47ff] uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-display)" }}>
                {tab.number} — {tab.label}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
                {tab.title}
              </h3>
              <p className="text-[#9090a0] text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                {tab.description}
              </p>
            </div>
            <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#0c0c10] overflow-hidden">
              {tab.preview}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
