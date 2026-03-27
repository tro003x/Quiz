import type { CSSProperties } from "react";

import { BnDigit } from "@/lib/utils";
import type { Question } from "@/types/quiz";

interface UpcomingPanelProps {
  upcomingQuestions: Question[];
  currentQuestionNumber: number;
}

const previewOpacities = [0.7, 0.45, 0.2];

function getPreviewText(text: string) {
  return `${text.slice(0, 50)}...`;
}

export default function UpcomingPanel({
  upcomingQuestions,
  currentQuestionNumber,
}: UpcomingPanelProps) {
  const previewQuestions = upcomingQuestions.slice(0, 3);

  return (
    <aside
      aria-hidden="true"
      className="glass-card w-full max-w-[20rem] shrink-0 p-0"
      style={{
        maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 50%, transparent 100%)",
      }}
    >
      <div className="space-y-3">
        {previewQuestions.map((question, index) => (
          <div
            key={question.id}
            className="rounded-[10px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-4 text-white"
            style={{ opacity: previewOpacities[index] ?? 0.2 } as CSSProperties}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EAB308]">
              প্রশ্ন <BnDigit n={currentQuestionNumber + index + 1} />
            </p>
            <p className="mt-2 text-sm leading-6 text-white/90">
              {getPreviewText(question.question)}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
}