import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* ===== STUDENT PAGES ===== */
import Home from "./pages/Home";
import Login from "./pages/Login";
// import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CourseDetail from "./pages/CourseDetail";
import Admission from "./pages/Admission";
// import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CoursePreview from "./pages/CoursePreview";
// import CourseDetail from "./pages/CourseDetail";
import CourseContent from "./pages/CourseContent";
// import OtpLogin from "./pages/OtpLogin";
import ForgotPassword from "./pages/ForgotPassword";
import StudentProfile from "./pages/StudentProfile";
import TeacherAnalytics from "./pages/TeacherAnalytics";
import CourseStudents from "./pages/CourseStudents";

/* ===== TEACHER (GURU) PAGES ===== */
import TeacherLogin from "./pages/TeacherLogin";
import TeacherRegister from "./pages/TeacherRegister";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherCourses from "./pages/TeacherCourses";
import UploadContent from "./pages/UploadContent";
import TeacherProfile from "./pages/TeacherProfile";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* ===== MAIN LAYOUT ===== */}
      <div className="app-layout">
        <Navbar />

        {/* ===== PAGE CONTENT ===== */}
        <div className="page-content">
          <Routes>
            {/* ===== PUBLIC / STUDENT ROUTES ===== */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/course" element={<CourseDetail />} />
            <Route path="/admission" element={<Admission />} />
            {/* <Route path="/otp-login" element={<OtpLogin />} /> */}
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* ===== TEACHER / GURU ROUTES ===== */}
            <Route path="/guru-login" element={<TeacherLogin />} />
            <Route path="/guru-register" element={<TeacherRegister />} />
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher-courses" element={<TeacherCourses />} />
            <Route path="/upload-content" element={<UploadContent />} />
            <Route path="/add-course" element={<TeacherCourses />} />
            <Route path="/guru-login" element={<TeacherLogin />} />
<Route path="/teacher-dashboard" element={<TeacherDashboard />} />
<Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/course/:id/preview" element={<CoursePreview />} />
        <Route path="/course/:id/content" element={<CourseContent />} />
        <Route path="/teacher-analytics" element={<TeacherAnalytics />} />
        <Route path="/teacher/course-students" element={<CourseStudents />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />
          </Routes>
        </div>

        {/* ===== FOOTER ===== */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}



const API_URL = import.meta.env.VITE_API_URL;

// src/App.jsx

export default App;