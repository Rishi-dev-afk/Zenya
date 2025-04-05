const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || "postgresql://postgres:iUUAGNwRyyctjiFulBXiAXZZWBoCZLqH@crossover.proxy.rlwy.net:32115/railway",
    ssl: { rejectUnauthorized: false },
});


// ✅ 1. Create Live Class
router.post('/api/live-class/create', async (req, res) => {
    const { teacher_id, course_id, title, scheduled_at } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO live_classes (teacher_id, course_id, title, scheduled_at)
             VALUES ($1, $2, $3, $4)
             RETURNING *;`,
            [teacher_id, course_id, title, scheduled_at]
        );

        res.status(201).json({ success: true, message: "Live class created", class: result.rows[0] });
    } catch (err) {
        console.error("❌ Error creating live class:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});


// ✅ 2. Get All Live Classes by Teacher
router.get('/api/live-class/teacher/:teacherId', async (req, res) => {
    const { teacherId } = req.params;

    try {
        const result = await pool.query(
            `SELECT * FROM live_classes WHERE teacher_id = $1 ORDER BY scheduled_at DESC;`,
            [teacherId]
        );

        res.status(200).json({ success: true, classes: result.rows });
    } catch (err) {
        console.error("❌ Error fetching classes:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});


// ✅ 3. Get All Live Classes by Course
router.get('/api/live-class/course/:courseId', async (req, res) => {
    const { courseId } = req.params;

    try {
        const result = await pool.query(
            `SELECT * FROM live_classes WHERE course_id = $1 ORDER BY scheduled_at DESC;`,
            [courseId]
        );

        res.status(200).json({ success: true, classes: result.rows });
    } catch (err) {
        console.error("❌ Error fetching course classes:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});


// ✅ 4. End a Live Class (mark as inactive)
router.put('/api/live-class/end/:classId', async (req, res) => {
    const { classId } = req.params;

    try {
        const result = await pool.query(
            `UPDATE live_classes SET is_active = false WHERE class_id = $1 RETURNING *;`,
            [classId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: "Class not found" });
        }

        res.status(200).json({ success: true, message: "Class ended", class: result.rows[0] });
    } catch (err) {
        console.error("❌ Error ending class:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});


// ❌ (Optional) Delete a Live Class
router.delete('/api/live-class/delete/:classId', async (req, res) => {
    const { classId } = req.params;

    try {
        const result = await pool.query(
            `DELETE FROM live_classes WHERE class_id = $1 RETURNING *;`,
            [classId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: "Class not found" });
        }

        res.status(200).json({ success: true, message: "Class deleted", class: result.rows[0] });
    } catch (err) {
        console.error("❌ Error deleting class:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
