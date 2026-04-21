"use client";

import { useMemo } from "react";
import { Home } from "lucide-react";
import { BnDigit } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { getFeedbackMessage } from "@/lib/quiz";
import type { UserResult } from "@/types/quiz";

interface ResultCardModalProps {
  name: string;
  score: number;
  results: UserResult[];
  onShowExplanation: () => void;
  onRestart: () => void;
  onGoHome: () => void;
}

const TOTAL_QUESTIONS = 10;

type DotStatus = "correct" | "wrong" | "timeout";

function getDotStatus(result: UserResult): DotStatus {
  if (result.timedOut) {
    return "timeout";
  }

  return result.isCorrect ? "correct" : "wrong";
}

export default function ResultCardModal({
  name,
  score,
  results,
  onShowExplanation,
  onRestart,
  onGoHome,
}: ResultCardModalProps) {
  const feedbackMessage = getFeedbackMessage(score);

  const dotStatuses = useMemo(() => {
    const mapped = results.slice(0, TOTAL_QUESTIONS).map(getDotStatus);

    while (mapped.length < TOTAL_QUESTIONS) {
      mapped.push("timeout");
    }

    return mapped;
  }, [results]);

  return (
    <section className="flex min-h-[calc(100vh-10rem)] items-center justify-center bg-black/65 px-4 py-10">
      <div className="glass-modal w-full max-w-2xl p-8 text-center sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#EAB308]">
          ফলাফল
        </p>

        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{name}</h2>

        <p className="mt-4 text-5xl font-extrabold text-[#EAB308] sm:text-6xl">
          <BnDigit n={score} />/<BnDigit n={10} />
        </p>

        <p className="mt-5 text-base leading-7 text-[#fef3c7]">{feedbackMessage}</p>

        <div className="mt-7 flex items-center justify-center gap-2">
          {dotStatuses.map((status, index) => (
            <span
              key={`${status}-${index}`}
              aria-hidden="true"
              className={`h-3.5 w-3.5 rounded-full ${
                status === "correct"
                  ? "bg-green-500"
                  : status === "wrong"
                    ? "bg-red-500"
                    : "bg-gray-500"
              }`}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 w-full">
          <Button
            type="button"
            onClick={onShowExplanation}
            className="w-full h-14 rounded-xl bg-[#16a34a] px-6 py-3 text-base font-semibold text-white hover:bg-[#15803d]"
          >
            উত্তর দেখুন
          </Button>

          <button
            type="button"
            onClick={onRestart}
            className="w-full h-14 rounded-xl bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.15)] px-6 py-3 text-base font-semibold text-white hover:bg-[rgba(255,255,255,0.1)]"
          >
            নতুন সেশন
          </button>

          <button
            type="button"
            onClick={onGoHome}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "100px",
              padding: "8px 20px",
              color: "rgba(255,255,255,0.7)",
              fontSize: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.2s ease",
              margin: "0 auto",
              width: "auto"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
              e.currentTarget.style.color = "rgba(255,255,255,0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
            }}
          >
            <Home size={18} />
            ফিরে যান
          </button>
        </div>
      </div>
    </section>
  );
}