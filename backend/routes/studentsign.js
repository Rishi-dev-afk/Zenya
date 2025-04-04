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
router.post("/student/signin", async (req, res) => {
    try {
        const {email, password, name, age, clgname, clgrollno, clgbranch, clgyear, clgsem, clgsection, clgstate } = req.body;
        console.log("User Data:", email, password, name, age, clgname, clgrollno, clgbranch, clgyear, clgsem, clgsection, clgstate );

        if (!email || !password || !name || !age) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const userExists = await pool.query("SELECT id FROM student WHERE email = $1", [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: "Email already registered!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            `INSERT INTO student (email, password, name, age, clgname, clgrollno, clgbranch, clgyear, clgsem, clgsection, clgstate ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id, email, name, age, clgname, clgrollno, clgbranch, clgyear, clgsem, clgsection, clgstate`,
            [email, hashedPassword, name, age, clgname, clgrollno, clgbranch, clgyear, clgsem, clgsection, clgstate]
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
