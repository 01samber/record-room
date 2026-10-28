import { choice, codeBlock, codeEx, lesson, prose } from "./factory.js";

const noteText = "Pain into the left calf. Level L5.";
const shared = "Every coding course from here uses one fictional note: “Pain into the left calf. Level L5.” Therapy is missing. The route is empty. J.R. is not a real patient. Do not paste a chart over this sentence.";

function lab(sequence, trackTitle, spec) {
  return lesson({
    sequence,
    trackTitle,
    record: "Fiction only. The shared note is the sentence in this lesson. A real APICO chart does not go in labs/.",
    ...spec,
  });
}

export const pythonLabs = [
  lab("python", "Python", {
    id: "py-shared",
    title: "The note the other courses use",
    promise: "You can store the shared fictional note as a dict the JavaScript, SQL, and agent lessons will recognize.",
    keyboard: "Save it as labs/note.py and run py labs/note.py. Later lessons import the same four keys: side, level, route, therapy.",
    sections: [
      prose("One fixture, six courses", [
        shared,
        "Python holds the note the agent will read. JavaScript will build the same object for a tool response. SQL will store the rows those tools return. The model lessons will test quotes against this exact sentence. Training will not see it as a chart. The agent lesson at the end calls the functions you write here.",
        "A dict is the smallest chart the program is allowed to have. Keys you did not set are not implied. route is an empty string, which means nobody named a procedure. therapy is the word missing, which means the field was looked for and not found. Those are different from a key you forgot to type.",
      ], [codeBlock("python", "note = {\n    \"side\": \"left\",\n    \"level\": \"L5\",\n    \"route\": \"\",\n    \"therapy\": \"missing\",\n}\ntext = \"Pain into the left calf. Level L5.\"\nprint(text)\nprint(note[\"side\"], note[\"level\"])\nprint(note[\"route\"], note[\"therapy\"])")]),
      prose("Two reads, on purpose", [
        "Print the text, then the side and the level, then the route and the therapy. You should see the sentence, then left L5, then a blank-looking route and the word missing. If you see six weeks, a line in your file assigned it. Delete that line. The dict does not know what a typical packet contains.",
      ]),
    ],
    example: {
      title: "Worked run",
      blocks: [
        { type: "p", text: "py labs/note.py prints the sentence, then left L5, then a space and the word missing. The empty route prints as nothing between the space and missing. That empty value is the data. It is not an error." },
        codeBlock("python", "Pain into the left calf. Level L5.\nleft L5\n missing"),
      ],
    },
    exercises: [
      choice(
        "therapy is the word missing. What does that mean in this lab?",
        [
          "The patient completed therapy and the count was lost.",
          "The field was checked and the note did not contain a therapy fact.",
          "Python fills missing keys with six weeks.",
          "The agent may invent the duration because the key exists.",
        ],
        "b",
        "missing is a recorded absence. It is not a cue to supply a duration.",
        "The word is the data. Do not translate it into a history."
      ),
      codeEx({
        prompt: "Create the shared note dict with side left, level L5, route empty, and therapy missing. Print the side and the therapy value.",
        snippets: ["side", "l5", "therapy", "missing", "print"],
        forbidden: ["six weeks"],
        sample: "note = {\n    \"side\": \"left\",\n    \"level\": \"L5\",\n    \"route\": \"\",\n    \"therapy\": \"missing\",\n}\nprint(note[\"side\"])\nprint(note[\"therapy\"])\n",
        correction: "note = {\"side\": \"left\", \"level\": \"L5\", \"route\": \"\", \"therapy\": \"missing\"}\nprint(note[\"side\"])\nprint(note[\"therapy\"])",
        why: "The four keys are the fixture. Printing them proves the absence was stored on purpose.",
      }),
    ],
  }),
  lab("python", "Python", {
    id: "py-both",
    title: "Quote and gaps on the same note",
    promise: "You can run the two tools the agent will call, on the shared note, and see a found quote and a missing therapy line.",
    keyboard: "labs/tools.py. Run it twice: once as written, then change the found phrase to a word that is not in the sentence and run it again.",
    sections: [
      prose("Two tools, no loop yet", [
        "The agent does not read the note by magic. It calls tools. The first tool answers: is this phrase inside the text? The second answers: which required fields are still missing? You already met the pieces. This lesson runs them on the shared note in one file, which is how the later agent file will call them.",
        "quote_tool returns found only when the phrase occurs in the text. left calf is in the sentence, so the first call is found. A duration that is not in the sentence is missing, and the quote field stays empty. gaps looks at the dict, not at the prose. therapy is missing, so the list contains that word. The function does not write a duration into the dict.",
      ], [codeBlock("python", "def quote_tool(note, phrase):\n    if phrase and phrase in note:\n        return {\"status\": \"found\", \"quote\": phrase}\n    return {\"status\": \"missing\", \"quote\": \"\"}\n\ndef gaps(fields):\n    found = []\n    if fields.get(\"therapy\", \"missing\") == \"missing\":\n        found.append(\"therapy\")\n    if fields.get(\"route\", \"\") == \"\":\n        found.append(\"route\")\n    return found\n\ntext = \"Pain into the left calf. Level L5.\"\nfields = {\"side\": \"left\", \"level\": \"L5\", \"route\": \"\", \"therapy\": \"missing\"}\nprint(quote_tool(text, \"left calf\"))\nprint(gaps(fields))")]),
      prose("What you should see", [
        "The first line is a dict whose status is found and whose quote is left calf. The second line is a list containing therapy and route. If the list contains a filled-in sentence, the function is doing a job it was not given. A tool returns a structure. The letter, if anyone writes one later, is a person’s job.",
      ]),
    ],
    example: {
      title: "A second call that must fail",
      blocks: [
        { type: "p", text: "Add print(quote_tool(text, \"six weeks\")) under the found call. The status is missing and the quote is empty. Then print(text) again. The sentence is unchanged. The tool did not patch the note to make the search succeed." },
        codeBlock("python", "print(quote_tool(text, \"six weeks\"))\nprint(text)"),
      ],
    },
    exercises: [
      choice(
        "The phrase is not in the text. What does quote_tool put in quote?",
        [
          "The phrase, so the packet can use it.",
          "An empty string, with status missing.",
          "The whole note plus the phrase appended.",
          "None, and the loop keeps trying until the phrase appears.",
        ],
        "b",
        "A miss stores an empty quote. Storing the phrase would turn a failed search into a fake citation.",
        "status and quote have to agree."
      ),
      codeEx({
        prompt: "Write quote_tool and gaps. On the shared note, quote_tool finds left calf. gaps returns therapy when that field is missing. Print both results.",
        snippets: ["def quote_tool", "phrase in note", "def gaps", "therapy", "missing", "print"],
        forbidden: ["six weeks of therapy"],
        sample: "def quote_tool(note, phrase):\n    if phrase and phrase in note:\n        return {\"status\": \"found\", \"quote\": phrase}\n    return {\"status\": \"missing\", \"quote\": \"\"}\n\ndef gaps(fields):\n    found = []\n    if fields.get(\"therapy\", \"missing\") == \"missing\":\n        found.append(\"therapy\")\n    return found\n\ntext = \"Pain into the left calf. Level L5.\"\nfields = {\"therapy\": \"missing\"}\nprint(quote_tool(text, \"left calf\"))\nprint(gaps(fields))\n",
        correction: "def quote_tool(note, phrase):\n    if phrase and phrase in note:\n        return {\"status\": \"found\", \"quote\": phrase}\n    return {\"status\": \"missing\", \"quote\": \"\"}\n\ndef gaps(fields):\n    found = []\n    if fields.get(\"therapy\", \"missing\") == \"missing\":\n        found.append(\"therapy\")\n    return found",
        why: "One file, two tools, the shared note. Found is a substring. Missing therapy stays a gap.",
      }),
    ],
  }),
  lab("python", "Python", {
    id: "py-bundle",
    title: "The report Python will hand on",
    promise: "You can wrap the tools in a report dict whose sent flag is false, and lock that with asserts.",
    keyboard: "labs/report.py. The JavaScript lesson builds this same shape. The SQL lesson stores its fields. The agent lesson returns it from the loop.",
    sections: [
      prose("A report is not a send", [
        "The manager’s question is what the program is allowed to hand to the next course. The answer is a dict: the gaps, and sent set to false. There is no line that posts, faxes, or calls a payer. If you add one, the assert on sent fails, or it should.",
        "Call report on the shared fields. Assert that sent is false. Assert that therapy is in the gap list. Print passed. Change sent to true on purpose once, watch the assert fail, then put false back. That failure is the lesson. A green test that never had a false case has not been tried.",
      ], [codeBlock("python", "def report(fields):\n    gaps = []\n    if fields.get(\"therapy\", \"missing\") == \"missing\":\n        gaps.append(\"therapy\")\n    return {\"gaps\": gaps, \"sent\": False}\n\nfields = {\"side\": \"left\", \"level\": \"L5\", \"route\": \"\", \"therapy\": \"missing\"}\nresult = report(fields)\nassert result[\"sent\"] is False\nassert \"therapy\" in result[\"gaps\"]\nprint(result)\nprint(\"passed\")")]),
    ],
    example: {
      title: "What passed looks like",
      blocks: [
        { type: "p", text: "The print of result shows gaps containing therapy and sent false. The next line is the word passed. If AssertionError appears, read the line number. It is the contract you broke, not a reason to delete the assert." },
      ],
    },
    exercises: [
      choice(
        "The gap list is empty on some other note. What is sent?",
        [
          "True, because there is nothing left to ask.",
          "False. An empty gap list is not permission to send.",
          "The word missing.",
          "Whatever the last payer accepted.",
        ],
        "b",
        "sent is false in the return, including when gaps is empty. Complete fields are still not a submission.",
        "The flag is hard-coded. It is not computed from how finished the note feels."
      ),
      codeEx({
        prompt: "Write report(fields) returning gaps and sent false. Assert sent is false and that therapy is in the gaps for a missing therapy field. Print passed.",
        snippets: ["def report", "therapy", "sent", "false", "assert", "passed"],
        forbidden: ["sent\": true", "while true"],
        sample: "def report(fields):\n    gaps = []\n    if fields.get(\"therapy\", \"missing\") == \"missing\":\n        gaps.append(\"therapy\")\n    return {\"gaps\": gaps, \"sent\": False}\n\nresult = report({\"therapy\": \"missing\"})\nassert result[\"sent\"] is False\nassert \"therapy\" in result[\"gaps\"]\nprint(\"passed\")\n",
        correction: "def report(fields):\n    gaps = []\n    if fields.get(\"therapy\", \"missing\") == \"missing\":\n        gaps.append(\"therapy\")\n    return {\"gaps\": gaps, \"sent\": False}",
        why: "The report is the object the other courses share. sent does not become true inside this function.",
      }),
    ],
  }),
];

