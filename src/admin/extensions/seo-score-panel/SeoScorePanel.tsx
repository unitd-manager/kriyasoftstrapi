import type { PanelComponent, PanelComponentProps } from '@strapi/content-manager/strapi-admin';
import { analyzeSeo, computeSeoScore } from '../../../utils/seo-scoring';

// Both Page and Blog use the same title + seo shape.
type ScoredDocument = {
  title?: string;
  slug?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    focusKeyword?: string;
    keywords?: string;
    canonicalURL?: string;
    metaImage?: unknown;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: unknown;
    twitterCard?: string;
    schema?: unknown;
    noIndex?: boolean;
  };
};

// Content types this panel shows up on.
const SUPPORTED_MODELS = ['api::page.page', 'api::blog.blog', 'api::resource-page.resource-page'];

const SeoScorePanel: PanelComponent = ({ model, document }: PanelComponentProps) => {
  if (!SUPPORTED_MODELS.includes(model)) {
    return null;
  }

  const entry = (document ?? {}) as ScoredDocument;
  const analysis = analyzeSeo({ title: entry.title, slug: entry.slug, seo: entry.seo });
  const score = computeSeoScore(analysis);

  const scoreColor = score >= 80 ? '#2f7f3e' : score >= 50 ? '#b8860b' : '#b02a2a';
  const scoreLabel = score >= 80 ? 'GOOD' : score >= 50 ? 'NEEDS WORK' : 'POOR';

  return {
    title: 'SEO Summary',
    content: (
      <div style={{ padding: '12px 4px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40, fontWeight: 700, color: scoreColor, lineHeight: 1 }}>{score}</div>
          <div style={{ fontSize: 11, color: '#666' }}>SEO score</div>
          <div style={{ fontSize: 11, fontWeight: 600, color: scoreColor, marginTop: 4 }}>{scoreLabel}</div>
        </div>

        <div>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Overview</div>
          <div style={{ fontSize: 12, color: '#666' }}>
            Checks {analysis.checksPassed}/{analysis.checksTotal} passed
          </div>
          {analysis.focusKeyword && (
            <div style={{ fontSize: 12, color: '#666' }}>Focus keyword: {analysis.focusKeyword}</div>
          )}
        </div>

        {analysis.topIssues.length > 0 && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Top Issues</div>
            {analysis.topIssues.map((issue) => (
              <div key={issue.id} style={{ fontSize: 12, color: '#b02a2a' }}>
                {issue.label}
              </div>
            ))}
          </div>
        )}

        {analysis.suggestions.length > 0 && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Suggestions</div>
            <div style={{ fontSize: 12, color: '#666' }}>{analysis.suggestions[0]}</div>
          </div>
        )}
      </div>
    ),
  };
};

export default SeoScorePanel;