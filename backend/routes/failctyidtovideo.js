

const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const pool = require("../config/db");
const e = require('express');


router.get('/course/faculty/:facultyId', async (req, res) => {
    const { facultyId } = req.params;
    try {
        const result = await pool.query('SELECT * FROM courses WHERE faculty_id = $1', [facultyId]);
        res.status(200).json({
            success: true,
            courses: result.rows
        });
    } catch (err) {
        console.error("❌ Error fetching courses by faculty:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
