"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Music, X } from "lucide-react"
import { useState, useEffect } from "react"

function extractPlaylistId(url: string): string | null {
  if (!url) return null
  const patterns = [
    /spotify\.com\/playlist\/([a-zA-Z0-9]+)/,
    /spotify:playlist:([a-zA-Z0-9]+)/,
    /^([a-zA-Z0-9]{22})$/,
  ]
  for (const p of patterns) {
    const m = url.match(p)
    if (m) return m[1]
  }
  return null
}

export function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false)
  const [playlistUrl, setPlaylistUrl] = useState("")

  useEffect(() => {
    try {
      const stored = localStorage.getItem("our-day-settings")
      if (stored) {
        const s = JSON.parse(stored)
        if (s.spotifyPlaylist) setPlaylistUrl(s.spotifyPlaylist)
      }
    } catch {}
  }, [])

  const playlistId = extractPlaylistId(playlistUrl)
  const embedUrl = playlistId ? `https://open.spotify.com/embed/playlist/${playlistId}` : null

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 backdrop-blur-xl transition-all hover:border-white/30"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Music className="h-4 w-4 text-white/50" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 pt-5 pb-3">
                <h3 className="text-sm font-light text-white/60">Music</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/30 hover:text-white/60"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="380"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="border-0"
                />
              ) : (
                <div className="flex flex-col items-center px-5 pb-8 pt-4 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02]">
                    <Music className="h-6 w-6 text-white/20" />
                  </div>
                  <p className="text-sm font-light text-white/40">No playlist set</p>
                  <p className="mt-1 text-xs text-white/20">
                    Add a Spotify playlist link in the admin settings.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
