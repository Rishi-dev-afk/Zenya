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

        // ✅ Create courses table
        console.log("📚 Creating courses table...");
        await pool.query(`
            CREATE TABLE IF NOT EXISTS courses (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                name VARCHAR(255) NOT NULL,
                description TEXT,
                duration VARCHAR(100),
                fee VARCHAR(100),
                rating INTEGER,
                course VARCHAR(255),
                faculty_id UUID REFERENCES faculty(id) ON DELETE SET NULL,
                faculty_name VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("✅ courses table created!");

        // ✅ Add course_id column to student table
        console.log("🔗 Adding course_id to student table...");
        await pool.query(`
            ALTER TABLE student
            ADD COLUMN IF NOT EXISTS course_id UUID REFERENCES courses(id) ON DELETE SET NULL;
        `);
        console.log("✅ course_id column added to student!");

        console.log("✅ Database update complete!");
    } catch (err) {
        console.error("❌ Error updating database:", err.message);
    } finally {
        await pool.end();
        console.log("🔌 Database connection closed.");
    }
};

updateTables();
