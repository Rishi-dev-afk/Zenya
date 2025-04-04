
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import './App.css'

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


function App() {

  return (
    <> 
      <Router>
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
        </Routes>
      </Router>
      <Analytics />
    </>
  )
}

export default App
