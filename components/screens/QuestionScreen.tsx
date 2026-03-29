"use client";

import { Button } from "@/components/ui/button";
import AnswerButton from "@/components/quiz/AnswerButton";
import ProgressIndicator from "@/components/quiz/ProgressIndicator";
import QuestionCard from "@/components/quiz/QuestionCard";
import TimerBar from "@/components/quiz/TimerBar";
import UpcomingPanel from "@/components/quiz/UpcomingPanel";
import { getButtonState } from "@/lib/quiz";
import { convertToBengaliDigits } from "@/lib/utils";
import { X } from "lucide-react";
import type { Question } from "@/types/quiz";

interface QuestionScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  isFeedback: boolean;
  onAnswer: (selectedIndex: number) => void;
  onNext: () => void;
  onTimeout: () => void;
  upcomingQuestions: Question[];
  timedOut: boolean;
  onQuitQuiz: () => void;
}

export default function QuestionScreen({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  isFeedback,
  onAnswer,
  onNext,
  onTimeout,
  upcomingQuestions,
  timedOut,
  onQuitQuiz,
}: QuestionScreenProps) {
  const hasFeedback = isFeedback || timedOut;

  return (
    <section className="min-h-[calc(100vh-10rem)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-12">
        <div className="hidden md:col-span-3 md:block" />

        <div className="md:col-span-5">
          <QuestionCard>
            <div className="space-y-6">
              <ProgressIndicator
                questionNumber={questionNumber}
                totalQuestions={totalQuestions}
              />

          <TimerBar
                key={question.id}
                duration={10}
                isActive={selectedAnswer === null && !timedOut}
                onTimeout={onTimeout}
              />

              <h2 className="text-2xl font-bold leading-10 text-white sm:text-3xl">
                {convertToBengaliDigits(question.question)}
              </h2>

              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <AnswerButton
                    key={`${question.id}-${index}`}
                    label={option}
                    state={getButtonState(
                      index,
                      selectedAnswer,
                      question.correctIndex,
                      hasFeedback
                    )}
                    onClick={() => onAnswer(index)}
                    disabled={hasFeedback}
                  />
                ))}
              </div>

              {hasFeedback ? (
                <div style={{ display: "flex", justifyContent: questionNumber === totalQuestions ? "center" : "right" }}>
                  <Button
                    type="button"
                    size="lg"
                    onClick={onNext}
                    className="h-12 rounded-2xl bg-[#EAB308] px-6 font-semibold text-[#1a1200] hover:bg-[#facc15]"
                  >
                    {questionNumber === totalQuestions ? "জমা দিন" : "পরবর্তী প্রশ্ন"}
                  </Button>
                </div>
              ) : null}
            </div>
          </QuestionCard>

        <div style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "16px",
        }}>
          <button
            onClick={onQuitQuiz}
            style={{
              background: "transparent",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "100px",
              padding: "8px 24px",
              color: "rgba(239,68,68,0.7)",
              fontSize: "13px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(239,68,68,0.6)";
              e.currentTarget.style.color = "#ef4444";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
              e.currentTarget.style.color = "rgba(239,68,68,0.7)";
            }}
          >
            <X size={14} />
            কুইজ বাদ দিন
          </button>
        </div>
        </div>

        <div className="hidden md:col-span-4 md:grid md:grid-rows-11">
          <div className="row-span-3" />
          <div className="row-span-5 flex items-center justify-end">
            <UpcomingPanel upcomingQuestions={upcomingQuestions} currentQuestionNumber={questionNumber} />
          </div>
          <div className="row-span-3" />
        </div>
      </div>
    </section>
  );
}