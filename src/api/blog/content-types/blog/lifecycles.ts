import { analyzeSeo, computeSeoScore } from '../../../../utils/seo-scoring';

type BlogEntry = Record<string, any>;

function isPlainObject(value: unknown): value is BlogEntry {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

// Blog has no `slug` field (it's routed by id/documentId — see
// getBlogById/getBlogByDocumentId on the frontend), so the "keyword in
// slug" check is always exempted here, same as it is for the homepage.
function applySeoScore(entry: BlogEntry) {
  const analysis = analyzeSeo({
    title: entry.title,
    slug: undefined,
    seo: entry.seo,
  });

  const score = computeSeoScore(analysis);

  entry.seo = {
    ...(entry.seo ?? {}),
    seoScore: score,
    seoAnalysis: analysis,
  };
}

export default {
  beforeCreate(event: { params?: { data?: unknown } }) {
    if (isPlainObject(event.params?.data)) {
      applySeoScore(event.params.data);
    }
  },

  beforeUpdate(event: { params?: { data?: unknown } }) {
    if (isPlainObject(event.params?.data)) {
      applySeoScore(event.params.data);
    }
  },
};