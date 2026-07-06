export interface PublicSettings {
  herName: string
  yourName: string
  date: string
  location: string
  personalMessage: string
  greeting: string
  published: boolean
}

const STORAGE_KEY = "our-day-settings"

let cached: PublicSettings | null = null
let fetching: Promise<PublicSettings> | null = null

async function fetchFromApi(): Promise<PublicSettings | null> {
  try {
    const res = await fetch("/api/settings", { cache: "no-store" })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

function fetchFromLocal(): PublicSettings | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export async function getSettings(): Promise<PublicSettings> {
  if (cached) return cached

  if (!fetching) {
    fetching = (async () => {
      const api = await fetchFromApi()
      if (api) {
        cached = api
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(api)) } catch {}
        return api
      }

      const local = fetchFromLocal()
      if (local) {
        cached = local
        return local
      }

      const fallback: PublicSettings = {
        herName: "Sindiswa",
        yourName: "",
        date: new Date().toISOString().split("T")[0],
        location: "",
        personalMessage: "",
        greeting: "",
        published: false,
      }
      cached = fallback
      return fallback
    })()
  }

  return fetching
}
