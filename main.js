import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

//__dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve built frontend
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// Example API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

// Catch-all route for Vue Router (must be last)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(` Server is running at http://localhost:${PORT}`);
});
