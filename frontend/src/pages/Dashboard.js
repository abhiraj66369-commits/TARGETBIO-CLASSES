import { useEffect, useState } from "react";
import "../styles/dashboard.css";

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const student = JSON.parse(localStorage.getItem("student"));

  // 🔒 Login protection
  useEffect(() => {
    if (!student) {
      window.location.href = "/login";
    }
  }, [student]);

  // 📚 Fetch courses
  useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error(err));
  }, []);

  if (!student) return null;

  return (
    <div className="dashboard">

      <div className="welcome-card">
        <h2>Welcome, {student.name} 👋</h2>
        <p>Your enrolled & available courses</p>
      </div>

      <h3>Courses</h3>

      <div className="course-grid">
        {courses.map((course) => (
          <div className="course-card" key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>

            {course.paid ? (
              <button className="locked">Locked</button>
            ) : (
              <button onClick={() => window.location.href = `/course/${course.id}`}>View Course</button>

            )}
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;
