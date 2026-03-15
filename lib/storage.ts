import type { Question, UserSession } from "@/types/quiz"
import { SESSION_SIZE, RESET_THRESHOLD } from "./constants"

const STORAGE_KEY = "quiz_user"

function canUseStorage() {
  return typeof window !== "undefined"
}

export function getUser(): UserSession | null {
  if (!canUseStorage()) {
    return null
  }

  const rawSession = window.localStorage.getItem(STORAGE_KEY)

  if (!rawSession) {
    return null
  }

  try {
    return JSON.parse(rawSession) as UserSession
  } catch {
    return null
  }
}

export function saveUser(session: UserSession): void {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export function saveName(name: string): void {
  if (!canUseStorage()) {
    return
  }

  const currentSession = getUser()

  saveUser({
    name,
    seenQuestionIds: currentSession?.seenQuestionIds ?? [],
  })
}

export function getUnseenQuestions(
  all: Question[],
  session: UserSession
): Question[] {
  if (!canUseStorage()) {
    return all
  }

  const unseenIds = all.filter(q => !session.seenQuestionIds.includes(q.id))

  // If unseen count is less than SESSION_SIZE, reset cycle
  return unseenIds.length >= SESSION_SIZE ? unseenIds : all
}

export function markQuestionsSeen(
  ids: number[],
  session: UserSession
): UserSession {
  if (!canUseStorage()) {
    return session
  }

  console.log("🔖 Marking seen IDs:", ids)
  console.log("📌 Current seenQuestionIds before:", session.seenQuestionIds)

  const seenQuestionIds = Array.from(
    new Set([...session.seenQuestionIds, ...ids])
  )

  console.log("📊 Total unique seen after merge:", seenQuestionIds.length, "IDs:", seenQuestionIds)

  const nextSession: UserSession = {
    ...session,
    seenQuestionIds: seenQuestionIds.length >= RESET_THRESHOLD ? [] : seenQuestionIds,
  }

  console.log("♻️  Reset cycle triggered?", seenQuestionIds.length >= RESET_THRESHOLD)

  saveUser(nextSession)

  console.log("💾 Saved to localStorage, updated seenQuestionIds:", nextSession.seenQuestionIds)

  return nextSession
}