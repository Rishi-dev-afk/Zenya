const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const pool = require("../config/db");

    router.post('/course/create', async (req, res) => {
        const {
            name,
            description,
            duration,
            fee,
            rating,
            course,
            faculty_id,
            faculty_name,
            admin_id
        } = req.body;

        console.log("Received data:", req.body);
    
        try {
            const result = await pool.query(
                `INSERT INTO courses (name, description, duration, fee, rating, course, faculty_id, faculty_name, admin_id)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9) RETURNING *`,
                [name, description, duration, fee, rating, course, faculty_id, faculty_name,admin_id]
            );
            res.status(201).json({ message: "Course created successfully", course: result.rows[0] });
        } catch (err) {
            console.error("❌ Error creating course:", err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

module.exports = router;
