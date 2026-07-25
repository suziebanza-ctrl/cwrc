import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocalizedSite from "../../components/LocalizedSite";
import { getContent } from "../../i18n/content";
import { isLocale } from "../../i18n/config";

type Props = {
  params: Promise<{
    locale: string;
    slug?: string[];
  }>;
};

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const key = slug?.join("/") ?? "";
  const site = getContent(locale);

  const title =
    key === "home"
      ? site.home.title
      : key === "rooms"
        ? site.rooms.title
        : key === "ask-cathy"
          ? undefined
          : key === "submit-case"
            ? undefined
            : site.pages[key]?.title;

   const pagePath = key ? `/${key}` : "";

  return {
    title: title
      ? `${title} | CWRC`
      : "The Cathy Was Always Right Center",
    description: site.entrance.tagline,
    alternates: {
      canonical: `/${locale}${pagePath}`,
      languages: {
        "fr-CA": `/fr${pagePath}`,
        en: `/en${pagePath}`,
        es: `/es${pagePath}`,
        "x-default": `/fr${pagePath}`,
      },
    },
  };
}

export default async function LocalizedPage({
  params,
}: Props) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <LocalizedSite
      locale={locale}
      slug={slug?.join("/") ?? ""}
    />
  );
}