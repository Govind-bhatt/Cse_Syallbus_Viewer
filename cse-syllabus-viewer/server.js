const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const multer = require("multer");
const db = require("./db");

const app = express();

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));

// File upload
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });


// ================= LOGIN =================
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.query("SELECT * FROM users WHERE username=? AND password=?",
        [username, password],
        (err, result) => {
            if (result.length > 0) {
                req.session.user = result[0];

                if (result[0].role === "admin") {
                    res.redirect("/admin.html");
                } else {
                    res.redirect("/index.html");
                }
            } else {
                res.send("Invalid Login");
            }
        });
});

// LOGOUT
app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login.html");
    });
});


// ================= SEARCH =================
app.get("/search", (req, res) => {
    const code = req.query.code;

    db.query(
        "SELECT * FROM subjects WHERE LOWER(subject_code)=LOWER(?)",
        [code],
        (err, result) => {
            if (result.length > 0) {
                res.json(result[0]);
            } else {
                res.json({ subject_name: "Not Found", syllabus: "" });
            }
        }
    );
});

// ================= NOTES =================
app.get("/notes", (req, res) => {
    const code = req.query.code;

    db.query(
        "SELECT * FROM notes WHERE subject_code=?",
        [code],
        (err, result) => {
            res.json(result);
        }
    );
});

// ================= GET ALL SUBJECTS =================
app.get("/subjects", (req, res) => {
    db.query("SELECT * FROM subjects", (err, result) => {
        res.json(result);
    });
});

// ================= ADD SUBJECT =================
app.post("/add-subject", upload.single("syllabus"), (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
        return res.send("Access Denied");
    }

    const { subject_code, subject_name, semester } = req.body;
    const file = req.file.filename;

    db.query(
        "INSERT INTO subjects (subject_code, subject_name, semester, syllabus) VALUES (?, ?, ?, ?)",
        [subject_code, subject_name, semester, file],
        () => res.redirect("/admin.html")
    );
});

// ================= DELETE =================
app.get("/delete/:id", (req, res) => {
    db.query("DELETE FROM subjects WHERE id=?", [req.params.id], () => {
        res.redirect("/admin.html");
    });
});

// ================= UPDATE =================
app.post("/update/:id", (req, res) => {
    const { subject_name } = req.body;

    db.query("UPDATE subjects SET subject_name=? WHERE id=?",
        [subject_name, req.params.id],
        () => res.redirect("/admin.html")
    );
});

// ================= UPLOAD NOTE =================
app.post("/upload-note", upload.single("file"), (req, res) => {
    const { subject_code } = req.body;
    const file = req.file.filename;

    db.query(
        "INSERT INTO notes (subject_code, file_path) VALUES (?, ?)",
        [subject_code, file],
        () => res.redirect("/admin.html")
    );
});

app.listen(3000, () => console.log("Server started"));