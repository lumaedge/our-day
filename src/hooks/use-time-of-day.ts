"use client"

import { useState, useEffect } from "react"

export type TimeOfDay = "morning" | "afternoon" | "golden-hour" | "evening"

export function useTimeOfDay() {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("morning")

  useEffect(() => {
    const update = () => {
      const hour = new Date().getHours()
      if (hour >= 5 && hour < 12) setTimeOfDay("morning")
      else if (hour >= 12 && hour < 17) setTimeOfDay("afternoon")
      else if (hour >= 17 && hour < 19) setTimeOfDay("golden-hour")
      else setTimeOfDay("evening")
    }
    update()
    const interval = setInterval(update, 60000)
    return () => clearInterval(interval)
  }, [])

  return timeOfDay
}
