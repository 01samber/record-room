export const month3 = {
  id: "models",
  title: "How a model reads",
  summary:
    "Why fluent models invent chart facts, how to prompt them to quote, and how to test them before a pilot.",
  lessons: [
    {
      id: "m3-models",
      week: 9,
      title: "Tokens and invention",
      hours: "4–8 hours",
      promise:
        "You can explain hallucination without magic: the model continues a pattern, including patterns that are not in the chart.",
      margin: [
        {
          label: "At APICO",
          text: "The most dangerous invention is not a weird sentence. It is a boring one: six weeks of therapy, 80 percent relief, a normal exam.",
        },
        {
          label: "On the record",
          text: "You do not need calculus. You need to know what the software is optimizing, which is the next likely word.",
        },
      ],
      weekPlan: [
        "Explain tokens to someone who does not work in software. If they look spellbound, you added mystery. Start again.",
        "Collect three boring sentences a model might add to a pain letter.",
        "Submit both exercises.",
        "Keep those three sentences as test traps for month three’s lab.",
      ],
      sections: [
        {
          heading: "A model is a continuation engine",
          blocks: [
            {
              type: "p",
              text: "A language model is trained to predict the next piece of text. Those pieces are tokens, roughly chunks of words. It has seen so many documents that its guesses are often useful: it can outline, translate, and follow a format. The guess is still a guess about what usually comes next, not a lookup in APICO’s chart, unless you have built a lookup and forced the model to use it.",
            },
            {
              type: "p",
              text: "The context window is the amount of text the model can consider at once. A long PDF that “does not fit” is silently truncated by a careless product. The model then answers from the part it saw, plus its habits. If the imaging report was the part cut off, the letter may still describe an MRI, because letters like that usually do. Ask every vendor what happens to a note that exceeds the window. “We support long context” is not an answer. You want the behavior when the limit is hit: refuse, or summarize with a warning, never invent the missing pages.",
            },
          ],
        },
        {
          heading: "Why invention looks like competence",
          blocks: [
            {
              type: "p",
              text: "Prior-authorization letters on the public internet share a shape. Models have absorbed that shape. When your note is missing a piece of the shape, the model supplies the piece that usually sits there. That is why the fake facts are the plausible ones. A bizarre error is easy to catch. “Patient failed six weeks of conservative care including NSAIDs and physical therapy” is how real letters sound, so staff stop seeing it as a claim that needs a source.",
            },
            {
              type: "p",
              text: "Temperature and similar settings change how adventurous the next-token choice is. Lower is more repetitive, higher is more varied. Neither setting is a truth dial. A cold model still invents a boring fact. A hot model invents a colorful one. Truth comes from the design around the model: retrieve the note, require quotes, refuse when the quote is absent, and let a person send.",
            },
          ],
        },
        {
          heading: "Retrieval, in plain language",
          blocks: [
            {
              type: "p",
              text: "Retrieval-augmented generation means the system searches a set of documents you trust and puts the relevant passages into the prompt. For this company the trusted set is small: this patient’s note, this plan’s policy for this code family, and the code book entry your license allows the tool to show. The model is instructed to answer only from those passages and to say “not in the record” otherwise.",
            },
            {
              type: "p",
              text: "Retrieval fails in ordinary ways. It fetches another patient’s note because the member ID was wrong. It fetches a superseded policy. It fetches a similar sentence and the model blends two patients. The fix is not a smarter adjective in the prompt. The fix is an identifier check a human can see: name, date of birth, and date of service displayed next to the draft, and a block when they do not match the appointment.",
            },
          ],
        },
      ],
      example: {
        title: "Worked case: the shape that ate the chart",
        blocks: [
          {
            type: "p",
            text: "You give a model only this fictional line: “Left leg pain. MRI disc L4–L5. Plan injection.” You ask for a prior-authorization letter. The letter returns with a pain score, a duration of therapy, a list of medications, and “80 percent expected relief.” None of those were in the line. The model completed the shape.",
          },
          {
            type: "p",
            text: "The evaluation of that product is now easy. Count invented facts. This draft has several. It fails, regardless of how professional it sounds.",
          },
        ],
      },
      exercises: [
        {
          id: "e1",
          kind: "choice",
          prompt: "Why do invented chart facts often sound boring and plausible?",
          options: [
            { id: "a", text: "Because the model looked them up in Medicare’s database." },
            { id: "b", text: "Because it continues patterns that are common in letters of that type, even when this chart does not contain them." },
            { id: "c", text: "Because a low temperature setting forces it to tell the truth." },
            { id: "d", text: "Because HIPAA allows likely facts to be inferred for payment." },
          ],
          answer: "b",
          why: "Plausibility is the training signal. It is not evidence about this patient.",
          correction:
            "The model continues common patterns. Authorization letters often mention therapy duration, pain scores, and percent relief, so a thin note still produces those sentences. That is not a lookup, not a temperature trick, and not something HIPAA permits.",
        },
        {
          id: "e2",
          kind: "text",
          prompt:
            "What should the product do when the note does not contain a fact the letter usually includes? Describe the behavior you will require from a vendor.",
          placeholder: "Say what the draft should show instead of a filled-in fact.",
          min: 70,
          requiredGroups: [
            ["not in", "missing", "absent", "gap", "refuse", "omit", "leave blank", "do not invent", "dont invent", "must not"],
            ["invent", "fabricat", "make up", "guess", "fill"],
          ],
          why: "You are specifying a failure mode, which is the real product requirement.",
          correction:
            "The product should omit the fact and show a gap, in words like “not in the note.” It should refuse to complete the usual letter shape by inventing therapy, scores, or relief. A human can go get the fact if it exists. The model cannot supply it.",
        },
      ],
    },
    {
      id: "m3-prompts",
      week: 10,
      title: "Prompts that quote",
      hours: "4–8 hours",
      promise:
        "You can write an instruction that names the source, the output shape, and the refusal.",
      margin: [
        {
          label: "At APICO",
          text: "A prompt is an operations policy written in a text box. If it is vague, the model will be confident. Confidence was not what you ordered.",
        },
        {
          label: "On the record",
          text: "Quote means the actual words, short enough to find with Ctrl+F in the note.",
        },
      ],
      weekPlan: [
        "Rewrite the worked prompt in your own words, then compare.",
        "Delete one sentence from your draft and see which failure returns. Put the sentence back.",
        "Submit both exercises.",
        "Save the prompt in a local text file with today’s date. You will revise it in month four.",
      ],
      sections: [
        {
          heading: "Four parts, and no pep talk",
          blocks: [
            {
              type: "p",
              text: "A prompt that works for this company has four parts. Role: you prepare drafts for a human coder; you do not submit. Sources: use only the note and the policy text pasted below; ignore your memory of typical packets. Shape: a list of facts, each with a quote, then a list of missing items the policy names and the note does not. Refusal: if a field has no quote, write “not in the note” and stop. Do not add clinical advice.",
            },
            {
              type: "p",
              text: "Leave out cheerleading. “You are a world-class prior-authorization expert who always gets approval” is an instruction to optimize the yes. It fights the refusal you just wrote. Tone words do not create accuracy. Boundaries do.",
            },
          ],
        },
        {
          heading: "The quote is the control",
          blocks: [
            {
              type: "p",
              text: "Require the quote beside every fact. “Radiculopathy — quote: ‘pain into the left calf.’” A reviewer can search the note for that phrase in seconds. A fact with no quote is deleted, not “probably fine.” This single rule catches more invention than a paragraph of ethical language.",
            },
            {
              type: "p",
              text: "Also forbid certain moves by name. Do not infer a spinal level that the note does not name. Do not convert “feels better” into a percent. Do not change an interlaminar plan into a transforaminal code family. Do not recommend modifier 59. Named bans are easier to test than a general request to be careful.",
            },
          ],
        },
        {
          heading: "What the human still does",
          blocks: [
            {
              type: "p",
              text: "The prompt does not make the output true. A person checks the quotes, checks that the policy attached is the current one, and checks that the patient on the draft is the patient on the schedule. Only then may anyone paste a sentence into a payer portal. The portal step stays manual in the pilot. Automation of the click is a later decision, made after the invention rate has been measured at zero on a sample.",
            },
          ],
        },
      ],
      example: {
        title: "Worked case: a prompt you may copy and then shorten",
        blocks: [
          {
            type: "p",
            text: "“You prepare a checklist for a human. Use only the note and the policy in this message. For each fact, give a short quote from the note. If the policy asks for a fact the note lacks, list it under Missing. Do not invent duration, pain scores, percent relief, medications, or exam findings. Do not tell the clinician which procedure to perform. Do not write a letter to the payer. If you cannot quote it, it is missing.”",
          },
          {
            type: "p",
            text: "That prompt will still fail sometimes. Your test set exists to catch the failures. The prompt is the hypothesis. The test is the evidence.",
          },
        ],
      },
      exercises: [
        {
          id: "e1",
          kind: "choice",
          prompt: "Which instruction belongs in a MedOpsHQ prompt for APICO packets?",
          options: [
            { id: "a", text: "You are an expert who wins approvals. Make the letter as strong as possible." },
            { id: "b", text: "Use only the note and the policy provided. Quote the note. If you cannot quote a fact, mark it missing. Do not write the payer letter yourself." },
            { id: "c", text: "When therapy duration is absent, assume six weeks, because that is the usual requirement." },
            { id: "d", text: "Choose the CPT code with the highest allowed amount that the policy mentions." },
          ],
          answer: "b",
          why: "The prompt should shrink the model’s freedom, not congratulate it.",
          correction:
            "Tell the model to use only the provided note and policy, to quote, to mark gaps, and to leave the letter and the code choice to a human. Do not instruct it to win, to assume six weeks, or to maximize payment.",
        },
        {
          id: "e2",
          kind: "text",
          prompt:
            "Write the refusal sentence you would put in your own prompt. It should ban invented facts and require a quote or a missing-item mark.",
          placeholder: "The sentence you will actually paste into the instruction.",
          min: 60,
          requiredGroups: [
            ["quote", "citation", "cite"],
            ["missing", "not in the note", "not in the record", "gap"],
            ["invent", "do not add", "dont add", "do not make", "never add", "must not"],
          ],
          why: "This sentence is the one you will test the vendor against.",
          correction:
            "A usable refusal sounds like this: if you cannot quote the note, mark the item missing, and do not invent duration, scores, relief, medications, or findings. The exact wording can be yours. The quote, the gap, and the ban on invention all have to be in it.",
        },
      ],
    },
    {
      id: "m3-evals",
      week: 11,
      title: "Test before you trust",
      hours: "4–8 hours",
      promise:
        "You can design a small test set and read an invention count without being dazzled by a demo.",
      margin: [
        {
          label: "At APICO",
          text: "A demo on one perfect note is a sales call. A test on twenty flawed notes is an operations decision.",
        },
        {
          label: "On the record",
          text: "Gold means the answers were written by a person from the note, before the model ran.",
        },
      ],
      weekPlan: [
        "Build five fictional micro-notes on paper, each missing a different fact.",
        "Write the gold missing-item list before you show the note to any assistant.",
        "Submit both exercises.",
        "If you have a sanctioned tool, run one note. Score invention. Do not use a real chart.",
      ],
      sections: [
        {
          heading: "What an evaluation is",
          blocks: [
            {
              type: "p",
              text: "An evaluation is a fixed set of inputs with answers you wrote down first. For this pilot, each case is a fictional note, a fictional policy excerpt, and a gold list: facts that are present, facts that are missing, and code families that are out of bounds. You run the agent. You compare. You keep the set and run it again after every prompt change, or you will “improve” the prompt while breaking last week’s cases.",
            },
            {
              type: "p",
              text: "Score three numbers. Citation accuracy: of the facts the agent stated, how many quotes actually appear in the note. Invention count: how many stated facts have no quote. Gap recall: of the items you marked missing in the gold list, how many did the agent also mark missing. A pretty letter with an invention count above zero fails. Do not average that failure away against a high approval-style score. There is no approval score in the lab.",
            },
          ],
        },
        {
          heading: "Traps worth planting",
          blocks: [
            {
              type: "ul",
              items: [
                "A note with radicular pain and no imaging date.",
                "A note that says interlaminar, beside a policy someone mis-labeled as transforaminal.",
                "A note that says “felt better” after a block, with a policy that wants a percent.",
                "Two patients in one file, to see if names bleed together.",
                "A copied normal exam that does not match today’s procedure.",
              ],
            },
            {
              type: "p",
              text: "Have a coder and a clinician review the gold lists. You are testing the agent, and you are also testing whether your team agrees on what the note says. Disagreement among humans is a finding. It means the packet rule is not ready to be automated.",
            },
          ],
        },
        {
          heading: "Demos you should interrupt",
          blocks: [
            {
              type: "p",
              text: "Interrupt a vendor demo when they use their own note, when they will not show a miss, when the tool cannot display a quote, or when success is defined as “the payer would like this.” Ask to paste one of your trap notes. Ask what the tool does with a second patient identifier that does not match. Ask for the log: the prompt, the passages retrieved, the output, the person who accepted it. A vendor who cannot show a log cannot be in a HIPAA operations path.",
            },
          ],
        },
      ],
      example: {
        title: "Worked case: a five-row scorecard",
        blocks: [
          {
            type: "p",
            text: "You run five fictional notes. The agent returns five fluent checklists. In four, every fact has a true quote and the gold gaps are present. In one, it adds “NSAID trial.” Invention count for the set is 1. You do not ship. You add the ban on medications to the prompt, rerun all five, and you keep the case that failed in the set forever.",
          },
        ],
      },
      exercises: [
        {
          id: "e1",
          kind: "choice",
          prompt: "A vendor’s demo letter looks perfect on a note the vendor brought. What do you do with that result?",
          options: [
            { id: "a", text: "Buy it. Fluency on a demo is evidence the invention problem is solved." },
            { id: "b", text: "Treat it as a sales sample. Decide from your own trap notes, scored on citation, invention, and missing-item recall." },
            { id: "c", text: "Ask the vendor to raise the temperature until the letter sounds more human." },
            { id: "d", text: "Measure only whether a fictional payer would approve the demo letter." },
          ],
          answer: "b",
          why: "You cannot audit a test you did not write.",
          correction:
            "A vendor demo is not an evaluation. Score your own notes for true quotes, invented facts, and gaps the agent should have caught. Approval theater is not a metric.",
        },
        {
          id: "e2",
          kind: "text",
          prompt:
            "Define invention count in your own words, and say what value is acceptable on a pilot sample before anyone uses the tool on a real authorization.",
          placeholder: "What you count, and what number lets the pilot proceed.",
          min: 60,
          requiredGroups: [
            ["invent", "not in", "no quote", "unsupported", "absent"],
            ["zero", "0", "none", "no invented"],
          ],
          why: "The acceptable number is the management decision.",
          correction:
            "Invention count is the number of facts in the draft that the note does not contain, or that have no real quote. The acceptable number on a sample before real authorization work is zero. One plausible sentence is enough to keep the tool in the lab.",
        },
      ],
    },
    {
      id: "m3-lab",
      week: 12,
      title: "Lab: the lumbar case",
      hours: "4–8 hours",
      promise:
        "You can extract only what is written and name the gaps a lumbar packet still has.",
      margin: [
        {
          label: "At APICO",
          text: "Do this lab with the note below, not with a chart from Bear, Milford, or Lewes.",
        },
        {
          label: "On the record",
          text: "The policy excerpt is also fiction, written short so you can practice the comparison.",
        },
      ],
      weekPlan: [
        "Cover the worked case and mark the note yourself.",
        "Draft your answer in the IDE as a text file, then type it here.",
        "Submit both exercises.",
        "If you were wrong, redo the lab the next day without looking.",
      ],
      sections: [
        {
          heading: "The note",
          blocks: [
            {
              type: "p",
              text: "Fictional note, J.R., visit dated for this exercise only. “58-year-old with pain from the low back into the left calf for four months. Numbness in the left foot. No weakness described. MRI dated March 2 of this year: left paracentral disc herniation at L4–L5 contacting the left L5 nerve root. Physical therapy started in January and is ongoing. Takes ibuprofen some days. Exam today reproduces left leg pain with a straight-leg raise. Assessment: lumbar radiculopathy. Plan: left L4–L5 transforaminal epidural steroid injection. Patient asks how soon it can be scheduled.”",
            },
          ],
        },
        {
          heading: "The fictional policy excerpt",
          blocks: [
            {
              type: "p",
              text: "“For a lumbar transforaminal epidural, the record must show radicular pain, the level and side, imaging that correlates, and at least six weeks of conservative care including therapy, with dates. A pain score is not required by this excerpt. Sedation is not part of this request.” This excerpt was written for the lab. It is not a Novitas LCD. The skill is the comparison, not the pretend policy.",
            },
          ],
        },
        {
          heading: "How to work",
          blocks: [
            {
              type: "p",
              text: "Make two lists. Present: each item with a quote you could search. Missing: each policy item the note does not meet. Then stop. Do not write the letter. Do not decide the injection is a good idea. Do not “round up” January-to-today into six weeks unless the note gives the dates that prove it. The note does not give an end, and it does not count the weeks.",
            },
          ],
        },
      ],
      example: {
        title: "Worked case: one present, one missing",
        blocks: [
          {
            type: "p",
            text: "Present: side and level. Quote: “left L4–L5 transforaminal” and “pain from the low back into the left calf.” Imaging correlates. Quote: “disc herniation at L4–L5 contacting the left L5 nerve root,” dated March 2.",
          },
          {
            type: "p",
            text: "Missing against this fictional policy: proof of at least six weeks of therapy. The note says therapy started in January and is ongoing. It does not count six weeks or give a completion date. You do not do the arithmetic in the model’s favor. A human can look at a calendar with the therapist’s notes. The agent cannot declare the requirement met.",
          },
        ],
      },
      exercises: [
        {
          id: "e1",
          kind: "choice",
          prompt:
            "Against the fictional policy in this lesson, which item is still missing from J.R.’s note?",
          options: [
            { id: "a", text: "The side of the leg pain." },
            { id: "b", text: "Proof that conservative therapy lasted at least six weeks. A January start does not state that duration." },
            { id: "c", text: "Any mention of imaging." },
            { id: "d", text: "The procedure the clinician planned." },
          ],
          answer: "b",
          why: "The other three are written in the note. Duration is only implied, and implication is not a quote.",
          correction:
            "Side, imaging, and the planned left L4–L5 transforaminal injection are in the note. Six weeks of therapy is not stated. “Started in January and ongoing” is a gap against a policy that demands a duration, until a person verifies the dates from a real therapy record.",
        },
        {
          id: "e2",
          kind: "text",
          prompt:
            "Write two quotes from J.R.’s note that a packet may use, and state the therapy-duration gap without closing it. Do not add a pain score.",
          placeholder: "Quotes in quotation marks, then the gap.",
          min: 70,
          requiredGroups: [
            ["l4", "l5", "calf", "left", "mri", "transforaminal", "straight"],
            ["six", "6", "duration", "weeks", "january"],
            ["not", "missing", "does not", "doesnt", "gap", "without"],
          ],
          forbiddenGroups: [["pain score", "8/10", "8 out of 10", "vas"]],
          why: "This is the lab skill the rest of the pilot stands on.",
          correction:
            "Usable quotes include “pain from the low back into the left calf,” “left paracentral disc herniation at L4–L5,” and “left L4–L5 transforaminal epidural steroid injection.” The gap: therapy started in January and is ongoing, which does not document six weeks. Do not add a pain score the note does not contain.",
        },
      ],
    },
  ],
};
