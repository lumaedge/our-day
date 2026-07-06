"use client"

import { motion } from "framer-motion"
import { MemoryBasket } from "@/components/memory-basket"
import { ConversationCards } from "@/components/conversation-cards"
import { useState, useEffect } from "react"
import { Heart, Send } from "lucide-react"

interface Note {
  id: string
  text: string
  addedBy: string
  timestamp: number
}

function LittleNotes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [input, setInput] = useState("")
  const [yourName, setYourName] = useState("You")
  const [herName, setHerName] = useState("Sindiswa")

  useEffect(() => {
    try {
      const saved = localStorage.getItem("our-day-notes")
      if (saved) setNotes(JSON.parse(saved))
      const stored = localStorage.getItem("our-day-settings")
      if (stored) {
        const s = JSON.parse(stored)
        if (s.yourName) setYourName(s.yourName)
        if (s.herName) setHerName(s.herName)
      }
    } catch {}
  }, [])

  const addNote = () => {
    const text = input.trim()
    if (!text) return
    const note: Note = {
      id: Date.now().toString(36),
      text,
      addedBy: yourName || "You",
      timestamp: Date.now(),
    }
    const updated = [note, ...notes]
    setNotes(updated)
    localStorage.setItem("our-day-notes", JSON.stringify(updated))
    setInput("")
  }

  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center"
        >
          <h2 className="mb-2 text-lg font-light text-white/60">Little Notes</h2>
          <p className="text-sm font-light text-white/25">Words from today that deserve to stay.</p>
        </motion.div>

        <div className="mb-10 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addNote()}
            placeholder="Write a note..."
            className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70 placeholder-white/20 focus:border-white/20 focus:outline-none"
          />
          <button
            onClick={addNote}
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/50 transition-all hover:border-white/30 hover:text-white/80"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>

        {notes.length > 0 ? (
          <div className="space-y-3">
            {notes.map((note, i) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 backdrop-blur-sm"
              >
                <p className="text-sm font-light leading-relaxed text-white/60">
                  &ldquo;{note.text}&rdquo;
                </p>
                <p className="mt-2 text-[10px] text-white/20">
                  {note.addedBy} &middot;{" "}
                  {new Date(note.timestamp).toLocaleTimeString("en-ZA", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-white/20">No notes yet. Leave the first one.</p>
        )}
      </div>
    </section>
  )
}

function FinalThankYou() {
  const [yourName, setYourName] = useState("")

  useEffect(() => {
    try {
      const stored = localStorage.getItem("our-day-settings")
      if (stored) {
        const s = JSON.parse(stored)
        if (s.yourName) setYourName(s.yourName)
      }
    } catch {}
  }, [])

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] mx-auto">
          <Heart className="h-5 w-5 text-white/20" />
        </div>

        <p className="mb-3 text-lg font-light text-white/50 sm:text-xl">
          Thank you for sharing today with me.
        </p>
        {yourName && (
          <p className="text-sm font-light text-white/30">
            — {yourName}
          </p>
        )}
      </motion.div>
    </section>
  )
}

export function MemoryPhase() {
  return (
    <div className="min-h-screen">
      <MemoryBasket />
      <LittleNotes />
      <FinalThankYou />
      <ConversationCards />
    </div>
  )
}
