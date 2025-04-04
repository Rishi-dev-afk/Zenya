import { useState } from 'react';

const StudentSignupPage = () => {
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
    
     console.log(formData); // Log the form data to check its structure
    try {
      const response = await fetch('https://zenya.onrender.com/api/student/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log(data); // Log the response data to check its structure

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
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Student Signup</h2>

      <form onSubmit={handleSubmit}>
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Age" required />
        <input name="clgname" value={formData.clgname} onChange={handleChange} placeholder="College Name" />
        <input name="clgrollno" value={formData.clgrollno} onChange={handleChange} placeholder="Roll Number" />
        <input name="clgbranch" value={formData.clgbranch} onChange={handleChange} placeholder="Branch" />
        <input name="clgyear" value={formData.clgyear} onChange={handleChange} placeholder="Year" />
        <input name="clgsem" value={formData.clgsem} onChange={handleChange} placeholder="Semester" />
        <input name="clgsection" value={formData.clgsection} onChange={handleChange} placeholder="Section" />
        <input name="clgstate" value={formData.clgstate} onChange={handleChange} placeholder="State" />

        <button type="submit">Sign Up</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default StudentSignupPage;
