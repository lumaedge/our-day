"use client"

import { motion } from "framer-motion"
import { Section, ChapterTitle } from "./section"
import { MapPin } from "lucide-react"
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

  const hours = time.getHours() % 12
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  const hourDeg = (hours + minutes / 60) * 30
  const minuteDeg = (minutes + seconds / 60) * 6
  const secondDeg = seconds * 6

  const dateStr = time.toLocaleDateString("en-ZA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const cx = 80
  const cy = 80
  const r = 70

  return (
    <Section id="chapter1">
      <ChapterTitle number="One" title="The Beginning" />

      <div className="mx-auto max-w-md text-center">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="relative mx-auto mb-8 flex h-40 w-40 items-center justify-center">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 160 160">
              <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180
                const inner = r - 8
                const outer = r
                const x1 = cx + inner * Math.sin(angle)
                const y1 = cy - inner * Math.cos(angle)
                const x2 = cx + outer * Math.sin(angle)
                const y2 = cy - outer * Math.cos(angle)
                return (
                  <line
                    key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                )
              })}
            </svg>

            {/* Hour hand */}
            <motion.div
              className="absolute bottom-1/2 left-1/2 origin-bottom"
              animate={{ rotate: `${hourDeg}deg` }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="-ml-[1.5px] h-14 w-[3px] rounded-full bg-white/40" />
            </motion.div>

            {/* Minute hand */}
            <motion.div
              className="absolute bottom-1/2 left-1/2 origin-bottom"
              animate={{ rotate: `${minuteDeg}deg` }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="-ml-px h-[76px] w-[2px] rounded-full bg-white/30" />
            </motion.div>

            {/* Second hand */}
            <motion.div
              className="absolute bottom-1/2 left-1/2 origin-bottom"
              animate={{ rotate: `${secondDeg}deg` }}
              transition={{ duration: 0.5, ease: "linear" }}
            >
              <div className="-ml-px h-[82px] w-px bg-white/15" />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-2.5 w-px bg-white/15" />
            </motion.div>

            {/* Center dot */}
            <div className="absolute h-2 w-2 rounded-full bg-white/25" />
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
          <p className="text-sm tracking-wide text-white/30">{dateStr}</p>
          <motion.div
            className="mx-auto h-px w-16 bg-white/10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />
          <p className="text-sm italic text-white/20">
            Every great story begins somewhere.
          </p>
        </motion.div>
      </div>
    </Section>
  )
}
