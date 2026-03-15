"use client";

import { useEffect, useMemo, useState } from "react";
import questionsData from "@/data/questions.json";

import Footer from "@/components/layout/Footer";
import KalimaHeader from "@/components/layout/KalimaHeader";
import MarqueeBanner from "@/components/layout/MarqueeBanner";
import Navbar from "@/components/layout/Navbar";
import ExplanationScreen from "@/components/screens/ExplanationScreen";
import LoginScreen from "@/components/screens/LoginScreen";
import QuestionScreen from "@/components/screens/QuestionScreen";
import ResultCardModal from "@/components/screens/ResultCardModal";
import StartScreen from "@/components/screens/StartScreen";
import { checkAnswer, getStratifiedQuestions } from "@/lib/quiz"
import {
  getUnseenQuestions,
  getUser,
  markQuestionsSeen,
  saveName,
} from "@/lib/storage"
import { SESSION_SIZE } from "@/lib/constants"
import type { AppState, Question, UserResult } from "@/types/quiz"

const APP_NAME = "ইসলামিক কুইজ"

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

const questionBank = questionsData as Question[];

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
    const session = getUser() ?? { name: userName, seenQuestionIds: [] }
    const seenIds = session.seenQuestionIds
    const stratifiedQuestions = getStratifiedQuestions(questionBank, seenIds, SESSION_SIZE)
    
    console.log("🔍 Stratified questions selected:", stratifiedQuestions.map(q => ({ id: q.id, category: q.category })))
    console.log("📊 Question IDs after shuffle:", stratifiedQuestions.map(q => q.id))

    setSessionQuestions(stratifiedQuestions)
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
      
      console.log("✅ Marking questions as seen:", seenIds)
      console.log("📋 Total questions to mark:", seenIds.length)
      
      markQuestionsSeen(seenIds, session);
      
      console.log("💾 Session saved, fetching updated user...")
      const updatedSession = getUser()
      console.log("📌 Updated seenQuestionIds in storage:", updatedSession?.seenQuestionIds)
      
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
            totalQuestions={SESSION_SIZE}
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
