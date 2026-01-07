import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/courseContent.css";

function CourseContent() {
  const { id } = useParams();
  const [content, setContent] = useState([]);

  let student = null;
  try {
    student = JSON.parse(localStorage.getItem("student"));
  } catch {}

  const hasAccess =
    student && student.courses?.includes(Number(id));

  useEffect(() => {
    fetch(`http://localhost:5000/content/${id}`)
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(() => setContent([]));
  }, [id]);

  const renderContent = (c) => {
    if (c.type === "video")
      return <video src={`http://localhost:5000${c.fileUrl}`} controls />;

    if (c.type === "pdf")
      return <a href={`http://localhost:5000${c.fileUrl}`} target="_blank" rel="noreferrer">📄 Open PDF</a>;

    if (c.type === "image")
      return <img src={`http://localhost:5000${c.fileUrl}`} alt="" />;

    return <a href={`http://localhost:5000${c.fileUrl}`} target="_blank">Download</a>;
  };

  return (
    <div className="course-content-page">
      <h2>Course Content</h2>

      {content.map(c => {
        const locked = c.locked && !hasAccess;

        return (
          <div key={c.id} className={`content-card ${locked ? "locked" : ""}`}>
            <h4>{c.title}</h4>

            {locked ? (
              <div className="lock-msg">
                🔒 Locked – Admission required
              </div>
            ) : (
              renderContent(c)
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CourseContent;
