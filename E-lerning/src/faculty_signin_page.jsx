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
              <div className="frst">
              <div className="form-container">
              <h2>Faculty Signup</h2>
              {message && <p className="success-message">{message}</p>}
              {error && <p className="error-message">{error}</p>}
              <form onSubmit={handleSubmit}>

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
    <span className="input-group-text">Password</span>
    <input
      type="password"
      name="password"
      className="form-control"
      placeholder="Password"
      value={formData.password}
      onChange={handleChange}
    />
  </div>

  <div className="input-group mb-3">
    <span className="input-group-text">Name</span>
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
    <span className="input-group-text">Experience</span>
    <input
      type="number"
      name="experience"
      className="form-control"
      placeholder="experience"
      value={formData.experience}
      onChange={handleChange}
    />
  </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">clgname</span>
                  <input
                    type="text"
                    name="clgname"
                    className="form-control"
                    placeholder="clgname"
                    value={formData.clgname}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group mb-3">
    <span className="input-group-text">Age</span>
    <input
      type="number"
      name="age"
      className="form-control"
      placeholder="Age"
      value={formData.age}
      onChange={handleChange}
    />
  </div>



                <div className="input-group mb-3">
                  <span className="input-group-text">clgname</span>
                  <input
                    type="text"
                    name="specialization"
                    className="form-control"
                    placeholder="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group mb-3">
    <span className="input-group-text">Rating: 0-5</span>
    <input
      type="number"
      name="rating"
      className="form-control"
      placeholder="Agratinge"
      value={formData.rating}
      onChange={handleChange}
    />
  </div>

                
          
 

  

 

  <button className="btn btn-primary">Submit</button>
</form>

        </div>
      </div>
    </div>
  );
  
};

export default FacultySignupPage;
