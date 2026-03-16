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

  // Step 1: Filter unseen, fallback to all if cycle complete
  const unseen = allQuestions.filter(q => !seenIds.includes(q.id))
  const pool = unseen.length >= sessionSize ? unseen : [...allQuestions]

  // Step 2: Group by category
  const grouped: Record<string, Question[]> = {}
  for (const q of pool) {
    const cat = q.category.trim()
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(q)
  }

  // Step 3: Shuffle questions within each category
  for (const cat in grouped) {
    grouped[cat] = shuffleArray(grouped[cat])
  }

  const selected: Question[] = []
  const selectedIds = new Set<number>()

  // Step 4: Phase 1 — pick 1 from each category
  // BUT stop if we already hit sessionSize
  const categories = Object.keys(grouped)
  for (const cat of categories) {
    if (selected.length >= sessionSize) break
    const pick = grouped[cat].find(q => !selectedIds.has(q.id))
    if (pick) {
      selected.push(pick)
      selectedIds.add(pick.id)
    }
  }

  // Step 5: Phase 2 — fill remaining slots if Phase 1 
  // didn't reach sessionSize (fewer categories than sessionSize)
  const needed = sessionSize - selected.length
  if (needed > 0) {
    const remaining = shuffleArray(
      pool.filter(q => !selectedIds.has(q.id))
    )
    for (let i = 0; i < needed && i < remaining.length; i++) {
      selected.push(remaining[i])
      selectedIds.add(remaining[i].id)
    }
  }

  // Step 6: Final shuffle and hard slice to guarantee exact count
  const final = shuffleArray(selected).slice(0, sessionSize)

  console.log("✅ Final session size:", final.length)
  console.log("📂 Categories in session:", [...new Set(final.map(q => q.category))])

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

export type ExplanationPart = {
  type: "text" | "bold";
  content: string;
};

export function renderExplanation(text: string): ExplanationPart[] {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts
    .filter((part) => part.length > 0)
    .map((part) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return {
          type: "bold" as const,
          content: part.slice(2, -2),
        };
      }
      return {
        type: "text" as const,
        content: part,
      };
    });
}