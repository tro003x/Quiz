import type { AppState } from "@/types/quiz";

interface NavbarProps {
  userName: string;
  score: number;
  screen: AppState;
  sessionCount: number;
  onOpenHistory: () => void;
  onLogin: () => void;
  onLogoClick: () => void;
}

export default function Navbar({
  userName,
  score,
  screen,
  sessionCount,
  onOpenHistory,
  onLogin,
  onLogoClick,
}: NavbarProps) {
  const isLoggedIn = userName && userName !== "অতিথি";
  const isInQuizScreen = screen === "question";

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        height: "64px",
        background: "rgba(2, 12, 7, 0.8)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LEFT SECTION: Logo + Brand */}
        <div 
          onClick={onLogoClick}
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "10px",
            cursor: "pointer",
            transition: "opacity 0.2s"
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.opacity = "0.8";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.opacity = "1";
          }}
        >
          {/* Logo placeholder */}
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #16a34a, #15803d)",
              border: "1px solid rgba(34,197,94,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "white", fontWeight: 700, fontSize: "16px" }}>
              ম
            </span>
          </div>
          {/* Brand name */}
          <span
            style={{
              color: "white",
              fontWeight: 700,
              fontSize: "18px",
            }}
          >
            মুসলিমবঙ্গ
          </span>
        </div>

        {/* CENTER SECTION: Score pill (hidden on mobile) */}
        <div
          className="hidden md:flex"
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "100px",
            padding: "7px 18px",
            display: "flex",
            gap: "8px",
            alignItems: "center",
            fontSize: "13px",
            color: "rgba(255,255,255,0.8)",
            transition: "border-color 0.2s, color 0.2s",
            cursor: "default"
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = "rgba(34,197,94,0.5)";
            el.style.color = "#22c55e";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = "rgba(255,255,255,0.2)";
            el.style.color = "rgba(255,255,255,0.8)";
          }}
        >
          <span style={{ fontWeight: "500" }}>
            {isInQuizScreen ? `স্কোর: ${score}` : `${sessionCount} সেশন সম্পন্ন`}
          </span>
        </div>

        {/* RIGHT SECTION: Login or User info */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {!isLoggedIn ? (
            <button
              onClick={onLogin}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "100px",
                padding: "8px 20px",
                color: "white",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(34,197,94,0.5)";
                el.style.color = "#22c55e";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(255,255,255,0.2)";
                el.style.color = "white";
              }}
            >
              লগইন
            </button>
          ) : (
            <>
              {/* Score History Button */}
              <button
                onClick={onOpenHistory}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "100px",
                  padding: "7px 18px",
                  color: "#22c55e",
                  fontSize: "13px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(34,197,94,0.5)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(255,255,255,0.2)";
                }}
              >
                আপনার স্কোর
              </button>

              {/* User Avatar + Name */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {/* Avatar Circle */}
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #16a34a, #15803d)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      color: "white",
                      fontSize: "13px",
                      fontWeight: 700,
                    }}
                  >
                    {userName.charAt(0)}
                  </span>
                </div>
                {/* User Name */}
                <span
                  style={{
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "500",
                    maxWidth: "120px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {userName}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}