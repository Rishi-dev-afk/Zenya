import { useLocation } from "react-router-dom";

export default function AdminPage() {
    const location = useLocation();
    const userData = location.state || {}; 
    console.log(userData)
    return (
        <div className="admin-page">
            <h1>Admin Page</h1>
            <p>Welcome to the admin page!</p>
            <p>Here you can manage users, courses, and other administrative tasks.</p>
        </div>
    );
}