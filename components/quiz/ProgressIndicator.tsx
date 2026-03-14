interface ProgressIndicatorProps {
  questionNumber: number;
  totalQuestions: number;
}

export default function ProgressIndicator({
  questionNumber,
  totalQuestions,
}: ProgressIndicatorProps) {
  return (
    <p className="text-sm font-semibold tracking-[0.2em] text-[#EAB308]">
      প্রশ্ন {questionNumber}/{totalQuestions}
    </p>
  );
}