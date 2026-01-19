import { useEffect } from "react";
import "../styles/studentProfile.css";

function StudentProfile() {
  const student = JSON.parse(localStorage.getItem("student"));

  useEffect(() => {
    if (!student) {
      window.location.href = "/login";
    }
  }, [student]);

  if (!student) return null;

  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* HEADER */}
        <div className="profile-header">
          <div className="avatar">
            {student.name.charAt(0)}
          </div>
          <h2>{student.name}</h2>
          <p>Student ID: <b>{student.id}</b></p>
        </div>

        {/* DETAILS */}
        <div className="profile-section">
          <h3>👤 Personal Details</h3>

          <div className="info-row">
            <span>Email</span>
            <span>{student.email}</span>
          </div>

          <div className="info-row">
            <span>Phone</span>
            <span>{student.phone}</span>
          </div>

          {student.fatherName && (
            <div className="info-row">
              <span>Father Name</span>
              <span>{student.fatherName}</span>
            </div>
          )}
        </div>

        {/* COURSES */}
        <div className="profile-section">
          <h3>📚 Enrolled Courses</h3>

          {student.courses && student.courses.length > 0 ? (
            <ul className="course-list">
              {student.courses.map((c, i) => (
                <li key={i}>✔ Course ID: {c}</li>
              ))}
            </ul>
          ) : (
            <p>No courses enrolled</p>
          )}
        </div>

        {/* ACTIONS */}
        <div className="profile-actions">
          <button
            className="dashboard-btn"
            onClick={() => window.location.href = "/dashboard"}
          >
            Go to Dashboard
          </button>

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("student");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default StudentProfile;
