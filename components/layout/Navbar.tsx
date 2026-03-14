import { MoonStar } from "lucide-react";

interface NavbarProps {
  appName: string;
  userName: string;
  score: number;
}

export default function Navbar({
  appName,
  userName,
  score,
}: NavbarProps) {
  return (
    <nav className="h-16 w-full bg-[#0f0c29]">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3 text-white">
          <MoonStar className="h-5 w-5 text-[#EAB308]" aria-hidden="true" />
          <span className="text-lg font-bold tracking-tight">{appName}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-white/90">
          <span className="max-w-32 truncate font-medium sm:max-w-none">{userName}</span>
          <span className="inline-flex items-center rounded-full border border-[#EAB30866] bg-[#EAB3081A] px-3 py-1 font-semibold text-[#EAB308]">
            Score: {score}
          </span>
        </div>
      </div>
    </nav>
  );
}