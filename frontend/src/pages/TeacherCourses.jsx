import { useEffect, useState } from "react";

function TeacherCourses() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const loadCourses = async () => {
    const res = await fetch("http://localhost:5000/courses");
    const data = await res.json();
    setCourses(data);
  };

  const addCourse = async () => {
    await fetch("http://localhost:5000/teacher/course/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, price })
    });

    setTitle("");
    setDescription("");
    setPrice("");
    loadCourses();
  };

  const deleteCourse = async (id) => {
    await fetch("http://localhost:5000/teacher/course/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });

    loadCourses();
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>📚 Manage Courses</h2>

      <input placeholder="Course Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={addCourse}>Add Course</button>

      <hr />

      {courses.map(c => (
        <div key={c.id} style={{
          border: "1px solid #ccc",
          padding: "10px",
          margin: "10px 0"
        }}>
          <h4>{c.title}</h4>
          <p>{c.description}</p>
          <p>₹ {c.price}</p>

          <button
            style={{ background: "red", color: "white" }}
            onClick={() => deleteCourse(c.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TeacherCourses;
