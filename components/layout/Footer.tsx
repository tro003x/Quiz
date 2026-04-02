import { Github, type LucideIcon } from "lucide-react";

interface FooterLink {
  platform: string;
  href: string;
}

interface FooterProps {
  name: string;
  links?: FooterLink[];
}

const iconMap: Record<string, LucideIcon> = {
  github: Github,
};

export default function Footer({ name }: FooterProps) {
  return (
    <footer className="glass-navbar w-full px-4 py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 border-t border-[rgba(255,255,255,0.08)] pt-6 text-center">
        <p className="text-lg font-bold text-white">{name}</p>

        <div className="flex items-center justify-center gap-4">
          <p className="text-lg text-white/80">Made by tro003x</p>
          <a
             href="https://github.com/tro003x"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition-colors hover:text-[#EAB308]"
          >
            <Github className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>

        

        <p className="text-medium text-[#fef3c7]/75">
          Inspired by the book "মুসলিমবঙ্গ". All Rights Reserved © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}