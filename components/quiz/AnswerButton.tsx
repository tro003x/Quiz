import { cn } from "@/lib/utils";

interface AnswerButtonProps {
  label: string;
  state: "idle" | "correct" | "wrong";
  onClick: () => void;
  disabled: boolean;
}

const stateStyles = {
  idle: "border border-transparent bg-[#1a1a2e] text-white hover:border-[#EAB308]",
  correct: "bg-green-600 text-white",
  wrong: "bg-red-600 text-white",
} satisfies Record<AnswerButtonProps["state"], string>;

export default function AnswerButton({
  label,
  state,
  onClick,
  disabled,
}: AnswerButtonProps) {
  const isIdle = state === "idle";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || !isIdle}
      className={cn(
        "w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors sm:text-base",
        stateStyles[state],
        !isIdle && "cursor-not-allowed",
        isIdle && "cursor-pointer"
      )}
    >
      {label}
    </button>
  );
}