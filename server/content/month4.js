export const month4 = {
  id: "agents",
  title: "Agents with one job",
  summary:
    "A loop with tools and a stop, then three agents: eligibility, completeness, and code candidates.",
  lessons: [
    {
      id: "m4-loops",
      week: 13,
      title: "A loop with a stop",
      hours: "4–8 hours",
      promise:
        "You can draw an agent as tools, a model, a memory of this task only, and a human stop.",
      margin: [
        {
          label: "At APICO",
          text: "One agent that “handles approvals” will wander. Three agents with one question each can be supervised.",
        },
        {
          label: "On the record",
          text: "MedOps’s public tools already split this way: eligibility, scribe, workflow. Follow that grain.",
        },
      ],
      weekPlan: [
        "Draw the loop on paper: input, tool, draft, check, stop.",
        "Name the tool you will not give the pilot agent: the submit button.",
        "Submit both exercises.",
        "Describe the loop to a nontechnical teammate in under two minutes.",
      ],
      sections: [
        {
          heading: "The word agent, nailed down",
          blocks: [
            {
              type: "p",
              text: "An agent is a model in a loop. It receives a task, may call a tool, reads the tool’s result, and either finishes or calls another tool. The loop needs a stop or it will keep “improving” a packet until the packet says what the policy wanted. Your stop is a maximum number of steps plus a human gate. Three tool calls and then a draft is plenty for a pilot. Endless retry until a code matches a coverage list is the failure mode.",
            },
            {
              type: "p",
              text: "Tools are ordinary functions: check eligibility, fetch the policy paragraph, search this note for a level, open the code family’s paraphrase from your licensed source. The model chooses among the tools you offered. It cannot choose a tool you did not offer. So do not offer submit, do not offer “edit the medical record,” and do not offer “search the whole practice” when the task is one appointment.",
            },
          ],
        },
        {
          heading: "Memory is how patients get mixed",
          blocks: [
            {
              type: "p",
              text: "Memory across patients is a defect in this design. The agent may remember the steps of this task: eligibility already checked, policy paragraph already fetched. It may not remember that “people like this usually had six weeks of therapy.” That is not memory. That is contamination. When the appointment closes, the working set closes. Logs remain for audit, stored as the agreement requires, not as a scrapbook the next patient’s prompt can see.",
            },
          ],
        },
        {
          heading: "One job",
          blocks: [
            {
              type: "p",
              text: "Give each agent one question. The eligibility agent asks: is this coverage active, and what cost-share and authorization flag did the payer return? The completeness agent asks: which required fields have quotes, and which are missing? The code-candidate agent asks: which code families are consistent with the words in the note, and which families are contradicted? None of them asks: how do we get a yes?",
            },
            {
              type: "p",
              text: "A workflow agent, the kind MedOps describes publicly, can move the task from one queue to another: front desk, coder, clinician, ready for a human to submit. Moving a task is not submitting it. Keep those verbs apart in the software’s button labels. The button that sends to a payer should not sit on the agent’s screen.",
            },
          ],
        },
      ],
      example: {
        title: "Worked case: the loop you will not buy",
        blocks: [
          {
            type: "p",
            text: "A vendor shows an agent that “retries the packet against the policy until it passes.” On the third try it has added a duration and changed the route of the injection. The demo calls this planning. It is an automated false record.",
          },
          {
            type: "p",
            text: "Your loop ends on the first missing required fact. The next actor is a person who either obtains the fact or changes the plan of care. The agent does not get another try at the wording.",
          },
        ],
      },
      exercises: [
        {
          id: "e1",
          kind: "choice",
          prompt: "Which tool list is appropriate for a first APICO pilot agent?",
          options: [
            { id: "a", text: "Eligibility lookup, policy fetch, quote-from-this-note, and a submit-to-payer tool so the loop can finish." },
            { id: "b", text: "Eligibility lookup, policy fetch, and quote-from-this-note. No tool that edits the record or sends anything to a payer." },
            { id: "c", text: "A single tool called “get approval,” with no logs." },
            { id: "d", text: "Full access to every patient’s chart, so the model can find similar cases and reuse them." },
          ],
          answer: "b",
          why: "Tools you do not give cannot be misused. Similar-patient memory is contamination.",
          correction:
            "Offer lookup and quoting tools only. Do not offer submit, do not offer record edits, and do not let the agent wander other patients’ charts for a more convenient story.",
        },
        {
          id: "e2",
          kind: "text",
          prompt:
            "What is the stop rule for your loop, and why is “retry until the policy is satisfied” unacceptable?",
          placeholder: "When the loop ends, and what it must not do on a second pass.",
          min: 70,
          requiredGroups: [
            ["human", "person", "coder", "stop", "missing"],
            ["retry", "until", "invent", "add", "satisfied", "passes"],
          ],
          why: "The stop rule is the product.",
          correction:
            "The loop stops when a required fact is missing, or after a small fixed number of lookups, and a human takes the next step. Retrying until the policy looks satisfied pushes the model to add facts. That is the behavior you are refusing to buy.",
        },
      ],
    },
    {
      id: "m4-eligibility",
      week: 14,
      title: "The eligibility agent",
      hours: "4–8 hours",
      promise:
        "You can list what an eligibility response does and does not prove about a lumbar injection.",
      margin: [
        {
          label: "At APICO",
          text: "The public MedOps eligibility pattern is the right shape: trigger at scheduling or check-in, return copay, deductible, and limits, write them where staff already look, flag inactive coverage before the visit.",
        },
        {
          label: "On the record",
          text: "Active coverage is not authorization, and authorization is not payment.",
        },
      ],
      weekPlan: [
        "Write the five fields you want on the front-desk screen.",
        "Write the sentence the screen shows when the payer did not answer.",
        "Submit both exercises.",
        "Ask which clearinghouse or payer connection you actually have. The agent cannot check a payer it cannot reach.",
      ],
      sections: [
        {
          heading: "What real-time eligibility is",
          blocks: [
            {
              type: "p",
              text: "An eligibility transaction asks a payer, or a clearinghouse in front of the payer, whether this member has active coverage on a date, and returns benefit details the payer is willing to send: copay, deductible remaining, out-of-pocket status, and sometimes a hint about prior authorization. MedOps’s public RTE description follows that shape and emphasizes writing the result into the electronic record so staff do not retype it from a portal.",
            },
            {
              type: "p",
              text: "The response is only as good as the identifiers you send and the date you ask about. A plan that is active today can be inactive on the day of the procedure. A response for the medical benefit may say nothing useful about a specific CPT family. Some payers answer “authorization may be required” as a generic flag. Treat flags as leads. Confirm the plan’s rule for the procedure you will actually schedule.",
            },
          ],
        },
        {
          heading: "What the agent must show the front desk",
          blocks: [
            {
              type: "ul",
              items: [
                "Who was checked: the name and member ID that were sent, so a mismatch is visible.",
                "The date the question was about, and the time the answer came back.",
                "Active or inactive, in those words, plus the plan name the payer returned.",
                "Copay, deductible, and any authorization flag, each labeled as payer-returned, not as the agent’s opinion.",
                "If the payer did not answer, a clear failure. Silence is not “probably active.”",
              ],
            },
            {
              type: "p",
              text: "Do not let the model summarize an eligibility file into a cheerful paragraph. Summaries drop the date and invent a prior-authorization status the file never stated. Show the fields. A one-line translation is allowed only if the raw fields remain beside it.",
            },
          ],
        },
        {
          heading: "Where this agent ends",
          blocks: [
            {
              type: "p",
              text: "It ends at the benefit facts. It does not look at the MRI. It does not pick 64483. It does not tell the patient they are approved. A staff member may tell the patient what the payer returned about cost-share, in the practice’s usual way. The agent does not message the patient on its own in the pilot.",
            },
          ],
        },
      ],
      example: {
        title: "Worked case: inactive, stated plainly",
        blocks: [
          {
            type: "p",
            text: "The transaction for fictional member J.R. returns inactive as of the first of the month, with no copay fields. A weak agent writes, “Coverage issues are minor and the injection can proceed.” The record-room agent writes: inactive on this date; do not schedule the procedure against this plan; ask the patient for current coverage. No clinical content is added, because this agent does not have the note.",
          },
        ],
      },
      exercises: [
        {
          id: "e1",
          kind: "choice",
          prompt: "An eligibility response says the plan is active and shows a copay. What do you now know about the lumbar injection?",
          options: [
            { id: "a", text: "The injection is authorized and will be paid." },
            { id: "b", text: "The plan answered that coverage is active and stated a copay. You still have to check authorization rules and the chart." },
            { id: "c", text: "The diagnosis code should be whatever the payer pays most often for active members." },
            { id: "d", text: "The front desk can tell the patient the procedure is approved." },
          ],
          answer: "b",
          why: "Eligibility is a payer snapshot about coverage, not a clinical or payment decision.",
          correction:
            "You know the payer reported active coverage and a copay for the question you asked. You do not know that this injection is authorized, documented, or payable. Nobody tells the patient it is approved on the strength of a copay field.",
        },
        {
          id: "e2",
          kind: "text",
          prompt:
            "The payer does not respond before check-in. What should the screen say, and what must staff avoid assuming?",
          placeholder: "The words on the screen, and the assumption you refuse.",
          min: 60,
          requiredGroups: [
            ["no response", "did not respond", "didnt respond", "not respond", "no answer", "unavailable", "failed", "timed out", "timeout"],
            ["do not assume", "dont assume", "cannot assume", "must not", "never assume", "do not treat", "dont treat"],
            ["active", "approved", "covered"],
          ],
          why: "Failure has to look like failure.",
          correction:
            "The screen should say the payer did not respond, and show the time of the attempt. Staff must not assume the plan is active, covered, or approved. They retry or follow the practice’s manual check, and they do not invent a copay.",
        },
      ],
    },
    {
      id: "m4-completeness",
      week: 15,
      title: "The completeness agent",
      hours: "4–8 hours",
      promise:
        "You can specify an agent whose only output is a gap list tied to a named policy line.",
      margin: [
        {
          label: "At APICO",
          text: "This is the agent that protects the clinician’s time. It asks for the missing date before anyone writes a letter.",
        },
        {
          label: "On the record",
          text: "Every gap names the policy line and the search that failed. “Looks incomplete” is not an output.",
        },
      ],
      weekPlan: [
        "Turn the eight marks from the note-reading lesson into fields.",
        "Write a pass and a fail for one field.",
        "Submit both exercises.",
        "Decide who closes a gap: front desk, clinician, or therapist’s record. Put a role next to each field.",
      ],
      sections: [
        {
          heading: "Output that fits on one screen",
          blocks: [
            {
              type: "p",
              text: "The completeness agent takes two inputs: the note for this encounter, and the policy excerpt a person selected for this procedure family. It returns a table. Each row is a required item, a quote or the words “not in the note,” and the policy phrase that demanded the item. Rows with quotes are present. Rows without quotes are gaps. There is no third state called “implied.”",
            },
            {
              type: "p",
              text: "The agent does not rank gaps by how likely they are to cause a denial, if that ranking tempts staff to invent the high-ranking ones first and ignore truth. It lists them. A person decides which gap can be closed from another document already in the chart, such as a therapy note, and which gap means the procedure should not be requested.",
            },
          ],
        },
        {
          heading: "Closing a gap is a human act",
          blocks: [
            {
              type: "p",
              text: "If physical therapy happened, the date is in a therapy note, a referral, or the patient’s account, and someone brings that sentence into the record through the practice’s normal documentation. The agent may point at a document that is already in the chart and quote it. It may not interview the patient and write the answer into the legal record. It may not accept a hallway comment as if it were signed.",
            },
            {
              type: "p",
              text: "When the gap is clinical — the level was never chosen, the exam does not match the plan — the row is assigned to the clinician. MedOpsHQ does not fill clinical gaps. This is the boundary that keeps an operations company from practicing medicine.",
            },
          ],
        },
        {
          heading: "A scribe is not this agent",
          blocks: [
            {
              type: "p",
              text: "MedOps’s public scribe drafts a SOAP note and proposes codes. That is useful and it is a different risk. A completeness agent should run after a clinician has signed the note, not instead of the note. If you let the scribe and the completeness agent be the same unconstrained writer, it will satisfy its own checklist. Split them. The scribe drafts under the clinician’s review. The completeness agent only reads the signed note.",
            },
          ],
        },
      ],
      example: {
        title: "Worked case: three rows",
        blocks: [
          {
            type: "p",
            text: "Policy excerpt, fictional: side, level, imaging correlation, six weeks of therapy. Note: J.R. as in the lab. Rows: side, quote present; level, quote present; imaging, quote present; therapy duration, not in the note, policy line quoted. The task status becomes “waiting on therapy dates,” assigned to staff who can retrieve the therapy record. No letter is generated.",
          },
        ],
      },
      exercises: [
        {
          id: "e1",
          kind: "choice",
          prompt: "The completeness agent cannot find six weeks of therapy in the signed note. What is a proper output?",
          options: [
            { id: "a", text: "A row: requirement, “not in the note,” policy line, assigned to a person. No letter." },
            { id: "b", text: "A completed letter that states six weeks, so the clinician only has to sign." },
            { id: "c", text: "An automatic edit that inserts “six weeks of physical therapy” into the note." },
            { id: "d", text: "A suggestion to switch the diagnosis so a different policy, with no duration rule, applies." },
          ],
          answer: "a",
          why: "The product is the gap, assigned to a person.",
          correction:
            "Output a gap row that quotes the policy line and says the duration is not in the note. Assign it to a person. Do not write the letter, edit the note, or shop for a looser policy.",
        },
        {
          id: "e2",
          kind: "text",
          prompt:
            "Why should the completeness agent read the signed note rather than help the scribe satisfy the checklist while the note is being written?",
          placeholder: "What goes wrong if the writer and the checker are the same loop?",
          min: 70,
          requiredGroups: [
            ["sign", "signed", "clinician"],
            ["invent", "satisfy", "fill", "write in", "insert", "checklist"],
          ],
          why: "Separation of drafting and checking is an internal control.",
          correction:
            "If the same loop writes the note and grades it against the policy, it will fill gaps to pass its own checklist. The completeness agent should run on the note the clinician has signed, and it should only report quotes and gaps. Closing a gap is a new human act, not a second draft by the model.",
        },
      ],
    },
    {
      id: "m4-codes",
      week: 16,
      title: "The code-candidate agent",
      hours: "4–8 hours",
      promise:
        "You can let an agent propose code families that the words support, and block families the words contradict.",
      margin: [
        {
          label: "At APICO",
          text: "Candidates are not a claim. A coder accepts a code from the licensed source. The physician remains responsible for the service that was ordered.",
        },
        {
          label: "On the record",
          text: "Contradictions matter more than suggestions. “The note says interlaminar, so do not propose transforaminal” is the valuable sentence.",
        },
      ],
      weekPlan: [
        "List three contradictions the agent must be able to say out loud.",
        "Practice on A.M. and J.R. without looking at earlier answers.",
        "Submit both exercises.",
        "Ask your coder which encoder is licensed. The agent may point at it. It may not replace it.",
      ],
      sections: [
        {
          heading: "Candidates, contradictions, and silence",
          blocks: [
            {
              type: "p",
              text: "The code-candidate agent reads the signed plan and the findings. It may say: the plan uses the words left L4–L5 transforaminal epidural, which is in the 64483 family for a single lumbar level, if the year’s book still places it there. Confirm in the encoder. It may say: imaging guidance appears included in that family; do not add a fluoroscopy code unless a coder shows an edit that allows it. It must say, when true: the note says interlaminar, so a transforaminal family contradicts the plan.",
            },
            {
              type: "p",
              text: "It stays quiet rather than guess. If no procedure is named, the output is “no procedure named; no candidate.” That silence is a successful run. A list of popular pain codes is a failed run.",
            },
          ],
        },
        {
          heading: "Diagnosis candidates follow the same rule",
          blocks: [
            {
              type: "p",
              text: "“Lumbar radiculopathy” in the assessment supports a lumbar radiculopathy code such as the M54.16 family, confirmed in the current ICD-10-CM. “Low back pain” without more supports a low-back-pain code, not a radiculopathy code. G89 is proposed only when the guidelines’ conditions are met and the note describes that kind of pain, not because a pain clinic “always adds G89.” The agent shows the guideline sentence it is applying. A coder decides sequence.",
            },
            {
              type: "p",
              text: "Never propose a diagnosis because it appears in a coverage article. The article is a filter a human applies after the true codes are on the table. If the true code is absent from the article, the output is the mismatch. Shopping the article for a payable diagnosis is upcoding’s cousin, and it is forbidden in the prompt in so many words.",
            },
          ],
        },
        {
          heading: "Modifiers are out of scope for the pilot",
          blocks: [
            {
              type: "p",
              text: "Do not let the first code agent propose modifier 59, 25, or 50. Those are judgment calls with a long history of abuse. A later version may remind a coder to consider laterality when the note states a side. The reminder quotes the side. It does not append the modifier to a claim file. Claim files are generated by your billing system from codes a person accepted.",
            },
          ],
        },
      ],
      example: {
        title: "Worked case: contradiction over suggestion",
        blocks: [
          {
            type: "p",
            text: "Plan: “Schedule a lumbar interlaminar epidural.” A teammate’s macro always drops 64483. The agent’s useful line is: the plan says interlaminar, which points at the 62323 family when imaging is included, not at the transforaminal family. Confirm the year’s descriptor. Do not use the macro.",
          },
          {
            type: "p",
            text: "On A.M., assessment “low back pain,” plan “try an injection” with no route. The agent says: diagnosis family follows low back pain, not radiculopathy; no procedure candidate until the clinician names the procedure. That is a complete output.",
          },
        ],
      },
      exercises: [
        {
          id: "e1",
          kind: "choice",
          prompt:
            "The signed plan says “lumbar interlaminar epidural with imaging.” Which candidate behavior is right?",
          options: [
            { id: "a", text: "Propose the transforaminal family because it is more often authorized." },
            { id: "b", text: "Point at the interlaminar-with-imaging family and warn that a transforaminal code would contradict the plan. Tell the coder to confirm the current book." },
            { id: "c", text: "Add a separate fluoroscopy code so the imaging is obvious to the payer." },
            { id: "d", text: "Leave the procedure blank and copy a diagnosis from a coverage article that pays well." },
          ],
          answer: "b",
          why: "The plan’s route chooses the family. The book confirms the code. The article does not choose the diagnosis.",
          correction:
            "Follow the words “interlaminar” and “imaging” to that family, and state that a transforaminal code contradicts the plan. Do not add fluoroscopy by habit, and do not borrow a diagnosis from a coverage list.",
        },
        {
          id: "e2",
          kind: "text",
          prompt:
            "When should the code-candidate agent return no procedure candidate at all? Give one example from a thin plan.",
          placeholder: "The situation, and the output sentence.",
          min: 60,
          requiredGroups: [
            ["no procedure", "not named", "does not name", "doesnt name", "no route", "unnamed", "not specified"],
            ["do not guess", "dont guess", "no candidate", "must not guess", "should not guess", "silence", "do not propose"],
          ],
          why: "Silence is a specified success.",
          correction:
            "When the clinician has not named the procedure or the route, the agent returns no candidate. “Try an injection” is that situation. Guessing a popular family is a failed run, even if the guess is common at a pain practice.",
        },
      ],
    },
  ],
};
