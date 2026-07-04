"use client"

import { useState, useCallback } from "react"
import { LoadingScreen } from "@/components/loading-screen"
import { HeroSection } from "@/components/hero-section"
import { Chapter1 } from "@/components/chapter1"
import { Chapter2 } from "@/components/chapter2"
import { ConversationCards } from "@/components/conversation-cards"
import { MemoryTimeline } from "@/components/memory-timeline"
import { LiveStats } from "@/components/live-stats"
import { HiddenNotes } from "@/components/hidden-notes"
import { AmbientBackground } from "@/components/ambient-background"
import { MusicPlayer } from "@/components/music-player"
import { PolaroidGallery } from "@/components/polaroid-gallery"
import { MemoryJar } from "@/components/memory-jar"
import { FinalChapter } from "@/components/final-chapter"

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [begun, setBegun] = useState(false)

  const handleLoadComplete = useCallback(() => setLoaded(true), [])
  const handleBegin = useCallback(() => setBegun(true), [])

  if (!loaded) return <LoadingScreen onComplete={handleLoadComplete} />

  return (
    <>
      <AmbientBackground />
      <HiddenNotes />

      {!begun ? (
        <HeroSection onBegin={handleBegin} />
      ) : (
        <main>
          <Chapter1 />
          <Chapter2 />
          <MemoryTimeline />
          <PolaroidGallery />
          <MemoryJar />
          <LiveStats />
          <FinalChapter />
        </main>
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
