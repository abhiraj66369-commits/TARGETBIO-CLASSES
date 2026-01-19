import "../styles/admissionSuccess.css";

function AdmissionSuccess() {
  return (
    <div className="success-page">
      <div className="success-card">

        <div className="success-icon">✅</div>

        <h2>Admission Submitted Successfully!</h2>

        <p className="success-text">
          Thank you for applying to <b>Target Bio Classes</b>.
          <br />
          Your admission request has been received.
        </p>

        <div className="info-box">
          <p>📩 OTP Verified</p>
          <p>🕒 Admission under review</p>
          <p>👨‍🏫 Teacher approval pending</p>
        </div>

        <p className="note">
          Once your admission is approved, your <b>Student ID & Password</b>
          will be sent to your registered email.
        </p>

        <div className="success-actions">
          <a href="/" className="btn outline">
            Go to Home
          </a>
          <a href="/login" className="btn primary">
            Student Login
          </a>
        </div>

      </div>
    </div>
  );
}

export default AdmissionSuccess;