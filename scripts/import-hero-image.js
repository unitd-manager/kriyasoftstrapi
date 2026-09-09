/**
 * import-hero-image.js — Copies the home hero image from the live site into
 * this local media library and attaches it to the Home page's hero block.
 *
 * Why: on live the hero image comes from the legacy "sections" collection,
 * which does not exist in this database. The qubi-home-hero block has its own
 * hero_image field, so we attach it there instead — that is the modern path
 * and makes the image editable by the client in the page builder.
 *
 * Read-only against live: downloads the file over HTTP, nothing is written
 * to production.
 *
 * Run from the project root:  node scripts/import-hero-image.js
 * Safe to re-run — skips if the hero block already has an image.
 */
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");

const LIVE_API = "https://qubistrapiadmin.unitdtechnologies.com";
const HERO_SECTION_URL = `${LIVE_API}/api/sections?populate=images&filters[section_type][$eq]=hero&filters[published][$eq]=true`;

async function findLiveHeroImage() {
  const res = await fetch(HERO_SECTION_URL);
  if (!res.ok) {
    throw new Error(`Live API returned ${res.status}`);
  }
  const json = await res.json();
  const image = json.data?.[0]?.images?.[0];
  if (!image?.url) {
    throw new Error("No hero image found on live");
  }
  return image;
}

async function downloadToTemp(image) {
  const url = image.url.startsWith("http") ? image.url : `${LIVE_API}${image.url}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Image download failed: ${res.status} ${url}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  const ext = path.extname(new URL(url).pathname) || ".webp";
  const tmpPath = path.join(os.tmpdir(), `qubi-hero-${Date.now()}${ext}`);
  fs.writeFileSync(tmpPath, buffer);
  return { tmpPath, size: buffer.length, ext };
}

async function main() {
  console.log("Locating hero image on live...");
  const liveImage = await findLiveHeroImage();
  console.log(`Found: ${liveImage.name}`);

  const { tmpPath, size, ext } = await downloadToTemp(liveImage);
  console.log(`Downloaded ${(size / 1024).toFixed(0)} KB`);

  const { createStrapi, compileStrapi } = require("@strapi/strapi");
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = "error";

  try {
    const pages = app.documents("api::page.page");
    // Populate the WHOLE dynamic zone. Filtering with `on` to a single
    // component type returns only that block, and writing that array back
    // would delete every other block on the page.
    const home = await pages.findFirst({
      filters: { slug: "home" },
      status: "published",
      populate: { pageBuilder: { populate: "*" } },
    });

    if (!home) {
      throw new Error("Home page not found");
    }

    const heroBlock = (home.pageBuilder || []).find(
      (b) => b.__component === "acf-sections.qubi-home-hero"
    );
    if (!heroBlock) {
      throw new Error("Home page has no qubi-home-hero block");
    }
    if (heroBlock.hero_image) {
      console.log("Hero block already has an image — nothing to do.");
      return;
    }

    const uploaded = await app.plugin("upload").service("upload").upload({
      data: {},
      files: {
        filepath: tmpPath,
        originalFilename: liveImage.name || `hero${ext}`,
        mimetype: liveImage.mime || "image/webp",
        size,
      },
    });

    const fileId = uploaded?.[0]?.id;
    if (!fileId) {
      throw new Error("Upload returned no file id");
    }
    console.log(`Uploaded to local media library (file id ${fileId})`);

    // Rebuild the dynamic zone, keeping every block and its component id so
    // nothing else on the page is recreated or lost.
    const rebuilt = (home.pageBuilder || []).map((block) =>
      block.__component === "acf-sections.qubi-home-hero"
        ? { ...block, hero_image: fileId }
        : block
    );

    await pages.update({
      documentId: home.documentId,
      data: { pageBuilder: rebuilt },
      status: "published",
    });

    console.log("Attached hero image to the Home page hero block.");
  } finally {
    await app.destroy();
    fs.unlink(tmpPath, () => {});
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});