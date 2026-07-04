"use client"

import { useState } from "react"
import type { useAdminStore } from "@/lib/store"
import { Plus, Trash2, Archive } from "lucide-react"

export function JarManager({ store }: { store: ReturnType<typeof useAdminStore> }) {
  const [text, setText] = useState("")
  const [showForm, setShowForm] = useState(false)

  const addToJar = () => {
    if (!text.trim()) return
    store.addJarMemory({ id: Date.now(), text: text.trim() })
    setText("")
    setShowForm(false)
  }

  const maxMemories = 20
  const fillPercent = Math.min((store.data.jarMemories.length / maxMemories) * 100, 100)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-light text-white/70">Memory Jar</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/50 hover:border-white/30"
        >
          <Plus className="h-3.5 w-3.5" /> Add to Jar
        </button>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="relative h-24 w-16 flex-shrink-0">
          <svg viewBox="0 0 120 200" className="h-full w-full">
            <path d="M45 10 h30 v15 h15 a5 5 0 0 1 5 5 v150 a5 5 0 0 1 -5 5 h-60 a5 5 0 0 1 -5 -5 v-150 a5 5 0 0 1 5 -5 h15 z" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
            <rect x="35" y="5" width="50" height="10" rx="3" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
          </svg>
          {store.data.jarMemories.length > 0 && (
            <div className="absolute bottom-[2px] left-[9px] right-[9px] overflow-hidden rounded-b-sm" style={{ height: "82px" }}>
              <div
                className="absolute bottom-0 w-full bg-gradient-to-t from-white/20 via-white/10 to-transparent transition-all duration-500"
                style={{ height: `${fillPercent}%` }}
              />
            </div>
          )}
        </div>
        <div className="text-sm text-white/40">
          {store.data.jarMemories.length} / {maxMemories} memories
        </div>
      </div>

      <div className="space-y-2">
        {store.data.jarMemories.map((m) => (
          <div key={m.id} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
            <Archive className="h-4 w-4 text-white/20" />
            <p className="flex-1 text-sm text-white/50">&ldquo;{m.text}&rdquo;</p>
            <button onClick={() => store.removeJarMemory(m.id)} className="text-white/20 hover:text-red-400/60">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="One sentence..."
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white/70 placeholder-white/20 focus:border-white/20 focus:outline-none"
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addToJar() } }}
          />
          <div className="mt-2 flex justify-end gap-2">
            <button onClick={() => setShowForm(false)} className="rounded-full px-4 py-1.5 text-xs text-white/40 hover:text-white/60">Cancel</button>
            <button onClick={addToJar} className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs text-white/60 hover:border-white/30">Save</button>
          </div>
        </div>
      )}
    </div>
  )
}
