"use client"

import { useEffect, useRef, useState } from "react"
import { WaitlistHero } from "@/components/ui/waitlist-hero"
import { BackgroundBoxes } from "@/components/ui/background-boxes"
import { WavyBackground } from "@/components/ui/wavy-background"
import { Nav, Footer } from "@/components/ui/nav-footer"

// ── Dot grid — listens on window so it works everywhere ──────────────────
function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  // lerped mouse for smooth glow movement
  const lerpRef  = useRef({ x: -9999, y: -9999 })
  const animRef  = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext("2d")!

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Listen on WINDOW — not canvas — so it works regardless of z-index
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    window.addEventListener("mousemove", onMove)

    const GAP = 34
    const render = () => {
      const w = canvas.width
      const h = canvas.height

      // Lerp toward real mouse — smooths the glow
      lerpRef.current.x += (mouseRef.current.x - lerpRef.current.x) * 0.08
      lerpRef.current.y += (mouseRef.current.y - lerpRef.current.y) * 0.08

      ctx.clearRect(0, 0, w, h)

      const cols = Math.ceil(w / GAP) + 1
      const rows = Math.ceil(h / GAP) + 1

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x  = c * GAP
          const y  = r * GAP
          const dx = lerpRef.current.x - x
          const dy = lerpRef.current.y - y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 180) {
            const t      = 1 - dist / 180
            const radius = 0.8 + t * 2.8
            const alpha  = 0.06 + t * 0.65
            // purple tint near cursor
            const rr = Math.round(108 + t * 60)
            const gg = Math.round(71  + t * 20)
            ctx.fillStyle = `rgba(${rr},${gg},255,${alpha})`
            ctx.beginPath()
            ctx.arc(x, y, radius, 0, Math.PI * 2)
            ctx.fill()
          } else {
            ctx.fillStyle = "rgba(255,255,255,0.055)"
            ctx.beginPath()
            ctx.arc(x, y, 0.8, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      animRef.current = requestAnimationFrame(render)
    }
    render()

    return () => {
      window.removeEventListener("resize",    resize)
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ willChange: "transform", transform: "translateZ(0)" }}
    />
  )
}

// ── Orbital rings ─────────────────────────────────────────────────────────
function OrbitalRings() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        perspective: "1200px",
        transform: "perspective(1200px) rotateX(12deg)",
        transformOrigin: "center bottom",
        opacity: 0.55,
      }}
    >
      <div className="absolute inset-0" style={{ animation: "spin 90s linear infinite" }}>
        <div className="absolute top-1/2 left-1/2"
          style={{ width: 1800, height: 1800, transform: "translate(-50%,-50%)", willChange: "transform" }}>
          <img
            src="https://framerusercontent.com/images/oqZEqzDEgSLygmUDuZAYNh2XQ9U.png?scale-down-to=2048"
            alt="" className="w-full h-full object-cover opacity-25"
          />
        </div>
      </div>
      <div className="absolute inset-0" style={{ animation: "spinReverse 70s linear infinite" }}>
        <div className="absolute top-1/2 left-1/2"
          style={{ width: 900, height: 900, transform: "translate(-50%,-50%)", willChange: "transform" }}>
          <img
            src="https://framerusercontent.com/images/UbucGYsHDAUHfaGZNjwyCzViw8.png?scale-down-to=1024"
            alt="" className="w-full h-full object-cover opacity-35"
          />
        </div>
      </div>
    </div>
  )
}

