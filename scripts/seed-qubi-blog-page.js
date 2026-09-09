/**
 * seed-qubi-blog-page.js — Creates the blog listing page (/resources/blog)
 * as pageBuilder blocks: hero, the article list (fed by the Blog collection),
 * and a subscribe CTA.
 *
 * The articles themselves live in Content Manager > Blog — this page only
 * controls the wrapper content around them.
 *
 * Run from the project root:  node scripts/seed-qubi-blog-page.js [--force]
 * --force overwrites the pageBuilder of an existing "resources/blog" page.
 */
"use strict";

const FORCE = process.argv.includes("--force");
// The Page slug is a uid field and cannot contain "/". The public URL stays
// /resources/blog (a React route); this flat slug is only the CMS identifier.
const SLUG = "resources-blog";

const pageBuilder = [
  {
    __component: "acf-sections.qubi-simple-hero",
    badge_text: "Insights & Perspectives",
    main_title: "The qubi Blog",
    description:
      "Perspectives on enterprise AI execution, operational automation, and the future of work.",
  },
  {
    __component: "acf-sections.qubi-blog-list-section",
    main_title: "Latest Articles",
    show_featured: true,
    max_posts: 50,
  },
  {
    __component: "acf-sections.qubi-subscribe-cta-section",
    main_title: "Get insights delivered to your inbox",
    description:
      "Monthly perspectives on enterprise AI execution, case studies, and operational best practices.",
    button: { label: "Subscribe", url: "", targetBlank: false },
  },
];

async function main() {
  const { createStrapi, compileStrapi } = require("@strapi/strapi");
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = "error";

  try {
    const pages = app.documents("api::page.page");
    const existing = await pages.findFirst({ filters: { slug: SLUG } });

    if (existing && !FORCE) {
      console.log(
        `Page '${SLUG}' already exists (documentId=${existing.documentId}). Re-run with --force to overwrite its pageBuilder.`
      );
    } else if (existing) {
      await pages.update({
        documentId: existing.documentId,
        data: { pageBuilder },
        status: "published",
      });
      console.log(`Updated '${SLUG}' page with ${pageBuilder.length} qubi blocks.`);
    } else {
      const created = await pages.create({
        data: {
          title: "Blog",
          slug: SLUG,
          pageType: "landing",
          showInNav: false,
          pageBuilder,
        },
        status: "published",
      });
      console.log(`Created '${SLUG}' page (documentId=${created.documentId}) with ${pageBuilder.length} qubi blocks.`);
    }
  } finally {
    await app.destroy();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
