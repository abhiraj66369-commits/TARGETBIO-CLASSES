import { useEffect, useState } from "react";
import "../styles/studentDashboard.css";

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const student = JSON.parse(localStorage.getItem("student"));

  // 🔒 Protect route
  useEffect(() => {
    if (!student) {
      window.location.href = "/login";
    }
  }, [student]);

  // 📚 Fetch only enrolled courses
  useEffect(() => {
    if (!student) return;

    fetch("https://target-bio-classes.onrender.com/courses")
      .then(res => res.json())
      .then(data => {
        const enrolled = data.filter(c =>
          student.courses.includes(String(c.id)) ||
          student.courses.includes(c.id)
        );
        setCourses(enrolled);
      });
  }, [student]);

  if (!student) return null;

  return (
    <div className="student-dashboard">

      {/* 🔹 Header */}
      <div className="dashboard-header">
        <h2>Welcome, {student.name} 👋</h2>
        <p>Continue your learning journey 🚀</p>
      </div>

      {/* 📚 Enrolled Courses */}
      <h3 className="section-title">Your Courses</h3>

      {courses.length === 0 && (
        <p className="no-course">You have not enrolled in any course yet.</p>
      )}

      <div className="course-grid">
        {courses.map(course => {
          const progress = Math.floor(Math.random() * 40) + 60; // demo progress

          return (
            <div className="course-card" key={course.id}>
              <div className="course-info">
                <h4>{course.title}</h4>
                <p>{course.description}</p>
              </div>

              {/* 📊 Progress */}
              <div className="progress-box">
                <div className="progress-text">
                  Progress: {progress}%
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* ▶️ Continue Learning */}
              <button
                className="continue-btn"
                onClick={() =>
                  window.location.href = `/course/${course.id}`
                }
              >
                ▶ Continue Learning
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default Dashboard;
