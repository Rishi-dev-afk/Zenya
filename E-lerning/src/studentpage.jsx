import { useLocation } from "react-router-dom";

export default function StudentPage() {
    const location = useLocation();
    const userData = location.state || {}; 
    console.log(userData)
    return (
        <div className="student-page">
            <h1>Student Page</h1>
            <p>Welcome to the student page!</p>
            <p>Here you can view your courses, grades, and other student-related information.</p>
        </div>
    );
}