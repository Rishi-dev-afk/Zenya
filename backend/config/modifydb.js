require('dotenv').config();
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: "postgresql://postgres:iUUAGNwRyyctjiFulBXiAXZZWBoCZLqH@crossover.proxy.rlwy.net:32115/railway",
    ssl: { rejectUnauthorized: false }, // Required for cloud databases
});

console.log("➡️ Starting Database Initialization...");

const createTable = async () => {
    try {
        console.log("📡 Connecting to DB...");
        await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

        console.log("🔧 Creating users table...");
        await pool.query(`
            CREATE TABLE IF NOT EXISTS course (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                name VARCHAR(255) NOT NULL,
                course_description TEXT NOT NULL,
                course_duration VARCHAR(255) NOT NULL,
                course_fee VARCHAR(255) NOT NULL,
                course_rating INTEGER NOT NULL,
                course_image TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("✅ admin table created!");

    } catch (err) {
        console.error("❌ Error initializing database:", err.message);
    } finally {
        await pool.end();
        console.log("🔌 Database connection closed.");
    }
};

createTable();
