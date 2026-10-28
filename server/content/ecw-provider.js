import { billingPicture, choice, course, prose, scribePicture, textEx } from "./ecw-shared.js";

const desk = course("ecw-provider", "Providers");

export const providerLessons = [
  desk({
    id: "pr-day",
    title: "Your schedule and the open encounter",
    promise: "You can move from the day’s schedule to the Progress Note and confirm the visit before you document.",
    keyboard: "Open the facility schedule, then the appointment, then the encounter. The Progress Note is the clinical page. Quick Search is at the upper right of the published picture.",
    sections: [
      prose("The visit is an encounter", [
        "Your documentation lives on the encounter for this appointment. eClinicalWorks shows that page as the Progress Note. The published Scribe picture is the same screen you use whether you type, dictate, or review a scribe’s draft: header at the top, sections down the page, Templates and Claim along the bottom, and the jellybean row of queues above everything.",
        "Start from the schedule of the facility where you are sitting. APICO’s public offices are Bear, Milford, and Lewes. If the header facility is wrong, you are in the wrong encounter even if the patient is right. Change encounters before you write.",
      ], [scribePicture]),
      prose("What the scribe already did", [
        "A draft may be waiting. Read it as a draft. The sections you are responsible for are the assessment and the plan, and you are also responsible for any exam line you did not perform. Side and level in a procedure note are yours to confirm, because you were the person in the room.",
        "The tabs above the note, on the published picture, include Encounters and Patient Docs. Encounters is how you see your last visit with this person. Patient Docs is scanned paper. Neither tab writes today’s plan for you.",
      ]),
    ],
    example: {
      title: "Worked example: the header is yesterday",
      blocks: [
        {
          type: "p",
          text: "You open J.R., a fictional patient, and the note looks familiar. The header date is yesterday in Bear. Today is Lewes. You close that encounter and open today’s appointment. Then you read the draft.",
        },
      ],
    },
    exercises: [
      choice(
        "The patient is correct and the facility on the header is not today’s office. What do you document in?",
        [
          "This note. The name is what matters.",
          "Today’s encounter at today’s facility.",
          "The revenue board.",
          "A telephone encounter, so the facility does not matter.",
        ],
        "b",
        "Match the encounter to today’s appointment and facility before you write or sign.",
        "The header is the visit."
      ),
      textEx({
        prompt: "What do you check on the encounter header, and which page holds the note?",
        groups: [
          ["facility", "office"],
          ["date"],
          ["progress note"],
        ],
        sample:
          "I check the date and the facility on the header, then I document in the Progress Note for that encounter.",
        correction:
          "Check the date, the facility, and the provider on the header. The note is the Progress Note of today’s encounter.",
        why: "The right page is the one whose header matches the appointment.",
      }),
    ],
  }),
  desk({
    id: "pr-review",
    title: "Reviewing the note you will sign",
    promise: "You can review a draft in section order and change a wrong side before you sign.",
    keyboard: "Read the colored headings on the Progress Note: Chief Complaint, HPI, ROS, Examination, Assessment. They are visible on the published picture.",
    sections: [
      prose("A provider’s read", [
        "Chief complaint should be why this person is here. HPI should contain only the story from this visit, including side and level if you said them. Review of systems should match what you asked. Examination should match what you did. Assessment should be the diagnosis you are willing to sign. The plan and any procedure sentence should name the same side and level as the HPI.",
        "Templates and cloned notes fill sentences you did not say. If a default neurological exam is sitting in the note and you did not do it, delete it. A signed default is your exam.",
      ]),
      prose("Speech and ambient drafts", [
        "Scribe It and Sunoh both land in this note. Sunoh, on eClinicalWorks’ product page, listens and then waits for an edit and an import. After import, the words are in the sections. Read them there. Last Text on the phone is the scribe’s check. Yours is the formatted note.",
        "If the duration of prior treatment is blank, leave it blank or document what you actually know. Do not type a duration because a form looks unfinished.",
      ]),
    ],
    example: {
      title: "Worked example: the draft says the right side",
      blocks: [
        {
          type: "p",
          text: "You injected the left L5. The draft says right L5 in the procedure line and left L5 in the HPI. You correct the procedure line before you sign. You also remove a template sentence about a normal gait you did not test.",
        },
      ],
    },
    exercises: [
      choice(
        "The HPI and the procedure line disagree about the side. What do you sign?",
        [
          "The draft as it stands. The disagreement is small.",
          "A note in which the HPI and the procedure name the same side.",
          "Neither line. Delete the assessment.",
          "The template’s default side.",
        ],
        "b",
        "Make the side agree before you sign. A signed disagreement is your record.",
        "You sign the facts of the visit, not the draft’s average."
      ),
      textEx({
        prompt: "Name two sections you read before signing, and what you do with an exam sentence you did not perform.",
        groups: [
          ["hpi", "assessment", "exam", "procedure"],
          ["delete", "remove", "take out"],
        ],
        sample:
          "I read the HPI and the assessment, and the procedure line. I delete an exam sentence I did not perform.",
        correction:
          "Read the HPI, the examination, the assessment, and any procedure line. Remove an exam sentence you did not perform. Make the side agree.",
        why: "Signature covers the sections, including the defaults you left in.",
      }),
    ],
  }),
  desk({
    id: "pr-eva",
    title: "Eva, inside this chart",
    promise: "You can use Eva to recall this practice’s own chart without leaving the window you are in.",
    keyboard: "Eva is eClinicalWorks’ in-chart assistant. Their V12 page describes it as a search you use without leaving the current window. Look for Eva on the chart you already have open, not on the revenue board.",
    sections: [
      prose("What the vendor says Eva does", [
        "On the V12 description, Eva retrieves patient histories, puts an old Progress Note beside a new one, shows a flowsheet, adds a diagnosis to the problem list, and lets you decide a refill request. The point of the tool is that you stay on the current window. You are not opening a second product.",
        "Comparison is the feature that saves a visit. Last month’s exam next to today’s draft shows what changed. A flowsheet shows a pain score or a medication over time if your practice has recorded it that way. Ask your administrator which flowsheets exist for pain. The tool does not create a history that was never charted.",
      ]),
      prose("What Eva does not decide", [
        "Adding a diagnosis to the problem list is your click. A suggestion that would make a later form easier is not a reason to add it. A refill decision is also yours: the request can sit in the queue while you look at the medication list on the note.",
        "If you cannot find Eva under the name Eva, use the chart search your build actually shows and write that name in your notes for this lesson. V12 menus move. The job of the tool does not: find what this practice already recorded, without leaving the visit.",
      ]),
    ],
    example: {
      title: "Worked example: last month beside today",
      blocks: [
        {
          type: "p",
          text: "You ask Eva for the last Progress Note and keep it beside today’s draft. Last month was the right side. Today you treated the left. You do not copy last month’s side forward. You do not add a diagnosis Eva surfaced from an old problem if you are not assessing it today.",
        },
      ],
    },
    exercises: [
      choice(
        "Eva offers a diagnosis you are not assessing today. What happens to the problem list?",
        [
          "You add it so the list matches every past mention.",
          "You leave it off until you are actually assessing it.",
          "You put it in the HPI as a quote from Eva.",
          "You send it to the revenue board.",
        ],
        "b",
        "The problem list changes when you decide the diagnosis belongs. Eva can show it. You add it.",
        "Eva retrieves. You decide."
      ),
      textEx({
        prompt: "Name two things Eva can show you from this chart, and who decides to add a diagnosis.",
        groups: [
          ["note", "history", "flowsheet", "refill"],
          ["provider", "i decide", "i add", "the physician", "you"],
        ],
        sample:
          "Eva can show a prior Progress Note beside today’s and a flowsheet or a refill request. I decide whether to add a diagnosis to the problem list.",
        correction:
          "Eva can show history, a side-by-side Progress Note, a flowsheet, or a refill. The provider decides whether a diagnosis is added.",
        why: "The tool stays inside the chart. The click that changes the problem list is clinical.",
      }),
    ],
  }),
  desk({
    id: "pr-prisma",
    title: "PRISMA and outside records",
    promise: "You can open PRISMA from the places eClinicalWorks names, and you know an outside record is not today’s note until you bring it in.",
    keyboard: "eClinicalWorks’ May 2023 PRISMA description says you reach it from the right chart panel, the floating toolbar, and the native screen you are already on. In V12, data related to the current screen can appear without a separate search, as with allergies.",
    sections: [
      prose("Where they say it sits", [
        "PRISMA is eClinicalWorks’ search across records exchanged through Carequality and CommonWell, plus what is already inside your EHR. The vendor’s podcast on V12 enhancements says it is reachable from the right chart panel, a floating toolbar, and the screen you are in. A later product description says a PRISMA assistant can highlight outside facts and that you can import a document or a data element into the note.",
        "Their volume figures are their figures. They do not tell you that this patient’s outside MRI is present. You search, you read, and you see either a record or no record.",
      ]),
      prose("Using it during a pain visit", [
        "Search for the imaging, the recent procedure, or the hospital note you were told about. If V12 has already surfaced an allergy on the allergy screen, read it there. An outside result becomes part of today’s encounter when you write what you accepted into the Progress Note. Leaving it only in PRISMA means the next person who opens the note will not see it.",
        "Patient Docs remains the place for items your own office scanned. PRISMA is the place for records other organizations exchanged. They are different piles.",
      ]),
    ],
    example: {
      title: "Worked example: an outside MRI",
      blocks: [
        {
          type: "p",
          text: "PRISMA shows an MRI from another organization. Today’s note does not mention it. You read the report, write one sentence in the HPI that you reviewed it, and sign that sentence. If you do not trust the match, you do not import it and you do not describe the film.",
        },
      ],
    },
    exercises: [
      choice(
        "PRISMA shows an outside report you have not written into the note. Is it part of today’s encounter?",
        [
          "Yes. Exchange makes it yours automatically.",
          "Not until you document what you accepted in the Progress Note.",
          "Yes, if it would help a later form.",
          "Only if billing has already claimed it.",
        ],
        "b",
        "An outside record stays outside until you write into today’s note what you reviewed and accepted.",
        "PRISMA finds records. The note records your review."
      ),
      textEx({
        prompt: "Name two places eClinicalWorks says you can open PRISMA, and what you must do before an outside fact is part of today’s note.",
        groups: [
          ["right chart panel", "right panel", "floating", "toolbar"],
          ["progress note", "document", "write"],
        ],
        sample:
          "PRISMA can be opened from the right chart panel or the floating toolbar. I write what I accepted into the Progress Note before it is part of today’s visit.",
        correction:
          "Open PRISMA from the right chart panel, the floating toolbar, or the screen you are on. Write the accepted fact into the Progress Note. Until then it is not this encounter.",
        why: "The published locations get you to the search. The note is what you sign.",
      }),
    ],
  }),
  desk({
    id: "pr-orders",
    title: "Orders, medications, and refills",
    promise: "You can place an order from the visit and decide a refill without treating a suggestion as an order you gave.",
    keyboard: "Orders are placed from the encounter, often through an order set or the treatment section of the note. Refill requests are one of the queues Eva can act on. Confirm the order button’s label on a training patient.",
    sections: [
      prose("An order is a separate object from a sentence", [
        "Writing “inject left L5” in the plan does not, by itself, create the order the rest of the practice will track. Place the order from the encounter: medication, procedure, imaging, or referral, whichever you intend. Order sets, which eClinicalWorks ties to templates and to the right chart panel, can offer a bundle. Accept the lines that match today. Decline the rest.",
        "Sunoh’s product page says it can pre-fill orders for medications, labs, imaging, and referrals. Those are pre-fills. They are not placed until you accept them. A scribe’s draft of an order is the same: you accept it or you do not.",
      ]),
      prose("Medications and refill requests", [
        "The current medication list is a section of the Progress Note, visible on the published picture. Reconcile it when the patient tells you a change. Eva’s refill decision lets you respond without leaving the window. Approve, change, or deny from the medication you actually want continued. A controlled-substance prescription uses the electronic prescribing path your practice has enabled. eClinicalWorks discusses that path next to medication prior authorization. If the control is not on your login, you do not have that authority in the system.",
      ]),
    ],
    example: {
      title: "Worked example: the order set offers both sides",
      blocks: [
        {
          type: "p",
          text: "The lumbar order set lists a left injection and a right injection. You accept the left, because that is the side you treated, and you decline the right. The medication list gains nothing you did not prescribe. A refill request for a drug you stopped stays denied.",
        },
      ],
    },
    exercises: [
      choice(
        "An order set includes a side you did not treat. What do you accept?",
        [
          "The whole set. Order sets are all or nothing.",
          "Only the orders that match today’s visit.",
          "None. Order sets cannot be used in pain care.",
          "Whichever line is listed first.",
        ],
        "b",
        "Accept the orders that match the visit. Decline the others, including the wrong side.",
        "A bundle is a menu. You order from it."
      ),
      textEx({
        prompt: "How is a sentence in the plan different from an order, and what do you do with a pre-filled order you do not want?",
        groups: [
          ["order"],
          ["plan", "note", "sentence"],
          ["decline", "do not accept", "reject", "remove"],
        ],
        sample:
          "A sentence in the plan is not the order. I place the order from the encounter. I decline a pre-filled order I do not want, including the wrong side.",
        correction:
          "The plan sentence and the order are different. Place the order from the encounter. Decline a pre-filled or order-set line that is not today’s care.",
        why: "The practice tracks orders. A sentence alone does not create one.",
      }),
    ],
  }),
  desk({
    id: "pr-problem",
    title: "Assessment and the problem list",
    promise: "You can keep today’s assessment and the long-term problem list from being the same list by accident.",
    keyboard: "Assessment is a heading on the Progress Note. The problem list is the ongoing list Eva can add to. They are related and they are not the same click.",
    sections: [
      prose("Today versus the ongoing list", [
        "The assessment on the Progress Note is what you are diagnosing at this visit. The problem list is the chart’s running list of problems. Adding to the problem list, which Eva can do from the current window, keeps the problem for later visits. It does not replace writing an assessment today.",
        "A historical suggestion, including one from a coding or HCC screen elsewhere in the product, is a question: is this still true, and are you assessing it now? If you are not, it does not go on today’s assessment. The billing course covers that screen from the billing side. From yours, the rule is the same. You assess what you assessed.",
      ]),
      prose("Specificity you actually have", [
        "Side and level in the assessment should match the HPI and the procedure. If you know it is the left L5, the assessment should not stay at an unspecified back pain line that a template dropped in. If you do not know the level, do not type one because a more specific line looks better.",
      ]),
    ],
    example: {
      title: "Worked example: an old diagnosis resurfaces",
      blocks: [
        {
          type: "p",
          text: "A prior problem of cervical pain is on the list. Today you treated the lumbar spine. You leave the cervical problem on the ongoing list if it is still true, and you do not put it on today’s assessment. Today’s assessment names the lumbar finding you actually made.",
        },
      ],
    },
    exercises: [
      choice(
        "A diagnosis is on the problem list from last year. You did not assess it today. Does it go on today’s assessment?",
        [
          "Yes. The problem list copies forward automatically.",
          "No. Today’s assessment is only what you assessed today.",
          "Yes, if it has ever been paid.",
          "Only on the revenue board.",
        ],
        "b",
        "Today’s assessment is this visit. The problem list can keep a chronic problem without putting it on today’s note.",
        "Two lists. Today’s assessment is the one you are signing for this encounter."
      ),
      textEx({
        prompt: "What is the difference between the assessment on the Progress Note and the problem list?",
        groups: [
          ["assessment", "today"],
          ["problem list"],
        ],
        sample:
          "The assessment is what I am diagnosing today on the Progress Note. The problem list is the ongoing list, and I add to it only when the problem belongs there.",
        correction:
          "The assessment is this visit’s diagnoses on the Progress Note. The problem list is the ongoing list. Adding to one does not automatically document the other for today.",
        why: "Signing today’s note should not silently renew every old problem.",
      }),
    ],
  }),
  desk({
    id: "pr-remote",
    title: "TeleVisits, group visits, and remote monitoring",
    promise: "You can document a video visit and a device reading in an encounter, not in a side app that never hits the chart.",
    keyboard: "healow TeleVisits and healow Meet are the vendor’s video tools, described on the V12 page as part of eClinicalWorks. Remote patient monitoring stores device readings in the EHR. The note is still a Progress Note.",
    sections: [
      prose("A video visit is still an encounter", [
        "eClinicalWorks describes healow TeleVisits as the one-to-one video visit, with room to add a family member, a translator, or another clinician. healow Meet is the group visit: education, counseling, or a behavioral-health group, booked inside the system. Both should produce an encounter you can open. If the video happened and the schedule has no encounter, the visit is not in the chart yet.",
        "Document it the same way as an office visit: header, HPI, exam that you could actually perform on video, assessment, plan. Do not clone an in-office neurological exam into a video visit where you did not do those maneuvers.",
      ]),
      prose("Readings from devices", [
        "The remote-monitoring module, on the same V12 page, brings readings from wearables into the EHR so someone can review them. A reading is not a procedure and it is not an assessment. If you act on it, write that in an encounter. If a staff member only files the reading, the flowsheet or the monitoring screen can hold the number, and your note starts when you make a decision.",
        "healow’s patient app is how patients see appointments, results, and refill requests. What they type there is a request, not your exam.",
      ]),
    ],
    example: {
      title: "Worked example: a video follow-up",
      blocks: [
        {
          type: "p",
          text: "J.R. is on a TeleVisit. You can see the person and take a history. You cannot palpate the lumbar spine. The exam says what you observed on video and does not say tenderness to palpation. The assessment is based on the history and any imaging you reviewed, and you write that limit in the note.",
        },
      ],
    },
    exercises: [
      choice(
        "You saw the patient only by video. A template inserts an in-office palpation exam. What do you do?",
        [
          "Keep it. Templates are modality-proof.",
          "Remove the maneuvers you did not perform and document what the video allowed.",
          "Delete the encounter because video visits are not charted.",
          "Move the exam into the revenue board.",
        ],
        "b",
        "A video encounter documents the video exam. Remove template lines for maneuvers you did not do.",
        "The encounter type does not change the duty to describe what happened."
      ),
      textEx({
        prompt: "Name the eClinicalWorks video tools and what kind of record a video visit still needs.",
        groups: [
          ["televisit", "televisits", "meet"],
          ["encounter", "progress note"],
        ],
        sample:
          "healow TeleVisits and healow Meet are the video tools. A video visit still needs an encounter and a Progress Note that matches what I could do on video.",
        correction:
          "TeleVisits are one-to-one video. Meet is the group visit. Either one still needs an encounter and a Progress Note limited to what you actually did.",
        why: "Remote care is still a charted encounter.",
      }),
    ],
  }),
  desk({
    id: "pr-sign",
    title: "Locking the note",
    promise: "You can sign the encounter you mean to sign, and you know what other desks can do only after that.",
    keyboard: "The signature or lock control is on the encounter, not on the revenue board. Claim, on the bottom bar of the published picture, is billing’s door. You do not have to open it to sign.",
    sections: [
      prose("What lock means", [
        "When you lock or sign the Progress Note, you are saying the header, the story, the exam, the assessment, the orders you accepted, and the procedure line are the visit. Later corrections go through an addendum, not through a quiet edit that pretends the original said something else. Learn your build’s word for this control on a training patient before you use it on a real one. Practices differ between sign, lock, and co-sign.",
        "Read once more for side, level, and any template sentence you did not perform. Then lock. An empty duration stays empty.",
      ]),
      prose("What other people are waiting for", [
        "Prior authorization and billing work from the signed encounter. The Claim button is on the bottom of the note so billing can build the claim from this visit. Documents and referrals sit in the jellybean row for those desks. Your part is the signed note and the orders you placed. Their part starts when those exist.",
        "CDSS alerts, which eClinicalWorks describes as warnings driven by age, sex, and diagnoses, may appear on the chart while you are still in the visit. An alert is a reminder of a rule your practice loaded. It is not a finding. Address it or document why you are not, and do not let an alert type an exam you skipped.",
      ], [billingPicture]),
    ],
    example: {
      title: "Worked example: the last look",
      blocks: [
        {
          type: "p",
          text: "Header is today, Lewes, you. Left L5 is in the HPI, the procedure line, and the order. The template’s right-sided sentence is gone. Therapy duration is blank. You lock the note. You leave Claim for billing.",
        },
      ],
    },
    exercises: [
      choice(
        "You are ready to lock. Which item can stay blank?",
        [
          "The side of a procedure you performed.",
          "A therapy duration nobody established.",
          "The facility.",
          "Your name as the provider of the visit.",
        ],
        "b",
        "A duration that was not established stays blank. Side, facility, and provider do not.",
        "Lock records the visit you had, including the gaps."
      ),
      textEx({
        prompt: "What do you recheck immediately before locking, and which bottom-bar control belongs to billing rather than to you?",
        groups: [
          ["side", "level"],
          ["claim"],
        ],
        sample:
          "Before I lock I recheck the side and the level in the note and on the order. Claim is billing’s control on the bottom bar. I do not need it in order to lock.",
        correction:
          "Recheck side, level, header, and any exam you did not perform. Then lock. Claim is the billing control on the bottom of the note.",
        why: "Lock is the last clinical act on the encounter.",
      }),
    ],
  }),
];
