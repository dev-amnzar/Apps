import { SITE_URL, SITE_NAME_AR } from "@/lib/utils";

interface MetaTagsProps {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function MetaTags({ title, description, path, image }: MetaTagsProps) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME_AR}`;

  return (
    <>
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME_AR} />
      <meta property="og:locale" content="ar_SA" />
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      <link rel="canonical" href={url} />
    </>
  );
}
