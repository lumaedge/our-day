"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

const DEFAULT_NAME = "Sindiswa"

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"dot" | "preparing" | "welcome" | "done">("dot")
  const [name, setName] = useState(DEFAULT_NAME)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("our-day-settings")
      if (stored) {
        const settings = JSON.parse(stored)
        if (settings.herName) setName(settings.herName)
      }
    } catch {}
  }, [])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("preparing"), 800)
    const t2 = setTimeout(() => setPhase("welcome"), 2500)
    const t3 = setTimeout(() => {
      setPhase("done")
      onComplete()
    }, 4000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="relative mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: phase === "dot" ? [0.5, 1.2, 1] : 1,
              opacity: 1,
            }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="h-3 w-3 rounded-full bg-white/80 shadow-[0_0_20px_6px_rgba(255,255,255,0.15)]" />
          </motion.div>

          <AnimatePresence mode="wait">
            {phase === "preparing" && (
              <motion.p
                key="preparing"
                className="text-sm text-white/40 font-light tracking-[0.2em] uppercase"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Preparing today...
              </motion.p>
            )}
            {phase === "welcome" && (
              <motion.p
                key="welcome"
                className="text-lg text-white/70 font-light tracking-wide"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Welcome, {name}.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
