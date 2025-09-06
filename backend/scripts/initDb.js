const fs = require('fs');
const path = require('path');
const pool = require('../db');
(async () => {
  try {
    const sql = fs.readFileSync(path.join(__dirname, '..', 'db', 'schema.sql'), 'utf-8');
    await pool.query(sql);
    console.log('Database initialized.');
  } catch (e) {
    console.error('DB init failed:', e);
    process.exit(1);
  } finally {
    await pool.end();
    process.exit(0);
  }
})();
