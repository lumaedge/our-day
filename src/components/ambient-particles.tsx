"use client"

import { useEffect, useState } from "react"

interface DustMote {
  id: number
  left: string
  delay: number
  duration: number
  size: number
  opacity: number
}

export function AmbientParticles() {
  const [motes, setMotes] = useState<DustMote[]>([])

  useEffect(() => {
    const m: DustMote[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 15,
      duration: 15 + Math.random() * 20,
      size: 1.5 + Math.random() * 2.5,
      opacity: 0.15 + Math.random() * 0.25,
    }))
    setMotes(m)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {motes.map((mote) => (
        <div
          key={mote.id}
          className="absolute bottom-0 rounded-full bg-white"
          style={{
            left: mote.left,
            width: mote.size + "px",
            height: mote.size + "px",
            opacity: mote.opacity,
            animation: `dust-mote ${mote.duration}s ease-in-out ${mote.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
