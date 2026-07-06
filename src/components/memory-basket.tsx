"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Camera, X, Heart, Clock } from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface MemoryPhoto {
  id: string
  dataUrl: string
  addedBy: string
  timestamp: number
}

export function MemoryBasket() {
  const [photos, setPhotos] = useState<MemoryPhoto[]>([])
  const [herName, setHerName] = useState("Sindiswa")
  const [yourName, setYourName] = useState("You")
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("our-day-settings")
      if (stored) {
        const s = JSON.parse(stored)
        if (s.herName) setHerName(s.herName)
        if (s.yourName) setYourName(s.yourName)
      }
      const saved = localStorage.getItem("our-day-basket")
      if (saved) setPhotos(JSON.parse(saved))
    } catch {}
  }, [])

  const persist = (p: MemoryPhoto[]) => {
    setPhotos(p)
    localStorage.setItem("our-day-basket", JSON.stringify(p))
  }

  const addPhoto = (dataUrl: string, addedBy: string) => {
    const photo: MemoryPhoto = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      dataUrl,
      addedBy,
      timestamp: Date.now(),
    }
    persist([photo, ...photos])
  }

  const handleFiles = (files: FileList) => {
    const reader = new FileReader()
    let idx = 0
    reader.onload = () => {
      addPhoto(reader.result as string, yourName)
      idx++
      if (idx < files.length) reader.readAsDataURL(files[idx])
    }
    if (files.length > 0) reader.readAsDataURL(files[0])
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (!items) return
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile()
        if (file) {
          const reader = new FileReader()
          reader.onload = () => addPhoto(reader.result as string, yourName)
          reader.readAsDataURL(file)
        }
      }
    }
  }

  const handleDelete = (id: string) => {
    persist(photos.filter((p) => p.id !== id))
  }

  const formatTime = (ts: number) => {
    const d = new Date(ts)
    return d.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" })
  }

  const isToday = (ts: number) => {
    const d = new Date(ts)
    const now = new Date()
    return d.toDateString() === now.toDateString()
  }

  return (
    <div
      className="flex min-h-screen flex-col"
      onPaste={handlePaste}
    >
      <header className="fixed top-0 left-0 right-0 z-20 border-b border-white/[0.04] bg-black/40 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-sm font-light text-white/70">Memory Basket</h1>
            <p className="mt-0.5 text-[10px] tracking-wider text-white/20 uppercase">
              {photos.length} {photos.length === 1 ? "memory" : "memories"}
            </p>
          </div>
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs tracking-wider text-white/50 uppercase backdrop-blur-xl transition-all hover:border-white/30 hover:text-white/80"
          >
            <Camera className="h-3.5 w-3.5" />
            Add
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
        </div>
      </header>

      <div className="flex-1 pt-24 pb-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <AnimatePresence mode="popLayout">
            {photos.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {photos.map((photo) => (
                  <motion.div
                    key={photo.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <img
                      src={photo.dataUrl}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="text-xs font-light text-white/80">{photo.addedBy}</p>
                      <p className="mt-0.5 text-[10px] text-white/40">
                        {isToday(photo.timestamp) ? "" : new Date(photo.timestamp).toLocaleDateString("en-ZA")}
                        {" "}{formatTime(photo.timestamp)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(photo.id) }}
                      className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white/40 opacity-0 backdrop-blur-sm transition-all hover:bg-black/70 hover:text-white/70 group-hover:opacity-100"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mt-[20vh] flex flex-col items-center text-center"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02]">
                  <Heart className="h-6 w-6 text-white/20" />
                </div>
                <h2 className="mb-2 text-lg font-light text-white/50">No memories yet</h2>
                <p className="max-w-xs text-sm font-light leading-relaxed text-white/25">
                  Start adding photos from your day. Tap the camera button or paste an image.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl border border-white/[0.08] bg-black/60 backdrop-blur-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.dataUrl}
                alt=""
                className="max-h-[75vh] w-auto object-contain"
              />
              <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3">
                <div className="flex items-center gap-2">
                  <Heart className="h-3 w-3 text-white/20" />
                  <span className="text-xs text-white/50">{selectedPhoto.addedBy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-white/20" />
                  <span className="text-xs text-white/30">
                    {isToday(selectedPhoto.timestamp)
                      ? formatTime(selectedPhoto.timestamp)
                      : new Date(selectedPhoto.timestamp).toLocaleDateString("en-ZA") + " " + formatTime(selectedPhoto.timestamp)}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
