"use client";

import { useEffect, useState } from "react";

import { Progress } from "@/components/ui/progress";

interface TimerBarProps {
  duration: 10;
  onTimeout: () => void;
  isActive: boolean;
}

export default function TimerBar({
  duration,
  onTimeout,
  isActive,
}: TimerBarProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    if (timeLeft === 0) {
      onTimeout();
      return;
    }

    const intervalId = window.setInterval(() => {
      setTimeLeft((currentTime) => {
        if (currentTime <= 1) {
          window.clearInterval(intervalId);
          return 0;
        }

        return currentTime - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isActive, onTimeout, timeLeft]);

  const progressValue = (timeLeft / duration) * 100;
  const indicatorClassName = timeLeft > 5 ? "bg-[#EAB308]" : "bg-[#ef4444]";

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-sm font-medium text-[#fef3c7]">
        <span>সময় বাকি</span>
        <span>{timeLeft}s</span>
      </div>

      <Progress
        value={progressValue}
        indicatorClassName={indicatorClassName}
        className="h-3 bg-black/30"
      />
    </div>
  );
}