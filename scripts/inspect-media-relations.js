const { createStrapi } = require('@strapi/strapi');

async function main() {
  const app = await createStrapi({ distDir: './dist' }).load();
  try {
    const [tables] = await app.db.connection.raw('SHOW TABLES');
    for (const row of tables) {
      const name = Object.values(row)[0];
      if (String(name).includes('upload_files') || String(name).includes('qubi_home_hero') || String(name).includes('qubi_case_studies')) {
        const [rows] = await app.db.connection.raw(`SELECT * FROM \`${name}\` LIMIT 20`);
        console.log(`TABLE ${name}`);
        console.log(JSON.stringify(rows, null, 2));
      }
    }
  } finally { await app.destroy(); }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
