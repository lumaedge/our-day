"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function HeroSection({ onBegin }: { onBegin: () => void }) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.div
        className="max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.p
          className="mb-6 text-sm tracking-[0.3em] text-white/30 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Our Day
        </motion.p>

        <motion.h1
          className="mb-6 text-4xl font-light leading-tight text-white/90 sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Today isn&apos;t about having
          <br />
          <span className="italic text-white/50">the perfect plan.</span>
        </motion.h1>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="mb-10 text-xl font-light text-white/40 sm:text-2xl">
            It&apos;s about creating{" "}
            <span className="text-white/70">one beautiful memory</span>.
          </p>

          <motion.button
            onClick={onBegin}
            className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm tracking-wider text-white/70 uppercase backdrop-blur-xl transition-all hover:border-white/30 hover:bg-white/10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Begin
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1.5 }}
      >
        <motion.div
          className="h-10 w-px bg-gradient-to-b from-white/20 to-transparent"
          animate={{ scaleY: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  )
}
