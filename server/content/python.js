import { choice, codeBlock, codeEx, lesson, prose } from "./factory.js";

const track = "Python";
const sequence = "python";

function py(spec) {
  return lesson({ ...spec, sequence, trackTitle: track });
}

export const pythonLessons = [
  py({
    id: "py-run",
    title: "Run a Python file",
    promise: "You can install Python, make a file, run it, and read a traceback.",
    keyboard: "On Windows, py -V is the check. A file named lab.py is run with py lab.py from the folder that contains it.",
    record: "This file is for fictional cases. Do not save a real APICO note on the desktop to practice.",
    sections: [
      prose("Why Python is the language of the agent", [
        "The approval agent you are learning to sponsor will be written in Python. Python is the language used to train models, to count their mistakes, and to call tools in a loop. JavaScript runs this classroom and can run a small tool server. SQL stores the rows you will audit. Python is where the loop lives.",
        "A program is a text file the computer follows from top to bottom. It does not understand pain management. It does what the lines say, including a line that invents six weeks of therapy if you write that line. Learning to code is learning to make those lines visible and testable.",
      ]),
      prose("Install, then prove it", [
        "Download Python from python.org. Choose the current stable 3.x installer for Windows. On the first screen, turn on “Add python.exe to PATH”. Finish the install. Close every terminal, including the one inside Cursor, and open a new one.",
        "Type py -V. You want a version that starts with Python 3. If the command is not found, the PATH box was missed or the terminal is old. Install again with that box checked, then open a new terminal.",
        "In the MedOpsHQ folder, create a directory called labs if you want the exercises kept together. New file: labs/hello_record.py. Put one line in it: print(\"fictional only\"). Save. In the terminal, from the MedOpsHQ folder, run py labs/hello_record.py. The words fictional only should appear, and then the program ends.",
      ], [codeBlock("python", "print(\"fictional only\")")]),
      prose("A traceback is a location, not an insult", [
        "When Python cannot run a line, it prints a traceback: the file, the line number, and the kind of error. NameError means you used a name you never assigned. SyntaxError means the line is not legal Python, often a missing quote or colon. Read the last line of the traceback first. That is the diagnosis. The line number is the level.",
      ]),
    ],
    example: {
      title: "Worked case: a missing quote",
      blocks: [
        { type: "p", text: "You type print(\"fictional only) and Python stops before running anything. The traceback says SyntaxError and points at the line. The opening quote has no partner. You add the quote. You run the file again. You do not ask a model to “just fix the company agent” before you can fix one line." },
        codeBlock("python", "print(\"fictional only\")"),
      ],
    },
    exercises: [
      choice(
        "You want to know whether Python is installed. What do you run?",
        [
          "npm run dev, because Python and Node are the same tool.",
          "py -V in a new terminal, after the installer has been allowed to update PATH.",
          "Paste a real chart into the file so Python can detect medicine.",
          "Nothing. Cursor runs Python without an install.",
        ],
        "b",
        "Run py -V in a terminal opened after installation. Node does not install Python. A chart does not belong in the practice file.",
        "The version line is the proof the workbench can see Python."
      ),
      codeEx({
        prompt: "Write a one-line Python program that prints the words fictional only.",
        snippets: ["print", "fictional only"],
        sample: "print(\"fictional only\")\n",
        correction: "print(\"fictional only\")",
        why: "print sends text to the terminal. The quotes make the words a string.",
      }),
    ],
  }),
  py({
    id: "py-names",
    title: "Names and values",
    promise: "You can bind a name to a value and tell a string from a number.",
    keyboard: "level = \"L4-L5\" stores text. weeks = 6 stores a number. They are not the same kind of thing.",
    record: "A name in a program is not a fact in a chart. weeks = 6 does not mean the patient had six weeks of care.",
    sections: [
      prose("A name points at a value", [
        "Assignment is the equals sign. The name is on the left. The value is on the right. side = \"left\" means: when this program says side, use the text left. It does not look up the patient. You put the text there.",
        "Numbers do not take quotes. count = 1 is a number. count = \"1\" is text that happens to look like a digit. You can add numbers. You cannot add a number to text without converting. That error is useful. It stops you from mixing a code with a sentence.",
      ], [codeBlock("python", "side = \"left\"\nlevel = \"L4-L5\"\nlevels_treated = 1\nprint(side, level, levels_treated)")]),
      prose("Names are case-sensitive and boring on purpose", [
        "side and Side are different names. Pick one style and keep it: lower case, with underscores between words, as in levels_treated. A name should say what the value is. data and temp teach you nothing at hour 3 when the program breaks.",
        "Reassignment replaces the value. levels_treated = 1 and later levels_treated = 2 means the name now points at 2. The 1 is gone. If the note said one level, a later line that writes 2 is the program inventing a level. You will learn to test for that.",
      ]),
    ],
    example: {
      title: "Worked case: J.R. as three names",
      blocks: [
        { type: "p", text: "The fictional note says left, L4–L5, and one level. The program stores only those. It does not store a second level because templates often do." },
        codeBlock("python", "side = \"left\"\nlevel = \"L4-L5\"\nlevels_treated = 1\nprint(side)\nprint(level)\nprint(levels_treated)"),
      ],
    },
    exercises: [
      choice(
        "What is true of side = \"left\"?",
        [
          "Python checked the chart and found the side.",
          "The name side now refers to the text left, because the program assigned it.",
          "left becomes a number you can bill.",
          "The line submits an authorization.",
        ],
        "b",
        "Assignment stores what you wrote. It does not read a chart and it does not send a request.",
        "The program knows only the values you give it."
      ),
      codeEx({
        prompt: "Assign side to the text left, level to the text L4-L5, and levels_treated to the number 1. Print all three.",
        snippets: ["side", "left", "level", "l4-l5", "levels_treated", "1", "print"],
        forbidden: ["l5-s1", "bilateral"],
        sample: "side = \"left\"\nlevel = \"L4-L5\"\nlevels_treated = 1\nprint(side, level, levels_treated)\n",
        correction: "side = \"left\"\nlevel = \"L4-L5\"\nlevels_treated = 1\nprint(side, level, levels_treated)",
        why: "Text is quoted. The count is a bare number. Nothing in this snippet adds a level the note did not name.",
      }),
    ],
  }),
  py({
    id: "py-text",
    title: "Strings",
    promise: "You can build a sentence from values without smuggling in a new fact.",
    keyboard: "An f-string, f\"{side}\", inserts the value of side. It does not invent a value you did not assign.",
    record: "If duration is missing, the string should say missing. It should not say six weeks.",
    sections: [
      prose("Quotes and f-strings", [
        "A string is text in quotes. You can use double quotes or single quotes. Stay with double quotes in this course so the files look alike. A string can be empty: \"\". Empty is not the same as the word missing. Empty often means you forgot. missing is a decision.",
        "An f-string starts with f before the quote. Curly braces insert a name. f\"{side} {level}\" becomes left L4-L5 if those names hold those values. The f-string does not go and find a more impressive sentence.",
      ], [codeBlock("python", "side = \"left\"\nlevel = \"L4-L5\"\nduration = \"missing\"\nline = f\"{side} {level}; therapy duration: {duration}\"\nprint(line)")]),
      prose("What you must not concatenate", [
        "Joining text with + works: side + \" \" + level. It also makes a mess of spaces. Prefer the f-string. Never build the string by adding a fact that is not in a variable you traced to the note. The line f\"failed {6} weeks of therapy\" is a program writing a medical fact. Six was not in the note. It was in the braces.",
      ]),
    ],
    example: {
      title: "Worked case: the gap stays a gap",
      blocks: [
        codeBlock(
          "python",
          "side = \"left\"\nlevel = \"L4-L5\"\ntherapy = \"missing\"\nprint(f\"{side} {level}; therapy: {therapy}\")"
        ),
      ],
    },
    exercises: [
      choice(
        "therapy is the text missing. What does f\"therapy: {therapy}\" produce?",
        [
          "therapy: six weeks, because that is usual.",
          "therapy: missing",
          "It submits the packet.",
          "It looks up Novitas.",
        ],
        "b",
        "The braces insert the value the name already has. missing stays missing.",
        "An f-string is a printer, not a clinician."
      ),
      codeEx({
        prompt: "Set therapy to the text missing. Print an f-string that includes that name. Do not write a number of weeks.",
        snippets: ["therapy", "missing", "print", "f\""],
        forbidden: ["six weeks", "6 weeks", "80"],
        sample: "therapy = \"missing\"\nprint(f\"therapy: {therapy}\")\n",
        correction: "therapy = \"missing\"\nprint(f\"therapy: {therapy}\")",
        why: "The value missing is stored, then inserted. No duration is invented.",
      }),
    ],
  }),
  py({
    id: "py-lists",
    title: "Lists and loops",
    promise: "You can keep several quotes in a list and visit each one.",
    keyboard: "quotes = [\"left calf\", \"L4-L5\"] then for item in quotes.",
    record: "A loop prints what is in the list. If a quote was never appended, the loop cannot see it, and it must not pretend.",
    sections: [
      prose("A list is an ordered row of values", [
        "Square brackets make a list. quotes = [\"left calf\", \"L4-L5 disc\"]. The first item is quotes[0], because counting starts at zero. quotes[1] is the second item. quotes[2] on a two-item list raises IndexError. That crash is better than silently inventing a third quote.",
        "len(quotes) is how many items are in the list. append adds one item at the end. You append a quote you found in the note. You do not append “six weeks of therapy” because the list looked short.",
      ], [codeBlock("python", "quotes = [\"left calf\", \"L4-L5 disc\"]\nfor quote in quotes:\n    print(quote)\nprint(len(quotes))")]),
      prose("The loop body is indented", [
        "The lines that belong to the for must be indented, four spaces in this course. Python uses the indent as grammar. A line that is not indented is outside the loop and runs once, after the loop finishes.",
      ]),
    ],
    example: {
      title: "Worked case: two quotes, then stop",
      blocks: [
        codeBlock(
          "python",
          "quotes = []\nquotes.append(\"pain into the left calf\")\nquotes.append(\"disc herniation at L4-L5\")\nfor quote in quotes:\n    print(\"cite:\", quote)\nprint(\"count\", len(quotes))"
        ),
      ],
    },
    exercises: [
      choice(
        "A list has two quotes. What is quotes[2]?",
        [
          "A third quote Python infers.",
          "An IndexError. There is no third item.",
          "The payer’s preferred sentence.",
          "Index 2 is the first item.",
        ],
        "b",
        "Indexes start at 0. Index 2 would be a third item. It is not there, so Python raises IndexError.",
        "Crashes on a missing item are safer than invention."
      ),
      codeEx({
        prompt: "Make a list of two strings, append nothing about therapy, loop with for, and print each string.",
        snippets: ["for ", "in ", "print", "["],
        forbidden: ["six weeks", "append(\"6"],
        sample: "quotes = [\"left calf\", \"L4-L5\"]\nfor quote in quotes:\n    print(quote)\n",
        correction: "quotes = [\"left calf\", \"L4-L5\"]\nfor quote in quotes:\n    print(quote)",
        why: "The loop visits only the strings you placed in the list.",
      }),
    ],
  }),
  py({
    id: "py-dicts",
    title: "Dictionaries",
    promise: "You can represent one fictional encounter as fields with names.",
    keyboard: "note[\"side\"] is a lookup. A missing key raises KeyError unless you use .get.",
    record: "Use .get(key, \"missing\") when the field may be absent. The default missing is the honest value.",
    sections: [
      prose("A dict is a chart-shaped value", [
        "A dictionary maps a key to a value. Curly braces, keys in quotes, colons between key and value. note = {\"side\": \"left\", \"level\": \"L4-L5\", \"therapy\": \"missing\"}. note[\"side\"] is left. This is how a program should hold an encounter: named fields, not one slurry paragraph.",
        "note.get(\"therapy\", \"missing\") returns the therapy if the key exists, otherwise the second argument. note[\"pain_score\"] crashes if you never stored a pain score. The crash is acceptable in a lab. In the agent, you will catch absence and record the gap instead of substituting 8.",
      ], [codeBlock("python", "note = {\n    \"side\": \"left\",\n    \"level\": \"L4-L5\",\n    \"therapy\": \"missing\",\n}\nprint(note[\"side\"])\nprint(note.get(\"pain_score\", \"missing\"))")]),
      prose("Keys are exact", [
        "\"side\" and \"Side\" are different keys. Agree the names once: side, level, route, therapy, imaging. A later tool will look for those exact keys. A clever synonym in one file and another name in the next file is how gaps disappear.",
      ]),
    ],
    example: {
      title: "Worked case: J.R. without a pain score",
      blocks: [
        codeBlock(
          "python",
          "note = {\"side\": \"left\", \"level\": \"L4-L5\", \"route\": \"transforaminal\", \"therapy\": \"missing\"}\nprint(note.get(\"pain_score\", \"missing\"))\nprint(note[\"route\"])"
        ),
      ],
    },
    exercises: [
      choice(
        "The dict has no pain_score. What should the lab print?",
        [
          "8, a typical score.",
          "missing, because that is the default you passed to .get.",
          "The score from the previous patient.",
          "80 percent.",
        ],
        "b",
        "note.get(\"pain_score\", \"missing\") returns missing when the key is absent. It does not borrow a score.",
        "The default is part of the call. Choose it on purpose."
      ),
      codeEx({
        prompt: "Build a dict with side left and therapy missing. Print therapy using .get so a missing key would still yield missing.",
        snippets: ["side", "therapy", "missing", ".get", "print"],
        forbidden: ["pain_score\": 8", "\"8\"", "six weeks"],
        sample: "note = {\"side\": \"left\", \"therapy\": \"missing\"}\nprint(note.get(\"therapy\", \"missing\"))\n",
        correction: "note = {\"side\": \"left\", \"therapy\": \"missing\"}\nprint(note.get(\"therapy\", \"missing\"))",
        why: ".get returns the stored value or the default. The default here is the word missing.",
      }),
    ],
  }),
  py({
    id: "py-branch",
    title: "Branches",
    promise: "You can write an if that refuses to treat a missing field as present.",
    keyboard: "if therapy == \"missing\": then the packet is not ready. == compares. = assigns. Mixing them is a classic bug.",
    record: "The else branch is where invention hides. Else must not fill the field. It may only say the packet waits.",
    sections: [
      prose("Comparison and the colon", [
        "if therapy == \"missing\": asks a question. The colon opens a block. The next indented lines run only when the question is true. == is comparison. = would assign, and inside an if it is a syntax error in modern Python. That error is a gift.",
        "elif asks a second question when the first was false. else runs when every question above it was false. You owe the else an honest action. Printing not ready is honest. Setting therapy = \"six weeks\" inside else is the bug this course exists to make you see.",
      ], [codeBlock("python", "therapy = \"missing\"\nif therapy == \"missing\":\n    ready = False\n    print(\"not ready\")\nelse:\n    ready = True\n    print(\"therapy is in the note\")\nprint(ready)")]),
    ],
    example: {
      title: "Worked case: else does not repair the note",
      blocks: [
        { type: "p", text: "A wrong else sets therapy to a sentence the policy likes. The corrected else only reports that the packet is not ready. The dict is unchanged." },
        codeBlock(
          "python",
          "note = {\"therapy\": \"missing\"}\nif note[\"therapy\"] == \"missing\":\n    print(\"hold the packet\")\nelse:\n    print(note[\"therapy\"])"
        ),
      ],
    },
    exercises: [
      choice(
        "Which branch is unsafe?",
        [
          "if therapy == \"missing\": print(\"hold\")",
          "else: therapy = \"six weeks of physical therapy\"",
          "elif route == \"interlaminar\": print(route)",
          "print(\"not ready\") when the field is missing",
        ],
        "b",
        "The else that writes six weeks manufactures a fact. Holding the packet does not.",
        "Look at else first when you review a teammate’s script."
      ),
      codeEx({
        prompt: "Write an if that prints hold when therapy equals missing. The other branch may print the therapy value. It must not assign six weeks.",
        snippets: ["if ", "missing", "print", "else"],
        forbidden: ["six weeks", "= \"6", "6 weeks"],
        sample: "therapy = \"missing\"\nif therapy == \"missing\":\n    print(\"hold\")\nelse:\n    print(therapy)\n",
        correction: "therapy = \"missing\"\nif therapy == \"missing\":\n    print(\"hold\")\nelse:\n    print(therapy)",
        why: "The true branch holds. The false branch prints a value that was already there.",
      }),
    ],
  }),
  py({
    id: "py-funcs",
    title: "Functions",
    promise: "You can wrap a check in a function that returns a value, or returns None when it must not guess.",
    keyboard: "def starts a function. return sends a value back. A function without return hands back None.",
    record: "None means no candidate. It is a successful result when the plan does not name a procedure.",
    sections: [
      prose("def, parameters, return", [
        "A function is a named block you can run more than once. def ready(therapy): defines it. therapy is a parameter, a name that receives the value you pass in. The call ready(\"missing\") runs the block with therapy bound to missing.",
        "return exits the function and gives a value to the caller. status = ready(\"missing\") stores that value. If you forget return, status is None. Print inside the function shows text and still returns None unless you also return. For these labs, return the answer. Printing is for you, the human, at the edge of the program.",
      ], [codeBlock("python", "def packet_status(therapy):\n    if therapy == \"missing\":\n        return \"hold\"\n    return \"quote the therapy\"\n\nprint(packet_status(\"missing\"))\nprint(packet_status(\"started January, ongoing\"))")]),
      prose("None is a decision", [
        "def procedure_family(route): if route is empty or None, return None. Do not return \"64483\" because that family is familiar. The caller sees None and stops. That is the code-candidate rule, written as a function.",
      ]),
    ],
    example: {
      title: "Worked case: no route, no family",
      blocks: [
        codeBlock(
          "python",
          "def procedure_family(route):\n    if route == \"transforaminal\":\n        return \"transforaminal family\"\n    if route == \"interlaminar\":\n        return \"interlaminar family\"\n    return None\n\nprint(procedure_family(\"\"))\nprint(procedure_family(\"interlaminar\"))"
        ),
      ],
    },
    exercises: [
      choice(
        "A function returns None. What happened?",
        [
          "Python failed and the packet was sent anyway.",
          "The function finished without a usable value. The caller must treat that as no answer.",
          "None means the highest-paying code.",
          "None means six weeks.",
        ],
        "b",
        "None is the value you get when the function refuses to guess. The caller stops.",
        "Use None on purpose for “no candidate”."
      ),
      codeEx({
        prompt: "Define procedure_family(route). Return a short label if route is transforaminal or interlaminar. Otherwise return None.",
        snippets: ["def procedure_family", "transforaminal", "interlaminar", "return none"],
        forbidden: ["64483", "six weeks"],
        sample: "def procedure_family(route):\n    if route == \"transforaminal\":\n        return \"transforaminal family\"\n    if route == \"interlaminar\":\n        return \"interlaminar family\"\n    return None\n",
        correction: "def procedure_family(route):\n    if route == \"transforaminal\":\n        return \"transforaminal family\"\n    if route == \"interlaminar\":\n        return \"interlaminar family\"\n    return None",
        why: "The function names a family only when the route word is present. Otherwise it returns None.",
      }),
    ],
  }),
  py({
    id: "py-files",
    title: "Files",
    promise: "You can read a fictional note from a text file and refuse to overwrite it with a prettier story.",
    keyboard: "with open(path, encoding=\"utf-8\") as handle: text = handle.read(). The with closes the file even if a later line fails.",
    record: "Open a file you created with fictional text. Do not point the path at an export from the practice.",
    sections: [
      prose("Read, do not decorate", [
        "A path is a string: \"labs/jr.txt\". You create that file yourself and type the fictional sentences into it. open reads it. mode \"r\" is read. mode \"w\" erases the file and writes. You will not use \"w\" on a note in this course. The agent reads. A human changes the chart in the record system, not by a script with mode w.",
        "encoding=\"utf-8\" tells Python how the bytes become text. Leave it on. A file of quotes comes back as one string, newlines included. You can splitlines() to get a list of lines.",
      ], [codeBlock("python", "from pathlib import Path\n\npath = Path(\"labs/jr.txt\")\ntext = path.read_text(encoding=\"utf-8\")\nfor line in text.splitlines():\n    print(\"line:\", line)")]),
      prose("What a path must not be", [
        "A path like Downloads/apico_export.csv is the end of the lab exercise and the start of a privacy incident, unless counsel and the business-associate agreement named that file and that machine. For the bootcamp, the only legal notes in labs/ are ones you typed from this classroom’s fiction.",
      ]),
    ],
    example: {
      title: "Worked case: read and list lines",
      blocks: [
        { type: "p", text: "labs/jr.txt contains three lines you typed: left calf pain, MRI L4-L5, therapy not stated. The program prints them with a prefix so you can see it did not add a fourth." },
        codeBlock(
          "python",
          "from pathlib import Path\ntext = Path(\"labs/jr.txt\").read_text(encoding=\"utf-8\")\nlines = [line for line in text.splitlines() if line.strip()]\nprint(len(lines))\nfor line in lines:\n    print(line)"
        ),
      ],
    },
    exercises: [
      choice(
        "Which file mode matches this course?",
        [
          "w on the practice’s exported notes, so the model can improve them.",
          "Read a file of fictional lines you typed. Do not open a real export.",
          "w, because write mode is how quotes are stored.",
          "Any PDF in Downloads.",
        ],
        "b",
        "Read fiction you created. Writing mode on a real export would change or destroy a record you are not allowed to touch in a lab.",
        "The path is a decision about privacy, not a technicality."
      ),
      codeEx({
        prompt: "Write a function first_line(text) that returns the first line of a string, or missing if the string is empty. Use splitlines. Do not mention a real file path.",
        snippets: ["def first_line", "splitlines", "return", "missing"],
        forbidden: ["downloads", "apico_export", ".csv"],
        sample: "def first_line(text):\n    lines = text.splitlines()\n    if not lines:\n        return \"missing\"\n    return lines[0]\n",
        correction: "def first_line(text):\n    lines = text.splitlines()\n    if not lines:\n        return \"missing\"\n    return lines[0]",
        why: "An empty note yields missing. Otherwise you return a line that was actually in the text.",
      }),
    ],
  }),
  py({
    id: "py-tests",
    title: "Tests",
    promise: "You can lock a function’s behavior with assert so a later edit cannot quietly invent.",
    keyboard: "assert packet_status(\"missing\") == \"hold\" crashes the file when the function drifts.",
    record: "A test is a gold case, the same idea as the evaluation set. Write the expected answer before you trust the function.",
    sections: [
      prose("assert is a lock", [
        "assert condition raises AssertionError when the condition is false. assert packet_status(\"missing\") == \"hold\" documents the contract: missing therapy means hold. If someone later changes the function to return a letter, the test fails before the letter reaches anyone.",
        "Write the test next to the function in labs/test_packet.py. Run py labs/test_packet.py. Silence means the asserts passed. A traceback means you learned something while it was still cheap.",
      ], [codeBlock("python", "def packet_status(therapy):\n    if therapy == \"missing\":\n        return \"hold\"\n    return \"quote\"\n\nassert packet_status(\"missing\") == \"hold\"\nassert packet_status(\"started January\") == \"quote\"\nprint(\"passed\")")]),
      prose("Tests you should refuse to write", [
        "Do not write assert packet_status(\"missing\") == \"approved\". That test would force the function to lie. The gold answer comes from the rule, not from the output you wish a payer would send.",
      ]),
    ],
    example: {
      title: "Worked case: two asserts",
      blocks: [
        codeBlock(
          "python",
          "def procedure_family(route):\n    if not route:\n        return None\n    return route + \" family\"\n\nassert procedure_family(\"\") is None\nassert procedure_family(\"interlaminar\") == \"interlaminar family\"\nprint(\"passed\")"
        ),
      ],
    },
    exercises: [
      choice(
        "A test fails. What do you do first?",
        [
          "Delete the assert so the script is green.",
          "Read the expected value and the actual value. Fix the function if it drifted from the rule.",
          "Change the expected value to whatever the function printed.",
          "Add six weeks so the assert can pass.",
        ],
        "b",
        "The assert is the rule. If the function disagrees, the function is wrong unless you discover the test itself encodes a lie.",
        "Green by deleting tests is how invention ships."
      ),
      codeEx({
        prompt: "Write packet_status and two asserts: missing returns hold, and any other short string returns quote. End by printing passed.",
        snippets: ["def packet_status", "assert", "hold", "missing", "passed"],
        forbidden: ["six weeks"],
        sample: "def packet_status(therapy):\n    if therapy == \"missing\":\n        return \"hold\"\n    return \"quote\"\nassert packet_status(\"missing\") == \"hold\"\nassert packet_status(\"january\") == \"quote\"\nprint(\"passed\")\n",
        correction: "def packet_status(therapy):\n    if therapy == \"missing\":\n        return \"hold\"\n    return \"quote\"\nassert packet_status(\"missing\") == \"hold\"\nassert packet_status(\"january\") == \"quote\"\nprint(\"passed\")",
        why: "The asserts are the spec. missing holds. Anything already written can be quoted. Nothing is invented.",
      }),
    ],
  }),
  py({
    id: "py-errors",
    title: "Refusal, not a crash in production",
    promise: "You can tell a bug (let it crash in the lab) from a missing fact (return a gap).",
    keyboard: "raise ValueError(\"empty note\") for a programming mistake. return {\"gap\": \"therapy\"} for a missing clinical fact.",
    record: "A missing therapy date is not an exception to hide. It is a result the human must see.",
    sections: [
      prose("Two kinds of failure", [
        "A bug is the program being used wrongly: an empty string where the lab promised a note, a typo in a key, a path that does not exist. In the lab, let it crash so you see it. ValueError and KeyError are teachers.",
        "A missing fact in a well-formed note is not a bug. The note is allowed to lack a duration. The function returns a gap. If you raise an error and a coworker wraps the call in except Exception: pass, the gap vanishes and the packet continues. Bare except is how you bury the only signal you had.",
      ], [codeBlock("python", "def gaps(note):\n    found = []\n    if note.get(\"therapy\", \"missing\") == \"missing\":\n        found.append(\"therapy\")\n    if not note.get(\"route\"):\n        found.append(\"route\")\n    return found\n\nprint(gaps({\"side\": \"left\"}))")]),
      prose("Do not catch what you cannot name", [
        "except KeyError: is specific. except Exception: that then returns \"approved\" is a refusal to look. In this course the except block, when you use one, must return the gap or re-raise. It must not invent a field to keep the loop alive.",
      ]),
    ],
    example: {
      title: "Worked case: the list of gaps is the result",
      blocks: [
        codeBlock(
          "python",
          "def gaps(note):\n    found = []\n    for key in (\"side\", \"level\", \"route\", \"therapy\"):\n        if note.get(key, \"missing\") == \"missing\":\n            found.append(key)\n    return found\n\nnote = {\"side\": \"left\", \"level\": \"L4-L5\", \"route\": \"transforaminal\"}\nprint(gaps(note))"
        ),
      ],
    },
    exercises: [
      choice(
        "Therapy is absent from a valid note. What should the function do?",
        [
          "except Exception and return approved.",
          "Return a gap list that includes therapy.",
          "Set therapy to six weeks so the caller does not crash.",
          "Delete the key from the policy.",
        ],
        "b",
        "Absence is a result: the gap list. It is not an approval and not a filled-in duration.",
        "Save exceptions for real misuse. Save gap lists for thin notes."
      ),
      codeEx({
        prompt: "Define gaps(note) so it returns a list. If therapy is missing, the list must include the word therapy. Do not assign a duration.",
        snippets: ["def gaps", "therapy", "return", "missing"],
        forbidden: ["six weeks", "except exception"],
        sample: "def gaps(note):\n    found = []\n    if note.get(\"therapy\", \"missing\") == \"missing\":\n        found.append(\"therapy\")\n    return found\n",
        correction: "def gaps(note):\n    found = []\n    if note.get(\"therapy\", \"missing\") == \"missing\":\n        found.append(\"therapy\")\n    return found",
        why: "The function reports the gap. It does not fill it, and it does not swallow the problem in a bare except.",
      }),
    ],
  }),
];
