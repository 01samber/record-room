export const month6 = {
  id: "pilot",
  title: "A pilot you can defend",
  summary:
    "Human checkpoints, logs and vendors, a one-procedure pilot, and a capstone you can hand to leadership.",
  lessons: [
    {
      id: "m6-humans",
      week: 21,
      title: "Human checkpoints",
      hours: "4–8 hours",
      promise:
        "You can name the person at each handoff from scheduling to send.",
      margin: [
        {
          label: "At APICO",
          text: "Front desk, clinician, coder, and a MedOpsHQ operator are four different accountabilities. One login shared among them erases the log.",
        },
        {
          label: "On the record",
          text: "A checkpoint is a named role with the power to stop the packet. A notification nobody reads is not a checkpoint.",
        },
      ],
      weekPlan: [
        "Draw the path of one lumbar case across roles.",
        "Put a name or a role in each box. Empty boxes are design bugs.",
        "Submit both exercises.",
        "Ask who is out sick on a Tuesday. The design has to survive a normal absence without handing the button to the model.",
      ],
      sections: [
        {
          heading: "The path",
          blocks: [
            {
              type: "p",
              text: "Scheduling or check-in triggers eligibility. The front desk sees active or inactive and does not interpret a clinical rule. The clinician sees the patient, writes or signs the note, and names the procedure if there is one. The completeness agent runs on the signed note. A MedOpsHQ operator, or a trained APICO staffer, works the gap list by retrieving documents that already exist. Clinical gaps go back to the clinician. The coder accepts diagnosis and procedure codes in the licensed encoder. A named sender transmits the request. Someone watches the response and sorts a denial into the three piles.",
            },
            {
              type: "p",
              text: "That is a lot of hands on purpose. Combining them into “the AI coordinator” feels efficient until the first invented sentence. Efficiency in this pilot is fewer rework loops, not fewer responsible people.",
            },
          ],
        },
        {
          heading: "What a checkpoint checks",
          blocks: [
            {
              type: "ul",
              items: [
                "Front desk: the eligibility response matches the person standing here, and failure does not look like success.",
                "Clinician: the note is true, and the plan names route, level, and side when a procedure is ordered.",
                "Operator: every packet sentence has a quote, and the gap table has no open required row.",
                "Coder: the code matches the service and the year’s book, and no modifier was added to beat an edit.",
                "Sender: the attachment list matches the quotes, and the payer is the payer eligibility just checked.",
              ],
            },
            {
              type: "p",
              text: "Each checkpoint can reject. Rejection is not a system error. Build the button and the status “returned to clinician” so people use it. If the only comfortable button is “approve,” staff will approve.",
            },
          ],
        },
        {
          heading: "Hours and absence",
          blocks: [
            {
              type: "p",
              text: "Write the backup role. If the coder is out, the backup is another coder, not the operator clicking through. If MedOpsHQ’s operator is out, APICO does the assembly by the old method. The old method stays available. A pilot that removes the manual path before the new path is measured has taken the practice hostage.",
            },
          ],
        },
      ],
      example: {
        title: "Worked case: Tuesday",
        blocks: [
          {
            type: "p",
            text: "The operator is out. Three packets are “ready.” The front desk asks the agent to send them so the schedule does not slip. The design answer is already in the product: the send control is not on that login. The backup coder reviews them in the afternoon, or the procedures that can wait, wait. A delay is visible. An unsupervised send is not available as a workaround.",
          },
        ],
      },
      exercises: [
        {
          id: "e1",
          kind: "choice",
          prompt: "The completeness gap is “spinal level not named.” Who closes it?",
          options: [
            { id: "a", text: "The front desk, by choosing the level the practice uses most." },
            { id: "b", text: "The clinician, because naming the level is a clinical order." },
            { id: "c", text: "The code agent, by defaulting to L4–L5." },
            { id: "d", text: "The payer, during peer-to-peer, with the model speaking." },
          ],
          answer: "b",
          why: "Level is the order. Only the clinician writes the order.",
          correction:
            "The clinician names the level. The front desk, the code agent, and a model on a peer-to-peer call do not invent L4–L5 because it is common.",
        },
        {
          id: "e2",
          kind: "text",
          prompt:
            "Why must the manual way of preparing a request remain available during the pilot?",
          placeholder: "What you lose if the old path is shut off.",
          min: 60,
          requiredGroups: [
            ["backup", "manual", "old", "without the agent", "if the agent", "outage", "down", "fails"],
            ["patient", "delay", "safety", "hostage", "cannot send", "still able", "still work", "practice"],
          ],
          why: "A pilot that cannot be turned off is not a pilot.",
          correction:
            "The manual path has to stay, so a person can still prepare a true request when the agent is wrong, the vendor is down, or the operator is out. Removing it takes the practice hostage and pushes staff to accept bad drafts rather than miss a day of care.",
        },
      ],
    },
    {
      id: "m6-phi",
      week: 22,
      title: "Logs, vendors, and PHI",
      hours: "4–8 hours",
      promise:
        "You can list what a vendor must sign and what a log must show before a real chart is connected.",
      margin: [
        {
          label: "At APICO",
          text: "The minimum necessary chart fields for one appointment are the fields in the packet template. “Export all patients” is not a pilot step.",
        },
        {
          label: "The rule",
          text: "A business-associate agreement covers MedOpsHQ, and it flows down to any subcontractor that can see the chart, including a model host.",
        },
      ],
      weekPlan: [
        "Draft the vendor questions on one page.",
        "Compare them with the actual agreement you have. Gaps become a stop.",
        "Submit both exercises.",
        "Decide where logs live, who can open them, and how long the agreement says to keep them.",
      ],
      sections: [
        {
          heading: "The questions a vendor has to answer",
          blocks: [
            {
              type: "ul",
              items: [
                "Will you sign a business-associate agreement, and will your model host sign one or be bound as a subcontractor?",
                "Do you train your general model on our prompts? If yes, the charts do not go there.",
                "Where is electronic protected health information stored, and who can open it?",
                "Can you show an audit log of access and of each proposal the model made?",
                "What happens when the note is longer than the context window?",
                "How do we get the data back or destroyed when the contract ends?",
                "How fast do you notify us of a breach, inside the HIPAA timeline and inside anything stricter the contract sets?",
              ],
            },
            {
              type: "p",
              text: "A vendor who answers with a logo and the words “HIPAA compliant” has not answered. Compliance is a set of safeguards and contracts, not a badge. You are allowed to like their demo and still withhold the charts.",
            },
          ],
        },
        {
          heading: "What the log contains",
          blocks: [
            {
              type: "p",
              text: "For each run: the appointment identifier, the user who ran it, the time, the policy version that was retrieved, the model’s output, and the human decision, accept or return, with the person’s name. Store the quotes. You do not need to store a second full copy of the chart if the record system already has it, and extra copies are extra risk. The log’s job is to reconstruct what the agent proposed and what the human changed.",
            },
            {
              type: "p",
              text: "If a human deletes an invented sentence, that deletion is a success and it stays in the log. Vendors sometimes offer to hide rejected drafts because they look bad in a report. Those are the drafts you most need. Invention that was caught is how you prove the checkpoint works. Invention that was hidden is how you lose the thread.",
            },
          ],
        },
        {
          heading: "This classroom is not the production system",
          blocks: [
            {
              type: "p",
              text: "The Record Room stores whether an exercise was answered correctly. It is not a covered entity’s record system. Do not type real identifiers into it, into Cursor, or into a side chat. Production belongs in the system named in the agreement, after the questions above have answers you would show a regulator.",
            },
          ],
        },
      ],
      example: {
        title: "Worked case: the badge",
        blocks: [
          {
            type: "p",
            text: "A model host says they are HIPAA compliant and can start tomorrow. They will not sign a business-associate agreement because their standard terms “already cover privacy,” and they reserve the right to use inputs to improve the model. You do not connect APICO. You can still finish the bootcamp on fictional notes. The pilot date moves. That is the checkpoint working.",
          },
        ],
      },
      exercises: [
        {
          id: "e1",
          kind: "choice",
          prompt: "A vendor refuses a business-associate agreement and may use inputs to improve its model. What do you connect?",
          options: [
            { id: "a", text: "The full APICO export, so the model improves on real pain notes." },
            { id: "b", text: "Nothing that contains protected health information. Fictional lab notes only, until the contract is real." },
            { id: "c", text: "One real note, as a test, because a single note is minimum necessary." },
            { id: "d", text: "The notes, but with first names removed, which completes Safe Harbor by itself." },
          ],
          answer: "b",
          why: "No agreement, no charts. A first name is not the only identifier.",
          correction:
            "Connect nothing that holds protected health information. One real note is still a disclosure. Removing a first name is not Safe Harbor. Use fictional notes until a business-associate agreement and a ban on training on your charts are signed.",
        },
        {
          id: "e2",
          kind: "text",
          prompt:
            "Name two things the run log must show so you can defend a packet six months later.",
          placeholder: "What you can reconstruct about the proposal and the person.",
          min: 60,
          requiredGroups: [
            ["who", "user", "person", "name", "human"],
            ["output", "proposal", "draft", "what the model", "what the agent"],
          ],
          why: "If you cannot reconstruct it, you did not supervise it.",
          correction:
            "The log should show who ran the tool and who accepted or returned the draft, and it should show the model’s output, including drafts a human rejected. The policy version and the time belong there too. Without the output and the person, you cannot defend the packet.",
        },
      ],
    },
    {
      id: "m6-pilot",
      week: 23,
      title: "Design the pilot",
      hours: "4–8 hours",
      promise:
        "You can limit the first live test to one procedure family, one payer, and a handful of measures that are not “get more yeses.”",
      margin: [
        {
          label: "At APICO",
          text: "A lumbar epidural family is a sane first slice only if your own volume agrees. If the practice’s pain is mostly something else, follow the volume, not this suggestion.",
        },
        {
          label: "On the record",
          text: "Shadow mode means the agent drafts and a person still does the real packet the old way. You compare. You do not send the draft.",
        },
      ],
      weekPlan: [
        "Pick the procedure family with your coder, not from memory of this course.",
        "Write the five measures and the number that stops the pilot.",
        "Submit both exercises.",
        "Schedule the readout before you schedule the start. A pilot with no readout becomes the workflow by default.",
      ],
      sections: [
        {
          heading: "Slice it",
          blocks: [
            {
              type: "p",
              text: "A readable pilot is one procedure family, one place of service, and one payer, for a fixed number of weeks. Lumbar transforaminal or interlaminar epidurals are a reasonable candidate because the policy questions are known: radicular pattern, level, side, imaging, conservative care. Facet radiofrequency is a poor first pilot if the diagnostic-block rules are still confusing to the team. Choose the family your staff can already document well on a good day. The agent should make a good day repeatable, not teach the clinical standard from scratch.",
            },
            {
              type: "p",
              text: "Start in shadow mode. For each case, the human prepares the real request as they do now. The agent prepares a parallel gap list and code candidates. You compare. You count inventions and missed gaps. Nothing from the agent is sent. After a pre-agreed clean sample, you may let the agent’s gap list appear inside the real workflow, still with a human send. You do not skip shadow mode because a demonstration felt good.",
            },
          ],
        },
        {
          heading: "Measures",
          blocks: [
            {
              type: "ul",
              items: [
                "Invention count on the audited sample. Acceptable number: zero.",
                "Gap recall against a coder’s gold list on a sample of notes.",
                "Coder agreement with code candidates, counted separately from “the coder was too busy and clicked accept.”",
                "Time from signed note to a complete packet, compared with the shadow baseline.",
                "Share of denials that were missing documents you actually had. That number should fall. The approval rate may be watched and must not be the target.",
              ],
            },
            {
              type: "p",
              text: "Stop the pilot if an invented fact reaches a payer, if staff are pasting into an unsanctioned chat, or if the backup manual path was turned off. Stopping is a successful control. Restart only with a written change.",
            },
          ],
        },
        {
          heading: "What you will tell Dr. Abdallah’s team",
          blocks: [
            {
              type: "p",
              text: "Speak in their values. The tool exists so a person gets to the least invasive effective next step without a missing page creating a delay, and without a letter that says something the clinician did not find. It will not choose the procedure. It will not talk to the payer alone. It can be unplugged. That is a pilot a physician can sponsor.",
            },
          ],
        },
      ],
      example: {
        title: "Worked case: a scope box",
        blocks: [
          {
            type: "p",
            text: "Scope: left or right lumbar transforaminal epidurals, office place of service, one Medicare Advantage plan you already bill, six weeks, shadow mode, twenty cases or the volume you actually have, whichever comes first. Out of scope: facet destruction, sedation requests, any other payer, any automatic send. Stop rule: one invented fact in a draft that a human almost sent. Measure: invention count, gap recall, coder agreement, cycle time. Approval rate is recorded in a footnote and is not a goal.",
          },
        ],
      },
      exercises: [
        {
          id: "e1",
          kind: "choice",
          prompt: "Which pilot is the one you can defend?",
          options: [
            { id: "a", text: "All payers, all procedures, agent sends when its confidence is high, success is approval rate." },
            { id: "b", text: "One procedure family, one payer, shadow mode first, human send, invention count must stay at zero." },
            { id: "c", text: "Real charts pasted into a consumer chatbot for two weeks, to see if staff like it." },
            { id: "d", text: "The agent rewrites thin notes at night so the morning queue is already complete." },
          ],
          answer: "b",
          why: "Narrow, shadowed, and measured on truth.",
          correction:
            "Defend a single procedure family, a single payer, shadow mode before any draft is used, a human send, and a zero invention count. All-payer automation, consumer chatbots, and overnight rewriting of notes are not a pilot.",
        },
        {
          id: "e2",
          kind: "text",
          prompt:
            "Give the stop rule for your pilot in one or two sentences. Include what event stops it.",
          placeholder: "The event that means you unplug the draft.",
          min: 50,
          requiredGroups: [
            ["invent", "false", "payer", "unsanctioned", "chat", "manual path", "sent"],
            ["stop", "unplug", "halt", "pause", "shut"],
          ],
          why: "A pilot without a stop rule is a launch.",
          correction:
            "Stop if an invented fact is sent or nearly sent, if staff route charts through an unsanctioned chat, or if the manual path is removed. Unplug the draft and restart only with a written change. Your sentence should name the event and the stop.",
        },
      ],
    },
    {
      id: "m6-capstone",
      week: 24,
      title: "Capstone",
      hours: "4–8 hours",
      promise:
        "You leave with a one-page design leadership can read without you in the room.",
      margin: [
        {
          label: "At APICO",
          text: "Write for a physician and an operator. If either would misunderstand a sentence, the sentence is too clever.",
        },
        {
          label: "On the record",
          text: "This capstone is graded on whether the guardrails are present, not on how grand the agent sounds.",
        },
      ],
      weekPlan: [
        "Fill the six boxes in a local text file first.",
        "Read them the next morning and cut any sentence that promises a yes from a payer.",
        "Submit the choice, then the six boxes.",
        "When the seal appears, you have finished the twenty-four weeks. The production pilot still waits on the agreement and the shadow-mode numbers.",
      ],
      sections: [
        {
          heading: "What you are handing over",
          blocks: [
            {
              type: "p",
              text: "The capstone is the design of MedOpsHQ’s approval support for APICO. It is not a claim that the agent is already live, and it is not legal advice. It is the document you can put in front of your manager and, when you are ready, in front of the practice: what the agent may do, what it must never do, who sends, what you will measure, and where a real chart is allowed to go.",
            },
            {
              type: "p",
              text: "Use the fictional discipline even here. Do not paste a real member ID to “make the example vivid.” Leadership can understand J.R.",
            },
          ],
        },
        {
          heading: "How the six months fit on one page",
          blocks: [
            {
              type: "p",
              text: "Month one gave you the room: propose, cite, stop; the two companies; CPT beside ICD-10-CM; a workbench that never holds a real chart. Month two put federal law on that room: HIPAA and the business associate, reasonable and necessary under section 1862, Novitas for Delaware, the False Claims Act’s reckless disregard, and a way to read a note. Month three showed why models invent boring facts and how a quote requirement plus a test set catches them. Month four split the work into eligibility, completeness, and code candidates, with a loop that does not retry its way into a lie. Month five assembled the packet, placed CMS-0057-F in its real limits, and sorted denials. Month six names the humans, the vendor gates, and the pilot slice.",
            },
            {
              type: "call",
              title: "The line under the page",
              text: "MedOpsHQ may help APICO prepare true requests faster. The chart stays the source. A person sends. An invented fact is a stopped pilot, not a lesson the model may learn from.",
            },
          ],
        },
      ],
      example: {
        title: "Worked case: a thin capstone that still passes",
        blocks: [
          {
            type: "p",
            text: "Scope: shadow-mode gap lists for one lumbar epidural family and one Advantage plan. Allowed: quote the signed note, list gaps, propose a code family for a coder. Forbidden: invent therapy, change a diagnosis, send to a payer, speak to a patient. Sender: the named coder on duty. Measure: zero inventions in the sample, plus gap recall. Charts: only inside the system named in the business-associate agreement, never in this classroom and never in a consumer chat.",
          },
          {
            type: "p",
            text: "That page is enough. A page that promises “80 percent fewer denials” is not, because you have not measured it, and because denial reduction is not the objective you agreed to defend.",
          },
        ],
      },
      exercises: [
        {
          id: "e1",
          kind: "choice",
          prompt: "The capstone is done when which statement is true?",
          options: [
            { id: "a", text: "The page promises a higher approval rate and an agent that submits on its own." },
            { id: "b", text: "The page states a narrow scope, a human sender, a ban on invented facts, a measure with a zero-invention bar, and a real limit on where charts go." },
            { id: "c", text: "The page is a vendor’s brochure with APICO’s name pasted on it." },
            { id: "d", text: "The page lists CPT codes copied from memory so the team can bill tomorrow." },
          ],
          answer: "b",
          why: "Leadership needs the guardrails. The rest of the bootcamp was how you learned which ones matter.",
          correction:
            "A finished capstone names a narrow scope, a human sender, a ban on invention, a measure that treats any invention as failure, and a contractual limit on where protected health information may go. It does not promise approvals, unsupervised submit, or codes from memory.",
        },
        {
          id: "e2",
          kind: "fields",
          prompt:
            "Write the one-page design. Each box is graded. Short and concrete beats grand.",
          why: "This is the page your manager can keep.",
          correction:
            "A passing page limits the pilot to one real procedure family and one payer, allows quoting and gap lists and code candidates only, forbids invention and unsupervised sending, names a human sender, measures invention at zero, and keeps real charts inside a system covered by a business-associate agreement.",
          fields: [
            {
              id: "scope",
              label: "Scope. Which procedure family and which kind of payer are in the first pilot, and what is out?",
              hint: "Name a family, such as a lumbar epidural route, and say shadow mode or an equivalent limit.",
              min: 40,
              requiredGroups: [
                ["lumbar", "epidural", "transforaminal", "interlaminar", "facet", "injection", "procedure"],
                ["one payer", "single payer", "advantage", "commercial", "medicare", "one plan", "shadow"],
              ],
            },
            {
              id: "allowed",
              label: "Allowed. What may the agent do?",
              hint: "Use the verbs from the course: quote, list gaps, propose a candidate.",
              min: 30,
              requiredGroups: [
                ["quote", "cite", "gap", "missing", "candidate", "eligib"],
              ],
            },
            {
              id: "forbidden",
              label: "Forbidden. What must the agent never do?",
              hint: "Include invention and sending.",
              min: 30,
              requiredGroups: [
                ["invent", "fabricat", "make up"],
                ["send", "submit", "payer"],
              ],
            },
            {
              id: "sender",
              label: "Sender. Which human role sends, and when are they allowed to?",
              hint: "Name a role. Say what must be true first.",
              min: 30,
              requiredGroups: [
                ["coder", "clinician", "physician", "operator", "person", "human", "staff"],
                ["gap", "quote", "complete", "signed", "accepted", "after"],
              ],
            },
            {
              id: "measure",
              label: "Measure. What number stops the pilot?",
              hint: "Invention count belongs here.",
              min: 30,
              requiredGroups: [
                ["invent"],
                ["zero", "0", "none"],
              ],
            },
            {
              id: "charts",
              label: "Charts. Where may a real APICO chart go, and where must it not go?",
              hint: "Mention the agreement, and this classroom or a consumer chat.",
              min: 40,
              requiredGroups: [
                ["business associate", "baa", "agreement", "contract"],
                ["not", "never", "must not", "classroom", "cursor", "chat", "consumer"],
              ],
            },
          ],
        },
      ],
    },
  ],
};
