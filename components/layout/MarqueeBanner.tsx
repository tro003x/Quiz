"use client"

export default function MarqueeBanner({ text }: { text: string }) {
  return (
    <div style={{
      width: "100%",
      background: "transparent",
      padding: "10px 0",
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
    }}>

      <style>{`
        @keyframes newsTicker {
          0%   { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .ticker-text {
          display: inline-block;
          white-space: nowrap;
          font-size: 13px;
          color: rgba(255,255,255,0.55);
          animation: newsTicker 20s linear infinite;
          animation-delay: 0s;
        }
      `}</style>

      {/* Left 3 cols — empty */}
      <div style={{ gridColumn: "span 3" }} />

      {/* Middle 6 cols — ticker window */}
      <div style={{
        gridColumn: "span 6",
        overflow: "hidden",
        position: "relative",
      }}>

        {/* Left green fade */}
        <div style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          width: "50px",
          background: "linear-gradient(to right, #020c07, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }} />

        {/* Right green fade */}
        <div style={{
          position: "absolute",
          right: 0, top: 0, bottom: 0,
          width: "50px",
          background: "linear-gradient(to left, #020c07, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }} />

        {/* Single text span */}
        <span className="ticker-text">
          {text}
        </span>

      </div>

      {/* Right 3 cols — empty */}
      <div style={{ gridColumn: "span 3" }} />

    </div>
  )
}
