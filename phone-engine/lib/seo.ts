import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, SITE_NAME_AR, SITE_DESCRIPTION } from "./utils";

interface SeoParams {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}

export function generateSeoMeta({
  title,
  description,
  path,
  image,
  type = "website",
}: SeoParams): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME_AR}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: "ar_SA",
      ...(image && {
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image && { images: [image] }),
    },
  };
}
