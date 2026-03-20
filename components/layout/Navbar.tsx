"use client"

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Trophy, LogOut } from "lucide-react";
import { bn } from "@/lib/utils";
import type { AppState } from "@/types/quiz";

interface NavbarProps {
  userName: string;
  score: number;
  screen: AppState;
  sessionCount: number;
  onOpenHistory: () => void;
  onLogin: () => void;
  onLogoClick: () => void;
  onLogout: () => void;
}

export default function Navbar({
  userName,
  score,
  screen,
  sessionCount,
  onOpenHistory,
  onLogin,
  onLogoClick,
  onLogout,
}: NavbarProps) {
  const isLoggedIn = userName && userName.trim() !== "";
  const isInQuizScreen = screen === "question";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

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
            border: "1px solid rgba(34,197,94,0.5)",
            borderRadius: "15px",
            padding: "7px 18px",
            display: "flex",
            gap: "8px",
            alignItems: "center",
            fontSize: "13px",
            color: "#22c55e",
            transition: "border-color 0.2s, color 0.2s",
            cursor: "default"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"
            e.currentTarget.style.color = "rgba(255,255,255,0.9)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(34,197,94,0.5)"
            e.currentTarget.style.color = "#22c55e"
          }}
        >
          <span style={{ fontWeight: "600" }}>
            আমার দ্বীন আমার যমীন
          </span>
        </div>

        {/* RIGHT SECTION: Login or User Dropdown */}
        {userName && userName.trim() !== "" ? (
          // LOGGED IN — show avatar + dropdown button
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            
            {/* Avatar circle */}
            <div style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #16a34a, #15803d)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "13px",
              fontWeight: "700",
            }}>
              {userName.charAt(0).toUpperCase()}
            </div>

            {/* Dropdown button */}
            <div className="nav-dropdown" style={{ position: "relative" }}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "100px",
                  padding: "7px 18px",
                  fontSize: "14px",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {userName}
                <ChevronDown size={14} />
              </button>

              {dropdownOpen && (
                <div style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  background: "rgba(5, 20, 10, 0.95)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(34,197,94,0.15)",
                  borderRadius: "16px",
                  padding: "8px",
                  minWidth: "200px",
                  zIndex: 100,
                }}>
                  {/* আপনার স্কোর */}
                  <button onClick={() => { onOpenHistory(); setDropdownOpen(false) }}
                    style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      width: "100%", padding: "10px 14px",
                      background: "transparent", border: "none",
                      borderRadius: "10px", color: "#22c55e",
                      fontSize: "14px", cursor: "pointer",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(34,197,94,0.1)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <Trophy size={16} color="#22c55e" />
                    আপনার স্কোর
                  </button>

                  {/* Divider */}
                  <div style={{
                    height: "1px",
                    background: "rgba(255,255,255,0.08)",
                    margin: "6px 0",
                  }} />

                  {/* লগআউট */}
                  <button onClick={() => { onLogout(); setDropdownOpen(false) }}
                    style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      width: "100%", padding: "10px 14px",
                      background: "transparent", border: "none",
                      borderRadius: "10px", color: "#ef4444",
                      fontSize: "14px", cursor: "pointer",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <LogOut size={16} color="#ef4444" />
                    লগআউট
                  </button>
                </div>
              )}
            </div>
          </div>

        ) : (

          // LOGGED OUT — show only লগ ইন button, nothing else
          <button
            onClick={onLogin}
            style={{
              background: "transparent",
              border: "1px solid rgba(34,197,94,0.5)",
              borderRadius: "100px",
              padding: "7px 18px",
              fontSize: "13px",
              color: "#22c55e",
              cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"
              e.currentTarget.style.color = "rgba(255,255,255,0.9)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(34,197,94,0.5)"
              e.currentTarget.style.color = "#22c55e"
            }}
          >
            লগ ইন
          </button>

        )}
      </div>
    </nav>
  );
}