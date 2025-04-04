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
router.post("/faculty/signin", async (req, res) => {
    try {
        const {email, password, name, age, clgname, experience, specialization, rating} = req.body;
        console.log("User Data:", email, password, name, age, clgname, experience, specialization, rating );

        if (!email || !password || !name || !age) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const userExists = await pool.query("SELECT id FROM faculty WHERE email = $1", [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: "Email already registered!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            `INSERT INTO faculty (email, password, name, age, clgname, experience, specialization, rating ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, email, name, age, clgname, experience, specialization, rating`,
            [email, hashedPassword, name, age, clgname, experience, specialization, rating]
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
