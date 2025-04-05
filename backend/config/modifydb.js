require('dotenv').config();
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: "postgresql://postgres:iUUAGNwRyyctjiFulBXiAXZZWBoCZLqH@crossover.proxy.rlwy.net:32115/railway",
    ssl: { rejectUnauthorized: false },
});

console.log("➡️ Starting Live Classes Table Creation...");

const createLiveClassesTable = async () => {
    try {
        console.log("📡 Connecting to DB...");
        await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

        // ✅ Create live_classes table
        console.log("🎥 Creating live_classes table...");
        await pool.query(`
            CREATE TABLE IF NOT EXISTS live_classes (
                id SERIAL PRIMARY KEY,
                class_id UUID NOT NULL DEFAULT uuid_generate_v4() UNIQUE,
                teacher_id UUID NOT NULL,
                course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
                title VARCHAR(255),
                scheduled_at TIMESTAMP,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("✅ live_classes table created!");

    } catch (err) {
        console.error("❌ Error creating live_classes table:", err.message);
    } finally {
        await pool.end();
        console.log("🔌 Database connection closed.");
    }
};

createLiveClassesTable();
