"use client"

import { useState, useCallback } from "react"
import { YouSaidYes } from "@/components/you-said-yes"
import { MemoryBasket } from "@/components/memory-basket"
import { AmbientBackground } from "@/components/ambient-background"
import { AmbientParticles } from "@/components/ambient-particles"
import { MusicPlayer } from "@/components/music-player"

export default function Home() {
  const [phase, setPhase] = useState<"intro" | "experience">("intro")

  const handleReveal = useCallback(() => setPhase("experience"), [])

  return (
    <>
      <AmbientBackground />
      <AmbientParticles />

      {phase === "intro" && <YouSaidYes onReveal={handleReveal} />}

      {phase === "experience" && <MemoryBasket />}

      <MusicPlayer />
    </>
  )
}