export const javascriptLabs = [
  lab("javascript", "JavaScript", {
    id: "js-shared",
    title: "The same note in JavaScript",
    promise: "You can build the shared note as an object and see that it matches the Python dict key for key.",
    keyboard: "labs/note.js and node labs/note.js. Keys: side, level, route, therapy. Same words as labs/note.py.",
    sections: [
      prose("Why the second language is the same note", [
        shared,
        "This classroom and a tool’s JSON response are JavaScript. The agent loop in the last course is Python. They can only work together if a person can see that left in Python and left in JavaScript are the same fact. You make that obvious by typing the object yourself, not by importing a chart.",
        "An object uses braces and colons. fields.therapy is the word missing. fields.route is an empty string. console.log prints them. If you JSON.stringify the object, you get one line a log could store. That line is what SQL will later keep as text. It still has no patient name.",
      ], [codeBlock("javascript", "const text = \"Pain into the left calf. Level L5.\";\nconst fields = {\n  side: \"left\",\n  level: \"L5\",\n  route: \"\",\n  therapy: \"missing\",\n};\nconsole.log(text);\nconsole.log(fields.side, fields.level);\nconsole.log(JSON.stringify(fields));")]),
    ],
    example: {
      title: "Worked run beside the Python file",
      blocks: [
        { type: "p", text: "Open labs/note.py and labs/note.js together. The four keys match. The sentence matches. The only difference is syntax: quotes and colons versus Python’s colons-inside-braces style. If a key exists in only one file, the courses have drifted, and you fix the file that drifted." },
      ],
    },
    exercises: [
      choice(
        "Why type this object again in JavaScript?",
        [
          "JavaScript cannot read a Python dict, so the fact must be written in the language that will return JSON.",
          "So the manager never has to look at Python.",
          "Because a browser is allowed to hold a real chart.",
          "Because JSON.stringify sends the claim.",
        ],
        "a",
        "The tool response is JSON. You practice the same four keys in the language that will emit that JSON.",
        "Same fixture, second syntax. That is the integration."
      ),
      codeEx({
        prompt: "Create the shared fields object and console.log the therapy value and JSON.stringify(fields).",
        snippets: ["const fields", "therapy", "missing", "json.stringify", "console.log"],
        forbidden: ["member", "ssn"],
        sample: "const fields = {\n  side: \"left\",\n  level: \"L5\",\n  route: \"\",\n  therapy: \"missing\",\n};\nconsole.log(fields.therapy);\nconsole.log(JSON.stringify(fields));\n",
        correction: "const fields = { side: \"left\", level: \"L5\", route: \"\", therapy: \"missing\" };\nconsole.log(fields.therapy);\nconsole.log(JSON.stringify(fields));",
        why: "The object is the fixture. stringify is the shape a log or a SQL row can store.",
      }),
    ],
  }),
  lab("javascript", "JavaScript", {
    id: "js-bundle",
    title: "The same report, and a guard",
    promise: "You can return the Python report’s shape from JavaScript and throw if sent is ever true.",
    keyboard: "labs/report.js. node labs/report.js prints passed. Then set sent to true, run it, read the throw, and set it back.",
    sections: [
      prose("One shape across the boundary", [
        "Python’s report returns gaps and sent false. A JavaScript tool that the studio or a log might call has to return that same shape, or the next system will misread a field. gaps is an array. sent is the boolean false, not the string \"false\" and not the number 0. Those are different values. The guard in this file treats anything other than false as a stop.",
        "Throwing is the JavaScript form of the Python assert. The program refuses to continue. That is what you want from a lab that is practicing a safety flag. A catch that swallows the error and prints passed anyway has defeated the guard. Do not add that catch.",
      ], [codeBlock("javascript", "function report(fields) {\n  const gaps = [];\n  if (fields.therapy === \"missing\") gaps.push(\"therapy\");\n  return { gaps, sent: false };\n}\n\nconst result = report({ side: \"left\", level: \"L5\", route: \"\", therapy: \"missing\" });\nif (result.sent !== false) throw new Error(\"sent must stay false\");\nif (!result.gaps.includes(\"therapy\")) throw new Error(\"therapy gap missing\");\nconsole.log(JSON.stringify(result));\nconsole.log(\"passed\");")]),
    ],
    example: {
      title: "The failure you should cause once",
      blocks: [
        { type: "p", text: "Change the return to sent: true and run the file. Node stops at the throw and does not print passed. Change it back. The stack trace names the line. That line is the guard, working." },
      ],
    },
    exercises: [
      choice(
        "result.sent is the string \"false\". Does the guard pass?",
        [
          "Yes. They look the same.",
          "No. !== false rejects the string. sent has to be the boolean false.",
          "Yes, if gaps is empty.",
          "Only in Python.",
        ],
        "b",
        "The boolean false is the contract. The word false inside quotes is text and fails the guard.",
        "Types are part of the shape the other course expects."
      ),
      codeEx({
        prompt: "Write report(fields) returning gaps and sent false. Throw if sent is not false. console.log passed.",
        snippets: ["function report", "therapy", "sent: false", "throw", "console.log"],
        forbidden: ["sent: true"],
        sample: "function report(fields) {\n  const gaps = [];\n  if (fields.therapy === \"missing\") gaps.push(\"therapy\");\n  return { gaps, sent: false };\n}\nconst result = report({ therapy: \"missing\" });\nif (result.sent !== false) throw new Error(\"sent must stay false\");\nconsole.log(\"passed\");\n",
        correction: "function report(fields) {\n  const gaps = [];\n  if (fields.therapy === \"missing\") gaps.push(\"therapy\");\n  return { gaps, sent: false };\n}",
        why: "The JavaScript report matches the Python report. The throw is the test you can see fail.",
      }),
    ],
  }),
];

