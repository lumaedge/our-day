"use client"

import { useState } from "react"
import type { useAdminStore, Memory } from "@/lib/store"
import { Plus, Trash2, Camera } from "lucide-react"

export function MemoriesManager({ store }: { store: ReturnType<typeof useAdminStore> }) {
  const [caption, setCaption] = useState("")
  const [showForm, setShowForm] = useState(false)

  const addMemory = () => {
    if (!caption.trim()) return
    const now = new Date()
    const time = now.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" })
    store.addMemory({ id: Date.now(), time, caption: caption.trim() })
    setCaption("")
    setShowForm(false)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-light text-white/70">Memory Timeline</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/50 hover:border-white/30"
        >
          <Plus className="h-3.5 w-3.5" /> Add Memory
        </button>
      </div>

      <div className="space-y-2">
        {store.data.memories.map((memory) => (
          <div key={memory.id} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
            <Camera className="h-4 w-4 text-white/20" />
            <div className="flex-1">
              <p className="text-xs text-white/30">{memory.time}</p>
              <p className="text-sm text-white/60">{memory.caption}</p>
            </div>
            <button
              onClick={() => store.removeMemory(memory.id)}
              className="text-white/20 transition-colors hover:text-red-400/60"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
        {store.data.memories.length === 0 && (
          <p className="py-8 text-center text-sm text-white/20">No memories yet</p>
        )}
      </div>

      {showForm && (
        <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What happened?"
            className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm text-white/70 placeholder-white/20 focus:border-white/20 focus:outline-none"
            rows={2}
          />
          <div className="mt-2 flex justify-end gap-2">
            <button onClick={() => setShowForm(false)} className="rounded-full px-4 py-1.5 text-xs text-white/40 hover:text-white/60">
              Cancel
            </button>
            <button onClick={addMemory} className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs text-white/60 hover:border-white/30">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
