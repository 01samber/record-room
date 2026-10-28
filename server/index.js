import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { months, tracks, weeks, getLesson, lessonOrder, neighbors } from "./content/index.js";
import { gradeExercise, publicLesson } from "./grade.js";
import { readProgress, writeProgress } from "./store.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "80kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, studio: "The Record Room" });
});

app.get("/api/runtime", (_req, res) => {
  res.json({
    node: process.versions.node,
    major: String(process.versions.node).split(".")[0],
    platform: process.platform,
    ok: true,
  });
});

app.get("/api/outline", (_req, res) => {
  const order = lessonOrder();
  const exerciseCount = (list) => list.reduce((sum, lesson) => sum + lesson.exerciseCount, 0);
  res.json({
    title: "The Record Room",
    months,
    tracks,
    weeks,
    order,
    lessonCount: order.length,
    exerciseCount:
      exerciseCount(months.flatMap((month) => month.lessons)) +
      exerciseCount(tracks.flatMap((track) => track.lessons)) +
      exerciseCount(weeks.flatMap((week) => week.days.map((day) => ({ exerciseCount: 2 })))),
  });
});

app.get("/api/lessons/:id", (req, res) => {
  const lesson = getLesson(req.params.id);
  if (!lesson) {
    res.status(404).json({ message: "That lesson is not in the studio." });
    return;
  }
  const adjacent = neighbors(lesson.id);
  res.json({
    lesson: publicLesson(lesson),
    prev: adjacent.prev,
    next: adjacent.next,
  });
});

app.get("/api/progress", (_req, res) => {
  res.json(readProgress());
});

app.put("/api/notes", (req, res) => {
  const lessonId = String(req.body?.lessonId || "");
  const note = String(req.body?.note || "").slice(0, 4000);
  if (!getLesson(lessonId)) {
    res.status(404).json({ message: "That lesson is not in the studio." });
    return;
  }
  const progress = readProgress();
  progress.notes[lessonId] = note;
  res.json(writeProgress(progress));
});

app.post("/api/grade", (req, res) => {
  const lesson = getLesson(String(req.body?.lessonId || ""));
  const exercise = lesson?.exercises.find((item) => item.id === req.body?.exerciseId);
  if (!lesson || !exercise) {
    res.status(404).json({ message: "That exercise is not on this chart." });
    return;
  }
  const result = gradeExercise(exercise, req.body?.answer);
  const progress = readProgress();
  const key = `${lesson.id}:${exercise.id}`;
  progress.attempts[key] = (progress.attempts[key] || 0) + 1;
  if (result.correct) progress.completed[key] = true;
  writeProgress(progress);
  res.json({
    ...result,
    attempts: progress.attempts[key],
    completed: Boolean(progress.completed[key]),
  });
});

app.use("/api", (_req, res) => {
  res.status(404).json({ message: "That studio route does not exist." });
});

const dist = path.resolve(__dirname, "../client/dist");
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.use((_req, res) => {
    res.sendFile(path.join(dist, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Record Room API on http://localhost:${port}`);
});