export const sqlLabs = [
  lab("sql", "SQL", {
    id: "sql-shared",
    title: "Rows for the shared note",
    promise: "You can insert the quote result and the therapy gap as two rows a person can audit.",
    keyboard: "Use a local SQLite file under labs/, or write the statements in labs/audit.sql and read them back. case_id is the fictional jr, never a member number.",
    sections: [
      prose("The tools become rows", [
        shared,
        "Python printed a found quote and a gap list. JavaScript printed the same report as JSON. SQL is where those results sit still, so tomorrow’s review is not a terminal you closed. One row per fact. The found side is invented 0 because left calf is in the sentence. The therapy row is invented 1 because the quote is null: there was nothing in the note to cite.",
        "Create the table if you are in a real sqlite3 session. The columns are case_id, fact, quote, and invented. There is no name column and no member id. If you feel the urge to add one so the row “looks complete,” that is the habit this table is built to refuse.",
      ], [codeBlock("sql", "CREATE TABLE drafts (\n  case_id TEXT,\n  fact TEXT,\n  quote TEXT,\n  invented INTEGER\n);\nINSERT INTO drafts (case_id, fact, quote, invented)\nVALUES ('jr', 'side', 'left calf', 0);\nINSERT INTO drafts (case_id, fact, quote, invented)\nVALUES ('jr', 'therapy', NULL, 1);")]),
    ],
    example: {
      title: "Read the two rows back",
      blocks: [
        { type: "p", text: "SELECT fact, quote, invented FROM drafts WHERE case_id = 'jr'; shows side with left calf and 0, then therapy with an empty quote and 1. The 1 is the invention flag. It does not mean the therapy happened. It means the row has no quote." },
        codeBlock("sql", "SELECT fact, quote, invented FROM drafts WHERE case_id = 'jr';"),
      ],
    },
    exercises: [
      choice(
        "Why is the therapy row invented 1?",
        [
          "Because therapy is usually covered.",
          "Because there is no quote from the note for that fact.",
          "Because SQL defaults every insert to true.",
          "Because the case id is jr.",
        ],
        "b",
        "invented 1 marks a fact with no supporting quote. The flag is about the row, not about whether therapy is a good idea.",
        "Null quote, invention flag. That pair is the audit."
      ),
      codeEx({
        prompt: "Insert two drafts rows for case_id jr: side quoted as left calf with invented 0, and therapy with a null quote and invented 1.",
        snippets: ["insert", "jr", "left calf", "therapy", "invented"],
        forbidden: ["delete", "member_id", "patient_name"],
        sample: "INSERT INTO drafts (case_id, fact, quote, invented) VALUES ('jr', 'side', 'left calf', 0);\nINSERT INTO drafts (case_id, fact, quote, invented) VALUES ('jr', 'therapy', NULL, 1);\n",
        correction: "INSERT INTO drafts (case_id, fact, quote, invented) VALUES ('jr', 'side', 'left calf', 0);\nINSERT INTO drafts (case_id, fact, quote, invented) VALUES ('jr', 'therapy', NULL, 1);",
        why: "The found quote and the missing therapy are both stored. Only the missing one is flagged.",
      }),
    ],
  }),
  lab("sql", "SQL", {
    id: "sql-readback",
    title: "Read the agent’s rows",
    promise: "You can select the invention rows for the shared case and count them.",
    keyboard: "Run the two statements in order. The count for jr should be 1 after the inserts in the previous lesson.",
    sections: [
      prose("A review query", [
        "The agent course will produce a trace. This query is how a person reviews that trace the next morning without rerunning the model. Filter to case jr and invented 1. You should see therapy and no quote. A second statement counts those rows. The number is the stop number for this tiny case: one invention.",
        "Do not add OR invented = 0 to “see everything important.” The clean rows have their own query, which you already wrote. Mixing them hides the flag. The point of this lesson is that the shared note’s missing therapy is visible as a row, not as a feeling.",
      ], [codeBlock("sql", "SELECT fact, quote\nFROM drafts\nWHERE case_id = 'jr' AND invented = 1;\n\nSELECT COUNT(*) AS inventions\nFROM drafts\nWHERE case_id = 'jr' AND invented = 1;")]),
    ],
    example: {
      title: "What one invention looks like",
      blocks: [
        { type: "p", text: "The first result is a single row, fact therapy, quote empty. The second result is the number 1. If the number is 0, the insert used the wrong case id or invented 0 on the therapy row. Fix the insert. Do not change the query so a zero looks like success." },
      ],
    },
    exercises: [
      choice(
        "The count is 1. What do you do with the agent that produced the row?",
        [
          "Send the packet, because one is a small number.",
          "Stop and look at the therapy row. A counted invention is not a send.",
          "Delete the row so the count becomes zero.",
          "Train the model on the row so it stops mentioning therapy.",
        ],
        "b",
        "The count is a stop. You open the row. You do not delete it to improve the number, and you do not send.",
        "The query is the review. It is not a cleanup tool."
      ),
      codeEx({
        prompt: "Select fact and quote from drafts for case_id jr where invented equals 1.",
        snippets: ["select", "fact", "quote", "jr", "invented = 1"],
        forbidden: ["delete", "member_id"],
        sample: "SELECT fact, quote FROM drafts WHERE case_id = 'jr' AND invented = 1;\n",
        correction: "SELECT fact, quote FROM drafts WHERE case_id = 'jr' AND invented = 1;",
        why: "This is the shared case’s invention list. Therapy should be the row you see.",
      }),
    ],
  }),
];

