"use client";

import { useEffect, useMemo, useState } from "react";

import Footer from "@/components/layout/Footer";
import KalimaHeader from "@/components/layout/KalimaHeader";
import MarqueeBanner from "@/components/layout/MarqueeBanner";
import Navbar from "@/components/layout/Navbar";
import ExplanationScreen from "@/components/screens/ExplanationScreen";
import LoginScreen from "@/components/screens/LoginScreen";
import QuestionScreen from "@/components/screens/QuestionScreen";
import ResultCardModal from "@/components/screens/ResultCardModal";
import StartScreen from "@/components/screens/StartScreen";
import { checkAnswer, getRandomQuestions } from "@/lib/quiz";
import {
  getUnseenQuestions,
  getUser,
  markQuestionsSeen,
  saveName,
} from "@/lib/storage";
import type { AppState, Question, UserResult } from "@/types/quiz";

const APP_NAME = "ইসলামিক কুইজ";
const TOTAL_QUESTIONS = 10;

const quizDescription =
  "কুরআন, হাদিস এবং ইসলামের মৌলিক জ্ঞানভিত্তিক প্রশ্নোত্তর কুইজ। প্রতিটি প্রশ্নে দ্রুত চিন্তা করুন এবং আপনার শেখা যাচাই করুন।";

const marqueeText =
  "ইলম অর্জন প্রতিটি মুসলিমের উপর ফরজ। আজকের কুইজে অংশ নিন, নিজেকে যাচাই করুন এবং নতুন কিছু শিখুন ইনশাআল্লাহ।";

const footerLinks = [
  { platform: "github", href: "https://github.com" },
  { platform: "facebook", href: "https://facebook.com" },
  { platform: "twitter/x", href: "https://x.com" },
  { platform: "linkedin", href: "https://linkedin.com" },
  { platform: "email", href: "mailto:you@example.com" },
];

const questionBank: Question[] = [
  {
    id: 1,
    question: "ইসলামের প্রথম স্তম্ভ কোনটি?",
    options: ["সালাত", "জাকাত", "শাহাদাহ", "সাওম"],
    correctIndex: 2,
    explanation: "ইসলামের প্রথম স্তম্ভ হলো শাহাদাহ।",
    category: "Aqidah",
    difficulty: "easy",
  },
  {
    id: 2,
    question: "পাঁচ ওয়াক্ত নামাজের মধ্যে দিনের প্রথম নামাজ কোনটি?",
    options: ["যোহর", "ফজর", "আসর", "মাগরিব"],
    correctIndex: 1,
    explanation: "ফজর হলো দিনের প্রথম ফরজ নামাজ।",
    category: "Salah",
    difficulty: "easy",
  },
  {
    id: 3,
    question: "রমজান মাসে রোজা রাখা ইসলামের কত নম্বর স্তম্ভ?",
    options: ["দ্বিতীয়", "তৃতীয়", "চতুর্থ", "পঞ্চম"],
    correctIndex: 2,
    explanation: "সাওম বা রোজা ইসলামের চতুর্থ স্তম্ভ।",
    category: "Sawm",
    difficulty: "medium",
  },
  {
    id: 4,
    question: "কুরআন নাযিলের রাতকে কী বলা হয়?",
    options: ["লাইলাতুল বরাত", "লাইলাতুল কদর", "জুমার রাত", "আরাফার রাত"],
    correctIndex: 1,
    explanation: "লাইলাতুল কদর হলো কুরআন নাযিলের মহিমান্বিত রাত।",
    category: "Quran",
    difficulty: "easy",
  },
  {
    id: 5,
    question: "যাকাত সাধারণত সম্পদের কত অংশ?",
    options: ["১%", "২.৫%", "৫%", "১০%"],
    correctIndex: 1,
    explanation: "নিসাব পরিমাণ সম্পদের উপর যাকাত ২.৫%।",
    category: "Zakat",
    difficulty: "medium",
  },
  {
    id: 6,
    question: "রাসূলুল্লাহ ﷺ এর জন্মস্থান কোন শহর?",
    options: ["মদিনা", "তায়েফ", "মক্কা", "জেদ্দা"],
    correctIndex: 2,
    explanation: "রাসূলুল্লাহ ﷺ মক্কা নগরীতে জন্মগ্রহণ করেন।",
    category: "Seerah",
    difficulty: "easy",
  },
  {
    id: 7,
    question: "ইসলামে কোন মাসকে পবিত্র মাসগুলোর একটি বলা হয়?",
    options: ["রজব", "শাবান", "রবিউল আউয়াল", "সফর"],
    correctIndex: 0,
    explanation: "রজব চারটি পবিত্র মাসের একটি।",
    category: "Islamic Months",
    difficulty: "medium",
  },
  {
    id: 8,
    question: "হজ ইসলামের কত নম্বর স্তম্ভ?",
    options: ["তৃতীয়", "চতুর্থ", "পঞ্চম", "প্রথম"],
    correctIndex: 2,
    explanation: "সামর্থ্যবানদের জন্য হজ ইসলামের পঞ্চম স্তম্ভ।",
    category: "Hajj",
    difficulty: "easy",
  },
  {
    id: 9,
    question: "কোন সূরাকে কুরআনের হৃদয় বলা হয়?",
    options: ["সূরা বাকারা", "সূরা ইয়াসিন", "সূরা রহমান", "সূরা মুলক"],
    correctIndex: 1,
    explanation: "হাদিসে সূরা ইয়াসিনকে কুরআনের হৃদয় বলা হয়েছে।",
    category: "Quran",
    difficulty: "hard",
  },
  {
    id: 10,
    question: "আজানের জবাব দেওয়া সম্পর্কে ইসলামের নির্দেশ কী?",
    options: ["নিষিদ্ধ", "মাকরূহ", "সুন্নাহ", "ফরজ"],
    correctIndex: 2,
    explanation: "আজানের জবাব দেওয়া সুন্নাহ।",
    category: "Sunnah",
    difficulty: "medium",
  },
  {
    id: 11,
    question: "কুরআনের সর্ববৃহৎ সূরা কোনটি?",
    options: ["সূরা ফাতিহা", "সূরা বাকারাহ", "সূরা নিসা", "সূরা কাহফ"],
    correctIndex: 1,
    explanation: "সূরা বাকারাহ কুরআনের দীর্ঘতম সূরা।",
    category: "Quran",
    difficulty: "easy",
  },
  {
    id: 12,
    question: "ইসলামে উত্তম চরিত্রকে কী নামে অভিহিত করা হয়?",
    options: ["ইখলাস", "আখলাক", "ইহসান", "তাওবা"],
    correctIndex: 1,
    explanation: "আখলাক অর্থ উত্তম চরিত্র ও ব্যবহার।",
    category: "Akhlaq",
    difficulty: "medium",
  },
];

