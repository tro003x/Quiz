"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { getUser, saveUser } from "@/lib/storage";

interface LoginScreenProps {
  appName: string;
  onLogin: (name: string) => void;
}

export default function LoginScreen({ appName, onLogin }: LoginScreenProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const validateName = (nameInput: string): boolean => {
    const trimmed = nameInput.trim();
    if (trimmed.length < 2) return false;
    // Only Bengali letters, English letters and spaces
    const validPattern = /^[a-zA-Z\u0980-\u09FF\s]+$/;
    if (!validPattern.test(trimmed)) return false;
    // Must have at least 2 actual letters (not just spaces)
    const lettersOnly = trimmed.replace(/\s/g, "");
    if (lettersOnly.length < 2) return false;
    return true;
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!validateName(trimmedName)) {
      setError("শুধুমাত্র বাংলা এবং ইংরেজি নাম গ্রহনযোগ্য");
      return;
    }

    setError("");

    const currentSession = getUser();

    saveUser({
      name: trimmedName,
      seenQuestionIds: currentSession?.seenQuestionIds ?? [],
    });

    onLogin(trimmedName);
  }

  return (
    <section className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-10">
      <div className="glass-card-strong w-full max-w-md p-8">
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">{appName}</h1>
          <p className="text-sm leading-6 text-[#fef3c7]/80">
            স্বাগতম। কুইজ শুরু করার আগে আপনার নাম লিখুন।
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (error) setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit(e as any);
            }}
            placeholder="আপনার নাম লিখুন"
            style={{
              border: error
                ? "1px solid rgba(239,68,68,0.6)"
                : "1px solid rgba(255,255,255,0.15)",
            }}
            className="h-12 w-full glass-input px-4"
          />

          {error && (
            <div
              style={{
                color: "#ef4444",
                fontSize: "13px",
                marginTop: "6px",
                marginBottom: "4px",
                textAlign: "left",
                paddingLeft: "4px",
              }}
            >
              {error}
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="h-12 w-full rounded-2xl bg-[#EAB308] font-semibold text-[#1a1200] hover:bg-[#facc15]"
          >
            শুরু করুন
          </Button>
        </form>
      </div>
    </section>
  );
}