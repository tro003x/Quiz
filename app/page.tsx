"use client";

import { useEffect, useMemo, useState } from "react";
import questionsData from "@/data/questions.json";

import Footer from "@/components/layout/Footer";
import MarqueeBanner from "@/components/layout/MarqueeBanner";
import Navbar from "@/components/layout/Navbar";
import ExplanationScreen from "@/components/screens/ExplanationScreen";
import LoginScreen from "@/components/screens/LoginScreen";
import QuestionScreen from "@/components/screens/QuestionScreen";
import ResultCardModal from "@/components/screens/ResultCardModal";
import StartScreen from "@/components/screens/StartScreen";
import SessionHistoryModal from "@/components/screens/SessionHistoryModal";
import { checkAnswer, getStratifiedQuestions } from "@/lib/quiz"
import {
  getUnseenQuestions,
  getUser,
  getSessionHistory,
  markQuestionsSeen,
  saveName,
  saveSessionToHistory,
  logoutUser,
} from "@/lib/storage"
import { SESSION_SIZE } from "@/lib/constants"
import type { AppState, Question, UserResult, SessionRecord } from "@/types/quiz"

const APP_NAME = "ইসলামিক কুইজ"

const quizDescription =
  "কুরআন, হাদিস এবং ইসলামের মৌলিক জ্ঞানভিত্তিক প্রশ্নোত্তর কুইজ। প্রতিটি প্রশ্নে দ্রুত চিন্তা করুন এবং আপনার শেখা যাচাই করুন।";

const marqueeText = "ইলম অর্জন প্রতিটি মুসলিমের উপর ফরজ। আজকের কুইজে অংশ নিন, নিজেকে যাচাই করুন এবং নতুন কিছু শিখুন। ইতিহাস জানুন, নিজেকে যাচাই করুন। মুসলিমবঙ্গ কুইজে আপনাকে স্বাগতম। ইনশাআল্লাহ।";

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
  const [isClient, setIsClient] = useState(false);
  const [screen, setScreen] = useState<AppState>("login");
  const [userName, setUserName] = useState("");
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [timedOut, setTimedOut] = useState(false);
  const [sessionHistory, setSessionHistory] = useState<SessionRecord[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [viewingSession, setViewingSession] = useState<SessionRecord | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const currentQuestion = sessionQuestions[currentIndex];

  const upcomingQuestions = useMemo(
    () => sessionQuestions.slice(currentIndex + 1, currentIndex + 4),
    [currentIndex, sessionQuestions]
  );

  useEffect(() => {
    setIsClient(true);
    const session = getUser();

    if (session?.name && session.name.trim() !== "") {
      setUserName(session.name);
      setScreen("start");
      const history = getSessionHistory(session);
      setSessionHistory(history);
      return;
    }

    setUserName("");
    setScreen("start");
  }, []);

  function handleLogin(name: string) {
    if (!name || typeof name !== "string") return
    const trimmedName = name.trim()
    saveName(trimmedName)
    setUserName(trimmedName)
    setShowLoginModal(false)
    setScreen("start")
  }

  function handleLogout() {
    logoutUser()
    setUserName("")
    setScreen("start")
    setScore(0)
    setCurrentIndex(0)
    setResults([])
    setSessionQuestions([])
    setSessionHistory([])
    setTimedOut(false)
    setSelectedAnswer(null)
  }

  function handleStart() {
    const session = getUser() ?? { name: userName, seenQuestionIds: [] }
    const seenIds = session.seenQuestionIds
    const stratifiedQuestions = getStratifiedQuestions(questionBank, seenIds, SESSION_SIZE)


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
      const user = getUser() ?? { 
        name: userName, 
        seenQuestionIds: [],
        sessionHistory: []
      };
      const sessionIds = sessionQuestions.map((question) => question.id);
      
      markQuestionsSeen(sessionIds, user);
      
      
      const updatedUser = getUser() ?? user;
      saveSessionToHistory(results, score, updatedUser);
      
      
      const history = getSessionHistory(updatedUser);
      setSessionHistory(history);
      
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
    setViewingSession(null)
    const session = getUser() ?? { name: userName, seenQuestionIds: [] }
    const seenIds = session.seenQuestionIds
    const stratifiedQuestions = getStratifiedQuestions(
      questionBank, 
      seenIds, 
      SESSION_SIZE
    )
    
    setSessionQuestions(stratifiedQuestions)
    setCurrentIndex(0)
    setScore(0)
    setSelectedAnswer(null)
    setResults([])
    setTimedOut(false)
    setScreen("question")
  }

  function handleGoHome() {
    setViewingSession(null)
    setScreen("start")
  }

  const handleOpenHistory = () => {
    setShowHistoryModal(true);
  };

  const handleCloseHistory = () => {
    setShowHistoryModal(false);
  };

  const handleViewSession = (record: SessionRecord) => {
    setViewingSession(record);
    setShowHistoryModal(false);
    setResults(record.results as ResultItem[]);
    setScreen("explanation");
  };

 
  if (!isClient) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar 
        userName={userName}
        score={score}
        screen={screen}
        sessionCount={sessionHistory.length}
        onOpenHistory={handleOpenHistory}
        onLogin={() => setShowLoginModal(true)}
        onLogoClick={() => setScreen("start")}
        onLogout={handleLogout}
      />
      <MarqueeBanner text={marqueeText} />

      <main className="flex-1">
        {screen === "login" ? (
          <LoginScreen appName={APP_NAME} onLogin={handleLogin} />
        ) : null}

        {screen === "start" ? (
          <StartScreen
            userName={userName}
            onStart={handleStart}
            onLoginRequest={() => setShowLoginModal(true)}
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
            name={userName}
            score={score}
            results={results}
            onShowExplanation={handleCloseResult}
            onRestart={handleRestart}
          />
        ) : null}

        {screen === "explanation" ? (
          <ExplanationScreen
            results={viewingSession ? viewingSession.results : results}
            onRestart={handleRestart}
            onGoHome={handleGoHome}
          />
        ) : null}
      </main>

      {showHistoryModal && (
        <SessionHistoryModal
          history={sessionHistory}
          onClose={handleCloseHistory}
          onViewSession={handleViewSession}
        />
      )}

      <Footer name={userName} links={footerLinks} />

      {showLoginModal && (
        <div style={{ 
          position: "fixed", 
          inset: 0, 
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(8px)",
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          zIndex: 200 
        }}>
          <div style={{ position: "relative" }}>
            <button 
              onClick={() => setShowLoginModal(false)}
              style={{ 
                position: "absolute", 
                top: "-12px", 
                right: "-12px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "50%", 
                width: "32px", 
                height: "32px",
                color: "white", 
                cursor: "pointer", 
                fontSize: "16px",
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center"
              }}>
              ✕
            </button>
            <LoginScreen onLogin={handleLogin} appName={APP_NAME} />
          </div>
        </div>
      )}
    </div>
  );
}
