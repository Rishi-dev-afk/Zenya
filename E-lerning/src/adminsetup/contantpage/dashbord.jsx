import './dashbord.css';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashbord() {
    const navigate = useNavigate();
  
  const location = useLocation();
  const userData = location.state || {};
  console.log(userData.admindata.id)
  const adminId = userData.admindata.id;
  const [stats, setStats] = useState({ student_count: 0, faculty_count: 0, course_count: 0 });
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchStats() {
        try {
            if (adminId) {
                const res = await axios.get(`https://zenya.onrender.com/api/admin/${adminId}/stats`);
                setStats(res.data);
            }
        } catch (err) {
            console.error("❌ Error fetching stats", err);
        }
    }

    fetchStats();
}, [adminId]);

useEffect(() => {
    axios.get(`https://zenya.onrender.com/api/courses/${adminId}`)
      .then(res => {
        setCourses(res.data.courses);
      })
      .catch(err => {
        console.error("Error fetching courses:", err);
      });
  }, [adminId]);

  console.log(courses);
 
console.log(stats.student_count, stats.faculty_count , stats.course_count);

    return (
        <>
        <div className="dashbord">
            <div className="dashbord__container">
                <h3>
                    Admin Dashbord
                </h3>
                <div className="newanocment">
                    <h3>+ New Annocument</h3>
                </div>
            </div>   
            <div className="dashbord__container__data">
                <div className="totalstudent">
                    <p>Total Student</p>
                    <h3>{stats.student_count}</h3>
                </div>
                <div className="totalstudent">
                    <p>Total Teacher</p>
                    <h3>{stats.faculty_count}</h3>
                </div>
                <div className="totalstudent">
                    <p>Active courses</p>
                    <h3>{stats.course_count}</h3>
                </div>
            </div>
            <div className="dashbord__container">
                <h3>
                    cours Mangment
                </h3>
                <div className="newanocment" onClick={() => navigate(`/course/${adminId}`, {state: userData})}>
                    <h3>+ Add New Cours</h3>
                </div>
            </div>   
            <div className="dashbord__container__data row">
  {courses.map((course, index) => (
    <div className="col-md-4 mb-3" key={index}>
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{course.name}</h5>
          <p className="card-text"><strong>Faculty:</strong> {course.faculty_name}</p>
          <p className="card-text"><strong>Lab:</strong> {course.course}</p>
          <p className="card-text"><strong>Fee:</strong> {course.fee}</p>
        </div>
      </div>
    </div>
  ))}
</div>

        </div>
        </>
    );
}