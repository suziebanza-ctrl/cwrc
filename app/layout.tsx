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
  metadataBase: new URL("https://cwrc.netlify.app"),
  applicationName: "The Cathy Was Always Right Center",
  title: {
    default: "CWRC | Jeux éducatifs, humour, art et univers imaginaire",
    template: "%s | CWRC",
  },
  description:
    "Découvrez The Cathy Was Always Right Center, un univers interactif où l’on apprend en jouant : géographie, histoire, art, musique, animaux, humour, énigmes et personnages étonnants.",
  openGraph: {
    type: "website",
    siteName: "The Cathy Was Always Right Center",
    title: "CWRC | Apprendre en jouant dans un univers imaginaire",
    description:
      "Jeux éducatifs, géographie, histoire, art, musique, animaux, humour et découvertes dans un univers interactif.",
    url: "https://cwrc.netlify.app",
    locale: "fr_CA",
  },
  robots: {
    index: true,
    follow: true,
  },
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
