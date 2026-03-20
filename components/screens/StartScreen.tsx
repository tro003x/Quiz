"use client";

import { BookOpen, Clock, ListTodo } from "lucide-react";

interface StartScreenProps {
  userName: string;
  onStart: () => void;
  onLoginRequest: () => void;
}

export default function StartScreen({
  userName,
  onStart,
  onLoginRequest,
}: StartScreenProps) {
  // VERSION A — Logged out (userName is empty)
  if (!userName || userName.trim() === "") {
    return (
      <section style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}>
        <div style={{
          background: "rgba(22,163,74,0.06)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(34,197,94,0.15)",
          borderRadius: "24px",
          padding: "40px",
          maxWidth: "680px",
          width: "100%",
          margin: "0 auto",
        }}>
          <h1 style={{
            color: "white",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            textAlign: "center",
            marginBottom: "0",
            lineHeight: 1.2,
          }}>
            ইতিহাস জানুন,
          </h1>

          <h2 style={{
            color: "#22c55e",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            textAlign: "center",
            marginBottom: "20px",
            lineHeight: 1.2,
          }}>
            নিজেকে যাচাই করুন।
          </h2>

          <p style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "15px",
            textAlign: "center",
            marginBottom: "32px",
            lineHeight: 1.6,
          }}>
            কুরআন, হাদিস এবং ইসলামের মৌলিক জ্ঞানভিত্তিক প্রশ্নোত্তর কুইজ। প্রতিটি প্রশ্নে দ্রুত চিন্তা করুন এবং আপনার শেখা যাচাই করুন।
          </p>

          <div style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "32px",
          }}>
            {[
              { icon: <BookOpen size={14} />, text: "১০০+ প্রশ্ন" },
              { icon: <Clock size={14} />, text: "১০ সেকেন্ড" },
              { icon: <ListTodo size={14} />, text: "প্রতি সেশনে ১০টি প্রশ্ন" },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(34,197,94,0.3)",
                  borderRadius: "100px",
                  padding: "8px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#22c55e",
                  fontSize: "13px",
                }}
              >
                {item.icon}
                {item.text}
              </div>
            ))}
          </div>

          <div style={{
            display: "flex",
            justifyContent: "center",
          }}>
            <button
              onClick={onLoginRequest}
              style={{
                background: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "100px",
                padding: "14px 32px",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 0 24px rgba(22,163,74,0.35)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#15803d";
                e.currentTarget.style.boxShadow = "0 0 32px rgba(22,163,74,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#16a34a";
                e.currentTarget.style.boxShadow = "0 0 24px rgba(22,163,74,0.35)";
              }}
            >
              লগ ইন করুন
            </button>
          </div>
        </div>
      </section>
    );
  }

  // VERSION B — Logged in (userName exists)
  return (
    <section style={{
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    }}>
      <div style={{
        background: "rgba(22,163,74,0.06)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(34,197,94,0.15)",
        borderRadius: "24px",
        padding: "40px",
        maxWidth: "520px",
        width: "100%",
        margin: "0 auto",
      }}>
        <h1 style={{
          color: "white",
          fontSize: "20px",
          fontWeight: 500,
          textAlign: "center",
          marginBottom: "8px",
        }}>
          মুসলিমবঙ্গের কুইজে আপনাকে স্বাগতম,
        </h1>

        <h2 style={{
          color: "#22c55e",
          fontSize: "28px",
          fontWeight: 700,
          textAlign: "center",
          marginBottom: "20px",
        }}>
          {userName}
        </h2>

        <div style={{
          height: "1px",
          background: "rgba(255,255,255,0.08)",
          margin: "20px 0",
        }} />

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "28px",
        }}>
          {[
            "প্রতিটি সেশনে রয়েছে ১০টি প্রশ্ন",
            "প্রতিটি প্রশ্নের জন্য সময় ১০ সেকেন্ড",
            "প্রতিটি প্রশ্নের জন্য ১ মার্ক",
          ].map((text, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
              }}
            >
              <span style={{
                color: "#22c55e",
                fontSize: "18px",
                lineHeight: 1.4,
                flexShrink: 0,
              }}>
                ●
              </span>
              <span style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "15px",
                lineHeight: 1.6,
              }}>
                {text}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          style={{
            background: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "100px",
            padding: "14px 32px",
            fontSize: "16px",
            fontWeight: 600,
            width: "100%",
            cursor: "pointer",
            boxShadow: "0 0 24px rgba(22,163,74,0.35)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#15803d";
            e.currentTarget.style.boxShadow = "0 0 32px rgba(22,163,74,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#16a34a";
            e.currentTarget.style.boxShadow = "0 0 24px rgba(22,163,74,0.35)";
          }}
        >
          কুইজ শুরু করুন
        </button>
      </div>
    </section>
  );
}
