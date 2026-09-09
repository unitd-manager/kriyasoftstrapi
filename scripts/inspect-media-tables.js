const { createStrapi } = require('@strapi/strapi');

async function main() {
  const app = await createStrapi({ distDir: './dist' }).load();
  try {
    const [tables] = await app.db.connection.raw('SHOW TABLES');
    const names = tables.map((row) => Object.values(row)[0]).filter((name) => String(name).includes('upload') || String(name).includes('component'));
    for (const name of names) {
      const [columns] = await app.db.connection.raw(`SHOW COLUMNS FROM \`${name}\``);
      console.log(`TABLE ${name}`);
      console.log(columns.map((column) => column.Field).join(', '));
    }
  } finally {
    await app.destroy();
  }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
