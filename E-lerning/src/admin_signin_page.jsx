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
          <form>
  <div className="input-group mb-3">
    <span className="input-group-text">@</span>
    <input type="text" className="form-control" placeholder="Username" />
  </div>

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

  <button className="btn ">Submit</button>
</form>

        </div>
      </div>
    </div>
  );
};

export default AdminsigninPage;
