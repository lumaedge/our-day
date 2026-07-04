"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 300, damping: 30 })
  const springY = useSpring(cursorY, { stiffness: 300, damping: 30 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    window.addEventListener("mousemove", move)
    document.addEventListener("mouseleave", leave)
    document.addEventListener("mouseenter", enter)

    return () => {
      window.removeEventListener("mousemove", move)
      document.removeEventListener("mouseleave", leave)
      document.removeEventListener("mouseenter", enter)
    }
  }, [cursorX, cursorY, visible])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[100] hidden sm:block"
      style={{ x: springX, y: springY }}
    >
      {/* Outer ring */}
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: "32px",
          height: "32px",
          transition: "width 0.2s, height 0.2s",
        }}
      />
      {/* Inner dot */}
      <div
        className={`-translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white/60 transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
    </motion.div>
  )
}
