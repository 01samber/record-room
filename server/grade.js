function norm(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hit(text, group) {
  return group.some((token) => text.includes(norm(token)));
}

function missingGroups(text, groups = []) {
  return groups.filter((group) => !hit(text, group));
}

function forbiddenHits(text, groups = []) {
  return groups.filter((group) => hit(text, group));
}

function gradeText(answer, spec) {
  const text = norm(answer);
  const min = spec.min ?? 40;
  if (text.length < min) {
    return {
      correct: false,
      tooShort: true,
      message: "Give this a full answer, in your own words, then check it again.",
    };
  }
  const missing = missingGroups(text, spec.requiredGroups);
  const forbidden = forbiddenHits(text, spec.forbiddenGroups);
  const correct = missing.length === 0 && forbidden.length === 0;
  return {
    correct,
    missing: missing.map((group) => group[0]),
    forbidden: forbidden.map((group) => group[0]),
    correction: spec.correction,
    why: spec.why,
  };
}

export function gradeExercise(exercise, answer) {
  if (!exercise) {
    return { correct: false, message: "That exercise is not on this chart." };
  }

  if (exercise.kind === "choice") {
    const picked = String(answer ?? "");
    if (!picked) {
      return { correct: false, empty: true, message: "Choose an answer first." };
    }
    const correct = picked === exercise.answer;
    return {
      correct,
      correction: exercise.correction,
      why: specWhy(exercise, correct),
    };
  }

  if (exercise.kind === "runtime") {
    const picked = norm(answer);
    if (!picked) {
      return { correct: false, empty: true, message: "Type the version number first." };
    }
    const major = String(process.versions.node).split(".")[0];
    const tokens = picked.split(" ").filter(Boolean);
    const correct =
      tokens.includes(major) ||
      picked === `v${major}` ||
      picked.replace(/\s/g, "") === process.versions.node;
    return {
      correct,
      correction: exercise.correction.replace("{major}", major),
      why: correct
        ? `This studio is running Node ${process.versions.node}. The major version is ${major}.`
        : `This studio is running Node ${process.versions.node}. The major version is ${major}.`,
    };
  }

  if (exercise.kind === "text") {
    if (!String(answer || "").trim()) {
      return { correct: false, empty: true, message: "Write an answer first." };
    }
    return gradeText(answer, exercise);
  }

  if (exercise.kind === "code") {
    const raw = String(answer || "");
    if (!raw.trim()) {
      return { correct: false, empty: true, message: "Write the code first." };
    }
    const text = raw.toLowerCase().replace(/\s+/g, " ").trim();
    if (text.length < (exercise.min ?? 12)) {
      return {
        correct: false,
        tooShort: true,
        message: "Write the function, not a sketch of two words.",
      };
    }
    const fold = (snippet) => snippet.toLowerCase().replace(/\s+/g, " ").trim();
    const missing = (exercise.requiredSnippets || []).filter((snippet) => !text.includes(fold(snippet)));
    const forbidden = (exercise.forbiddenSnippets || []).filter((snippet) => text.includes(fold(snippet)));
    const correct = missing.length === 0 && forbidden.length === 0;
    return {
      correct,
      missing,
      forbidden,
      correction: exercise.correction,
      why: exercise.why,
    };
  }

  if (exercise.kind === "fields") {
    const payload = answer && typeof answer === "object" ? answer : {};
    const fields = exercise.fields.map((field) => {
      const value = payload[field.id];
      if (!String(value || "").trim()) {
        return { id: field.id, correct: false, empty: true, label: field.label };
      }
      const result = gradeText(value, { ...field, min: field.min ?? 30 });
      return { id: field.id, label: field.label, ...result };
    });
    const correct = fields.every((field) => field.correct);
    return {
      correct,
      fields,
      correction: exercise.correction,
      why: exercise.why,
    };
  }

  return { correct: false, message: "This exercise has no grader yet." };
}

function specWhy(exercise, correct) {
  return correct ? exercise.why : exercise.why;
}

export function publicExercise(exercise) {
  if (exercise.kind === "fields") {
    return {
      id: exercise.id,
      kind: exercise.kind,
      prompt: exercise.prompt,
      fields: exercise.fields.map((field) => ({
        id: field.id,
        label: field.label,
        hint: field.hint,
      })),
    };
  }
  return {
    id: exercise.id,
    kind: exercise.kind,
    prompt: exercise.prompt,
    options: exercise.options,
    placeholder: exercise.placeholder,
    starter: exercise.starter,
  };
}

export function publicLesson(lesson) {
  return {
    id: lesson.id,
    monthId: lesson.monthId,
    monthTitle: lesson.monthTitle,
    week: lesson.week,
    title: lesson.title,
    hours: lesson.hours,
    promise: lesson.promise,
    margin: lesson.margin,
    sections: lesson.sections,
    example: lesson.example,
    weekPlan: lesson.weekPlan,
    sequence: lesson.sequence || "record",
    day: lesson.day || null,
    trackTitle: lesson.trackTitle || null,
    exercises: lesson.exercises.map(publicExercise),
  };
}
