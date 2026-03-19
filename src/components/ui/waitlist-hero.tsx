"use client"

import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import emailjs from "@emailjs/browser"

const EMAILJS_SERVICE_ID  = "service_u6k7jxf"
const EMAILJS_TEMPLATE_ID = "template_vrojj8s"
const EMAILJS_PUBLIC_KEY  = "ENYrEtNHJXkW9JSqF"

type Step = 1 | 2 | 3 | "done"

interface FormData {
  name: string
  role: string
  email: string
  company: string
  size: string
  industry: string
  tools: string[]
  painPoints: string[]
  biggestPain: string
}

const ROLES      = ["Founder / CEO", "CTO / Technical Lead", "Operations", "Product Manager", "Team Lead", "Other"]
const SIZES      = ["2–10", "11–30", "31–100", "100+"]
const INDUSTRIES = ["SaaS / Tech", "Agency / Studio", "E-commerce", "Finance", "Healthcare", "Other"]
const TOOLS      = ["Slack", "Notion", "Jira", "Asana", "Trello", "Gmail", "Google Drive", "Microsoft Teams", "Zoom", "Figma", "Linear", "ClickUp"]
const PAINS      = [
  "Too many tools to manage",
  "Team communication is scattered",
  "No visibility into what's happening",
  "Onboarding new hires takes too long",
  "Tasks fall through the cracks",
  "Hard to find old decisions / docs",
  "Meetings to replace tools that should work",
  "Can't see company health at a glance",
]

function useConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fire = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    const colors = ["#6c47ff", "#8b6eff", "#a78bfa", "#ffffff", "#4f35cc"]
    canvas.width  = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    const particles = Array.from({ length: 80 }, () => ({
      x: canvas.width / 2, y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 2.2) * 10,
      life: 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 5 + 2,
    }))
    const animate = () => {
      if (!particles.length) { ctx.clearRect(0, 0, canvas.width, canvas.height); return }
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx; p.y += p.vy; p.vy += 0.45; p.life -= 2
        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(0, p.life / 100)
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill()
        if (p.life <= 0) particles.splice(i, 1)
      }
      requestAnimationFrame(animate)
    }
    animate()
  }
  return { canvasRef, fire }
}

