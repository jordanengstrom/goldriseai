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

type SeoHeadProps = {
  path: string;
};

export function SeoHead({ path }: SeoHeadProps) {
  useEffect(() => {
    const seo = getRouteSeoConfig(path);
    const canonicalUrl = toAbsoluteUrl(seo.canonicalPath);
    const ogImageUrl = toAbsoluteUrl(DEFAULT_OG_IMAGE);

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
  }, [path]);

  return null;
}
