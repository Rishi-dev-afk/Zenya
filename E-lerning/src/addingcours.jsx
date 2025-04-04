import { useState, useEffect } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function CourseForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const adminId = location.state.admindata.id || {};
    console.log(adminId);
    const [facultyList, setFacultyList] = useState([]);
    const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    fee: '',
    rating: '',
    course: '',
    faculty_id: '',
    faculty_name: '',
    admin_id: adminId,
  });

  useEffect(() => {
    console.log(adminId);
    const fetchFaculties = async () => {
      try {
        const res = await axios.get(`https://zenya.onrender.com/api/admin/${adminId}/faculties`);
        console.log(res.data.faculties);
        setFacultyList(res.data.faculties);
      } catch (err) {
        console.error('Error fetching faculty list:', err);
      }
    };

    if (adminId) {
      fetchFaculties();
    }
  }, [adminId]);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
    console.log(facultyList);
    const handleFacultyChange = (e) => {
    const selectedName = e.target.value;
    const selectedFaculty = facultyList.find(fac => fac.name === selectedName);
    setFormData(prev => ({
      ...prev,
      faculty_name: selectedName,
      faculty_id: selectedFaculty?.id || '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://zenya.onrender.com/api/course/create`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Course created successfully!');
      console.log(response.data);
      navigate("/admin",{state: location.state})
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Failed to create course');
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="input-group mb-3">
        <span className="input-group-text">@</span>
        <input
          type="text"
          className="form-control"
          placeholder="Course Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group mb-3">
        <label className="input-group-text">Faculty</label>
        <select
          className="form-select"
          value={formData.faculty_name}
          onChange={handleFacultyChange}
        >
          <option value="">Select Faculty</option>
          {facultyList.map(fac => (
            <option key={fac.id} value={fac.name}>
              {fac.name}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Faculty ID</span>
        <input
          type="text"
          className="form-control"
          name="faculty_id"
          value={formData.faculty_id}
          readOnly
        />
      </div>

      <div className="mb-3">
  <label htmlFor="course" className="form-label">Select Course Topic</label>
  <select
    className="form-select"
    id="course"
    name="course"
    value={formData.course}
    onChange={handleInputChange}
  >
    <option value="">-- Select a Topic --</option>
    <option value="Data Structures">Data Structures</option>
    <option value="Algorithms">Algorithms</option>
    <option value="Operating Systems">Operating Systems</option>
    <option value="Computer Networks">Computer Networks</option>
    <option value="DBMS">DBMS</option>
    <option value="Software Engineering">Software Engineering</option>
    <option value="Web Development">Web Development</option>
    <option value="Machine Learning">Machine Learning</option>
    <option value="Computer Architecture">Computer Architecture</option>
    <option value="Artificial Intelligence">Artificial Intelligence</option>
  </select>
</div>


      <div className="input-group mb-3">
        <span className="input-group-text">$</span>
        <input
          type="text"
          className="form-control"
          placeholder="Fee"
          name="fee"
          value={formData.fee}
          onChange={handleInputChange}
        />
        <span className="input-group-text">.00</span>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Admin ID</span>
        <input
          type="text"
          className="form-control"
          name="admin_id"
          value={adminId}
          readOnly
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Duration</span>
        <input
          type="text"
          className="form-control"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Rating</span>
        <input
          type="text"
          className="form-control"
          name="rating"
          value={formData.rating}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Description</span>
        <textarea
          className="form-control"
          name="description"
          placeholder="Course Description"
          value={formData.description}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary">Create Course</button>
    </form>
  );
}

export default CourseForm;