function WaitlistModal({ onClose }: { onClose: () => void }) {
  const [step, setStep]       = useState<Step>(1)
  const [sending, setSending] = useState(false)
  const [error, setError]     = useState("")
  const [data, setData]       = useState<FormData>({
    name: "", role: "", email: "",
    company: "", size: "", industry: "",
    tools: [], painPoints: [], biggestPain: "",
  })
  const { canvasRef, fire } = useConfetti()

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  const set = (key: keyof FormData, value: string) =>
    setData((d) => ({ ...d, [key]: value }))

  const toggleArr = (key: "tools" | "painPoints", val: string) =>
    setData((d) => ({
      ...d,
      [key]: d[key].includes(val)
        ? d[key].filter((v) => v !== val)
        : [...d[key], val],
    }))

  const next = async () => {
    if (step !== 3) {
      setStep((s) => (s as number) + 1 as Step)
      return
    }
    setSending(true)
    setError("")
    try {
      const existing = JSON.parse(localStorage.getItem("vf_waitlist") || "[]")
      const position = existing.length + 1
      existing.push({ ...data, position, submittedAt: new Date().toISOString() })
      localStorage.setItem("vf_waitlist", JSON.stringify(existing))

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          first_name:        data.name.split(" ")[0],
          full_name:         data.name,
          email:             data.email,
          company:           data.company,
          role:              data.role,
          size:              data.size,
          industry:          data.industry,
          tools:             data.tools.length > 0 ? data.tools.join(", ") : "None selected",
          pain_points:       data.painPoints.join(", "),
          message:           data.biggestPain || "Not provided",
          waitlist_position: position,
        },
        EMAILJS_PUBLIC_KEY
      )
      setStep("done")
      fire()
    } catch (err) {
      console.error("EmailJS error:", err)
      setError("Confirmation email failed but your spot is saved. We will be in touch.")
      setStep("done")
      fire()
    } finally {
      setSending(false)
    }
  }

  const canProceed = () => {
    if (step === 1) return data.name.trim() && data.role && data.email.includes("@")
    if (step === 2) return data.company.trim() && data.size && data.industry
    if (step === 3) return data.painPoints.length > 0
    return false
  }

  const progress = step === "done" ? 100 : ((step as number) / 3) * 100

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          background: "rgba(0,0,0,0.88)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      />

      {/* Confetti canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />

      {/* Modal wrapper */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          pointerEvents: "none",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            pointerEvents: "all",
            width: "100%",
            maxWidth: "520px",
            maxHeight: "90vh",
            borderRadius: "20px",
            overflow: "hidden",
            background: "#0c0c10",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 25px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(108,71,255,0.1)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Progress bar */}
          <div style={{ height: "2px", background: "#111116", flexShrink: 0 }}>
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg,#6c47ff,#8b6eff)",
                transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
          </div>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "24px 24px 16px", flexShrink: 0 }}>
            <div>
              {step !== "done" && (
                <p style={{ fontSize: "11px", color: "#55556a", marginBottom: "4px", fontFamily: "var(--font-body)" }}>
                  Step {step as number} of 3
                </p>
              )}
              <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", fontFamily: "var(--font-display)", lineHeight: 1.2 }}>
                {step === 1 && "Who are you?"}
                {step === 2 && "Tell us about your company"}
                {step === 3 && "What is not working right now?"}
                {step === "done" && "You are in."}
              </h2>
            </div>
            <button
              onClick={onClose}
              style={{ color: "#55556a", background: "none", border: "none", cursor: "pointer", padding: "4px", marginLeft: "12px", flexShrink: 0 }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#55556a")}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable content */}
          <div style={{ overflowY: "auto", padding: "0 24px 24px", flex: 1 }}>

            {/* STEP 1 */}
            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#55556a", marginBottom: "8px", fontFamily: "var(--font-body)" }}>Your name</label>
                  <input
                    value={data.name} onChange={(e) => set("name", e.target.value)}
                    placeholder="Alex Chen"
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", background: "#111116", border: "1px solid rgba(255,255,255,0.07)", color: "#fff", fontSize: "14px", fontFamily: "var(--font-body)", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#55556a", marginBottom: "8px", fontFamily: "var(--font-body)" }}>Your email</label>
                  <input
                    type="email" value={data.email} onChange={(e) => set("email", e.target.value)}
                    placeholder="alex@company.com"
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", background: "#111116", border: "1px solid rgba(255,255,255,0.07)", color: "#fff", fontSize: "14px", fontFamily: "var(--font-body)", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#55556a", marginBottom: "8px", fontFamily: "var(--font-body)" }}>Your role</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    {ROLES.map((r) => (
                      <button
                        key={r} type="button" onClick={() => set("role", r)}
                        style={{
                          padding: "10px 12px", borderRadius: "12px", fontSize: "13px", textAlign: "left", cursor: "pointer", fontFamily: "var(--font-body)", transition: "all 0.15s",
                          background: data.role === r ? "rgba(108,71,255,0.15)" : "#111116",
                          border: `1px solid ${data.role === r ? "rgba(108,71,255,0.5)" : "rgba(255,255,255,0.07)"}`,
                          color: data.role === r ? "#8b6eff" : "#9090a0",
                        }}
                      >{r}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#55556a", marginBottom: "8px", fontFamily: "var(--font-body)" }}>Company name</label>
                  <input
                    value={data.company} onChange={(e) => set("company", e.target.value)}
                    placeholder="Acme Inc."
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", background: "#111116", border: "1px solid rgba(255,255,255,0.07)", color: "#fff", fontSize: "14px", fontFamily: "var(--font-body)", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#55556a", marginBottom: "8px", fontFamily: "var(--font-body)" }}>Team size</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {SIZES.map((s) => (
                      <button key={s} type="button" onClick={() => set("size", s)}
                        style={{
                          flex: 1, padding: "10px 8px", borderRadius: "12px", fontSize: "13px", cursor: "pointer", fontFamily: "var(--font-body)", transition: "all 0.15s",
                          background: data.size === s ? "rgba(108,71,255,0.15)" : "#111116",
                          border: `1px solid ${data.size === s ? "rgba(108,71,255,0.5)" : "rgba(255,255,255,0.07)"}`,
                          color: data.size === s ? "#8b6eff" : "#9090a0",
                        }}
                      >{s}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#55556a", marginBottom: "8px", fontFamily: "var(--font-body)" }}>Industry</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    {INDUSTRIES.map((ind) => (
                      <button key={ind} type="button" onClick={() => set("industry", ind)}
                        style={{
                          padding: "10px 12px", borderRadius: "12px", fontSize: "13px", textAlign: "left", cursor: "pointer", fontFamily: "var(--font-body)", transition: "all 0.15s",
                          background: data.industry === ind ? "rgba(108,71,255,0.15)" : "#111116",
                          border: `1px solid ${data.industry === ind ? "rgba(108,71,255,0.5)" : "rgba(255,255,255,0.07)"}`,
                          color: data.industry === ind ? "#8b6eff" : "#9090a0",
                        }}
                      >{ind}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#55556a", marginBottom: "8px", fontFamily: "var(--font-body)" }}>
                    Tools your team currently uses <span style={{ color: "#333340" }}>(pick all)</span>
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {TOOLS.map((t) => {
                      const active = data.tools.includes(t)
                      return (
                        <button key={t} type="button" onClick={() => toggleArr("tools", t)}
                          style={{
                            padding: "6px 12px", borderRadius: "999px", fontSize: "12px", cursor: "pointer", fontFamily: "var(--font-body)", transition: "all 0.15s",
                            background: active ? "rgba(108,71,255,0.15)" : "#111116",
                            border: `1px solid ${active ? "rgba(108,71,255,0.5)" : "rgba(255,255,255,0.07)"}`,
                            color: active ? "#8b6eff" : "#55556a",
                          }}
                        >{active && "✓ "}{t}</button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#55556a", marginBottom: "8px", fontFamily: "var(--font-body)" }}>
                    What problems does your team face today? <span style={{ color: "#333340" }}>(pick all)</span>
                  </label>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {PAINS.map((p) => {
                      const active = data.painPoints.includes(p)
                      return (
                        <button key={p} type="button" onClick={() => toggleArr("painPoints", p)}
                          style={{
                            display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "12px 16px", borderRadius: "12px", fontSize: "13px", textAlign: "left", cursor: "pointer", fontFamily: "var(--font-body)", transition: "all 0.15s",
                            background: active ? "rgba(108,71,255,0.1)" : "#111116",
                            border: `1px solid ${active ? "rgba(108,71,255,0.4)" : "rgba(255,255,255,0.07)"}`,
                            color: active ? "#c4b5fd" : "#9090a0",
                          }}
                        >
                          <div style={{
                            width: "16px", height: "16px", borderRadius: "4px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                            background: active ? "#6c47ff" : "rgba(255,255,255,0.05)",
                            border: active ? "none" : "1px solid rgba(255,255,255,0.1)",
                          }}>
                            {active && (
                              <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          {p}
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", color: "#55556a", marginBottom: "8px", fontFamily: "var(--font-body)" }}>
                    Describe your biggest frustration <span style={{ color: "#333340" }}>(optional)</span>
                  </label>
                  <textarea
                    value={data.biggestPain} onChange={(e) => set("biggestPain", e.target.value)}
                    placeholder="e.g. We have 6 tools and still cannot figure out who is working on what..."
                    rows={3}
                    style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", background: "#111116", border: "1px solid rgba(255,255,255,0.07)", color: "#fff", fontSize: "13px", fontFamily: "var(--font-body)", outline: "none", resize: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>
            )}

            {/* DONE */}
            {step === "done" && (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg,#6c47ff,#4f35cc)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", marginBottom: "8px", fontFamily: "var(--font-display)" }}>
                  Welcome to Verflow, {data.name.split(" ")[0]}.
                </h3>
                <p style={{ fontSize: "13px", color: "#9090a0", lineHeight: 1.6, marginBottom: "24px", fontFamily: "var(--font-body)" }}>
                  Check your inbox at <span style={{ color: "#fff" }}>{data.email}</span> — your confirmation is on its way.
                  We will reach out personally within 48 hours.
                </p>
                {error && (
                  <p style={{ fontSize: "12px", color: "#f59e0b", background: "rgba(245,158,11,0.08)", padding: "8px 12px", borderRadius: "8px", marginBottom: "16px", fontFamily: "var(--font-body)" }}>
                    {error}
                  </p>
                )}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px", textAlign: "left" }}>
                  {[
                    { label: "Company",     value: data.company },
                    { label: "Team size",   value: data.size + " people" },
                    { label: "Role",        value: data.role },
                    { label: "Pain points", value: data.painPoints.length + " identified" },
                  ].map((item) => (
                    <div key={item.label} style={{ padding: "12px 16px", borderRadius: "12px", background: "#111116", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <p style={{ fontSize: "10px", color: "#333340", marginBottom: "2px", fontFamily: "var(--font-body)" }}>{item.label}</p>
                      <p style={{ fontSize: "13px", color: "#fff", fontWeight: 600, fontFamily: "var(--font-display)" }}>{item.value}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={onClose}
                  style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "linear-gradient(135deg,#6c47ff,#4f35cc)", color: "#fff", fontSize: "14px", fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-body)", border: "none" }}
                >
                  Done
                </button>
              </div>
            )}

            {/* Footer nav */}
            {step !== "done" && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <button
                  onClick={() => step > 1 && setStep((s) => (s as number) - 1 as Step)}
                  disabled={step === 1}
                  style={{ fontSize: "13px", color: step === 1 ? "#333340" : "#55556a", background: "none", border: "none", cursor: step === 1 ? "default" : "pointer", fontFamily: "var(--font-body)" }}
                >
                  Back
                </button>
                <div style={{ display: "flex", gap: "6px" }}>
                  {[1, 2, 3].map((n) => (
                    <div key={n} style={{
                      width: "6px", height: "6px", borderRadius: "50%", transition: "background 0.2s",
                      background: n === step ? "#6c47ff" : n < (step as number) ? "#4f35cc" : "#222228",
                    }} />
                  ))}
                </div>
                <button
                  onClick={next}
                  disabled={!canProceed() || sending}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "10px 20px", borderRadius: "999px", background: "linear-gradient(135deg,#6c47ff,#4f35cc)", color: "#fff", fontSize: "13px", fontWeight: 500,
                    cursor: (!canProceed() || sending) ? "not-allowed" : "pointer",
                    opacity: (!canProceed() || sending) ? 0.4 : 1,
                    border: "none", fontFamily: "var(--font-body)", transition: "opacity 0.2s",
                  }}
                >
                  {sending ? (
                    <>
                      <svg style={{ animation: "spin 1s linear infinite", width: "14px", height: "14px" }} viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.25 }} />
                        <path fill="currentColor" style={{ opacity: 0.75 }} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : step === 3 ? "Submit" : "Next"}
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  )
}

// ── Exported trigger button — uses portal to escape any overflow/stacking context ──
export function WaitlistHero() {
  const [open, setOpen]       = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: "16px 32px", borderRadius: "999px",
          background: "linear-gradient(135deg,#6c47ff,#4f35cc)",
          color: "#fff", fontSize: "16px", fontWeight: 600,
          border: "none", cursor: "pointer",
          fontFamily: "var(--font-body)", transition: "all 0.2s",
        }}
        onMouseOver={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "scale(1.04)" }}
        onMouseOut={(e)  => { e.currentTarget.style.opacity = "1";   e.currentTarget.style.transform = "scale(1)" }}
      >
        Join the waitlist
      </button>

      {mounted && open && createPortal(
        <WaitlistModal onClose={() => setOpen(false)} />,
        document.body
      )}
    </>
  )
}