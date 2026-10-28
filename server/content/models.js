import { choice, codeBlock, codeEx, lesson, prose } from "./factory.js";

function trackLesson(sequence, trackTitle, spec) {
  return lesson({ ...spec, sequence, trackTitle });
}

export const llmLessons = [
  trackLesson("llm", "How models work", {
    id: "llm-next",
    title: "The next token",
    promise: "You can explain a language model as a next-piece predictor, and show it in a tiny count.",
    keyboard: "You do not need a graphics card for this lesson. A dictionary of counts is the whole model.",
    record: "The counts come from a sentence you type. They do not come from a chart.",
    sections: [
      prose("Prediction, not lookup", [
        "A large language model guesses the next token, a chunk of a word, given the tokens so far. It was trained on an enormous amount of text, so the guesses are often useful. The guess is still a continuation of a pattern. If authorization letters usually mention six weeks of therapy, the continuation will offer those words when your note did not.",
        "You can see the same mechanism in miniature. Take the sentence you type. Record which character followed which character. The most common follower is the model’s guess. It will be dull, and it will not be a fact about a patient.",
      ]),
      prose("Tokens are pieces", [
        "A token is not always a word. “L4-L5” might be several tokens. A long note that does not fit the context window is cut off, and the model answers from what remained plus its habits. Ask a vendor what the product does at the limit: refuse, or warn. Inventing the missing pages is the failure.",
      ], [codeBlock("python", "text = \"left calf pain. \"\npairs = {}\nfor i in range(len(text) - 1):\n    pairs.setdefault(text[i], []).append(text[i + 1])\nprint(pairs[\" \"])")]),
    ],
    example: {
      title: "Worked case: the space’s followers",
      blocks: [
        { type: "p", text: "The list after a space is the characters that followed a space in your sentence. The model of this lab can only repeat those. It cannot discover a therapy date that was never typed." },
      ],
    },
    exercises: [
      choice(
        "Why does a draft mention six weeks when the note does not?",
        [
          "The model queried Medicare.",
          "Continuations of letters often include that phrase, so the next-token guess offers it.",
          "Temperature 0 forces truth.",
          "HIPAA requires likely facts to be filled in.",
        ],
        "b",
        "The pattern is in the kind of document, not in this chart. The guess fills the shape.",
        "Plausibility is the training signal."
      ),
      codeEx({
        prompt: "Build a dict of character followers for a short string you invent, such as left calf. Use a loop and setdefault. Print one entry.",
        snippets: ["setdefault", "for ", "range", "print"],
        forbidden: ["six weeks"],
        sample: "text = \"left calf\"\npairs = {}\nfor i in range(len(text) - 1):\n    pairs.setdefault(text[i], []).append(text[i + 1])\nprint(pairs)\n",
        correction: "text = \"left calf\"\npairs = {}\nfor i in range(len(text) - 1):\n    pairs.setdefault(text[i], []).append(text[i + 1])\nprint(pairs)",
        why: "The only memory is the string you typed. The dict cannot contain a character that never followed.",
      }),
    ],
  }),
  trackLesson("llm", "How models work", {
    id: "llm-window",
    title: "Context and citation",
    promise: "You can separate the context window from the chart, and require a quote.",
    keyboard: "A prompt that says “use only the note below” is a hypothesis. The test is whether the output quotes.",
    record: "If the quote is not a substring of the note, the fact is invented. Your Python from the quote lesson is the test.",
    sections: [
      prose("The window is a box", [
        "The context window is how much text the model can consider at once. Retrieval puts the note and the policy excerpt into that box. Anything outside the box does not exist for that call. If you stuff two patients into one box, the model can blend them. One encounter per call in the pilot.",
        "Attention, in plain mechanics, is a weighting: when predicting the next token, the model leans on some earlier tokens more than others. You do not need the matrix. You need the consequence. A policy sentence and a note sentence in the same box can be mixed into a sentence that matches neither. The quote check catches the mix.",
      ]),
      prose("Temperature", [
        "Temperature changes how often the model picks a less likely token. Low is repetitive. High is more varied. Neither setting looks up the chart. A cold model still invents a boring duration. Do not buy a temperature slider as a truth control.",
      ], [codeBlock("python", "def cited(note, fact, quote):\n    if not quote:\n        return False\n    return quote in note and fact != \"\"\n\nnote = \"pain into the left calf\"\nprint(cited(note, \"leg pain\", \"left calf\"))\nprint(cited(note, \"six weeks\", \"\"))")]),
    ],
    example: {
      title: "Worked case: empty quote fails",
      blocks: [
        { type: "p", text: "cited returns false when the quote is empty, even if the fact sounds like the note. A paraphrase without a searchable quote fails this lab on purpose. You can loosen that later with a human. The function stays strict." },
      ],
    },
    exercises: [
      choice(
        "What does a low temperature guarantee?",
        ["The output matches the chart.", "The output is more repetitive. It can still invent.", "A business-associate agreement.", "Payment."],
        "b",
        "Temperature changes variety. Fidelity comes from the note in the box and a quote check, not from the slider.",
        "Do not brief leadership that temperature solved invention."
      ),
      codeEx({
        prompt: "Define cited(note, quote) that returns True only when quote is non-empty and quote in note. Otherwise False.",
        snippets: ["def cited", "quote in note", "return"],
        forbidden: ["six weeks"],
        sample: "def cited(note, quote):\n    if not quote:\n        return False\n    return quote in note\n",
        correction: "def cited(note, quote):\n    if not quote:\n        return False\n    return quote in note",
        why: "Substring is the lab’s definition of a citation. Empty quotes fail.",
      }),
    ],
  }),
  trackLesson("llm", "How models work", {
    id: "llm-tools",
    title: "Messages and tools",
    promise: "You can describe a tool call as a structured request, not as a paragraph the model hopes you obey.",
    keyboard: "A tool call names a function and arguments. Your code runs the function. The model does not run your files by wishing.",
    record: "If the tool is not in the list, it cannot be called. Submit is not in the list.",
    sections: [
      prose("The loop in one picture", [
        "You send messages: a system instruction, then the note. The model either returns text or asks for a tool. Your program runs that tool, appends the result as a new message, and calls the model again. A step counter stops the loop. Three steps is enough for a quote, a gap list, and a stop.",
        "The tool’s arguments are data, like JSON. quote_or_missing with a phrase is checkable. A tool called “make this approvable” with a free-text argument is how the loop starts writing the chart. You will not define that tool.",
      ], [codeBlock("python", "tools = [\"quote_or_missing\", \"list_gaps\"]\ndef allow(name):\n    return name if name in tools else None\nprint(allow(\"list_gaps\"))\nprint(allow(\"submit\"))")]),
    ],
    example: {
      title: "Worked case: submit is not a tool",
      blocks: [
        { type: "p", text: "allow(\"submit\") returns None. The loop has nothing to run. That is the product decision, expressed as membership in a list." },
      ],
    },
    exercises: [
      choice(
        "The model asks to call submit. What does your loop do?",
        ["Call it. The model was confident.", "Refuse. submit is not in the tool list.", "Add submit for this one case.", "Retry until the model stops asking."],
        "b",
        "The list is the permission. Confidence is not a new tool.",
        "You decided the tools before the demo."
      ),
      codeEx({
        prompt: "Define allow(name) that returns the name if it is quote_or_missing or list_gaps, and None otherwise.",
        snippets: ["def allow", "quote_or_missing", "list_gaps", "return none"],
        forbidden: ["submit"],
        sample: "def allow(name):\n    tools = [\"quote_or_missing\", \"list_gaps\"]\n    if name in tools:\n        return name\n    return None\n",
        correction: "def allow(name):\n    tools = [\"quote_or_missing\", \"list_gaps\"]\n    if name in tools:\n        return name\n    return None",
        why: "Membership is the allow-list. submit is absent, so it is refused.",
      }),
    ],
  }),
  trackLesson("llm", "How models work", {
    id: "llm-score",
    title: "Score a draft",
    promise: "You can compute invention count and gap recall on a fictional draft.",
    keyboard: "Invention count is the number of stated facts whose quote is not in the note. Zero is the only passing total.",
    record: "Write the gold gaps before you look at the model’s list. Then compare.",
    sections: [
      prose("Two numbers", [
        "For each fact the draft states, check the quote with cited. Failures add to invention count. For each gold gap you wrote first, check that the draft’s gap list contains it. That fraction is recall. A pretty draft with invention count 1 fails, even if recall is perfect.",
        "Do not add an approval score. You are not simulating a payer. You are counting lies and missed gaps.",
      ], [codeBlock("python", "def invention_count(note, facts):\n    bad = 0\n    for fact, quote in facts:\n        if not quote or quote not in note:\n            bad += 1\n    return bad\n\nnote = \"pain into the left calf\"\nfacts = [(\"leg pain\", \"left calf\"), (\"six weeks\", \"\")]\nprint(invention_count(note, facts))")]),
    ],
    example: {
      title: "Worked case: the count is 1",
      blocks: [
        { type: "p", text: "The calf quote is real. The empty quote on six weeks is an invention. The function returns 1. You keep that case in the set forever." },
      ],
    },
    exercises: [
      choice(
        "Invention count is 1 and gap recall is perfect. Do you ship?",
        ["Yes. Recall is the real metric.", "No. Any invention fails the sample.", "Yes, if temperature was low.", "Yes, after you delete that fact from the log."],
        "b",
        "One invented fact is a failed sample. Recall does not wash it out.",
        "The numbers are not averaged into a smile."
      ),
      codeEx({
        prompt: "Define invention_count(note, facts) where facts is a list of (fact, quote) pairs. Add 1 when the quote is missing or not in the note. Return the count.",
        snippets: ["def invention_count", "for ", "quote not in note", "return"],
        sample: "def invention_count(note, facts):\n    bad = 0\n    for fact, quote in facts:\n        if not quote or quote not in note:\n            bad += 1\n    return bad\n",
        correction: "def invention_count(note, facts):\n    bad = 0\n    for fact, quote in facts:\n        if not quote or quote not in note:\n            bad += 1\n    return bad",
        why: "Each unsupported quote increments the only number that can stop the pilot.",
      }),
    ],
  }),
];

