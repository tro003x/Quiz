import type { Question } from "@/types/quiz";

export function getRandomQuestions(
  questions: Question[],
  count: number
): Question[] {
  const shuffledQuestions = [...questions];

  for (let currentIndex = shuffledQuestions.length - 1; currentIndex > 0; currentIndex -= 1) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));

    [shuffledQuestions[currentIndex], shuffledQuestions[randomIndex]] = [
      shuffledQuestions[randomIndex],
      shuffledQuestions[currentIndex],
    ];
  }

  return shuffledQuestions.slice(0, count);
}

export function checkAnswer(selected: number, correct: number): boolean {
  return selected === correct;
}

export function getButtonState(
  index: number,
  selectedIndex: number | null,
  correctIndex: number,
  isFeedback: boolean
): "idle" | "correct" | "wrong" {
  if (!isFeedback) {
    return "idle";
  }

  if (index === correctIndex) {
    return "correct";
  }

  if (selectedIndex === index && selectedIndex !== correctIndex) {
    return "wrong";
  }

  return "idle";
}

export function getFeedbackMessage(score: number): string {
  if (score === 10) {
    return "মাশাআল্লাহ! পরিপূর্ণ নম্বর";
  }

  if (score >= 8) {
    return "মাশাআল্লাহ, আল্লাহ আপনার ইলমে বারাকাহ দিক";
  }

  if (score >= 5) {
    return "ভালো করেছেন, আরও পড়ুন";
  }

  return "আপনার আরো অনেককিছু জানা বাকি";
}