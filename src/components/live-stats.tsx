"use client"

import { motion } from "framer-motion"
import { Section, ChapterTitle } from "./section"
import { Camera, MessageCircle, MapPin, Clock, Heart, BookOpen } from "lucide-react"
import { useState, useEffect } from "react"

interface Stat {
  icon: React.ElementType
  label: string
  value: number
  suffix?: string
}

export function LiveStats() {
  const [stats, setStats] = useState<Stat[]>([
    { icon: Camera, label: "Photos Taken", value: 0 },
    { icon: Heart, label: "Memories Added", value: 0 },
    { icon: MessageCircle, label: "Cards Opened", value: 0 },
    { icon: MapPin, label: "Places Visited", value: 0 },
    { icon: Clock, label: "Hours Together", value: 0 },
    { icon: BookOpen, label: "Questions Asked", value: 0 },
  ])
  const [startTime] = useState(Date.now())

  useEffect(() => {
    try {
      const stored = localStorage.getItem("our-day-stats")
      if (stored) {
        const s = JSON.parse(stored)
        setStats((prev) =>
          prev.map((stat) => {
            const key = stat.label.toLowerCase().replace(/\s+/g, "")
            const labels: Record<string, string> = {
              photostaken: "photosTaken",
              memoriesadded: "memoriesAdded",
              cardsopened: "cardsOpened",
              placesvisited: "placesVisited",
              hourstogether: "hoursTogether",
              questionsasked: "questionsAsked",
            }
            const mapped = labels[key]
            return mapped && s[mapped] !== undefined
              ? { ...stat, value: s[mapped] }
              : stat
          })
        )
      }
    } catch {}
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const hoursElapsed = ((Date.now() - startTime) / 3600000)
      setStats((prev) =>
        prev.map((s) =>
          s.label === "Hours Together"
            ? { ...s, value: parseFloat(hoursElapsed.toFixed(1)) }
            : s
        )
      )
    }, 60000)
    return () => clearInterval(interval)
  }, [startTime])

  return (
    <Section id="stats">
      <ChapterTitle number="-" title="Live Statistics" />

      <div className="mx-auto grid w-full max-w-2xl grid-cols-2 gap-4 sm:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Icon className="h-5 w-5 text-white/30" />
              <motion.span
                className="text-2xl font-light tracking-tight text-white/70"
                key={stat.value}
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {stat.value}
                {stat.suffix || ""}
              </motion.span>
              <span className="text-xs text-white/30">{stat.label}</span>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
