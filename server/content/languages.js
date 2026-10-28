import { choice, codeBlock, codeEx, lesson, prose } from "./factory.js";

function js(spec) {
  return lesson({ ...spec, sequence: "javascript", trackTitle: "JavaScript" });
}

export const javascriptLessons = [
  js({
    id: "js-places",
    title: "Two places JavaScript runs",
    promise: "You can say what runs in the browser and what runs in the small server for this studio.",
    keyboard: "The pages you click are JavaScript in the browser. Grading runs in Node, also JavaScript, on the server. They do not share memory.",
    record: "The browser must not be where a real chart is assembled. This site stores whether an exercise was right, not a patient.",
    sections: [
      prose("The same language, two jobs", [
        "JavaScript is the language of this classroom. React draws the lesson. When you press Check this answer, the browser sends JSON to the server. Node reads it, grades it, and sends JSON back. Python will hold the agent loop. JavaScript holds the door: pages, requests, and small tool servers.",
        "A value in the browser is not a value on the server unless you put it in the request. That separation is the same idea as minimum necessary. The page shows a lesson. The server sees an answer string. Neither is given the practice’s charts by this bootcamp.",
      ]),
      prose("A first file", [
        "Create labs/door.js. Node runs it with node labs/door.js. console.log is the print of JavaScript. let and const name values. const means you will not point the name at a new value. Use const unless you must reassign.",
      ], [codeBlock("javascript", "const place = \"browser shows, server grades\";\nconsole.log(place);")]),
    ],
    example: {
      title: "Worked case: the request is a copy",
      blocks: [
        { type: "p", text: "You type an answer in the box. The browser has that text. The server receives a copy inside JSON. Changing the box later does not change the copy already graded. There is no shared chart object between them." },
        codeBlock("javascript", "const answer = \"hold the packet\";\nconst body = { lessonId: \"demo\", answer };\nconsole.log(JSON.stringify(body));"),
      ],
    },
    exercises: [
      choice(
        "Where is an exercise graded?",
        [
          "Inside the browser, so the answer key ships with the page.",
          "On the Node server, which receives a copy of what you submitted.",
          "On Novitas’s site.",
          "In the patient’s chart.",
        ],
        "b",
        "The browser sends JSON. Node grades it. The key stays on the server. The chart is not involved.",
        "Two runtimes, one language, a request between them."
      ),
      codeEx({
        prompt: "Write JavaScript that sets answer to the text hold and prints JSON of an object containing that answer.",
        snippets: ["const", "answer", "hold", "json.stringify", "console.log"],
        sample: "const answer = \"hold\";\nconsole.log(JSON.stringify({ answer }));\n",
        correction: "const answer = \"hold\";\nconsole.log(JSON.stringify({ answer }));",
        why: "const binds the text. JSON.stringify makes the object a string a server could receive.",
      }),
    ],
  }),
  js({
    id: "js-values",
    title: "Values in JavaScript",
    promise: "You can use strings, numbers, and booleans without confusing them with Python.",
    keyboard: "JavaScript uses true and false, not True and False. Equality you want is ===.",
    record: "ready === false means not ready. Do not use == here. It coerces types and hides bugs.",
    sections: [
      prose("Three primitives you need", [
        "Strings wear quotes. Numbers do not. Booleans are true or false, lower case. null means no value, similar to None, but not the same word. undefined means a name was never given a value. Treat both as a gap when they show up in a packet field.",
        "=== checks value and type. \"1\" === 1 is false. That strictness is what you want when a level count must be a number and a side must be text.",
      ], [codeBlock("javascript", "const side = \"left\";\nconst levels = 1;\nconst ready = false;\nconsole.log(side === \"left\");\nconsole.log(ready === false);")]),
    ],
    example: {
      title: "Worked case: not ready is a boolean",
      blocks: [
        codeBlock("javascript", "const therapy = \"missing\";\nconst ready = therapy !== \"missing\";\nconsole.log(ready);"),
      ],
    },
    exercises: [
      choice(
        "What does \"1\" === 1 evaluate to?",
        ["true, because they look alike.", "false, because one is text and one is a number.", "It sends a claim.", "undefined."],
        "b",
        "=== does not coerce. Text and a number are different, so the comparison is false.",
        "Use === in every lab in this course."
      ),
      codeEx({
        prompt: "Set therapy to missing and ready to the boolean false. Log both with console.log.",
        snippets: ["const therapy", "missing", "const ready", "false", "console.log"],
        sample: "const therapy = \"missing\";\nconst ready = false;\nconsole.log(therapy, ready);\n",
        correction: "const therapy = \"missing\";\nconst ready = false;\nconsole.log(therapy, ready);",
        why: "missing is text. false is a boolean. They answer different questions.",
      }),
    ],
  }),
  js({
    id: "js-funcs",
    title: "Functions",
    promise: "You can write a function that returns hold or quote.",
    keyboard: "function packetStatus(therapy) { return ... } or const packetStatus = (therapy) => ...",
    record: "Return a string the human can read. Do not return a sentence that adds facts.",
    sections: [
      prose("Parameters and return", [
        "A function packages a check. The parameter is the input. return is the output. Without return, the function yields undefined. Callers who forget to check undefined will print a packet with a hole in it and not notice.",
        "Prefer the function keyword while you are learning. Arrow functions are the same idea with different rules about this, which you do not need yet.",
      ], [codeBlock("javascript", "function packetStatus(therapy) {\n  if (therapy === \"missing\") return \"hold\";\n  return \"quote\";\n}\nconsole.log(packetStatus(\"missing\"));")]),
    ],
    example: {
      title: "Worked case: one function, two calls",
      blocks: [
        codeBlock(
          "javascript",
          "function packetStatus(therapy) {\n  if (therapy === \"missing\") return \"hold\";\n  return \"quote\";\n}\nconsole.log(packetStatus(\"missing\"));\nconsole.log(packetStatus(\"started January\"));"
        ),
      ],
    },
    exercises: [
      choice(
        "A JavaScript function has no return. What does the caller receive?",
        ["hold", "undefined", "None", "an approved packet"],
        "b",
        "The default result is undefined. None is Python’s word. undefined is JavaScript’s.",
        "If you meant to send a status, return it."
      ),
      codeEx({
        prompt: "Write function packetStatus(therapy) that returns hold when therapy is missing, and quote otherwise.",
        snippets: ["function packetstatus", "missing", "return", "hold"],
        forbidden: ["six weeks"],
        sample: "function packetStatus(therapy) {\n  if (therapy === \"missing\") return \"hold\";\n  return \"quote\";\n}\n",
        correction: "function packetStatus(therapy) {\n  if (therapy === \"missing\") return \"hold\";\n  return \"quote\";\n}",
        why: "The function returns one of two statuses. It does not invent therapy.",
      }),
    ],
  }),
  js({
    id: "js-json",
    title: "Objects and JSON",
    promise: "You can put fields in an object and turn the object into JSON text.",
    keyboard: "An object uses { side: \"left\" }. JSON.stringify makes text. JSON.parse reads text back.",
    record: "JSON is a copy of fields. If therapy is missing in the object, it is missing in the JSON.",
    sections: [
      prose("Objects are JavaScript’s dicts", [
        "const note = { side: \"left\", level: \"L4-L5\", therapy: \"missing\" }; note.side is left. note[\"therapy\"] is the same lookup with a string key. Use the dot when the key is a fixed name.",
        "JSON is the text form of that object, used on the wire between browser and server. JSON.stringify(note) produces a string. Keys in JSON are always quoted. JSON.parse turns the string back into an object. Parsing does not add keys that were not in the text.",
      ], [codeBlock("javascript", "const note = { side: \"left\", therapy: \"missing\" };\nconst text = JSON.stringify(note);\nconst copy = JSON.parse(text);\nconsole.log(copy.therapy);")]),
    ],
    example: {
      title: "Worked case: the gap survives the trip",
      blocks: [
        codeBlock(
          "javascript",
          "const note = { side: \"left\", level: \"L4-L5\", therapy: \"missing\" };\nconsole.log(JSON.stringify(note));"
        ),
      ],
    },
    exercises: [
      choice(
        "JSON.parse on that string. What is therapy?",
        ["six weeks", "missing", "undefined always", "approved"],
        "b",
        "Parse restores the fields that were serialized. missing was stored, so missing comes back.",
        "The wire does not improve the chart."
      ),
      codeEx({
        prompt: "Create an object with therapy set to missing, stringify it, parse it, and log the therapy field of the copy.",
        snippets: ["therapy", "missing", "json.stringify", "json.parse", "console.log"],
        sample: "const note = { therapy: \"missing\" };\nconst copy = JSON.parse(JSON.stringify(note));\nconsole.log(copy.therapy);\n",
        correction: "const note = { therapy: \"missing\" };\nconst copy = JSON.parse(JSON.stringify(note));\nconsole.log(copy.therapy);",
        why: "Stringify then parse is a round trip. The field is unchanged.",
      }),
    ],
  }),
  js({
    id: "js-api",
    title: "What an API is",
    promise: "You can describe a request, a response, and a failure that is not success.",
    keyboard: "This studio’s grade call is POST /api/grade with a JSON body. A failed fetch is not an approval.",
    record: "An API that returns no body is a failed check. Do not treat silence as active coverage. You already learned that about eligibility.",
    sections: [
      prose("Request and response", [
        "An API is a function you call over a network, or, on one machine, over a local port. The request has a path, a method, and sometimes a body. POST /api/grade carries lessonId, exerciseId, and answer. The response is JSON: correct, and a correction when you were wrong.",
        "fetch in the browser returns a promise, a value that will arrive later. You await it. If the server is down, the promise rejects. The screen should say the studio could not grade, the same way an eligibility screen should say the payer did not respond.",
      ], [codeBlock("javascript", "const body = { lessonId: \"py-funcs\", exerciseId: \"e1\", answer: \"b\" };\nconsole.log(\"POST /api/grade\");\nconsole.log(JSON.stringify(body));")]),
      prose("Do not build a payer client yet", [
        "Reading the shape of /api/grade is enough. Calling a payer from a lab script, with real member IDs, is not a lesson. The transport can wait until the packet is true and a person still presses send.",
      ]),
    ],
    example: {
      title: "Worked case: failure is a value",
      blocks: [
        codeBlock(
          "javascript",
          "function describe(response) {\n  if (!response) return \"no response\";\n  return response.status;\n}\nconsole.log(describe(null));"
        ),
      ],
    },
    exercises: [
      choice(
        "The server does not answer. What should the page say?",
        [
          "Approved, so the day is not wasted.",
          "No response. Do not treat silence as success.",
          "Invent the correction locally and mark it correct.",
          "Retry forever until a yes appears.",
        ],
        "b",
        "Silence is failure. The same rule you used for eligibility applies to your own API.",
        "A missing response is data."
      ),
      codeEx({
        prompt: "Write function describe(response) that returns no response when response is null, otherwise returns response.status.",
        snippets: ["function describe", "null", "no response", "return", "status"],
        sample: "function describe(response) {\n  if (response === null) return \"no response\";\n  return response.status;\n}\n",
        correction: "function describe(response) {\n  if (!response) return \"no response\";\n  return response.status;\n}",
        why: "Null is handled on purpose. The status is only read when a response exists.",
      }),
    ],
  }),
  js({
    id: "js-modules",
    title: "Modules",
    promise: "You can read an import and an export in this repository without getting lost.",
    keyboard: "export makes a name available. import { lesson } from \"./factory.js\" takes it.",
    record: "A module boundary is a good place for a rule. The grader module does not import patient files. There are none.",
    sections: [
      prose("Why files import each other", [
        "This studio splits code so the answer key lives in the server files and the page cannot import it. That split is an ordinary module boundary. export const pythonLessons ships a list out of python.js. index.js imports it. The browser never imports python.js. It asks the API.",
        "The file extension .js is part of the path in this server’s modules. A wrong path fails at startup with a clear error. Read it as a traceback: which file, which import.",
      ], [codeBlock("javascript", "export function hold(therapy) {\n  return therapy === \"missing\" ? \"hold\" : \"quote\";\n}")]),
    ],
    example: {
      title: "Worked case: one exported function",
      blocks: [
        { type: "p", text: "labs/status.js exports hold. Another file imports it. The function does not read the disk. Its only input is the argument. That is a tool you can test." },
        codeBlock("javascript", "import { hold } from \"./status.js\";\nconsole.log(hold(\"missing\"));"),
      ],
    },
    exercises: [
      choice(
        "Why are answer keys not imported by the React pages?",
        [
          "JavaScript cannot export strings.",
          "The server keeps the keys. The page receives a lesson only after the keys are removed.",
          "Keys are stored in the chart.",
          "Imports only work for CSS.",
        ],
        "b",
        "publicLesson strips samples and snippets. The browser imports the page, not the key file.",
        "A module boundary can be a privacy and integrity boundary."
      ),
      codeEx({
        prompt: "Write an exported function hold(therapy) that returns hold or quote. Use export function.",
        snippets: ["export function hold", "missing", "return"],
        sample: "export function hold(therapy) {\n  if (therapy === \"missing\") return \"hold\";\n  return \"quote\";\n}\n",
        correction: "export function hold(therapy) {\n  if (therapy === \"missing\") return \"hold\";\n  return \"quote\";\n}",
        why: "export makes the function a module’s public tool. The body still refuses to invent therapy.",
      }),
    ],
  }),
  js({
    id: "js-tools",
    title: "A tool function",
    promise: "You can write a JavaScript tool that returns fields, not a paragraph.",
    keyboard: "A tool returns an object. The agent loop, later, will be Python calling the same shape.",
    record: "quoteOrMissing(note, phrase) returns found or missing. It does not rewrite note.",
    sections: [
      prose("Tools return data", [
        "A tool is a function with a boring contract. Input: a note string and a phrase. Output: an object { status, phrase }. status is found only when note includes the phrase. Otherwise status is missing. The function does not receive permission to edit the note.",
        "includes is case-sensitive. \"Left\" is not \"left\". Decide a rule and test it. For the lab, compare the strings as given. Do not lowercase the note and then claim you quoted it. A quote must match the characters you would search in the file.",
      ], [codeBlock("javascript", "function quoteOrMissing(note, phrase) {\n  if (note.includes(phrase)) return { status: \"found\", phrase };\n  return { status: \"missing\", phrase };\n}\nconsole.log(quoteOrMissing(\"left calf pain\", \"left calf\"));\nconsole.log(quoteOrMissing(\"left calf pain\", \"six weeks\"));")]),
    ],
    example: {
      title: "Worked case: six weeks is missing",
      blocks: [
        codeBlock(
          "javascript",
          "function quoteOrMissing(note, phrase) {\n  if (note.includes(phrase)) return { status: \"found\", phrase };\n  return { status: \"missing\", phrase };\n}\nconst note = \"pain into the left calf\";\nconsole.log(quoteOrMissing(note, \"six weeks\"));"
        ),
      ],
    },
    exercises: [
      choice(
        "The phrase is not in the note. What does the tool return?",
        [
          "{ status: \"found\", phrase: \"six weeks\" }",
          "{ status: \"missing\", phrase } and the note is unchanged.",
          "An edited note that now contains the phrase.",
          "undefined, and the loop retries until found.",
        ],
        "b",
        "Missing is a status. The note string is not assigned a new value.",
        "A tool that repairs its input is not a tool you want."
      ),
      codeEx({
        prompt: "Write quoteOrMissing(note, phrase) returning an object with status found or missing. Do not change the note.",
        snippets: ["function quoteormissing", "includes", "found", "missing", "return"],
        forbidden: ["six weeks of"],
        sample: "function quoteOrMissing(note, phrase) {\n  if (note.includes(phrase)) return { status: \"found\", phrase };\n  return { status: \"missing\", phrase };\n}\n",
        correction: "function quoteOrMissing(note, phrase) {\n  if (note.includes(phrase)) return { status: \"found\", phrase };\n  return { status: \"missing\", phrase };\n}",
        why: "includes decides. The return value reports. The note is only read.",
      }),
    ],
  }),
  js({
    id: "js-care",
    title: "What the browser must not hold",
    promise: "You can list the fields this classroom stores and the fields it must reject.",
    keyboard: "Progress JSON stores lesson ids and true or false. It does not store the paragraph you typed.",
    record: "If a teammate asks to “just log the answer for quality,” the answer may be a pasted chart. Refuse the log.",
    sections: [
      prose("Look at what is actually saved", [
        "The server’s progress file keeps completed flags, attempt counts, and an optional study note. The grade function does not write your answer into that file. That was a choice. Logging every submission would make this website a second medical record the moment someone pastes one.",
        "When you build a real tool, copy that choice into a review: what is persisted, who can read it, how long it lives, and whether a business-associate agreement covers the disk. A console.log of a note on a shared laptop is a disclosure.",
      ]),
      prose("A client-side check is not the control", [
        "Hiding a button in React is not a security boundary. Anyone can call the API. The server must enforce the rule. In the agent, the stop is not a grayed button the model can ignore. The model is not given the send function at all. You already saw that as a tool list. Here it is the same idea in a web app.",
      ], [codeBlock("javascript", "const stored = { lessonId: \"py-funcs\", correct: true };\nconsole.log(Object.keys(stored));")]),
    ],
    example: {
      title: "Worked case: keys of a progress row",
      blocks: [
        { type: "p", text: "The keys are lessonId and correct. There is no note text, no member id, no name. If a future patch adds answer, that patch needs a reason that is not convenience." },
      ],
    },
    exercises: [
      choice(
        "Which change needs a privacy review before it ships?",
        [
          "Renaming a CSS class.",
          "Saving the text of every exercise answer on the server.",
          "Adding a week number to a heading.",
          "Fixing a typo in a fictional case.",
        ],
        "b",
        "Stored free text will eventually contain a chart if people can type one. That is a new store of health information.",
        "Persistence is a design decision, not a log line you add because it was easy."
      ),
      codeEx({
        prompt: "Write a function keysOnly(row) that returns the list of keys. Use Object.keys. The sample row idea is lesson id and correct, not a patient name.",
        snippets: ["function keysonly", "object.keys", "return"],
        forbidden: ["member", "patient name", "ssn"],
        sample: "function keysOnly(row) {\n  return Object.keys(row);\n}\n",
        correction: "function keysOnly(row) {\n  return Object.keys(row);\n}",
        why: "The function reports structure. It does not add identity fields.",
      }),
    ],
  }),
];