// ── Tool list ─────────────────────────────────────────────────────────────
const tools = [
  { name: "Slack",  color: "#4A154B", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg> },
  { name: "Notion", color: "#ffffff", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/></svg> },
  { name: "Jira",   color: "#0052CC", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.004-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.762a1.005 1.005 0 0 0-1.001-1.005zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24.019 12.49V1.005A1.001 1.001 0 0 0 23.013 0z"/></svg> },
  { name: "Gmail",  color: "#EA4335", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg> },
  { name: "Asana",  color: "#F06A6A", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 4.8a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8zm-4.8 7.2a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8zm9.6 0a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8z"/></svg> },
  { name: "Zoom",   color: "#2D8CFF", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M16.408 4.892H5.55a3.59 3.59 0 0 0-3.59 3.59v7.636a3.59 3.59 0 0 0 3.59 3.59h10.858a3.59 3.59 0 0 0 3.59-3.59V8.482a3.59 3.59 0 0 0-3.59-3.59zm7.629 2.948-4.039 4.046v2.948l4.04 4.046V7.84z"/></svg> },
  { name: "Drive",  color: "#34A853", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12.01 1.485c-.49-.84-1.53-.84-2.02 0L.04 18.515c-.49.84.13 1.88 1.01 1.88H22.95c.88 0 1.5-1.04 1.01-1.88zm-.01 3.03L20.6 18.4H3.41L12 4.515zm-1 8.985v2h2v-2h-2zm0-4v3h2v-3h-2z"/></svg> },
  { name: "Figma",  color: "#F24E1E", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.026-4.49 4.515-4.49c2.49 0 4.516 2.014 4.516 4.49S10.661 24 8.172 24zm0-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019c1.666 0 3.02-1.355 3.02-3.019s-1.354-3.019-3.02-3.019zm7.68 7.509h-.049c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.049c2.476 0 4.49 2.014 4.49 4.49S18.328 24 15.852 24zm-.049-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.049c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-.049z"/></svg> },
]

// ── Page ──────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [waitlistCount] = useState(247)

  return (
    <>
      <Nav />
      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-end pb-28 overflow-hidden">
          <OrbitalRings />
          <DotGrid />
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to top, #050507 15%, rgba(5,5,7,0.65) 45%, transparent 100%)" }}
          />

          <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">

            <div className="hero-line inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 text-xs font-medium"
              style={{ background: "rgba(108,71,255,0.12)", border: "1px solid rgba(108,71,255,0.3)", color: "#8b6eff", fontFamily: "var(--font-body)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#6c47ff] animate-pulse" />
              {waitlistCount} teams already waiting
            </div>

            <h1 className="hero-line text-5xl md:text-7xl font-extrabold text-white mb-6 leading-none"
              style={{ fontFamily: "var(--font-display)" }}>
              Every tool your
              <br />
              <span style={{ background: "linear-gradient(135deg,#6c47ff,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                team actually needs.
              </span>
            </h1>

            <p className="hero-line text-[#9090a0] text-lg md:text-xl mb-10 max-w-xl leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}>
              Verflow replaces Slack, Notion, Jira, and 7 other tools with one AI-native workspace that tells you
              what matters, who&apos;s blocked, and what to do next.
            </p>

            <div className="hero-line">
              <WaitlistHero />
            </div>

            <p className="hero-line mt-4 text-xs text-[#333340]" style={{ fontFamily: "var(--font-body)" }}>
              Free during beta · No credit card · Cancel anytime
            </p>
          </div>
        </section>

        {/* ── TOOLS REPLACED ── */}
        <section className="py-20 border-t border-[rgba(255,255,255,0.05)]">
          <div className="container">
            <p className="text-center text-xs font-semibold text-[#333340] uppercase tracking-widest mb-10"
              style={{ fontFamily: "var(--font-display)" }}>
              One workspace replaces all of these
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {tools.map((tool) => (
                <div key={tool.name}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-200 hover:border-[rgba(255,255,255,0.15)] hover:scale-105"
                  style={{ background: "#0c0c10", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-body)" }}>
                  <span style={{ color: tool.color }}>{tool.icon}</span>
                  <span className="text-sm text-[#9090a0]">{tool.name}</span>
                </div>
              ))}
              <div className="px-4 py-2.5 rounded-full text-sm text-[#55556a]" style={{ fontFamily: "var(--font-body)" }}>
                + 3 more
              </div>
            </div>
          </div>
        </section>

        {/* ── PROBLEM — Background Boxes ── */}
        <BackgroundBoxes className="py-28">
          <div className="container text-center max-w-2xl mx-auto">
            <div className="text-xs font-semibold text-[#6c47ff] uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-display)" }}>The problem</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-display)" }}>
              Your team spends 2.5 hours daily just navigating tools.
            </h2>
            <p className="text-[#9090a0] text-lg leading-relaxed mb-12" style={{ fontFamily: "var(--font-body)" }}>
              Not working. Not thinking. Switching tabs, searching for that message, chasing down the latest doc
              version. That&apos;s 30% of every workday — gone.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[
                { stat: "9+",   label: "Apps the average employee opens daily" },
                { stat: "2.5h", label: "Lost every day per employee" },
                { stat: "$19k", label: "Annual cost per employee in tool chaos" },
              ].map((item) => (
                <div key={item.stat} className="p-6 rounded-2xl"
                  style={{ background: "rgba(5,5,7,0.8)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="text-3xl font-bold mb-2"
                    style={{ fontFamily: "var(--font-display)", background: "linear-gradient(135deg,#6c47ff,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {item.stat}
                  </div>
                  <div className="text-xs text-[#55556a] leading-snug" style={{ fontFamily: "var(--font-body)" }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BackgroundBoxes>

        {/* ── FEATURES BENTO ── */}
        <section className="py-28">
          <div className="container">
            <div className="text-center mb-16">
              <div className="text-xs font-semibold text-[#6c47ff] uppercase tracking-widest mb-4"
                style={{ fontFamily: "var(--font-display)" }}>What Verflow does</div>
              <h2 className="text-4xl md:text-5xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}>One OS. Every layer.</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Big card */}
              <div className="md:col-span-2 p-8 rounded-2xl relative overflow-hidden group transition-all duration-300 hover:border-[rgba(108,71,255,0.3)]"
                style={{ background: "#0c0c10", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(108,71,255,0.08), transparent 70%)" }} />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl mb-5 flex items-center justify-center"
                    style={{ background: "rgba(108,71,255,0.15)" }}>
                    <svg className="w-5 h-5 text-[#8b6eff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>AI-powered messaging</h3>
                  <p className="text-[#9090a0] text-sm leading-relaxed mb-6" style={{ fontFamily: "var(--font-body)" }}>
                    Never drown in unread messages again. Verflow reads every conversation and surfaces only what
                    needs your attention — with one-click AI summaries of any channel.
                  </p>
                  <div className="rounded-xl p-4 space-y-3" style={{ background: "#050507", border: "1px solid rgba(255,255,255,0.06)" }}>
                    {[
                      { name: "Priya",  msg: "The design system update is live on staging", time: "2m" },
                      { name: "Marcus", msg: "Nice! I will do a review pass before we ship", time: "1m" },
                    ].map((m) => (
                      <div key={m.name} className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                          style={{ background: "linear-gradient(135deg,#6c47ff,#4f35cc)" }}>{m.name[0]}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>{m.name}</span>
                            <span className="text-[10px] text-[#333340]">{m.time} ago</span>
                          </div>
                          <p className="text-xs text-[#9090a0]" style={{ fontFamily: "var(--font-body)" }}>{m.msg}</p>
                        </div>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-[rgba(255,255,255,0.05)]">
                      <div className="text-xs text-[#6c47ff] flex items-center gap-1.5" style={{ fontFamily: "var(--font-body)" }}>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                        AI: Design system shipped, Marcus reviewing. No action needed.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Small cards */}
              <div className="flex flex-col gap-4">
                {[
                  {
                    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
                    title: "CEO Dashboard", desc: "Real-time company health. Every team, every project, live.",
                  },
                  {
                    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>,
                    title: "Company Brain", desc: "Ask anything. Get answers from every doc ever created.",
                  },
                  {
                    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
                    title: "Daily Briefings", desc: "Every morning, AI tells each person exactly what matters.",
                  },
                ].map((card) => (
                  <div key={card.title}
                    className="flex-1 p-5 rounded-2xl group transition-all duration-200 hover:border-[rgba(108,71,255,0.3)] hover:scale-[1.02]"
                    style={{ background: "#0c0c10", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="w-9 h-9 rounded-lg mb-3 flex items-center justify-center text-[#8b6eff] transition-colors"
                      style={{ background: "rgba(108,71,255,0.1)" }}>
                      {card.icon}
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>{card.title}</h3>
                    <p className="text-xs text-[#55556a] leading-snug" style={{ fontFamily: "var(--font-body)" }}>{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA — Wavy Background ── */}
        <WavyBackground containerClassName="py-32" className="text-center px-6 max-w-2xl mx-auto">
          <div id="waitlist">
            <div className="text-xs font-semibold text-[#8b6eff] uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-display)" }}>Early access</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}>Be first when we launch.</h2>
            <p className="text-[#9090a0] mb-10 text-lg" style={{ fontFamily: "var(--font-body)" }}>
              We&apos;re onboarding the first 50 teams personally. Join the waitlist and we&apos;ll reach out within 48 hours.
            </p>
            <WaitlistHero />
          </div>
        </WavyBackground>

      </main>
      <Footer />
    </>
  )
}
