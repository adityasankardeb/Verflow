"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface Feature {
  id: string
  label: string
  title: string
  description: string
  icon: React.ReactNode
  preview: React.ReactNode
}

interface ExpandableGalleryProps {
  features: Feature[]
}

export function ExpandableGallery({ features }: ExpandableGalleryProps) {
  const [active, setActive] = useState(features[0]?.id ?? "")

  return (
    <div className="flex flex-col gap-3">
      {features.map((f) => {
        const isOpen = active === f.id
        return (
          <div
            key={f.id}
            onClick={() => setActive(isOpen ? "" : f.id)}
            className={cn(
              "rounded-2xl border transition-all duration-500 overflow-hidden cursor-pointer",
              isOpen
                ? "border-[rgba(108,71,255,0.4)] bg-[#0c0c10]"
                : "border-[rgba(255,255,255,0.07)] bg-[#080809] hover:border-[rgba(255,255,255,0.12)]"
            )}
          >
            {/* Header */}
            <div className="flex items-center gap-4 px-6 py-5">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300",
                isOpen ? "bg-[rgba(108,71,255,0.2)]" : "bg-[rgba(255,255,255,0.05)]"
              )}>
                <span className={isOpen ? "text-[#8b6eff]" : "text-[#55556a]"}>{f.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-[#55556a] uppercase tracking-widest mb-0.5" style={{ fontFamily: "var(--font-display)" }}>
                  {f.label}
                </div>
                <div className={cn("font-semibold text-base transition-colors", isOpen ? "text-white" : "text-[#9090a0]")} style={{ fontFamily: "var(--font-display)" }}>
                  {f.title}
                </div>
              </div>
              <svg
                className={cn("w-4 h-4 text-[#55556a] transition-transform duration-300 flex-shrink-0", isOpen && "rotate-180")}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Expanded content */}
            <div className={cn(
              "grid transition-all duration-500",
              isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}>
              <div className="overflow-hidden">
                <div className="px-6 pb-6 grid md:grid-cols-2 gap-6">
                  <p className="text-[#9090a0] text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                    {f.description}
                  </p>
                  <div className="rounded-xl overflow-hidden border border-[rgba(255,255,255,0.07)] bg-[#050507] min-h-[140px] flex items-center justify-center">
                    {f.preview}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