export const trainLessons = [
  trackLesson("train", "Train a small model", {
    id: "tr-weights",
    title: "Weights, not prompts",
    promise: "You can tell a prompt change from a training change.",
    keyboard: "A prompt is text you send at call time. A weight is a number inside the model that training nudges.",
    record: "You will train only on text you type into the lab. Not on APICO notes. Not on a downloaded chart dump.",
    sections: [
      prose("Two different edits", [
        "Changing the instruction is a prompt edit. You can do it in an afternoon and test it on the fictional set. Changing weights is training: the model’s numbers move so that, on the examples you showed it, its next-token guesses get closer to those examples. It will then prefer those patterns on new text too, including patterns you did not mean to teach.",
        "If the examples are authorization letters full of stock phrases, the weights learn the stock phrases. If a phrase was not true in the source note, you have trained a fluent liar. That is why this course trains on toy strings and counts, and stops there.",
      ]),
      prose("What this track will actually run", [
        "You will fit a straight line to a handful of numbers you choose, so loss and a step are visible. Then you will train character counts, a bigram model, on a sentence you type. You will generate from those counts and watch the result ignore anything you did not type. There is no GPU, no hospital dataset, and no fine-tune of a medical model.",
      ]),
    ],
    example: {
      title: "Worked case: the wrong lesson to learn",
      blocks: [
        { type: "p", text: "A vendor offers to fine-tune on “your last thousand approval letters.” Those letters contain stock therapy sentences. The tuned model will emit them more confidently. You decline until someone can show the pairs of note-and-letter where every letter sentence is supported, and a contract that allows the data to be used that way. This lab does not do that project." },
      ],
    },
    exercises: [
      choice(
        "What is training?",
        [
          "Adding the words “be accurate” to a prompt.",
          "Changing the model’s numbers using examples, so future guesses lean toward those examples.",
          "Lowering temperature.",
          "Signing a business-associate agreement.",
        ],
        "b",
        "Training moves weights. A prompt does not. The examples become the model’s habits.",
        "Know which edit you are buying."
      ),
      codeEx({
        prompt: "Write a comment-free Python assignment that sets a weight to 0.0 and a learning rate to 0.1, then print both. This is only numbers, not a chart.",
        snippets: ["weight", "0.0", "rate", "0.1", "print"],
        forbidden: ["patient", "note ="],
        sample: "weight = 0.0\nrate = 0.1\nprint(weight, rate)\n",
        correction: "weight = 0.0\nrate = 0.1\nprint(weight, rate)",
        why: "A weight is a number you will update. Naming it makes the later step readable.",
      }),
    ],
  }),
  trackLesson("train", "Train a small model", {
    id: "tr-line",
    title: "Loss and one step",
    promise: "You can compute error on a toy line and nudge a weight toward the examples.",
    keyboard: "Prediction is weight times x. Loss is the squared difference from y. The step subtracts a fraction of the error.",
    record: "The x and y values are numbers you pick, such as 1, 2, 3. They are not pain scores.",
    sections: [
      prose("Error is a number", [
        "Suppose you predict y as weight * x, starting at weight 0. For x = 2 and y = 4, the prediction is 0, the error is 0 - 4 = -4. Squared error is 16. Loss is that square, a single number that is large when you are wrong and zero when you match.",
        "One training step moves the weight to reduce the error. A simple step is weight = weight + rate * x * (y - prediction). With rate 0.1, x 2, y 4, prediction 0, the new weight is 0.8. Predict again: 1.6. You are closer to 4, not finished. Repeat. That repetition is an epoch over your tiny set.",
      ], [codeBlock("python", "weight = 0.0\nrate = 0.1\nx, y = 2, 4\nprediction = weight * x\nweight = weight + rate * x * (y - prediction)\nprint(weight)\nprint(weight * x)")]),
      prose("What this is not", [
        "This is not a diagnosis. The numbers are not doses, levels, or weeks of therapy. If you cannot explain the update on these integers, you are not ready to talk about fine-tuning a clinical model. Leadership deserves that honesty.",
      ]),
    ],
    example: {
      title: "Worked case: three steps",
      blocks: [
        codeBlock(
          "python",
          "weight = 0.0\nrate = 0.1\nx, y = 2.0, 4.0\nfor _ in range(3):\n    prediction = weight * x\n    weight = weight + rate * x * (y - prediction)\n    print(round(weight, 3), round(weight * x, 3))"
        ),
      ],
    },
    exercises: [
      choice(
        "After the update, what should be true of the prediction on this one point?",
        ["It is guaranteed to equal y in one step.", "It is closer to y than the old prediction, for this simple step, if the rate is small.", "It becomes a CPT code.", "Loss is now a quote."],
        "b",
        "One step with a small rate moves toward the example. It does not finish the job, and it does not create a clinical fact.",
        "Watch the printed prediction fall toward 4, not jump into medicine."
      ),
      codeEx({
        prompt: "Start weight at 0.0 and rate at 0.1. For x = 2 and y = 4, apply one update weight = weight + rate * x * (y - prediction) and print the new weight.",
        snippets: ["weight = 0.0", "rate = 0.1", "prediction", "weight = weight +", "print"],
        forbidden: ["therapy", "icd", "cpt"],
        sample: "weight = 0.0\nrate = 0.1\nx = 2\ny = 4\nprediction = weight * x\nweight = weight + rate * x * (y - prediction)\nprint(weight)\n",
        correction: "weight = 0.0\nrate = 0.1\nx = 2\ny = 4\nprediction = weight * x\nweight = weight + rate * x * (y - prediction)\nprint(weight)",
        why: "The update uses only the toy numbers. The new weight is 0.8 if you started at 0.",
      }),
    ],
  }),
  trackLesson("train", "Train a small model", {
    id: "tr-bigram",
    title: "Train counts, then generate",
    promise: "You can train a next-character model on a sentence you type, generate from it, and see the limit.",
    keyboard: "Training here means filling a dict of counts. Generation means picking the most common follower.",
    record: "Type a harmless sentence. If you paste a note, you have left the lab. The generator can only replay what you typed.",
    sections: [
      prose("Counts are the weights", [
        "For each character, count what came next. That table is the trained model. “Training” took one pass over the string. There is no mystery left. The most common next character is the prediction. Ties can take the first one you stored.",
        "Generate ten characters starting from the first character of your sentence. You will get a stutter of the original, not a new medical fact. If the output surprises you with a word you did not type, you have a bug. Find it. The dict cannot invent a letter that never appeared as a follower.",
      ], [codeBlock("python", "from collections import Counter\n\ndef train(text):\n    counts = {}\n    for i in range(len(text) - 1):\n        counts.setdefault(text[i], Counter())[text[i + 1]] += 1\n    return counts\n\ndef generate(counts, start, n):\n    out = start\n    for _ in range(n):\n        followers = counts.get(out[-1])\n        if not followers:\n            break\n        out += followers.most_common(1)[0][0]\n    return out\n\ntext = \"ababa.\"\nprint(generate(train(text), \"a\", 8))")]),
    ],
    example: {
      title: "Worked case: the model only stutters",
      blocks: [
        { type: "p", text: "On ababa. the follower of a is mostly b. The follower of b is mostly a. Generation oscillates. It never writes the word therapy. That is the entire safety property of a model whose training text did not contain the word." },
      ],
    },
    exercises: [
      choice(
        "You train on the text ababa. Can the generator emit the word weeks?",
        ["Yes, if temperature is high.", "No. Those letters never occur as the trained followers in that string.", "Yes, because models know English.", "Only if you set invented to 0."],
        "b",
        "The generator picks followers from the counts. Letters that never followed cannot be chosen.",
        "This is why training data is the product."
      ),
      codeEx({
        prompt: "Define train(text) that returns a dict of Counters of the next character. Use collections.Counter or a plain dict. Do not read a file.",
        snippets: ["def train", "for ", "range", "return"],
        forbidden: ["open(", "path", "apico"],
        sample: "def train(text):\n    counts = {}\n    for i in range(len(text) - 1):\n        nxt = counts.setdefault(text[i], {})\n        nxt[text[i + 1]] = nxt.get(text[i + 1], 0) + 1\n    return counts\n",
        correction: "def train(text):\n    counts = {}\n    for i in range(len(text) - 1):\n        nxt = counts.setdefault(text[i], {})\n        nxt[text[i + 1]] = nxt.get(text[i + 1], 0) + 1\n    return counts",
        why: "One pass over the argument builds the counts. No file is opened.",
      }),
    ],
  }),
  trackLesson("train", "Train a small model", {
    id: "tr-stop",
    title: "Where training stops",
    promise: "You can say what this company will not train, and what would have to be true before anyone revisits that decision.",
    keyboard: "The lab ends at toy text. A fine-tune proposal needs a written data inventory, a contract, and an eval where invention count is zero.",
    record: "Letters are not labels. A letter that invented therapy is a bad training example even if a payer paid.",
    sections: [
      prose("Paid is not a label", [
        "If you trained on letters that were paid, you would be training on a mixture of true documentation and whatever phrase happened to be in the letter. Payment is not proof the sentence was in the note. The False Claims Act does not relax because a model learned the phrase from last year’s approvals.",
        "Before any real fine-tune, someone writes: which files, under which agreement, whether the vendor may keep them, how quotes were checked, and what the invention count was on a set the vendor did not write. If any line is blank, you do not train. Prompting and tools are still available. They do not bake the habit into weights.",
      ]),
      prose("Your sentence for leadership", [
        "We can train a toy counter today so we understand weights. We will not train on charts or on old letters in this bootcamp. A later project needs counsel, a business-associate agreement that allows the use, and an audit where invented facts are zero.",
      ]),
    ],
    example: {
      title: "Worked case: the proposal you send back",
      blocks: [
        { type: "p", text: "A slide says “fine-tune on denied-then-won appeals.” You ask for the note that corresponded to each winning letter, and for the count of sentences that were not in the note. The slide has neither. The project waits." },
      ],
    },
    exercises: [
      choice(
        "When is a winning appeal a safe training example?",
        [
          "Always. The payer agreed.",
          "Only if every sentence in the letter is supported by the chart, and the use is allowed by contract. This course does not do that training.",
          "When the model is confident.",
          "When the letter is long.",
        ],
        "b",
        "Payment and victory do not certify the text. Support in the chart and a contract are the gates, and they are outside this lab.",
        "Leave the weights alone until those gates exist."
      ),
      codeEx({
        prompt: "Write a function trainable(has_contract, invention_count) that returns False unless has_contract is True and invention_count is 0.",
        snippets: ["def trainable", "invention_count", "return false", "return true"],
        sample: "def trainable(has_contract, invention_count):\n    if has_contract and invention_count == 0:\n        return True\n    return False\n",
        correction: "def trainable(has_contract, invention_count):\n    if has_contract and invention_count == 0:\n        return True\n    return False",
        why: "Both gates must pass. Any invention, or no contract, returns False.",
      }),
    ],
  }),
];

