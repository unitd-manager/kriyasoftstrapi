/**
 * backfill-page-nav-flags.js — One-time fix for pages created before the
 * showInNav/navLabel/navOrder fields existed on the Page schema. Adding a
 * new column doesn't retroactively write its default value into existing
 * rows, so without this, older pages would silently stay out of the menu
 * even though newly created pages get showInNav=true automatically.
 *
 * - Home / Customers / Pricing get explicit labels and a fixed order,
 *   matching the live site's menu order.
 * - Any other existing page just gets showInNav=true (so it appears too),
 *   without touching pages that already have the field set.
 *
 * Run from the project root:  node scripts/backfill-page-nav-flags.js
 * Safe to re-run.
 */
"use strict";

const FLAGSHIP_ORDER = {
  home: { navLabel: "Home", navOrder: 1 },
  customers: { navLabel: "Customers", navOrder: 2 },
  pricing: { navLabel: "Pricing", navOrder: 3 },
};

async function main() {
  const { createStrapi, compileStrapi } = require("@strapi/strapi");
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = "error";

  try {
    const pages = app.documents("api::page.page");
    const all = await pages.findMany({ fields: ["title", "slug", "showInNav", "navOrder"] });

    for (const page of all) {
      const flagship = FLAGSHIP_ORDER[page.slug];
      const needsBackfill = page.showInNav === null || page.showInNav === undefined;

      if (!flagship && !needsBackfill) {
        continue;
      }

      const data = flagship
        ? { showInNav: true, navLabel: flagship.navLabel, navOrder: flagship.navOrder }
        : { showInNav: true };

      await pages.update({ documentId: page.documentId, data, status: "published" });
      console.log(`Updated "${page.slug}": ${JSON.stringify(data)}`);
    }

    console.log("Backfill complete.");
  } finally {
    await app.destroy();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
