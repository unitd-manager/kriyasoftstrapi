import { factories } from '@strapi/strapi';
import { buildDynamicZonePopulate } from '../../../utils/deep-populate';

const PAGE_BUILDER_COMPONENTS = [
  'acf-sections.qubi-services-hero',
  'acf-sections.qubi-services-list',
  'acf-sections.qubi-services-capabilities',
  'acf-sections.qubi-services-process',
  'acf-sections.qubi-services-cta',
  'acf-sections.qubi-client-ticker',
  'acf-sections.qubi-home-services',
  'acf-sections.qubi-home-hero',
  'acf-sections.qubi-demo-preview',
  'acf-sections.qubi-problem-section',
  'acf-sections.qubi-capabilities-section',
  'acf-sections.qubi-outcomes-section',
  'acf-sections.qubi-how-it-works-section',
  'acf-sections.qubi-use-cases-section',
  'acf-sections.qubi-integration-section',
  'acf-sections.qubi-human-in-loop-section',
  'acf-sections.qubi-analytics-section',
  'acf-sections.qubi-final-cta-section',
  'acf-sections.qubi-simple-hero',
  'acf-sections.qubi-stats-section',
  'acf-sections.qubi-case-studies-section',

  // QUBI Differentiators
  'acf-sections.qubi-differentiators-section',

  'acf-sections.qubi-story-section',
  'acf-sections.qubi-callout-section',
  'acf-sections.qubi-plans-section',
  'acf-sections.qubi-icon-grid-section',
  'acf-sections.qubi-execution-section',
  'acf-sections.qubi-comparison-section',
  'acf-sections.qubi-faq-section',
  'acf-sections.qubi-blog-list-section',
  'acf-sections.qubi-subscribe-cta-section',

  // Solutions
  'acf-sections.solutions-hero-banner',
  'acf-sections.solutions-stats-band',
  'acf-sections.solutions-use-cases-layout',
  'acf-sections.solutions-industry-layout',
  'acf-sections.solutions-execution-flow',
  'acf-sections.solutions-final-cta',
  'acf-sections.solutions-comparison-block',
  'acf-sections.solutions-problems-block',
  'acf-sections.solutions-what-we-do',

  // Demo
  'acf-sections.demo-sections-hero',
  'acf-sections.demo-sections-video-showcase',
  'acf-sections.demo-sections-capability-card',
  'acf-sections.demo-sections-contact-cta',

  // FAQ
  'acf-sections.faq-hero',
  'acf-sections.faq-list',
  'acf-sections.faq-cta',
];

export default factories.createCoreController(
  'api::page.page',
  ({ strapi }) => ({
    async findBySlug(ctx) {
      const { slug } = ctx.params;

      const entries = await strapi
        .documents('api::page.page')
        .findMany({
          filters: { slug },
          status: 'published',

          populate: {
            pageBuilder: {
              on: buildDynamicZonePopulate(PAGE_BUILDER_COMPONENTS),
            },

            seo: {
              populate: {
                ogImage: true,
                metaImage: true,
              },
            },
          },
        });

      if (!entries || entries.length === 0) {
        return ctx.notFound();
      }

      ctx.body = {
        data: entries[0],
      };
    },
  })
);