export const agentLessons = [
  trackLesson("agent", "An agent from scratch", {
    id: "ag-loop",
    title: "The loop",
    promise: "You can write a loop that calls at most three steps and then stops.",
    keyboard: "for step in range(3) is the bound. There is no while True.",
    record: "The loop returns a result object. It does not print a letter to a payer.",
    sections: [
      prose("A bound is the product", [
        "An agent is a loop around a model and tools. In this lab the “model” is your own function decide, so you can run the file with no API key and no chart. decide looks at the state and returns the name of the next tool, or the word stop.",
        "range(3) runs the body at most three times. If decide says stop, you return immediately. A while True that continues until the packet “looks complete” is the loop you refused to buy in the domain lessons. Here you can see it not get written.",
      ], [codeBlock("python", "def decide(state):\n    if \"therapy\" in state[\"gaps\"]:\n        return \"stop\"\n    return \"stop\"\n\ndef run(state):\n    trace = []\n    for _ in range(3):\n        action = decide(state)\n        trace.append(action)\n        if action == \"stop\":\n            break\n    return trace\n\nprint(run({\"gaps\": [\"therapy\"]}))")]),
    ],
    example: {
      title: "Worked case: one step, then stop",
      blocks: [
        { type: "p", text: "The gap list already contains therapy. decide returns stop. The trace is [\"stop\"]. Nothing is added to the note dict, because the loop was not given a way to write it." },
      ],
    },
    exercises: [
      choice(
        "Why range(3) instead of while True?",
        ["while True is faster.", "A bounded loop cannot retry until a story appears.", "range cannot call functions.", "Payers require three calls."],
        "b",
        "The bound is the stop. An open loop will keep editing until the text matches a policy shape.",
        "Put the limit in the code, not in a slide."
      ),
      codeEx({
        prompt: "Define run(state) that loops at most 3 times, appends each action to a list, and breaks when the action is stop. Return the list.",
        snippets: ["def run", "range(3)", "stop", "break", "return"],
        forbidden: ["while true"],
        sample: "def run(state):\n    trace = []\n    for _ in range(3):\n        action = \"stop\"\n        trace.append(action)\n        if action == \"stop\":\n            break\n    return trace\n",
        correction: "def run(state):\n    trace = []\n    for _ in range(3):\n        action = \"stop\"\n        trace.append(action)\n        if action == \"stop\":\n            break\n    return trace",
        why: "Three is the maximum. stop leaves the loop. The trace is what a log would keep.",
      }),
    ],
  }),
  trackLesson("agent", "An agent from scratch", {
    id: "ag-quote",
    title: "A quote tool",
    promise: "You can implement the tool that finds a phrase or reports missing.",
    keyboard: "Return a dict, not a sentence. status is found or missing.",
    record: "The tool reads the note string. It does not assign a new note.",
    sections: [
      prose("The smallest useful tool", [
        "quote_tool(note, phrase) returns {\"status\": \"found\", \"quote\": phrase} when phrase and phrase in note. Otherwise {\"status\": \"missing\", \"quote\": \"\"}. Empty phrase is missing. A longer phrase that merely contains the note is not a quote of the note. The phrase must occur inside the note, not the other way around.",
        "Call it on the fictional line “pain into the left calf”. The phrase left calf is found. The phrase six weeks is missing. Print both dicts. If the missing dict’s quote is six weeks, you stored the wish. Store an empty quote.",
      ], [codeBlock("python", "def quote_tool(note, phrase):\n    if phrase and phrase in note:\n        return {\"status\": \"found\", \"quote\": phrase}\n    return {\"status\": \"missing\", \"quote\": \"\"}\n\nnote = \"pain into the left calf\"\nprint(quote_tool(note, \"left calf\"))\nprint(quote_tool(note, \"six weeks\"))")]),
    ],
    example: {
      title: "Worked case: the second call",
      blocks: [
        { type: "p", text: "The second dict is status missing and quote empty. The note variable, if you print it after the calls, is still the original sentence." },
      ],
    },
    exercises: [
      choice(
        "phrase in note is false. What is quote in the result?",
        ["The phrase, so the letter can use it.", "An empty string.", "The whole note.", "None, and the loop invents one."],
        "b",
        "A missing status carries an empty quote. Putting the phrase in the quote field would launder a non-quote into a quote.",
        "The field name quote is a promise. Keep it."
      ),
      codeEx({
        prompt: "Define quote_tool(note, phrase) returning a dict with status and quote, as the lesson specifies.",
        snippets: ["def quote_tool", "phrase in note", "found", "missing", "return"],
        forbidden: ["six weeks of therapy"],
        sample: "def quote_tool(note, phrase):\n    if phrase and phrase in note:\n        return {\"status\": \"found\", \"quote\": phrase}\n    return {\"status\": \"missing\", \"quote\": \"\"}\n",
        correction: "def quote_tool(note, phrase):\n    if phrase and phrase in note:\n        return {\"status\": \"found\", \"quote\": phrase}\n    return {\"status\": \"missing\", \"quote\": \"\"}",
        why: "Found only when the phrase is a substring. Otherwise missing, with an empty quote.",
      }),
    ],
  }),
  trackLesson("agent", "An agent from scratch", {
    id: "ag-gaps",
    title: "A gap tool and a candidate tool",
    promise: "You can list required fields that are missing, and return None when the route is unnamed.",
    keyboard: "gaps(note) takes a dict. family(route) returns None for an empty route.",
    record: "Do not default route to transforaminal. Empty stays empty.",
    sections: [
      prose("Gaps from a dict", [
        "The completeness tool does not read prose yet. It reads the dict you built when you learned dictionaries, because that is the honest interface: someone already extracted fields, or the fields are still missing. For each required key, if the value is missing or absent, append the key.",
        "The candidate tool is separate. family(\"\") returns None. family(\"interlaminar\") returns a label that includes the word interlaminar. It must not return a transforaminal label for an interlaminar route. Contradiction is the useful output.",
      ], [codeBlock("python", "REQUIRED = (\"side\", \"level\", \"route\", \"therapy\")\n\ndef gaps(note):\n    found = []\n    for key in REQUIRED:\n        if note.get(key, \"missing\") in (\"\", \"missing\", None):\n            found.append(key)\n    return found\n\ndef family(route):\n    if route == \"transforaminal\":\n        return \"transforaminal family\"\n    if route == \"interlaminar\":\n        return \"interlaminar family\"\n    return None")]),
    ],
    example: {
      title: "Worked case: A.M. has no route",
      blocks: [
        codeBlock(
          "python",
          "note = {\"side\": \"missing\", \"level\": \"missing\", \"route\": \"\", \"therapy\": \"missing\"}\nprint(gaps(note))\nprint(family(note[\"route\"]))"
        ),
      ],
    },
    exercises: [
      choice(
        "route is an empty string. What does family return?",
        ["transforaminal family", "None", "64483", "interlaminar family"],
        "b",
        "Empty route is not a family. None tells the caller there is no candidate.",
        "Silence from the function is a specified success."
      ),
      codeEx({
        prompt: "Define family(route) for transforaminal and interlaminar, and return None for anything else including an empty string.",
        snippets: ["def family", "transforaminal", "interlaminar", "return none"],
        forbidden: ["64483", "six weeks"],
        sample: "def family(route):\n    if route == \"transforaminal\":\n        return \"transforaminal family\"\n    if route == \"interlaminar\":\n        return \"interlaminar family\"\n    return None\n",
        correction: "def family(route):\n    if route == \"transforaminal\":\n        return \"transforaminal family\"\n    if route == \"interlaminar\":\n        return \"interlaminar family\"\n    return None",
        why: "The route word selects the label. Any other value, including empty, returns None.",
      }),
    ],
  }),
  trackLesson("agent", "An agent from scratch", {
    id: "ag-main",
    title: "One program",
    promise: "You can wire quote, gaps, and family into one function that returns a report and never a send.",
    keyboard: "The report keys are quotes, gaps, family, and sent. sent is always False.",
    record: "Use the fictional J.R. dict. therapy missing means gaps includes therapy. family follows the route that is actually stored.",
    sections: [
      prose("The report is the product", [
        "review(note, phrases) builds a dict. quotes is a list of quote_tool results for each phrase. gaps is the gap list. family is family(note.get(\"route\", \"\")). sent is False, written as a literal, not computed from confidence. There is no branch that sets sent to True.",
        "Run it on {\"side\": \"left\", \"level\": \"L4-L5\", \"route\": \"transforaminal\", \"therapy\": \"missing\"} and the phrases [\"left\", \"six weeks\"]. You should see one found, one missing, a gap of therapy, a transforaminal family, and sent false. If sent is true, delete that line. The human send is not this program.",
      ], [codeBlock("python", "def review(note, phrases):\n    quotes = []\n    for phrase in phrases:\n        if phrase and phrase in note.get(\"text\", \"\"):\n            quotes.append({\"status\": \"found\", \"quote\": phrase})\n        else:\n            quotes.append({\"status\": \"missing\", \"quote\": \"\"})\n    gaps = []\n    for key in (\"side\", \"level\", \"route\", \"therapy\"):\n        if note.get(key, \"missing\") in (\"\", \"missing\", None):\n            gaps.append(key)\n    route = note.get(\"route\") or \"\"\n    if route == \"transforaminal\":\n        fam = \"transforaminal family\"\n    elif route == \"interlaminar\":\n        fam = \"interlaminar family\"\n    else:\n        fam = None\n    return {\"quotes\": quotes, \"gaps\": gaps, \"family\": fam, \"sent\": False}")]),
    ],
    example: {
      title: "Worked case: sent is a constant",
      blocks: [
        { type: "p", text: "Search the function for the word True. It should not appear next to sent. The report can be printed. Printing is not transmitting. The next actor is a person with the report on paper or on a screen." },
      ],
    },
    exercises: [
      choice(
        "Where in review is the packet sent?",
        ["When family is not None.", "Nowhere. sent is False in the returned dict.", "When gaps is empty.", "When a quote is found."],
        "b",
        "An empty gap list means the fields are present, not that a payer was called. sent stays false.",
        "Complete is not the same word as sent."
      ),
      codeEx({
        prompt: "Define review(note) that returns a dict with gaps and sent. sent must be False. gaps includes therapy when that field is missing.",
        snippets: ["def review", "gaps", "therapy", "sent", "false", "return"],
        forbidden: ["sent\": true", "sent\":true", "requests.", "urllib"],
        sample: "def review(note):\n    gaps = []\n    if note.get(\"therapy\", \"missing\") == \"missing\":\n        gaps.append(\"therapy\")\n    return {\"gaps\": gaps, \"sent\": False}\n",
        correction: "def review(note):\n    gaps = []\n    if note.get(\"therapy\", \"missing\") == \"missing\":\n        gaps.append(\"therapy\")\n    return {\"gaps\": gaps, \"sent\": False}",
        why: "The report lists the therapy gap and hard-codes sent to false. Nothing in the function performs a network call.",
      }),
    ],
  }),
];
