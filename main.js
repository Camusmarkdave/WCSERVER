import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });

// In-memory data stores
let students = [];
let admins = [];

// -------------------- STUDENT ROUTES -------------------- //

// Add student
app.post("/api/students", (req, res) => {
  const student = req.body;
  students.push(student);
  console.log("Student added:", student);
  res.json(student);
});

// Get students
app.get("/api/students", (req, res) => {
  res.json(students);
});

// Delete student
app.delete("/api/students/:id", (req, res) => {
  const id = req.params.id;
  students = students.filter((s) => s.student_id !== id);
  console.log("Student deleted:", id);
  res.json({ success: true });
});

// -------------------- ADMIN ROUTES -------------------- //

// Add admin (with file upload)
app.post("/api/admins", upload.single("file"), (req, res) => {
  const { adminId, firstName, lastName, department } = req.body;
  const file = req.file ? req.file.originalname : null;

  const admin = { adminId, firstName, lastName, department, file };
  admins.push(admin);

  console.log("Admin added:", admin);
  res.json(admin);
});

// Get admins
app.get("/api/admins", (req, res) => {
  res.json(admins);
});

// Delete admin
app.delete("/api/admins/:id", (req, res) => {
  const id = req.params.id;
  admins = admins.filter((a) => a.adminId !== id);
  console.log("Admin deleted:", id);
  res.json({ success: true });
});

// -------------------- START SERVER -------------------- //
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
