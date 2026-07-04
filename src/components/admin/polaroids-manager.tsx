"use client"

import { useRef } from "react"
import type { useAdminStore } from "@/lib/store"
import { Trash2 } from "lucide-react"

export function PolaroidsManager({ store }: { store: ReturnType<typeof useAdminStore> }) {
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const src = ev.target?.result as string
      store.addPolaroid({
        id: Date.now(),
        src,
        caption: "",
        rotation: (Math.random() - 0.5) * 8,
        x: Math.random() * 40 - 20,
        y: Math.random() * 20 - 10,
      })
    }
    reader.readAsDataURL(file)
    if (fileRef.current) fileRef.current.value = ""
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-light text-white/70">Polaroid Gallery</h2>
        <button
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/50 hover:border-white/30"
        >
          Upload Photo
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {store.data.polaroids.map((p) => (
          <div key={p.id} className="group relative overflow-hidden rounded-xl border border-white/[0.06]">
            <img src={p.src} alt="" className="h-40 w-full object-cover" />
            <button
              onClick={() => store.removePolaroid(p.id)}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white/50 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:text-red-400/70"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      {store.data.polaroids.length === 0 && (
        <p className="py-8 text-center text-sm text-white/20">No photos yet</p>
      )}
    </div>
  )
}
