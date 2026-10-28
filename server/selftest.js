import { lessons } from "./content/index.js";
import { gradeExercise, publicLesson } from "./grade.js";

const samples = {
  "m1-building:e2":
    "Hold the request and do not submit it. Nobody may invent physical therapy dates that are not in the chart. Wait until the record contains the fact.",
  "m1-companies:e2":
    "The agent may check eligibility at the start of the visit. It must leave the choice of procedure to the physician.",
  "m1-codes:e2":
    "ICD-10-CM is the diagnosis code and answers why the person was seen. CPT is the procedure code and answers what was done, such as an injection.",
  "m1-workbench:e2":
    "I will never paste a real patient name or note into the IDE. I will use the fictional cases from this course instead.",
  "m2-hipaa:e2":
    "A visit date, a member number, or the clinic can still identify someone. Deleting the name is not enough, and a business associate agreement is still required.",
  "m2-necessity:e2":
    "Reasonable and necessary means the record must fit the coverage policy for this injection. If a fact is missing, do not invent it.",
  "m2-false-claims:e2":
    "Knowingly is not only a plan to intend fraud. It includes reckless disregard and deliberate ignorance of whether the claim is true.",
  "m2-read-note:e2":
    "The packet may cite left leg pain into the calf and the L4-L5 MRI. The duration of therapy is missing because a January start does not state that the course was finished.",
  "m3-models:e2":
    "The product must mark the fact missing and say it is not in the note. It must not invent the usual therapy sentence to fill the letter.",
  "m3-prompts:e2":
    "If you cannot quote the note, mark the item missing and do not invent a finding.",
  "m3-evals:e2":
    "Invention count is the number of facts that are not in the note. The acceptable number before a real authorization is zero.",
  "m3-lab:e2":
    "Quotes include left calf pain and the L4-L5 disc. Six weeks are not stated, only a January start, so the duration gap stays open.",
  "m4-loops:e2":
    "Stop when a required fact is missing and hand the task to a human. A retry until the policy looks satisfied would invent the missing fact.",
  "m4-eligibility:e2":
    "Say that the payer did not respond. Staff must not assume the coverage is active or approved.",
  "m4-completeness:e2":
    "The checker should read the note the clinician has signed. If it writes the note too, it will fill gaps to satisfy its own checklist.",
  "m4-codes:e2":
    "When the plan does not name a procedure, return no candidate. Do not guess a family from what the clinic usually does.",
  "m5-packet:e2":
    "The packet should contain the level and side, the imaging, and the procedure. The agent must not invent conservative care that was never written down.",
  "m5-cms:e2":
    "The denial reason shows what the payer says is missing. You must not invent facts or rewrite the chart to answer it.",
  "m5-specifics:e2":
    "The note only says the patient felt better, which is not a percent. The agent must not type a percentage of relief.",
  "m5-denials:e2":
    "Do not change the diagnosis to one the policy will cover. The clinician should consider a different plan of care and talk with the patient.",
  "m6-humans:e2":
    "Keep the manual path as a backup so the practice can still work if the agent is down. Patients should not be held hostage to the tool.",
  "m6-phi:e2":
    "The log must show which person accepted the draft and the output the model proposed, including rejected drafts.",
  "m6-pilot:e2":
    "Stop and unplug the draft if an invented fact would be sent to a payer or an unsanctioned chat.",
};

const capstone = {
  scope: "Shadow mode for one lumbar epidural family and a single Medicare Advantage payer. Facet destruction is out.",
  allowed: "The agent may quote the signed note, list gaps, and propose a code candidate.",
  forbidden: "It must never invent therapy or submit the packet to a payer.",
  sender: "A coder sends only after the note is signed and every gap is closed.",
  measure: "Stop the pilot if the invention count is not zero.",
  charts: "A real chart stays in the system covered by the business associate agreement and never goes into this classroom chat.",
};

let failed = 0;

function check(name, result, expected) {
  if (Boolean(result.correct) !== expected) {
    failed += 1;
    console.error("FAIL", name, JSON.stringify(result));
  }
}

for (const lesson of lessons) {
  const pub = JSON.stringify(publicLesson(lesson));
  if (pub.includes("requiredGroups") || pub.includes("requiredSnippets") || pub.includes('"sample":') || pub.includes('"answer":')) {
    failed += 1;
    console.error("LEAK", lesson.id);
  }
  for (const exercise of lesson.exercises) {
    const key = `${lesson.id}:${exercise.id}`;
    if (exercise.kind === "choice") {
      check(`${key} right`, gradeExercise(exercise, exercise.answer), true);
      const wrong = exercise.answer === "a" ? "c" : "a";
      check(`${key} wrong`, gradeExercise(exercise, wrong), false);
    } else if (exercise.kind === "runtime") {
      check(`${key} right`, gradeExercise(exercise, process.versions.node.split(".")[0]), true);
      check(`${key} wrong`, gradeExercise(exercise, "0"), false);
  } else if (exercise.kind === "text" || exercise.kind === "code") {
    const sample = samples[key] || exercise.sample;
    if (!sample) {
      failed += 1;
      console.error("NO SAMPLE", key);
    } else {
      check(`${key} right`, gradeExercise(exercise, sample), true);
      check(`${key} wrong`, gradeExercise(exercise, "print('just send it')"), false);
    }
    } else if (exercise.kind === "fields") {
      check(`${key} right`, gradeExercise(exercise, capstone), true);
      check(`${key} wrong`, gradeExercise(exercise, { scope: "everything", allowed: "whatever", forbidden: "nothing", sender: "the bot", measure: "approvals", charts: "anywhere" }), false);
    }
  }
}

if (lessons.length < 200) {
  failed += 1;
  console.error("Expected the daily studio and the language courses, got", lessons.length);
}

if (failed) {
  console.error(`${failed} checks failed`);
  process.exit(1);
}

console.log(`Self-test passed: ${lessons.length} lessons, answer keys stay on the server.`);
