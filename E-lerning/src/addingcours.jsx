import { useState } from 'react';
import axios from 'axios';

function CourseForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    fee: '',
    rating: '',
    course: '',
    faculty_id: '',
    faculty_name: '',
    admin_id: '',
  });


  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
      const response = await axios.post('https://zenya.onrender.com/api/course/create', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Course created successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
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
        <input
          type="text"
          className="form-control"
          placeholder="Faculty Name"
          name="faculty_name"
          value={formData.faculty_name}
          onChange={handleInputChange}
        />
        <span className="input-group-text">@example.com</span>
      </div>

      <div className="mb-3">
        <label htmlFor="basic-url" className="form-label">Your vanity URL</label>
        <div className="input-group">
          <span className="input-group-text">https://example.com/users/</span>
          <input
            type="text"
            className="form-control"
            id="basic-url"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-text">Example help text goes outside the input group.</div>
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
        <input
          type="text"
          className="form-control"
          placeholder="Faculty ID"
          name="faculty_id"
          value={formData.faculty_id}
          onChange={handleInputChange}
        />
        <span className="input-group-text">@</span>
        <input
          type="text"
          className="form-control"
          placeholder="Admin ID"
          name="admin_id"
          value={formData.admin_id}
          onChange={handleInputChange}
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
        <span className="input-group-text">With textarea</span>
        <textarea
          className="form-control"
          placeholder="Course Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary">Create Course</button>
    </form>
  );
}

export default CourseForm;
