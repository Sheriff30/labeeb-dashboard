import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Providers from "./providers";
import { AuthRedirect } from "@/components";

// Arabic font - Medium only
const labeebArabicMedium = localFont({
  src: "../../public/fonts/Labeeb-Arabic-Medium.ttf",
  variable: "--font-labeeb-arabic-medium",
  display: "swap",
});
const labeebArabicLight = localFont({
  src: "../../public/fonts/Labeeb-Arabic-Light.ttf",
  variable: "--font-labeeb-arabic-light",
  display: "swap",
});

const labeebArabicBold = localFont({
  src: "../../public/fonts/Labeeb-Arabic-Bold.ttf",
  variable: "--font-labeeb-arabic-bold",
  display: "swap",
});

// English font - Medium only
const labeebEnglishMedium = localFont({
  src: "../../public/fonts/Labeeb-English-Medium.ttf",
  variable: "--font-labeeb-english-medium",
  display: "swap",
});

const labeebEnglishLight = localFont({
  src: "../../public/fonts/Labeeb-English-Light.ttf",
  variable: "--font-labeeb-english-light",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Labeeb Dashboard",
  description: "Labeeb Dashboard Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={` ${labeebArabicMedium.variable} ${labeebArabicLight.variable} ${labeebArabicBold.variable} ${labeebEnglishMedium.variable} ${labeebEnglishLight.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {" "}
        <Providers>
          {" "}
          <AuthRedirect />
          {children}
        </Providers>
      </body>
    </html>
  );
}
