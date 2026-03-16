interface MarqueeBannerProps {
  text: string;
}

export default function MarqueeBanner({ text }: MarqueeBannerProps) {
  return (
    <div className="w-full border-y border-[rgba(234,179,8,0.25)] bg-[rgba(234,179,8,0.1)] backdrop-blur" style={{
      WebkitBackdropFilter: 'blur(8px)'
    }}>
      <div className="overflow-hidden py-2">
        <div className="marquee whitespace-nowrap px-4 text-sm font-medium text-[#fef3c7] sm:text-base">
          {text}
        </div>
      </div>
    </div>
  );
}