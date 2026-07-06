"use client"

import { useState, useCallback } from "react"
import { YouSaidYes } from "@/components/you-said-yes"
import { HeroSection } from "@/components/hero-section"
import { Chapter1 } from "@/components/chapter1"
import { Chapter2 } from "@/components/chapter2"
import { ConversationCards } from "@/components/conversation-cards"
import { MemoryTimeline } from "@/components/memory-timeline"
import { LiveStats } from "@/components/live-stats"
import { HiddenNotes } from "@/components/hidden-notes"
import { AmbientBackground } from "@/components/ambient-background"
import { AmbientParticles } from "@/components/ambient-particles"
import { MusicPlayer } from "@/components/music-player"
import { PolaroidGallery } from "@/components/polaroid-gallery"
import { MemoryJar } from "@/components/memory-jar"
import { FinalChapter } from "@/components/final-chapter"
import { ChapterProgress } from "@/components/chapter-progress"

export default function Home() {
  const [phase, setPhase] = useState<"intro" | "hero" | "experience">("intro")

  const handleReveal = useCallback(() => setPhase("hero"), [])
  const handleBegin = useCallback(() => {
    setPhase("experience")
    setTimeout(() => {
      document.getElementById("chapter1")?.scrollIntoView({ behavior: "smooth" })
    }, 600)
  }, [])

  return (
    <>
      <AmbientBackground />
      <AmbientParticles />
      <HiddenNotes />

      {phase === "intro" && <YouSaidYes onReveal={handleReveal} />}

      {phase === "hero" && (
        <div className="snap-container">
          <HeroSection onBegin={handleBegin} />
        </div>
      )}

      {phase === "experience" && (
        <>
          <ChapterProgress />
          <main className="snap-container">
            <Chapter1 />
            <Chapter2 />
            <MemoryTimeline />
            <PolaroidGallery />
            <MemoryJar />
            <LiveStats />
            <FinalChapter />
          </main>
        </>
      )}

      <ConversationCards />
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
