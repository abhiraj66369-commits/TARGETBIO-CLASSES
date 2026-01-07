import { useState } from "react";
import "../styles/auth.css";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password })
    });

    const data = await res.json();

    if (!res.ok) return setMsg(data.message);

    localStorage.setItem("student", JSON.stringify(data.student));
    window.location.href = "/dashboard";
  };

  return (
    <div className="auth-container">
      <h2>Student Login</h2>
      <input placeholder="Student ID" onChange={e => setId(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      {msg && <p style={{ color: "red" }}>{msg}</p>}
    </div>
  );
}

export default Login;
