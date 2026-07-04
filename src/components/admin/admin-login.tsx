"use client"

import { useState } from "react"
import { Lock, Heart, ArrowRight } from "lucide-react"

export function AdminLogin({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const stored = localStorage.getItem("our-day-settings")
    const settings = stored ? JSON.parse(stored) : {}
    const correct = settings.password || "admin"
    if (password === correct) {
      onAuthenticated()
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm text-center">
        <div className="mb-8 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
            <Heart className="h-7 w-7 text-white/40" />
          </div>
        </div>
        <h1 className="mb-2 text-2xl font-light text-white/70">Admin</h1>
        <p className="mb-8 text-sm text-white/30">Enter the password to manage your day.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white/70 placeholder-white/20 backdrop-blur-sm focus:border-white/20 focus:outline-none"
              autoFocus
            />
          </div>
          {error && <p className="text-xs text-red-400/70">Incorrect password</p>}
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm text-white/50 transition-all hover:border-white/30 hover:text-white/70"
          >
            Unlock <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  )
}