function sql(spec) {
  return lesson({ ...spec, sequence: "sql", trackTitle: "SQL" });
}

export const sqlLessons = [
  sql({
    id: "sql-tables",
    title: "A table for the audit",
    promise: "You can say why evaluation rows belong in a table and what a column is for.",
    keyboard: "You can practice in DB Browser for SQLite, or in Python later. The lab here is the SQL text itself.",
    record: "Columns for class: case_id, fact, quote, invented. No patient name column. case_id is jr or am, the fiction.",
    sections: [
      prose("Rows are cases, columns are questions", [
        "SQL is the language of tables. A table named drafts has one row per model output you scored. Columns are the questions you always ask: which fictional case, which fact the model stated, the quote, and whether you marked it invented. A spreadsheet can start this. SQL is how the questions stay the same when there are more than twenty rows.",
        "SQLite is a single file database. Install DB Browser for SQLite if you want a window, or use the sqlite3 command if it is on your machine. Create a file labs/evals.db that contains only fictional rows you type.",
      ], [codeBlock("sql", "CREATE TABLE drafts (\n  case_id TEXT NOT NULL,\n  fact TEXT NOT NULL,\n  quote TEXT,\n  invented INTEGER NOT NULL\n);")]),
    ],
    example: {
      title: "Worked case: invented is 0 or 1",
      blocks: [
        { type: "p", text: "invented is an integer, 0 or 1, not a paragraph. One means the fact had no quote. The only acceptable total for a pilot sample is zero." },
      ],
    },
    exercises: [
      choice(
        "What belongs in case_id during this course?",
        ["A real member id.", "A fictional label such as jr.", "The patient’s date of birth.", "A full note export."],
        "b",
        "case_id is jr or am. Real identifiers do not get a column in the lab database.",
        "The schema is a minimum-necessary decision."
      ),
      codeEx({
        prompt: "Write a CREATE TABLE named drafts with case_id, fact, quote, and invented. invented is INTEGER NOT NULL.",
        snippets: ["create table drafts", "case_id", "fact", "quote", "invented", "integer"],
        forbidden: ["member_id", "ssn", "date_of_birth"],
        sample: "CREATE TABLE drafts (\n  case_id TEXT NOT NULL,\n  fact TEXT NOT NULL,\n  quote TEXT,\n  invented INTEGER NOT NULL\n);\n",
        correction: "CREATE TABLE drafts (\n  case_id TEXT NOT NULL,\n  fact TEXT NOT NULL,\n  quote TEXT,\n  invented INTEGER NOT NULL\n);",
        why: "The columns are the audit questions. Identity columns are absent on purpose.",
      }),
    ],
  }),
  sql({
    id: "sql-select",
    title: "Select and where",
    promise: "You can read the invented rows out of the table.",
    keyboard: "SELECT lists columns. WHERE keeps rows. A missing WHERE reads the whole table.",
    record: "SELECT * is lazy and fine in a tiny lab. In a real log, name the columns so you do not pull a note body you did not mean to open.",
    sections: [
      prose("Filter to the failures", [
        "INSERT adds a row. SELECT reads rows. WHERE invented = 1 keeps the failures. You want to see them. A dashboard that hides invented = 1 is the vendor offer you already refused.",
        "Text compares with quotes: WHERE case_id = 'jr'. Numbers do not: WHERE invented = 1.",
      ], [codeBlock("sql", "INSERT INTO drafts (case_id, fact, quote, invented)\nVALUES ('jr', 'left calf pain', 'left calf', 0);\n\nINSERT INTO drafts (case_id, fact, quote, invented)\nVALUES ('jr', 'six weeks of therapy', NULL, 1);\n\nSELECT fact, quote FROM drafts WHERE invented = 1;")]),
    ],
    example: {
      title: "Worked case: one failure visible",
      blocks: [
        { type: "p", text: "The select returns the six-weeks row because invented is 1 and the quote is null. The calf-pain row stays out of that result. You can still select it with invented = 0." },
      ],
    },
    exercises: [
      choice(
        "Which query shows the inventions?",
        [
          "SELECT fact FROM drafts WHERE invented = 0;",
          "SELECT fact, quote FROM drafts WHERE invented = 1;",
          "DELETE FROM drafts WHERE invented = 1;",
          "SELECT fact FROM drafts WHERE fact = 'approved';",
        ],
        "b",
        "invented = 1 is the failure set. Deleting those rows hides the audit.",
        "You select failures. You do not delete them to look clean."
      ),
      codeEx({
        prompt: "Write a SELECT of fact and quote from drafts where invented equals 1.",
        snippets: ["select", "fact", "quote", "from drafts", "where", "invented = 1"],
        forbidden: ["delete"],
        sample: "SELECT fact, quote FROM drafts WHERE invented = 1;\n",
        correction: "SELECT fact, quote FROM drafts WHERE invented = 1;",
        why: "The where clause keeps the rows that failed the quote test.",
      }),
    ],
  }),
  sql({
    id: "sql-insert",
    title: "Rows you may store",
    promise: "You can insert a fictional scoring row and refuse a row that copies a real identifier.",
    keyboard: "Every insert in the lab uses case_id jr or am and a fact you can point at in the lesson.",
    record: "NULL quote plus invented 1 is a legal row. It means the model stated a fact with no quote.",
    sections: [
      prose("Insert is a claim about your audit", [
        "The row says: for this fictional case, the draft stated this fact, with this quote, and we judged it invented or not. If you insert a fact the model did not state, you have corrupted the eval. If you insert a real member id, you have copied protected information into a class file.",
        "Quote can be NULL when there was nothing to quote. Do not put the word assumed in the quote column. Assumed is not a quote.",
      ], [codeBlock("sql", "INSERT INTO drafts (case_id, fact, quote, invented)\nVALUES ('am', 'radiculopathy', NULL, 1);")]),
    ],
    example: {
      title: "Worked case: A.M. did not have radiculopathy",
      blocks: [
        { type: "p", text: "The fictional note for A.M. says low back pain and no radiation. A draft that says radiculopathy gets invented 1 and a null quote. You do not “correct” the insert by writing a quote that is not in the note." },
      ],
    },
    exercises: [
      choice(
        "A draft invented a diagnosis. How is the row written?",
        [
          "quote set to a sentence you composed, invented 0.",
          "quote NULL, invented 1, fact describing what the draft claimed.",
          "Delete the case.",
          "case_id set to the real member number so you can find them.",
        ],
        "b",
        "No quote, invented flag on, fictional case id. You record the failure. You do not paper over it.",
        "The insert is part of the audit trail."
      ),
      codeEx({
        prompt: "Insert one row into drafts for case am, fact radiculopathy, a null quote, and invented 1.",
        snippets: ["insert into drafts", "am", "radiculopathy", "null", "1"],
        forbidden: ["member", "delete"],
        sample: "INSERT INTO drafts (case_id, fact, quote, invented)\nVALUES ('am', 'radiculopathy', NULL, 1);\n",
        correction: "INSERT INTO drafts (case_id, fact, quote, invented)\nVALUES ('am', 'radiculopathy', NULL, 1);",
        why: "The row records an unsupported fact. The quote is null because there is no quote.",
      }),
    ],
  }),
  sql({
    id: "sql-join",
    title: "Join facts to requirements",
    promise: "You can join a requirement table to a note table and see what is missing.",
    keyboard: "LEFT JOIN keeps every requirement, even when the note has no matching fact.",
    record: "A requirement with no matching note row is a gap. The join must not manufacture the match.",
    sections: [
      prose("Two tables", [
        "requirements has the policy’s asked fields: therapy, imaging, route. note_facts has what the fictional note actually contains. A left join from requirements to note_facts keeps every requirement. Where the note has nothing, the note columns are NULL. Those NULL rows are the gap list.",
        "An inner join would drop unmatched requirements. That hide is the wrong default. You are looking for absence.",
      ], [codeBlock("sql", "SELECT r.field, n.quote\nFROM requirements r\nLEFT JOIN note_facts n ON n.field = r.field\nWHERE n.quote IS NULL;")]),
    ],
    example: {
      title: "Worked case: therapy does not match",
      blocks: [
        { type: "p", text: "requirements contains therapy. note_facts has imaging and route only. The left join’s null quote on therapy is the row you hand to a person. You do not insert a note_facts row to make the join pretty." },
      ],
    },
    exercises: [
      choice(
        "Which join shows requirements the note does not satisfy?",
        [
          "INNER JOIN, so missing rows disappear.",
          "LEFT JOIN from requirements, then WHERE quote IS NULL.",
          "A join that copies the policy text into the note table.",
          "No join. Assume every requirement is met.",
        ],
        "b",
        "Left join preserves requirements. Null quotes are the gaps. Inner join hides them.",
        "Absence is the point of the query."
      ),
      codeEx({
        prompt: "Write the left join that selects field and quote and keeps rows where quote is null. Use the table names requirements and note_facts.",
        snippets: ["left join", "requirements", "note_facts", "quote is null"],
        sample: "SELECT r.field, n.quote\nFROM requirements r\nLEFT JOIN note_facts n ON n.field = r.field\nWHERE n.quote IS NULL;\n",
        correction: "SELECT r.field, n.quote\nFROM requirements r\nLEFT JOIN note_facts n ON n.field = r.field\nWHERE n.quote IS NULL;",
        why: "Unmatched requirements remain, and the filter keeps only the gaps.",
      }),
    ],
  }),
  sql({
    id: "sql-count",
    title: "Count inventions",
    promise: "You can compute the number that stops a pilot.",
    keyboard: "SELECT SUM(invented) or COUNT of rows WHERE invented = 1. The pass mark is 0.",
    record: "Do not average invention together with a style score. One invented row fails the sample.",
    sections: [
      prose("A single number", [
        "SUM(invented) works if every invented value is 0 or 1. COUNT(*) WHERE invented = 1 is the same count, and it is harder to misuse if someone later stores invented as a word. Prefer the count of failing rows.",
        "GROUP BY case_id tells you which fictional case produced the failure. A total of zero can hide a bug if you filtered the wrong case out. Select the total and the by-case counts.",
      ], [codeBlock("sql", "SELECT COUNT(*) AS inventions\nFROM drafts\nWHERE invented = 1;")]),
    ],
    example: {
      title: "Worked case: the number is 1",
      blocks: [
        { type: "p", text: "One row with invented 1 means the sample fails. You do not divide by twenty and call it five percent acceptable. The bar in the pilot lesson is zero." },
      ],
    },
    exercises: [
      choice(
        "The count of invented rows is 1. What is the pilot decision?",
        ["Ship. One row is noise.", "Stop. The acceptable number is zero.", "Delete the row and recount.", "Average it with approval rate."],
        "b",
        "One invented fact fails the sample. Deleting it is hiding it. Approval rate is not the objective.",
        "The query’s job is to make that one row impossible to overlook."
      ),
      codeEx({
        prompt: "Write a SELECT that counts rows in drafts where invented equals 1. Alias the count as inventions.",
        snippets: ["select", "count", "invented = 1", "inventions"],
        forbidden: ["delete"],
        sample: "SELECT COUNT(*) AS inventions FROM drafts WHERE invented = 1;\n",
        correction: "SELECT COUNT(*) AS inventions FROM drafts WHERE invented = 1;",
        why: "The alias names the stop number. The where clause defines an invention.",
      }),
    ],
  }),
  sql({
    id: "sql-limits",
    title: "What a query will not do",
    promise: "You can name the limits of SQL in this work: it will not decide medical necessity, and it will not de-identify a free-text note.",
    keyboard: "A WHERE clause is only as honest as the rows. Garbage rows in, a confident count out.",
    record: "Do not SELECT a free-text note column onto a laptop that is not in the agreement. Do not add that column in the lab.",
    sections: [
      prose("Counts are not judgment", [
        "SQL will count whatever flag you stored. If the human marked invented wrongly, the count is wrong. The query does not read the note. A person still compares the quote to the source. The table is the memory of that comparison, not a replacement for it.",
        "Free text in a column is how identifiers leak back in. A quote should be a short phrase from fiction in this course. In production, a quote from a real note is protected health information. It belongs in the system the agreement names, with access logs, not in a class SQLite file you might email.",
      ]),
      prose("You cannot SQL your way to Safe Harbor", [
        "Deleting a name column is not de-identification. Dates, record numbers, and rare facts remain. You already studied that rule. The database does not become safe because the language is SQL.",
      ]),
    ],
    example: {
      title: "Worked case: a perfect count of bad labels",
      blocks: [
        { type: "p", text: "Every row is invented = 0 because the reviewer clicked too fast. The count is 0 and the drafts are full of therapy the note lacks. The query did its job. The review did not. You sample the zeros." },
      ],
    },
    exercises: [
      choice(
        "The invention count is zero. What else do you do?",
        [
          "Nothing. The number is the whole control.",
          "Spot-check rows marked not invented, because a bad label makes a clean count.",
          "Email the SQLite file to the payer.",
          "Add the real note text so the count is richer.",
        ],
        "b",
        "A count trusts the flags. Someone still reads a sample of the rows that claim to be clean.",
        "SQL reports. It does not absolve the review."
      ),
      codeEx({
        prompt: "Write a SELECT of case_id and fact from drafts where invented equals 0, so a person can spot-check the clean rows. Limit is optional.",
        snippets: ["select", "case_id", "fact", "invented = 0"],
        forbidden: ["member_id", "patient_name"],
        sample: "SELECT case_id, fact FROM drafts WHERE invented = 0;\n",
        correction: "SELECT case_id, fact FROM drafts WHERE invented = 0;",
        why: "The clean rows are still reviewed. The query does not pull a name column, because the lab table does not have one.",
      }),
    ],
  }),
];
