"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface WavyBackgroundProps {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
  colors?: string[]
  waveWidth?: number
  backgroundFill?: string
  blur?: number
  speed?: "slow" | "fast"
  waveOpacity?: number
}

export function WavyBackground({
  children,
  className,
  containerClassName,
  colors = ["#6c47ff", "#8b6eff", "#4f35cc", "#a78bfa", "#7c3aed"],
  waveWidth = 50,
  backgroundFill = "#050507",
  blur = 10,
  speed = "slow",
  waveOpacity = 0.4,
}: WavyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)
    let nt = 0

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", onResize)

    const getSpeed = () => (speed === "fast" ? 0.002 : 0.0008)

    const drawWave = (n: number) => {
      nt += getSpeed()
      for (let i = 0; i < n; i++) {
        ctx.beginPath()
        ctx.lineWidth = waveWidth
        ctx.strokeStyle = colors[i % colors.length]
        for (let x = 0; x < w; x += 5) {
          const y =
            (i * 40) + Math.sin(x / 150 + nt * (i + 1) * 0.3) * 60 +
            Math.sin(x / 80 + nt * (i + 1) * 0.5) * 30
          ctx.lineTo(x, y + h * 0.5)
        }
        ctx.stroke()
        ctx.closePath()
      }
    }

    const render = () => {
      ctx.fillStyle = backgroundFill
      ctx.globalAlpha = 1
      ctx.fillRect(0, 0, w, h)
      ctx.globalAlpha = waveOpacity
      drawWave(5)
      animRef.current = requestAnimationFrame(render)
    }

    render()
    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(animRef.current)
    }
  }, [colors, waveWidth, backgroundFill, blur, speed, waveOpacity])

  return (
    <div className={cn("relative flex flex-col items-center justify-center", containerClassName)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ filter: `blur(${blur}px)` }}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  )
}
