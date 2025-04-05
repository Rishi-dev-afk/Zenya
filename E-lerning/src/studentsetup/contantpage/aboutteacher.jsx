import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export default function UnassignedFaculty() {
    // const navigate = useNavigate();
    const location = useLocation();

    const [facultyList, setFacultyList] = useState([]);

    
  const userData = location.state || {};
  console.log(userData.admindata.id)
  const adminId = userData.admindata.id;
    // Fetch unassigned faculty
    useEffect(() => {
        axios
            .get(`https://zenya.onrender.com/api/faculty/unassigned/${adminId}`)
            .then((res) => setFacultyList(res.data.faculty))
            .catch((err) => console.error("Error fetching faculty:", err));
    }, [adminId]);

    // Handle Assign
    const assignFaculty = async (facultyId) => {
        try {
            await axios.post("https://zenya.onrender.com/api/faculty/assign", {
                admin_id: adminId,
                faculty_id: facultyId,
            });

            // Remove assigned faculty from list
            setFacultyList(facultyList.filter((f) => f.id !== facultyId));
        } catch (err) {
            console.error("❌ Error assigning faculty:", err);
        }
    };

    return (
        <Container className="mt-4">
            <h3>Unassigned Faculty</h3>
            <Row>
                {facultyList.map((faculty) => (
                    <Col md={4} key={faculty.id} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{faculty.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{faculty.email}</Card.Subtitle>
                                <Card.Text>
                                    <strong>Age:</strong> {faculty.age} <br />
                                    <strong>Experience:</strong> {faculty.experience} years <br />
                                    <strong>Specialization:</strong> {faculty.specialization}
                                </Card.Text>
                                <Button
                                    variant="primary"
                                    onClick={() => assignFaculty(faculty.id)}
                                >
                                    Assign to Me
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
