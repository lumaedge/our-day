"use client"

import { useState } from "react"
import { Cloud, CloudOff, Loader2 } from "lucide-react"
import type { useAdminStore } from "@/lib/store"

export function GeneralSettings({ store }: { store: ReturnType<typeof useAdminStore> }) {
  const { settings } = store.data
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  const saveToCloud = async () => {
    setSaveStatus("saving")
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })
      if (res.ok) {
        setSaveStatus("saved")
        setTimeout(() => setSaveStatus("idle"), 3000)
      } else {
        setSaveStatus("error")
      }
    } catch {
      setSaveStatus("error")
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-light text-white/70">General Settings</h2>
        <button
          onClick={saveToCloud}
          disabled={saveStatus === "saving"}
          className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs tracking-wider text-white/50 uppercase backdrop-blur-xl transition-all hover:border-white/30 hover:text-white/80 disabled:opacity-40"
        >
          {saveStatus === "saving" ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : saveStatus === "saved" ? (
            <Cloud className="h-3.5 w-3.5 text-green-400" />
          ) : saveStatus === "error" ? (
            <CloudOff className="h-3.5 w-3.5 text-red-400" />
          ) : (
            <Cloud className="h-3.5 w-3.5" />
          )}
          {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved" : saveStatus === "error" ? "Failed" : "Save to Cloud"}
        </button>
      </div>

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
          <label className="mb-1.5 block text-xs text-white/30">Your Name</label>
          <input
            value={settings.yourName}
            onChange={(e) => store.updateSettings({ yourName: e.target.value })}
            placeholder="So she knows who sent this"
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
          <label className="mb-1.5 block text-xs text-white/30">Personal Message</label>
          <textarea
            value={settings.personalMessage}
            onChange={(e) => store.updateSettings({ personalMessage: e.target.value })}
            placeholder="A short note she'll see after 'You said yes.'"
            rows={3}
            className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/70 placeholder-white/20 focus:border-white/20 focus:outline-none"
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
