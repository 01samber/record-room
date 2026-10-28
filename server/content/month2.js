export const month2 = {
  id: "law",
  title: "The law on the chart",
  summary:
    "HIPAA, medical necessity, the False Claims Act, and how to read a pain note the way an auditor will.",
  lessons: [
    {
      id: "m2-hipaa",
      week: 5,
      title: "HIPAA for an agent",
      hours: "4–8 hours",
      promise:
        "You can say who is the covered entity, who is the business associate, and what “minimum necessary” changes about a prompt.",
      margin: [
        {
          label: "At APICO",
          text: "A physician practice that transmits claims electronically is a covered entity. Patient information in its charts is protected health information when it identifies the person.",
        },
        {
          label: "The rule",
          text: "If MedOpsHQ creates, receives, maintains, or transmits that information for APICO, it is a business associate and needs a business-associate agreement before the data moves.",
        },
      ],
      weekPlan: [
        "List the identifiers you would strip before any training file is made.",
        "Find out whether your current vendors have signed business-associate agreements. Ask; do not assume a website badge is the agreement.",
        "Submit both exercises.",
        "Write one sentence your front desk can live by.",
      ],
      sections: [
        {
          heading: "The privacy rule in one sitting",
          blocks: [
            {
              type: "p",
              text: "The HIPAA Privacy Rule is the federal rule for when a covered entity may use or disclose protected health information. Protected health information is health information that identifies a person, or could reasonably be used to identify them, and that a covered entity or its business associate holds. A name plus a diagnosis is enough. A rare procedure date plus a small clinic’s schedule is sometimes enough even without the name.",
            },
            {
              type: "p",
              text: "The rule is not a ban on using the chart to get paid. Uses and disclosures for treatment, payment, and health-care operations are permitted, with conditions. Payment includes billing, determining eligibility and coverage, and justification of charges. Operations include quality work and certain administrative tasks. An authorization packet is a payment activity. That permission is not permission to send the whole chart to a random tool, and it is not permission to use more than the task needs.",
            },
          ],
        },
        {
          heading: "Minimum necessary, and why prompts violate it easily",
          blocks: [
            {
              type: "p",
              text: "For payment and operations, the covered entity must make reasonable efforts to limit information to the minimum necessary for the purpose. Treatment disclosures to another provider are outside that standard. An agent drafting an authorization does not need the patient’s entire life history, a photograph, or unrelated behavioral-health notes. Design the tool so it asks for the fields the policy names, not for “the whole PDF, just in case.”",
            },
            {
              type: "p",
              text: "Role-based access is the same idea pointed at people. The person who checks eligibility needs the member ID and the date of service. The person who audits a sample of agent proposals needs the proposal and the cited lines, and may need the note. A vendor’s general chatbot, used by staff as a convenience, is not a role you have defined. Convenience is how charts leak.",
            },
          ],
        },
        {
          heading: "Business associates",
          blocks: [
            {
              type: "p",
              text: "A business associate performs a function or activity for a covered entity that involves protected health information. Coding support, billing, eligibility, and an authorization agent are that kind of work. The contract between APICO and MedOpsHQ has to include the business-associate terms HIPAA requires: permitted uses, safeguards, reporting of breaches, subcontractor flow-down, and return or destruction of information at the end. Staff training does not replace the agreement.",
            },
            {
              type: "p",
              text: "If MedOpsHQ uses a model vendor, a cloud host, or a transcription vendor that can see the chart, that vendor is a subcontractor of the business associate. They need terms at least as strong. “We have an API key” is not a business-associate agreement. Read the vendor’s agreement or do not send the chart.",
            },
            {
              type: "p",
              text: "The Security Rule sits beside the Privacy Rule. It expects administrative, physical, and technical safeguards for electronic protected health information: access control, audit controls, integrity, transmission security, and a response when something goes wrong. You are not being asked to configure a firewall in this lesson. You are being asked to refuse a pilot that has no answer to who can open a chart, how you would know they did, and how a breach would be reported.",
            },
          ],
        },
        {
          heading: "De-identification is a method, not a mood",
          blocks: [
            {
              type: "p",
              text: "HIPAA names two ways to de-identify. Safe Harbor removes a specific list of 18 kinds of identifiers, including names, small geographic units, dates more specific than year (with a narrow age exception), telephone and fax numbers, email, social security and medical-record numbers, account and plan numbers, device identifiers, URLs, IP addresses, biometric identifiers, and full-face photographs, and you must have no actual knowledge that the remaining data can identify the person. Expert determination is a documented statistical opinion that the risk of identification is very small.",
            },
            {
              type: "p",
              text: "Deleting the name and leaving the date of the injection, the clinic, and a rare syndrome is not Safe Harbor. Fictional cases in this course were written as fiction. They are the only charts you should use while you learn. A later pilot on real charts happens after the agreement, the access list, and the de-identification method for any training or demo file are written down.",
            },
          ],
        },
      ],
      example: {
        title: "Worked case: the helpful paste",
        blocks: [
          {
            type: "p",
            text: "A coordinator has a real note that will not fit the payer’s form. They paste it into a consumer chat site and ask for a stronger letter. The site’s terms say it may use inputs to improve the product. There is no business-associate agreement.",
          },
          {
            type: "p",
            text: "That paste is the incident. The right path is dull: a tool under contract, a prompt that requests only the policy’s fields, a human checking every sentence against the note, and a log of who ran it. The coordinator needs a sanctioned place to go, or they will keep using the unsanctioned one. Building that place is part of MedOpsHQ’s job.",
          },
        ],
      },
      exercises: [
        {
          id: "e1",
          kind: "choice",
          prompt:
            "Before MedOpsHQ’s agent processes an APICO chart that includes a patient’s name and member ID, what has to be true?",
          options: [
            { id: "a", text: "The patient has verbally agreed in the waiting room, so no contract is needed." },
            { id: "b", text: "A business-associate agreement is in place, the use is for a permitted purpose such as payment, and the tool is limited to what that task needs." },
            { id: "c", text: "Any software that calls itself HIPAA-compliant on a website is safe for the full chart." },
            { id: "d", text: "HIPAA does not apply to prior authorization, because authorization is optional." },
          ],
          answer: "b",
          why: "Payment is a permitted purpose. It still requires the right parties, the agreement, and a limit on the data.",
          correction:
            "You need a business-associate agreement, a permitted purpose such as payment or operations, and a minimum-necessary design. A marketing claim of compliance is not the agreement. Prior authorization is not outside HIPAA.",
        },
        {
          id: "e2",
          kind: "text",
          prompt:
            "Why is deleting only the patient’s name not enough before a real note is used as a demo or a training example? Mention the agreement idea or the identifier idea in your own words.",
          placeholder: "What else identifies a person, and what contract still matters?",
          min: 80,
          requiredGroups: [
            ["date", "address", "member", "record number", "identifier", "clinic", "photo", "birth"],
            ["agreement", "business associate", "baa", "contract", "not enough", "still identify", "reidentify", "identify"],
          ],
          why: "Identity hides in the leftovers. The contract is a separate requirement from the redaction.",
          correction:
            "A person can be recognized from a visit date, a clinic, a member number, a medical-record number, an address, or a rare combination of facts. Safe Harbor removes a defined list of identifiers, and even then you must not know the data can still identify someone. Separately, a vendor that sees real charts needs a business-associate agreement. Redaction does not replace that contract.",
        },
      ],
    },
    {
      id: "m2-necessity",
      week: 6,
      title: "Medical necessity",
      hours: "4–8 hours",
      promise:
        "You can explain reasonable and necessary, and you know which Medicare contractor to open for Delaware.",
      margin: [
        {
          label: "At APICO",
          text: "Delaware fee-for-service Medicare is Jurisdiction L. Novitas Solutions is the A/B Medicare Administrative Contractor. Part A contractor ID 12101 and Part B contractor ID 12102 are Novitas’s published Delaware numbers.",
        },
        {
          label: "The rule",
          text: "Social Security Act section 1862(a)(1)(A): Medicare does not pay for items or services that are not reasonable and necessary for the diagnosis or treatment of illness or injury.",
        },
      ],
      weekPlan: [
        "Open the CMS page for Jurisdiction L and confirm the contractor has not changed.",
        "Find one Novitas or Medicare Coverage Database article about epidural steroid injections and notice how it lists diagnosis codes. Do not memorize the list.",
        "Submit both exercises.",
        "Write the difference between an authorization and a payment in one sentence and keep it at your desk.",
      ],
      sections: [
        {
          heading: "The sentence Medicare is built on",
          blocks: [
            {
              type: "p",
              text: "Section 1862(a)(1)(A) of the Social Security Act says that, notwithstanding the rest of Medicare, no payment may be made for items and services that “are not reasonable and necessary for the diagnosis or treatment of illness or injury or to improve the functioning of a malformed body member.” That is the root of “medical necessity.” Private plans write their own definitions in certificates of coverage and medical policies. They often rhyme with this sentence. They are not this sentence. Read the plan you are actually billing.",
            },
            {
              type: "p",
              text: "Reasonable and necessary is not “the patient hurts” and it is not “we often do this procedure.” It is a fit between this person’s findings and this service, as the record shows, under a policy that names what fit looks like. For many interventional pain procedures, policies ask about the pain pattern, imaging that agrees, conservative care that was tried, the level and side, and sometimes a measured response to a diagnostic block.",
            },
          ],
        },
        {
          heading: "NCD, LCD, and the article beside them",
          blocks: [
            {
              type: "p",
              text: "A National Coverage Determination is Medicare policy for the whole country. A Local Coverage Determination is a Medicare Administrative Contractor’s policy for its jurisdiction, issued through the process in the Medicare Program Integrity Manual. Billing and coding articles often sit beside an LCD and list the CPT and ICD-10-CM codes the contractor expects. For epidural steroid injections, Medicare articles have listed diagnosis codes that support medical necessity for particular procedure codes, and they tell the provider to code to the highest specificity.",
            },
            {
              type: "p",
              text: "The list is not a menu. The code you send still has to be true. Choosing a listed diagnosis the patient does not have, because the true diagnosis is absent from the list, is not “using the LCD.” It is creating a false claim. If the true condition is not covered, the honest outcomes are a different plan of care, a different payer path, or an advance notice to the patient when the rules for that notice are met. The agent’s job is to show the mismatch, not to repair it with a different diagnosis.",
            },
            {
              type: "p",
              text: "Confirm the LCD that applies on the date of service. Contractors revise articles. A code that supported payment last spring may be limited this autumn. ICD-10-CM itself updates on October 1. CPT updates on January 1. An agent that cached a list and never shows its effective date is a liability.",
            },
          ],
        },
        {
          heading: "Delaware’s contractor",
          blocks: [
            {
              type: "p",
              text: "CMS lists Novitas Solutions as the A/B Medicare Administrative Contractor for Jurisdiction L, which includes Delaware, the District of Columbia, Maryland, New Jersey, and Pennsylvania, plus defined Virginia areas for Part B. Novitas publishes Delaware payer IDs 12101 for Part A and 12102 for Part B. The Jurisdiction L contract has been described by CMS as running, with options, toward 2028. Contracts get re-competed. Before a live packet, confirm the contractor on CMS’s MAC list rather than trusting a course written earlier.",
            },
            {
              type: "p",
              text: "Medicare Advantage is not the same pipe as fee-for-service Medicare. An Advantage plan must cover what Medicare covers, but it may use its own prior-authorization process. Commercial plans and Medicaid managed care have their own policies again. An eligibility response that says “Medicare” is not the end of the question. Which Medicare, and does this plan require authorization for this CPT family?",
            },
          ],
        },
        {
          heading: "Authorization is not a promise of payment",
          blocks: [
            {
              type: "p",
              text: "An approved authorization means the plan gave permission to proceed under its rules. Payment still depends on the claim matching the service performed, the coverage rules on the date of service, and a record that supports necessity. A denied authorization is not repaired by sending the claim anyway with a more favorable code. Staff should read the denial reason. Sometimes the missing item is a date, a level, or an image. Sometimes the plan has said the care is outside its policy. Those are different next steps.",
            },
            {
              type: "p",
              text: "Sedation is a useful example of necessity inside a procedure. Medicare guidance and specialty societies have said that most interventional pain procedures are done with local anesthetic, and that moderate or deep sedation, general anesthesia, or monitored anesthesia care needs a patient-specific reason. A model that adds “MAC anesthesia” to every epidural letter because it has seen those words is inventing both a service and a necessity. The record either contains the reason or the packet does not ask for that service.",
            },
          ],
        },
      ],
      example: {
        title: "Worked case: the listed code that was not true",
        blocks: [
          {
            type: "p",
            text: "A coverage article supports an epidural family when the diagnosis is lumbar radiculopathy. J.R.’s note documents lumbar radiculopathy and a concordant MRI. A.M.’s note documents only unspecified low back pain. A teammate wants A.M. coded as radiculopathy “so we can use the same packet.”",
          },
          {
            type: "p",
            text: "J.R.’s packet can be prepared, still checking conservative care and level. A.M.’s packet cannot borrow J.R.’s diagnosis. The agent should say: the article’s listed code is not the condition in this note. It should not offer a synonym that “usually passes.”",
          },
        ],
      },
      exercises: [
        {
          id: "e1",
          kind: "choice",
          prompt: "For traditional Medicare in Delaware, which statement is the one to verify and then rely on?",
          options: [
            { id: "a", text: "Any commercial payer policy is automatically the Medicare rule in Delaware." },
            { id: "b", text: "Jurisdiction L is administered by Novitas, and you confirm the current LCD or article before treating a code list as coverage." },
            { id: "c", text: "A prior authorization, once granted, guarantees payment even if the record does not match the service." },
            { id: "d", text: "If a diagnosis is on a coverage list, you may use it whenever the procedure is one you know how to perform." },
          ],
          answer: "b",
          why: "The contractor and the article are the map. The chart is still the territory.",
          correction:
            "Delaware fee-for-service Medicare runs through Jurisdiction L, Novitas Solutions. Confirm the current local coverage policy and code the diagnosis the note supports. An authorization is not a guarantee of payment, and a code on a list is not a code you may borrow.",
        },
        {
          id: "e2",
          kind: "text",
          prompt:
            "In your own words, what does “reasonable and necessary” demand of a lumbar injection packet, and what is the agent forbidden to do if a required fact is missing?",
          placeholder: "Talk about the record, the policy, and the missing fact.",
          min: 80,
          requiredGroups: [
            ["record", "chart", "note", "document"],
            ["policy", "lcd", "coverage", "necessary", "necessity"],
            ["invent", "fabricat", "make up", "do not add", "dont add", "must not add", "never add", "not invent"],
          ],
          why: "Necessity is a relationship between a true record and a current policy.",
          correction:
            "The packet has to show that this person’s documented condition fits the policy for this service: the pain pattern, the level, the imaging, and the care already tried, as the current LCD or plan policy requires. If a required fact is missing, the agent lists it and waits. It does not invent the fact to make the service look reasonable and necessary.",
        },
      ],
    },
    {
      id: "m2-false-claims",
      week: 7,
      title: "The False Claims Act",
      hours: "4–8 hours",
      promise:
        "You can name the red lines: upcoding, unbundling, cloned notes, and services the record does not support.",
      margin: [
        {
          label: "At APICO",
          text: "The practice’s name is on the claim even when a vendor prepared the draft. Delegation of typing is not delegation of responsibility.",
        },
        {
          label: "The rule",
          text: "“Knowingly” includes actual knowledge, deliberate ignorance, and reckless disregard. An intent to cheat is not required for civil liability.",
        },
      ],
      weekPlan: [
        "Read the red lines aloud. They are short on purpose.",
        "Mark which ones an eager agent would commit if you rewarded it for approval rate.",
        "Submit both exercises.",
        "Decide the metric you will refuse to use as a bonus. Write it down.",
      ],
      sections: [
        {
          heading: "What the Act is for",
          blocks: [
            {
              type: "p",
              text: "The False Claims Act, 31 U.S.C. §§ 3729–3733, creates civil liability for knowingly presenting a false or fraudulent claim for payment, or a false record material to that claim. In health care, the patterns CMS and the Department of Justice describe include upcoding, billing for services that were not provided, billing for services that were not necessary, and billing for services furnished by an excluded person.",
            },
            {
              type: "p",
              text: "“Knowingly” is wider than a plot. It includes deliberate ignorance and reckless disregard for the truth. A shop that never checks whether the agent’s letters match the notes is in that neighborhood. Civil penalties are adjusted upward for inflation on a regular schedule, and the government can recover up to three times its damages. Do not memorize a dollar figure from a slide. Look up the current civil penalty range when you brief leadership. A separate criminal statute, 18 U.S.C. § 1347, addresses health-care fraud. Exclusion from federal programs is its own catastrophe, because exclusion ends the ability to be paid by those programs.",
            },
            {
              type: "p",
              text: "Private people, including employees, can bring suit in the government’s name. Those are qui tam actions. Retaliation against someone who reports a false claim is its own violation. An operations culture that tells staff to “make the packet work” is a culture that creates whistleblowers or defendants. Sometimes both.",
            },
          ],
        },
        {
          heading: "The red lines, translated",
          blocks: [
            {
              type: "ul",
              items: [
                "Upcoding: choosing a higher visit level or a more intensive procedure code than the service and the decision making support.",
                "Undercoding is a different business problem. Do not “solve” a fear of upcoding by forbidding accurate codes. Code what was done.",
                "Unbundling: billing parts separately when one code already includes those parts, or bypassing an NCCI edit with a modifier the facts do not earn.",
                "Cloned notes: an exam or history that repeats visit after visit, including findings that were not examined today. A scribe that stamps the same normal exam on every APICO patient is a compliance event.",
                "Services not rendered: an authorization or a claim for a level, a side, a drug, or a unit of time that did not happen.",
                "Necessity that was written after the fact: adding conservative care, imaging, or a pain score so a policy is met.",
              ],
            },
            {
              type: "p",
              text: "The Anti-Kickback Statute and the physician self-referral law, Stark, are neighboring federal rules. This course does not clear them. If a pilot pays anyone based on volume of approvals, or steers patients to an entity a physician owns, stop and ask counsel before you design the workflow. An approval agent is not a referral engine.",
            },
          ],
        },
        {
          heading: "How a metric becomes a false claim",
          blocks: [
            {
              type: "p",
              text: "If you tell the team, or the model, that success is the percentage of authorizations approved, you have told them to optimize a payer’s yes. The model will discover that complete-sounding letters get more yeses. It will complete them. The safer metrics are dull: share of packets with every cited fact actually present in the note, coder agreement with the proposed code, time from complete chart to submission, and the rate of invented facts in an audit, which has to stay at zero.",
            },
            {
              type: "p",
              text: "Approval rate is a result you may watch. It is a bad objective. A clinic that documents honestly and selects procedures carefully should see fewer pointless denials. That improvement is a side effect of truth, not a target to chase past the edge of the chart.",
            },
          ],
        },
      ],
      example: {
        title: "Worked case: the modifier that “always works”",
        blocks: [
          {
            type: "p",
            text: "A draft claim pairs a lumbar injection code that includes imaging with a separate fluoroscopy code. The encoder shows an edit. A staff member adds modifier 59 because a forum said 59 gets the second line paid.",
          },
          {
            type: "p",
            text: "The agent you want would block that suggestion and say: the procedure family’s descriptor already includes imaging, so a second imaging code is unbundling unless a qualified coder shows a distinct service the edit allows. “It gets paid” is not a clinical fact and not a defense.",
          },
        ],
      },
      exercises: [
        {
          id: "e1",
          kind: "choice",
          prompt: "Which design is compatible with the False Claims Act?",
          options: [
            { id: "a", text: "Score the agent on approval rate, and let it add typical conservative-care language when the note is thin." },
            { id: "b", text: "Score the agent on whether every sentence it proposes is present in the chart, and require a human to send anything." },
            { id: "c", text: "Clone last month’s normal exam forward so the visit looks complete." },
            { id: "d", text: "Use modifier 59 whenever an edit would otherwise drop a line." },
          ],
          answer: "b",
          why: "The Act punishes reckless falsehood. A citation check and a human sender are how you stay out of reckless.",
          correction:
            "Judge the agent by fidelity to the chart, and keep a person responsible for what is sent. Approval rate as a target, cloned exams, invented conservative care, and automatic modifier 59 are ways a false claim gets built without anyone feeling like a criminal.",
        },
        {
          id: "e2",
          kind: "text",
          prompt:
            "Explain “knowingly” in the False Claims Act to a colleague who says, “We would never intend to commit fraud, so the Act does not apply to an agent’s mistakes.”",
          placeholder: "What does knowingly include besides a plan to cheat?",
          min: 70,
          requiredGroups: [
            ["reckless", "deliberate ignorance", "ignore", "disregard"],
            ["intent", "intend", "meaning to", "on purpose"],
          ],
          why: "A manager who understands this word will not ship an unsupervised writer.",
          correction:
            "Civil liability does not require a plan to cheat. Knowingly includes actual knowledge, deliberate ignorance, and reckless disregard for whether the claim is true. An agent that invents facts, and a team that never checks it, can land in reckless disregard even when nobody set out to defraud Medicare.",
        },
      ],
    },
    {
      id: "m2-read-note",
      week: 8,
      title: "Read a pain note",
      hours: "4–8 hours",
      promise:
        "You can mark a note for level, side, conservative care, imaging, and the sentence that is only decoration.",
      margin: [
        {
          label: "At APICO",
          text: "Multimodal care means the note may mention medicine, therapy, mood, and a procedure. The packet uses the parts the policy asks for, not a summary that flattens them.",
        },
        {
          label: "On the record",
          text: "J.R. and A.M. are fiction. Use them until a real chart is allowed into a contracted system.",
        },
      ],
      weekPlan: [
        "Audit both fictional notes with a pen before you read the worked case a second time.",
        "Make a checklist of eight items you will require on every lumbar packet.",
        "Submit both exercises.",
        "Compare your checklist with a coder’s. Keep the stricter one.",
      ],
      sections: [
        {
          heading: "A note is a set of claims about the world",
          blocks: [
            {
              type: "p",
              text: "Read a pain note as a list of testable sentences. Each sentence either reports something the patient said, something the clinician found, something imaging showed, or a plan. An authorization letter is allowed to repeat those sentences in the payer’s order. It is not allowed to promote a hope into a finding.",
            },
            {
              type: "p",
              text: "SOAP is a useful order. Subjective: what the person reports, including where the pain travels. Objective: exam, and tests already resulted. Assessment: the clinician’s diagnosis. Plan: what will be done. A scribe agent that produces this shape is helpful. A scribe agent that fills empty headings with typical sentences is not.",
            },
          ],
        },
        {
          heading: "The eight marks",
          blocks: [
            {
              type: "ul",
              items: [
                "Where: axial, radicular, or both, and how far the pain travels.",
                "Side: left, right, or both, in words a stranger can find.",
                "Level: the spinal level the clinician named, not the level the model thinks is common.",
                "Time: how long this episode has lasted, in the note’s units.",
                "Conservative care: which treatments, and the dates or durations the note actually gives.",
                "Imaging: the study, the date, and the finding. “MRI in the chart” is not a finding.",
                "Response: if a prior block was done, the relief the note records, not the relief the policy wishes for.",
                "The ask: the procedure the clinician ordered, which must match the procedure code family.",
              ],
            },
            {
              type: "p",
              text: "Policies differ on how many weeks of conservative care they want, and on what percent of relief a diagnostic block must show before a nerve destruction. Some Medicare policies have required two positive medial branch blocks before radiofrequency ablation, with a stated percent of relief. Those numbers are policy. They change. Your agent should retrieve the current line and compare it with the note. It should not memorize 80 percent from this paragraph and then write “80 percent relief” into a chart that says “felt better.”",
            },
          ],
        },
        {
          heading: "Decoration that auditors notice",
          blocks: [
            {
              type: "p",
              text: "“Patient failed conservative care.” Failed which care, and when? “Imaging consistent.” Consistent with what, on what date? “Allergies: none. Lungs clear. Heart regular.” Copied forward from a template on a procedure visit where nobody examined the lungs. “Greater than 80 percent relief” with no pain scores before and after. These sentences are how otherwise honest clinics get into medical-review trouble. Teach the agent to highlight them as weak, not to strengthen them.",
            },
          ],
        },
      ],
      example: {
        title: "Worked case: two notes, one checklist",
        blocks: [
          {
            type: "p",
            text: "J.R., fiction. “Left leg pain to the calf for four months. Exam reproduces the left leg pain. MRI on March 2 shows a disc herniation at L4–L5 contacting the left L5 root. Started physical therapy in January, still going. Plan: left L4–L5 transforaminal epidural.” Marks present: side, radicular pattern, level, imaging date and finding, a start of therapy without an end date, and a named procedure. Missing: enough duration detail if the policy wants a completed course, and any functional score. The agent lists the gaps. It does not add an end date.",
          },
          {
            type: "p",
            text: "A.M., fiction. “Low back pain. No radiation. Will try an injection.” Missing: side is not applicable until a level is chosen, no imaging finding, no conservative care, no named procedure route. There is nothing to authorize yet. The honest output is a list of questions for the clinician, not a letter.",
          },
        ],
      },
      exercises: [
        {
          id: "e1",
          kind: "choice",
          prompt:
            "The note says “failed conservative treatment.” The policy requires documentation of at least four weeks of therapy. What may the agent put in the packet?",
          options: [
            { id: "a", text: "“Completed six weeks of physical therapy,” because four weeks would look thin and six is typical." },
            { id: "b", text: "Only “failed conservative treatment,” plus a visible gap: the note does not name the treatment or the duration." },
            { id: "c", text: "Nothing from the note. Replace the phrase with the policy’s preferred sentence." },
            { id: "d", text: "The phrase, and a pain score of 8 out of 10, which is standard if the score was left blank." },
          ],
          answer: "b",
          why: "Quote what is there. Name what is not. Do not upgrade either.",
          correction:
            "The packet may repeat “failed conservative treatment” and must flag that the treatment and the duration are not in the note. It may not invent six weeks, a pain score, or the policy’s preferred sentence.",
        },
        {
          id: "e2",
          kind: "text",
          prompt:
            "Using the fictional J.R. note in the worked case, list two facts the packet may cite and one fact it must still treat as missing. Write in sentences.",
          placeholder: "Two citations, one gap.",
          min: 70,
          requiredGroups: [
            ["left", "l4", "l5", "mri", "radicul", "calf", "leg"],
            ["missing", "gap", "not stated", "does not", "doesnt", "without", "absent", "unclear"],
          ],
          why: "Citation is a physical skill. You point at words.",
          correction:
            "The packet may cite left leg pain, the L4–L5 imaging finding, and the plan for a left transforaminal injection, because those words are in the note. It must still treat the length and completion of physical therapy as incomplete: January is a start, not proof the policy’s duration was met. Do not fill that gap.",
        },
      ],
    },
  ],
};
