import { put, list } from "@vercel/blob"
import { NextResponse } from "next/server"

const SETTINGS_KEY = "our-day/settings.json"

const DEFAULT_SETTINGS = {
  herName: "Sindiswa",
  yourName: "",
  date: new Date().toISOString().split("T")[0],
  location: "",
  personalMessage: "",
  greeting: "",
  password: "admin",
  published: false,
}

async function fetchSettingsFromBlob() {
  try {
    const { blobs } = await list({ prefix: SETTINGS_KEY })
    if (blobs.length === 0) return DEFAULT_SETTINGS
    const res = await fetch(blobs[0].url)
    return await res.json()
  } catch {
    return DEFAULT_SETTINGS
  }
}

export async function GET() {
  const settings = await fetchSettingsFromBlob()
  return NextResponse.json(settings)
}

export async function POST(req: Request) {
  const body = await req.json()
  const merged = { ...DEFAULT_SETTINGS, ...body }
  await put(SETTINGS_KEY, JSON.stringify(merged), {
    contentType: "application/json",
    access: "public",
  })
  return NextResponse.json(merged)
}
