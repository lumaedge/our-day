"use client"

import { motion } from "framer-motion"
import { Section, ChapterTitle } from "./section"
import { Clock, MapPin } from "lucide-react"
import { useState, useEffect } from "react"

export function Chapter1() {
  const [time, setTime] = useState(new Date())
  const [location, setLocation] = useState("South Africa")

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    try {
      const stored = localStorage.getItem("our-day-settings")
      if (stored) {
        const settings = JSON.parse(stored)
        if (settings.location) setLocation(settings.location)
      }
    } catch {}
    return () => clearInterval(interval)
  }, [])

  const dateStr = time.toLocaleDateString("en-ZA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const timeStr = time.toLocaleTimeString("en-ZA", {
    hour: "2-digit",
    minute: "2-digit",
  })

  const seconds = time.getSeconds()

  return (
    <Section id="chapter1">
      <ChapterTitle number="One" title="The Beginning" />

      <div className="mx-auto max-w-md text-center">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="relative mx-auto mb-6 flex h-32 w-32 items-center justify-center">
            <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 128 128">
              <circle
                cx="64"
                cy="64"
                r="58"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="2"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="58"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${(seconds / 60) * 364.4} 364.4`}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <span className="text-3xl font-light tracking-wider text-white/70">
              {timeStr}
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-white/40">
            <MapPin className="h-3.5 w-3.5" />
            <span>{location}</span>
          </div>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 text-white/30">
            <Clock className="h-4 w-4" />
            <span className="text-sm tracking-wide">{dateStr}</span>
          </div>
          <p className="text-sm italic text-white/20">
            Every great story begins somewhere.
          </p>
        </motion.div>
      </div>
    </Section>
  )
}
