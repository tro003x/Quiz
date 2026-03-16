import type { Question, UserSession, UserResult, SessionRecord } from "@/types/quiz"
import { SESSION_SIZE, RESET_THRESHOLD } from "./constants"

const STORAGE_KEY = "quiz_user"

// Re-export SessionRecord for convenience
export type { SessionRecord }

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
    sessionHistory: currentSession?.sessionHistory ?? [],
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

export function saveSessionToHistory(
  results: UserResult[],
  score: number,
  session: UserSession
): void {
  if (typeof window === "undefined") return

  const history = session.sessionHistory ?? []
  const newRecord: SessionRecord = {
    sessionNumber: history.length + 1,
    date: new Date().toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    score,
    total: results.length,
    results,
  }

  const updated: UserSession = {
    ...session,
    sessionHistory: [...history, newRecord],
  }

  saveUser(updated)
}

export function getSessionHistory(session: UserSession): SessionRecord[] {
  return session.sessionHistory ?? []
}