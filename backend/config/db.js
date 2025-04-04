require('dotenv').config();
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: "postgresql://postgres:iUUAGNwRyyctjiFulBXiAXZZWBoCZLqH@crossover.proxy.rlwy.net:32115/railway",
    ssl: { rejectUnauthorized: false }, // Required for cloud databases
});


pool.connect()
    .then(() => console.log("✅ Database connected successfully!"))
    .catch(err => console.error("❌ Database connection error:", err));

module.exports = pool;
