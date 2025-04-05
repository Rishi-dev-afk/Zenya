import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const FacultySignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
    clgname: '',
    experience: '',
    specialization: '',
    rating: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('https://zenya.onrender.com/api/faculty/signin', {
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
        experience: '',
        specialization: '',
        rating: ''
      });
      navigate("/faculty",{state: data})
      
    } catch (err) {
      setError(err.message);
    }
    
  };
  return (
    <div className="con">
      {/* Left Side: Signup Form */}
      <div className="frst">
        <div className="form-container">
          <h2>Faculty Signup</h2>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
          <form>
  
  <div className="input-group mb-3">
    <input type="email" className="form-control" placeholder="Email" />
    <span className="input-group-text">@example.com</span>
  </div>

  <div className="input-group mb-3">
    <span className="input-group-text">Age</span>
    <input type="number" className="form-control" />
  </div>

  <div className="input-group mb-3">
    <span className="input-group-text">Password</span>
    <input type="password" className="form-control" />
  </div>
  <div className="input-group mb-3">
  <span className="input-group-text" id="inputGroup-sizing-default">  College name</span>
  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
</div>
<div className="input-group mb-3">
    <span className="input-group-text">experience</span>
    <input type="number" className="form-control"/>
  </div>
 
  <button className="btn ">Submit</button>
</form>

        </div>
      </div>
    </div>
  );
  
};

export default FacultySignupPage;
