"use client"

import { useState, useEffect } from "react"
import { YouSaidYes } from "@/components/you-said-yes"
import { MemoryPhase } from "@/components/memory-phase"
import { AmbientBackground } from "@/components/ambient-background"
import { AmbientParticles } from "@/components/ambient-particles"
import { MusicPlayer } from "@/components/music-player"
import { getSettings } from "@/lib/settings"

function isOnOrAfterDate(dateStr: string): boolean {
  if (!dateStr) return false
  const target = new Date(dateStr)
  target.setHours(23, 59, 59, 999)
  return Date.now() >= target.getTime()
}

export default function Home() {
  const [unlocked, setUnlocked] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSettings().then((s) => {
      if (s.date) setUnlocked(isOnOrAfterDate(s.date))
      setLoading(false)
    })
  }, [])

  if (loading) return null

  return (
    <>
      <AmbientBackground />
      <AmbientParticles />

      {unlocked ? <MemoryPhase /> : <YouSaidYes />}

      <MusicPlayer />

      <a
        href="/admin"
        className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 text-[10px] tracking-wider text-white/10 transition-colors hover:text-white/30"
      >
        Admin
      </a>
    </>
  )
}
