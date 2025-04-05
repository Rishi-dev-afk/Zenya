import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; // To get facultyId from URL (optional)
import axios from 'axios';
import { useLocation } from "react-router-dom";

const FacultyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const userData = location.state || {};
  console.log(userData.admindata.id)
  const facultyId = userData.admindata.id; // Assuming facultyId is passed in the state

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`https://zenya.onrender.com/api/course/faculty/${facultyId}`);
        setCourses(res.data.courses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, [facultyId]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Faculty Courses</h2>
      <Row>
        {courses.length > 0 ? (
          courses.map((course) => (
            <Col md={12} key={course.id} className="mb-4">
              <Card>
                <Card.Body>
                  <h4><strong>Course Name:</strong> {course.name}</h4>
                  <p><strong>Description:</strong> {course.description}</p>
                  <p><strong>Duration:</strong> {course.duration}</p>
                  <p><strong>Fee:</strong> ₹{course.fee}</p>
                  <p><strong>Rating:</strong> {course.rating}</p>
                  <p><strong>Course Type:</strong> {course.course}</p>
                  <p><strong>Faculty Name:</strong> {course.faculty_name}</p>
                  <p><strong>Faculty ID:</strong> {course.faculty_id}</p>
                  <p><strong>Admin ID:</strong> {course.admin_id}</p>
                  <p><strong>Created At:</strong> {new Date(course.created_at).toLocaleString()}</p>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <h5 className="text-center">No courses found for this faculty.</h5>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default FacultyCourses;

