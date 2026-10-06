import type { Metadata, Viewport } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import WhatsAppButton from "@/components/WhatsAppButton";

// To match the reference site's typeface exactly, swap this for next/font:
//
//   import { Fraunces, Inter } from "next/font/google";
//   const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif" });
//   const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
//
// then add `${serif.variable} ${sans.variable}` to the <body> className.
// Left as system fonts here so the project builds without an internet
// connection; both fonts are free on Google Fonts.

export const metadata: Metadata = {
  title: "Shree Balaji Industries | Modular Kitchens, Wardrobes, Cupboards, Doors & Chowkhats",
  description:
    "A Panchkula-based modular kitchen, wardrobe, cupboard and door manufacturing company. We build interiors that are practical, elegant and made to last.",
  keywords: [
    "modular kitchen",
    "modular wardrobe",
    "modular cupboard",
    "doors and chowkhat",
    "Panchkula furniture manufacturer",
    "Chandigarh tricity interiors",
  ],
  openGraph: {
    title: "Shree Balaji Industries",
    description:
      "Modular kitchens, cupboards, wardrobes, doors and chowkhats — designed and manufactured in Punjab.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#121110",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* every visit starts in dark mode; a visitor's switch to light only lasts for that visit */}
        <script
          dangerouslySetInnerHTML={{
            __html: `var t="dark";try{if(sessionStorage.getItem("sbi-theme")==="light")t="light"}catch(e){}document.documentElement.dataset.theme=t`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-4 focus:left-4 focus:bg-paper focus:text-ink focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Preloader />
        {children}
        <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
