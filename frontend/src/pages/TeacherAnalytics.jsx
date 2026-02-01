import { useEffect, useState } from "react";
import "../styles/teacherAnalytics.css";

function TeacherAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/teacher/analytics`)
      .then(r => r.json())
      .then(setData);
  }, []);

  if (!data) return <p className="loading">Loading analytics...</p>;

  return (
    <div className="analytics-page">

      <h2>📊 Teacher Analytics</h2>

      {/* CARDS */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <h3>{data.totalStudents}</h3>
          <p>Total Students</p>
        </div>

        <div className="stat-card green">
          <h3>{data.totalCourses}</h3>
          <p>Total Courses</p>
        </div>

        <div className="stat-card purple">
          <h3>{data.approved}</h3>
          <p>Approved Admissions</p>
        </div>

        <div className="stat-card orange">
          <h3>{data.pending}</h3>
          <p>Pending Admissions</p>
        </div>
      </div>

      {/* COURSE STATS */}
      <h3 className="sub">📚 Course-wise Students</h3>

      <div className="course-stats">
        {data.courseStats.map(c => (
          <div key={c.courseId} className="course-row">
            <span>{c.title}</span>
            <span>{c.students} Students</span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default TeacherAnalytics;
