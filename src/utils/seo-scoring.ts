/**
 * SEO scoring engine — matched to the FULL shared.seo component:
 * metaTitle, metaDescription, focusKeyword, keywords, canonicalURL,
 * metaImage, ogTitle, ogDescription, ogImage, twitterCard, schema,
 * seoScore, seoAnalysis, noIndex.
 */

export interface SeoInput {
  title?: string | null;
  slug?: string | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    focusKeyword?: string | null;
    keywords?: string | null;
    canonicalURL?: string | null;
    metaImage?: unknown;
    ogTitle?: string | null;
    ogDescription?: string | null;
    ogImage?: unknown;
    twitterCard?: string | null;
    schema?: unknown;
    noIndex?: boolean | null;
  } | null;
}

export interface SeoCheck {
  id: string;
  label: string;
  passed: boolean;
  suggestion: string;
}

export interface SeoAnalysis {
  checks: SeoCheck[];
  checksPassed: number;
  checksTotal: number;
  focusKeyword: string;
  topIssues: Array<{ id: string; label: string }>;
  suggestions: string[];
}

function isNonEmptyObject(value: unknown): boolean {
  return Boolean(value) && typeof value === "object" && Object.keys(value as object).length > 0;
}

export function analyzeSeo(input: SeoInput): SeoAnalysis {
  const slug = input.slug?.trim().toLowerCase() ?? "";
  const seo = input.seo ?? {};
  const metaTitle = seo.metaTitle?.trim() ?? "";
  const metaDescription = seo.metaDescription?.trim() ?? "";
  const focusKeyword = seo.focusKeyword?.trim().toLowerCase() ?? "";
  const ogTitle = seo.ogTitle?.trim() ?? "";
  const ogDescription = seo.ogDescription?.trim() ?? "";

  // Homepage slug ("home" or empty, mapped to "/" by the frontend) is
  // exempted from the "keyword in slug" check rather than counted as an
  // unfixable failure — it should not need renaming just for this score.
  const isHomepage = slug === "home" || slug === "";

  const allChecks: SeoCheck[] = [
    {
      id: "focus-keyword-set",
      label: "Focus keyword is set",
      passed: focusKeyword.length > 0,
      suggestion: "Set a focus keyword — the rest of the keyword checks below depend on it.",
    },
    {
      id: "meta-title-length",
      label: "Meta title length (30–60 characters)",
      passed: metaTitle.length >= 30 && metaTitle.length <= 60,
      suggestion: "Keep the meta title between 30–60 characters so it doesn't get truncated in search results.",
    },
    {
      id: "keyword-in-title",
      label: "Focus keyword appears in the meta title",
      passed: !!focusKeyword && metaTitle.toLowerCase().includes(focusKeyword),
      suggestion: "Include the focus keyword in the meta title.",
    },
    {
      id: "meta-description-length",
      label: "Meta description length (120–160 characters)",
      passed: metaDescription.length >= 120 && metaDescription.length <= 160,
      suggestion: "Write a meta description between 120–160 characters to maximize search-result click-through.",
    },
    {
      id: "keyword-in-description",
      label: "Focus keyword appears in the meta description",
      passed: !!focusKeyword && metaDescription.toLowerCase().includes(focusKeyword),
      suggestion: "Include the focus keyword in the meta description.",
    },
    {
      id: "keyword-in-slug",
      label: "Focus keyword appears in the URL slug",
      passed: !!focusKeyword && slug.includes(focusKeyword.replace(/\s+/g, "-")),
      suggestion: "Use the focus keyword in the URL slug.",
    },
    {
      id: "canonical-url-set",
      label: "Canonical URL is set",
      passed: Boolean(seo.canonicalURL?.trim()),
      suggestion: "Set the Canonical URL to this page's full live URL to avoid duplicate-content issues.",
    },
    {
      id: "og-title-set",
      label: "Open Graph title is set",
      passed: ogTitle.length > 0,
      suggestion: "Fill in the Open Graph title so shared links show a proper title on social media.",
    },
    {
      id: "og-description-set",
      label: "Open Graph description is set",
      passed: ogDescription.length > 0,
      suggestion: "Fill in the Open Graph description so shared links show a proper preview on social media.",
    },
    {
      id: "og-image-set",
      label: "Open Graph or meta image is set",
      passed: Boolean(seo.ogImage || seo.metaImage),
      suggestion: "Upload an Open Graph (or meta) image so shared links show a preview image.",
    },
    {
      id: "twitter-card-set",
      label: "Twitter card type is set",
      passed: Boolean(seo.twitterCard),
      suggestion: "Choose a Twitter card type (summary or summary_large_image).",
    },
    {
      id: "schema-set",
      label: "Structured data (schema.org JSON-LD) is set",
      passed: isNonEmptyObject(seo.schema),
      suggestion: "Add JSON-LD structured data so search engines can better understand this page.",
    },
    {
      id: "not-noindex",
      label: "Page is indexable (noIndex is off)",
      passed: seo.noIndex !== true,
      suggestion: "This page has 'No Index' enabled, so search engines won't index it — turn it off unless that's intentional.",
    },
  ];

  const checks = isHomepage ? allChecks.filter((c) => c.id !== "keyword-in-slug") : allChecks;

  const checksPassed = checks.filter((c) => c.passed).length;
  const failed = checks.filter((c) => !c.passed);

  return {
    checks,
    checksPassed,
    checksTotal: checks.length,
    focusKeyword,
    topIssues: failed.map((c) => ({ id: c.id, label: c.label })),
    suggestions: failed.map((c) => c.suggestion),
  };
}

/** 0-100 score, rounded. seoScore is now an integer field. */
export function computeSeoScore(analysis: SeoAnalysis): number {
  if (analysis.checksTotal === 0) return 0;
  return Math.round((analysis.checksPassed / analysis.checksTotal) * 100);
}