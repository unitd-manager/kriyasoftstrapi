/**
 * backfill-page-nav.js — One-time backfill for the Page nav fields
 * (showInNav / navLabel / navOrder), which are null on pages created before
 * those fields existed.
 *
 * Sets the flagship pages to appear in the header menu in the same order as
 * the live site: Home, Customers, Pricing. Any other existing page is left
 * out of the menu (showInNav=false) so nothing unexpected appears; the client
 * can tick it on themselves in the admin at any time.
 *
 * Run from the project root:  node scripts/backfill-page-nav.js
 * Safe to re-run — only fills fields that are still null.
 */
"use strict";

const MENU_PAGES = {
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
    const all = await pages.findMany({ status: "published", fields: ["title", "slug", "showInNav"] });

    for (const page of all) {
      if (page.showInNav !== null && page.showInNav !== undefined) {
        console.log(`Skipped "${page.slug}" (already configured)`);
        continue;
      }

      const menuConfig = MENU_PAGES[page.slug];
      const data = menuConfig
        ? { showInNav: true, navLabel: menuConfig.navLabel, navOrder: menuConfig.navOrder }
        : { showInNav: false };

      await pages.update({ documentId: page.documentId, data, status: "published" });

      console.log(
        menuConfig
          ? `Menu: "${page.slug}" -> ${menuConfig.navLabel} (order ${menuConfig.navOrder})`
          : `Hidden from menu: "${page.slug}" (client can enable in admin)`
      );
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
