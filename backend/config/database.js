// const { createPool } = require('mysql');

// const pool = createPool({
//     port: process.env.DB_PORT || 3306,
//     host: process.env.DB_HOST || 'localhost',
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || '',
//     database: process.env.MYSQL_DB || 'db1',
//     connectionLimit: 10
// })

// module.exports = pool;
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/amazona',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
}

