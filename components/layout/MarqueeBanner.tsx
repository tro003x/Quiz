interface MarqueeBannerProps {
  text: string;
}

export default function MarqueeBanner({ text }: MarqueeBannerProps) {
  return (
    <div className="w-full border-y border-[#EAB30866] bg-[#92400e4d]">
      <div className="overflow-hidden py-2">
        <div className="marquee whitespace-nowrap px-4 text-sm font-medium text-[#fef3c7] sm:text-base">
          {text}
        </div>
      </div>
    </div>
  );
}