import { SITE_URL, SITE_NAME } from "./utils";
import type { Phone, Guide } from "@/types";

export function getPhoneProductSchema(phone: Phone) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: phone.name,
    image: phone.images,
    description: `${phone.name} - ${phone.specs.display}, ${phone.specs.chipset}, ${phone.specs.camera} camera, ${phone.specs.battery} battery`,
    brand: {
      "@type": "Brand",
      name: phone.brand.charAt(0).toUpperCase() + phone.brand.slice(1),
    },
    offers: {
      "@type": "Offer",
      price: phone.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function getGuideSchema(guide: Guide) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: guide.description,
    step: guide.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/phones?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
