import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/courses.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(() => setCourses([]));
  }, []);

  if (courses.length === 0) {
    return <p style={{ padding: 40 }}>No courses available</p>;
  }

  return (
    <div className="courses-page">
      <h2>Our Courses</h2>

      <div className="course-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>

            <div className="price">
              {course.price === "FREE" ? "FREE" : `₹ ${course.price}`}
            </div>

            <button
              onClick={() => navigate(`/course/${course.id}/preview`)}
            >
              View Free Content
            </button>

            <button
              className="admission-btn"
              onClick={() => navigate("/admission")}
            >
              Take Admission
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
