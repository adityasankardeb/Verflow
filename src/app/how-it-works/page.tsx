"use client"

import { Nav, Footer } from "@/components/ui/nav-footer"
import { VerticalTabs } from "@/components/ui/vertical-tabs"
import { WavyBackground } from "@/components/ui/wavy-background"
import { WaitlistHero } from "@/components/ui/waitlist-hero"

const tabs = [
  {
    id: "messaging",
    number: "01",
    label: "Messaging",
    title: "Your team, always in sync",
    description: "Real-time channels, direct messages, and threads — all with AI that reads every conversation. One click to catch up on 50 unread messages. The AI tells you which three actually need your attention.",
    preview: (
      <div className="p-5 space-y-3">
        {[
          { avatar: "A", name: "Aisha", msg: "Sprint retro notes are in the doc", channel: "#engineering", time: "now" },
          { avatar: "R", name: "Ravi", msg: "Blocked on API keys — anyone have access?", channel: "#engineering", time: "2m", blocked: true },
          { avatar: "S", name: "Sara", msg: "Design handoff done for v2 screens", channel: "#design", time: "5m" },
        ].map((m) => (
          <div key={m.name} className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: "linear-gradient(135deg,#6c47ff,#4f35cc)" }}>{m.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>{m.name}</span>
                <span className="text-[10px] text-[#333340]">{m.channel}</span>
                <span className="text-[10px] text-[#333340] ml-auto">{m.time}</span>
              </div>
              <p className="text-xs text-[#9090a0] truncate" style={{ fontFamily: "var(--font-body)" }}>{m.msg}</p>
              {m.blocked && <span className="text-[10px] px-2 py-0.5 rounded-full mt-1 inline-block" style={{ background: "rgba(255,100,100,0.1)", color: "#ff6464" }}>Needs attention</span>}
            </div>
          </div>
        ))}
        <div className="pt-2 border-t border-[rgba(255,255,255,0.05)]">
          <p className="text-xs text-[#6c47ff] flex items-center gap-1.5" style={{ fontFamily: "var(--font-body)" }}>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            AI: Ravi needs API keys — 1 item needs your action
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "tasks",
    number: "02",
    label: "Task Management",
    title: "Everyone knows what to do next",
    description: "Create tasks, assign owners, set deadlines. The AI automatically breaks big goals into smaller tasks, assigns them based on availability, and tells each person their top 3 priorities every morning.",
    preview: (
      <div className="p-5">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "To Do", color: "#333340", items: ["Write release notes", "Update pricing page"] },
            { label: "In Progress", color: "#6c47ff", items: ["API integration", "Mobile nav fix"] },
            { label: "Done", color: "#22c55e", items: ["Auth flow", "DB migration"] },
          ].map((col) => (
            <div key={col.label}>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: col.color }} />
                <span className="text-[10px] font-semibold text-[#55556a]" style={{ fontFamily: "var(--font-display)" }}>{col.label}</span>
              </div>
              <div className="space-y-1.5">
                {col.items.map((item) => (
                  <div key={item} className="px-2.5 py-2 rounded-lg text-[10px] text-[#9090a0]" style={{ background: "#050507", border: "1px solid rgba(255,255,255,0.05)", fontFamily: "var(--font-body)" }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "brain",
    number: "03",
    label: "Company Brain",
    title: "Every answer, instantly",
    description: "Every document, decision, and conversation ever made in your company — searchable in plain English. New team members onboard themselves. Nobody asks the same question twice.",
    preview: (
      <div className="p-5">
        <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg" style={{ background: "#050507", border: "1px solid rgba(108,71,255,0.3)" }}>
          <svg className="w-3.5 h-3.5 text-[#6c47ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <span className="text-xs text-[#55556a]" style={{ fontFamily: "var(--font-body)" }}>What was the pricing decision in Q2?</span>
        </div>
        <div className="p-3 rounded-lg" style={{ background: "rgba(108,71,255,0.06)", border: "1px solid rgba(108,71,255,0.15)" }}>
          <p className="text-xs text-[#9090a0] leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            In the Q2 strategy meeting (June 14), the team agreed to introduce a Growth tier at $15/user/month...
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="text-[10px] text-[#333340]" style={{ fontFamily: "var(--font-body)" }}>Source: Q2 Meeting Notes · June 14</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "ceo",
    number: "04",
    label: "CEO Dashboard",
    title: "See your whole company, live",
    description: "One screen. Every team's health, every project's status, every bottleneck — in real time. No more finding out what went wrong in a Friday meeting. You know before it becomes a problem.",
    preview: (
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Company Health</span>
          <span className="text-xs font-bold text-[#22c55e]">87 / 100</span>
        </div>
        {[
          { team: "Engineering", status: "On track", pct: 82, color: "#22c55e" },
          { team: "Design", status: "On track", pct: 91, color: "#22c55e" },
          { team: "Sales", status: "At risk", pct: 54, color: "#f59e0b" },
        ].map((t) => (
          <div key={t.team}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#9090a0]" style={{ fontFamily: "var(--font-body)" }}>{t.team}</span>
              <span className="text-[10px]" style={{ color: t.color, fontFamily: "var(--font-body)" }}>{t.status}</span>
            </div>
            <div className="h-1 rounded-full" style={{ background: "#111116" }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${t.pct}%`, background: t.color }} />
            </div>
          </div>
        ))}
        <div className="pt-2 border-t border-[rgba(255,255,255,0.05)]">
          <p className="text-[10px] text-[#6c47ff]" style={{ fontFamily: "var(--font-body)" }}>AI: Sales team has 3 overdue tasks. Recommend a check-in today.</p>
        </div>
      </div>
    ),
  },
  {
    id: "briefings",
    number: "05",
    label: "Daily Briefings",
    title: "Start every day already knowing",
    description: "Every morning at 9am, Verflow sends each team member a personalised briefing: their priorities, who they're waiting on, what they missed overnight. Zero friction from first coffee to first commit.",
    preview: (
      <div className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(108,71,255,0.2)" }}>
            <svg className="w-4 h-4 text-[#8b6eff]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>Good morning, Alex</p>
            <p className="text-[10px] text-[#333340]" style={{ fontFamily: "var(--font-body)" }}>Thursday · 9:01 AM</p>
          </div>
        </div>
        <div className="space-y-2">
          {["Ship auth fix before noon — Marcus is blocked", "Review Sara's design handoff (just posted)", "Sales standup at 2pm — no prep needed"].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[10px] font-bold text-[#6c47ff] mt-0.5" style={{ fontFamily: "var(--font-display)" }}>0{i + 1}</span>
              <p className="text-xs text-[#9090a0]" style={{ fontFamily: "var(--font-body)" }}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <Nav />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 border-b border-[rgba(255,255,255,0.05)]">
          <div className="container text-center max-w-2xl mx-auto">
            <div className="text-xs font-semibold text-[#6c47ff] uppercase tracking-widest mb-4" style={{ fontFamily: "var(--font-display)" }}>
              How it works
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-5" style={{ fontFamily: "var(--font-display)" }}>
              Five layers.<br />
              <span style={{ background: "linear-gradient(135deg,#6c47ff,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                One workspace.
              </span>
            </h1>
            <p className="text-[#9090a0] text-lg" style={{ fontFamily: "var(--font-body)" }}>
              Verflow is built in five distinct intelligence layers — each solving a specific problem your team faces today.
            </p>
          </div>
        </section>

        {/* Vertical Tabs */}
        <section className="py-24">
          <div className="container">
            <VerticalTabs tabs={tabs} />
          </div>
        </section>

        {/* CTA */}
        <WavyBackground containerClassName="py-28" className="text-center px-6 max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Ready to see it in action?
          </h2>
          <p className="text-[#9090a0] mb-8" style={{ fontFamily: "var(--font-body)" }}>
            Join the waitlist and we&apos;ll onboard your team personally.
          </p>
          <WaitlistHero />
        </WavyBackground>
      </main>
      <Footer />
    </>
  )
}
