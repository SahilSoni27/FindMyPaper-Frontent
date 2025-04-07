import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { updatePapers } from "./controllers/paperController.js";
import { updateNotes } from "./controllers/notesController.js";

const prisma = new PrismaClient();

const app = express();
app.use(cors());
const port = 3000;

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
    console.log(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/papers", async (req, res) => {
  try {
    const papers = await prisma.papers.findMany();
    res.json(papers);
    // console.log(papers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/papers-search", async (req, res) => {
  const { college, branch, semester, year, exam_type } = req.query;

  try {
    const papers = await prisma.papers.findMany({
      where: {
        college: college,
        branch: branch,
        year: parseInt(year),
        semester: parseInt(semester),
        exam_type: exam_type,
      },
    });
    res.json(papers);
    console.log(papers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/colleges", async (req, res) => {
  try {
    const colleges = await prisma.papers.findMany({
      select: { college: true },
      distinct: ["college"],
    });
    res.json(colleges.map((item) => item.college));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/notescolleges", async (req, res) => {
  try {
    const colleges = await prisma.notes.findMany({
      select: { college: true },
      distinct: ["college"],
    });
    res.json(colleges.map((item) => item.college));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/branches", async (req, res) => {
  const { college } = req.query;
  try {
    const branches = await prisma.papers.findMany({
      where: { college },
      select: { branch: true },
      distinct: ["branch"],
    });
    res.json(branches.map((item) => item.branch));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/notesbranches", async (req, res) => {
  const { college } = req.query;
  try {
    const branches = await prisma.notes.findMany({
      where: { college },
      select: { branch: true },
      distinct: ["branch"],
    });
    res.json(branches.map((item) => item.branch));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/semesters", async (req, res) => {
  const { college, branch } = req.query;
  try {
    const semesters = await prisma.papers.findMany({
      where: { college, branch },
      select: { semester: true },
      distinct: ["semester"],
    });
    res.json(semesters.map((item) => item.semester));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/notessemesters", async (req, res) => {
  const { college, branch } = req.query;
  try {
    const semesters = await prisma.notes.findMany({
      where: { college, branch },
      select: { semester: true },
      distinct: ["semester"],
    });
    res.json(semesters.map((item) => item.semester));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/years", async (req, res) => {
  const { college, branch, semester } = req.query;
  const sem = parseInt(semester);
  console.log(college, branch, semester);
  try {
    const years = await prisma.papers.findMany({
      where: { college, branch, semester: sem },
      select: { year: true },
      distinct: ["year"],
    });
    res.json(years.map((item) => item.year));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/exams", async (req, res) => {
  const { college, branch, year, semester } = req.query;
  const sem = parseInt(semester);
  const yr = parseInt(year);
  try {
    const exams = await prisma.papers.findMany({
      where: { college, branch, year: yr, semester: sem },
      select: { exam_type: true },
      distinct: ["exam_type"],
    });
    res.json(exams.map((item) => item.exam_type));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




app.get("/notes", async (req, res) => {
  try {
    const notes = await prisma.notes.findMany();
    res.json(notes); // Return all notes
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/notes-search", async (req, res) => {
  const { college, branch, semester, subject_name } = req.query;

  try {
    const notes = await prisma.notes.findMany({
      where: {
        college: college,
        branch: branch,
        semester: parseInt(semester),
        subject_name: subject_name,
      },
    });
    res.json(notes); // Return filtered notes
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.post("/papers/update", updatePapers);
app.post("/notes/updatenotes", updateNotes);

