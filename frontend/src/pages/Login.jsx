import { useState } from "react";
import "../styles/login.css";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!id || !password) {
      setMsg("Please enter Student ID & Password");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.message || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("student", JSON.stringify(data.student));
      window.location.href = "/dashboard";
    } catch (err) {
      setMsg("Server error. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2>🎓 Student Login</h2>
          <p>Access your courses & continue learning</p>
        </div>

        <div className="login-form">
          <label>Student ID</label>
          <input
            type="text"
            placeholder="Enter Student ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {msg && <div className="login-error">{msg}</div>}
        </div>

        <div className="login-footer">
          <span>🔐 Secure Student Portal</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
