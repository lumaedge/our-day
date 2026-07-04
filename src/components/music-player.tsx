"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Music, X, Volume2, VolumeX } from "lucide-react"
import { useState } from "react"

export function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

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
              className="w-full max-w-sm rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-sm font-light text-white/60">Background Music</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/30 hover:text-white/60"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mb-6 flex justify-center">
                <motion.div
                  className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]"
                  animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Music className="h-8 w-8 text-white/30" />
                </motion.div>
              </div>

              <div className="mb-6 text-center">
                <p className="text-sm text-white/50">Ambient Soundscape</p>
                <p className="text-xs text-white/20">A gentle soundtrack for today</p>
              </div>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="mx-auto flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm text-white/50 transition-all hover:border-white/30 hover:text-white/70"
              >
                {isPlaying ? (
                  <>
                    <Volume2 className="h-4 w-4" /> Pause
                  </>
                ) : (
                  <>
                    <VolumeX className="h-4 w-4" /> Play
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-[10px] text-white/15">
                Music is muted by default. Custom playlists coming soon.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
