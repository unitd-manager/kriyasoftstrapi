/**
 * seed-menu.js — Populates the Menu Manager (menu-item collection) and Site
 * Settings so the header and footer are fully driven from the admin.
 *
 * Header:  Home · Customers · Pricing · Resources ▾ (Blog, Product Demo, FAQs)
 *          · Solutions ▾ (Use Cases, Industries)
 * Footer:  Privacy Policy · Terms of Service · Contact Qubi
 * Settings: footer company name + the Book a Demo CTA.
 *
 * Run from the project root:  node scripts/seed-menu.js
 * Safe to re-run — skips items that already exist (matched by label+location).
 */
"use strict";

const DEMO_URL = "https://meetings.hubspot.com/maheshv";

const HEADER = [
  { label: "Home", url: "/", order: 1 },
  { label: "Customers", url: "/customers", order: 2 },
  { label: "Pricing", url: "/pricing", order: 3 },
  {
    label: "Resources",
    url: "",
    order: 4,
    children: [
      { label: "Blog", url: "/resources/blog", order: 1 },
      { label: "Product Demo", url: "/resources/demo", order: 2 },
      { label: "FAQs", url: "/resources/faqs", order: 3 },
    ],
  },
  {
    label: "Solutions",
    url: "",
    order: 5,
    children: [
      { label: "Use Cases", url: "/solutions/use-cases", order: 1 },
      { label: "Industries", url: "/solutions/industries", order: 2 },
    ],
  },
];

const FOOTER = [
  { label: "Privacy Policy", url: "#", order: 1 },
  { label: "Terms of Service", url: "#", order: 2 },
  { label: "Contact Qubi", url: "#", order: 3 },
];

async function main() {
  const { createStrapi, compileStrapi } = require("@strapi/strapi");
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = "error";

  try {
    const items = app.documents("api::menu-item.menu-item");

    const ensure = async (data, parentDocId) => {
      const existing = await items.findFirst({
        filters: { label: data.label, location: data.location },
      });
      if (existing) {
        return existing;
      }
      const created = await items.create({
        data: { ...data, parent: parentDocId ?? undefined },
        status: "published",
      });
      console.log(`  ${data.location}: "${data.label}"${parentDocId ? " (child)" : ""}`);
      return created;
    };

    console.log("Seeding header menu...");
    for (const top of HEADER) {
      const parent = await ensure(
        { label: top.label, url: top.url, location: "header", order: top.order },
        null
      );
      for (const child of top.children ?? []) {
        await ensure(
          { label: child.label, url: child.url, location: "header", order: child.order },
          parent.documentId
        );
      }
    }

    console.log("Seeding footer menu...");
    for (const f of FOOTER) {
      await ensure({ label: f.label, url: f.url, location: "footer", order: f.order }, null);
    }

    console.log("Seeding site settings...");
    const settings = app.documents("api::site-setting.site-setting");
    const existingSettings = await settings.findFirst({});
    const settingsData = {
      footer_company_name: "qubi by Qbotica",
      cta_label: "Book a Demo",
      cta_url: DEMO_URL,
    };
    if (existingSettings) {
      await settings.update({ documentId: existingSettings.documentId, data: settingsData, status: "published" });
    } else {
      await settings.create({ data: settingsData, status: "published" });
    }
    console.log("  Site settings set.");

    // Public read permissions.
    const publicRole = await app.db.query("plugin::users-permissions.role").findOne({
      where: { type: "public" },
    });
    if (publicRole?.id) {
      const roleService = app.plugin("users-permissions").service("role");
      const role = await roleService.findOne(publicRole.id);
      let changed = false;
      const grants = [
        ["api::menu-item", "menu-item", ["find", "findOne"]],
        ["api::site-setting", "site-setting", ["find"]],
      ];
      for (const [api, controller, actions] of grants) {
        const perms = role?.permissions?.[api]?.controllers?.[controller];
        if (!perms) {
          console.log(`  ${api} permissions not registered yet — restart backend and re-run.`);
          continue;
        }
        for (const action of actions) {
          if (perms[action] && !perms[action].enabled) {
            perms[action].enabled = true;
            changed = true;
          }
        }
      }
      if (changed) {
        await roleService.updateRole(publicRole.id, {
          name: role.name,
          description: role.description,
          permissions: role.permissions,
        });
        console.log("  Public read permissions enabled.");
      }
    }

    console.log("Menu seed complete.");
  } finally {
    await app.destroy();
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
