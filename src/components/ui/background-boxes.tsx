"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface BackgroundBoxesProps {
  className?: string
  children?: React.ReactNode
}

export function BackgroundBoxes({ className, children }: BackgroundBoxesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef({ x: -1000, y: -1000 })
  // lerped position for smooth glow
  const lerpRef   = useRef({ x: -1000, y: -1000 })
  const animRef   = useRef(0)
  const sparkles  = useRef<{ col: number; row: number; life: number; maxLife: number }[]>([])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext("2d")!
    const CELL   = 44

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Listen on WINDOW so glow works anywhere on the section
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    window.addEventListener("mousemove", onMove)

    const spawnSparkle = () => {
      if (Math.random() > 0.04) return
      const cols = Math.ceil(canvas.width  / CELL)
      const rows = Math.ceil(canvas.height / CELL)
      sparkles.current.push({
        col: Math.floor(Math.random() * cols),
        row: Math.floor(Math.random() * rows),
        life: 0,
        maxLife: 60 + Math.random() * 40,
      })
    }

    const render = () => {
      const w = canvas.width
      const h = canvas.height

      // Lerp toward real mouse
      lerpRef.current.x += (mouseRef.current.x - lerpRef.current.x) * 0.07
      lerpRef.current.y += (mouseRef.current.y - lerpRef.current.y) * 0.07

      ctx.clearRect(0, 0, w, h)
      spawnSparkle()
      sparkles.current = sparkles.current.filter(s => s.life < s.maxLife)

      const cols = Math.ceil(w / CELL)
      const rows = Math.ceil(h / CELL)

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const cx = c * CELL
          const cy = r * CELL
          const centerX = cx + CELL / 2
          const centerY = cy + CELL / 2
          const dx   = lerpRef.current.x - centerX
          const dy   = lerpRef.current.y - centerY
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 200
          const glow = Math.max(0, 1 - dist / maxDist)

          const sparkle = sparkles.current.find(s => s.col === c && s.row === r)
          const sf = sparkle ? Math.sin((sparkle.life / sparkle.maxLife) * Math.PI) * 0.45 : 0
          if (sparkle) sparkle.life++

          const alpha = glow * 0.4 + sf
          if (alpha > 0.01) {
            ctx.fillStyle = `rgba(108,71,255,${alpha})`
            ctx.fillRect(cx + 1, cy + 1, CELL - 2, CELL - 2)
          }

          ctx.strokeStyle = "rgba(255,255,255,0.04)"
          ctx.lineWidth   = 1
          ctx.strokeRect(cx, cy, CELL, CELL)
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
    <div className={cn("relative overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
