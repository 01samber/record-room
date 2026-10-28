import { month1 } from "./month1.js";
import { month2 } from "./month2.js";
import { month3 } from "./month3.js";
import { month4 } from "./month4.js";
import { month5 } from "./month5.js";
import { month6 } from "./month6.js";
import { pythonLessons as pythonCore } from "./python.js";
import { javascriptLessons as javascriptCore, sqlLessons as sqlCore } from "./languages.js";
import { agentLessons as agentCore, llmLessons as llmCore, trainLessons as trainCore } from "./models.js";
import { agentLabs, javascriptLabs, llmLabs, pythonLabs, sqlLabs, trainLabs } from "./labs.js";
import { scribeLessons } from "./ecw-scribe.js";
import { providerLessons } from "./ecw-provider.js";
import { authLessons } from "./ecw-auth.js";
import { billingLessons } from "./ecw-billing.js";
import { dayLessons, weekGuides } from "./calendar.js";

const source = [month1, month2, month3, month4, month5, month6];

const pythonLessons = [...pythonCore, ...pythonLabs];
const javascriptLessons = [...javascriptCore, ...javascriptLabs];
const sqlLessons = [...sqlCore, ...sqlLabs];
const llmLessons = [...llmCore, ...llmLabs];
const trainLessons = [...trainCore, ...trainLabs];
const agentLessons = [...agentCore, ...agentLabs];

export const months = source.map((month) => ({
  id: month.id,
  title: month.title,
  summary: month.summary,
  lessons: month.lessons.map((lesson) => ({
    id: lesson.id,
    title: lesson.title,
    week: lesson.week,
    hours: lesson.hours,
    promise: lesson.promise,
    exerciseCount: lesson.exercises.length,
  })),
}));

function outlineTrack(id, title, summary, list) {
  return {
    id,
    title,
    summary,
    lessons: list.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      hours: lesson.hours,
      promise: lesson.promise,
      exerciseCount: lesson.exercises.length,
    })),
  };
}

export const tracks = [
  outlineTrack("python", "Python", "The agent’s tools, then one shared note: a quote, a gap list, and a report that stays unsent.", pythonLessons),
  outlineTrack("javascript", "JavaScript", "The same note and the same report, as JSON, with a guard that throws if sent is true.", javascriptLessons),
  outlineTrack("sql", "SQL", "The same note stored as rows: the found quote, the therapy gap, and the invention count.", sqlLessons),
  outlineTrack("llm", "How models work", "Why a fluent sentence is not a quote, scored against the same note.", llmLessons),
  outlineTrack("train", "Train a small model", "A toy line and a character table on text you type. The shared note is never a training set.", trainLessons),
  outlineTrack("agent", "An agent from scratch", "The six courses in one file: three steps, a found quote, a therapy gap, sent false.", agentLessons),
  outlineTrack("ecw-scribe", "Virtual scribes", "The Progress Note, Scribe, Sunoh, templates, and the handoff to the provider.", scribeLessons),
  outlineTrack("ecw-provider", "Providers", "The encounter, Eva, PRISMA, orders, remote visits, and locking the note.", providerLessons),
  outlineTrack("ecw-auth", "Prior authorization", "Medication ePA, procedure authorizations, eligibility, documents, and the referral queue.", authLessons),
  outlineTrack("ecw-bill", "Billing", "The claim, scrubbing, remits, statements, appeals, and the revenue board.", billingLessons),
];

export const weeks = weekGuides;

const recordLessons = source.flatMap((month) =>
  month.lessons.map((lesson) => ({
    ...lesson,
    sequence: "record",
    monthId: month.id,
    monthTitle: month.title,
  }))
);

export const lessons = [
  ...recordLessons,
  ...pythonLessons,
  ...javascriptLessons,
  ...sqlLessons,
  ...llmLessons,
  ...trainLessons,
  ...agentLessons,
  ...scribeLessons,
  ...providerLessons,
  ...authLessons,
  ...billingLessons,
  ...dayLessons,
];

export function getLesson(id) {
  return lessons.find((lesson) => lesson.id === id) || null;
}

export function lessonOrder() {
  return lessons.map((lesson) => lesson.id);
}

export function neighbors(id) {
  const lesson = getLesson(id);
  if (!lesson) return { prev: null, next: null };
  const sequence = lesson.sequence || "record";
  const list = lessons.filter((item) => (item.sequence || "record") === sequence);
  const index = list.findIndex((item) => item.id === id);
  return {
    prev: list[index - 1]?.id || null,
    next: list[index + 1]?.id || null,
  };
}
