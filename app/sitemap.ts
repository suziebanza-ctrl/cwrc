import type {MetadataRoute} from "next";

const baseUrl = "https://cwrc.netlify.app";

const routes = [
  "",
  "/about",
  "/ask-cathy",
  "/contact",
  "/departments",
  "/development-log",
  "/greenhouse",
  "/hall",
  "/grand-salon",
  "/home",
  "/kitchen",
  "/kitchen/recipes",
  "/laboratory",
  "/library",
  "/library/jokes",
  "/office-cathy",
  "/office-gpt",
  "/office-suzie",
  "/research",
  "/rooms",
  "/submit-case",
];

const locales = ["fr", "en", "es"];

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedPages = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : route === "/grand-salon" ? 0.9 : 0.7,
    })),
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...localizedPages,
  ];
}