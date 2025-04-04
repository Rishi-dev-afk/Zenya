import { useLocation } from "react-router-dom";

export default function FacultyPage() {
    const location = useLocation();
    const userData = location.state || {}; 
    console.log(userData)
    return (
        <div className="faculty-page">
            <h1>Faculty Page</h1>
            <p>Welcome to the faculty page!</p>
            <p>Here you can manage courses, grades, and other faculty-related tasks.</p>
        </div>
    );
}