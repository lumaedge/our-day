"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useState, useCallback, useEffect } from "react"

const TYPE_TEXT = "It's about creating one beautiful memory."
const WORDS = TYPE_TEXT.split(" ")

export function HeroSection({ onBegin }: { onBegin: () => void }) {
  const [step, setStep] = useState(0)
  const [locked, setLocked] = useState(true)
  const [wordsDone, setWordsDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLocked(false), 2500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (step === 2) {
      const t = setTimeout(() => setWordsDone(true), 3500)
      return () => clearTimeout(t)
    }
    setWordsDone(false)
  }, [step])

  const advance = useCallback(() => {
    if (locked) return
    if (step === 2 && !wordsDone) return
    if (step >= 3) return
    setLocked(true)
    setStep((s) => s + 1)
    setTimeout(() => setLocked(false), 1000)
  }, [locked, step, wordsDone])

  const canAdvance = step === 2 ? wordsDone : true
  const showHint = !locked && step < 3 && canAdvance

  const handleBegin = () => {
    onBegin()
    setTimeout(() => {
      document.getElementById("chapter1")?.scrollIntoView({ behavior: "smooth" })
    }, 600)
  }

  return (
    <section
      className="snap-section relative flex min-h-screen flex-col items-center justify-center px-6 text-center overflow-hidden select-none"
    >
      {step < 3 && <div className="absolute inset-0 z-20" onClick={advance} />}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="title"
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.p
              className="text-xs tracking-[0.4em] text-white/20 uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Our Day
            </motion.p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="headline"
            className="relative z-10 max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.h1
              className="text-4xl font-light leading-tight text-white/80 sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Today isn&apos;t about having
              <br />
              <span className="italic text-white/40">the perfect plan.</span>
            </motion.h1>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="words"
            className="relative z-10 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.p
              className="text-lg font-light text-white/40 sm:text-xl md:text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {WORDS.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-2 text-white/60"
                  initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: i * 0.18, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="cta"
            className="relative z-10 max-w-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.p
              className="mb-12 text-lg font-light text-white/40 sm:text-xl md:text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {WORDS.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-2 text-white/60"
                  initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: i * 0.18, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            <motion.button
              onClick={handleBegin}
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm tracking-wider text-white/60 uppercase backdrop-blur-xl transition-all hover:border-white/30 hover:bg-white/10 hover:text-white/80"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Begin
              <motion.span
                animate={{ x: [0, 4, 0] }}
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
