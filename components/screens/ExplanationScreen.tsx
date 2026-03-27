"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Home, RefreshCw } from "lucide-react";
import { BnDigit, bn } from "@/lib/utils";
import type { UserResult } from "@/types/quiz";
import { renderExplanation } from "@/lib/quiz";

interface ExplanationScreenProps {
  results: UserResult[];
  onRestart: () => void;
  onGoHome: () => void;
  onNewSession: () => void;
}

export default function ExplanationScreen({
  results,
  onRestart,
  onGoHome,
  onNewSession,
}: ExplanationScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");
  const [animating, setAnimating] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goNext = () => {
    if (currentSlide >= results.length - 1 || animating) return;
    setSlideDirection("left");
    setAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => prev + 1);
      setAnimating(false);
    }, 300);
  };

  const goPrev = () => {
    if (currentSlide <= 0 || animating) return;
    setSlideDirection("right");
    setAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => prev - 1);
      setAnimating(false);
    }, 300);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) goNext();
    if (diff < -50) goPrev();
  };

  const result = results[currentSlide];

  if (!result) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "relative",
      }}
    >
      <p
        style={{
          color: "#22c55e",
          fontSize: "13px",
          fontWeight: "600",
          marginBottom: "32px",
          letterSpacing: "0.05em",
        }}
      >
        ব্যাখ্যা <BnDigit n={currentSlide + 1} />/<BnDigit n={results.length} />
      </p>

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "680px",
        }}
      >
        <button
          onClick={goPrev}
          disabled={currentSlide === 0}
          className="hidden md:flex"
          style={{
            position: "absolute",
            left: "-60px",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: currentSlide === 0 ? 0.2 : 1,
            background: "none",
            border: "none",
            cursor: currentSlide === 0 ? "not-allowed" : "pointer",
            transition: "opacity 0.3s",
          }}
        >
          <ChevronLeft size={32} color="#22c55e" />
        </button>

        <div
          key={currentSlide}
          className={`glass-card-strong ${
            slideDirection === "left" ? "slide-from-right" : "slide-from-left"
          }`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            padding: "32px",
            minHeight: "480px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              color: "#22c55e",
              fontSize: "13px",
              fontWeight: "600",
              marginBottom: "8px",
              letterSpacing: "0.05em",
            }}
          >
            প্রশ্ন {bn(currentSlide + 1)}
          </p>
          <h3
            style={{
              color: "white",
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "24px",
              lineHeight: "1.6",
            }}
          >
            {result.question}
          </h3>

          <div style={{ marginBottom: "24px", flex: 1 }}>
            {result.options?.map((option, index) => {
              const optionIsCorrect = index === result.correctIndex;
              const userSelectedWrong =
                index === result.selectedIndex && !result.isCorrect;

              return (
                <div
                  key={index}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "10px",
                    marginBottom: "8px",
                    border: "1px solid",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: optionIsCorrect
                      ? "rgba(34,197,94,0.15)"
                      : userSelectedWrong
                        ? "rgba(239,68,68,0.15)"
                        : "rgba(255,255,255,0.04)",
                    borderColor: optionIsCorrect
                      ? "rgba(34,197,94,0.5)"
                      : userSelectedWrong
                        ? "rgba(239,68,68,0.5)"
                        : "rgba(255,255,255,0.1)",
                    color: optionIsCorrect
                      ? "#86efac"
                      : userSelectedWrong
                        ? "#fca5a5"
                        : "#d1d5db",
                  }}
                >
                  {optionIsCorrect && (
                    <CheckCircle size={16} color="#22c55e" />
                  )}
                  {userSelectedWrong && <XCircle size={16} color="#ef4444" />}
                  {result.timedOut && optionIsCorrect && (
                    <span style={{ fontSize: "11px", color: "#f59e0b", fontWeight: "600" }}>
                      ⏱ সময় শেষ
                    </span>
                  )}
                  {option}
                </div>
              );
            })}
          </div>

          <div
            style={{
              marginTop: "24px",
              padding: "16px",
              background: "rgba(255,255,255,0.04)",
              borderRadius: "12px",
              borderLeft: "3px solid #22c55e",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                color: "#6b7280",
                marginBottom: "6px",
                fontWeight: "600",
              }}
            >
              ব্যাখ্যা
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#d1fae5",
                lineHeight: "1.7",
              }}
            >
              {renderExplanation(result.explanation).map((part, idx) =>
                part.type === "bold" ? (
                  <strong key={idx} style={{ fontWeight: 700 }}>
                    {part.content}
                  </strong>
                ) : (
                  <span key={idx}>{part.content}</span>
                )
              )}
            </p>
          </div>

          {currentSlide === results.length - 1 && (
            <button
              onClick={onRestart}
              style={{
                width: "100%",
                marginTop: "24px",
                padding: "14px",
                borderRadius: "10px",
                background: "#16a34a",
                color: "white",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#15803d";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#16a34a";
              }}
            >
              নতুন সেশন শুরু করুন
            </button>
          )}
        </div>

        <button
          onClick={goNext}
          disabled={currentSlide === results.length - 1}
          className="hidden md:flex"
          style={{
            position: "absolute",
            right: "-60px",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: currentSlide === results.length - 1 ? 0.2 : 1,
            background: "none",
            border: "none",
            cursor: currentSlide === results.length - 1 ? "not-allowed" : "pointer",
            transition: "opacity 0.3s",
          }}
        >
          <ChevronRight size={32} color="#22c55e" />
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "24px",
        }}
      >
        <button
          onClick={onGoHome}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "100px",
            padding: "10px 28px",
            color: "rgba(255,255,255,0.7)",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(34,197,94,0.5)";
            e.currentTarget.style.color = "#22c55e";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            e.currentTarget.style.color = "rgba(255,255,255,0.7)";
          }}
        >
          <Home size={15} />
          ফিরে যান
        </button>

        <button
          onClick={onNewSession}
          style={{
            background: "#16a34a",
            border: "none",
            borderRadius: "100px",
            padding: "10px 28px",
            color: "white",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 0 20px rgba(22,163,74,0.3)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#15803d";
            e.currentTarget.style.boxShadow = "0 0 28px rgba(22,163,74,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#16a34a";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(22,163,74,0.3)";
          }}
        >
          <RefreshCw size={15} />
          নতুন সেশন শুরু করুন
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "8px",
          marginTop: "32px",
          justifyContent: "center",
        }}
      >
        {results.map((_, i) => (
          <button
            key={i}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: i === currentSlide ? "#22c55e" : "rgba(255,255,255,0.2)",
              transition: "background 0.3s",
              cursor: "pointer",
              border: "none",
              padding: 0,
            }}
            onClick={() => !animating && setCurrentSlide(i)}
          />
        ))}
      </div>
    </div>
  );
}
