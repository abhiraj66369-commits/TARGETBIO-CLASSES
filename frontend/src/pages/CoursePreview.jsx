import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CoursePreview() {
  const { id } = useParams();
  const [content, setContent] = useState([]);

  useEffect(() => {
    fetch(`https://target-bio-classes.onrender.com/course/${id}/content`)
      .then(res => res.json())
      .then(data => {
        setContent(data.filter(c => !c.locked));
      });
  }, [id]);

  return (
    <div style={{ padding: 30 }}>
      <h2>Free Course Content</h2>

      {content.length === 0 && <p>No free content available</p>}

      {content.map(c => (
        <div key={c.id} style={{ marginBottom: 20 }}>
          <h4>{c.title}</h4>

          {c.category === "video" && (
            <video
              src={`http://localhost:5000${c.fileUrl}`}
              controls
              width="400"
            />
          )}

          {c.category === "pdf" && (
            <a
              href={`http://localhost:5000${c.fileUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              View PDF
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

export default CoursePreview;
