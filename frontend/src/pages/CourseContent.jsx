import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/courseContentPremium.css";

function CourseContent() {
  const { id } = useParams();
  const student = JSON.parse(localStorage.getItem("student"));

  const [content, setContent] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [progress, setProgress] = useState({ completed: [], lastContentId: null });

  /* ================= FETCH CONTENT ================= */
  useEffect(() => {
    let url = `http://localhost:5000/course/${id}/content`;
    if (student) url += `?studentId=${student.id}`;

    fetch(url).then(r => r.json()).then(setContent);
  }, [id]);

  /* ================= FETCH PROGRESS ================= */
  useEffect(() => {
    if (!student) return;

    fetch(`http://localhost:5000/progress/${student.id}/${id}`)
      .then(r => r.json())
      .then(setProgress);
  }, [id]);

  /* ================= SAVE PROGRESS ================= */
  const saveProgress = (contentId, completed = false) => {
    fetch("http://localhost:5000/progress/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: student.id,
        courseId: id,
        contentId,
        completed
      })
    });
  };

  /* ================= GROUP ================= */
  const grouped = content.reduce((acc, c) => {
    acc[c.category] = acc[c.category] || [];
    acc[c.category].push(c);
    return acc;
  }, {});

  return (
    <div className="course-content-page">
      <h2 className="page-title">📚 Course Content</h2>

      {/* FOLDERS */}
      <div className="folder-grid">
        {Object.keys(grouped).map(cat => (
          <div
            key={cat}
            className={`folder-card ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            📁 {cat.toUpperCase()}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      {activeCategory && grouped[activeCategory].map((c, i) => {
        const completed = progress.completed.includes(c.id);
        const isLast = progress.lastContentId === c.id;

        return (
          <div
            key={c.id}
            className={`content-card ${isLast ? "last-watched" : ""}`}
          >
            <h4>
              {i + 1}. {c.title}
              {completed && <span className="done"> ✔</span>}
            </h4>

            {c.locked ? (
              <div className="locked-box">🔒 Locked</div>
            ) : (
              <>
                {c.category === "video" && (
                  <video
                    src={`http://localhost:5000${c.fileUrl}`}
                    controls
                    onTimeUpdate={(e) => {
                      const percent =
                        (e.target.currentTime / e.target.duration) * 100;
                      if (percent > 10) saveProgress(c.id);
                      if (percent > 90) saveProgress(c.id, true);
                    }}
                    className="video-player"
                  />
                )}

                {c.category === "pdf" && (
                  <a
                    href={`http://localhost:5000${c.fileUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => saveProgress(c.id, true)}
                    className="pdf-btn"
                  >
                    📄 Open PDF
                  </a>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CourseContent;
