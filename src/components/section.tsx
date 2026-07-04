"use client"

import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import type { ReactNode } from "react"

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
}

export function Section({ children, className = "", id }: SectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section
      id={id}
      ref={ref}
      className={`relative min-h-screen flex flex-col items-center justify-center px-6 py-24 ${className}`}
    >
      <motion.div
        className="w-full max-w-5xl"
        initial={{ opacity: 0, y: 60 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </section>
  )
}

export function ChapterTitle({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-16 text-center">
      <p className="mb-2 text-xs tracking-[0.3em] text-white/20 uppercase">
        Chapter {number}
      </p>
      <h2 className="text-3xl font-light text-white/60 sm:text-4xl md:text-5xl">
        {title}
      </h2>
    </div>
  )
}
