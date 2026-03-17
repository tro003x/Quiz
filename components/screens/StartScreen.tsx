import { Button } from "@/components/ui/button";
import { BookOpen, Clock, ListTodo } from "lucide-react";

interface StartScreenProps {
  name: string;
  description: string;
  onStart: () => void;
}

const stats = [
  { label: "১০০+ প্রশ্ন", icon: BookOpen },
  { label: "১০ সেকেন্ড", icon: Clock },
  { label: "প্রতি সেশনে ১০টি প্রশ্ন", icon: ListTodo },
];

const styles = `
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-up {
    animation: fadeUp 0.6s ease-out forwards;
  }
`;

export default function StartScreen({
  name,
  description,
  onStart,
}: StartScreenProps) {
  return (
    <>
      <style>{styles}</style>
      <section className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-10">
        <div className="glass-card w-full max-w-3xl p-8 text-center sm:p-10">
          <div className="space-y-4">
            <div style={{ opacity: 0, animation: "fadeUp 0.6s ease-out forwards" }}>
              <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl"
                style={{ lineHeight: "1.1", marginBottom: "0.25rem" }}>
                ইতिহাস जानuन,
              </h1>
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl text-[#22c55e]">
                निজेकে यాచాई করुन।
              </h1>
            </div>
            <p
              className="mx-auto max-w-2xl text-sm leading-7 text-[#d1fae5]/80 sm:text-base"
              style={{ opacity: 0, animation: "fadeUp 0.6s ease-out forwards 0.1s" }}
            >
              {description}
            </p>
          </div>

          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
            style={{ opacity: 0, animation: "fadeUp 0.6s ease-out forwards 0.2s" }}
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="glass-card inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#86efac] hover:bg-[rgba(22,163,74,0.1)] transition-all"
                  style={{
                    animation: `fadeUp 0.6s ease-out forwards ${0.3 + idx * 0.05}s`,
                    opacity: 0,
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {stat.label}
                </div>
              );
            })}
          </div>

          <div
            style={{ opacity: 0, animation: "fadeUp 0.6s ease-out forwards 0.4s" }}
          >
            <Button
              type="button"
              size="lg"
              onClick={onStart}
              className="mx-auto mt-10 h-13 min-w-56 rounded-2xl bg-[#16a34a] px-8 text-base font-bold text-white hover:bg-[#15803d] transition-all shadow-lg hover:shadow-[0_0_32px_rgba(22,163,74,0.5)]"
            >
              কুইজ শुरু করুन
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}