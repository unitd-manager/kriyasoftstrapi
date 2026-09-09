/**
 * seed-blog-categories.js — Creates the Blog Category collection entries and
 * links every existing article to its category, based on the article's
 * us_title (which was the free-text category before this change).
 *
 * After this runs:
 *   - Content Manager > Blog Category holds the central category list
 *   - Each article is linked to one category via the blog_category relation
 *   - The Blog form shows a category dropdown
 *
 * Run from the project root:  node scripts/seed-blog-categories.js
 * Safe to re-run — skips categories/links that already exist.
 */
"use strict";

async function main() {
  const { createStrapi, compileStrapi } = require("@strapi/strapi");
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = "error";

  try {
    const blogs = app.documents("api::blog.blog");
    const categories = app.documents("api::blog-category.blog-category");

    // 1. Collect the distinct category names from existing articles.
    const allBlogs = await blogs.findMany({
      fields: ["title", "us_title"],
      populate: { blog_category: true },
      pagination: { pageSize: 200 },
    });

    const names = Array.from(
      new Set(allBlogs.map((b) => b.us_title).filter((v) => v && v.trim()))
    );
    console.log(`Distinct categories found on articles: ${names.length} -> ${names.join(", ")}`);

    // 2. Ensure a Blog Category exists for each name.
    const byName = new Map();
    let order = 1;
    for (const name of names) {
      let cat = await categories.findFirst({ filters: { name } });
      if (!cat) {
        cat = await categories.create({
          data: { name, sort_order: order },
          status: "published",
        });
        console.log(`  Created category "${name}"`);
      }
      byName.set(name, cat);
      order += 1;
    }

    // 3. Link each article to its category (skip if already linked).
    let linked = 0;
    for (const blog of allBlogs) {
      if (!blog.us_title || blog.blog_category) {
        continue;
      }
      const cat = byName.get(blog.us_title);
      if (!cat) {
        continue;
      }
      await blogs.update({
        documentId: blog.documentId,
        data: { blog_category: cat.documentId },
        status: "published",
      });
      linked += 1;
    }
    console.log(`Linked ${linked} articles to their category.`);

    // 4. Public read permission for the new collection.
    const publicRole = await app.db.query("plugin::users-permissions.role").findOne({
      where: { type: "public" },
    });
    if (publicRole?.id) {
      const roleService = app.plugin("users-permissions").service("role");
      const role = await roleService.findOne(publicRole.id);
      const perms = role?.permissions?.["api::blog-category"]?.controllers?.["blog-category"];
      if (perms) {
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
          console.log("Enabled public find/findOne on Blog Category.");
        }
      } else {
        console.log("Blog Category permissions not registered yet — restart backend and re-run.");
      }
    }

    console.log("Blog category seed complete.");
  } finally {
    await app.destroy();
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
