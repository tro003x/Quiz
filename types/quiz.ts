export type AppState =
  | "login"
  | "start"
  | "question"
  | "result"
  | "explanation";

export interface Question {
  id: number;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface UserResult {
  questionId: number;
  question: string;
  selectedIndex: number | null;
  correctIndex: number;
  isCorrect: boolean;
  timedOut: boolean;
  explanation: string;
  options: [string, string, string, string];
}

export interface UserSession {
  name: string;
  seenQuestionIds: number[];
}