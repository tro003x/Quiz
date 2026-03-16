import type { ReactNode } from "react";

interface QuestionCardProps {
  children: ReactNode;
}

export default function QuestionCard({ children }: QuestionCardProps) {
  return (
    <div className="glass-card w-full p-6 sm:p-8">
      {children}
    </div>
  );
}