import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/teacherProfile.css";

function TeacherProfile() {
  const navigate = useNavigate();

  let teacher = null;
  try {
    teacher = JSON.parse(localStorage.getItem("teacher"));
  } catch {
    teacher = null;
  }

  useEffect(() => {
    if (!teacher) navigate("/guru-login");
  }, [teacher, navigate]);

  if (!teacher) return null;

  return (
    <div className="teacher-profile-page">

      <div className="profile-card">
        <div className="avatar">👨‍🏫</div>

        <h2>{teacher.name || "Teacher"}</h2>
        <p className="role">Senior Faculty</p>

        <div className="info">
          <p><b>Teacher ID:</b> {teacher.id}</p>
          <p><b>Email:</b> {teacher.email}</p>
          <p><b>Subject:</b> Biology</p>
        </div>

        <div className="actions">
          <button onClick={() => navigate("/teacher-dashboard")}>
            ⬅ Back to Dashboard
          </button>

          <button
            className="logout"
            onClick={() => {
              localStorage.removeItem("teacher");
              navigate("/guru-login");
            }}
          >
            Logout
          </button>
        </div>
      </div>

    </div>
  );
}

export default TeacherProfile;
