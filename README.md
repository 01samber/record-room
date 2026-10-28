# The Record Room

A six-month bootcamp by Samer Berbara for the manager who will bring an approval agent into APICO Pain Management through MedOpsHQ.

The studio is a React site and a small API. Lessons explain the work. Exercises are graded on the server. A correct answer plays the seal. A wrong answer is corrected on the page. Answer keys stay on the server.

© Samer Berbara. Held to the record.

## Run it

Install Node.js LTS, then from this folder:

```bash
npm run install:all
npm run dev
```

Open the address the client prints, usually http://localhost:5173.

The API listens on port 4000. Progress is stored in `server/data/progress.json` on this machine.

```bash
npm run selftest
```

checks that every exercise can be passed and that answer keys are not sent to the browser.

## What it teaches

Twenty-four weeks. Each week has seven days, and each day is four hours: one hour in the chapter, then Python, a test, the same rule in JavaScript, and a second pass on the fictional case. Separate courses teach Python, JavaScript, SQL, how a model predicts the next token, how to train a tiny model on text you type, and how to build an agent loop that quotes the note and never sends.

The path still runs from the job itself, through CPT and ICD-10-CM, HIPAA, medical necessity, and the False Claims Act, into how models invent chart facts, then into eligibility, completeness, and code-candidate agents, the prior-authorization packet, and a pilot a physician can defend. A separate set of courses, under ECW features, teaches virtual scribes, providers, prior authorization, and billing how to use eClinicalWorks. Those lessons stay on the EHR. Training labs use toy text only. Do not train on charts or old approval letters.

Cases in the lessons are fictional. Do not paste a real patient’s chart into the studio or into an IDE assistant.

This course is not legal advice, a coding credential, or a coverage guarantee. Confirm current CMS, Novitas, and payer rules before any live request.
