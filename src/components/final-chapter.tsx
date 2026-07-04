"use client"

import { motion } from "framer-motion"
import { Section } from "./section"
import { useEffect, useState } from "react"
import { Camera, Heart, MessageCircle, Clock, Sparkles } from "lucide-react"

export function FinalChapter() {
  const [elapsed, setElapsed] = useState("0")

  useEffect(() => {
    const start = Date.now()
    const interval = setInterval(() => {
      const hours = ((Date.now() - start) / 3600000).toFixed(1)
      setElapsed(hours)
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const items = [
    { icon: Camera, label: "Photos", value: "—" },
    { icon: Heart, label: "Favorite Moment", value: "Yet to come" },
    { icon: MessageCircle, label: "Questions Asked", value: "—" },
    { icon: Clock, label: "Time Together", value: `${elapsed} hrs` },
  ]

  return (
    <Section id="final" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="mb-4 text-xs tracking-[0.3em] text-white/20 uppercase">
            Final Chapter
          </p>
          <h2 className="mx-auto mb-6 max-w-2xl text-2xl font-light leading-relaxed text-white/50 sm:text-3xl">
            Today is no longer ahead of us.
            <br />
            <span className="text-white/70">Now it&apos;s one of our memories.</span>
          </h2>
        </motion.div>

        <motion.div
          className="mx-auto mt-12 grid max-w-lg grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.15 }}
              >
                <Icon className="mx-auto mb-3 h-5 w-5 text-white/25" />
                <p className="text-xs text-white/40">{item.label}</p>
                <p className="text-sm font-light text-white/70">{item.value}</p>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
        >
          <div className="mx-auto mb-6 flex justify-center">
            <Sparkles className="h-6 w-6 text-white/20" />
          </div>
          <p className="text-lg font-light text-white/40">
            Thank you for sharing today with me.
          </p>
        </motion.div>
      </div>
    </Section>
  )
}
