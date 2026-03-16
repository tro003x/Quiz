import { Button } from "@/components/ui/button";

interface StartScreenProps {
  name: string;
  description: string;
  onStart: () => void;
}

const stats = ["২০০+ প্রশ্ন", "১০ সেকেন্ড", "প্রতি সেশনে ১০টি প্রশ্ন"];

export default function StartScreen({
  name,
  description,
  onStart,
}: StartScreenProps) {
  return (
    <section className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-10">
      <div className="glass-card w-full max-w-3xl p-8 text-center sm:p-10">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            স্বাগতম, {name}!
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-[#fef3c7]/80 sm:text-base">
            {description}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {stats.map((stat) => (
            <span
              key={stat}
              className="glass-card inline-flex px-4 py-2 text-sm font-semibold text-[#fef3c7]"
            >
              {stat}
            </span>
          ))}
        </div>

        <Button
          type="button"
          size="lg"
          onClick={onStart}
          className="mx-auto mt-10 h-13 min-w-56 rounded-2xl bg-[#EAB308] px-8 text-base font-bold text-[#1a1200] hover:bg-[#facc15]"
        >
          কুইজ শুরু করুন
        </Button>
      </div>
    </section>
  );
}