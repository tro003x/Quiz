import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UserResult } from "@/types/quiz";

interface ExplanationScreenProps {
  results: UserResult[];
  onRestart: () => void;
}

type ResultWithOptionalOptions = UserResult & {
  options?: string[];
};

const fallbackOptions = ["অপশন ১", "অপশন ২", "অপশন ৩", "অপশন ৪"];

function getOptions(result: ResultWithOptionalOptions): string[] {
  if (result.options && result.options.length === 4) {
    return result.options;
  }

  return fallbackOptions;
}

export default function ExplanationScreen({
  results,
  onRestart,
}: ExplanationScreenProps) {
  const limitedResults = results.slice(0, 10);

  return (
    <section className="min-h-[calc(100vh-10rem)] overflow-y-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <h2 className="text-center text-3xl font-bold text-white sm:text-4xl">
          প্রশ্নের ব্যাখ্যা
        </h2>

        <div className="space-y-4">
          {limitedResults.map((result, index) => {
            const withOptions = result as ResultWithOptionalOptions;
            const options = getOptions(withOptions);

            return (
              <article
                key={result.questionId}
                className="rounded-3xl border border-[#EAB30833] bg-[#0f0c29]/88 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
              >
                <div className="space-y-3">
                  <h3 className="text-lg font-bold leading-8 text-white sm:text-xl">
                    প্রশ্ন {index + 1}: {result.question}
                  </h3>

                  {result.timedOut ? (
                    <p className="inline-flex rounded-full border border-gray-400/40 bg-gray-500/20 px-3 py-1 text-xs font-semibold text-gray-200">
                      সময় শেষ হয়ে গেছে
                    </p>
                  ) : null}
                </div>

                <ul className="mt-4 space-y-2">
                  {options.map((option, optionIndex) => {
                    const isCorrect = optionIndex === result.correctIndex;
                    const isWrongSelection =
                      result.selectedIndex === optionIndex && !result.isCorrect;

                    return (
                      <li
                        key={`${result.questionId}-${optionIndex}`}
                        className={cn(
                          "rounded-xl border px-3 py-2 text-sm text-white/90",
                          isCorrect
                            ? "border-green-400/50 bg-green-600/25 text-green-100"
                            : isWrongSelection
                              ? "border-red-400/50 bg-red-600/25 text-red-100"
                              : "border-white/10 bg-white/5"
                        )}
                      >
                        {option}
                      </li>
                    );
                  })}
                </ul>

                <p className="mt-4 text-sm leading-7 text-[#fef3c7]/75">
                  {result.explanation}
                </p>
              </article>
            );
          })}
        </div>

        <div className="flex justify-center pt-2">
          <Button
            type="button"
            size="lg"
            onClick={onRestart}
            className="h-12 rounded-2xl bg-[#EAB308] px-8 font-semibold text-[#1a1200] hover:bg-[#facc15]"
          >
            নতুন সেশন শুরু করুন
          </Button>
        </div>
      </div>
    </section>
  );
}