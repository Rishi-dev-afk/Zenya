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

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});