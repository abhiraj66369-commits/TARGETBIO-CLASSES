import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TeacherLogin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setMsg("");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/teacher/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: id.trim(),
          password: password.trim()
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.message || "Login failed");
        return;
      }

      // ✅ BACKEND SIRF teacher OBJECT bhej raha hai
      localStorage.setItem("teacher", JSON.stringify(data));

      // ✅ Redirect
      navigate("/teacher-dashboard");

    } catch (error) {
      console.error(error);
      setMsg("Server not reachable");
    }
  };

  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        width: "320px",
        padding: "25px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          👨‍🏫 Guru Login
        </h2>

        <input
          type="text"
          placeholder="Teacher ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={handleLogin}
          style={buttonStyle}
        >
          Login
        </button>

        {msg && (
          <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  outline: "none"
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  background: "#ff9800",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer"
};

export default TeacherLogin;
