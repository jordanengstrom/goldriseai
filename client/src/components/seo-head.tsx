import { useEffect } from "react";
import { getRouteSeoConfig, SITE_NAME, SITE_URL } from "@/lib/seo-keyword-map";

const MANAGED_ATTR = "data-seo-managed";

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

function upsertRouteSpecificSchemas(path: string): void {
  if (path === "/services/ai-audits") {
    upsertJsonLd("seo-schema-service", {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "AI Audit Services",
      serviceType: "AI Audit and Opportunity Assessment",
      provider: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      url: toAbsoluteUrl("/services/ai-audits"),
      description:
        "AI audit services to identify high-impact workflow opportunities, prioritize use cases, and deliver an implementation roadmap.",
    });

    upsertJsonLd("seo-schema-faq", {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How long does an AI audit usually take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most audits are completed in 3 to 4 weeks depending on team availability and process complexity.",
          },
        },
        {
          "@type": "Question",
          name: "Do you require access to sensitive production systems?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. We can start with stakeholder sessions, process documents, and sampled datasets before requesting deeper technical access.",
          },
        },
        {
          "@type": "Question",
          name: "What size company is this best for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AI audits work well for scaling teams that need a focused plan before committing to implementation spend.",
          },
        },
        {
          "@type": "Question",
          name: "What happens after the audit is complete?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You receive a practical roadmap and can choose to execute internally or engage us for implementation support.",
          },
        },
      ],
    });
    return;
  }

  if (path === "/services/ai-education") {
    upsertJsonLd("seo-schema-service", {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "AI Education Services",
      serviceType: "Corporate AI Training and Enablement",
      provider: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      url: toAbsoluteUrl("/services/ai-education"),
      description:
        "AI education services for teams, including practical workshops, role-specific enablement, and responsible adoption guidance.",
    });

    upsertJsonLd("seo-schema-faq", {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Who should attend AI education sessions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We usually train a cross-functional mix of leadership, operations, and technical stakeholders so adoption is consistent across teams.",
          },
        },
        {
          "@type": "Question",
          name: "Can training be customized to our workflows?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We tailor sessions around your existing workflows, tools, and business goals so examples are directly applicable.",
          },
        },
        {
          "@type": "Question",
          name: "How quickly can teams apply what they learn?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most teams can apply core prompting and workflow techniques immediately after the first workshop.",
          },
        },
        {
          "@type": "Question",
          name: "Do you include policy and governance guidance?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We provide practical standards for responsible usage, including review practices and role-based guardrails.",
          },
        },
      ],
    });
    return;
  }

  if (path === "/services/ai-implementation") {
    upsertJsonLd("seo-schema-service", {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "AI Implementation Services",
      serviceType: "AI Systems Implementation and Integration",
      provider: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      url: toAbsoluteUrl("/services/ai-implementation"),
      description:
        "AI implementation services to design, integrate, and deploy production-ready AI workflows with measurable business outcomes.",
    });

    upsertJsonLd("seo-schema-faq", {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How do you choose what to implement first?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We start with use cases that combine high business impact with practical implementation feasibility, then expand from proven wins.",
          },
        },
        {
          "@type": "Question",
          name: "Can you integrate with our current tools and systems?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We design around your existing stack and connect AI workflows to your internal systems through secure integrations.",
          },
        },
        {
          "@type": "Question",
          name: "How do you handle reliability and quality control?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We implement testing, fallback handling, and monitoring so outputs are reviewable, measurable, and production-safe.",
          },
        },
        {
          "@type": "Question",
          name: "Do you provide support after launch?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We offer post-launch optimization, monitoring guidance, and iterative improvements as adoption scales.",
          },
        },
      ],
    });
    return;
  }

  removeJsonLd("seo-schema-service");
  removeJsonLd("seo-schema-faq");
}

type SeoHeadProps = {
  path: string;
};

export function SeoHead({ path }: SeoHeadProps) {
  useEffect(() => {
    const seo = getRouteSeoConfig(path);
    const canonicalUrl = toAbsoluteUrl(seo.canonicalPath);
    const ogImageUrl = toAbsoluteUrl(seo.ogImage);
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

    upsertRouteSpecificSchemas(seo.canonicalPath);
  }, [path]);

  return null;
}
