/**
 * seed-footer.js — Fills the new self-contained Footer single type (company
 * name + links) and cleans up the old approach by removing footer entries
 * from the Menu Item collection.
 *
 * After this the whole footer is edited in ONE place: Content Manager > Footer.
 *
 * Run from the project root:  node scripts/seed-footer.js
 * Safe to re-run.
 */
"use strict";

const FOOTER_DATA = {
  // Fully editable in the admin. "{year}" is replaced with the current year
  // by the frontend, so the copyright stays current without hardcoding.
  copyright_text: "© {year} qubi by Qbotica. All rights reserved.",
  links: [
    { label: "Privacy Policy", url: "#", targetBlank: false },
    { label: "Terms of Service", url: "#", targetBlank: false },
    { label: "Contact Qubi", url: "#", targetBlank: false },
  ],
};

async function main() {
  const { createStrapi, compileStrapi } = require("@strapi/strapi");
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = "error";

  try {
    // 1. Fill the Footer single type.
    const footer = app.documents("api::footer.footer");
    const existing = await footer.findFirst({});
    if (existing) {
      await footer.update({ documentId: existing.documentId, data: FOOTER_DATA, status: "published" });
    } else {
      await footer.create({ data: FOOTER_DATA, status: "published" });
    }
    console.log(`Footer set: "${FOOTER_DATA.copyright_text}" + ${FOOTER_DATA.links.length} links.`);

    // 2. Remove the old footer entries from Menu Item (header items stay).
    const items = app.documents("api::menu-item.menu-item");
    const footerItems = await items.findMany({ filters: { location: "footer" }, pagination: { pageSize: 100 } });
    for (const item of footerItems) {
      await items.delete({ documentId: item.documentId });
    }
    console.log(`Removed ${footerItems.length} old footer entries from Menu Item.`);

    // 3. Public read permission for the Footer.
    const publicRole = await app.db.query("plugin::users-permissions.role").findOne({
      where: { type: "public" },
    });
    if (publicRole?.id) {
      const roleService = app.plugin("users-permissions").service("role");
      const role = await roleService.findOne(publicRole.id);
      const perms = role?.permissions?.["api::footer"]?.controllers?.footer;
      if (perms?.find && !perms.find.enabled) {
        perms.find.enabled = true;
        await roleService.updateRole(publicRole.id, {
          name: role.name,
          description: role.description,
          permissions: role.permissions,
        });
        console.log("Enabled public find on Footer.");
      } else if (!perms) {
        console.log("Footer permissions not registered yet — restart backend and re-run.");
      }
    }

    console.log("Footer seed complete.");
  } finally {
    await app.destroy();
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
