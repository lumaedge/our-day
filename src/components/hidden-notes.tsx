"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useCallback } from "react"
import { hiddenNotes } from "@/data/hidden-notes"
import type { HiddenNote } from "@/data/hidden-notes"

export function HiddenNotes() {
  const [foundNotes, setFoundNotes] = useState<Set<string>>(new Set())
  const [activeNote, setActiveNote] = useState<HiddenNote | null>(null)

  const handleDiscover = useCallback((note: HiddenNote) => {
    if (foundNotes.has(note.id)) return
    setFoundNotes((prev) => new Set(prev).add(note.id))
    setActiveNote(note)
    setTimeout(() => setActiveNote(null), 3000)
  }, [foundNotes])

  const sizeClass = (size: HiddenNote["size"]) => {
    switch (size) {
      case "sm": return "h-2 w-2"
      case "md": return "h-3 w-3"
      case "lg": return "h-4 w-4"
    }
  }

  return (
    <>
      {hiddenNotes.map((note) => (
        <button
          key={note.id}
          onClick={() => handleDiscover(note)}
          className={`fixed z-30 rounded-full transition-all duration-500 ${
            foundNotes.has(note.id)
              ? "opacity-0 pointer-events-none"
              : "opacity-20 hover:opacity-60"
          }`}
          style={{
            top: note.position.top,
            left: note.position.left,
          }}
        >
          <motion.div
            className={`${sizeClass(note.size)} rounded-full bg-white/50`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        </button>
      ))}

      <AnimatePresence>
        {activeNote && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="max-w-xs rounded-2xl border border-white/10 bg-black/70 px-6 py-4 text-center backdrop-blur-2xl"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="text-sm font-light leading-relaxed text-white/70">
                {activeNote.message}
              </p>
              <p className="mt-3 text-[10px] tracking-wider text-white/20 uppercase">
                Note discovered
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
