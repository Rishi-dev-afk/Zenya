import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [adminData, setAdminData] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://zenya.onrender.com/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setAdminData(data.admindata);
      } else {
        setMessage(data.error || 'Login failed');
        setAdminData(null);
      }

      navigate("/student",{state: data})
    } catch (err) {
      console.error('Login error:', err);
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </div>
        <div>
          <label>Password: </label>
          <input 
            type="password" 
            name="password" 
            value={formData.password}
            onChange={handleChange}
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}

      {adminData && (
        <div>
          <h3>Admin Info</h3>
          <p>ID: {adminData.id}</p>
          <p>Email: {adminData.email}</p>
          <p>Name: {adminData.name}</p>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
