import { useEffect, useState } from "react";
import "../styles/admissionClean.css";

function Admission() {
  const [step, setStep] = useState(1);
  const [courses, setCourses] = useState([]);
  const [paymentImage, setPaymentImage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    fullAddress: "",
    phone: "",
    email: "",
    courseId: "",
    otp: ""
  });

  // 🔹 Fetch courses
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/courses`)
      .then(res => res.json())
      .then(setCourses)
      .catch(() => setCourses([]));
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ================= OTP ================= */
  const sendOtp = async () => {
  if (!form.email || !form.courseId) {
    alert("Please fill email & select course");
    return;
  }

  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/send-otp`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email })
      }
    );

    const data = await res.json();

    if (!res.ok || !data.success) {
      alert(data.message || "OTP send failed");
      return;
    }

    alert("OTP sent to your email");
    setStep(2);

  } catch (err) {
    alert("Network error");
  }
};


// --------------------------------- VERIFY OTP -----------------------------
  const verifyOtp = async () => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/verify-otp`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          otp: String(form.otp)
        })
      }
    );

    const data = await res.json();

    if (!res.ok || !data.success) {
      alert(data.message || "OTP invalid");
      return;
    }

    alert("OTP verified");
    setStep(3);

  } catch (err) {
    alert("Verify OTP failed");
  }
};

  /* ================= SUBMIT ADMISSION ================= */
  const submitAdmission = async () => {
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append("paymentProof", paymentImage);

    if (!paymentImage) {
  alert("Please upload payment screenshot");
  return;
}

    const res = await fetch(
  `${process.env.REACT_APP_API_URL}/admission`, {
      method: "POST",
      body: fd
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="admission-page">
      <div className="admission-box">

        {/* HEADER */}
        <div className="admission-header">
          <h2>🎓 Student Admission</h2>
          <p>Secure • OTP Verified • Teacher Approved</p>
        </div>

        {/* STEPS */}
        <div className="steps">
          <span className={step >= 1 ? "active" : ""}>1 Details</span>
          <span className={step >= 2 ? "active" : ""}>2 OTP</span>
          <span className={step >= 3 ? "active" : ""}>3 Payment</span>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="form-grid">
            <input name="name" placeholder="Student Name" onChange={handleChange} />
            <input name="fatherName" placeholder="Father Name" onChange={handleChange} />
            <input name="phone" placeholder="Phone Number" onChange={handleChange} />
            <input name="email" placeholder="Email Address" onChange={handleChange} />

            <textarea
              name="fullAddress"
              placeholder="Full Address"
              onChange={handleChange}
            />

            <select name="courseId" onChange={handleChange}>
              <option value="">Select Course</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>
                  {c.title} – ₹{c.price}
                </option>
              ))}
            </select>

            <button
  type="button"
  className="primary-btn"
  onClick={sendOtp}
>
  Send OTP →
</button>

          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="form-grid">
            <input
              name="otp"
              placeholder="Enter OTP"
              onChange={handleChange}
            />
            <button className="primary-btn" onClick={verifyOtp}>
              Verify OTP →
            </button>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="form-grid">
            <label className="upload-box">
              Upload Payment Screenshot
              <input
                type="file"
                hidden
                onChange={e => setPaymentImage(e.target.files[0])}
              />
            </label>

            <button className="primary-btn" onClick={submitAdmission}>
              Submit Admission ✔
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Admission;