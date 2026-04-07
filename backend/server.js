const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "!Vedant1234", // change if needed
  database: "lms"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to MySQL database");
  }
});

// TEST
app.get("/", (req, res) => {
  res.send("Backend working");
});

// GET USERS
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// ADD USER
app.post("/users", (req, res) => {
  const { name, email, role } = req.body;

  db.query(
    "INSERT INTO users(name,email,role) VALUES(?,?,?)",
    [name, email, role],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "User added" });
    }
  );
});

// GET COURSES
app.get("/courses", (req, res) => {
  db.query("SELECT * FROM courses", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// ADD COURSE
app.post("/courses", (req, res) => {
  const { name, instructor } = req.body;

  db.query(
    "INSERT INTO courses(name,instructor) VALUES(?,?)",
    [name, instructor],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Course added" });
    }
  );
});

// SAVE RESULT
app.post("/results", (req, res) => {
  const { user_id, course_id, score } = req.body;

  db.query(
    "INSERT INTO results(user_id, course_id, score) VALUES(?,?,?)",
    [user_id, course_id, score],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Result saved" });
    }
  );
});

// GET RESULTS
app.get("/results", (req, res) => {
  db.query("SELECT * FROM results", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// ISSUE CERTIFICATE
app.post("/certificates", (req, res) => {
  const { user_id, course_id } = req.body;

  db.query(
    "INSERT INTO certificates(user_id, course_id, issue_date) VALUES(?,?,CURDATE())",
    [user_id, course_id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Certificate issued" });
    }
  );
});

// GET CERTIFICATES
app.get("/certificates", (req, res) => {
  db.query("SELECT * FROM certificates", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// Start server (after all routes are registered)
app.listen(3000, () => console.log("Server running on port 3000"));