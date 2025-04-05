import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import Heder from './component/heder.jsx';


function AppContent() {
  const location = useLocation();

  // Hide Header on login/signin + dashboard pages
  const noHeaderPages = new Set([
    '/',
    '/admin/login',
    '/admin/signin',
    '/faculty/login',
    '/faculty/signin',
    '/student/login',
    '/student/signin',
    '/student',
    '/admin',
    '/faculty',
  ]);

  // Handle dynamic route like /course/:id
  const isCourseRoute = /^\/course\/[^/]+$/.test(location.pathname);

  const hideHeader = noHeaderPages.has(location.pathname) || isCourseRoute;

  return (
    <>
      {!hideHeader && <Heder />}

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/signin" element={<AdminsigninPage />} />
        <Route path="/faculty/login" element={<Facultyloginpage />} />
        <Route path="/faculty/signin" element={<Facultysigninpage />} />
        <Route path="/student/login" element={<Studentloginpage />} />
        <Route path="/student/signin" element={<Studentsigninpage />} />

        {/* Pages without header */}
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
