export const month5 = {
  id: "packet",
  title: "The packet",
  summary:
    "What goes into a prior-authorization request, what CMS-0057-F changes, and how a denial is answered without a new story.",
  lessons: [
    {
      id: "m5-packet",
      week: 17,
      title: "What the packet holds",
      hours: "4–8 hours",
      promise:
        "You can name the pieces of a request and the piece that must remain a person’s job.",
      margin: [
        {
          label: "At APICO",
          text: "Image-guided spine procedures are where packets get long: level, side, guidance, drug, and the story of why this is the next step.",
        },
        {
          label: "On the record",
          text: "Assemble quotes. Do not compose a better patient.",
        },
      ],
      weekPlan: [
        "Lay out a one-page packet template with empty fields. No sample sentences that staff might reuse as facts.",
        "Mark which fields come from eligibility, which from the note, which from the clinician.",
        "Submit both exercises.",
        "Review the template with whoever submits requests today. Cut any field they do not actually send, and add any field they do.",
      ],
      sections: [
        {
          heading: "A packet is a folder, not a performance",
          blocks: [
            {
              type: "p",
              text: "A prior-authorization request tells a plan who the patient is, who the clinician is, what is being asked, and why the record supports it under that plan’s rule. For a lumbar injection at a practice like APICO, the folder usually needs: patient and plan identifiers, the ordering clinician, the place of service, the diagnosis codes a coder accepted, the procedure being requested, the level and side, imaging with date and finding, conservative care with dates, relevant exam lines, and any prior procedure with the relief the note records.",
            },
            {
              type: "p",
              text: "The prose that ties those items together should be almost boring. Short quotes beat adjectives. “Debilitating, failed all measures, excellent candidate” is the shape models love and reviewers learn to distrust. If a sentence has no quote under it, it does not go in.",
            },
          ],
        },
        {
          heading: "Who fills which line",
          blocks: [
            {
              type: "p",
              text: "Eligibility agent: plan name, member ID checked, active or not, date of the check, authorization flag if the payer sent one. Completeness agent: the gap table, already cleared or still open. Code-candidate agent: families for a coder to confirm. Clinician: the order, including route, level, and side. Coder: the codes that will be requested, looked up in the licensed source. MedOpsHQ operator: assembly of the packet and a final comparison of every sentence to a quote. The send button: a named person, not a model.",
            },
            {
              type: "p",
              text: "Place of service is easy to skip and expensive to get wrong. Confirm whether this procedure is in the office, an ambulatory surgery center, or a hospital outpatient department. Do not infer an ASC from the fact that many pain procedures happen in one. APICO’s public pages describe clinics and image-guided care; they do not, by themselves, tell you the place of service for a given case.",
            },
          ],
        },
        {
          heading: "The drug and the guidance",
          blocks: [
            {
              type: "p",
              text: "If a drug will be billed, the packet and the later claim need the drug the clinician is actually using, not a default steroid the template likes. HCPCS drug codes and national drug codes are a coder’s lookup. Imaging guidance belongs in the packet only as the note describes it. If the CPT family already includes guidance, the packet should not describe a second imaging service. You are requesting the service, not decorating it.",
            },
          ],
        },
      ],
      example: {
        title: "Worked case: a folder with one open gap",
        blocks: [
          {
            type: "p",
            text: "J.R.’s folder has identifiers checked this morning, a signed plan for a left L4–L5 transforaminal injection, an MRI quote, an exam quote, and an open gap on therapy duration. Status: not ready to send. The operator’s next action is to request the therapy record, not to generate a PDF.",
          },
        ],
      },
      exercises: [
        {
          id: "e1",
          kind: "choice",
          prompt: "Who may press send on a payer request in the pilot?",
          options: [
            { id: "a", text: "The agent, once every gap row is either quoted or marked “typical for this procedure.”" },
            { id: "b", text: "A named person, after the gap table is clear and the codes were accepted by a coder." },
            { id: "c", text: "Whoever is at the front desk, so the clinician is not delayed." },
            { id: "d", text: "The model vendor, because they host the portal connection." },
          ],
          answer: "b",
          why: "Sending is an act of the practice. It stays with a person you can name in a log.",
          correction:
            "A named person sends, and only after gaps are actually closed and a coder has accepted the codes. The agent, the front desk under pressure, and the vendor do not get the button.",
        },
        {
          id: "e2",
          kind: "text",
          prompt:
            "Name three items a lumbar injection packet should contain, and one item the agent must not create if the note lacks it.",
          placeholder: "Three contents, one forbidden creation.",
          min: 70,
          requiredGroups: [
            ["level", "side", "imaging", "mri", "diagnosis", "procedure", "therapy", "conservative", "clinician"],
            ["invent", "must not", "do not create", "dont create", "not create", "never"],
          ],
          why: "Contents and bans should both be in your template.",
          correction:
            "A sound packet includes the procedure with level and side, the imaging finding and date, and the conservative care that was documented, among other identifiers and codes. If therapy dates or a pain score are absent, the agent must not create them to complete the folder.",
        },
      ],
    },
    {
      id: "m5-cms",
      week: 18,
      title: "CMS-0057-F",
      hours: "4–8 hours",
      promise:
        "You can explain the prior-authorization rule without pretending every Medicare injection now flows through one national API.",
      margin: [
        {
          label: "At APICO",
          text: "Advantage plans and commercial plans are often where authorization delay actually hurts a Delaware pain clinic. Fee-for-service Medicare is a different channel.",
        },
        {
          label: "The rule",
          text: "CMS-0057-F is the 2024 Interoperability and Prior Authorization final rule. API dates have already moved. Confirm them on CMS.gov before you put a year in a contract.",
        },
      ],
      weekPlan: [
        "Read the CMS summary of CMS-0057-F, not a vendor’s paraphrase.",
        "Write down three payer types the rule touches and one it does not automatically turn into an API.",
        "Submit both exercises.",
        "Ask your billing lead which APICO payers, in practice, require authorization for spine injections.",
      ],
      sections: [
        {
          heading: "What the rule is trying to do",
          blocks: [
            {
              type: "p",
              text: "CMS published the Interoperability and Prior Authorization final rule, CMS-0057-F, on January 17, 2024. It builds on the earlier interoperability and patient-access rule. The aim is practical: payers should share data, accept prior-authorization requests electronically, decide within stated times, and give a specific reason when they deny. Patients and clinicians have been losing days to portals and faxes. The rule pushes impacted payers toward APIs, including a Prior Authorization API, using the FHIR standard.",
            },
            {
              type: "p",
              text: "Impacted payers in the rule include Medicare Advantage organizations, state Medicaid and CHIP fee-for-service programs, Medicaid and CHIP managed care, and qualified health plan issuers on the federal exchanges. That is a wide set. It is not a statement that every traditional Medicare fee-for-service pain injection is now an API prior authorization. Do not design the APICO pilot as if Novitas will behave like an Advantage plan’s portal. Ask, for each payer, what channel exists today.",
            },
          ],
        },
        {
          heading: "Clocks and reasons",
          blocks: [
            {
              type: "p",
              text: "The final rule sets decision times for the prior authorizations it covers: as short as 72 hours for an expedited request and seven calendar days for a standard request, for impacted payers. It also expects a specific reason for a denial, not a shrug. Those clocks are useless to you if the request was missing the level and the imaging, because the plan’s clock and your completeness problem are different delays. Fix the packet first. Then measure how long the payer takes.",
            },
            {
              type: "p",
              text: "CMS has said impacted payers must meet certain provisions earlier and the API requirements primarily by January 1, 2027, after commenters were given more time. Dates in a final rule can be revised again. Your vendor contract should cite “the current CMS compliance date,” and someone on your side should check it twice a year. A hardcoded “we are ready for 2026” slide is how projects miss the real date.",
            },
          ],
        },
        {
          heading: "FHIR, without the costume",
          blocks: [
            {
              type: "p",
              text: "FHIR is a standard for exchanging health data as resources: a patient, a coverage, a procedure request, a document. An API is a defined way for two systems to ask and answer. You do not need to build one in this bootcamp. You do need to know that the old X12 278 prior-authorization transaction and the newer FHIR API are in a transition. Federal guidance has included enforcement discretion so that a HIPAA covered entity using the FHIR prior-authorization API described in the rule is not punished for not also using X12 278 for that flow. The practical meaning: the channel depends on the payer and the year. Your agent produces a complete, true packet. The transport is a separate engineering choice.",
            },
            {
              type: "p",
              text: "Whatever the channel, the log remains. You keep what was sent, when, by whom, and the payer’s response, including the denial reason in the payer’s words. That log is how you appeal honestly and how you notice a model that started embellishing in March.",
            },
          ],
        },
      ],
      example: {
        title: "Worked case: the year on the slide",
        blocks: [
          {
            type: "p",
            text: "A vendor says, “CMS requires every payer to approve epidurals through our API this January.” You answer: CMS-0057-F applies to defined impacted payers, pushes a Prior Authorization API on a compliance date that has already been extended, and does not erase fee-for-service Medicare’s own process. Bring the payer list APICO actually bills. We will match channels one payer at a time.",
          },
        ],
      },
      exercises: [
        {
          id: "e1",
          kind: "choice",
          prompt: "Which reading of CMS-0057-F is fair?",
          options: [
            { id: "a", text: "It forces every fee-for-service Medicare lumbar injection onto a single national approval API immediately." },
            { id: "b", text: "It pushes impacted payers, including Medicare Advantage and Medicaid plans, toward electronic prior authorization, decision clocks, and specific denial reasons. You confirm current dates and you do not confuse that with every Novitas claim." },
            { id: "c", text: "It replaces medical-necessity rules, so a complete API message is automatically necessary." },
            { id: "d", text: "It bans human review of authorization requests." },
          ],
          answer: "b",
          why: "The rule is about the pipe and the clock for named payers. Necessity and truth stay where they were.",
          correction:
            "CMS-0057-F moves impacted payers toward a prior-authorization API, timelines such as 72 hours expedited and seven days standard, and a real denial reason. Confirm the current compliance date. It does not turn every traditional Medicare pain claim into that API, it does not make a message medically necessary, and it does not remove human review.",
        },
        {
          id: "e2",
          kind: "text",
          prompt:
            "Why is a specific denial reason useful to MedOpsHQ, and what must you not do with it?",
          placeholder: "How you use the reason, and the temptation you skip.",
          min: 70,
          requiredGroups: [
            ["reason", "denial", "missing", "why"],
            ["invent", "fabricat", "rewrite", "change the", "do not change", "dont change", "must not"],
          ],
          why: "A reason is a map back to the chart, not a brief for a new story.",
          correction:
            "A specific reason tells you what the payer says is missing or excluded, so a person can compare it with the chart. You may add a document that already exists. You may not invent facts or rewrite the clinical story to answer the denial.",
        },
      ],
    },
    {
      id: "m5-specifics",
      week: 19,
      title: "Level, side, and care tried",
      hours: "4–8 hours",
      promise:
        "You can supervise the three details that most often separate a true pain packet from a generic one.",
      margin: [
        {
          label: "At APICO",
          text: "Least invasive effective care is a public value of the practice. The packet should show that path, not skip to a procedure the template prefers.",
        },
        {
          label: "On the record",
          text: "Numbers in policies, such as weeks of care or percent relief, are copied from the current policy, never from memory.",
        },
      ],
      weekPlan: [
        "Take three fictional one-line plans and mark level, side, and route as present or absent.",
        "Write the question you would send back to the clinician for each absence.",
        "Submit both exercises.",
        "Do not build a library of “acceptable” clinical sentences. That library becomes a cloning tool.",
      ],
      sections: [
        {
          heading: "Level and side are not decorations",
          blocks: [
            {
              type: "p",
              text: "Spine procedures are named by region and often by level: cervical, thoracic, lumbar, sacral, and a numbered level such as L4–L5. Add-on codes exist because a second level is a different service, not a stronger adjective on the first. If the clinician treated one level, the packet says one level. If the note says “lumbar” and never chooses a level, the code-candidate agent stays quiet and the completeness agent opens a gap. Staff do not pick L4–L5 because it is a frequent disc.",
            },
            {
              type: "p",
              text: "Side is the same discipline. Left, right, or both has to be in the order. A bilateral modifier without a bilateral procedure is a false claim waiting for a review. Some payers want modifier 50. Some want LT and RT on separate lines. That preference is a billing-system rule your coder already has. The agent’s job is to show the words “left,” “right,” or “bilateral” from the note, or to show that those words are absent.",
            },
          ],
        },
        {
          heading: "Conservative care",
          blocks: [
            {
              type: "p",
              text: "Policies ask what was tried before a procedure: therapy, medication, activity change, and for how long. APICO’s public description of multimodal care is exactly this story when it is true: medicine, restorative therapy, behavioral support, and only then an injection. The packet quotes the tries that are documented. It does not backfill the ones the practice wishes had happened. If the least invasive path has not been tried and the policy requires it, the next step may be to try it, not to request the procedure.",
            },
            {
              type: "p",
              text: "Diagnostic blocks before a nerve destruction are a special case of the same idea. Many policies want one or two medial branch blocks, with a stated percent of relief, before radiofrequency ablation of a facet nerve. The percent and the count live in the policy you retrieved this week. “Felt some relief” does not become “80 percent” inside the agent. If the policy’s threshold is not met on the numbers in the note, you do not request the destruction yet.",
            },
          ],
        },
        {
          heading: "Imaging that correlates",
          blocks: [
            {
              type: "p",
              text: "Correlation means the imaging finding and the symptoms point at the same place. A report that describes a left L5 root compression belongs with left leg pain in an L5 pattern. A report from three years ago, or a report about the opposite side, is not “imaging in the chart” for this request. Quote the date and the sentence. If the clinician’s plan names a level the report does not discuss, that is a gap for the clinician, not a cue to crop the report.",
            },
          ],
        },
      ],
      example: {
        title: "Worked case: one level, written twice by mistake",
        blocks: [
          {
            type: "p",
            text: "The note says “left L4–L5 transforaminal.” A template adds “and L5–S1 as indicated.” The second level is not in the order. The completeness agent flags the template phrase as having no quote. The coder does not accept an add-on code. The extra words come out of the packet. This is the entire control, and it is enough.",
          },
        ],
      },
      exercises: [
        {
          id: "e1",
          kind: "choice",
          prompt:
            "The note documents one left lumbar level. The template mentions a second level “as indicated.” What happens to the add-on code?",
          options: [
            { id: "a", text: "Include the add-on. Templates exist to catch levels clinicians forget." },
            { id: "b", text: "Drop the second level and the add-on. Only the level in the signed note is requested." },
            { id: "c", text: "Keep the second level and add modifier 59 so it looks distinct." },
            { id: "d", text: "Change the note to bilateral so the packet matches a two-level template." },
          ],
          answer: "b",
          why: "Add-on codes are additional services that happened, not spare capacity in a template.",
          correction:
            "Request only the level the signed note names. Remove the template’s second level. Do not add modifier 59 and do not edit the note to create a bilateral or two-level case.",
        },
        {
          id: "e2",
          kind: "text",
          prompt:
            "A policy requires a stated percent of relief after a diagnostic block. The note says “the patient felt better.” What does the agent report, and what does it refuse to type?",
          placeholder: "The gap, and the percent it will not invent.",
          min: 60,
          requiredGroups: [
            ["felt better", "percent", "percentage", "%"],
            ["not", "missing", "does not", "doesnt", "refuse", "must not", "do not", "dont"],
          ],
          why: "Percent relief is a number or it is a gap.",
          correction:
            "The agent reports that the note says the patient felt better and does not state a percent of relief. It refuses to type 80 percent or any other number. A person compares the policy’s threshold with measured scores if those scores exist elsewhere in the record.",
        },
      ],
    },
    {
      id: "m5-denials",
      week: 20,
      title: "Denials and honest appeals",
      hours: "4–8 hours",
      promise:
        "You can sort a denial into missing truth, true mismatch, and payer error, and answer only the first and the third.",
      margin: [
        {
          label: "At APICO",
          text: "A denial is a delay for a person in pain. Speed matters. Speed that changes the story is the expensive kind.",
        },
        {
          label: "On the record",
          text: "Appeal with documents you already have. Peer-to-peer is a clinician’s conversation, not a script the model performs.",
        },
      ],
      weekPlan: [
        "Sort five imagined denials into the three piles before you look back at this page.",
        "Write the sentence you will use when the care is simply outside the policy.",
        "Submit both exercises.",
        "Find where denial reasons live in your billing system today. An agent that cannot see the reason cannot help the appeal.",
      ],
      sections: [
        {
          heading: "Three piles",
          blocks: [
            {
              type: "p",
              text: "Missing truth: the fact exists in a therapy note, an imaging report, or the signed visit, and it was not in the packet. The appeal adds that document. The agent may draft the cover line only by quoting the document. True mismatch: the condition or the treatment does not meet the policy. The appeal you can make is a policy argument a clinician believes, or a change in the plan of care. You do not upgrade the facts. Payer error: the plan ignored a document you sent, applied the wrong policy, or misread the level. The appeal points at the page they already had.",
            },
            {
              type: "p",
              text: "Staff under production pressure put everything in the first pile. Your review samples the appeals. If new clinical facts appear that are not in any prior document, you have a problem. If the same adjective-heavy paragraph appears on every appeal, the scribe has started cloning. Stop the queue and read five files.",
            },
          ],
        },
        {
          heading: "What not to automate",
          blocks: [
            {
              type: "p",
              text: "A peer-to-peer review is a conversation between clinicians. The model may assemble a one-page brief of quotes so the physician does not hunt through the chart while on the phone. The model does not sit on the call, does not impersonate staff, and does not hand the physician a script of symptoms the note lacks. Impersonation of a clinician is both a trust failure and, in many contexts, a legal one. Do not build it.",
            },
            {
              type: "p",
              text: "After an appeal is sent, the outcome returns to the log. Watch reasons over time. A spike in “insufficient conservative care” may mean the front desk is scheduling procedures before therapy notes arrive. That is an operations fix. It may also mean a payer changed a policy. Retrieval of the policy has to notice the new date. A spike is not automatically a reason to write stronger letters.",
            },
          ],
        },
      ],
      example: {
        title: "Worked case: the denial that was a missing page",
        blocks: [
          {
            type: "p",
            text: "The plan denies for lack of imaging. The MRI report is in the chart, dated March 2, and was never attached. The appeal cover says: the report was omitted; it is attached; the finding quote is the sentence about the left L5 root. Nothing else is added. A second fictional denial says the plan does not cover the procedure for unspecified low back pain alone. The note shows only that. There is no appeal that invents radiculopathy. The clinician decides whether the clinical story is incomplete in the note or the procedure is the wrong next step.",
          },
        ],
      },
      exercises: [
        {
          id: "e1",
          kind: "choice",
          prompt:
            "A denial says imaging was not included. The MRI is already in the chart and was forgotten. What is the appeal?",
          options: [
            { id: "a", text: "Attach the existing report and quote its date and finding. Add no new symptoms." },
            { id: "b", text: "Rewrite the note so the imaging sounds more recent and more severe." },
            { id: "c", text: "Drop the imaging denial and change the CPT code to one that does not ask for imaging." },
            { id: "d", text: "Have the model attend the peer-to-peer as the physician." },
          ],
          answer: "a",
          why: "This is the missing-truth pile. The document exists. The story does not change.",
          correction:
            "Attach the report that was already in the chart and quote its date and finding. Do not heighten it, do not switch codes to dodge the reason, and do not put the model on a peer-to-peer call as if it were the clinician.",
        },
        {
          id: "e2",
          kind: "text",
          prompt:
            "The policy does not cover the procedure for the diagnosis in the note, and no document in the chart supports a different diagnosis. What do you tell the team to do?",
          placeholder: "The honest next step.",
          min: 70,
          requiredGroups: [
            ["do not", "dont", "must not", "never", "not invent", "not change"],
            ["diagnosis", "policy", "cover"],
            ["clinician", "physician", "doctor", "different plan", "plan of care", "patient"],
          ],
          why: "Some denials are the policy working. The response is clinical, not rhetorical.",
          correction:
            "Do not invent a covered diagnosis. Tell the team the request does not meet the policy for the condition that is documented. The clinician decides whether more evaluation belongs in the note or whether the plan of care should change. The patient is not told the care was approved.",
        },
      ],
    },
  ],
};
