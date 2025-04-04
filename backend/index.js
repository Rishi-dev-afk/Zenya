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

app.use("/api", studentSign);
app.use("/api", facultySign);
app.use("/api", adminSign);

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});