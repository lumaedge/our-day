import { put, list, del } from "@vercel/blob"
import { NextResponse } from "next/server"

const MANIFEST_KEY = "our-day/manifest.json"

interface PhotoMeta {
  id: string
  url: string
  addedBy: string
  timestamp: number
}

async function getManifest(): Promise<PhotoMeta[]> {
  try {
    const { blobs } = await list({ prefix: MANIFEST_KEY })
    if (blobs.length === 0) return []
    const res = await fetch(blobs[0].url)
    return await res.json()
  } catch {
    return []
  }
}

async function saveManifest(manifest: PhotoMeta[]) {
  await put(MANIFEST_KEY, JSON.stringify(manifest), {
    contentType: "application/json",
    access: "public",
  })
}

export async function GET() {
  const manifest = await getManifest()
  return NextResponse.json(manifest.reverse())
}

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get("image") as File
  const addedBy = (formData.get("addedBy") as string) || "Someone"

  if (!file) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 })
  }

  const ext = file.name.split(".").pop() || "jpg"
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
  const key = `our-day/photos/${id}.${ext}`

  const blob = await put(key, file, { access: "public" })

  const meta: PhotoMeta = {
    id,
    url: blob.url,
    addedBy,
    timestamp: Date.now(),
  }

  const manifest = await getManifest()
  manifest.push(meta)
  await saveManifest(manifest)

  return NextResponse.json(meta)
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "No id provided" }, { status: 400 })
  }

  const manifest = await getManifest()
  const entry = manifest.find((m) => m.id === id)
  if (!entry) {
    return NextResponse.json({ error: "Photo not found" }, { status: 404 })
  }

  await del(entry.url)
  const updated = manifest.filter((m) => m.id !== id)
  await saveManifest(updated)

  return NextResponse.json({ success: true })
}
