"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useRef, type ReactNode } from "react"

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
}

export function Section({ children, className = "", id }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { ref: animRef, isVisible } = useScrollAnimation({ threshold: 0.1 })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.97, 1, 1, 0.97])
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], ["4px", "0px", "0px", "4px"])

  return (
    <section
      id={id}
      ref={ref}
      className={`snap-section relative flex min-h-screen flex-col items-center justify-center px-6 py-24 ${className}`}
    >
      <motion.div
        ref={animRef}
        className="w-full max-w-5xl"
        style={{ opacity, scale, filter: `blur(${blur})` }}
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
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
      <motion.p
        className="mb-2 text-xs tracking-[0.3em] text-white/20 uppercase"
        initial={{ opacity: 0, letterSpacing: "0.5em" }}
        whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Chapter {number}
      </motion.p>
      <motion.h2
        className="text-3xl font-light text-white/60 sm:text-4xl md:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {title}
      </motion.h2>
    </div>
  )
}
