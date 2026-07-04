"use client"

import { useState } from "react"
import type { useAdminStore, Stop } from "@/lib/store"
import { Plus, Trash2, GripVertical } from "lucide-react"

const ICON_OPTIONS = ["Car", "IceCreamCone", "BookOpen", "Gamepad2", "Sunset", "MapPin", "Coffee", "UtensilsCrossed", "Mountain", "TreePine", "Camera", "Music"]

export function StopsManager({ store }: { store: ReturnType<typeof useAdminStore> }) {
  const [editing, setEditing] = useState<Stop | null>(null)

  const handleSave = (stop: Stop) => {
    if (editing?.id && store.data.stops.find((s) => s.id === editing.id)) {
      store.updateStops(store.data.stops.map((s) => (s.id === stop.id ? stop : s)))
    } else {
      store.addStop(stop)
    }
    setEditing(null)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-light text-white/70">Itinerary Stops</h2>
        <button
          onClick={() => setEditing({ id: "", icon: "MapPin", title: "", description: "" })}
          className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/50 transition-all hover:border-white/30"
        >
          <Plus className="h-3.5 w-3.5" /> Add Stop
        </button>
      </div>

      <div className="space-y-2">
        {store.data.stops.map((stop, index) => (
          <div
            key={stop.id}
            className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
          >
            <GripVertical className="h-4 w-4 text-white/15" />
            <div className="flex-1">
              <p className="text-sm text-white/60">{stop.title}</p>
              <p className="text-xs text-white/30">{stop.description}</p>
            </div>
            <button
              onClick={() => setEditing(stop)}
              className="rounded-full px-3 py-1 text-xs text-white/30 transition-colors hover:text-white/60"
            >
              Edit
            </button>
            <button
              onClick={() => store.removeStop(stop.id)}
              className="text-white/20 transition-colors hover:text-red-400/60"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      {editing && (
        <StopForm stop={editing} onSave={handleSave} onCancel={() => setEditing(null)} />
      )}
    </div>
  )
}

function StopForm({ stop, onSave, onCancel }: { stop: Stop; onSave: (s: Stop) => void; onCancel: () => void }) {
  const [form, setForm] = useState(stop)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0a] p-6">
        <h3 className="mb-4 text-sm font-light text-white/60">
          {stop.id ? "Edit Stop" : "New Stop"}
        </h3>
        <div className="space-y-3">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70 placeholder-white/20 focus:border-white/20 focus:outline-none"
          />
          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70 placeholder-white/20 focus:border-white/20 focus:outline-none"
          />
          <input
            placeholder="ID (e.g. my-stop)"
            value={form.id}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70 placeholder-white/20 focus:border-white/20 focus:outline-none"
          />
          <div>
            <label className="mb-1.5 block text-xs text-white/30">Icon</label>
            <div className="flex flex-wrap gap-2">
              {ICON_OPTIONS.map((icon) => (
                <button
                  key={icon}
                  onClick={() => setForm({ ...form, icon })}
                  className={`rounded-lg border px-3 py-1.5 text-xs transition-all ${
                    form.icon === icon
                      ? "border-white/30 bg-white/10 text-white/70"
                      : "border-white/10 text-white/30 hover:border-white/20"
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onCancel} className="rounded-full px-5 py-2 text-xs text-white/40 hover:text-white/60">
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs text-white/60 hover:border-white/30"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
