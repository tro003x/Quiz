import type { CSSProperties } from "react";

import type { Question } from "@/types/quiz";

interface UpcomingPanelProps {
  upcomingQuestions: Question[];
}

const previewOpacities = [0.7, 0.45, 0.2];

function getPreviewText(text: string) {
  return `${text.slice(0, 50)}...`;
}

export default function UpcomingPanel({
  upcomingQuestions,
}: UpcomingPanelProps) {
  const previewQuestions = upcomingQuestions.slice(0, 3);

  return (
    <aside
      aria-hidden="true"
      className="w-full max-w-[20rem] shrink-0"
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
            className="rounded-2xl border border-white/10 bg-[#11162b] p-4 text-white"
            style={{ opacity: previewOpacities[index] ?? 0.2 } as CSSProperties}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EAB308]">
              প্রশ্ন {index + 2}
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