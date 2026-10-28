import { choice, course, prose, scribePicture, textEx } from "./ecw-shared.js";

const desk = course("ecw-auth", "Prior authorization");

export const authLessons = [
  desk({
    id: "au-two",
    title: "Two different authorizations",
    promise: "You can tell a medication ePA from a procedure or referral authorization in eClinicalWorks.",
    keyboard: "Medication ePA sits with prescribing. eClinicalWorks’ V12 page describes it as approval of specific medications. Procedure and referral authorizations are tracked on the referral and on the patient’s authorization record. Confirm both labels on a training patient.",
    sections: [
      prose("Medication ePA", [
        "The public V12 description places electronic prior authorization next to electronic prescribing of controlled substances. The job it describes is a medication: the prescriber requests approval so the pharmacy can fill. If your build has that function, you will find it on the prescription, not on the revenue analysis board and not on a lumbar procedure order.",
        "A pain practice writes many medication requests and many procedure requests. They leave through different doors. Putting an injection into the medication ePA queue, or a drug into the referral queue, creates a request the payer cannot match.",
      ]),
      prose("Procedure and referral authorization", [
        "An injection, a radiofrequency procedure, a trial, or an imaging study is authorized as a service. eClinicalWorks keeps referrals in their own queue. The published Scribe picture’s top band includes an R circle among the jellybeans. In common builds that R is referrals. Hover it in your system and read the tooltip before you teach the letter to a new hire. The count on the circle is how many referral items are waiting.",
        "The authorization record itself holds the payer, the service, the dates, the units or visits, and, once you have it, the approval number. You create that record from the patient or from the referral. You do not create it by editing the Progress Note’s HPI.",
      ], [scribePicture]),
    ],
    example: {
      title: "Worked example: a drug and an injection on the same day",
      blocks: [
        {
          type: "p",
          text: "J.R. is fictional. The provider prescribed a medication that needs ePA and ordered a left L5 injection that needs a plan authorization. You finish the medication on the prescribing screen. You open a separate authorization for the injection, tied to the order and to the signed note. You do not attach the injection to the drug’s ePA.",
        },
      ],
    },
    exercises: [
      choice(
        "Where does eClinicalWorks’ public V12 page put electronic prior authorization?",
        [
          "On the revenue analysis board, for every CPT code.",
          "With prescribing, for specific medications.",
          "Inside Scribe It.",
          "On the patient portal’s bill-pay page.",
        ],
        "b",
        "The public page describes ePA for medications in the prescribing workflow. A procedure authorization is a different record unless your build clearly uses one screen for both.",
        "Read the queue before you drop a request into it."
      ),
      textEx({
        prompt: "A visit has both a medication that needs approval and an injection that needs approval. How many paths do you use, and what is each one for?",
        groups: [
          ["medication", "epa", "prescrib"],
          ["procedure", "injection", "referral"],
        ],
        sample:
          "I use the prescribing path for the medication ePA and a separate referral or authorization record for the injection. They are not the same request.",
        correction:
          "Use medication ePA for the drug. Use the referral or procedure authorization for the injection. Do not put both in one queue.",
        why: "Two approvals, two records, even on one visit.",
      }),
    ],
  }),
  desk({
    id: "au-coverage",
    title: "Eligibility before you request",
    promise: "You can run eligibility from the patient’s coverage and read it as coverage, not as approval.",
    keyboard: "Eligibility is opened from the patient’s insurance, from the appointment, or from the billing tools. eClinicalWorks’ revenue-cycle pages describe eligibility checking as its own step. Find Insurance or Eligibility on the patient or the appointment.",
    sections: [
      prose("What you are checking", [
        "Eligibility tells you whether the plan on file is active and what the response says about the benefit. It does not approve an injection. A patient can be eligible and still need authorization. A patient can have an old authorization and a new plan that does not honor it.",
        "Read the payer, the member id, the group, and the dates on the response. Front-office tools such as healow check-in may have collected a card earlier. You still read the response close to the request. A card photo from January is not a March benefit.",
      ]),
      prose("When the response is unclear", [
        "If the response does not say whether this service needs authorization, you do not guess from a similar patient. You use the payer’s current rule or you call. Then you write what you learned on the authorization record: required, not required, or still unknown. Unknown is a status. It is not a reason to mark the service approved.",
        "Jellybean counts will later tell you about failed eligibility checks if your build routes them there. The check itself happens on the coverage, before those alerts exist.",
      ]),
    ],
    example: {
      title: "Worked example: active coverage, no authorization",
      blocks: [
        {
          type: "p",
          text: "Eligibility returns active coverage for J.R. The response does not include an approval number for the injection. You record that coverage is active and that authorization is still required. You do not tell the scheduler the procedure is approved.",
        },
      ],
    },
    exercises: [
      choice(
        "Eligibility says the plan is active. What do you know about the injection?",
        [
          "It is authorized.",
          "The plan is active. Authorization is a separate question.",
          "The claim has been paid.",
          "The Progress Note is locked.",
        ],
        "b",
        "Active eligibility is not an authorization number. Check the requirement and keep the request open until you have an answer.",
        "Coverage and permission are different screens."
      ),
      textEx({
        prompt: "What do you read on an eligibility response, and why is that not the same as an approval number?",
        groups: [
          ["eligib", "coverage", "active"],
          ["authorization", "approval"],
        ],
        sample:
          "I read whether coverage is active and which plan responded. That is not an authorization. An approval number is a separate result on the authorization record.",
        correction:
          "Read the plan, the member, and whether coverage is active. Authorization, including any approval number, is recorded on the authorization, not assumed from eligibility.",
        why: "The eligibility response answers a narrower question than the staff often think.",
      }),
    ],
  }),
  desk({
    id: "au-record",
    title: "The authorization record",
    promise: "You can name the fields an authorization record needs before anyone submits it.",
    keyboard: "Open the referral or the patient’s authorizations. The fields to fill are payer, service, diagnosis, provider, place, dates, and units or visits. Attach the note from the encounter after the provider has signed it.",
    sections: [
      prose("The fields", [
        "A usable authorization record names the payer and plan, the ordering provider, the place of service, the CPT or HCPCS the provider ordered, the ICD-10 on the signed assessment, the number of visits or units, and the dates you are requesting. If the order says left L5 and the note says left L5, those words go on the request. If they disagree, you stop and ask the provider. You do not pick the level that the plan prefers.",
        "Supporting material is the signed Progress Note, and imaging or a medication list when the plan asks for them. Patient Docs is where scanned reports live. You attach the document that is already in the chart. You do not type a report you do not have.",
      ]),
      prose("Status words your team should share", [
        "Use a short set of statuses and do not invent personal ones: not started, submitted, pending, more information requested, approved, denied, expired. Put the status on the record, with the date you last touched it. A request sitting in someone’s memory is not a status.",
        "The R jellybean, if that is referrals in your build, is the queue of items assigned to people. The record is the file. Clearing the jellybean without updating the record hides the work.",
      ]),
    ],
    example: {
      title: "Worked example: note and order disagree",
      blocks: [
        {
          type: "p",
          text: "The order says left L4. The signed note says left L5. You do not submit. You send the question back to the provider. The authorization stays in not started, with a note that the level conflicts. You do not attach a corrected sentence of your own.",
        },
      ],
    },
    exercises: [
      choice(
        "The signed note and the order name different levels. What is the status of the request?",
        [
          "Submitted, using the level the plan covers.",
          "Not started, until the provider resolves the level.",
          "Approved, because the note is signed.",
          "Denied, so billing can appeal.",
        ],
        "b",
        "Do not submit a conflict. Leave the request unsent and ask the provider which level was treated.",
        "The record waits on the chart. It does not repair the chart."
      ),
      textEx({
        prompt: "List four fields you put on an authorization record, and what you do when the note and the order disagree.",
        groups: [
          ["payer", "plan"],
          ["cpt", "procedure", "service"],
          ["provider", "diagnosis", "dates", "units"],
          ["ask", "provider", "stop", "do not submit"],
        ],
        sample:
          "I record the payer, the service or CPT, the provider, and the dates or units. If the note and the order disagree I stop and ask the provider. I do not submit.",
        correction:
          "Record payer, service, diagnosis, provider, place, dates, and units. If the note and the order disagree, do not submit. Ask the provider.",
        why: "The record is complete or it is waiting. It is not creatively completed.",
      }),
    ],
  }),
  desk({
    id: "au-submit",
    title: "Submitting and writing down the proof",
    promise: "You can submit on the path the plan uses and store the reference number on the authorization.",
    keyboard: "Submit from the ePA screen for a medication, or through the plan’s channel for a procedure, then type the reference number onto the eClinicalWorks authorization. The portal is not the chart until you copy the number back.",
    sections: [
      prose("Where the request actually goes", [
        "A medication ePA may leave electronically from the prescription. A procedure request may leave through a payer portal, a fax, or a clearinghouse path your practice has turned on. eClinicalWorks documents electronic authorization for specific services and payers, not for every injection at every plan. Use the path your payer grid says to use. Then come back.",
        "Coming back means the reference or confirmation number, the date you sent it, and the status submitted are on the authorization in eClinicalWorks. A confirmation that exists only in a portal login will be invisible to billing and to the person who covers your desk tomorrow.",
      ]),
      prose("What you do not send", [
        "You send the signed note and the documents the plan asked for. You do not rewrite the HPI in the portal so the story matches a policy. If a required fact is missing from the note, the status becomes more information requested, and the provider is the person who can add it. You can prepare the question. You cannot answer it with a new clinical sentence.",
      ]),
    ],
    example: {
      title: "Worked example: the portal says received",
      blocks: [
        {
          type: "p",
          text: "The plan’s portal gives you a reference number and says received. You type that number and today’s date onto the authorization in eClinicalWorks and set the status to submitted. You do not tell the patient it was approved. Received is not approved.",
        },
      ],
    },
    exercises: [
      choice(
        "The portal says the request was received. What status do you store?",
        [
          "Approved.",
          "Submitted, with the reference number and the date.",
          "Denied.",
          "Eligible, so no number is needed.",
        ],
        "b",
        "Received means submitted. Store the reference number and the date. Approval is a later status.",
        "The chart should show the same status as the payer’s last message."
      ),
      textEx({
        prompt: "After you submit, what do you write back onto the eClinicalWorks authorization, and what do you do if the note is missing a fact the plan wants?",
        groups: [
          ["reference", "confirmation", "number"],
          ["date"],
          ["provider", "missing", "do not"],
        ],
        sample:
          "I write the reference number and the date on the authorization and mark it submitted. If a fact is missing I ask the provider. I do not type a new clinical sentence into the portal.",
        correction:
          "Store the reference number, the date, and the status submitted. If the note lacks a fact, ask the provider. Do not invent the fact in the portal.",
        why: "The portal receipt belongs on the chart, and the chart’s gaps stay gaps.",
      }),
    ],
  }),
  desk({
    id: "au-follow",
    title: "Jellybeans and the daily queue",
    promise: "You can work the referral queue and the status list without losing a request that is about to expire.",
    keyboard: "The jellybean row is the band of colored circles at the top of the published picture. Hover the R circle. If it is referrals, that is your queue. Also open the authorization list and sort by follow-up date.",
    sections: [
      prose("What the circles are for", [
        "Each jellybean is a count of work assigned in that category. Documents, telephone encounters, labs, and referrals are the queues people mention most often, and the published picture shows D, T, L, and R among the circles. Your build’s tooltip is the authority for the letter. The number is how many items are open, not how many are approved.",
        "Open the circle, take an item, update the authorization record, and leave a date for the next touch. Closing the item in the queue and forgetting the record, or updating the record and leaving the queue item, splits the work in two. Do both.",
      ], [scribePicture]),
      prose("Aging and expiry", [
        "An approved authorization has an end date and a number of units or visits. Before you schedule against it, read those fields. An expired number is not a number. Put expirations on a daily or weekly pass so they surface before the day of the procedure.",
        "When the payer asks for more information, the status changes and the provider gets a specific question. The jellybean is how you notice that ask. The record is how you remember what was asked.",
      ]),
    ],
    example: {
      title: "Worked example: a circle with twelve items",
      blocks: [
        {
          type: "p",
          text: "The referral circle shows 12. Three of them are J.R.’s injection, still submitted, with no follow-up date. You open the record, see that it was sent five days ago, and set a follow-up for tomorrow. You do not mark it approved to make the count drop.",
        },
      ],
    },
    exercises: [
      choice(
        "The referral jellybean count dropped because someone cleared the queue. The authorization has no follow-up date. Is the work done?",
        [
          "Yes. A lower count means the payer approved it.",
          "No. The record still needs a status and a next date.",
          "Yes, if the circle is green.",
          "Only billing can tell, from the revenue board.",
        ],
        "b",
        "The circle is a queue. The authorization record is the file. Both need to agree, including the next follow-up date.",
        "Clearing a count is not a decision from the payer."
      ),
      textEx({
        prompt: "How do you use the jellybean row during a day’s authorization work, and what date do you watch on an approval?",
        groups: [
          ["jellybean", "queue", "circle"],
          ["expir", "end date", "units", "visits"],
        ],
        sample:
          "I open the referral jellybean, update the authorization record, and set the next follow-up. On an approval I watch the end date and the units or visits.",
        correction:
          "Work the referral circle and the authorization record together. On an approval, read the end date and the remaining units or visits before anyone schedules.",
        why: "The queue reminds you. The record holds the payer’s terms.",
      }),
    ],
  }),
  desk({
    id: "au-decision",
    title: "Recording approved, denied, or pending",
    promise: "You can store a decision so scheduling and billing can see the number, the dates, and the limits.",
    keyboard: "On the authorization, fill approval number, effective dates, units or visits, and any condition the payer wrote. Status becomes approved or denied. Pending stays pending until you have that message.",
    sections: [
      prose("Approved", [
        "An approval is a number plus a window. Write the number, the start, the end, and how many visits or units. If the payer approved a different level or a different count than you requested, write what they approved, not what you wish they had approved. Scheduling needs the window. Billing needs the number on the claim later.",
        "Tell the scheduler with the record, not with a hallway sentence. The record is the thing they can open on the day of the procedure.",
      ]),
      prose("Denied or still pending", [
        "A denial gets the reason, the date, and whether you are asking the provider for an appeal. You do not change the Progress Note to answer the denial. Pending means you do not have a decision. It is a normal status for several days. It is not a soft approval.",
        "More information requested is its own status. Quote the payer’s question on the record so the provider sees the question rather than a vague flag.",
      ]),
    ],
    example: {
      title: "Worked example: approved for one side, one date range",
      blocks: [
        {
          type: "p",
          text: "The plan approves the left L5 injection, one encounter, between two dates. You enter the number and those dates. You do not add the right side because the note mentioned it last year. You set a reminder before the end date.",
        },
      ],
    },
    exercises: [
      choice(
        "The payer has not answered. How do you mark the authorization?",
        [
          "Approved, so the patient can be scheduled.",
          "Pending, until a decision arrives.",
          "Denied, to start an appeal early.",
          "Eligible.",
        ],
        "b",
        "No decision means pending. Do not schedule or bill as if a number exists.",
        "Pending is a real status."
      ),
      textEx({
        prompt: "What four things do you store when a procedure is approved, and how do you mark a request with no answer yet?",
        groups: [
          ["number"],
          ["date"],
          ["unit", "visit"],
          ["pending"],
        ],
        sample:
          "I store the approval number, the start and end dates, and the units or visits. If there is no answer yet I leave the status pending.",
        correction:
          "Store the number, the effective dates, and the units or visits, including any limit the payer set. With no decision, the status stays pending.",
        why: "Scheduling and billing read these fields. A verbal “it’s fine” does not fill them.",
      }),
    ],
  }),
  desk({
    id: "au-docs",
    title: "Documents you can attach",
    promise: "You can find a scanned note or image in Patient Docs and attach that file instead of describing it from memory.",
    keyboard: "Patient Docs is a tab above the note on the published picture. The D jellybean is the document queue. Open the document, confirm it is this patient and this study, then attach it to the authorization.",
    sections: [
      prose("Two doors to the same file", [
        "Patient Docs on the chart is the folder of scanned and imported files for this person. The documents jellybean is the inbox of files that arrived and may not be filed yet. For an authorization you want a file that is already matched to the patient. If it is still sitting in the inbox under the wrong name, file it correctly before you attach it.",
        "Outside imaging may also appear through PRISMA. That is the provider’s search. If the provider has imported the document into the chart, you can attach the imported file. If it is only visible in PRISMA and not in Patient Docs, ask the provider to bring it in. You do not retype the radiologist’s impression into the authorization comments.",
      ], [scribePicture]),
      prose("Match the file to the request", [
        "Read the date and the body part on the scan. An old cervical MRI does not support a lumbar request. Attach the study the note discusses. Name the attachment in a way the next person understands: MRI lumbar, date. A file called scan2.pdf will be opened by nobody.",
      ]),
    ],
    example: {
      title: "Worked example: the inbox has the right scan under a nickname",
      blocks: [
        {
          type: "p",
          text: "The D jellybean holds a lumbar MRI labeled with a nickname. You match it to J.R., file it in Patient Docs, check the date and the lumbar label, and attach that file to the authorization. You do not attach last year’s cervical study because it was easier to find.",
        },
      ],
    },
    exercises: [
      choice(
        "The report you need is only visible in PRISMA and is not in Patient Docs. What do you attach?",
        [
          "A summary you type from memory.",
          "Nothing yet. Ask the provider to import it, then attach the file.",
          "Any PDF already in the folder.",
          "The eligibility response.",
        ],
        "b",
        "Attach a file that is in the chart and matched to this patient and this study. Ask for the import if it is not there.",
        "Comments are not a substitute for the document."
      ),
      textEx({
        prompt: "Where do you find a scanned report, and what do you check on it before attaching it to an authorization?",
        groups: [
          ["patient docs", "documents", "jellybean"],
          ["date"],
          ["patient", "body", "lumbar", "study"],
        ],
        sample:
          "I find the scan in Patient Docs or file it from the documents jellybean. I check the patient, the date, and the body part before I attach it.",
        correction:
          "Use Patient Docs for a filed document, or the documents queue to file one. Check the patient, the date, and the study before you attach it.",
        why: "The wrong PDF is a confident mistake.",
      }),
    ],
  }),
  desk({
    id: "au-hand",
    title: "What scheduling and billing need from you",
    promise: "You can leave an authorization that another desk can use without calling you.",
    keyboard: "The fields they open are on the authorization: status, number, dates, units, and the encounter it belongs to. Claim is not your button. It is on the bottom of the Progress Note for billing.",
    sections: [
      prose("A record someone else can read", [
        "Scheduling needs to know if they may book: status approved, dates that cover the appointment, units left. Billing needs the number on the day they build the claim, and they need the encounter the service was billed from. If those fields are full, they do not need your memory.",
        "If the status is anything else, say so on the record in the status field, not only in a sticky note. Pending, denied, and more information requested are schedulable only under a rule your practice wrote down. They are not silent approvals.",
      ]),
      prose("The note stays the provider’s", [
        "You may tell a provider that a plan asked for a missing duration or a missing level. The provider edits the Progress Note or writes an addendum. You update the authorization after that edit exists. You do not change the assessment, the HPI, or the order to help the request along.",
        "When the visit is complete and the claim is next, your remaining job is to make sure the approval number is on the authorization that billing will see. Then stop. The Claim button is their screen.",
      ]),
    ],
    example: {
      title: "Worked example: the day before the procedure",
      blocks: [
        {
          type: "p",
          text: "Tomorrow’s schedule includes J.R.’s injection. You open the authorization. Status is approved, the date range covers tomorrow, one unit is unused, the number is filled in, and the note and the order both say left L5. You leave it. If any one of those is wrong, you pull it off the schedule rather than hoping billing will sort it out after the visit.",
        },
      ],
    },
    exercises: [
      choice(
        "Billing asks you to add a sentence to the HPI so the request looks stronger. What do you change?",
        [
          "The HPI.",
          "Nothing clinical. You ask the provider if the fact is true.",
          "The approval number, inventing one for the day.",
          "The facility on the encounter.",
        ],
        "b",
        "You do not edit the clinical note to strengthen a request. The provider documents a true fact, or the request stays incomplete.",
        "Your screen is the authorization. Theirs is the note."
      ),
      textEx({
        prompt: "Which fields must be filled before scheduling can book against an approval, and who edits the Progress Note if a fact is missing?",
        groups: [
          ["status", "approved"],
          ["number"],
          ["date", "unit", "visit"],
          ["provider"],
        ],
        sample:
          "Scheduling needs the status approved, the approval number, the dates, and the units. If a clinical fact is missing, the provider edits the Progress Note. I do not.",
        correction:
          "An approval other people can use shows status, number, dates, and units. The provider edits the Progress Note. You update the authorization after that.",
        why: "The handoff is a complete authorization record, not a conversation.",
      }),
    ],
  }),
];
