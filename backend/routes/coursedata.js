
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const pool = require("../config/db");
const e = require('express');

router.get('/courses/:adminId/course', async (req, res) => {
    const { adminId } = req.params;
  
    try {
      const result = await pool.query(
        'SELECT * FROM courses WHERE admin_id = $1 ORDER BY id DESC',
        [adminId]
      );
      res.status(200).json({ courses: result.rows });
    } catch (err) {
      console.error("❌ Error fetching courses:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  module.exports = router;
  