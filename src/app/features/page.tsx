"use client"

import { Nav, Footer } from "@/components/ui/nav-footer"
import { ExpandableGallery } from "@/components/ui/expandable-gallery"
import { BackgroundBoxes } from "@/components/ui/background-boxes"
import { WavyBackground } from "@/components/ui/wavy-background"
import { WaitlistHero } from "@/components/ui/waitlist-hero"

const features = [
  {
    id: "messaging",
    label: "Layer 01",
    title: "AI-Powered Messaging",
    description: "Replace Slack entirely. Real-time channels, DMs, and threads with an AI layer that reads every conversation, surfaces what needs your attention, and generates catch-up summaries for any channel in one click. No more 'sorry, I missed that message.'",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>,
    preview: (
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-[#6c47ff]" />
          <span className="text-xs text-[#6c47ff] font-semibold" style={{ fontFamily: "var(--font-display)" }}>#engineering</span>
        </div>
        {["Priya: Design system update is live on staging", "Marcus: Reviewing now before we ship", "Kai: Heads up — API rate limits changed in v2 docs"].map((msg, i) => (
          <div key={i} className="text-xs text-[#9090a0]" style={{ fontFamily: "var(--font-body)" }}>{msg}</div>
        ))}
        <div className="pt-2 border-t border-[rgba(255,255,255,0.05)] text-xs text-[#6c47ff] flex items-center gap-1" style={{ fontFamily: "var(--font-body)" }}>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          AI Summary: Design shipped, Kai flagged API changes — review needed
        </div>
      </div>
    ),
  },
  {
    id: "tasks",
    label: "Layer 02",
    title: "Intelligent Task Management",
    description: "Replace Jira, Asana, and Trello. Create tasks with natural language. The AI breaks goals into subtasks, assigns them based on team availability and skill, and tracks everything automatically. Each morning, every person knows their exact top 3 priorities.",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>,
    preview: (
      <div className="p-4">
        <div className="space-y-2">
          {[
            { task: "Finalise API integration", owner: "K", priority: "High", status: "In Progress" },
            { task: "Write onboarding copy", owner: "P", priority: "Medium", status: "To Do" },
            { task: "Fix mobile navigation", owner: "M", priority: "High", status: "In Progress" },
          ].map((t) => (
            <div key={t.task} className="flex items-center gap-3 px-3 py-2 rounded-lg" style={{ background: "#050507", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-5 h-5 rounded border border-[rgba(255,255,255,0.1)] flex-shrink-0" />
              <span className="text-xs text-[#9090a0] flex-1 truncate" style={{ fontFamily: "var(--font-body)" }}>{t.task}</span>
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white" style={{ background: "#6c47ff" }}>{t.owner}</div>
              <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: t.priority === "High" ? "rgba(255,100,100,0.1)" : "rgba(255,200,50,0.1)", color: t.priority === "High" ? "#ff6464" : "#f59e0b", fontFamily: "var(--font-body)" }}>{t.priority}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "brain",
    label: "Layer 03",
    title: "Company Brain",
    description: "Replace Notion and Confluence. Every document, decision, meeting note, and message your company ever created — instantly searchable in plain English. Ask 'what did we decide about the enterprise pricing in Q3?' and get the answer in 3 seconds with a source link.",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>,
    preview: (
      <div className="p-4">
        <div className="mb-3 px-3 py-2 rounded-lg flex items-center gap-2" style={{ background: "#050507", border: "1px solid rgba(108,71,255,0.3)" }}>
          <svg className="w-3.5 h-3.5 text-[#6c47ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <span className="text-xs text-[#55556a]" style={{ fontFamily: "var(--font-body)" }}>What&apos;s our refund policy for enterprise?</span>
        </div>
        <div className="px-3 py-2.5 rounded-lg" style={{ background: "rgba(108,71,255,0.06)", border: "1px solid rgba(108,71,255,0.15)" }}>
          <p className="text-xs text-[#9090a0] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Enterprise contracts include a 30-day money-back clause per Section 4.2 of the standard agreement...
          </p>
          <p className="text-[10px] text-[#333340] mt-1.5" style={{ fontFamily: "var(--font-body)" }}>Source: Enterprise Contract Template · Legal folder</p>
        </div>
      </div>
    ),
  },
  {
    id: "dashboard",
    label: "Layer 04",
    title: "CEO Intelligence Dashboard",
    description: "See your entire company on one screen, live. Which teams are on track, which projects are at risk, which employees are overwhelmed. AI generates a daily company briefing and flags when you need to step in — before problems escalate.",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
    preview: (
      <div className="p-4 space-y-3">
        {[
          { team: "Product", health: 91, trend: "up" },
          { team: "Engineering", health: 78, trend: "stable" },
          { team: "Sales", health: 54, trend: "down" },
        ].map((t) => (
          <div key={t.team} className="flex items-center gap-3">
            <span className="text-xs text-[#9090a0] w-20 flex-shrink-0" style={{ fontFamily: "var(--font-body)" }}>{t.team}</span>
            <div className="flex-1 h-1.5 rounded-full" style={{ background: "#111116" }}>
              <div className="h-full rounded-full" style={{ width: `${t.health}%`, background: t.health > 70 ? "#22c55e" : "#f59e0b" }} />
            </div>
            <span className="text-xs font-semibold w-8 text-right" style={{ color: t.health > 70 ? "#22c55e" : "#f59e0b", fontFamily: "var(--font-display)" }}>{t.health}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "people",
    label: "Layer 05",
    title: "People & Culture Layer",
    description: "Replace BambooHR and Lattice. Employee profiles, performance patterns, 1-on-1 templates auto-generated by AI from what that person has actually been working on. Anonymous feedback. The AI notices when someone is burning out before they do.",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
    preview: (
      <div className="p-4 space-y-3">
        {[
          { name: "Alex Chen", role: "Engineer", status: "Active", score: 92 },
          { name: "Priya Nair", role: "Designer", status: "Active", score: 88 },
          { name: "Marcus Webb", role: "PM", status: "Flagged", score: 61 },
        ].map((p) => (
          <div key={p.name} className="flex items-center gap-3 px-3 py-2 rounded-lg" style={{ background: "#050507", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0" style={{ background: "linear-gradient(135deg,#6c47ff,#4f35cc)" }}>{p.name[0]}</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>{p.name}</p>
              <p className="text-[10px] text-[#55556a]" style={{ fontFamily: "var(--font-body)" }}>{p.role}</p>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: p.status === "Flagged" ? "rgba(255,100,100,0.1)" : "rgba(34,197,94,0.1)", color: p.status === "Flagged" ? "#ff6464" : "#22c55e", fontFamily: "var(--font-body)" }}>{p.status}</span>
          </div>
        ))}
      </div>
    ),
  },
]

const comparison = [
  { feature: "AI-native from day one", vf: true, slack: false, notion: false, ms: false },
  { feature: "Replaces 10+ tools", vf: true, slack: false, notion: false, ms: false },
  { feature: "CEO live dashboard", vf: true, slack: false, notion: false, ms: false },
  { feature: "Daily AI briefings", vf: true, slack: false, notion: false, ms: false },
  { feature: "Company Brain search", vf: true, slack: false, notion: true, ms: false },
  { feature: "Burnout detection", vf: true, slack: false, notion: false, ms: false },
  { feature: "Built for teams under 200", vf: true, slack: true, notion: true, ms: false },
]

export default function FeaturesPage() {
  return (
    <>
      <Nav />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 border-b border-[rgba(255,255,255,0.05)]">
          <div className="container text-center max-w-2xl mx-auto">
            <div className="text-xs font-semibold text-[#6c47ff] uppercase tracking-widest mb-4" style={{ fontFamily: "var(--font-display)" }}>Features</div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5" style={{ fontFamily: "var(--font-display)" }}>
              Everything your team
              <br />
              <span style={{ background: "linear-gradient(135deg,#6c47ff,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                will ever need.
              </span>
            </h1>
            <p className="text-[#9090a0] text-lg" style={{ fontFamily: "var(--font-body)" }}>
              Five intelligent layers that replace your entire tool stack — built AI-native, not AI-bolted-on.
            </p>
          </div>
        </section>

        {/* Expandable Gallery */}
        <section className="py-24">
          <div className="container max-w-3xl mx-auto">
            <ExpandableGallery features={features} />
          </div>
        </section>

        {/* Comparison table */}
        <BackgroundBoxes className="py-24">
          <div className="container max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs font-semibold text-[#6c47ff] uppercase tracking-widest mb-4" style={{ fontFamily: "var(--font-display)" }}>Comparison</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Why not just use the others?
              </h2>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
              {/* Header */}
              <div className="grid grid-cols-5 px-6 py-4" style={{ background: "#0c0c10", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="col-span-1" />
                {["Verflow", "Slack", "Notion", "Microsoft"].map((h) => (
                  <div key={h} className={`text-center text-xs font-bold ${h === "Verflow" ? "text-[#8b6eff]" : "text-[#333340]"}`} style={{ fontFamily: "var(--font-display)" }}>{h}</div>
                ))}
              </div>
              {comparison.map((row, i) => (
                <div key={row.feature} className="grid grid-cols-5 px-6 py-4 items-center" style={{ background: i % 2 === 0 ? "#050507" : "#080809", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="col-span-1 text-xs text-[#9090a0]" style={{ fontFamily: "var(--font-body)" }}>{row.feature}</div>
                  {[row.vf, row.slack, row.notion, row.ms].map((val, j) => (
                    <div key={j} className="flex justify-center">
                      {val ? (
                        <svg className={`w-4 h-4 ${j === 0 ? "text-[#6c47ff]" : "text-[#22c55e]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-[#222228]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </BackgroundBoxes>

        {/* CTA */}
        <WavyBackground containerClassName="py-28" className="text-center px-6 max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Stop paying for 10 tools.
          </h2>
          <p className="text-[#9090a0] mb-8" style={{ fontFamily: "var(--font-body)" }}>
            Join the waitlist. We&apos;re onboarding the first 50 teams personally — free during beta.
          </p>
          <WaitlistHero />
        </WavyBackground>
      </main>
      <Footer />
    </>
  )
}
