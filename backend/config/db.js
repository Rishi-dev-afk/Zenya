require('dotenv').config();
const { Pool } = require("pg");

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'elernig',
    password: 'subham04',
    port: 5432,

});


pool.connect()
    .then(() => console.log("✅ Database connected successfully!"))
    .catch(err => console.error("❌ Database connection error:", err));

module.exports = pool;
