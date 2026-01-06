const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

/* ================= DATABASE FOLDER ================= */
const DB = path.join(__dirname, "database");
if (!fs.existsSync(DB)) fs.mkdirSync(DB);

/* ================= FILES ================= */
const studentsFile = path.join(DB, "students.json");
const teachersFile = path.join(DB, "teachers.json");
const admissionsFile = path.join(DB, "admissions.json");
const coursesFile = path.join(DB, "courses.json");
const contentsFile = path.join(DB, "contents.json");

/* ================= INIT FILES ================= */
[
  studentsFile,
  teachersFile,
  admissionsFile,
  coursesFile,
  contentsFile
].forEach(file => {
  if (!fs.existsSync(file)) fs.writeFileSync(file, "[]");
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

/* ===== CONTENT UPLOAD STORAGE (NEW) ===== */
const contentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/content";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const contentUpload = multer({ storage: contentStorage });

/* ================= OTP STORE ================= */
const otpStore = {};

/* ================= EMAIL ================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "targetbiootp@gmail.com",
    pass: "rcrtmksjoturvsll"
  }
});

/* ================= TEST ================= */
app.get("/", (req, res) => {
  res.send("🚀 Target Bio LMS Backend Running");
});

/* ================= SEND OTP ================= */
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = otp;

  await transporter.sendMail({
    to: email,
    subject: "OTP Verification – Target Bio Classes",
    html: `<h2>Your OTP</h2><h1>${otp}</h1>`
  });

  res.json({ message: "OTP sent" });
});

/* ================= VERIFY OTP ================= */
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] != otp)
    return res.status(400).json({ message: "Invalid OTP" });

  res.json({ message: "OTP verified" });
});

/* ================= COURSES ================= */
app.get("/courses", (req, res) => {
  res.json(JSON.parse(fs.readFileSync(coursesFile)));
});

app.post("/teacher/course/add", (req, res) => {
  const { title, description, price } = req.body;
  if (!title || !description)
    return res.status(400).json({ message: "All fields required" });

  const courses = JSON.parse(fs.readFileSync(coursesFile));
  const newCourse = {
    id: Date.now(),
    title,
    description,
    price: price || "FREE"
  };

  courses.push(newCourse);
  fs.writeFileSync(coursesFile, JSON.stringify(courses, null, 2));
  res.json({ message: "Course added", course: newCourse });
});

app.delete("/teacher/course/delete/:id", (req, res) => {
  let courses = JSON.parse(fs.readFileSync(coursesFile));
  courses = courses.filter(c => String(c.id) !== req.params.id);
  fs.writeFileSync(coursesFile, JSON.stringify(courses, null, 2));
  res.json({ message: "Course deleted" });
});

/* ================= ADMISSION ================= */
app.post("/admission", upload.single("paymentProof"), async (req, res) => {
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

  await transporter.sendMail({
    to: email,
    subject: "Admission Submitted – Target Bio Classes",
    html: `<p>Dear ${name}, your admission is under review.</p>`
  });

  res.json({ message: "Admission submitted" });
});

app.get("/admissions", (req, res) => {
  res.json(JSON.parse(fs.readFileSync(admissionsFile)));
});

/* ================= APPROVE ================= */
app.post("/admission/update", async (req, res) => {
  const { admissionId, status } = req.body;

  const admissions = JSON.parse(fs.readFileSync(admissionsFile));
  const students = JSON.parse(fs.readFileSync(studentsFile));
  const admission = admissions.find(a => String(a.id) === String(admissionId));
  if (!admission) return res.status(404).json({ message: "Not found" });

  admission.status = status;

  if (status === "APPROVED") {
    let student = students.find(s => s.email === admission.email);
    if (!student) {
      const password = Math.random().toString(36).slice(-8);
      student = {
        id: Math.floor(100000 + Math.random() * 900000),
        name: admission.name,
        fatherName: admission.fatherName,
        fullAddress: admission.fullAddress,
        email: admission.email,
        phone: admission.phone,
        password,
        courses: [admission.courseId]
      };
      students.push(student);
    } else if (!student.courses.includes(admission.courseId)) {
      student.courses.push(admission.courseId);
    }
    fs.writeFileSync(studentsFile, JSON.stringify(students, null, 2));
  }

  fs.writeFileSync(admissionsFile, JSON.stringify(admissions, null, 2));
  res.json({ message: "Admission updated" });
});

/* ================= LOGIN ================= */
app.post("/login", (req, res) => {
  const students = JSON.parse(fs.readFileSync(studentsFile));
  const s = students.find(
    u => String(u.id) === String(req.body.id) && u.password === req.body.password
  );
  if (!s) return res.status(401).json({ message: "Invalid credentials" });
  res.json({ student: s });
});

/* ================= TEACHER LOGIN ================= */
app.post("/teacher/login", (req, res) => {
  const { id, password } = req.body;
  const teachers = JSON.parse(fs.readFileSync(teachersFile));

  const teacher = teachers.find(
    t => String(t.id) === String(id) && t.password === password
  );

  if (!teacher)
    return res.status(401).json({ message: "Invalid teacher credentials" });

  res.json({ teacher });
});

/* ================= UPLOAD CONTENT (FIXED) ================= */
app.post(
  "/teacher/content/upload",
  contentUpload.single("file"),
  (req, res) => {
    const { courseId, title, accessType, category } = req.body;
    if (!courseId || !title || !accessType || !category || !req.file)
      return res.status(400).json({ message: "All fields required" });

    const contents = JSON.parse(fs.readFileSync(contentsFile));
    const newContent = {
      id: Date.now(),
      courseId,
      title,
      accessType, // FREE / LOCKED
      category,   // pdf / video / image / notes / other
      fileUrl: `/uploads/content/${req.file.filename}`,
      createdAt: new Date()
    };

    contents.push(newContent);
    fs.writeFileSync(contentsFile, JSON.stringify(contents, null, 2));
    res.json({ message: "Content uploaded", content: newContent });
  }
);

/* ================= GET CONTENT (FREE + LOCK LOGIC) ================= */
app.get("/course/:courseId/content", (req, res) => {
  const contents = JSON.parse(fs.readFileSync(contentsFile));
  const students = JSON.parse(fs.readFileSync(studentsFile));

  const student = students.find(s => String(s.id) === String(req.query.studentId));
  const allowed = student ? student.courses : [];

  const result = contents.filter(c =>
    c.courseId === req.params.courseId &&
    (c.accessType === "FREE" || allowed.includes(c.courseId))
  );

  res.json(result);
});

/* ================= SERVER ================= */
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
