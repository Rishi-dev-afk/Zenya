const express = require("express");
const app = express();
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const pool = require("../config/db");
const cors = require("cors");
app.use(cors());

router.use(express.urlencoded({ extended: true }));
router.use(express.json()); // To parse JSON request bodies

// 🚀 Signup Route
router.post("/admin/signin", async (req, res) => {
    try {
        const {username, email, password, name, age} = req.body;
        console.log("User Data:", username, email, password, name, age);

        if (!email || !password || !name || !age) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        if (!/[A-Za-z]/.test(username) || !/[0-9]/.test(username)) {
            return res.status(400).json({ error: "Username must contain letters and numbers!" });
        }

        const userExists = await pool.query("SELECT id FROM admin WHERE email = $1", [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: "Email already registered!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            `INSERT INTO admin (username, email, password, name, age) 
            VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email, password, name, age`,
            [username, email, hashedPassword, name, age]
        );


        res.status(201).json({
            message: "Signup Successful!",
            user: newUser.rows[0],
        });

    } catch (err) {
        console.error("❌ Error:", err);
        res.status(500).json({ error: "Internal Server Error." });
    }
});

module.exports = router;
