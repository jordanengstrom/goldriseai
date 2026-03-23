export type SearchIntent =
  | "commercial-investigation"
  | "transactional"
  | "informational-trust"
  | "informational-legal"
  | "commercial-high-intent";

export type KeywordMapEntry = {
  path: string;
  primaryKeyword: string;
  intent: SearchIntent;
  secondaryKeywords: string[];
  titleAngle: string;
  conversionCta: string;
  planned: boolean;
};

// SEO-001 source of truth. This map is consumed by later SEO tickets
// (metadata, content, and internal-link optimization).
export const seoKeywordMap: KeywordMapEntry[] = [
  {
    path: "/",
    primaryKeyword: "ai consulting services",
    intent: "commercial-investigation",
    secondaryKeywords: [
      "enterprise ai consulting",
      "ai strategy consulting",
      "ai transformation consulting",
      "ai services partner",
      "business ai consulting",
    ],
    titleAngle: "Enterprise AI Consulting Services for Growth-Focused Teams",
    conversionCta: "Book an intro call",
    planned: false,
  },
  {
    path: "/services",
    primaryKeyword: "ai services company",
    intent: "commercial-investigation",
    secondaryKeywords: [
      "ai services for businesses",
      "ai solutions company",
      "ai consulting and implementation",
      "ai services provider us",
      "enterprise ai services",
    ],
    titleAngle: "AI Services Company: Audits, Education, Implementation",
    conversionCta: "Explore services",
    planned: false,
  },
  {
    path: "/contact",
    primaryKeyword: "contact ai consultants",
    intent: "transactional",
    secondaryKeywords: [
      "ai consultation request",
      "talk to ai expert",
      "ai services inquiry",
      "request ai assessment",
      "schedule ai consultation",
    ],
    titleAngle: "Contact AI Consultants",
    conversionCta: "Submit contact form",
    planned: false,
  },
  {
    path: "/values",
    primaryKeyword: "ai company values",
    intent: "informational-trust",
    secondaryKeywords: [
      "responsible ai consulting",
      "ai ethics consulting",
      "transparent ai partner",
      "human-centered ai services",
      "trustworthy ai company",
    ],
    titleAngle: "Our Values: Responsible and Practical AI Services",
    conversionCta: "Start a conversation",
    planned: false,
  },
  {
    path: "/terms",
    primaryKeyword: "ai consulting terms and conditions",
    intent: "informational-legal",
    secondaryKeywords: [
      "ai services terms",
      "consulting agreement terms",
      "service terms ai provider",
      "ai project terms",
      "ai consulting legal terms",
    ],
    titleAngle: "Terms and Conditions for AI Consulting Services",
    conversionCta: "Contact us for clarification",
    planned: false,
  },
  {
    path: "/services/ai-audits",
    primaryKeyword: "ai audit services",
    intent: "commercial-high-intent",
    secondaryKeywords: [
      "ai readiness assessment",
      "ai opportunity audit",
      "enterprise ai audit",
      "ai maturity assessment",
      "ai audit consulting",
    ],
    titleAngle: "AI Audit Services: Find High-ROI AI Opportunities",
    conversionCta: "Request an AI audit",
    planned: true,
  },
  {
    path: "/services/ai-education",
    primaryKeyword: "ai training services for teams",
    intent: "commercial-high-intent",
    secondaryKeywords: [
      "ai workshops for businesses",
      "corporate ai training",
      "prompt engineering training",
      "ai enablement program",
      "ai upskilling services",
    ],
    titleAngle: "AI Education Services for Teams: Training and Enablement",
    conversionCta: "Plan team training",
    planned: true,
  },
  {
    path: "/services/ai-implementation",
    primaryKeyword: "ai implementation services",
    intent: "commercial-high-intent",
    secondaryKeywords: [
      "custom ai implementation",
      "llm integration services",
      "ai automation implementation",
      "production ai deployment",
      "ai solution development",
    ],
    titleAngle: "AI Implementation Services: From Strategy to Production",
    conversionCta: "Start implementation planning",
    planned: true,
  },
];

export const SITE_NAME = "Goldrise AI";
export const SITE_URL = "https://goldrise.ai";

export type RouteSeoConfig = {
  title: string;
  description: string;
  canonicalPath: string;
  robots: string;
  ogType: "website";
};

const INDEX_ROBOTS = "index, follow, max-image-preview:large";
const NOINDEX_ROBOTS = "noindex, nofollow";

