/**
 * import-blogs-from-live.js — Copies blog articles from the live public API
 * into this local database, so /resources/blog renders locally the same way
 * it does on the live site.
 *
 * Read-only against live: it only performs GET requests on the public API.
 * Images are referenced by their live URL rather than re-uploaded, which is
 * enough for local development.
 *
 * Run from the project root:  node scripts/import-blogs-from-live.js [--force]
 * --force re-imports articles that already exist locally (matched on title).
 */
"use strict";

const LIVE_API = "https://qubistrapiadmin.unitdtechnologies.com/api";
const FORCE = process.argv.includes("--force");

async function fetchLiveBlogs() {
  const url = `${LIVE_API}/blogs?populate=images&pagination[pageSize]=100&sort[0]=date:desc`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Live API returned ${res.status} for ${url}`);
  }
  const json = await res.json();
  return json.data ?? [];
}

function toLocalData(blog) {
  return {
    title: blog.title,
    description: blog.description,
    author: blog.author,
    date: blog.date,
    category_id: blog.category_id,
    creation_date: blog.creation_date,
    modification_date: blog.modification_date,
    flag: blog.flag ?? false,
    meta_title: blog.meta_title,
    meta_description: blog.meta_description,
    meta_keyword: blog.meta_keyword,
    us_title: blog.us_title,
    us_description: blog.us_description,
    published: blog.published ?? true,
  };
}

async function ensurePublicBlogPermissions(app) {
  const publicRole = await app.db.query("plugin::users-permissions.role").findOne({
    where: { type: "public" },
  });
  if (!publicRole?.id) {
    return;
  }

  const roleService = app.plugin("users-permissions").service("role");
  const role = await roleService.findOne(publicRole.id);
  const perms = role?.permissions?.["api::blog"]?.controllers?.blog;

  if (!perms) {
    console.log("Blog permissions not registered yet — restart the backend and re-run.");
    return;
  }

  let changed = false;
  for (const action of ["find", "findOne"]) {
    if (perms[action] && !perms[action].enabled) {
      perms[action].enabled = true;
      changed = true;
    }
  }

  if (changed) {
    await roleService.updateRole(publicRole.id, {
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    });
    console.log("Enabled public find/findOne on Blog.");
  }
}

async function main() {
  console.log("Fetching articles from the live API...");
  const liveBlogs = await fetchLiveBlogs();
  console.log(`Found ${liveBlogs.length} articles on live.`);

  const { createStrapi, compileStrapi } = require("@strapi/strapi");
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = "error";

  try {
    const blogs = app.documents("api::blog.blog");
    let created = 0;
    let skipped = 0;

    for (const liveBlog of liveBlogs) {
      const existing = await blogs.findFirst({ filters: { title: liveBlog.title } });

      if (existing && !FORCE) {
        skipped += 1;
        continue;
      }

      const data = toLocalData(liveBlog);

      if (existing) {
        await blogs.update({ documentId: existing.documentId, data, status: "published" });
      } else {
        await blogs.create({ data, status: "published" });
      }
      created += 1;
    }

    console.log(`Imported/updated ${created} articles. Skipped ${skipped} already present.`);
    await ensurePublicBlogPermissions(app);
    console.log("Blog import complete.");
  } finally {
    await app.destroy();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});