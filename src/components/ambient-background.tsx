"use client"

import { useTimeOfDay } from "@/hooks/use-time-of-day"
import { useEffect, useState } from "react"

interface Star {
  id: number
  x: string
  y: string
  size: number
  delay: number
  duration: number
}

interface Firefly {
  id: number
  x: string
  y: string
  delay: number
  duration: number
}

export function AmbientBackground() {
  const timeOfDay = useTimeOfDay()
  const [stars, setStars] = useState<Star[]>([])
  const [fireflies, setFireflies] = useState<Firefly[]>([])

  useEffect(() => {
    const s: Star[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }))
    setStars(s)

    const f: Firefly[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      delay: Math.random() * 8,
      duration: Math.random() * 4 + 3,
    }))
    setFireflies(f)
  }, [])

  const getBackground = () => {
    switch (timeOfDay) {
      case "morning":
        return "linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
      case "afternoon":
        return "linear-gradient(180deg, #1a1a2e 0%, #16213e 30%, #e2a76f 100%)"
      case "golden-hour":
        return "linear-gradient(180deg, #1a1a2e 0%, #b8864e 40%, #e2a76f 100%)"
      case "evening":
        return "linear-gradient(180deg, #0a0a0a 0%, #0d1b2a 40%, #1b2838 100%)"
    }
  }

  return (
    <div
      className="fixed inset-0 -z-10 transition-all duration-[2000ms] ease-in-out"
      style={{ background: getBackground() }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: star.x,
            top: star.y,
            width: star.size + "px",
            height: star.size + "px",
            opacity: timeOfDay === "evening" ? 0.8 : timeOfDay === "golden-hour" ? 0.3 : 0.1,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            transition: "opacity 2s ease-in-out",
          }}
        />
      ))}
      {fireflies.map((firefly) => (
        <div
          key={firefly.id}
          className="absolute"
          style={{
            left: firefly.x,
            top: firefly.y,
            opacity: timeOfDay === "evening" ? 0.7 : 0.2,
            animation: `float ${firefly.duration}s ease-in-out ${firefly.delay}s infinite`,
            transition: "opacity 2s ease-in-out",
          }}
        >
          <div className="w-1 h-1 rounded-full bg-[#e8d44d] shadow-[0_0_6px_2px_rgba(232,212,77,0.4)]" />
        </div>
      ))}
    </div>
  )
}
