import { billingPicture, choice, course, prose, scribePicture, textEx } from "./ecw-shared.js";

const desk = course("ecw-bill", "Billing");

export const billingLessons = [
  desk({
    id: "bl-claim",
    title: "The claim on the encounter",
    promise: "You can open the claim from the visit and see that it belongs to one encounter.",
    keyboard: "Claim is on the bottom bar of the Progress Note in eClinicalWorks’ published Scribe picture, next to Templates, Letters, and Ink.",
    sections: [
      prose("Start from the visit", [
        "A claim in eClinicalWorks is built from an encounter. On the published picture of the Progress Note, Claim is a word on the bottom bar. That is the door from this visit into the bill. Opening it from a different encounter bills a different visit, even if the patient is the same.",
        "Before you change anything, read the header the provider saw: date, facility, provider. Then see whether the note is locked or signed. A practice rule should say whether you may create a claim on an unsigned note. If the rule is that you wait, you wait. The clinical text is still moving.",
      ], [scribePicture]),
      prose("What you are not looking at yet", [
        "The revenue analysis board, shown on eClinicalWorks’ revenue-cycle pictures, summarizes months of charges, completion lag, and CPT totals. It is how a manager sees the practice. It is not where you enter today’s line items. Learn it after you can open one claim.",
      ], [billingPicture]),
    ],
    example: {
      title: "Worked example: two encounters, one patient",
      blocks: [
        {
          type: "p",
          text: "J.R. is fictional and has a visit today and a visit last month. You open today’s Progress Note and press Claim. Last month’s claim stays closed. The facility on the header matches the office that rendered the service.",
        },
      ],
    },
    exercises: [
      choice(
        "Where is Claim on the published Progress Note picture?",
        [
          "On the revenue analysis board’s bubble chart.",
          "On the bottom bar of the note, with Templates and Letters.",
          "Inside Scribe It.",
          "On the patient portal.",
        ],
        "b",
        "Claim is on the bottom bar of the Progress Note. The revenue board is a later, summary screen.",
        "The claim starts from the encounter."
      ),
      textEx({
        prompt: "How do you open the right claim, and what do you check on the header first?",
        groups: [
          ["claim"],
          ["encounter", "progress note", "visit"],
          ["date", "facility", "provider"],
        ],
        sample:
          "I open Claim from the bottom of today’s Progress Note. I check the date, the facility, and the provider on the header before I change the claim.",
        correction:
          "Open Claim from the encounter you mean to bill. Check the date, facility, and provider. Do not start from the monthly revenue board.",
        why: "The bottom bar ties the claim to the visit on the screen.",
      }),
    ],
  }),
  desk({
    id: "bl-elig",
    title: "Eligibility and the scrubber",
    promise: "You can run eligibility and read a scrubber warning as a question about the note.",
    keyboard: "Eligibility can be run from the appointment, the patient’s insurance, or the billing workflow. eClinicalWorks describes batch eligibility and real-time claim scrubbing on its revenue-cycle pages. The warning appears before or as you prepare the claim.",
    sections: [
      prose("Eligibility again, from your side", [
        "The authorization desk may already have checked coverage. You check it again near the day you bill, because a plan can change. An active eligibility response means the coverage responded. It does not mean a required authorization is on file, and it does not mean the note supports the service.",
        "healow check-in and a card on file are how the front desk captured the plan. Your screen is the response: payer, member, dates. If it fails, the jellybean path may flag it. Fix the coverage data. Do not change the diagnosis to force a cleaner response.",
      ]),
      prose("What a scrubber flag is", [
        "Real-time claim scrubbing, which eClinicalWorks describes as a way to send a cleaner claim the first time, compares the claim with edits. A flag about a modifier, a missing authorization number, or a diagnosis that does not pair with the procedure is a question. You answer it from the signed note and from the authorization record.",
        "Their public materials also cite a first-pass acceptance figure for their revenue-cycle service. That is their advertised figure. It is not a result stored on your claim, and it is not a reason to alter a code so the scrubber goes quiet.",
      ]),
    ],
    example: {
      title: "Worked example: a flag about units",
      blocks: [
        {
          type: "p",
          text: "The scrubber says the units do not match a typical line. The note and the order describe one side, one injection. You leave the units at one. You do not add a second side to match a template the scrubber has seen before.",
        },
      ],
    },
    exercises: [
      choice(
        "A scrubber flag disagrees with the signed note. What wins?",
        [
          "The scrubber, because it is trying to get the claim through.",
          "The signed note and the order.",
          "The revenue board’s average charge.",
          "Last year’s similar claim.",
        ],
        "b",
        "The scrubber asks. The signed note answers. Do not change the visit to silence a flag.",
        "A clean flag list is not the goal. An accurate claim is."
      ),
      textEx({
        prompt: "What does an eligibility response tell you, and how do you handle a scrubber flag that conflicts with the note?",
        groups: [
          ["eligib", "coverage"],
          ["note", "order"],
          ["scrub"],
        ],
        sample:
          "Eligibility tells me whether coverage responded. It is not an approval. If a scrubber flag conflicts with the signed note or the order, I keep the note and the order.",
        correction:
          "Eligibility is the coverage response, not authorization and not the note. A scrubber flag that conflicts with the signed note is resolved in favor of the note.",
        why: "Both tools are checks. Neither one is the visit.",
      }),
    ],
  }),
  desk({
    id: "bl-lines",
    title: "Lines that match the note",
    promise: "You can put the procedure, the diagnosis, and the modifiers on the claim only as the signed note supports them.",
    keyboard: "On the claim, the line items are the CPT or HCPCS, the units, the modifiers, and the diagnosis pointers. The words that justify them are on the Progress Note and the order, not on the revenue board.",
    sections: [
      prose("Read, then code the line", [
        "Open the locked note. Find the procedure sentence and the order. The side and the level on the claim’s narrative or modifier, where your payer requires them, come from those two places. If they disagree, the claim waits. You send it back to the provider. You do not choose the combination that paid last time.",
        "Diagnosis pointers come from the assessment the provider signed for this visit. A problem that lives only on the long-term problem list, and was not assessed today, does not get added to this claim because a coding suggestion displayed it.",
      ]),
      prose("Modifiers", [
        "A modifier is a fact about the service: a side, a repeat, a distinct service. If the note describes one side, you bill one side. Modifier 59, or any other modifier, is used when the note shows the services were distinct. It is not a key that removes a warning. NCCI edits are the payer’s rules about pairs of codes. When two lines are bundled, you need a chart fact that they were separate, or you bill the one service that was done.",
      ]),
    ],
    example: {
      title: "Worked example: one side on the note",
      blocks: [
        {
          type: "p",
          text: "The signed note and the order say a left-sided injection at one level. The claim gets that procedure, that side, one unit, and the assessment from today. A right-sided line is not added. A historical neck diagnosis is not pointed at this lumbar line.",
        },
      ],
    },
    exercises: [
      choice(
        "The note documents one side. The scrubber would be quieter if you billed both. What do you bill?",
        [
          "Both sides.",
          "The one side in the note.",
          "Neither, until the revenue board improves.",
          "Whichever CPT has the higher average charge on the dashboard.",
        ],
        "b",
        "Bill the side the note and the order document. A quieter scrubber is not a second side.",
        "The line items copy the visit."
      ),
      textEx({
        prompt: "Where do the procedure and the diagnosis on the claim come from, and when do you send a claim back instead of editing it?",
        groups: [
          ["note", "order"],
          ["assessment", "diagnosis"],
          ["disagree", "conflict", "wait", "provider"],
        ],
        sample:
          "The procedure comes from the signed note and the order. The diagnosis comes from today’s assessment. If the note and the order disagree, I wait and ask the provider instead of editing the claim to match a preference.",
        correction:
          "Take the procedure from the signed note and the order, and the diagnosis from today’s assessment. If they disagree, do not guess. Send it back to the provider.",
        why: "The claim is a reading of the encounter, not a second clinical note.",
      }),
    ],
  }),
  desk({
    id: "bl-number",
    title: "The authorization number on the claim",
    promise: "You can find the approval number the authorization desk stored and place it on the claim that needs it.",
    keyboard: "Open the patient’s authorization or the referral tied to this encounter. Copy the number, the dates, and the units onto the claim field your payer requires. Do not type a number from memory.",
    sections: [
      prose("Where the number lives", [
        "The authorization record holds the status, the number, the dates, and the units. If the status is not approved, you do not invent a number to satisfy a scrubber. You hold the claim or you bill only if your payer and your practice rule say this service does not need authorization. Eligibility being active does not fill this field.",
        "Match the number to this service. An approval for a medication ePA does not ride along on an injection claim. An approval for a different level or a different date range does not get reused because the digits look official.",
      ]),
      prose("Dates and units", [
        "The date of service has to fall inside the approved window, and a unit has to remain. If tomorrow’s procedure was approved and you are billing a different day, stop. If the units are exhausted, stop. Update nothing on the clinical note. Tell the authorization desk, and they work the record.",
      ]),
    ],
    example: {
      title: "Worked example: a number for a different service",
      blocks: [
        {
          type: "p",
          text: "The chart has an approval number for a medication and a still-pending authorization for the injection. The injection claim does not get the medication’s number. It waits. The pending status stays visible for the authorization desk.",
        },
      ],
    },
    exercises: [
      choice(
        "The injection authorization is pending and a medication ePA number is on file. What goes on the injection claim?",
        [
          "The medication number.",
          "No authorization number until the injection itself is approved.",
          "A number from a similar patient.",
          "The eligibility trace number, labeled as an approval.",
        ],
        "b",
        "Only the approval for this service goes on this claim. Pending means you wait.",
        "Numbers are not interchangeable."
      ),
      textEx({
        prompt: "Where do you copy an authorization number from, and when do you leave that field empty?",
        groups: [
          ["authorization", "referral"],
          ["pending", "not approved", "empty", "wait"],
        ],
        sample:
          "I copy the number from the authorization record for this service. If that record is pending or not approved, I leave the field empty and I do not borrow another number.",
        correction:
          "Copy the number from the authorization for this service, and only when the status is approved and the dates and units fit. Otherwise leave it empty and wait.",
        why: "The field should be traceable to one record.",
      }),
    ],
  }),
  desk({
    id: "bl-remit",
    title: "Payments and remits",
    promise: "You can post an electronic remittance against the claim it belongs to and read a denial reason without changing the history.",
    keyboard: "Electronic remittance advice is part of the revenue-cycle tools eClinicalWorks describes: payments come back electronically and are matched to claims. Open the remit, match the claim, then look at the reason codes.",
    sections: [
      prose("Posting", [
        "An electronic remit lists what the payer allowed, paid, adjusted, and denied. You match it to the claim and the line. A payment for a different date of service does not get posted here because the dollars are convenient. Patient payments taken through healow Pay are the patient side. They are not the payer’s remit. Post them where your workflow records patient cash, and do not mix the two totals.",
        "The revenue board’s completion lag and charge graphs are what the posted work adds up to. If a day’s remits are unposted, the board is behind reality. Posting is the daily job. The board is the picture of it.",
      ], [billingPicture]),
      prose("A denial is a reason, not a new story", [
        "Read the reason code and open the same encounter. Either the claim had a fixable error, such as a missing number that is now on the authorization, or the note does not say what the payer wanted. The second kind goes to the provider as a question. You do not edit the old HPI so the remit will look different on appeal. An addendum, if the provider writes one, is a new entry.",
      ]),
    ],
    example: {
      title: "Worked example: paid one line, denied another",
      blocks: [
        {
          type: "p",
          text: "The remit pays the visit and denies the procedure for a missing authorization number. You post the payment on the visit line. You look at the authorization. The number is now approved and fits the date. You correct the claim with that number. You do not alter the Progress Note.",
        },
      ],
    },
    exercises: [
      choice(
        "A remit denies a line because the note lacks a fact. What do you change first?",
        [
          "The HPI, so the appeal has the fact.",
          "Nothing clinical. You ask the provider. You can fix a missing number only if the authorization truly has one.",
          "The revenue board’s average charge.",
          "The patient’s problem list from last year.",
        ],
        "b",
        "A missing clinical fact is the provider’s to document. A missing number can be added only from the real authorization.",
        "Post accurately. Do not renovate the note."
      ),
      textEx({
        prompt: "How do you match a remit to a claim, and what do you refuse to change when the denial is about the story in the note?",
        groups: [
          ["remit", "payment", "era"],
          ["claim", "line", "encounter"],
          ["note", "hpi", "progress note"],
        ],
        sample:
          "I match the remit to the claim and the line for that date of service. If the denial is about the story, I do not change the Progress Note or the HPI. I ask the provider.",
        correction:
          "Match the remit to the claim and line. Post what was paid. If the denial is about the clinical story, leave the Progress Note alone and ask the provider.",
        why: "The remit updates the money. It does not update the history.",
      }),
    ],
  }),
  desk({
    id: "bl-statement",
    title: "Patient statements and healow Pay",
    promise: "You can send a patient balance from the system and keep it separate from what the payer still owes.",
    keyboard: "Statements and patient payments are the collections tools. eClinicalWorks’ V12 page describes healow Pay as a text or electronic bill instead of only paper. The statement is generated from the posted patient balance.",
    sections: [
      prose("Whose balance", [
        "After the remit posts, some dollars may be the patient’s: deductible, coinsurance, a non-covered amount the plan assigned to them. The statement should show that amount, the date of service, and the visit they can recognize. It should not include a line the payer has not adjudicated, unless your practice has a written rule for that case and the statement says so.",
        "healow Pay sends a secure link so the patient can pay electronically. The public page contrasts that with printing and mailing. Use it when the balance is real. A link for a balance you have not posted will collect money you cannot tie to a line.",
      ]),
      prose("Questions you will get", [
        "Patients ask why they owe. You answer from the remit and the statement, not from a new clinical explanation. If they dispute that the service happened, the encounter and the signed note are what the practice has. You do not edit them during a phone call.",
      ]),
    ],
    example: {
      title: "Worked example: a deductible",
      blocks: [
        {
          type: "p",
          text: "The remit applied the injection to the deductible and left a patient balance. You post it, then send a healow Pay statement for that date of service. You do not add last month’s unpaid copay onto the same text unless it is the same posted balance you mean to collect.",
        },
      ],
    },
    exercises: [
      choice(
        "When is a healow Pay link appropriate?",
        [
          "As soon as the appointment is booked.",
          "When a patient balance has been posted from the adjudication.",
          "Whenever the revenue board looks low.",
          "Before eligibility is checked.",
        ],
        "b",
        "Send a pay link for a posted patient balance. Do not collect against a visit the payer has not adjudicated unless your written rule says so.",
        "The statement follows the posted balance."
      ),
      textEx({
        prompt: "What has to be posted before you send a patient statement, and which tool does eClinicalWorks describe for electronic patient payment?",
        groups: [
          ["balance", "patient", "deductible", "remit"],
          ["healow pay", "healow"],
        ],
        sample:
          "The patient balance from the remit has to be posted before I send a statement. Electronic payment uses healow Pay.",
        correction:
          "Post the patient responsibility from the remit first. Then send the statement. healow Pay is the electronic payment link eClinicalWorks describes.",
        why: "A statement is a bill for a posted balance, not a guess.",
      }),
    ],
  }),
  desk({
    id: "bl-appeal",
    title: "Appeals inside the system",
    promise: "You can build an appeal from the denial reason and the signed note without adding new clinical facts.",
    keyboard: "eClinicalWorks’ revenue-cycle pages include appeals. Open the denied claim, read the reason, and generate the appeal from that claim so the dates and the lines stay attached.",
    sections: [
      prose("The appeal packet", [
        "An appeal points at the original claim, the denial reason, and the documents that were already in the chart: the signed note, the authorization number if you now have one, the imaging that was already filed. Generating it from the claim keeps the date of service and the provider lined up. Building it in a blank letter is how account numbers drift.",
        "If the denial says the note does not support the service, the appeal can only repeat what the note says. If that is not enough, the provider has to write an addendum of something that is true. You can list the denial reason for them. You cannot supply the missing exam.",
      ]),
      prose("Timing and status", [
        "Record the date you sent the appeal and the next follow-up on the claim or the task your build uses. A jellybean or a worklist item is how it stays visible. A sent appeal with no follow-up date is how the deadline passes. The revenue board will not tap you on the shoulder for one account.",
      ]),
    ],
    example: {
      title: "Worked example: missing number, now present",
      blocks: [
        {
          type: "p",
          text: "The denial was a missing authorization number. The authorization desk has since stored a number whose dates cover the service. You add that number and send the appeal from the original claim, with the signed note attached. You do not change the level on the claim to a different approved level.",
        },
      ],
    },
    exercises: [
      choice(
        "The denial says the exam does not mention a finding. The note truly does not mention it. What can the appeal claim?",
        [
          "That the finding occurred, because similar visits include it.",
          "Only what the signed note, or a provider’s new addendum, actually says.",
          "A template sentence pasted in for the occasion.",
          "Whatever the revenue board’s top CPT usually includes.",
        ],
        "b",
        "The appeal quotes the record. A missing finding stays missing unless the provider documents it in an addendum.",
        "Appeals are not a second chance to write the visit."
      ),
      textEx({
        prompt: "What do you attach to an appeal, and what do you record so it is not forgotten?",
        groups: [
          ["claim", "denial"],
          ["note"],
          ["date", "follow"],
        ],
        sample:
          "I start from the denied claim and attach the signed note and any authorization already on file. I record the date I sent the appeal and a follow-up date.",
        correction:
          "Build the appeal from the denied claim. Attach the signed note and the real authorization if there is one. Record the send date and the next follow-up.",
        why: "The appeal stays tied to one claim and one chart.",
      }),
    ],
  }),
  desk({
    id: "bl-close",
    title: "Coding prompts and the monthly board",
    promise: "You can use a coding or HCC prompt and the revenue board without letting either one rewrite a visit.",
    keyboard: "The hierarchical coding screen is the value-based tool eClinicalWorks describes: it looks at historical data and shows risk scores. The revenue board is the picture you downloaded with this lesson: charges, lag, and CPT totals.",
    sections: [
      prose("A prompt is a question for the provider", [
        "eClinicalWorks’ hierarchical-condition tools surface problems from historical data and compare scores across years. A line on that screen is not today’s assessment. If it matters, you send it to the provider for a future visit or for an addendum they believe. You do not add the diagnosis to a claim whose note never assessed it.",
        "HEDIS and other quality worklists, also described on the V12 pages, are measures. Closing one means the care was done and recorded. Ticking a box without a note does not complete the measure in any way you can defend.",
      ]),
      prose("Reading the board", [
        "The published revenue picture shows completion lag, average charge, and totals by CPT, provider, or payer. Use it to see where work is stuck: a lag that jumped, a payer that stopped paying, a CPT whose volume changed. Then go back to the claims. The board does not show you a side or a level. It cannot tell you that a code was the right one.",
        "eClinicalWorks also sells a service in which their staff run the back office, at a price they advertise as a percent of collections. If APICO uses that service, your contract says so. The screens in this course are still the ones you need in order to understand what they are doing in your name.",
      ], [billingPicture]),
    ],
    example: {
      title: "Worked example: a code gap and a lag",
      blocks: [
        {
          type: "p",
          text: "The coding screen suggests a diagnosis from last year that today’s note does not assess. You leave it off the claim and route the question to the provider. The revenue board shows completion lag up by several days. You look for unposted remits and unsigned encounters. You do not raise the average charge to improve the graph.",
        },
      ],
    },
    exercises: [
      choice(
        "An HCC-style prompt shows a diagnosis today’s note does not assess. What do you add to this claim?",
        [
          "The prompted diagnosis.",
          "Nothing from that prompt. You may ask the provider to assess it later.",
          "The diagnosis with a modifier so it looks current.",
          "Every historical problem, so the score matches last year.",
        ],
        "b",
        "Historical coding prompts are questions. This claim uses the assessment on this signed note.",
        "The board and the prompt inform a review. They do not replace the note."
      ),
      textEx({
        prompt: "How do you treat a historical coding prompt, and what is the revenue board for?",
        groups: [
          ["note", "assessment", "provider"],
          ["board", "lag", "charge", "summary"],
        ],
        sample:
          "A historical coding prompt stays off this claim unless the provider assessed it in the note. The revenue board is a summary of charges and lag. I use it to find stuck work, then I open the claims.",
        correction:
          "Do not add a historical prompt to a claim the note did not assess. Ask the provider if it belongs in a later visit. Use the revenue board to spot lag and volume, then return to the individual claims.",
        why: "Both screens are downstream of the encounter. The encounter still decides the claim.",
      }),
    ],
  }),
];
