"use client"
import { useEffect, useRef, useState } from "react"

interface TimerBarProps {
  duration: number
  onTimeout: () => void
  isActive: boolean
}

export default function TimerBar({ duration, onTimeout, isActive }: TimerBarProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const hasTimedOut = useRef(false)

  useEffect(() => {
    setTimeLeft(duration)
    hasTimedOut.current = false
  }, [duration])

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          if (!hasTimedOut.current) {
            hasTimedOut.current = true
            onTimeout()
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isActive, onTimeout])

  const percentage = (timeLeft / duration) * 100
  const isUrgent = timeLeft <= 5
  const color = isUrgent ? "#ef4444" : "#22c55e"

  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        marginBottom: "6px",
        fontSize: "12px",
        color: isUrgent ? "#ef4444" : "#86efac"
      }}>
        <span>সময় বাকি</span>
        <span>{timeLeft}s</span>
      </div>
      <div style={{
        width: "100%",
        height: "6px",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "100px",
        overflow: "hidden"
      }}>
        <div style={{
          height: "100%",
          width: `${percentage}%`,
          background: color,
          borderRadius: "100px",
          transition: "width 1s linear, background 0.3s ease"
        }} />
      </div>
    </div>
  )
}
