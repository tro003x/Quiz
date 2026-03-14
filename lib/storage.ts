import type { Question, UserSession } from "@/types/quiz";

const STORAGE_KEY = "quiz_user";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function getUser(): UserSession | null {
  if (!canUseStorage()) {
    return null;
  }

  const rawSession = window.localStorage.getItem(STORAGE_KEY);

  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(rawSession) as UserSession;
  } catch {
    return null;
  }
}

export function saveUser(session: UserSession): void {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function saveName(name: string): void {
  if (!canUseStorage()) {
    return;
  }

  const currentSession = getUser();

  saveUser({
    name,
    seenQuestionIds: currentSession?.seenQuestionIds ?? [],
  });
}

export function getUnseenQuestions(
  all: Question[],
  session: UserSession
): Question[] {
  if (!canUseStorage()) {
    return all;
  }

  const seenIds = new Set(session.seenQuestionIds);

  return all.filter((question) => !seenIds.has(question.id));
}

export function markQuestionsSeen(
  ids: number[],
  session: UserSession
): UserSession {
  if (!canUseStorage()) {
    return session;
  }

  const seenQuestionIds = Array.from(
    new Set([...session.seenQuestionIds, ...ids])
  );

  const nextSession: UserSession = {
    ...session,
    seenQuestionIds: seenQuestionIds.length >= 200 ? [] : seenQuestionIds,
  };

  saveUser(nextSession);

  return nextSession;
}