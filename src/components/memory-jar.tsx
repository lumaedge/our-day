"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Section, ChapterTitle } from "./section"
import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import type { JarMemory } from "@/lib/store"

export function MemoryJar() {
  const [jarMemories, setJarMemories] = useState<JarMemory[]>([])
  const [showInput, setShowInput] = useState(false)
  const [newMemory, setNewMemory] = useState("")

  useEffect(() => {
    try {
      const stored = localStorage.getItem("our-day-jar")
      if (stored) setJarMemories(JSON.parse(stored))
    } catch {}
  }, [])

  const saveJar = (updated: JarMemory[]) => {
    setJarMemories(updated)
    localStorage.setItem("our-day-jar", JSON.stringify(updated))
  }

  const addToJar = () => {
    if (!newMemory.trim()) return
    const updated = [...jarMemories, { id: Date.now(), text: newMemory.trim() }]
    saveJar(updated)
    setNewMemory("")
    setShowInput(false)
  }

  const maxMemories = 20
  const fillPercent = Math.min((jarMemories.length / maxMemories) * 100, 100)

  return (
    <Section id="jar">
      <ChapterTitle number="-" title="Memory Jar" />

      <div className="mx-auto flex w-full max-w-sm flex-col items-center">
        <div className="relative mb-8 h-64 w-48">
          <svg viewBox="0 0 120 200" className="h-full w-full">
            <path d="M45 10 h30 v15 h15 a5 5 0 0 1 5 5 v150 a5 5 0 0 1 -5 5 h-60 a5 5 0 0 1 -5 -5 v-150 a5 5 0 0 1 5 -5 h15 z" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
            <rect x="35" y="5" width="50" height="10" rx="3" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
          </svg>
          <div className="absolute bottom-[17px] left-[17px] right-[17px] overflow-hidden rounded-b-sm" style={{ height: "160px" }}>
            {jarMemories.length > 0 && (
              <motion.div
                className="absolute bottom-0 w-full bg-gradient-to-t from-white/20 via-white/10 to-transparent"
                initial={{ height: "0%" }}
                animate={{ height: `${fillPercent}%` }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              />
            )}
          </div>
        </div>

        <AnimatePresence>
          {jarMemories.slice(-3).reverse().map((m) => (
            <motion.div
              key={m.id}
              className="mb-2 max-w-xs rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-center text-sm font-light text-white/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              &ldquo;{m.text}&rdquo;
            </motion.div>
          ))}
        </AnimatePresence>

        {showInput ? (
          <motion.div className="mt-4 w-full max-w-xs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <input
              value={newMemory}
              onChange={(e) => setNewMemory(e.target.value)}
              placeholder="One sentence..."
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 placeholder-white/20 backdrop-blur-sm focus:border-white/20 focus:outline-none"
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addToJar() } }}
            />
            <div className="mt-2 flex justify-end gap-2">
              <button onClick={() => setShowInput(false)} className="rounded-full px-4 py-2 text-xs text-white/40 hover:text-white/60">Cancel</button>
              <button onClick={addToJar} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/60 hover:border-white/30">Add to jar</button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            onClick={() => setShowInput(true)}
            className="mt-6 flex items-center gap-2 text-sm text-white/30 transition-colors hover:text-white/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <Plus className="h-4 w-4" /> Drop a memory in the jar
          </motion.button>
        )}
      </div>
    </Section>
  )
}
