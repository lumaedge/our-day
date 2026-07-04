"use client"

import type { useAdminStore } from "@/lib/store"

export function GeneralSettings({ store }: { store: ReturnType<typeof useAdminStore> }) {
  const { settings } = store.data

  return (
    <div>
      <h2 className="mb-6 text-xl font-light text-white/70">General Settings</h2>

      <div className="space-y-5">
        <div>
          <label className="mb-1.5 block text-xs text-white/30">Her Name</label>
          <input
            value={settings.herName}
            onChange={(e) => store.updateSettings({ herName: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70 placeholder-white/20 focus:border-white/20 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-white/30">Date</label>
          <input
            type="date"
            value={settings.date}
            onChange={(e) => store.updateSettings({ date: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70 focus:border-white/20 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-white/30">Location</label>
          <input
            value={settings.location}
            onChange={(e) => store.updateSettings({ location: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70 placeholder-white/20 focus:border-white/20 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-white/30">Greeting</label>
          <input
            value={settings.greeting}
            onChange={(e) => store.updateSettings({ greeting: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70 placeholder-white/20 focus:border-white/20 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-white/30">Admin Password</label>
          <input
            type="password"
            value={settings.password}
            onChange={(e) => store.updateSettings({ password: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70 placeholder-white/20 focus:border-white/20 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 pt-4">
          <button
            onClick={() => store.updateSettings({ published: !settings.published })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.published ? "bg-white/30" : "bg-white/10"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.published ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-sm text-white/40">
            {settings.published ? "Published — live for her" : "Unpublished — only you can see"}
          </span>
        </div>
      </div>
    </div>
  )
}
