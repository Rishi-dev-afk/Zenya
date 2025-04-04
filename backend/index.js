const express = require('express');
let PORT = 8080
const app = express();
const path = require('path');
const cors = require('cors');

app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json()); 

// To parse JSON
const studentSign = require("./routes/studentsign");
const facultySign = require("./routes/facultysign");
const adminSign = require("./routes/adminsign");
const studentLogin = require("./routes/studentlogin");
const facultyLogin = require("./routes/facultyloginpage");  
const adminLogin = require("./routes/adminlogin");

app.use("/api", studentSign);
app.use("/api", facultySign);
app.use("/api", adminSign);
app.use("/api", studentLogin);
app.use("/api", facultyLogin);
app.use("/api", adminLogin);

app.get('/api/admin/:adminId/stats', async (req, res) => {
    const { adminId } = req.params;

    try {
        const studentQuery = await pool.query(
            'SELECT COUNT(*) FROM student WHERE admin_id = $1',
            [adminId]
        );

        const facultyQuery = await pool.query(
            'SELECT COUNT(*) FROM faculty WHERE admin_id = $1',
            [adminId]
        );

        const studentCount = parseInt(studentQuery.rows[0].count, 10);
        const facultyCount = parseInt(facultyQuery.rows[0].count, 10);

        res.json({
            admin_id: adminId,
            student_count: studentCount,
            faculty_count: facultyCount
        });
    } catch (err) {
        console.error('❌ Error fetching stats:', err.message);
        res.status(500).json({ error: 'Internal Server Error', error: err });
    }
});

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});