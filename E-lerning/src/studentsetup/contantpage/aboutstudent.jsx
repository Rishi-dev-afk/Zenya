import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

const StudentList = () => {
    const location = useLocation();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = location.state || {};
  console.log(userData.admindata.id)
  const adminId = userData.admindata.id;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`https://zenya.onrender.com/api/student/${adminId}`);
        setStudents(response.data.students);
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (adminId) fetchStudents();
  }, [adminId]);

  if (loading) return <p>Loading students...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Students under Admin</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Roll No</th>
                <th className="px-4 py-2 border">Branch</th>
                <th className="px-4 py-2 border">Year</th>
                <th className="px-4 py-2 border">Semester</th>
                <th className="px-4 py-2 border">Section</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{student.name}</td>
                  <td className="px-4 py-2 border">{student.email}</td>
                  <td className="px-4 py-2 border">{student.clgrollno}</td>
                  <td className="px-4 py-2 border">{student.clgbranch}</td>
                  <td className="px-4 py-2 border">{student.clgyear}</td>
                  <td className="px-4 py-2 border">{student.clgsem}</td>
                  <td className="px-4 py-2 border">{student.clgsection}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentList;
