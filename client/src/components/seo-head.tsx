import { useEffect } from "react";
import { getRouteSeoConfig, SITE_NAME, SITE_URL } from "@/lib/seo-keyword-map";

const MANAGED_ATTR = "data-seo-managed";
const DEFAULT_OG_IMAGE = "/logo_light.svg";

function toAbsoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

function upsertMeta(
  selector: "name" | "property",
  key: string,
  content: string,
): void {
  let meta = document.head.querySelector<HTMLMetaElement>(
    `meta[${selector}="${key}"]`,
  );

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(selector, key);
    meta.setAttribute(MANAGED_ATTR, "true");
    document.head.appendChild(meta);
  }

  meta.content = content;
}

function upsertCanonical(href: string): void {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    link.setAttribute(MANAGED_ATTR, "true");
    document.head.appendChild(link);
  }

  link.href = href;
}

function upsertJsonLd(id: string, schema: Record<string, unknown>): void {
  let script = document.head.querySelector<HTMLScriptElement>(`script#${id}`);

  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.setAttribute(MANAGED_ATTR, "true");
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(schema);
}

function removeJsonLd(id: string): void {
  const script = document.head.querySelector<HTMLScriptElement>(`script#${id}`);
  script?.remove();
}

function getPageNameFromTitle(title: string): string {
  return title.split("|")[0]?.trim() || "Page";
}

function isIndexableRobots(robots: string): boolean {
  return robots.toLowerCase().startsWith("index");
}

type SeoHeadProps = {
  path: string;
};

export function SeoHead({ path }: SeoHeadProps) {
  useEffect(() => {
    const seo = getRouteSeoConfig(path);
    const canonicalUrl = toAbsoluteUrl(seo.canonicalPath);
    const ogImageUrl = toAbsoluteUrl(DEFAULT_OG_IMAGE);
    const pageName = getPageNameFromTitle(seo.title);

    document.title = seo.title;

    upsertMeta("name", "description", seo.description);
    upsertMeta("name", "robots", seo.robots);

    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:type", seo.ogType);
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", ogImageUrl);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertMeta("name", "twitter:image", ogImageUrl);

    upsertCanonical(canonicalUrl);

    upsertJsonLd("seo-schema-organization", {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: ogImageUrl,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "info@goldrise.ai",
          telephone: "+1-206-203-6807",
          areaServed: "US",
          availableLanguage: ["en"],
        },
      ],
    });

    upsertJsonLd("seo-schema-website", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    });

    if (isIndexableRobots(seo.robots) && seo.canonicalPath !== "/") {
      upsertJsonLd("seo-schema-breadcrumb", {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: toAbsoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: pageName,
            item: canonicalUrl,
          },
        ],
      });
    } else {
      removeJsonLd("seo-schema-breadcrumb");
    }
  }, [path]);

  return null;
}
