import { cn, convertToBengaliDigits } from "@/lib/utils";

interface AnswerButtonProps {
  label: string;
  state: "idle" | "selected";
  onClick: () => void;
  disabled: boolean;
}

const stateStyles = {
  idle: "glass-btn",
  selected: "glass-btn glass-btn-selected",
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
        "w-full px-4 py-3 text-left text-sm font-medium sm:text-base",
        stateStyles[state],
        !isIdle && "cursor-not-allowed",
        isIdle && "cursor-pointer"
      )}
    >
      {convertToBengaliDigits(label)}
    </button>
  );
}