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
  const [stats, setStats] = useState({ student_count: 0, faculty_count: 0 });

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
 
console.log(stats.student_count, stats.faculty_count);

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
                    <h3>0</h3>
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
        </div>
        </>
    );
}