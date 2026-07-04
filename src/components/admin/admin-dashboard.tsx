"use client"

import { useState } from "react"
import { useAdminStore } from "@/lib/store"
import {
  Settings2, MapPin, Camera, Heart, MessageCircle, Sparkles, BarChart3, Eye, LogOut, Archive,
} from "lucide-react"
import { GeneralSettings } from "./general-settings"
import { StopsManager } from "./stops-manager"
import { MemoriesManager } from "./memories-manager"
import { PolaroidsManager } from "./polaroids-manager"
import { JarManager } from "./jar-manager"
import { CardsManager } from "./cards-manager"
import { StatsManager } from "./stats-manager"

type Tab = "general" | "stops" | "memories" | "polaroids" | "jar" | "cards" | "stats"

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "general", label: "Settings", icon: Settings2 },
  { id: "stops", label: "Itinerary", icon: MapPin },
  { id: "memories", label: "Memories", icon: Camera },
  { id: "polaroids", label: "Polaroids", icon: Heart },
  { id: "jar", label: "Memory Jar", icon: Archive },
  { id: "cards", label: "Question Cards", icon: MessageCircle },
  { id: "stats", label: "Stats", icon: BarChart3 },
]

export function AdminDashboard() {
  const store = useAdminStore()
  const [activeTab, setActiveTab] = useState<Tab>("general")

  const renderTab = () => {
    switch (activeTab) {
      case "general": return <GeneralSettings store={store} />
      case "stops": return <StopsManager store={store} />
      case "memories": return <MemoriesManager store={store} />
      case "polaroids": return <PolaroidsManager store={store} />
      case "jar": return <JarManager store={store} />
      case "cards": return <CardsManager />
      case "stats": return <StatsManager store={store} />
    }
  }

  return (
    <div className="flex min-h-screen">
      <nav className="fixed bottom-0 z-50 flex w-full overflow-x-auto border-t border-white/[0.06] bg-black/80 backdrop-blur-xl sm:relative sm:bottom-auto sm:w-56 sm:flex-col sm:border-r sm:border-t-0 sm:bg-transparent sm:backdrop-blur-none">
        <div className="hidden px-6 py-8 sm:block">
          <p className="text-xs tracking-wider text-white/30 uppercase">Admin</p>
          <p className="text-sm font-light text-white/50">Our Day</p>
        </div>
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 flex-col items-center gap-1 px-3 py-3 text-[10px] transition-all sm:flex-row sm:gap-3 sm:px-6 sm:py-3 sm:text-sm ${
                activeTab === tab.id
                  ? "text-white/80 bg-white/[0.04]"
                  : "text-white/30 hover:text-white/50 hover:bg-white/[0.02]"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
        <a
          href="/"
          target="_blank"
          className="hidden items-center gap-3 border-t border-white/[0.06] px-6 py-3 text-sm text-white/30 transition-all hover:text-white/50 sm:flex"
        >
          <Eye className="h-4 w-4" />
          Preview
        </a>
      </nav>

      <main className="flex-1 px-4 pb-24 pt-8 sm:px-8 sm:pb-8">
        <div className="mx-auto max-w-3xl">{renderTab()}</div>
      </main>
    </div>
  )
}
