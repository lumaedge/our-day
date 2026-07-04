"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRef } from "react"

const TYPE_TEXT = "It's about creating one beautiful memory."

export function HeroSection({ onBegin }: { onBegin: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null)

  const handleBegin = () => {
    onBegin()
    setTimeout(() => {
      document.getElementById("chapter1")?.scrollIntoView({ behavior: "smooth" })
    }, 600)
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="snap-section relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      {/* Subtle radial gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />

      <motion.div
        className="relative z-10 max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.p
          className="mb-8 text-xs tracking-[0.4em] text-white/20 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Our Day
        </motion.p>

        <motion.h1
          className="mb-8 text-4xl font-light leading-tight text-white/80 sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Today isn&apos;t about having
          <br />
          <span className="italic text-white/40">the perfect plan.</span>
        </motion.h1>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 2.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.p
            className="mb-12 text-lg font-light text-white/40 sm:text-xl md:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 3.2 }}
          >
            {TYPE_TEXT.split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-2 text-white/60"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 3.5 + i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 5 }}
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
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6, duration: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-3"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] tracking-[0.3em] text-white/15 uppercase">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
