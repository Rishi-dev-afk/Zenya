const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const pool = require("../config/db");

router.post('admin/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const userQuery = await pool.query("SELECT * FROM faculty WHERE email = $1", [email]);
        if (userQuery.rows.length === 0) {
            return res.status(400).json({ error: "User not found" });
        }

        const user = userQuery.rows[0];
        // Check password   
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Passwords match, return success response
        res.status(200).json({ message: "Login successful", admindata: user });

    

    } catch (err) {
        console.error("❌ Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
