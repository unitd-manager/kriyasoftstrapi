import { factories } from '@strapi/strapi';
import { buildDynamicZonePopulate } from '../../../utils/deep-populate';

const RESOURCE_PAGE_BUILDER_COMPONENTS = [
  'sections.hero', 'sections.cta', 'sections.faq-section', 'sections.gallery',
  'sections.testimonial-section', 'acf-sections.demo-sections-capability-card',
  'acf-sections.demo-sections-contact-cta', 'acf-sections.demo-sections-hero',
  'acf-sections.demo-sections-video-showcase', 'acf-sections.faq-cta',
  'acf-sections.faq-group', 'acf-sections.faq-hero', 'acf-sections.faq-item',
  'acf-sections.faq-list', 'acf-sections.footer', 'acf-sections.hero',
  'acf-sections.qubi-analytics-section', 'acf-sections.qubi-blog-list-section',
  'acf-sections.qubi-callout-section', 'acf-sections.qubi-capabilities-section',
  'acf-sections.qubi-case-studies-section', 'acf-sections.qubi-comparison-section',
  'acf-sections.qubi-demo-preview', 'acf-sections.qubi-execution-section',
  'acf-sections.qubi-faq-section', 'acf-sections.qubi-final-cta-section',
  'acf-sections.qubi-home-hero', 'acf-sections.qubi-how-it-works-section',
  'acf-sections.qubi-human-in-loop-section', 'acf-sections.qubi-icon-grid-section',
  'acf-sections.qubi-integration-section', 'acf-sections.qubi-outcomes-section',
  'acf-sections.qubi-plans-section', 'acf-sections.qubi-problem-section',
  'acf-sections.qubi-simple-hero', 'acf-sections.qubi-stats-section',
  'acf-sections.qubi-story-section', 'acf-sections.qubi-subscribe-cta-section',
  'acf-sections.qubi-use-cases-section', 'acf-sections.roundtable-sessions-sections',
  'acf-sections.section-space-padding', 'acf-sections.session-item-sections',
  'acf-sections.solutions-comparison-block', 'acf-sections.solutions-execution-flow',
  'acf-sections.solutions-final-cta', 'acf-sections.solutions-hero-banner',
  'acf-sections.solutions-industry-layout', 'acf-sections.solutions-problems-block',
  'acf-sections.solutions-stats-band', 'acf-sections.solutions-use-cases-layout',
  'acf-sections.solutions-what-we-do',
];

export default factories.createCoreController('api::resource-page.resource-page', ({ strapi }) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const entries = await strapi.documents('api::resource-page.resource-page').findMany({
      filters: { slug },
      status: 'published',
      populate: {
        pageBuilder: { on: buildDynamicZonePopulate(RESOURCE_PAGE_BUILDER_COMPONENTS) },
        seo: { populate: { ogImage: true, metaImage: true } },
      },
    });

    if (!entries || entries.length === 0) return ctx.notFound();
    ctx.body = { data: entries[0] };
  },
}));