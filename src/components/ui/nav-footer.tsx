"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: "/", label: "Home" },
    { href: "/how-it-works", label: "How it works" },
    { href: "/features", label: "Features" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(5,5,7,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Verflow" className="h-7 w-7 object-contain" />
          <span className="font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem" }}>
            Verflow
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm transition-all",
                pathname === l.href ? "text-white bg-[rgba(255,255,255,0.07)]" : "text-[#9090a0] hover:text-white hover:bg-[rgba(255,255,255,0.04)]"
              )} style={{ fontFamily: "var(--font-body)" }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/#waitlist"
            className="px-5 py-2 rounded-full text-sm font-medium text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#6c47ff,#4f35cc)", fontFamily: "var(--font-body)" }}>
            Get early access
          </Link>
        </div>

        {/* Hamburger */}
        <button className="md:hidden text-[#9090a0] hover:text-white transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-[rgba(255,255,255,0.05)]" style={{ background: "rgba(5,5,7,0.98)" }}>
          <div className="container py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-sm text-[#9090a0] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-all"
                style={{ fontFamily: "var(--font-body)" }}>
                {l.label}
              </Link>
            ))}
            <Link href="/#waitlist" onClick={() => setMenuOpen(false)}
              className="mt-2 px-5 py-3 rounded-full text-sm font-medium text-white text-center transition-all"
              style={{ background: "linear-gradient(135deg,#6c47ff,#4f35cc)", fontFamily: "var(--font-body)" }}>
              Get early access
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export function Footer() {
  return (
    <footer style={{ background: "#050507", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="container py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/logo.png" alt="Verflow" className="h-7 w-7 object-contain" />
              <span className="font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Verflow</span>
            </div>
            <p className="text-[#55556a] text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              The AI operating system for modern teams.
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="text-xs font-semibold text-[#333340] uppercase tracking-widest mb-4" style={{ fontFamily: "var(--font-display)" }}>Product</div>
            <div className="flex flex-col gap-2">
              {["How it works", "Features", "Pricing", "Changelog"].map((l) => (
                <a key={l} href="#" className="text-[#55556a] hover:text-white text-sm transition-colors" style={{ fontFamily: "var(--font-body)" }}>{l}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-[#333340] uppercase tracking-widest mb-4" style={{ fontFamily: "var(--font-display)" }}>Company</div>
            <div className="flex flex-col gap-2">
              {["About", "Blog", "Careers", "Contact"].map((l) => (
                <a key={l} href="#" className="text-[#55556a] hover:text-white text-sm transition-colors" style={{ fontFamily: "var(--font-body)" }}>{l}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-[#333340] uppercase tracking-widest mb-4" style={{ fontFamily: "var(--font-display)" }}>Legal</div>
            <div className="flex flex-col gap-2">
              {["Privacy", "Terms", "Security"].map((l) => (
                <a key={l} href="#" className="text-[#55556a] hover:text-white text-sm transition-colors" style={{ fontFamily: "var(--font-body)" }}>{l}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[rgba(255,255,255,0.05)]">
          <p className="text-[#333340] text-xs" style={{ fontFamily: "var(--font-body)" }}>
            © 2025 Verflow. Built for the next generation of teams.
          </p>
          <div className="flex items-center gap-4">
            {/* Twitter/X */}
            <a href="#" className="text-[#333340] hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="text-[#333340] hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
