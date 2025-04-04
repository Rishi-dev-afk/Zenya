require('dotenv').config();
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: "postgresql://postgres:iUUAGNwRyyctjiFulBXiAXZZWBoCZLqH@crossover.proxy.rlwy.net:32115/railway",
    ssl: { rejectUnauthorized: false }, // Required for cloud databases
});

console.log("➡️ Starting Database Update...");

const updateTables = async () => {
    try {
        console.log("📡 Connecting to DB...");
        await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

        // ✅ Add admin_id column to student (if not exists)
        console.log("🛠️ Adding admin_id to student table...");
        await pool.query(`
            ALTER TABLE student
            ADD COLUMN IF NOT EXISTS admin_id UUID;
        `);
        console.log("✅ admin_id column added to student!");

        // ✅ Add admin_id column to faculty (if not exists)
        console.log("🛠️ Adding admin_id to faculty table...");
        await pool.query(`
            ALTER TABLE faculty
            ADD COLUMN IF NOT EXISTS admin_id UUID;
        `);
        console.log("✅ admin_id column added to faculty!");

        console.log("✅ Database update complete!");

    } catch (err) {
        console.error("❌ Error updating database:", err.message);
    } finally {
        await pool.end();
        console.log("🔌 Database connection closed.");
    }
};

updateTables();
