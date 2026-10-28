import { choice, course, phonePicture, prose, scribePicture, textEx } from "./ecw-shared.js";

const desk = course("ecw-scribe", "Virtual scribes");

export const scribeLessons = [
  desk({
    id: "sc-note",
    title: "The Progress Note",
    promise: "You can open a visit and name the parts of the Progress Note a scribe is allowed to touch.",
    keyboard: "From the appointment, open the encounter. The note is the panel titled Progress Note. The public Scribe picture shows it on the right half of the laptop.",
    sections: [
      prose("What you are looking at", [
        "A virtual scribe in eClinicalWorks works inside an encounter, and the encounter’s clinical page is the Progress Note. eClinicalWorks Scribe, on the vendor’s speech-recognition page, is the tool that turns speech or typing into that note on a desktop, on eClinicalTouch, or on eClinicalMobile. Sunoh is a separate ambient product. This lesson is the page both of them land on.",
        "The published laptop picture shows the note open beside a phone that is also in Scribe. Across the top of the laptop is a band of colored circles with letters and counts. That band is the jellybean row: each circle is a queue, and the number is how many items are waiting. Along the bottom of the note are the words Details, Scan, Templates, Claim, Letters, and Ink. You will use Templates often. Claim belongs to billing. You do not need it to draft a note.",
      ], [scribePicture]),
      prose("What a scribe fills", [
        "On that same picture the note is split into Chief Complaint, HPI, current medication, medical history, allergies, review of systems, examination, and assessment. Your job is to put today’s words into the section they belong to. A pain score goes in the HPI. A side and a level go in the HPI and, if a procedure was done, in the procedure sentence. An allergy goes in allergies, not in the HPI paragraph where it will be missed later.",
        "The encounter header above the note carries the patient, the date, the provider, the facility, and the insurance on file. Before you type, read that header. Bear, Milford, and Lewes are different facilities. A note filed under the wrong encounter is the wrong chart.",
      ]),
    ],
    example: {
      title: "Worked example: J.R. is on the schedule",
      blocks: [
        {
          type: "p",
          text: "J.R. is fictional. You open today’s appointment at the Lewes facility, then the encounter, then the Progress Note. The header says Lewes and today’s provider. You do not start dictating until those two lines are right. The phone picture’s Scribe It button is the same job on a smaller screen: it writes into this note, not into a separate document.",
        },
      ],
    },
    exercises: [
      choice(
        "Where does a scribe’s dictation land?",
        [
          "In a separate letter that billing prints at the end of the month.",
          "In the Progress Note of the open encounter.",
          "In the revenue analysis board.",
          "In the patient’s portal message box only.",
        ],
        "b",
        "Scribe writes the Progress Note of the encounter you have open. Check the header before you dictate.",
        "The note and the encounter are the same visit."
      ),
      textEx({
        prompt: "Name the screen you open, two controls you can see on the published picture, and what you check in the header before typing.",
        groups: [
          ["progress note"],
          ["scribe it", "templates", "jellybean"],
          ["facility", "provider", "date", "encounter"],
        ],
        sample:
          "I open the Progress Note of today’s encounter. On the published picture I can see Scribe It and the Templates control, plus the jellybean band. Before typing I check the date, the provider, and the facility in the header.",
        correction:
          "Open the Progress Note for this encounter. Scribe It and Templates are on the published picture, and the jellybean band is the row of circles. Read the date, provider, and facility in the header before you type.",
        why: "The right encounter is the whole job of the first minute.",
      }),
    ],
  }),
  desk({
    id: "sc-find",
    title: "Finding today’s visit",
    promise: "You can get from the schedule to the correct encounter without opening yesterday’s note.",
    keyboard: "Start at the schedule for the facility, open the appointment, then the encounter. Quick Search, at the upper right of the published note, finds a patient when you already know you are in the chart.",
    sections: [
      prose("Schedule, then encounter", [
        "eClinicalWorks keeps the day on a schedule. A pain clinic’s day is split by facility, so the first click is the office: Bear, Milford, or Lewes. Open that provider’s schedule, find the appointment time, and open the encounter from the appointment. The Progress Note you want is the one whose header date matches the appointment.",
        "Quick Search sits at the upper right of the note on the published picture. Use it when you are already in the right chart and need a field. It is not a substitute for checking the facility. Searching a name and landing in last month’s encounter is how a scribe documents the wrong visit.",
      ], [scribePicture]),
      prose("The tabs above the note", [
        "The published picture shows tabs named Encounters, Patient Docs, Flowsheets, and Notes, plus specialty tabs such as Echo and EKG that a pain build may not show. Encounters is the list of visits. Patient Docs is scanned paper and outside records. Flowsheets are trends. Notes is where narrative pieces live. You draft in the Progress Note. You open Patient Docs only to read something already scanned, and you do not retype an outside MRI into today’s HPI unless the provider has told you they reviewed it.",
      ]),
    ],
    example: {
      title: "Worked example: two J.R. visits",
      blocks: [
        {
          type: "p",
          text: "J.R. was seen last month in Bear and today in Lewes. Quick Search finds the chart. The Encounters tab shows both dates. You open today’s Lewes encounter. Last month’s note stays closed. If you dictate into last month’s note, today’s procedure will not be on today’s visit.",
        },
      ],
    },
    exercises: [
      choice(
        "Quick Search has found the patient. What do you still have to match?",
        [
          "Nothing. The first chart with that name is today’s visit.",
          "The encounter date and the facility on the header.",
          "The revenue board’s month.",
          "The portal password.",
        ],
        "b",
        "A name is not a visit. Match the encounter date and the facility before you document.",
        "Search finds a chart. The appointment finds the visit."
      ),
      textEx({
        prompt: "J.R. has two encounters. How do you decide which Progress Note to open?",
        groups: [
          ["date"],
          ["facility", "lewes", "bear", "office"],
          ["encounters"],
        ],
        sample:
          "I look at the Encounters list and open the note whose date is today and whose facility is the office on the appointment, Lewes rather than Bear.",
        correction:
          "Use the Encounters list. Open the Progress Note whose date is this appointment and whose facility is the office on the schedule.",
        why: "Date and facility pick the visit. The name only picks the chart.",
      }),
    ],
  }),
  desk({
    id: "sc-sections",
    title: "Putting words in the right section",
    promise: "You can file a sentence into chief complaint, HPI, ROS, exam, or assessment without mixing them.",
    keyboard: "The section names are the colored headings on the Progress Note in the published picture: Chief Complaint, HPI, ROS, Examination, Assessment.",
    sections: [
      prose("A place for each sentence", [
        "Chief complaint is why the patient came, in a few words: low back pain, neck pain, a follow-up after an injection. HPI is the story of this problem: where, how long, what it feels like, what makes it better or worse, and which treatments were actually described today. Review of systems is the checklist of other symptoms, including the ones the patient denies. Examination is what was looked at or felt. Assessment is the provider’s diagnosis for today.",
        "Current medication, medical history, allergies, surgical history, and social history are on the same note, and the published picture shows them. You update an allergy when one is stated. You do not move a medication list into the HPI to make the paragraph look full.",
      ]),
      prose("Pain visits have a few fields that get lost", [
        "Side and level belong in the HPI and in any procedure line. Left and right are different notes. A duration of therapy belongs in the HPI only when someone said it. If nobody said how long therapy lasted, that line stays empty. A scribe who types a duration to make the note look finished has written something that did not happen.",
        "The phone picture shows a draft with chief complaints, HPI, review of systems, examination, and assessments stacked in one scrolling page. Same sections, smaller screen. Last Text brings back the previous dictation if the engine cut you off. It does not invent the next sentence.",
      ], [phonePicture]),
    ],
    example: {
      title: "Worked example: three sentences, three homes",
      blocks: [
        {
          type: "p",
          text: "The provider says: low back pain for two years; denies fever; mild tenderness on the left at L5. Chief complaint: low back pain. HPI: two years, left, L5. ROS: denies fever. Examination: tenderness on the left at L5. You do not also write that physical therapy lasted six weeks. Nobody said that.",
        },
      ],
    },
    exercises: [
      choice(
        "The provider did not say how long therapy lasted. Where does that duration go?",
        [
          "In the HPI, using a typical number of weeks.",
          "Nowhere. The line stays empty.",
          "In the assessment, so the diagnosis looks complete.",
          "In allergies.",
        ],
        "b",
        "A fact that was not said does not get a section. Leave it empty.",
        "Empty is an accurate note."
      ),
      textEx({
        prompt: "Sort these into sections: low back pain, left L5, denies fever, tenderness on exam. Say what you do with a therapy duration nobody stated.",
        groups: [
          ["chief", "complaint"],
          ["hpi"],
          ["ros", "review of systems", "denies"],
          ["exam"],
          ["empty", "blank", "leave", "omit"],
        ],
        sample:
          "Low back pain is the chief complaint. Left L5 belongs in the HPI. Denies fever belongs in the review of systems. Tenderness belongs in the exam. The therapy duration was not stated, so that line stays empty.",
        correction:
          "Chief complaint holds the reason for the visit. HPI holds the side and level. ROS holds what was denied. Examination holds the tenderness. A duration nobody said stays empty.",
        why: "Each section has one job. An unsaid fact has no section.",
      }),
    ],
  }),
  desk({
    id: "sc-speech",
    title: "Scribe It and the microphone",
    promise: "You can dictate into the note, replay the last text, and name the speech products the vendor documents.",
    keyboard: "On the phone picture, Scribe It is the top-right button and the microphone is the round control at the bottom. On the laptop picture, Scribe It is the panel immediately left of the Progress Note.",
    sections: [
      prose("What eClinicalWorks Scribe is", [
        "eClinicalWorks describes Scribe as speech-to-text inside the EHR. Their V12 page says it partners with speech engines such as Nuance Dragon Medical or M*Modal, and that those engines are fee-based. The dictated words are placed into the relevant section of the Progress Note. Confirm which engine your build actually has. If the microphone does nothing, the engine is not assigned to your login. That is an administrator setting, not a reason to type into the wrong patient.",
        "The phone screen is titled Scribe. Scribe It sends what you just said into the note. Last Text shows the previous capture so you can see what the engine heard. The laptop shows the same Scribe It panel beside the formatted note, so you can watch the words land in Chief Complaint, HPI, and Examination.",
      ], [scribePicture, phonePicture]),
      prose("How to dictate a pain visit", [
        "Say the section, then the fact. “History of present illness. Left-sided low back pain at L5.” Then stop. Read Last Text. If the engine wrote right instead of left, you fix it before you move on. Accents are something the vendor says the engine can handle. Homophones are not. L5 and L4 are easy to swap. You listen for the level.",
        "Desktop, eClinicalTouch on a tablet, and eClinicalMobile on a phone are the three places the vendor says Scribe runs. The note is still one encounter. Dictating on the phone in the hallway files into the chart you opened, which is why the header check from the first lesson still applies.",
      ]),
    ],
    example: {
      title: "Worked example: the engine heard the wrong side",
      blocks: [
        {
          type: "p",
          text: "You say left L5. Last Text shows right L4. You stop. You correct the side and the level in the HPI before you dictate the exam. You do not tap Scribe It again over the mistake and hope the second pass averages them.",
        },
      ],
    },
    exercises: [
      choice(
        "Last Text shows the wrong side. What do you do before the next sentence?",
        [
          "Leave it. The provider enjoys correcting speech engines.",
          "Correct the side in the note, then continue.",
          "Delete the encounter.",
          "Switch the facility so the error belongs to another office.",
        ],
        "b",
        "Read Last Text and correct a wrong side or level before you dictate anything else.",
        "The engine drafts. You compare it with what was said."
      ),
      textEx({
        prompt: "Where is Scribe It on the phone picture, and what do you compare it with after a sentence about side and level?",
        groups: [
          ["scribe it"],
          ["last text", "microphone"],
          ["side", "level", "left", "l5"],
        ],
        sample:
          "Scribe It is the button at the top of the phone screen, next to the microphone. After I dictate the side and level I read Last Text and correct left versus right or L5 versus L4 before I go on.",
        correction:
          "Scribe It is the top button on the phone Scribe screen. The microphone is the round control. After a side and level, read Last Text and correct a swapped side or level before the next sentence.",
        why: "The button files the speech. Last Text is how you see what was filed.",
      }),
    ],
  }),
  desk({
    id: "sc-sunoh",
    title: "Sunoh, when the room is listening",
    promise: "You can tell Sunoh from Scribe, and you know the draft still has to be edited before it enters the note.",
    keyboard: "Sunoh is started for the visit and then imported into the Progress Note. eClinicalWorks says the iPad path is eClinicalTouch and the phone path is eClinicalMobile. Confirm that your login has Sunoh before you look for a button that is not there.",
    sections: [
      prose("A different product", [
        "Sunoh.ai is eClinicalWorks’ ambient scribe. Their product page says it listens to the conversation and drafts a SOAP note, labs, future appointments, and orders. The provider, or the scribe working with the provider, edits that draft and imports it into the Progress Note. It is not the same button as Scribe It. Scribe It is push-to-talk dictation. Sunoh is the room listening.",
        "If your practice has not turned Sunoh on, you will not find it, and you should not describe a missing button as a broken chart. Ask the administrator which documentation tools this login has: Scribe, Sunoh, both, or typing only.",
      ]),
      prose("What you still do by hand", [
        "An ambient draft will miss a level, invent a smooth sentence, or file a denial in the wrong section. Your read is the same as with the microphone. Side, level, and anything nobody said. Import is the moment the draft becomes part of the Progress Note. Read it in the note after import, not only on the Sunoh summary.",
        "Orders that Sunoh pre-fills, including medications, imaging, and referrals, are proposals on the draft. They are not placed until someone accepts them. A scribe does not accept a procedure order the provider did not speak.",
      ]),
    ],
    example: {
      title: "Worked example: a fluent draft with the wrong level",
      blocks: [
        {
          type: "p",
          text: "Sunoh drafts a tidy HPI that says L4. The provider said L5. You change the level in the draft, then import. You also decline a referral Sunoh suggested, because nobody asked for a referral. The Progress Note after import shows L5 and no referral.",
        },
      ],
    },
    exercises: [
      choice(
        "How is Sunoh different from Scribe It?",
        [
          "Sunoh is the billing dashboard.",
          "Sunoh listens to the visit and drafts a note to edit and import. Scribe It takes dictated speech.",
          "They are two names for the Claim button.",
          "Sunoh files the claim.",
        ],
        "b",
        "Scribe It is dictation. Sunoh is ambient listening that you edit and then import into the Progress Note.",
        "Two documentation tools. One note."
      ),
      textEx({
        prompt: "Sunoh’s draft names the wrong level and suggests a referral nobody asked for. What do you change before import?",
        groups: [
          ["level", "l4", "l5"],
          ["referral"],
          ["import", "progress note"],
        ],
        sample:
          "I correct the level in the draft and I remove the referral nobody asked for. Then I import into the Progress Note and read the level there.",
        correction:
          "Correct the level and remove the referral that was not requested. Import into the Progress Note only after that read. Then read the note itself.",
        why: "Import is the commit. The draft is still editable before that.",
      }),
    ],
  }),
  desk({
    id: "sc-templates",
    title: "Templates and order sets",
    promise: "You can start from a template without letting the template’s default sentences become today’s visit.",
    keyboard: "Templates is on the bottom bar of the Progress Note in the published picture. The phone picture shows Use Template under the assessment.",
    sections: [
      prose("What a template is for", [
        "A template is a starting shape: headings, a usual exam, a usual set of orders. eClinicalWorks says Scribe can reach the templates and order sets the practice already built, including from the phone. On the published phone screen, Use Template sits under the assessment. On the laptop, Templates is in the bottom bar next to Scan and Claim.",
        "Order sets are bundles of orders tied to a problem, sometimes from the right side of the chart. The vendor’s older training describes using them from the right chart panel and from templates. In your build, open Templates first. If an order set is offered, it is a list of possible orders, not a list of orders that happened.",
      ], [phonePicture]),
      prose("Defaults are not findings", [
        "A sinus template that says “mild tenderness” will cheerfully describe a back. After you apply a template, read every default sentence. Delete the ones that were not this visit. A pain template may include a normal neurological line. Keep it only if the exam included that line.",
        "The same rule applies to a cloned note, which some practices use as a template from the previous visit. Cloning copies last month, including last month’s side. Change the date-bound facts. A cloned “six weeks of therapy” from a different patient, or from a visit where it was never true, does not become true because the template carried it.",
      ]),
    ],
    example: {
      title: "Worked example: the lumbar template",
      blocks: [
        {
          type: "p",
          text: "You apply the lumbar template. It fills a normal gait and a right-sided default. Today’s exam did include gait, so that sentence stays. The side today is left. You change right to left before you leave the note. You do not apply the template and walk out of the encounter.",
        },
      ],
    },
    exercises: [
      choice(
        "You applied a template and it says the right side. The visit was the left side. What belongs in the note?",
        [
          "The template text, because templates are approved by the practice.",
          "The left side. Change the default before you leave the note.",
          "Both sides, so the template and the visit are both honored.",
          "Neither. Delete the whole encounter.",
        ],
        "b",
        "A template is a start. Replace any default that is not this visit, including the side.",
        "Defaults are suggestions until they match today."
      ),
      textEx({
        prompt: "Where do you open Templates, and what do you do with a default sentence that was not examined today?",
        groups: [
          ["templates", "use template"],
          ["bottom", "phone", "progress note"],
          ["delete", "remove", "change", "replace"],
        ],
        sample:
          "Templates is on the bottom bar of the Progress Note, and the phone shows Use Template. I delete or replace a default sentence that was not examined today, including a wrong side.",
        correction:
          "Open Templates from the bottom bar of the Progress Note, or Use Template on the phone. Remove or rewrite every default that was not this visit.",
        why: "The control starts the template. The read after it decides what stays.",
      }),
    ],
  }),
  desk({
    id: "sc-fix",
    title: "Reading the draft back",
    promise: "You can correct speech and template errors in a fixed order: identity, side, level, then anything that was not said.",
    keyboard: "Use Last Text on the phone, and read the formatted sections on the laptop Progress Note. Both are on the published pictures.",
    sections: [
      prose("A four-line check", [
        "Read the header: patient, date, facility, provider. Then the side, everywhere it appears, including a procedure line and a cloned exam. Then the level. Then scan for a sentence you do not remember anyone saying: a duration, an imaging result, a percent of relief, a medication that is not on the list.",
        "Fix the words in the section where they landed. If the engine put the exam into the HPI, move it. The published note uses separate headings so later readers can find the exam without reading the whole story.",
      ]),
      prose("What you leave blank on purpose", [
        "Blank is a finding about the visit: that item was not captured. A later reader can ask. A filled-in guess cannot be distinguished from a real sentence once the note is signed. Your correction pass is the last moment a scribe owns that difference.",
        "Patient Docs may hold an outside report. You may point the provider at it. You do not paste the report’s conclusion into the assessment unless the provider said they agree with it.",
      ]),
    ],
    example: {
      title: "Worked example: four corrections",
      blocks: [
        {
          type: "p",
          text: "Header is today’s Lewes visit. Good. HPI says right; the provider said left. You change it. The template says L4-L5; the provider said L5. You change it. A sentence about six weeks of therapy has no speaker. You delete it. You leave the therapy line empty.",
        },
      ],
    },
    exercises: [
      choice(
        "Which correction comes before you polish sentences?",
        [
          "The adjectives in the social history.",
          "The header, the side, and the level.",
          "The font on the printed letter.",
          "The revenue board’s colors.",
        ],
        "b",
        "Identity of the visit, then side, then level. Wording comes after those three are right.",
        "A fluent wrong side is worse than a plain right one."
      ),
      textEx({
        prompt: "List the check you run on a draft, and what you do with a therapy duration that has no speaker.",
        groups: [
          ["header", "facility", "date"],
          ["side"],
          ["level"],
          ["delete", "remove", "empty", "blank"],
        ],
        sample:
          "I check the header date and facility, then the side, then the level. A therapy duration with no speaker is deleted so the line stays blank.",
        correction:
          "Check the header, then every side, then every level. Delete a duration, result, or medication that nobody said, and leave that line blank.",
        why: "The check has an order so the dangerous mistakes are caught first.",
      }),
    ],
  }),
  desk({
    id: "sc-handoff",
    title: "Handing the note to the provider",
    promise: "You can leave a draft the provider can sign, and you know which controls are not yours.",
    keyboard: "Stay on the Progress Note. Do not press Claim. Do not lock the note unless your practice has given scribes that exact job, which is uncommon. The provider’s signature is a separate act, covered in the provider course.",
    sections: [
      prose("The handoff", [
        "When the draft is read, you tell the provider it is ready and you name what you changed: a side the engine swapped, a template default you removed, a blank you left on purpose. The provider reads the assessment and the plan, because those are clinical conclusions. A scribe can type the words the provider already said. A scribe does not choose the diagnosis.",
        "Lock, co-sign, and the final signature are the provider’s controls unless your written workflow says otherwise. An unsigned draft is still a draft. People elsewhere in the practice can see it, which is why the blanks have to be honest before you step away.",
      ]),
      prose("Controls you can see and should not use for this job", [
        "Claim, on the bottom bar of the published picture, opens the billing claim for the visit. Letters and Ink are other outputs. Scan brings in paper. None of those finish a scribe’s documentation. If you open Claim by mistake, close it without changing codes.",
        "The jellybean counts at the top are other people’s queues: documents, telephone encounters, labs, referrals. You do not clear someone else’s queue to make the note look done.",
      ], [scribePicture]),
    ],
    example: {
      title: "Worked example: the sentence you say at the door",
      blocks: [
        {
          type: "p",
          text: "You tell the provider: the Lewes note for today is drafted; I changed the side from right to left; therapy duration was not said, so it is blank; the assessment is in your words. You do not lock the note on the way out, and you do not open Claim.",
        },
      ],
    },
    exercises: [
      choice(
        "The draft is ready. Which control do you leave alone?",
        [
          "The Progress Note sections you just corrected.",
          "Claim, and the lock, unless your job description says you sign.",
          "Last Text, while you are still checking the engine.",
          "The header.",
        ],
        "b",
        "Claim and the signature lock are not the scribe’s handoff. The handoff is a corrected draft and a short account of what you changed.",
        "You finish the draft. The provider finishes the note."
      ),
      textEx({
        prompt: "Write the handoff you give the provider, including one correction you would mention and one control you will not press.",
        groups: [
          ["draft", "ready"],
          ["side", "blank", "level", "template"],
          ["claim", "lock", "sign"],
        ],
        sample:
          "The draft is ready for you to read. I corrected the side and left the therapy line blank because it was not said. I will not press Claim and I will not lock or sign the note.",
        correction:
          "Tell the provider the draft is ready, name the correction or the blank, and do not press Claim or lock the note unless that signature is explicitly your job.",
        why: "The handoff names what changed and what you did not finalize.",
      }),
    ],
  }),
];
