const { Client } = require('pg');
const sequelize = require('./sequelize');

const { PG_USER, PG_PASSWORD, PG_HOST = 'localhost', PG_PORT = 5432, PG_DB = 'db_balance' } = process.env;

// Ensures that the PostgreSQL database exists before connecting.
async function ensureDatabaseExists() {
  const client = new Client({
    user: PG_USER,
    password: PG_PASSWORD,
    host: PG_HOST,
    port: PG_PORT,
    database: 'postgres',
  });

  try {
    await client.connect();
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [PG_DB]);
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${PG_DB}"`);
      console.log(`✅ Database "${PG_DB}" created successfully.`);
    } else {
      console.log(`✅ Database "${PG_DB}" already exists.`);
    }
  } catch (error) {
    console.error('❌ Error ensuring database exists:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

// Connects to the database after ensuring it exists.
async function initializeDatabase() {
  await ensureDatabaseExists();

  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1); // Exit process on failure
  }
}

module.exports = { sequelize, initializeDatabase };