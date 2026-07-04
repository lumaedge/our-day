"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Section, ChapterTitle } from "./section"
import { useState, useEffect, useRef } from "react"
import { Plus, X } from "lucide-react"
import type { Polaroid } from "@/lib/store"

export function PolaroidGallery() {
  const [polaroids, setPolaroids] = useState<Polaroid[]>([])
  const [selected, setSelected] = useState<Polaroid | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("our-day-polaroids")
      if (stored) setPolaroids(JSON.parse(stored))
    } catch {}
  }, [])

  const savePolaroids = (updated: Polaroid[]) => {
    setPolaroids(updated)
    localStorage.setItem("our-day-polaroids", JSON.stringify(updated))
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const src = ev.target?.result as string
      const updated = [
        ...polaroids,
        {
          id: Date.now(),
          src,
          caption: "",
          rotation: (Math.random() - 0.5) * 8,
          x: Math.random() * 40 - 20,
          y: Math.random() * 20 - 10,
        },
      ]
      savePolaroids(updated)
    }
    reader.readAsDataURL(file)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <Section id="gallery">
      <ChapterTitle number="-" title="Polaroid Gallery" />

      <div className="relative mx-auto flex h-[500px] w-full max-w-2xl items-center justify-center overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.01] backdrop-blur-sm">
        <AnimatePresence>
          {polaroids.map((p, i) => (
            <motion.div
              key={p.id}
              className="absolute cursor-pointer"
              style={{ transform: `rotate(${p.rotation}deg) translate(${p.x}px, ${p.y}px)` }}
              initial={{ opacity: 0, scale: 0.5, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15, delay: i * 0.1 } }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              onClick={() => setSelected(p)}
            >
              <div className="overflow-hidden rounded-lg bg-white p-2 pb-8 shadow-2xl">
                <img src={p.src} alt="Polaroid" className="h-28 w-28 object-cover sm:h-36 sm:w-36" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {polaroids.length === 0 && (
          <p className="text-sm text-white/20">Upload photos to create Polaroids</p>
        )}

        <motion.button
          className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 backdrop-blur-xl transition-all hover:border-white/30"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => fileInputRef.current?.click()}
        >
          <Plus className="h-4 w-4 text-white/50" />
        </motion.button>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div className="relative max-w-lg" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} onClick={(e) => e.stopPropagation()}>
              <img src={selected.src} alt="Polaroid" className="max-h-[80vh] rounded-xl object-contain" />
              <button onClick={() => setSelected(null)} className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/50 backdrop-blur-xl hover:text-white/80">
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
