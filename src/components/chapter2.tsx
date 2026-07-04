"use client"

import { motion } from "framer-motion"
import { Section, ChapterTitle } from "./section"
import { Car, IceCreamCone, BookOpen, Gamepad2, Sunset, MapPin } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useState, useEffect } from "react"
import type { Stop } from "@/lib/store"

const FALLBACK_STOPS: Stop[] = [
  { id: "journey", icon: "Car", title: "The Journey", description: "The road ahead is full of possibility." },
  { id: "icecream", icon: "IceCreamCone", title: "Ice Cream", description: "Sweet moments in the afternoon sun." },
  { id: "bookstore", icon: "BookOpen", title: "The Bookstore", description: "Wandering through stories waiting to be discovered." },
  { id: "arcade", icon: "Gamepad2", title: "The Arcade", description: "A little friendly competition never hurt anyone." },
  { id: "evening", icon: "Sunset", title: "The Evening", description: "As the day winds down, the best part begins." },
]

const ICON_MAP: Record<string, React.ElementType> = {
  Car, IceCreamCone, BookOpen, Gamepad2, Sunset, MapPin: MapPin,
}

function StopCard({ stop, index }: { stop: Stop; index: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })
  const Icon = ICON_MAP[stop.icon] || Car

  return (
    <motion.div
      ref={ref}
      className="group flex flex-col items-center gap-6 py-16 text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 backdrop-blur-xl transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/[0.08]">
        <Icon className="h-8 w-8 text-white/40 transition-all duration-500 group-hover:text-white/60" />
      </div>

      <div className="max-w-sm">
        <h3 className="mb-3 text-xl font-light text-white/60 transition-all duration-500 group-hover:text-white/80">
          {stop.title}
        </h3>
        <p className="text-sm font-light leading-relaxed text-white/30">
          {stop.description}
        </p>
      </div>

      <div className="mt-4 h-40 w-60 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
        {stop.photo ? (
          <img src={stop.photo} alt={stop.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-2 h-16 w-16 rounded-full bg-white/[0.04]" />
              <p className="text-xs text-white/15">Photo coming soon</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function Chapter2() {
  const [stops, setStops] = useState<Stop[]>(FALLBACK_STOPS)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("our-day-stops")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) setStops(parsed)
      }
    } catch {}
  }, [])

  return (
    <Section id="chapter2">
      <ChapterTitle number="Two" title="The Adventure" />

      <div className="mx-auto flex max-w-2xl flex-col divide-y divide-white/[0.04]">
        {stops.map((stop, index) => (
          <StopCard key={stop.id} stop={stop} index={index} />
        ))}
      </div>

      {stops.length > 0 && (
        <motion.p
          className="mt-12 text-center text-xs tracking-[0.2em] text-white/15 uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          Scroll to continue the journey...
        </motion.p>
      )}
    </Section>
  )
}
