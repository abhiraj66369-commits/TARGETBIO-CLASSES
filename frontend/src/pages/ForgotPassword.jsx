import { useState } from "react";
import "../styles/auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [msg, setMsg] = useState("");

  const sendOtp = async () => {
    const res = await fetch("${process.env.REACT_APP_API_URL}/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    if (!res.ok) return setMsg(data.message);

    alert(data.message);
    setStep(2);
  };

  const resetPassword = async () => {
    const res = await fetch("${process.env.REACT_APP_API_URL}/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, newPassword })
    });

    const data = await res.json();
    if (!res.ok) return setMsg(data.message);

    alert("Password changed");
    window.location.href = "/login";
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>

      {step === 1 && (
        <>
          <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input placeholder="OTP" onChange={e => setOtp(e.target.value)} />
          <input type="password" placeholder="New Password" onChange={e => setNewPassword(e.target.value)} />
          <button onClick={resetPassword}>Reset</button>
        </>
      )}

      {msg && <p style={{ color: "red" }}>{msg}</p>}
    </div>
  );
}

export default ForgotPassword;
