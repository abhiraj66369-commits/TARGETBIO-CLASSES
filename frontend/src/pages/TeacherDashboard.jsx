import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TeacherDashboard.css";

function TeacherDashboard() {
  const navigate = useNavigate();
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 SAFE teacher read
  let teacher = null;
  try {
    const t = localStorage.getItem("teacher");
    teacher = t ? JSON.parse(t) : null;
  } catch {
    teacher = null;
  }

  // 🔐 Protect route
  useEffect(() => {
    if (!teacher) navigate("/guru-login");
  }, [teacher, navigate]);

  // 📥 Load admissions
  const loadAdmissions = async () => {
    try {
      const res = await fetch("http://localhost:5000/admissions");
      const data = await res.json();
      setAdmissions(data.reverse());
    } catch {
      setAdmissions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmissions();
  }, []);

  // ✅ Approve / Reject
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch("http://localhost:5000/admission/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admissionId: id, status })
      });

      const data = await res.json();
      alert(data.message);
      loadAdmissions(); // 🔁 refresh
    } catch {
      alert("Server error");
    }
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("teacher");
    navigate("/guru-login");
  };

  return (
    <div className="td-page">

      {/* ===== HEADER ===== */}
      <div className="td-header">
        <div>
          <h2>👨‍🏫 Guru Dashboard</h2>
          <p>Manage student admissions & courses</p>
        </div>

        <div className="td-actions">
          <button onClick={() => navigate("/add-course")}>➕ Add Course</button>
          <button onClick={() => navigate("/upload-content")}>📤 Upload Content</button>
          <button onClick={() => navigate("/teacher-analytics")}>
📊 Analytics
</button>
<button onClick={() => navigate("/teacher/course-students")}>
📚 Course Students
</button>
<button onClick={() => navigate("/teacher/profile")}>
👤 My Profile
</button>
          <button className="logout" onClick={logout}>Logout</button>

        </div>
      </div>

      {/* ===== BODY ===== */}
      <h3 className="section-title">📋 Student Admissions</h3>

      {loading && <p className="info-text">Loading admissions...</p>}
      {!loading && admissions.length === 0 && (
        <p className="info-text">No admissions found</p>
      )}

      <div className="admission-grid">
        {admissions.map(a => (
          <div key={a.id} className="admission-card">

            {/* LEFT */}
            <div className="admission-info">
              <h4>{a.name}</h4>
              <p><b>Email:</b> {a.email}</p>
              <p><b>Course ID:</b> {a.courseId}</p>

              <span className={`status-badge ${a.status.toLowerCase()}`}>
                {a.status}
              </span>
            </div>

            {/* RIGHT */}
            <div className="admission-right">
              {a.paymentProof && (
                <img
                  src={`http://localhost:5000${a.paymentProof}`}
                  alt="Payment Proof"
                  className="proof-img"
                  onClick={() =>
                    window.open(
                      `http://localhost:5000${a.paymentProof}`,
                      "_blank"
                    )
                  }
                />
              )}

              {a.status === "WAITING" && (
                <div className="action-buttons">
                  <button
                    className="approve"
                    onClick={() => updateStatus(a.id, "APPROVED")}
                  >
                    ✅ Approve
                  </button>
                  <button
                    className="reject"
                    onClick={() => updateStatus(a.id, "REJECTED")}
                  >
                    ❌ Reject
                  </button>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default TeacherDashboard;
