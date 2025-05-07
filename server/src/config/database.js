// require('dotenv').config();  
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') }); // Load environment variables from .env file

const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

module.exports = pool;

// db.js (or sequelize.js)
// require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: 'postgres',
//   }
// );

// module.exports = sequelize;