export const llmLabs = [
  lab("llm", "How models work", {
    id: "llm-shared",
    title: "Score the shared note",
    promise: "You can accept left calf and reject a duration, using the same sentence the Python tools used.",
    keyboard: "labs/score.py. Two prints: True for left calf, False for a phrase that is not in the sentence.",
    sections: [
      prose("The model lesson, applied", [
        shared,
        "A language model continues a pattern. Given an authorization-shaped blank, it will often offer a duration, because letters in the world often have one. supported does not care how fluent that offer is. It asks whether the quote is inside the note you typed. left calf passes. A duration that never appears fails. That failure is the invention_count you already know how to increment, and the SQL row you already know how to store.",
        "Run both prints. If the duration returns True, your note string secretly contains it, or the function returns True by default. Either bug is the one that would let a draft through. Fix the function until the second print is False.",
      ], [codeBlock("python", "def supported(note, quote):\n    if not quote:\n        return False\n    return quote in note\n\nnote = \"Pain into the left calf. Level L5.\"\nprint(supported(note, \"left calf\"))\nprint(supported(note, \"six weeks\"))\nprint(supported(note, \"\"))")]),
    ],
    example: {
      title: "Three results",
      blocks: [
        { type: "p", text: "True, then False, then False. The empty quote fails because a missing citation is not a citation. The duration fails because it is not a substring. Only left calf passes, and you can find those letters in the sentence with your eyes." },
      ],
    },
    exercises: [
      choice(
        "supported returns True. What is true?",
        [
          "The payer will approve the service.",
          "The quote’s characters occur inside the note string.",
          "The model was trained on this chart.",
          "Therapy happened.",
        ],
        "b",
        "True means the quote is in the note. It does not mean the clinical story is complete or payable.",
        "The function is a string test. Keep its meaning that small."
      ),
      codeEx({
        prompt: "Write supported(note, quote). Empty quotes return False. Otherwise return whether the quote is in the note. Print the check for left calf.",
        snippets: ["def supported", "return false", "quote in note", "left calf", "print"],
        forbidden: ["six weeks of therapy"],
        sample: "def supported(note, quote):\n    if not quote:\n        return False\n    return quote in note\n\nnote = \"Pain into the left calf. Level L5.\"\nprint(supported(note, \"left calf\"))\n",
        correction: "def supported(note, quote):\n    if not quote:\n        return False\n    return quote in note",
        why: "This is the model’s output, scored against the shared note. Fluency is not an input.",
      }),
    ],
  }),
  lab("llm", "How models work", {
    id: "llm-prompt",
    title: "The box you would send a model",
    promise: "You can build the three-part prompt for the shared note, and refuse to build it when the note is empty.",
    keyboard: "labs/prompt.py. An empty note prints hold. The shared sentence prints a list of three strings.",
    sections: [
      prose("Instruction, note, question", [
        "A call to a model, when you eventually make one under a contract, is not a chat. It is three pieces: an instruction, the note, and the question. The instruction in this lab is one sentence: use only the note. The note is the shared sentence. The question is: quote or say missing. If the note string is empty, messages returns the word hold and does not build the list. There is nothing to quote.",
        "Print both calls. The hold result should be the word, not a list that says the note is blank in a cheerful way. A list with an empty note invites the model to answer from habit. You practiced that failure in the previous lesson. This function refuses to open the box.",
      ], [codeBlock("python", "def messages(note):\n    if not note:\n        return \"hold\"\n    return [\n        \"Use only the note.\",\n        note,\n        \"Quote a phrase or say missing.\",\n    ]\n\nprint(messages(\"\"))\nprint(messages(\"Pain into the left calf. Level L5.\"))")]),
    ],
    example: {
      title: "What the list is for",
      blocks: [
        { type: "p", text: "The second print is three lines in a list. A future call would send those three and then run supported on whatever quote came back. This lesson stops at building the box. It does not call a vendor, and it does not add a duration to the instruction to “help” the model." },
      ],
    },
    exercises: [
      choice(
        "The note string is empty. What should messages return?",
        [
          "A prompt that asks the model to recall typical therapy.",
          "The word hold, and no list.",
          "The shared sentence from memory.",
          "sent true.",
        ],
        "b",
        "No note, no prompt. hold is the result. A list with an empty note is how habit fills the page.",
        "The box stays shut when there is nothing to put in it."
      ),
      codeEx({
        prompt: "Write messages(note). If note is empty, return hold. Otherwise return a list that includes the note.",
        snippets: ["def messages", "hold", "return", "note"],
        forbidden: ["six weeks of therapy", "sent\": true"],
        sample: "def messages(note):\n    if not note:\n        return \"hold\"\n    return [\"Use only the note.\", note, \"Quote a phrase or say missing.\"]\n\nprint(messages(\"\"))\nprint(messages(\"Pain into the left calf. Level L5.\"))\n",
        correction: "def messages(note):\n    if not note:\n        return \"hold\"\n    return [\"Use only the note.\", note, \"Quote a phrase or say missing.\"]",
        why: "The prompt is three parts, and it is not built when the note is empty.",
      }),
    ],
  }),
];

