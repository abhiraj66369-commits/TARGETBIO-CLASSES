const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= DATABASE ================= */
const DB = path.join(__dirname, "database");
if (!fs.existsSync(DB)) fs.mkdirSync(DB);

const studentsFile = path.join(DB, "students.json");
const teachersFile = path.join(DB, "teachers.json");
const admissionsFile = path.join(DB, "admissions.json");
const coursesFile = path.join(DB, "courses.json");
const contentsFile = path.join(DB, "contents.json");

[
  studentsFile,
  teachersFile,
  admissionsFile,
  coursesFile,
  contentsFile
].forEach(f => {
  if (!fs.existsSync(f)) fs.writeFileSync(f, "[]");
});

/* ================= UPLOAD ================= */
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

/* ================= OTP ================= */
const otpStore = {};

/* ================= EMAIL ================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL || "targetbiootp@gmail.com",
    pass: process.env.EMAIL_PASS || "rcrtmksjoturvsll"
  }
});

/* ================= TEST ================= */
app.get("/", (req, res) => {
  res.send("🚀 Target Bio LMS Backend Running");
});

/* ================= SEND OTP ================= */
app.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ message: "Email required" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = otp;

    console.log("OTP:", otp);

    await transporter.sendMail({
      to: email,
      subject: "OTP Verification – Target Bio Classes",
      html: `<h2>Your OTP</h2><h1>${otp}</h1>`
    });

    return res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    console.error("OTP ERROR:", err);
    return res.status(500).json({ message: "OTP sending failed" });
  }
});

/* ================= VERIFY OTP ================= */
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] != otp)
    return res.status(400).json({ message: "Invalid OTP" });

  delete otpStore[email];
  res.json({ message: "OTP verified" });
});

/* ================= COURSES ================= */
app.get("/courses", (req, res) => {
  res.json(JSON.parse(fs.readFileSync(coursesFile)));
});

/* ================= ADMISSION ================= */
app.post("/admission", upload.single("paymentProof"), (req, res) => {
  const { name, fatherName, fullAddress, email, phone, courseId } = req.body;
  if (!name || !email || !phone || !courseId || !req.file)
    return res.status(400).json({ message: "All fields required" });

  const admissions = JSON.parse(fs.readFileSync(admissionsFile));
  admissions.push({
    id: Date.now(),
    name,
    fatherName,
    fullAddress,
    email,
    phone,
    courseId,
    paymentProof: `/uploads/${req.file.filename}`,
    status: "WAITING"
  });

  fs.writeFileSync(admissionsFile, JSON.stringify(admissions, null, 2));
  res.json({ message: "Admission submitted" });
});

/* ================= LOGIN ================= */
app.post("/login", (req, res) => {
  const students = JSON.parse(fs.readFileSync(studentsFile));
  const user = students.find(
    u => String(u.id) === String(req.body.id) && u.password === req.body.password
  );
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  res.json({ student: user });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
