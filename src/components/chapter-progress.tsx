"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

const CHAPTERS = [
  { id: "hero", label: "Prologue" },
  { id: "chapter1", label: "The Beginning" },
  { id: "chapter2", label: "The Adventure" },
  { id: "memories", label: "Memories" },
  { id: "gallery", label: "Gallery" },
  { id: "jar", label: "Memory Jar" },
  { id: "stats", label: "Statistics" },
  { id: "final", label: "Final Chapter" },
]

export function ChapterProgress() {
  const [current, setCurrent] = useState(0)
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2
      const sections = CHAPTERS.map((ch) => document.getElementById(ch.id)).filter(Boolean) as HTMLElement[]

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= scrollPos) {
          setCurrent(i)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (current === 0) return null

  return (
    <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 sm:flex">
      <motion.div
        className="h-24 w-px origin-bottom bg-gradient-to-t from-white/20 to-transparent"
        style={{ scaleY, opacity: scrollYProgress }}
      />
      <div className="flex flex-col gap-2.5">
        {CHAPTERS.slice(1).map((ch, i) => (
          <button
            key={ch.id}
            onClick={() =>
              document.getElementById(ch.id)?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative flex items-center gap-3"
          >
            <div
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i + 1 === current ? "w-6 bg-white/60" : "w-1.5 bg-white/15 group-hover:bg-white/30"
              }`}
            />
            <span
              className={`absolute right-8 text-[10px] tracking-wider whitespace-nowrap transition-all duration-300 ${
                i + 1 === current
                  ? "translate-x-0 text-white/50"
                  : "translate-x-2 text-transparent group-hover:text-white/30"
              }`}
            >
              {ch.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
