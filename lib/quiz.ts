import type { Question } from "@/types/quiz"
import { SESSION_SIZE } from "./constants"

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function groupByCategory(questions: Question[]): Record<string, Question[]> {
  return questions.reduce((acc, q) => {
    const normalizedCategory = q.category.trim()
    if (!acc[normalizedCategory]) acc[normalizedCategory] = []
    acc[normalizedCategory].push(q)
    return acc
  }, {} as Record<string, Question[]>)
}

export function getStratifiedQuestions(
  allQuestions: Question[],
  seenIds: number[],
  sessionSize: number = SESSION_SIZE
): Question[] {
  // Step 1: Filter out already seen questions
  const unseen = allQuestions.filter(q => !seenIds.includes(q.id))

  // Step 2: If unseen questions are less than sessionSize,
  // reset and use all questions (full cycle completed)
  const pool = unseen.length >= sessionSize ? unseen : allQuestions

  console.log("🎯 Unseen questions available:", unseen.length)
  console.log("📚 Question pool size:", pool.length)
  console.log("🔄 Reset cycle?", unseen.length < sessionSize)

  // Step 3: Group pool by category
  const grouped = groupByCategory(pool)
  const categories = Object.keys(grouped)

  console.log("📂 Unique categories found:", categories)
  console.log("📊 Distribution by category:", Object.entries(grouped).map(([cat, qs]) => `${cat}: ${qs.length}`))

  const selected: Question[] = []
  const selectedIds = new Set<number>()

  // Step 4: Phase 1 — pick 1 guaranteed from each category
  for (const category of categories) {
    const categoryQuestions = pool.filter(q => q.category.trim() === category)
    const shuffled = shuffleArray(categoryQuestions)
    const pick = shuffled.find(q => !selectedIds.has(q.id))
    if (pick) {
      selected.push(pick)
      selectedIds.add(pick.id)
    }
  }

  console.log("✅ Phase 1 (guaranteed per category):", selected.map(q => q.id))

  // Step 5: Phase 2 — fill remaining slots randomly from entire pool
  const remaining = pool.filter(q => !selectedIds.has(q.id))
  const shuffledRemaining = shuffleArray(remaining)
  const needed = sessionSize - selected.length

  for (let i = 0; i < needed && i < shuffledRemaining.length; i++) {
    selected.push(shuffledRemaining[i])
    selectedIds.add(shuffledRemaining[i].id)
  }

  console.log("🎲 Phase 2 (random fill) added:", shuffledRemaining.slice(0, needed).map(q => q.id))

  // Step 6: Final shuffle so guaranteed picks aren't always first
  const final = shuffleArray(selected)
  console.log("🔀 Final shuffled order:", final.map(q => q.id))
  return final
}

export function getRandomQuestions(
  questions: Question[],
  count: number
): Question[] {
  const shuffledQuestions = [...questions]

  for (let currentIndex = shuffledQuestions.length - 1; currentIndex > 0; currentIndex -= 1) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1))

    ;[shuffledQuestions[currentIndex], shuffledQuestions[randomIndex]] = [
      shuffledQuestions[randomIndex],
      shuffledQuestions[currentIndex],
    ]
  }

  return shuffledQuestions.slice(0, count)
}

export function checkAnswer(selected: number, correct: number): boolean {
  return selected === correct
}

export function getButtonState(
  index: number,
  selectedIndex: number | null,
  correctIndex: number,
  isFeedback: boolean
): "idle" | "correct" | "wrong" {
  if (!isFeedback) {
    return "idle"
  }

  if (index === correctIndex) {
    return "correct"
  }

  if (selectedIndex === index && selectedIndex !== correctIndex) {
    return "wrong"
  }

  return "idle"
}

export function getFeedbackMessage(score: number): string {
  if (score === 15) {
    return "মাশাআল্লাহ! পরিপূর্ণ নম্বর 🌟"
  }

  if (score >= 12) {
    return "মাশাআল্লাহ, আল্লাহ আপনার ইলমে বারাকাহ দিক"
  }

  if (score >= 8) {
    return "ভালো করেছেন, আরও পড়ুন"
  }

  return "আপনার আরো অনেককিছু জানা বাকি"
}