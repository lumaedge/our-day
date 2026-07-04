"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Sparkles } from "lucide-react"
import { useState, useCallback, useMemo } from "react"
import { questions } from "@/data/questions"
import type { Category } from "@/data/questions"

export function ConversationCards() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<{ text: string; category: Category } | null>(null)
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set())
  const [isFlipping, setIsFlipping] = useState(false)

  const getRandomQuestion = useCallback(() => {
    if (usedIndices.size >= questions.length) {
      setUsedIndices(new Set())
    }

    let available = questions
      .map((q, i) => ({ ...q, originalIndex: i }))
      .filter((q) => !usedIndices.has(q.originalIndex))

    if (available.length === 0) {
      setUsedIndices(new Set())
      available = questions.map((q, i) => ({ ...q, originalIndex: i }))
    }

    const pick = available[Math.floor(Math.random() * available.length)]
    setUsedIndices((prev) => new Set(prev).add(pick.originalIndex))
    return { text: pick.text, category: pick.category }
  }, [usedIndices])

  const handleOpen = useCallback(() => {
    setIsOpen(true)
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentQuestion(getRandomQuestion())
      setIsFlipping(false)
    }, 400)
  }, [getRandomQuestion])

  const handleNext = useCallback(() => {
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentQuestion(getRandomQuestion())
      setIsFlipping(false)
    }, 400)
  }, [getRandomQuestion])

  const categoryColors: Record<Category, string> = useMemo(
    () => ({
      Fun: "bg-white/10 text-white/60",
      Deep: "bg-white/10 text-white/60",
      Childhood: "bg-white/10 text-white/60",
      Dreams: "bg-white/10 text-white/60",
      Relationships: "bg-white/10 text-white/60",
      Random: "bg-white/10 text-white/60",
      Books: "bg-white/10 text-white/60",
      Music: "bg-white/10 text-white/60",
      Travel: "bg-white/10 text-white/60",
      Life: "bg-white/10 text-white/60",
    }),
    []
  )

  return (
    <>
      <motion.button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-5 py-3 text-sm text-white/60 backdrop-blur-xl transition-all hover:border-white/30 hover:text-white/80"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="h-4 w-4" />
        Need an idea?
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-2 -right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-xl text-white/40 hover:text-white/70"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur-2xl">
                <AnimatePresence mode="wait">
                  {currentQuestion && !isFlipping ? (
                    <motion.div
                      key={currentQuestion.text}
                      className="text-center"
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: -90, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <span
                        className={`mb-4 inline-block rounded-full px-3 py-1 text-xs tracking-wide ${categoryColors[currentQuestion.category]}`}
                      >
                        {currentQuestion.category}
                      </span>
                      <p className="mb-8 text-xl font-light leading-relaxed text-white/80">
                        {currentQuestion.text}
                      </p>
                      <button
                        onClick={handleNext}
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm text-white/50 transition-all hover:border-white/30 hover:text-white/70"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        Another question
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="flex h-48 items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className="h-8 w-8 rounded-full border border-white/20 border-t-white/60"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
