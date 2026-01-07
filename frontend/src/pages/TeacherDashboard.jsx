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

      // ✅ ALWAYS reload from server (IMPORTANT FIX)
      loadAdmissions();
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
    <div className="teacher-dashboard">
      <h2>Welcome Guru 👨‍🏫</h2>

      <div className="top-buttons">
        <button onClick={() => navigate("/add-course")}>➕ Add Course</button>
        <button onClick={() => navigate("/upload-content")}>📤 Upload Content</button>
        <button className="logout" onClick={logout}>Logout</button>
      </div>

      <h3>Student Admissions</h3>

      {loading && <p>Loading...</p>}
      {!loading && admissions.length === 0 && <p>No admissions found</p>}

      <div className="admission-list">
        {admissions.map(a => (
          <div key={a.id} className="admission-card">
            <div className="info">
              <p><b>Name:</b> {a.name}</p>
              <p><b>Email:</b> {a.email}</p>
              <p><b>Course:</b> {a.courseId}</p>
            </div>

            {a.paymentProof && (
              <img
                src={`http://localhost:5000${a.paymentProof}`}
                alt="Payment Proof"
                className="proof-img"
                onClick={() =>
                  window.open(`http://localhost:5000${a.paymentProof}`, "_blank")
                }
              />
            )}

            <p className={`status ${a.status.toLowerCase()}`}>
              Status: {a.status}
            </p>

            {a.status === "WAITING" && (
              <div className="action-buttons">
                <button
                  className="approve"
                  onClick={() => updateStatus(a.id, "APPROVED")}
                >
                  Approve
                </button>

                <button
                  className="reject"
                  onClick={() => updateStatus(a.id, "REJECTED")}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeacherDashboard;
