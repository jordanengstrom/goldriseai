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
