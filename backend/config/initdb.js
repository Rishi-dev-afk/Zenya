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
            CREATE TABLE IF NOT EXISTS admin (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                username TEXT UNIQUE NOT NULL CHECK (username ~ '[A-Za-z]' AND username ~ '[0-9]'),
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                age INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("✅ admin table created!");

        await pool.query(`
            CREATE TABLE IF NOT EXISTS student (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                age INTEGER,
                clgname VARCHAR(255) NOT NULL,
                clgrollno VARCHAR(255) NOT NULL,
                clgbranch VARCHAR(255) NOT NULL,
                clgyear VARCHAR(255) NOT NULL,
                clgsem VARCHAR(255) NOT NULL,
                clgsection VARCHAR(255) NOT NULL,
                clgstate VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("✅ student table created!");

        await pool.query(`
            CREATE TABLE IF NOT EXISTS faculty (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                age INTEGER,
                clgname VARCHAR(255) NOT NULL,
                experience INTEGER NOT NULL,
                specialization VARCHAR(255) NOT NULL,
                rating INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("✅ faculty table created!");


        console.log("🔧 Creating youtube_notes table...");
        await pool.query(`
            CREATE TABLE IF NOT EXISTS student_data (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                user_id UUID REFERENCES student(id) ON DELETE CASCADE,
                video_link TEXT NOT NULL,
                video_notes TEXT,
                video_title TEXT NOT NULL,
                video_description TEXT,
                student_name TEXT NOT NULL,
                student_email TEXT NOT NULL,
                student_rating INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("✅ student_data Notes table created!");

        console.log("🔧 Creating youtube_notes table...");
        await pool.query(`
            CREATE TABLE IF NOT EXISTS video_link (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                user_id UUID REFERENCES faculty(id) ON DELETE CASCADE,
                video_link TEXT NOT NULL,
                video_notes TEXT,
                video_title TEXT NOT NULL,
                video_description TEXT,
                faculty_name TEXT NOT NULL,
                faculty_email TEXT NOT NULL,
                faculty_rating INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("✅ video_link Notes table created!");

        console.log("🔧 Creating folders_data table...");
        await pool.query(`
            CREATE TABLE IF NOT EXISTS folders_data (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                user_id UUID REFERENCES video_link(id) ON DELETE CASCADE,
                folder_name TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("✅ folders_data table created!");

        console.log("✅ Database initialized successfully!");
    } catch (err) {
        console.error("❌ Error initializing database:", err.message);
    } finally {
        await pool.end();
        console.log("🔌 Database connection closed.");
    }
};

createTable();
