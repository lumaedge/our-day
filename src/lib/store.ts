"use client"

import { useState, useEffect, useCallback } from "react"

export interface Stop {
  id: string
  icon: string
  title: string
  description: string
  photo?: string
}

export interface Memory {
  id: number
  time: string
  caption: string
  photo?: string
}

export interface Polaroid {
  id: number
  src: string
  caption: string
  rotation: number
  x: number
  y: number
}

export interface JarMemory {
  id: number
  text: string
}

export interface SiteSettings {
  herName: string
  date: string
  location: string
  greeting: string
  published: boolean
  password: string
}

export interface AdminData {
  settings: SiteSettings
  stops: Stop[]
  memories: Memory[]
  polaroids: Polaroid[]
  jarMemories: JarMemory[]
  stats: Record<string, number>
}

const DEFAULT_SETTINGS: SiteSettings = {
  herName: "Sindiswa",
  date: new Date().toISOString().split("T")[0],
  location: "South Africa",
  greeting: "Welcome",
  published: false,
  password: "admin",
}

const DEFAULT_STOPS: Stop[] = [
  { id: "journey", icon: "Car", title: "The Journey", description: "The road ahead is full of possibility." },
  { id: "icecream", icon: "IceCreamCone", title: "Ice Cream", description: "Sweet moments in the afternoon sun." },
  { id: "bookstore", icon: "BookOpen", title: "The Bookstore", description: "Wandering through stories waiting to be discovered." },
  { id: "arcade", icon: "Gamepad2", title: "The Arcade", description: "A little friendly competition never hurt anyone." },
  { id: "evening", icon: "Sunset", title: "The Evening", description: "As the day winds down, the best part begins." },
]

const STORAGE_KEY = "our-day-admin"

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage<T>(key: string, data: T) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch { /* quota exceeded, ignore */ }
}

export function useAdminStore() {
  const [data, setData] = useState<AdminData>(() => ({
    settings: loadFromStorage("our-day-settings", DEFAULT_SETTINGS),
    stops: loadFromStorage("our-day-stops", DEFAULT_STOPS),
    memories: loadFromStorage("our-day-memories", []),
    polaroids: loadFromStorage("our-day-polaroids", []),
    jarMemories: loadFromStorage("our-day-jar", []),
    stats: loadFromStorage("our-day-stats", {
      photosTaken: 0,
      memoriesAdded: 1,
      cardsOpened: 0,
      placesVisited: 0,
      hoursTogether: 0,
      questionsAsked: 0,
    }),
  }))

  useEffect(() => {
    saveToStorage("our-day-settings", data.settings)
    saveToStorage("our-day-stops", data.stops)
    saveToStorage("our-day-memories", data.memories)
    saveToStorage("our-day-polaroids", data.polaroids)
    saveToStorage("our-day-jar", data.jarMemories)
    saveToStorage("our-day-stats", data.stats)
  }, [data])

  const updateSettings = useCallback((settings: Partial<SiteSettings>) => {
    setData((prev) => ({ ...prev, settings: { ...prev.settings, ...settings } }))
  }, [])

  const updateStops = useCallback((stops: Stop[]) => {
    setData((prev) => ({ ...prev, stops }))
  }, [])

  const addStop = useCallback((stop: Stop) => {
    setData((prev) => ({ ...prev, stops: [...prev.stops, stop] }))
  }, [])

  const removeStop = useCallback((id: string) => {
    setData((prev) => ({ ...prev, stops: prev.stops.filter((s) => s.id !== id) }))
  }, [])

  const addMemory = useCallback((memory: Memory) => {
    setData((prev) => ({ ...prev, memories: [...prev.memories, memory] }))
  }, [])

  const removeMemory = useCallback((id: number) => {
    setData((prev) => ({ ...prev, memories: prev.memories.filter((m) => m.id !== id) }))
  }, [])

  const addPolaroid = useCallback((polaroid: Polaroid) => {
    setData((prev) => ({ ...prev, polaroids: [...prev.polaroids, polaroid] }))
  }, [])

  const removePolaroid = useCallback((id: number) => {
    setData((prev) => ({ ...prev, polaroids: prev.polaroids.filter((p) => p.id !== id) }))
  }, [])

  const addJarMemory = useCallback((jarMemory: JarMemory) => {
    setData((prev) => ({ ...prev, jarMemories: [...prev.jarMemories, jarMemory] }))
  }, [])

  const removeJarMemory = useCallback((id: number) => {
    setData((prev) => ({ ...prev, jarMemories: prev.jarMemories.filter((j) => j.id !== id) }))
  }, [])

  const updateStats = useCallback((stats: Record<string, number>) => {
    setData((prev) => ({ ...prev, stats }))
  }, [])

  const resetAll = useCallback(() => {
    setData({
      settings: DEFAULT_SETTINGS,
      stops: DEFAULT_STOPS,
      memories: [],
      polaroids: [],
      jarMemories: [],
      stats: { photosTaken: 0, memoriesAdded: 1, cardsOpened: 0, placesVisited: 0, hoursTogether: 0, questionsAsked: 0 },
    })
  }, [])

  return { data, updateSettings, updateStops, addStop, removeStop, addMemory, removeMemory, addPolaroid, removePolaroid, addJarMemory, removeJarMemory, updateStats, resetAll }
}

export function usePublicStore() {
  const [data, setData] = useState<AdminData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setData({
      settings: loadFromStorage("our-day-settings", DEFAULT_SETTINGS),
      stops: loadFromStorage("our-day-stops", DEFAULT_STOPS),
      memories: loadFromStorage("our-day-memories", []),
      polaroids: loadFromStorage("our-day-polaroids", []),
      jarMemories: loadFromStorage("our-day-jar", []),
      stats: loadFromStorage("our-day-stats", {
        photosTaken: 0, memoriesAdded: 1, cardsOpened: 0, placesVisited: 0, hoursTogether: 0, questionsAsked: 0,
      }),
    })
    setLoading(false)
  }, [])

  return { data, loading }
}
