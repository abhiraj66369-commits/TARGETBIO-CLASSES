import { useEffect, useState } from "react";
import "../styles/uploadContent.css";

function UploadContent() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    courseId: "",
    title: "",
    category: "pdf",
    accessType: "FREE"
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  /* LOAD COURSES */
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/courses`)
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpload = async () => {
    if (!file || !form.courseId || !form.title)
      return alert("All fields required");

    const fd = new FormData();
    fd.append("courseId", form.courseId);
    fd.append("title", form.title);
    fd.append("category", form.category);
    fd.append("accessType", form.accessType);
    fd.append("file", file);

    setLoading(true);

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/teacher/content/upload`,
      { method: "POST", body: fd }
    );

    const data = await res.json();
    setLoading(false);

    if (!res.ok) return alert(data.message);
    alert("✅ Content Uploaded Successfully");

    setForm({ courseId: "", title: "", category: "pdf", accessType: "FREE" });
    setFile(null);
  };

  return (
    <div className="upload-wrapper">
      <h2>📤 Upload Course Content</h2>

      <div className="upload-card">
        <select name="courseId" onChange={handleChange}>
          <option value="">Select Course</option>
          {courses.map(c => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        <input
          name="title"
          placeholder="Content Title (Chapter / Topic)"
          onChange={handleChange}
        />

        <div className="row">
          <label>Category</label>
          <select name="category" onChange={handleChange}>
            <option value="pdf">📄 PDF</option>
            <option value="video">🎥 Video</option>
            <option value="image">🖼️ Image / Notes</option>
            <option value="other">📦 Other</option>
          </select>
        </div>

        <div className="toggle">
          <span>Access</span>
          <button
            className={form.accessType === "FREE" ? "active" : ""}
            onClick={() => setForm({ ...form, accessType: "FREE" })}
          >
            FREE
          </button>
          <button
            className={form.accessType === "LOCKED" ? "active locked" : "locked"}
            onClick={() => setForm({ ...form, accessType: "LOCKED" })}
          >
            LOCKED
          </button>
        </div>

        <label className="file-box">
          {file ? file.name : "📁 Choose File"}
          <input
            type="file"
            hidden
            onChange={e => setFile(e.target.files[0])}
          />
        </label>

        {file && (
          <div className="preview">
            <span>{file.type}</span>
            <span>{(file.size / 1024).toFixed(1)} KB</span>
          </div>
        )}

        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "🚀 Upload Content"}
        </button>
      </div>
    </div>
  );
}

export default UploadContent;
