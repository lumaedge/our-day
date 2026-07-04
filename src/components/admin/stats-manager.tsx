"use client"

import type { useAdminStore } from "@/lib/store"

export function StatsManager({ store }: { store: ReturnType<typeof useAdminStore> }) {
  const { stats } = store.data

  const labels: Record<string, string> = {
    photosTaken: "Photos Taken",
    memoriesAdded: "Memories Added",
    cardsOpened: "Cards Opened",
    placesVisited: "Places Visited",
    hoursTogether: "Hours Together",
    questionsAsked: "Questions Asked",
  }

  const handleChange = (key: string, value: string) => {
    const num = parseFloat(value)
    if (!isNaN(num)) {
      store.updateStats({ ...stats, [key]: num })
    }
  }

  return (
    <div>
      <h2 className="mb-6 text-xl font-light text-white/70">Live Statistics</h2>
      <p className="mb-6 text-sm text-white/30">Set initial values — they'll update automatically during the day.</p>

      <div className="space-y-4">
        {Object.entries(stats).map(([key, val]) => (
          <div key={key} className="flex items-center gap-4">
            <label className="w-36 text-sm text-white/40">{labels[key] || key}</label>
            <input
              type="number"
              value={val}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-24 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/70 focus:border-white/20 focus:outline-none"
              step={key === "hoursTogether" ? "0.1" : "1"}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
