import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE } from "../config";

function CoursePreview() {
  const { id } = useParams();
  const [content, setContent] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/content/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const freeContent = Array.isArray(data)
          ? data.filter((c) => !c.locked)
          : [];
        setContent(freeContent);
      })
      .catch(() => setContent([]));
  }, [id]);

  return (
    <div style={{ padding: 40 }}>
      <h2>Free Course Content</h2>

      {content.length === 0 && <p>No free content available</p>}

      {content.map((c) => (
        <div key={c.id} style={{ marginBottom: 20 }}>
          <h4>{c.title}</h4>

          {c.type === "video" && (
            <video
              src={`${API_BASE}${c.fileUrl}`}
              controls
              width="400"
            />
          )}

          {c.type === "pdf" && (
            <a
              href={`${API_BASE}${c.fileUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 View PDF
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

export default CoursePreview;
