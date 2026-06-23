import { brand } from "@/config/brand";
import { faqs } from "@/content/faqs";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

const sameAs = Object.values(brand.socialLinks).filter(Boolean);

export function organizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: brand.seo.siteUrl,
    logo: absoluteUrl("/brand/aitd-logo-mark-512.png"),
    email: brand.contact.email,
    areaServed: [
      brand.market.city,
      brand.market.region,
      brand.market.state,
      "Remote Colorado teams",
    ],
  };

  return sameAs.length > 0 ? { ...data, sameAs } : data;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: brand.seo.siteUrl,
    description: brand.seo.defaultDescription,
    publisher: {
      "@type": "Organization",
      name: brand.name,
    },
  };
}

export function serviceListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${brand.name} services`,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/services#${service.slug}`),
      item: {
        "@type": "Service",
        name: service.title,
        serviceType: service.category,
        description: service.description,
        areaServed: brand.market.region,
        provider: {
          "@type": "Organization",
          name: brand.name,
          url: brand.seo.siteUrl,
        },
      },
    })),
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