export const trainLabs = [
  lab("train", "Train a small model", {
    id: "tr-steps",
    title: "Five steps on a toy line",
    promise: "You can loop one weight update and watch the guess move toward a number you chose, not toward a chart.",
    keyboard: "labs/steps.py. x is 2 and y is 4. Print the weight after each of five steps. There is no file of notes.",
    sections: [
      prose("Repetition is the whole trick", [
        "One update, from the earlier lesson, moved the weight from 0 to 0.8 when x was 2, y was 4, and the rate was 0.1. Five updates repeat that arithmetic. The prediction is weight times x. The step adds rate times x times the error. Print the weight each time. It should climb toward 2, because 2 times x is 4, the y you chose. It will not arrive in five steps. Closer is the point.",
        "Nothing in the loop reads a sentence, a code, or a duration. If you point this file at a folder of approval letters, you have left the lab. The stop rule from the training course still applies: no contract, or any invention, and you do not train. This file is how you see a step with your own eyes before anyone says the word fine-tune.",
      ], [codeBlock("python", "weight = 0.0\nrate = 0.1\nx = 2\ny = 4\nfor _ in range(5):\n    prediction = weight * x\n    weight = weight + rate * x * (y - prediction)\n    print(weight)")]),
    ],
    example: {
      title: "The first two numbers",
      blocks: [
        { type: "p", text: "The first printed weight is 0.8. The second is 0.8 plus 0.1 times 2 times (4 minus 1.6), which is 1.28. You can do that on paper before you trust the loop. If the first number is not 0.8, the formula was edited." },
      ],
    },
    exercises: [
      choice(
        "After five steps the weight is nearer to 2. What has the program learned about a patient?",
        [
          "That therapy lasted long enough.",
          "Nothing. x and y were numbers you typed.",
          "The payer’s current policy.",
          "Which CPT the note supports.",
        ],
        "b",
        "The loop fits a line to two numbers. It has no note, so it has no clinical fact.",
        "Watch the weight move. Do not narrate a chart into it."
      ),
      codeEx({
        prompt: "Start weight at 0, rate 0.1, x 2, y 4. Loop five times, update the weight, and print it.",
        snippets: ["weight", "rate", "for ", "range", "prediction", "print"],
        forbidden: ["open(", "six weeks"],
        sample: "weight = 0.0\nrate = 0.1\nx = 2\ny = 4\nfor _ in range(5):\n    prediction = weight * x\n    weight = weight + rate * x * (y - prediction)\n    print(weight)\n",
        correction: "weight = 0.0\nrate = 0.1\nx = 2\ny = 4\nfor _ in range(5):\n    prediction = weight * x\n    weight = weight + rate * x * (y - prediction)\n    print(weight)",
        why: "Five printed weights show the step. The only data are x and y.",
      }),
    ],
  }),
  lab("train", "Train a small model", {
    id: "tr-letter",
    title: "The next character, and nothing else",
    promise: "You can train a follower table on the shared sentence and see that a duration cannot come out of it.",
    keyboard: "labs/letters.py. The text is the shared sentence. Print the followers of the character l. Do not open a file.",
    sections: [
      prose("A model small enough to audit", [
        "This is the training idea at the size of the shared note. For each character, remember which character came next. That table is the whole model. Ask it what can follow l. You will see letters that actually followed l in “Pain into the left calf. Level L5.” You will not see a word that never occurred. A large model is the same kind of table, too large to read. When it offers a duration, it is offering a follower from other documents, not from this sentence.",
        "Print the list for l. Then check, with your eyes, that every character in that list appears in the sentence immediately after an l. If a character is not in the sentence at all, the function is wrong. The agent you assemble next does not use this table to write the packet. It uses quote_tool. This lab is so you can say, in a meeting, what “the model learned” means when the training text is one sentence you typed.",
      ], [codeBlock("python", "def followers(text):\n    pairs = {}\n    for i in range(len(text) - 1):\n        pairs.setdefault(text[i], []).append(text[i + 1])\n    return pairs\n\ntext = \"Pain into the left calf. Level L5.\"\nprint(followers(text)[\"l\"])")]),
    ],
    example: {
      title: "What cannot be in the list",
      blocks: [
        { type: "p", text: "The list after l contains characters such as e, from left, and possibly others that really followed an l. It does not contain the phrase six weeks, because that phrase is not in the string and a character table cannot emit a phrase it never saw as consecutive characters. If you wanted that phrase, you would have had to type it into text. That is the entire ethics of this lab." },
      ],
    },
    exercises: [
      choice(
        "The follower list for l does not contain a therapy duration. Why?",
        [
          "The rate was too small.",
          "Those characters never followed l in the sentence you typed.",
          "Python blocks clinical words.",
          "The SQL table deleted them.",
        ],
        "b",
        "The table only stores characters that occurred. A duration that was not typed cannot be a follower.",
        "Small models make the limit visible. Large ones hide the same limit."
      ),
      codeEx({
        prompt: "Write followers(text) using setdefault and a range loop. Build it on the shared sentence and print the followers of l.",
        snippets: ["def followers", "setdefault", "range", "return", "print"],
        forbidden: ["open(", "six weeks of therapy"],
        sample: "def followers(text):\n    pairs = {}\n    for i in range(len(text) - 1):\n        pairs.setdefault(text[i], []).append(text[i + 1])\n    return pairs\n\ntext = \"Pain into the left calf. Level L5.\"\nprint(followers(text)[\"l\"])\n",
        correction: "def followers(text):\n    pairs = {}\n    for i in range(len(text) - 1):\n        pairs.setdefault(text[i], []).append(text[i + 1])\n    return pairs",
        why: "The model is the sentence. Printing one entry lets you check it by eye.",
      }),
    ],
  }),
];

