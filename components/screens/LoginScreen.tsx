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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

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
            onChange={(event) => setName(event.target.value)}
            placeholder="আপনার নাম লিখুন"
            className="h-12 w-full glass-input px-4"
          />

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