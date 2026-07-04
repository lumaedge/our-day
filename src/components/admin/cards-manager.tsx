"use client"

import { useState, useMemo } from "react"
import { questions } from "@/data/questions"
import type { Category } from "@/data/questions"
import { Search } from "lucide-react"

const CATEGORIES: Category[] = ["Fun", "Deep", "Childhood", "Dreams", "Relationships", "Random", "Books", "Music", "Travel", "Life"]

export function CardsManager() {
  const [search, setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState<Category | "All">("All")

  const filtered = useMemo(
    () =>
      questions.filter(
        (q) =>
          (filterCategory === "All" || q.category === filterCategory) &&
          (search === "" || q.text.toLowerCase().includes(search.toLowerCase()))
      ),
    [search, filterCategory]
  )

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: questions.length }
    CATEGORIES.forEach((cat) => (c[cat] = questions.filter((q) => q.category === cat).length))
    return c
  }, [])

  return (
    <div>
      <h2 className="mb-2 text-xl font-light text-white/70">Conversation Cards</h2>
      <p className="mb-6 text-sm text-white/30">{questions.length} questions across 10 categories</p>

      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/20" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search questions..."
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white/70 placeholder-white/20 focus:border-white/20 focus:outline-none"
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat === filterCategory ? "All" : cat)}
            className={`rounded-full border px-3 py-1 text-xs transition-all ${
              filterCategory === cat
                ? "border-white/30 bg-white/10 text-white/70"
                : "border-white/10 text-white/30 hover:border-white/20"
            }`}
          >
            {cat} ({counts[cat]})
          </button>
        ))}
        {filterCategory !== "All" && (
          <button
            onClick={() => setFilterCategory("All")}
            className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/30 hover:border-white/20"
          >
            Clear
          </button>
        )}
      </div>

      <div className="max-h-96 space-y-1 overflow-y-auto">
        {filtered.map((q, i) => (
          <div key={i} className="rounded-lg px-3 py-2 text-sm text-white/50 hover:bg-white/[0.02]">
            <span className="mr-2 text-[10px] text-white/20">[{q.category}]</span>
            {q.text}
          </div>
        ))}
      </div>
    </div>
  )
}
