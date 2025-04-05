const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const pool = require("../config/db");
const e = require('express');


router.get('/student/:admin_id', async (req, res) => {
    const { admin_id } = req.params;

    try {
        const students = await pool.query(
            `SELECT id, email, name, age, clgname, clgrollno, clgbranch, clgyear, clgsem, clgsection, clgstate
             FROM student WHERE admin_id = $1`,
            [admin_id]
        );

        res.status(200).json({ students: students.rows });
    } catch (err) {
        console.error("❌ Error fetching students:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;