"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

function useCountdown(target: string) {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false })

  useEffect(() => {
    const targetDate = new Date(target)
    targetDate.setHours(23, 59, 59, 999)

    const tick = () => {
      const now = Date.now()
      const diff = targetDate.getTime() - now
      if (diff <= 0) {
        setRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true })
        return
      }
      setRemaining({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
        expired: false,
      })
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  return remaining
}

export function YouSaidYes() {
  const [name, setName] = useState("Sindiswa")
  const [message, setMessage] = useState("")
  const [dateStr, setDateStr] = useState("")
  const [rawDate, setRawDate] = useState("")

  useEffect(() => {
    try {
      const stored = localStorage.getItem("our-day-settings")
      if (stored) {
        const s = JSON.parse(stored)
        if (s.herName) setName(s.herName)
        if (s.personalMessage) setMessage(s.personalMessage)
        if (s.date) {
          setRawDate(s.date)
          const d = new Date(s.date)
          setDateStr(d.toLocaleDateString("en-ZA", { weekday: "long", month: "long", day: "numeric" }))
        }
      }
    } catch {}
  }, [])

  const countdown = useCountdown(rawDate)

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center overflow-hidden select-none">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)]" />

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          className="mx-auto mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.02] backdrop-blur-sm">
            <svg viewBox="0 0 40 40" className="h-10 w-10">
              <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <text x="20" y="25" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="18" fontFamily="serif" fontStyle="italic">
                {name.charAt(0)}
              </text>
            </svg>
          </div>
        </motion.div>

        <motion.p
          className="text-xs tracking-[0.35em] text-white/25 uppercase mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          You&apos;re invited
        </motion.p>

        <motion.h1
          className="mb-6 text-4xl font-light text-white/70 sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {name}
        </motion.h1>

        {dateStr && (
          <motion.p
            className="mb-8 text-sm font-light text-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.4 }}
          >
            {dateStr}
          </motion.p>
        )}

        {message && (
          <motion.p
            className="mx-auto mb-12 max-w-md text-base font-light leading-relaxed text-white/40 sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 2.8 }}
          >
            &ldquo;{message}&rdquo;
          </motion.p>
        )}

        {!countdown.expired && (
          <motion.div
            className="flex items-center justify-center gap-6 sm:gap-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.2 }}
          >
            {[
              { label: "Days", value: countdown.days },
              { label: "Hours", value: countdown.hours },
              { label: "Minutes", value: countdown.minutes },
              { label: "Seconds", value: countdown.seconds },
            ].map((unit) => (
              <div key={unit.label} className="flex flex-col items-center">
                <span className="text-2xl font-light text-white/60 sm:text-3xl tabular-nums">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="mt-1 text-[10px] tracking-wider text-white/20 uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