const descriptionByPath: Partial<Record<string, string>> = {
  "/": "Goldrise AI delivers enterprise AI consulting services that help teams identify opportunities, train teams, and implement production-ready AI solutions.",
  "/services": "Explore Goldrise AI services including AI audits, AI education, and AI implementation to accelerate measurable business outcomes.",
  "/contact": "Contact Goldrise AI to discuss your AI services goals and submit your project details for a fast follow-up from our team.",
  "/values": "Learn the principles behind Goldrise AI, including practical delivery, responsible AI adoption, and long-term client partnership.",
  "/terms": "Review terms and conditions for Goldrise AI consulting services, including payment, IP, liability, and service usage terms.",
};

const keywordEntryByPath = new Map(
  seoKeywordMap.map((entry) => [entry.path, entry] as const),
);

function normalizePath(path: string): string {
  const cleanPath = path.split("?")[0]?.split("#")[0] || "/";
  if (cleanPath.length > 1 && cleanPath.endsWith("/")) {
    return cleanPath.slice(0, -1);
  }
  return cleanPath || "/";
}

function buildTitle(entry: KeywordMapEntry): string {
  return `${entry.titleAngle} | ${SITE_NAME}`;
}

function buildDescription(entry: KeywordMapEntry): string {
  const customDescription = descriptionByPath[entry.path];
  if (customDescription) {
    return customDescription;
  }

  const joinedSecondary = entry.secondaryKeywords.slice(0, 3).join(", ");
  return `${entry.titleAngle}. Focus areas include ${joinedSecondary}. ${entry.conversionCta}.`;
}

export function getRouteSeoConfig(path: string): RouteSeoConfig {
  const normalizedPath = normalizePath(path);
  const entry = keywordEntryByPath.get(normalizedPath);

  if (entry && !entry.planned) {
    return {
      title: buildTitle(entry),
      description: buildDescription(entry),
      canonicalPath: entry.path,
      robots: INDEX_ROBOTS,
      ogType: "website",
    };
  }

  if (normalizedPath === "/payments") {
    return {
      title: `Payments and Billing | ${SITE_NAME}`,
      description: "Secure invoice lookup and payment portal for existing Goldrise AI clients.",
      canonicalPath: "/payments",
      robots: NOINDEX_ROBOTS,
      ogType: "website",
    };
  }

  return {
    title: `Page Not Found | ${SITE_NAME}`,
    description: "The page you requested could not be found.",
    canonicalPath: "/",
    robots: NOINDEX_ROBOTS,
    ogType: "website",
  };
}

export const sitemapPaths = ["/", "/services", "/values", "/contact", "/terms"] as const;

export const moneyPagePaths = ["/", "/services", "/contact"] as const;

function setsEqual(a: Set<string>, b: Set<string>): boolean {
  if (a.size !== b.size) {
    return false;
  }

  for (const value of a) {
    if (!b.has(value)) {
      return false;
    }
  }

  return true;
}

export function assertSeo006Hygiene(liveRoutePaths: string[]): void {
  const uniqueRoutePaths = Array.from(new Set(liveRoutePaths));

  const indexableSeoPaths = seoKeywordMap
    .filter((entry) => !entry.planned)
    .map((entry) => entry.path);

  const indexableRoutePaths = uniqueRoutePaths.filter((path) => {
    const config = getRouteSeoConfig(path);
    return config.robots.startsWith("index");
  });

  const indexableRouteSet = new Set(indexableRoutePaths);
  const indexableSeoSet = new Set(indexableSeoPaths);
  const sitemapSet = new Set<string>(sitemapPaths);

  if (!setsEqual(indexableRouteSet, indexableSeoSet)) {
    throw new Error(
      "SEO-006 violation: indexable live routes do not match non-planned SEO keyword map paths.",
    );
  }

  if (!setsEqual(sitemapSet, indexableSeoSet)) {
    throw new Error(
      "SEO-006 violation: sitemap paths do not match indexable non-planned SEO paths.",
    );
  }

  for (const path of moneyPagePaths) {
    const config = getRouteSeoConfig(path);

    if (!config.robots.startsWith("index")) {
      throw new Error(
        `SEO-006 violation: money page ${path} must be indexable but is marked ${config.robots}.`,
      );
    }

    if (config.canonicalPath !== path) {
      throw new Error(
        `SEO-006 violation: canonical mismatch for ${path}; expected ${path}, received ${config.canonicalPath}.`,
      );
    }
  }
}

export function assertUniquePrimaryKeywords(entries: KeywordMapEntry[]): void {
  const seen = new Map<string, string>();

  for (const entry of entries) {
    const keyword = entry.primaryKeyword.trim().toLowerCase();
    const existingPath = seen.get(keyword);

    if (existingPath) {
      throw new Error(
        `SEO-001 violation: duplicate primary keyword "${entry.primaryKeyword}" found for ${existingPath} and ${entry.path}.`,
      );
    }

    seen.set(keyword, entry.path);
  }
}
