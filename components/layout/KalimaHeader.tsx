import Image from "next/image";

export default function KalimaHeader() {
  return (
    <div className="w-full border-b border-[#EAB30866] bg-[#0b1020]">
      <div className="mx-auto flex min-h-24 w-full max-w-7xl items-center justify-center px-4 py-3">
        <Image
          src="/kalima.png"
          alt="Kalima"
          width={320}
          height={80}
          priority
          className="h-auto max-h-20 w-auto object-contain"
        />
      </div>
    </div>
  );
}