"use client"

import { useState, useEffect } from "react"
import { getSettings, type PublicSettings } from "@/lib/settings"

function localFallback(): PublicSettings {
  if (typeof window === "undefined") {
    return { herName: "Sindiswa", yourName: "", date: "", location: "", personalMessage: "", greeting: "", published: false }
  }
  try {
    const raw = localStorage.getItem("our-day-settings")
    if (raw) return JSON.parse(raw)
  } catch {}
  return { herName: "Sindiswa", yourName: "", date: "", location: "", personalMessage: "", greeting: "", published: false }
}

export function useSettings() {
  const [settings, setSettings] = useState<PublicSettings>(localFallback)

  useEffect(() => {
    getSettings().then(setSettings)
  }, [])

  return settings
}
