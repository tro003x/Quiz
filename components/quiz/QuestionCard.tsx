import type { ReactNode } from "react";

interface QuestionCardProps {
  children: ReactNode;
}

export default function QuestionCard({ children }: QuestionCardProps) {
  return (
    <div className="w-full rounded-[2rem] border border-[#EAB30833] bg-[#0f0c29]/88 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:p-8">
      {children}
    </div>
  );
}