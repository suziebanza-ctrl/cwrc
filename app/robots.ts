import type {MetadataRoute} from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/fr/admin", "/en/admin", "/es/admin"],
    },
    sitemap: "https://cwrc.netlify.app/sitemap.xml",
    host: "https://cwrc.netlify.app",
  };
}