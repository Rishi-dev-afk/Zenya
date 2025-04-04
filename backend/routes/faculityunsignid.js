const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const pool = require("../config/db");

router.get('/faculty/unassigned/:adminId', async (req, res) => {
    const { adminId } = req.params;

    try {
        const result = await pool.query(
            `SELECT * FROM faculty WHERE admin_id IS DISTINCT FROM $1 OR admin_id IS NULL`,
            [adminId]
        );

        res.status(200).json({
            success: true,
            faculty: result.rows
        });

    } catch (err) {
        console.error("❌ Error fetching unassigned faculty:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;