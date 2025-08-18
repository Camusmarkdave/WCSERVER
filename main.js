// MARK DAVE CAMUS - WD-302

import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// File Path Setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize app
const app = express();

// ===== Multer storage config =====
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/'); 
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname); 
    }
});
var upload = multer({ storage: storage }).single('file');

// ===== Static files =====
app.use('/uploads', express.static(__dirname + '/uploads'));

// ===== ROUTES =====

// Home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/home.html');
});

// Student form page
app.get('/studentForm', (req, res) => {
    res.sendFile(__dirname + '/pages/student.html');
});

// Admin form page
app.get('/adminForm', (req, res) => {
    res.sendFile(__dirname + '/pages/admin.html');
});

// Student form handler (GET)
app.get('/getStudent', (req, res) => {
    var response = {
        studentId: req.query.studentId,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        section: req.query.section
    };

    console.log("Student Response:", response);
    res.end(`Received Data: ${JSON.stringify(response)}`);
});

// Admin form handler (POST + file upload)
app.post('/postAdmin', upload, (req, res) => {
    var response = {
        adminId: req.body.adminId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        department: req.body.department,
        uploadedFile: req.file ? req.file.originalname : "No file uploaded"
    };

    console.log("Admin Response:", response);
    res.end(`Received Data: ${JSON.stringify(response)}`);
});

// Server Run
const server = app.listen(5000, () => {
    console.log(`Server running at http://localhost:5000`);
});
