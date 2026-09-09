const mysql = require('mysql2/promise');
(async () => {
  const conn = await mysql.createConnection({
    host: '66.29.154.85',
    port: 3307,
    user: 'root',
    password: 'd524acb933a468',
    database: 'kriyasoftadmin',
    charset: 'utf8mb4'
  });

  const [tables] = await conn.query('SHOW TABLES');
  console.log('tables:', JSON.stringify(tables));

  const tableNames = tables.map((row) => Object.values(row)[0]);
  const userTable = tableNames.find((name) => /user/i.test(name) || /admin/i.test(name) || /strapi/i.test(name));

  if (userTable) {
    const [rows] = await conn.query(`SELECT * FROM \`${userTable}\` LIMIT 5`);
    console.log('user rows:', JSON.stringify(rows));
  }

  await conn.end();
})();
