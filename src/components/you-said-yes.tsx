"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useState, useEffect, useCallback } from "react"

export function YouSaidYes({ onReveal }: { onReveal: () => void }) {
  const [step, setStep] = useState(0)
  const [locked, setLocked] = useState(true)
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
    const t = setTimeout(() => setLocked(false), 2800)
    return () => clearTimeout(t)
  }, [])

  const advance = useCallback(() => {
    if (locked || step >= 2) return
    setLocked(true)
    setStep((s) => s + 1)
    setTimeout(() => setLocked(false), 1200)
  }, [locked, step])

  const showHint = !locked && step < 2

  return (
    <section className="snap-section relative flex min-h-screen flex-col items-center justify-center px-6 text-center overflow-hidden select-none">
      {step < 2 && <div className="absolute inset-0 z-20" onClick={advance} />}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)]" />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="seal"
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.85, filter: "blur(6px)" }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div
              className="mx-auto mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.02] backdrop-blur-sm">
                <svg viewBox="0 0 40 40" className="h-12 w-12">
                  <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <circle cx="20" cy="20" r="14" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                  <text x="20" y="25" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="18" fontFamily="serif" fontStyle="italic">
                    {name.charAt(0)}
                  </text>
                </svg>
              </div>
            </motion.div>

            <motion.p
              className="text-xs tracking-[0.35em] text-white/25 uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              You&apos;re invited
            </motion.p>

            <motion.h1
              className="mt-4 text-4xl font-light text-white/70 sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {name}
            </motion.h1>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="card"
            className="relative z-10 w-full max-w-xl"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40, filter: "blur(8px)" }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.p
              className="text-xs tracking-[0.3em] text-white/20 uppercase mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {date}
            </motion.p>

            <motion.div
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-8 py-10 backdrop-blur-sm"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ originY: 0 }}
            >
              <motion.div
                className="mx-auto mb-8 h-px w-12 bg-white/15"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
              />

              <motion.p
                className="text-lg font-light leading-relaxed text-white/60 sm:text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.7 }}
              >
                &ldquo;{message}&rdquo;
              </motion.p>

              <motion.div
                className="mx-auto mt-8 h-px w-12 bg-white/15"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 2 }}
              />

              {yourName && (
                <motion.p
                  className="mt-6 text-sm text-white/30"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 2.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  — {yourName}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="cta"
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.button
              onClick={onReveal}
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm tracking-wider text-white/60 uppercase backdrop-blur-xl transition-all hover:border-white/30 hover:bg-white/10 hover:text-white/80"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
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

      <AnimatePresence>
        {showHint && (
          <motion.div
            className="absolute bottom-16 z-30 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="text-[10px] tracking-[0.3em] text-white/25 uppercase"
              animate={{ opacity: [0.15, 0.5, 0.15] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              tap to continue
            </motion.span>
            <motion.div
              className="h-6 w-px bg-gradient-to-b from-white/20 to-transparent"
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
