import { useState } from "react";

function TeacherRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerTeacher = async () => {
    try {
      const res = await fetch("http://localhost:5000/teacher/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      // 🔥 IMPORTANT FIX
      const text = await res.text();   // pehle text lo
      const data = text ? JSON.parse(text) : {};

      if (!res.ok) {
        setMsg(data.message || "Registration failed");
        return;
      }

      setMsg(`Registered Successfully 🎉  
Teacher ID: ${data.teacherId}`);

    } catch (err) {
      console.error(err);
      setMsg("Server error ❌");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Teacher Register</h2>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button onClick={registerTeacher}>Register</button>

      {msg && <p>{msg}</p>}
    </div>
  );
}

export default TeacherRegister;
