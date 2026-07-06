"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

function getCountdown(targetDate: string) {
  const now = new Date()
  const target = new Date(targetDate)
  const diff = target.getTime() - now.getTime()
  if (diff <= 0) return null
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  return { days, hours }
}

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"dot" | "preparing" | "reveal" | "done">("dot")
  const [name, setName] = useState("Sindiswa")
  const [date, setDate] = useState("")
  const [countdown, setCountdown] = useState<{ days: number; hours: number } | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("our-day-settings")
      if (stored) {
        const settings = JSON.parse(stored)
        if (settings.herName) setName(settings.herName)
        if (settings.date) {
          setDate(settings.date)
          setCountdown(getCountdown(settings.date))
        }
      }
    } catch {}
  }, [])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("preparing"), 1000)
    const t2 = setTimeout(() => setPhase("reveal"), 3000)
    const t3 = setTimeout(() => {
      setPhase("done")
      onComplete()
    }, 5500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="relative mb-10"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: phase === "dot" ? [0.5, 1.3, 1] : 1,
              opacity: 1,
            }}
            transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="h-3 w-3 rounded-full bg-white/70 shadow-[0_0_30px_8px_rgba(255,255,255,0.12)]" />
          </motion.div>

          <AnimatePresence mode="wait">
            {phase === "preparing" && (
              <motion.p
                key="preparing"
                className="text-xs text-white/30 font-light tracking-[0.25em] uppercase"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Preparing something special...
              </motion.p>
            )}
            {phase === "reveal" && (
              <motion.div
                key="reveal"
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <motion.p
                  className="text-xl font-light tracking-wide text-white/70 mb-3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {name}
                </motion.p>
                {countdown && (
                  <motion.p
                    className="text-sm text-white/30 font-light tracking-[0.15em]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  >
                    {countdown.days > 0 && `${countdown.days} days `}
                    {countdown.hours} hours to go
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
