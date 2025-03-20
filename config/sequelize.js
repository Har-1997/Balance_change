require('dotenv').config();
const { Sequelize } = require('sequelize');

const { PG_USER, PG_PASSWORD, PG_DB, PG_HOST } = process.env;

const sequelize = new Sequelize(PG_DB, PG_USER, PG_PASSWORD, {
  host: PG_HOST,
  dialect: 'postgres',
  logging: false,
  pool: { max: 300, min: 50, acquire: 15000, idle: 10000 }
});

module.exports = sequelize;