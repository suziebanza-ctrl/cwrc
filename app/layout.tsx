import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {headers} from "next/headers";
import "./globals.css";
import {defaultLocale, isLocale} from "./i18n/config";
import AmbientSoundscape from "./components/AmbientSoundscape";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Cathy Was Right Research Center",
  description: "Where evidence catches up with Cathy.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localeHeader = (await headers()).get("x-cwrc-locale") ?? "";
  const locale = isLocale(localeHeader) ? localeHeader : defaultLocale;

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <AmbientSoundscape />
      </body>
    </html>
  );
}
