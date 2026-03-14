"use client";

import { Button } from "@/components/ui/button";
import AnswerButton from "@/components/quiz/AnswerButton";
import ProgressIndicator from "@/components/quiz/ProgressIndicator";
import QuestionCard from "@/components/quiz/QuestionCard";
import TimerBar from "@/components/quiz/TimerBar";
import UpcomingPanel from "@/components/quiz/UpcomingPanel";
import { getButtonState } from "@/lib/quiz";
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
                isActive={!hasFeedback}
                onTimeout={onTimeout}
              />

              <h2 className="text-2xl font-bold leading-10 text-white sm:text-3xl">
                {question.question}
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
                <Button
                  type="button"
                  size="lg"
                  onClick={onNext}
                  className="h-12 rounded-2xl bg-[#EAB308] px-6 font-semibold text-[#1a1200] hover:bg-[#facc15]"
                >
                  পরবর্তী প্রশ্ন
                </Button>
              ) : null}
            </div>
          </QuestionCard>
        </div>

        <div className="hidden md:col-span-4 md:grid md:grid-rows-11">
          <div className="row-span-3" />
          <div className="row-span-5 flex items-center justify-end">
            <UpcomingPanel upcomingQuestions={upcomingQuestions} />
          </div>
          <div className="row-span-3" />
        </div>
      </div>
    </section>
  );
}