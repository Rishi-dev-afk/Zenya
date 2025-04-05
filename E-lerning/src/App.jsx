import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import MainPage from './mainpage.jsx';
import AdminLoginPage from './admin_login_page.jsx';
import AdminsigninPage from './admin_signin_page.jsx';
import Facultyloginpage from './faculty_login_page.jsx';
import Facultysigninpage from './faculty_signin_page.jsx';
import Studentloginpage from './student_login_page.jsx';
import Studentsigninpage from './student_signin_page.jsx';
import StudentPage from './studentpage.jsx';
import AdminPage from './adminpage.jsx';
import FacultyPage from './facultypage.jsx';
import CourseForm from './addingcours.jsx';

import { useState } from "react";

function Header() {
  const [dropdown, setDropdown] = useState(null);

  const toggleDropdown = (role) => {
    setDropdown(dropdown === role ? null : role);
  };

  const roles = ["admin", "faculty", "student"];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 py-3 shadow-sm position-relative">
{/*       
      /*<Link className="navbar-brand fw-bold me-4" to="/"></Link> */ }

      {}
      <ul className="navbar-nav d-flex flex-row gap-4">
        {roles.map((role) => (
          <li className="nav-item dropdown" key={role}>
            <button
              className="btn btn-link nav-link dropdown-toggle text-capitalize"
              onClick={() => toggleDropdown(role)}
            >
              {role}
            </button>
            {dropdown === role && (
              <ul className="dropdown-menu show position-absolute">
                <li><Link className="dropdown-item" to={`/${role}/login`}>Login</Link></li>
                <li><Link className="dropdown-item" to={`/${role}/signin`}>Sign Up</Link></li>
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

function AppContent() {
  const location = useLocation();
  const isLoginOrSignin = location.pathname.match(/\/(admin|faculty|student)\/(login|signin)/);

  return (
    <>
      {}
      {!isLoginOrSignin && <Header />}

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/signin" element={<AdminsigninPage />} />
        <Route path="/faculty/login" element={<Facultyloginpage />} />
        <Route path="/faculty/signin" element={<Facultysigninpage />} />
        <Route path="/student/login" element={<Studentloginpage />} />
        <Route path="/student/signin" element={<Studentsigninpage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/faculty" element={<FacultyPage />} />
        <Route path="/course/:id" element={<CourseForm />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
      <Analytics />
    </Router>
  );
}

export default App;
