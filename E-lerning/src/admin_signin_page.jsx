import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './admin_signin_page.css';

const AdminsigninPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    age: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const res = await fetch("https://zenya.onrender.com/api/admin/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setFormData({
          username: "",
          email: "",
          password: "",
          name: "",
          age: "",
        });
      } else {
        setError(data.error || "Signup failed");
      }
      navigate("/admin", { state: data });
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="con">
      {/* Left Side: Signup Form */}
      <div className="frst">
        <div className="form-container">
          <h2>Admin Signup</h2>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
  <div className="input-group mb-3">
    <span className="input-group-text">@</span>
    <input
      type="text"
      name="username"
      className="form-control"
      placeholder="Username"
      value={formData.username}
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

  <button className="btn">Submit</button>
</form>


        </div>
      </div>
    </div>
  );
};

export default AdminsigninPage;