export const agentLabs = [
  lab("agent", "An agent from scratch", {
    id: "ag-all",
    title: "The shared note, running",
    promise: "You can run the quote tool, the gap tool, and a three-step loop on the shared note, and return a report that is not sent.",
    keyboard: "labs/agent.py. This file is the Python tools, the report shape you repeated in JavaScript, and the row you stored in SQL. Run it. Then break sent on purpose and watch the assert.",
    sections: [
      prose("Everything you wrote, in order", [
        shared,
        "run calls quote_tool on left calf, then records the gaps, then stops. The loop is range(3), so a bug cannot spin. The return value is a dict with the trace and sent false. That dict is what JavaScript’s report was practicing, and what the SQL rows were storing: a found quote, a therapy gap, and a flag that stays false. supported, from the model lesson, is the reason the quote has to be a substring. The character model is not in this file. It was there so you could see why a fluent duration is not evidence.",
        "There is no network call, no payer URL, and no branch that sets sent to true when the gaps happen to be empty. Add an assert that the first trace item was found, and an assert that sent is false. Print passed. Save the file. This is the program you can read aloud in a design review: what it calls, when it stops, and what it refuses to do.",
      ], [codeBlock("python", "def quote_tool(note, phrase):\n    if phrase and phrase in note:\n        return {\"status\": \"found\", \"quote\": phrase}\n    return {\"status\": \"missing\", \"quote\": \"\"}\n\ndef gaps(fields):\n    found = []\n    if fields.get(\"therapy\", \"missing\") == \"missing\":\n        found.append(\"therapy\")\n    return found\n\ndef run(text, fields):\n    trace = []\n    for _ in range(3):\n        trace.append(quote_tool(text, \"left calf\"))\n        trace.append({\"gaps\": gaps(fields)})\n        break\n    return {\"trace\": trace, \"sent\": False}\n\ntext = \"Pain into the left calf. Level L5.\"\nfields = {\"side\": \"left\", \"level\": \"L5\", \"route\": \"\", \"therapy\": \"missing\"}\nresult = run(text, fields)\nassert result[\"sent\"] is False\nassert result[\"trace\"][0][\"status\"] == \"found\"\nassert \"therapy\" in result[\"trace\"][1][\"gaps\"]\nprint(result)\nprint(\"passed\")")]),
      prose("How to demo it", [
        "Run the file once and leave the output on the screen. Point at found, then at therapy inside gaps, then at sent false. Then say which course each line came from: the quote and the gaps from Python, the shape from JavaScript, the place those facts would be stored from SQL, the reason a fluent extra sentence would fail from the model lesson, and the reason this file does not train from the training lesson. That walk-through is the integration. A slide that says “AI agent” without this file is not.",
      ]),
    ],
    example: {
      title: "A one-minute break",
      blocks: [
        { type: "p", text: "Set sent to True inside run and execute. AssertionError names the assert line. The trace may still show a correct quote. A correct quote does not excuse a true send flag. Put False back, run again, and keep the passing file." },
      ],
    },
    exercises: [
      choice(
        "The trace shows a found quote and a therapy gap. What may the program do next?",
        [
          "Submit, because the quote proves the note was read.",
          "Stop. sent is false, and the gap is part of the report.",
          "Train on the sentence so the gap disappears.",
          "Copy the gap into the note as a duration.",
        ],
        "b",
        "The report is the product. A found quote does not clear the therapy gap, and neither one sets sent to true.",
        "You can explain the file. That is the point of the six courses."
      ),
      codeEx({
        prompt: "Write quote_tool, gaps, and run. run loops at most 3 times, returns sent false, and the asserts check found, the therapy gap, and sent. Print passed.",
        snippets: ["def quote_tool", "def gaps", "range(3)", "sent", "false", "assert", "therapy", "passed"],
        forbidden: ["while true", "sent\": true", "six weeks of therapy"],
        sample: "def quote_tool(note, phrase):\n    if phrase and phrase in note:\n        return {\"status\": \"found\", \"quote\": phrase}\n    return {\"status\": \"missing\", \"quote\": \"\"}\n\ndef gaps(fields):\n    found = []\n    if fields.get(\"therapy\", \"missing\") == \"missing\":\n        found.append(\"therapy\")\n    return found\n\ndef run(text, fields):\n    trace = []\n    for _ in range(3):\n        trace.append(quote_tool(text, \"left calf\"))\n        trace.append({\"gaps\": gaps(fields)})\n        break\n    return {\"trace\": trace, \"sent\": False}\n\nresult = run(\"Pain into the left calf. Level L5.\", {\"therapy\": \"missing\"})\nassert result[\"sent\"] is False\nassert \"therapy\" in result[\"trace\"][1][\"gaps\"]\nprint(\"passed\")\n",
        correction: "def run(text, fields):\n    trace = []\n    for _ in range(3):\n        trace.append(quote_tool(text, \"left calf\"))\n        trace.append({\"gaps\": gaps(fields)})\n        break\n    return {\"trace\": trace, \"sent\": False}",
        why: "One file runs the tools, keeps the bound, and refuses to send. The asserts are the demo.",
      }),
    ],
  }),
];
