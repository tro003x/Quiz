import {
  Facebook,
  Github,
  Linkedin,
  Mail,
  Twitter,
  type LucideIcon,
} from "lucide-react";

interface FooterLink {
  platform: string;
  href: string;
}

interface FooterProps {
  name: string;
  links: FooterLink[];
}

const iconMap: Record<string, LucideIcon> = {
  email: Mail,
  facebook: Facebook,
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  "twitter/x": Twitter,
  x: Twitter,
};

export default function Footer({ name, links }: FooterProps) {
  return (
    <footer className="glass-navbar w-full px-4 py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 border-t border-[rgba(255,255,255,0.08)] pt-6 text-center">
        <p className="text-lg font-bold text-white">{name}</p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {links.map((link) => {
            const Icon = iconMap[link.platform.toLowerCase()] ?? Mail;

            return (
              <a
                key={`${link.platform}-${link.href}`}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.platform}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition-colors hover:text-[#EAB308]"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            );
          })}
        </div>

        <p className="text-xs text-[#fef3c7]/75">
          All Rights Reserved © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}