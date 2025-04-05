import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './admin_signin_page.css'; // Using the same CSS file

const StudentSignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
    clgname: '',
    clgrollno: '',
    clgbranch: '',
    clgyear: '',
    clgsem: '',
    clgsection: '',
    clgstate: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('https://zenya.onrender.com/api/student/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      setMessage(data.message);
      setFormData({
        email: '',
        password: '',
        name: '',
        age: '',
        clgname: '',
        clgrollno: '',
        clgbranch: '',
        clgyear: '',
        clgsem: '',
        clgsection: '',
        clgstate: ''
      });
      navigate("/student", { state: data });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="con">
      {/* Left Side: Signup Form */}
      <div className="frst">
        <div className="form-container">
          <h2>Student Signup</h2>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
  <div className="input-group mb-3">
    <span className="input-group-text">@</span>
    <input
      type="text"
      name="name"
      className="form-control"
      placeholder="Full Name"
      value={formData.name}
      onChange={handleChange}
    />
  </div>

  <div className="input-group mb-3">
    <input
      type="email"
      name="email"
      className="form-control"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
    />
    <span className="input-group-text">@example.com</span>
  </div>

  <div className="input-group mb-3">
    <span className="input-group-text">Age</span>
    <input
      type="number"
      name="age"
      className="form-control"
      value={formData.age}
      onChange={handleChange}
    />
  </div>

  <div className="input-group mb-3">
    <span className="input-group-text">Password</span>
    <input
      type="password"
      name="password"
      className="form-control"
      value={formData.password}
      onChange={handleChange}
    />
  </div>

  <div className="input-group mb-3">
    <span className="input-group-text">College Name</span>
    <input
      type="text"
      name="clgname"
      className="form-control"
      value={formData.clgname}
      onChange={handleChange}
    />
  </div>

  <div className="input-group mb-3">
    <span className="input-group-text">Roll No</span>
    <input
      type="text"
      name="clgrollno"
      className="form-control"
      value={formData.clgrollno}
      onChange={handleChange}
    />
  </div>

  <div className="input-group mb-3">
    <span className="input-group-text">Branch</span>
    <input
      type="text"
      name="clgbranch"
      className="form-control"
      value={formData.clgbranch}
      onChange={handleChange}
    />
  </div>

  <div className="input-group mb-3">
    <span className="input-group-text">Year</span>
    <input
      type="number"
      name="clgyear"
      className="form-control"
      value={formData.clgyear}
      onChange={handleChange}
    />
  </div>

  <div className="input-group mb-3">
    <span className="input-group-text">Semester</span>
    <input
      type="number"
      name="clgsem"
      className="form-control"
      max="10"
      value={formData.clgsem}
      onChange={handleChange}
    />
  </div>

  <div className="input-group mb-3">
    <span className="input-group-text">Section</span>
    <input
      type="text"
      name="clgsection"
      className="form-control"
      value={formData.clgsection}
      onChange={handleChange}
    />
  </div>

  <div className="input-group mb-3">
    <span className="input-group-text">State</span>
    <input
      type="text"
      name="clgstate"
      className="form-control"
      value={formData.clgstate}
      onChange={handleChange}
    />
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>

        </div>
      </div>
    </div>
  );
  
};

export default StudentSignupPage;
