const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const pool = require("../config/db");


router.post('/faculty/assign', async (req, res) => {
    const { admin_id, faculty_id } = req.body;

    try {
        await pool.query(
            `UPDATE faculty SET admin_id = $1 WHERE id = $2`,
            [admin_id, faculty_id]
        );
        res.status(200).json({ message: "Faculty assigned successfully" });
    } catch (err) {
        console.error("❌ Error assigning faculty:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