type ResultItem = UserResult & {
  options: [string, string, string, string];
};

export default function Home() {
  const [screen, setScreen] = useState<AppState>("login");
  const [userName, setUserName] = useState("");
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [timedOut, setTimedOut] = useState(false);

  const currentQuestion = sessionQuestions[currentIndex];

  const upcomingQuestions = useMemo(
    () => sessionQuestions.slice(currentIndex + 1, currentIndex + 4),
    [currentIndex, sessionQuestions]
  );

  useEffect(() => {
    const session = getUser();

    if (session?.name) {
      setUserName(session.name);
      setScreen("start");
      return;
    }

    setScreen("login");
  }, []);

  function handleLogin(name: string) {
    saveName(name);
    setUserName(name);
    setScreen("start");
  }

  function handleStart() {
    const session = getUser() ?? { name: userName, seenQuestionIds: [] };
    const unseenQuestions = getUnseenQuestions(questionBank, session);
    const sourceQuestions = unseenQuestions.length >= TOTAL_QUESTIONS ? unseenQuestions : questionBank;
    const randomQuestions = getRandomQuestions(sourceQuestions, TOTAL_QUESTIONS);

    setSessionQuestions(randomQuestions);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setResults([]);
    setTimedOut(false);
    setScreen("question");
  }

  function handleAnswer(index: number) {
    if (!currentQuestion || selectedAnswer !== null || timedOut) {
      return;
    }

    const isCorrect = checkAnswer(index, currentQuestion.correctIndex);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setSelectedAnswer(index);

    const result: ResultItem = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      selectedIndex: index,
      correctIndex: currentQuestion.correctIndex,
      isCorrect,
      timedOut: false,
      explanation: currentQuestion.explanation,
      options: currentQuestion.options,
    };

    setResults((prev) => [...prev, result]);
  }

  function handleTimeout() {
    if (!currentQuestion || selectedAnswer !== null || timedOut) {
      return;
    }

    setTimedOut(true);
    setScore((prev) => Math.max(0, prev - 1));

    const result: ResultItem = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      selectedIndex: null,
      correctIndex: currentQuestion.correctIndex,
      isCorrect: false,
      timedOut: true,
      explanation: currentQuestion.explanation,
      options: currentQuestion.options,
    };

    setResults((prev) => [...prev, result]);
  }

  function handleNext() {
    const isLastQuestion = currentIndex >= sessionQuestions.length - 1;

    if (isLastQuestion) {
      const session = getUser() ?? { name: userName, seenQuestionIds: [] };
      const seenIds = sessionQuestions.map((question) => question.id);
      markQuestionsSeen(seenIds, session);
      setScreen("result");
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setTimedOut(false);
  }

  function handleCloseResult() {
    setScreen("explanation");
  }

  function handleRestart() {
    setScreen("start");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <KalimaHeader />
      <Navbar appName={APP_NAME} userName={userName || "অতিথি"} score={score} />
      <MarqueeBanner text={marqueeText} />

      <main className="flex-1">
        {screen === "login" ? (
          <LoginScreen appName={APP_NAME} onLogin={handleLogin} />
        ) : null}

        {screen === "start" ? (
          <StartScreen
            name={userName || "বন্ধু"}
            description={quizDescription}
            onStart={handleStart}
          />
        ) : null}

        {screen === "question" && currentQuestion ? (
          <QuestionScreen
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={TOTAL_QUESTIONS}
            selectedAnswer={selectedAnswer}
            isFeedback={selectedAnswer !== null}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onTimeout={handleTimeout}
            upcomingQuestions={upcomingQuestions}
            timedOut={timedOut}
          />
        ) : null}

        {screen === "result" ? (
          <ResultCardModal
            name={userName || "অতিথি"}
            score={score}
            results={results}
            onClose={handleCloseResult}
          />
        ) : null}

        {screen === "explanation" ? (
          <ExplanationScreen results={results} onRestart={handleRestart} />
        ) : null}
      </main>

      <Footer name={userName || "আপনার নাম"} links={footerLinks} />
    </div>
  );
}
