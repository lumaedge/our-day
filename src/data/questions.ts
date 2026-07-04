export interface Question {
  text: string
  category: Category
}

export type Category =
  | "Fun"
  | "Deep"
  | "Childhood"
  | "Dreams"
  | "Relationships"
  | "Random"
  | "Books"
  | "Music"
  | "Travel"
  | "Life"

export const questions: Question[] = [
  // Fun
  { text: "What always makes you smile?", category: "Fun" },
  { text: "What is your go-to karaoke song?", category: "Fun" },
  { text: "What is the worst movie you secretly love?", category: "Fun" },
  { text: "What food could you eat every day?", category: "Fun" },
  { text: "What is your hidden talent?", category: "Fun" },
  { text: "What is the most useless skill you have?", category: "Fun" },
  { text: "What is your favorite board game?", category: "Fun" },
  { text: "What is the best joke you have ever heard?", category: "Fun" },
  { text: "If you could be any animal, what would you be?", category: "Fun" },
  { text: "What is your favorite way to waste time?", category: "Fun" },
  { text: "What is the most embarrassing song on your playlist?", category: "Fun" },
  { text: "What is your favorite emoji and why?", category: "Fun" },
  { text: "What would your superpower be?", category: "Fun" },
  { text: "What is your favorite day of the week?", category: "Fun" },
  { text: "What is your go-to comfort movie?", category: "Fun" },

  // Deep
  { text: "What moment changed your life forever?", category: "Deep" },
  { text: "What are you most afraid of?", category: "Deep" },
  { text: "What does love feel like to you?", category: "Deep" },
  { text: "What do you think happens after we die?", category: "Deep" },
  { text: "What is something you have never told anyone?", category: "Deep" },
  { text: "What does your inner voice sound like?", category: "Deep" },
  { text: "When have you felt most alive?", category: "Deep" },
  { text: "What does happiness mean to you?", category: "Deep" },
  { text: "What is your biggest regret?", category: "Deep" },
  { text: "What do you think makes a person good?", category: "Deep" },
  { text: "What do you fear missing out on?", category: "Deep" },
  { text: "What does home feel like to you?", category: "Deep" },
  { text: "What is something you wish you understood better?", category: "Deep" },
  { text: "What do you think is the meaning of life?", category: "Deep" },
  { text: "When was the last time you truly cried?", category: "Deep" },

  // Childhood
  { text: "What was your favorite toy growing up?", category: "Childhood" },
  { text: "What did you want to be when you grew up?", category: "Childhood" },
  { text: "What is your fondest childhood memory?", category: "Childhood" },
  { text: "Who was your childhood hero?", category: "Childhood" },
  { text: "What was your favorite childhood show?", category: "Childhood" },
  { text: "What did your bedroom look like as a child?", category: "Childhood" },
  { text: "What food reminds you of being a kid?", category: "Childhood" },
  { text: "What was your favorite game to play outside?", category: "Childhood" },
  { text: "Who was your best friend as a child?", category: "Childhood" },
  { text: "What is a smell that takes you back to childhood?", category: "Childhood" },
  { text: "What was your favorite book as a kid?", category: "Childhood" },
  { text: "What is the best gift you ever received as a child?", category: "Childhood" },
  { text: "What did you fear most as a child?", category: "Childhood" },
  { text: "What was your favorite holiday tradition?", category: "Childhood" },
  { text: "What memory of your parents do you treasure most?", category: "Childhood" },

  // Dreams
  { text: "What is a dream you have given up on?", category: "Dreams" },
  { text: "If you had unlimited resources, what would you do?", category: "Dreams" },
  { text: "Where do you see yourself in ten years?", category: "Dreams" },
  { text: "What is something you still want to learn?", category: "Dreams" },
  { text: "What is your biggest ambition?", category: "Dreams" },
  { text: "What does your dream life look like?", category: "Dreams" },
  { text: "If you could change one thing about the world, what?", category: "Dreams" },
  { text: "What adventure do you still want to have?", category: "Dreams" },
  { text: "What skill would you learn if time were no object?", category: "Dreams" },
  { text: "What would you do if you knew you could not fail?", category: "Dreams" },
  { text: "What place have you always dreamed of visiting?", category: "Dreams" },
  { text: "What does success look like to you?", category: "Dreams" },
  { text: "What dream have you had recently?", category: "Dreams" },
  { text: "Who do you aspire to be more like?", category: "Dreams" },
  { text: "What would your perfect day look like?", category: "Dreams" },

  // Relationships
  { text: "What is the best relationship advice you have received?", category: "Relationships" },
  { text: "What do you value most in a friend?", category: "Relationships" },
  { text: "How do you know when you trust someone?", category: "Relationships" },
  { text: "What does quality time mean to you?", category: "Relationships" },
  { text: "What is your love language?", category: "Relationships" },
  { text: "What is the kindest thing someone has done for you?", category: "Relationships" },
  { text: "How do you show someone you care?", category: "Relationships" },
  { text: "What do you look for in a partner?", category: "Relationships" },
  { text: "What is the longest friendship you have had?", category: "Relationships" },
  { text: "What makes you feel appreciated?", category: "Relationships" },
  { text: "How do you handle conflict with loved ones?", category: "Relationships" },
  { text: "What is a memory with someone you cherish?", category: "Relationships" },
  { text: "What does a perfect date look like to you?", category: "Relationships" },
  { text: "What is something you want to tell someone but have not?", category: "Relationships" },
  { text: "When have you felt most connected to someone?", category: "Relationships" },

  // Random
  { text: "What is a hill you would die on?", category: "Random" },
  { text: "What is the most interesting fact you know?", category: "Random" },
  { text: "If you could instantly master any instrument, what?", category: "Random" },
  { text: "What is the best decision you have ever made?", category: "Random" },
  { text: "What is something you find overrated?", category: "Random" },
  { text: "What would you name your autobiography?", category: "Random" },
  { text: "What is your guilty pleasure?", category: "Random" },
  { text: "If you could have dinner with anyone living, who?", category: "Random" },
  { text: "What is the best advice you have ever ignored?", category: "Random" },
  { text: "What is a small thing that makes your day better?", category: "Random" },
  { text: "What is your most irrational fear?", category: "Random" },
  { text: "What is something you think is underrated?", category: "Random" },
  { text: "If you could time travel, where would you go?", category: "Random" },
  { text: "What is the best compliment you have ever received?", category: "Random" },
  { text: "What is something people get wrong about you?", category: "Random" },

  // Books
  { text: "What book changed how you see the world?", category: "Books" },
  { text: "Who is your favorite author?", category: "Books" },
  { text: "What book made you cry?", category: "Books" },
  { text: "If you could live inside any book, which?", category: "Books" },
  { text: "What is a book you reread often?", category: "Books" },
  { text: "What genre do you gravitate toward?", category: "Books" },
  { text: "What is your favorite quote from a book?", category: "Books" },
  { text: "What book did you hate but everyone loves?", category: "Books" },
  { text: "What character do you relate to most?", category: "Books" },
  { text: "What book are you currently reading?", category: "Books" },

  // Music
  { text: "If today had a soundtrack, what song would it be?", category: "Music" },
  { text: "What song always makes you emotional?", category: "Music" },
  { text: "Who is your all-time favorite artist?", category: "Music" },
  { text: "What album would you take to a desert island?", category: "Music" },
  { text: "What song reminds you of a specific memory?", category: "Music" },
  { text: "What music do you listen to when you need to think?", category: "Music" },
  { text: "What concert changed your life?", category: "Music" },
  { text: "What is your favorite lyric of all time?", category: "Music" },
  { text: "If you could learn any instrument instantly, what?", category: "Music" },
  { text: "What song defines your current mood?", category: "Music" },

  // Travel
  { text: "What place has always felt like home?", category: "Travel" },
  { text: "Where is the most beautiful place you have been?", category: "Travel" },
  { text: "What destination is at the top of your list?", category: "Travel" },
  { text: "What is your favorite travel memory?", category: "Travel" },
  { text: "Would you rather explore a city or nature?", category: "Travel" },
  { text: "What is something you always pack for a trip?", category: "Travel" },
  { text: "What is the best meal you have had while traveling?", category: "Travel" },
  { text: "What place surprised you the most?", category: "Travel" },
  { text: "If you could live anywhere, where would it be?", category: "Travel" },
  { text: "What does adventure mean to you?", category: "Travel" },

  // Life
  { text: "What little thing makes your day better?", category: "Life" },
  { text: "What habit has changed your life the most?", category: "Life" },
  { text: "What are you most grateful for today?", category: "Life" },
  { text: "What does your morning routine look like?", category: "Life" },
  { text: "What is something you wish you had learned earlier?", category: "Life" },
  { text: "What does a balanced life look like to you?", category: "Life" },
  { text: "What is something you want to be remembered for?", category: "Life" },
  { text: "When do you feel most yourself?", category: "Life" },
  { text: "What is the best life lesson you have learned?", category: "Life" },
  { text: "What are you looking forward to most right now?", category: "Life" },
]
