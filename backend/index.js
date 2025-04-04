const express = require('express');
let PORT = 8080
const app = express();
const path = require('path');
const cors = require('cors');
const pool = require("./config/db");

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
const addCourse = require("./routes/addcours");
const courseData = require("./routes/coursedata");
const facultyUnsignId = require("./routes/faculityunsignid");
const UnassignedFaculty = require("./routes/UnassignedFaculty");

app.use("/api", studentSign);
app.use("/api", facultySign);
app.use("/api", adminSign);
app.use("/api", studentLogin);
app.use("/api", facultyLogin);
app.use("/api", adminLogin);
app.use("/api", addCourse);
app.use("/api", courseData);
app.use("/api", facultyUnsignId);
app.use("/api", UnassignedFaculty);

// GET courses by admin ID
app.get('api/course/courses/:adminId', async (req, res) => {
  const { adminId } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM courses WHERE admin_id = $1 ORDER BY id DESC',
      [adminId]
    );
    res.status(200).json({ courses: result.rows });
  } catch (err) {
    console.error("❌ Error fetching courses by admin:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get('/api/admin/:adminId/faculties', async (req, res) => {
    const { adminId } = req.params;
  
    try {
      const result = await pool.query(
        'SELECT id, name FROM faculty WHERE admin_id = $1',
        [adminId]
      );
  
      res.status(200).json({
        admin_id: adminId,
        faculties: result.rows, // array of { id, name }
      });
    } catch (err) {
      console.error('❌ Error fetching faculty list:', err.message);
      res.status(500).json({ error: 'Internal Server Error', error: err });
    }
  });

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

        const coursequery = await pool.query(
          'SELECT COUNT(*) FROM courses WHERE admin_id = $1',
          [adminId]
      );


        const studentCount = parseInt(studentQuery.rows[0].count, 10);
        const facultyCount = parseInt(facultyQuery.rows[0].count, 10);
        const courseCount = parseInt(coursequery.rows[0].count, 10);

        res.json({
            admin_id: adminId,
            student_count: studentCount,
            faculty_count: facultyCount,
            course_count: courseCount,

        });
    } catch (err) {
        console.error('❌ Error fetching stats:', err.message);
        res.status(500).json({ error: 'Internal Server Error', error: err });
    }
});

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});