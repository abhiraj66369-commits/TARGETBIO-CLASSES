import { useEffect, useState } from "react";
import "../styles/admission.css";

function Admission() {
  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    phone: "",
    email: "",
    courseId: "",
    otp: ""
  });

  const [courses, setCourses] = useState([]);
  const [paymentImage, setPaymentImage] = useState(null);
  const [step, setStep] = useState(1);

  // 🔹 Fetch courses from backend
  useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(() => setCourses([]));
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const selectedCourse = courses.find(
    c => String(c.id) === String(form.courseId)
  );

  const sendOtp = async () => {
    if (!form.courseId) return alert("Please select a course");

    const res = await fetch("http://localhost:5000/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email })
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message);

    alert(data.message);
    setStep(2);
  };

  const verifyOtp = async () => {
    const res = await fetch("http://localhost:5000/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, otp: form.otp })
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message);

    alert(data.message);
    setStep(3);
  };

  const submitAdmission = async () => {
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append("paymentProof", paymentImage);

    const res = await fetch("http://localhost:5000/admission", {
      method: "POST",
      body: fd
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="admission-container">
      <div className="admission-card">
        <h2>Student Admission</h2>

        {step === 1 && (
          <>
            <input name="name" placeholder="Student Name" onChange={handleChange} />
            <input
              name="fatherName"
              placeholder="Father Name"
              onChange={handleChange}
            />
            <input
              name="fullAddress"
              placeholder="Full Address"
              onChange={handleChange}
            />
            <input name="phone" placeholder="Phone" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />

            <select name="courseId" onChange={handleChange}>
              <option value="">Select Course</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>
                  {c.title} – ₹{c.price}
                </option>
              ))}
            </select>

            {/* Course Preview */}
            {selectedCourse && (
              <div className="course-preview">
                {selectedCourse.image && (
                  <img
                    src={`http://localhost:5000${selectedCourse.image}`}
                    alt="course"
                  />
                )}
                <p>
                  <b>Price:</b> ₹{selectedCourse.price}
                </p>
              </div>
            )}

            <button onClick={sendOtp}>Send OTP</button>
          </>
        )}

        {step === 2 && (
          <>
            <input name="otp" placeholder="Enter OTP" onChange={handleChange} />
            <button onClick={verifyOtp}>Verify OTP</button>
          </>
        )}

        {step === 3 && (
          <>
            <label>Upload Payment Screenshot</label>
            <input type="file" onChange={e => setPaymentImage(e.target.files[0])} />
            <button onClick={submitAdmission}>Submit Admission</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Admission;
