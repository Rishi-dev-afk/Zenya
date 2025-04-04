import { useState } from 'react';

const FacultySignupPage = () => {
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
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Faculty Signup</h2>

      <form onSubmit={handleSubmit}>
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" type="password" required />
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input name="age" value={formData.age} onChange={handleChange} placeholder="Age" type="number" required />
        <input name="clgname" value={formData.clgname} onChange={handleChange} placeholder="College Name" />
        <input name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience (years)" />
        <input name="specialization" value={formData.specialization} onChange={handleChange} placeholder="Specialization" />
        <input name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating (0-5)" />

        <button type="submit">Sign Up</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FacultySignupPage;
