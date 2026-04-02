import type { Metadata } from "next";
import { Hind_Siliguri, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400"],
  variable: "--font-bengali-digit",
});

export const metadata: Metadata = {
  title: "Muslim-Bongo Quiz",
  description: "A quiz platform inspired by the book MuslimBongo",
  icons: {
    icon: "/favicon.jpg",
    apple: "/favicon.jpg",
  },
  alternates: {
    canonical: "https://muslim-bongo-quiz.vercel.app",
  },
  openGraph: {
    title: "Muslim-Bongo Quiz",
    description: "A quiz platform inspired by the book MuslimBongo",
    url: "https://muslim-bongo-quiz.vercel.app",
    siteName: "Muslim-Bongo Quiz",
  },
  other: {
    "http-equiv": "Content-Language",
    "content": "bn"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" dir="ltr" className={`${hindSiliguri.variable} ${notoSansBengali.variable}`}>
      <body
        className="antialiased"
      >
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
        <main style={{ position: "relative", zIndex: 1 }}>
          {children}
        </main>
      </body>
    </html>
  );
}
