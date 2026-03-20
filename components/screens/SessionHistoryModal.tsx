import { X } from "lucide-react";
import { bn } from "@/lib/utils";
import type { SessionRecord } from "@/types/quiz";

interface SessionHistoryModalProps {
  history: SessionRecord[];
  onClose: () => void;
  onViewSession: (record: SessionRecord) => void;
}

export default function SessionHistoryModal({
  history,
  onClose,
  onViewSession,
}: SessionHistoryModalProps) {
  // Sort by sessionNumber descending (most recent first)
  const sortedHistory = [...history].sort(
    (a, b) => b.sessionNumber - a.sessionNumber
  );

  const getScoreColor = (score: number): string => {
    if (score >= 8) return "#22c55e"; // Green
    if (score >= 5) return "#f59e0b"; // Amber
    return "#ef4444"; // Red
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        zIndex: 100,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      onClick={onClose}
    >
      {/* Inner container - glass card */}
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          maxHeight: "80vh",
          overflowY: "auto",
          padding: "32px",
          background: "rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "24px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "24px",
          }}
        >
          <div>
            <h2
              style={{
                color: "white",
                fontSize: "22px",
                fontWeight: 700,
                margin: 0,
                marginBottom: "8px",
              }}
            >
              আপনার সেশন ইতিহাস
            </h2>
            <p
              style={{
                color: "rgba(34, 197, 94, 0.7)",
                fontSize: "14px",
                margin: 0,
              }}
            >
              {sortedHistory.length} টি সেশন সম্পন্ন হয়েছে
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(255, 255, 255, 0.5)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.color = "rgba(255, 255, 255, 0.8)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.color = "rgba(255, 255, 255, 0.5)";
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* CONTENT */}
        {sortedHistory.length === 0 ? (
          // Empty state
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "400px",
              gap: "24px",
            }}
          >
            <p
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "15px",
                textAlign: "center",
                margin: 0,
              }}
            >
              এখনো কোনো সেশন সম্পন্ন হয়নি
            </p>
            <button
              onClick={onClose}
              style={{
                background: "#16a34a",
                border: "none",
                borderRadius: "100px",
                padding: "10px 28px",
                color: "white",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "#15803d";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "#16a34a";
              }}
            >
              প্রথম সেশন শুরু করুন
            </button>
          </div>
        ) : (
          // Session cards
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {sortedHistory.map((record) => (
              <div
                key={record.sessionNumber}
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(34, 197, 94, 0.15)",
                  borderRadius: "16px",
                  padding: "20px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "rgba(255, 255, 255, 0.08)";
                  el.style.borderColor = "rgba(34, 197, 94, 0.25)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "rgba(255, 255, 255, 0.04)";
                  el.style.borderColor = "rgba(34, 197, 94, 0.15)";
                }}
              >
                {/* LEFT SIDE: Session number and date */}
                <div>
                  <p
                    style={{
                      color: "white",
                      fontWeight: 600,
                      fontSize: "16px",
                      margin: 0,
                      marginBottom: "4px",
                    }}
                  >
                    সেশন {bn(record.sessionNumber)}
                  </p>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.5)",
                      fontSize: "13px",
                      margin: 0,
                    }}
                  >
                    {record.date}
                  </p>
                </div>

                {/* CENTER: Score */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      color: getScoreColor(record.score),
                      fontSize: "28px",
                      fontWeight: 800,
                      margin: 0,
                      lineHeight: 1,
                    }}
                  >
                    {bn(record.score)}/{bn(record.total)}
                  </p>
                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.4)",
                      fontSize: "12px",
                      marginTop: "4px",
                      margin: "4px 0 0 0",
                    }}
                  >
                    নম্বর
                  </p>
                </div>

                {/* RIGHT SIDE: Details button */}
                <button
                  onClick={() => onViewSession(record)}
                  style={{
                    background: "rgba(34, 197, 94, 0.1)",
                    border: "1px solid rgba(34, 197, 94, 0.25)",
                    borderRadius: "100px",
                    padding: "8px 18px",
                    color: "#22c55e",
                    fontSize: "13px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(34, 197, 94, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(34, 197, 94, 0.1)";
                  }}
                >
                  বিস্তারিত
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
