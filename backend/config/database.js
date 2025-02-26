require('dotenv').config({ path: '/../.env' });
const { Sequelize } = require('sequelize');

console.log("DB_HOST:", process.env.DB_HOST);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
  }
);

module.exports = sequelize;
