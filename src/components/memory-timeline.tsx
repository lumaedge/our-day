"use client"

import { motion } from "framer-motion"
import { Section, ChapterTitle } from "./section"
import { useState, useEffect } from "react"
import { Plus, Camera } from "lucide-react"
import type { Memory } from "@/lib/store"

export function MemoryTimeline() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [showInput, setShowInput] = useState(false)
  const [newCaption, setNewCaption] = useState("")

  useEffect(() => {
    try {
      const stored = localStorage.getItem("our-day-memories")
      if (stored) setMemories(JSON.parse(stored))
    } catch {}
  }, [])

  const saveMemories = (updated: Memory[]) => {
    setMemories(updated)
    localStorage.setItem("our-day-memories", JSON.stringify(updated))
  }

  const addMemory = () => {
    if (!newCaption.trim()) return
    const now = new Date()
    const time = now.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" })
    const updated = [...memories, { id: Date.now(), time, caption: newCaption.trim() }]
    saveMemories(updated)
    setNewCaption("")
    setShowInput(false)
  }

  return (
    <Section id="memories">
      <ChapterTitle number="-" title="Memory Timeline" />

      <div className="mx-auto w-full max-w-lg">
        <div className="relative space-y-8">
          <div className="absolute left-4 top-0 h-full w-px bg-white/[0.06]" />

          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              className="relative flex gap-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-xl">
                <Camera className="h-3.5 w-3.5 text-white/40" />
              </div>
              <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm">
                <p className="mb-1 text-xs tracking-wide text-white/30">{memory.time}</p>
                <p className="text-sm font-light leading-relaxed text-white/60">
                  {memory.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {showInput ? (
          <motion.div className="mt-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <textarea
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              placeholder="What happened?"
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70 placeholder-white/20 backdrop-blur-sm focus:border-white/20 focus:outline-none"
              rows={2}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); addMemory() } }}
            />
            <div className="mt-2 flex justify-end gap-2">
              <button onClick={() => setShowInput(false)} className="rounded-full px-4 py-2 text-xs text-white/40 transition-colors hover:text-white/60">Cancel</button>
              <button onClick={addMemory} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/60 transition-all hover:border-white/30">Add memory</button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            onClick={() => setShowInput(true)}
            className="mt-8 flex items-center gap-2 text-sm text-white/30 transition-colors hover:text-white/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <Plus className="h-4 w-4" />
            Add a memory
          </motion.button>
        )}
      </div>
    </Section>
  )
}
