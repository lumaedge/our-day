export interface HiddenNote {
  id: string
  message: string
  position: { top: string; left: string }
  size: "sm" | "md" | "lg"
}

export const hiddenNotes: HiddenNote[] = [
  { id: "moon", message: "I'm glad you're here.", position: { top: "15%", left: "70%" }, size: "sm" },
  { id: "star1", message: "Some moments deserve slowing down.", position: { top: "30%", left: "85%" }, size: "sm" },
  { id: "butterfly1", message: "This one is worth remembering.", position: { top: "60%", left: "10%" }, size: "sm" },
  { id: "flower1", message: "You make ordinary moments feel special.", position: { top: "45%", left: "75%" }, size: "md" },
  { id: "cloud1", message: "Breathe. You are exactly where you need to be.", position: { top: "20%", left: "20%" }, size: "sm" },
  { id: "star2", message: "Not every moment needs to be captured. Some are meant to be felt.", position: { top: "70%", left: "60%" }, size: "md" },
  { id: "heart1", message: "You are enough.", position: { top: "10%", left: "50%" }, size: "sm" },
  { id: "leaf1", message: "Growth happens in the quiet moments.", position: { top: "80%", left: "30%" }, size: "sm" },
  { id: "raindrop1", message: "Even the rain has a rhythm.", position: { top: "50%", left: "20%" }, size: "sm" },
  { id: "candle1", message: "Some lights flicker but never go out.", position: { top: "35%", left: "40%" }, size: "sm" },
  { id: "bird1", message: "Freedom looks like this.", position: { top: "5%", left: "80%" }, size: "sm" },
  { id: "star3", message: "Look up. There is always light somewhere.", position: { top: "25%", left: "60%" }, size: "md" },
  { id: "butterfly2", message: "Change can be beautiful.", position: { top: "65%", left: "80%" }, size: "sm" },
  { id: "shell1", message: "Listen closely. The ocean remembers.", position: { top: "75%", left: "15%" }, size: "sm" },
  { id: "firefly1", message: "Small things can light up the dark.", position: { top: "55%", left: "45%" }, size: "sm" },
  { id: "moon2", message: "Even in darkness, you glow.", position: { top: "12%", left: "30%" }, size: "sm" },
  { id: "star4", message: "You are made of stardust.", position: { top: "40%", left: "85%" }, size: "sm" },
  { id: "compass1", message: "Trust where life is taking you.", position: { top: "85%", left: "70%" }, size: "sm" },
  { id: "key1", message: "Some doors open when you least expect them.", position: { top: "22%", left: "10%" }, size: "md" },
  { id: "mirror1", message: "The person looking back at you is remarkable.", position: { top: "68%", left: "40%" }, size: "md" },
  { id: "book1", message: "Every page turns for a reason.", position: { top: "8%", left: "40%" }, size: "sm" },
  { id: "feather1", message: "Let go. It will land where it is meant to.", position: { top: "72%", left: "55%" }, size: "md" },
  { id: "star5", message: "Wish upon something real today.", position: { top: "42%", left: "15%" }, size: "sm" },
  { id: "globe1", message: "The world is waiting for you.", position: { top: "18%", left: "75%" }, size: "sm" },
  { id: "clock1", message: "Time is the only thing you cannot buy.", position: { top: "58%", left: "30%" }, size: "sm" },
  { id: "lamp1", message: "Darkness is just the absence of light. You carry both.", position: { top: "48%", left: "65%" }, size: "lg" },
  { id: "path1", message: "The path ahead is yours to create.", position: { top: "78%", left: "45%" }, size: "sm" },
  { id: "wave1", message: "Let the tide carry what no longer serves you.", position: { top: "33%", left: "55%" }, size: "md" },
  { id: "bridge1", message: "Not all crossings are physical.", position: { top: "63%", left: "70%" }, size: "sm" },
  { id: "seed1", message: "What you plant today blooms tomorrow.", position: { top: "90%", left: "25%" }, size: "sm" },
]
