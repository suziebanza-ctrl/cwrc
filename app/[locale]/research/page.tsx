import { notFound } from "next/navigation";
import type { Locale } from "../../i18n/config";
import PageLayout from "../../components/PageLayout";
import PublishedAnswers from "../../components/PublishedAnswers";

export default async function ResearchPage({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;

  if (
    locale !== "fr" &&
    locale !== "en" &&
    locale !== "es"
  ) {
    notFound();
  }

  return (
    <PageLayout locale={locale as Locale}>
      <PublishedAnswers locale={locale as Locale} />
    </PageLayout>
  );
}