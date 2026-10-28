export function lesson(spec) {
  return {
    id: spec.id,
    sequence: spec.sequence,
    trackTitle: spec.trackTitle,
    week: spec.week ?? null,
    day: spec.day ?? null,
    title: spec.title,
    hours: spec.hours || "4 hours",
    promise: spec.promise,
    margin: [
      { label: spec.marginLabel || "On the keyboard", text: spec.keyboard },
      { label: "On the record", text: spec.record },
    ],
    weekPlan: spec.weekPlan || [
      "Hour 1. Read with the editor closed. Close the page and write three sentences from memory.",
      "Hour 2. Copy the worked code by hand on paper. Say aloud what each line returns.",
      "Hour 3. Type the lab into a new file and run it. Change one input and run it again.",
      "Hour 4. Submit both exercises. If a correction appears, rewrite before the next day.",
    ],
    sections: spec.sections,
    example: spec.example,
    exercises: spec.exercises,
  };
}

export function choice(prompt, options, answer, correction, why) {
  return {
    id: "e1",
    kind: "choice",
    prompt,
    options: options.map((text, index) => ({ id: "abcd"[index], text })),
    answer,
    correction,
    why,
  };
}

export function codeEx(spec) {
  return {
    id: spec.id || "e2",
    kind: "code",
    prompt: spec.prompt,
    starter: spec.starter,
    requiredSnippets: spec.snippets,
    forbiddenSnippets: spec.forbidden || [],
    sample: spec.sample,
    correction: spec.correction,
    why: spec.why,
    min: spec.min ?? 8,
    placeholder: "Write the whole snippet. You will also run it on your machine.",
  };
}

export function textEx(spec) {
  return {
    id: spec.id || "e2",
    kind: "text",
    prompt: spec.prompt,
    placeholder: spec.placeholder || "Write the answer in your own words.",
    min: spec.min ?? 80,
    requiredGroups: spec.groups,
    forbiddenGroups: spec.forbidden || [],
    sample: spec.sample,
    correction: spec.correction,
    why: spec.why,
  };
}

export function figure(src, alt, caption) {
  return { type: "figure", src, alt, caption };
}

export function prose(heading, texts, extra = []) {
  return {
    heading,
    blocks: [...texts.map((text) => ({ type: "p", text })), ...extra],
  };
}

export function codeBlock(lang, text) {
  return { type: "code", lang, text };
}
