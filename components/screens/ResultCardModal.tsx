"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { getFeedbackMessage } from "@/lib/quiz";
import type { UserResult } from "@/types/quiz";

interface ResultCardModalProps {
  name: string;
  score: number;
  results: UserResult[];
  onClose: () => void;
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
  onClose,
}: ResultCardModalProps) {
  const [copied, setCopied] = useState(false);
  const feedbackMessage = getFeedbackMessage(score);

  const dotStatuses = useMemo(() => {
    const mapped = results.slice(0, TOTAL_QUESTIONS).map(getDotStatus);

    while (mapped.length < TOTAL_QUESTIONS) {
      mapped.push("timeout");
    }

    return mapped;
  }, [results]);

  async function handleShare() {
    if (typeof window === "undefined" || !navigator.clipboard) {
      return;
    }

    const textToCopy = `${name} - স্কোর: ${score}/১০ - ${feedbackMessage}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="flex min-h-[calc(100vh-10rem)] items-center justify-center bg-black/65 px-4 py-10">
      <div className="glass-modal w-full max-w-2xl p-8 text-center sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#EAB308]">
          ফলাফল
        </p>

        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{name}</h2>

        <p className="mt-4 text-5xl font-extrabold text-[#EAB308] sm:text-6xl">
          {score}/১০
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

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            type="button"
            onClick={handleShare}
            className="h-11 rounded-2xl bg-[#EAB308] px-6 font-semibold text-[#1a1200] hover:bg-[#facc15]"
          >
            {copied ? "কপি হয়েছে!" : "ফলাফল শেয়ার করুন"}
          </Button>

          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className="h-11 rounded-2xl border-[#EAB30866] bg-transparent px-6 text-[#fef3c7] hover:bg-[#EAB3081A]"
          >
            বন্ধ করুন
          </Button>
        </div>
      </div>
    </section>
  );
}