"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

export function YouSaidYes({ onReveal }: { onReveal: () => void }) {
  const [phase, setPhase] = useState<"seal" | "invitation" | "ready">("seal")
  const [name, setName] = useState("Sindiswa")
  const [yourName, setYourName] = useState("")
  const [message, setMessage] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    try {
      const stored = localStorage.getItem("our-day-settings")
      if (stored) {
        const s = JSON.parse(stored)
        if (s.herName) setName(s.herName)
        if (s.yourName) setYourName(s.yourName)
        if (s.personalMessage) setMessage(s.personalMessage)
        if (s.date) {
          const d = new Date(s.date)
          setDate(d.toLocaleDateString("en-ZA", { weekday: "long", month: "long", day: "numeric" }))
        }
      }
    } catch {}
  }, [])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("invitation"), 2000)
    const t2 = setTimeout(() => setPhase("ready"), 5000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <section className="snap-section relative flex min-h-screen flex-col items-center justify-center px-6 text-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)]" />

      <AnimatePresence mode="wait">
        {/* Phase 1: Wax seal / invocation */}
        {phase === "seal" && (
          <motion.div
            key="seal"
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              className="mx-auto mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/[0.03]">
                <svg viewBox="0 0 40 40" className="h-10 w-10">
                  <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                  <text x="20" y="24" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="16" fontFamily="serif" fontStyle="italic">Y</text>
                </svg>
              </div>
            </motion.div>

            <motion.p
              className="text-xs tracking-[0.35em] text-white/25 uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              You&apos;re invited
            </motion.p>

            <motion.h1
              className="mt-4 text-4xl font-light text-white/70 sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {name}
            </motion.h1>
          </motion.div>
        )}

        {/* Phase 2: The invitation card — like opening a letter */}
        {phase === "invitation" && (
          <motion.div
            key="invitation"
            className="relative z-10 w-full max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.p
              className="text-xs tracking-[0.3em] text-white/20 uppercase mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {date}
            </motion.p>

            <motion.div
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-8 py-10 backdrop-blur-sm"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div
                className="mx-auto mb-8 h-px w-12 bg-white/15"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              />

              <motion.p
                className="text-lg font-light leading-relaxed text-white/60 sm:text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.6 }}
              >
                &ldquo;{message}&rdquo;
              </motion.p>

              {yourName && (
                <motion.p
                  className="mt-6 text-sm text-white/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.4 }}
                >
                  — {yourName}
                </motion.p>
              )}

              <motion.div
                className="mx-auto mt-8 h-px w-12 bg-white/15"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.8 }}
              />
            </motion.div>
          </motion.div>
        )}

        {/* Phase 3: Open the experience */}
        {phase === "ready" && (
          <motion.div
            key="cta"
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.p
              className="mb-10 text-lg font-light text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              This is the part I&apos;ve been waiting to show you.
            </motion.p>

            <motion.button
              onClick={onReveal}
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm tracking-wider text-white/60 uppercase backdrop-blur-xl transition-all hover:border-white/30 hover:bg-white/10 hover:text-white/80"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Open invitation
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
