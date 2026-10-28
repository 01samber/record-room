export const month1 = {
  id: "room",
  title: "The room and the tools",
  summary:
    "What an approval agent is for, who APICO and MedOpsHQ are in this work, how CPT and ICD-10-CM differ, and how to install the workbench.",
  lessons: [
    {
      id: "m1-building",
      week: 1,
      title: "What you are building",
      hours: "4–8 hours",
      promise:
        "You can say, in one breath, what the agent may propose and what it must never send.",
      margin: [
        {
          label: "At APICO",
          text: "A person calls or checks in. Someone has to learn whether the plan is active, whether this kind of care needs authorization, and whether the chart yet holds the facts a reviewer will ask for.",
        },
        {
          label: "On the record",
          text: "Propose. Cite the sentence. Stop for a human. Those three moves are the whole product.",
        },
      ],
      weekPlan: [
        "Read this lesson once without taking notes, then again with a pen.",
        "Redo the worked case from a blank page.",
        "Submit both exercises. If the correction appears, rewrite your answer before you move on.",
        "Tell one colleague the three moves: propose, cite, stop.",
      ],
      sections: [
        {
          heading: "The job in front of your company",
          blocks: [
            {
              type: "p",
              text: "APICO Pain Management cares for people in pain. MedOpsHQ is the operations company you described as providing services to that practice. The agent you are learning to sponsor sits between them. Its purpose is narrow: help staff prepare cleaner eligibility checks, documentation, code candidates, and prior-authorization packets for care the chart actually supports.",
            },
            {
              type: "p",
              text: "Insurance approval is not a prize for a well-worded letter. A payer agrees to consider payment when the person is covered, the benefit exists, any required authorization is in place, and the medical record shows that the service was reasonable for this person. An agent that invents a detail to clear that path creates a false record. That is the failure this bootcamp is built to prevent.",
            },
          ],
        },
        {
          heading: "What “AI” means in this studio",
          blocks: [
            {
              type: "p",
              text: "In ordinary speech, AI means a machine that understands. In this work, it means software that is very good at continuing language. A large language model has read an enormous amount of text and learned which words tend to follow which other words. When you give it a chart and a question, it produces a fluent answer. Fluency is not the same as fidelity to the chart.",
            },
            {
              type: "p",
              text: "That distinction is the one your manager-level judgment depends on. A fluent letter can sound like a complete prior-authorization packet and still contain a physical-therapy start date, a pain score, or an imaging finding that nobody wrote down. The model did not “decide to lie” the way a person does. It filled a gap with something that usually appears in letters of that kind. Your design has to make that fill impossible to submit.",
            },
            {
              type: "p",
              text: "An agent, as this course uses the word, is that model plus a few tools and a stop rule. A tool might look up eligibility, open a coverage policy, or list code families. The stop rule is a person: a coder, a clinician, or a MedOpsHQ reviewer who accepts or rejects the proposal. Until that person acts, nothing is a claim and nothing is an authorization request.",
            },
          ],
        },
        {
          heading: "The three moves",
          blocks: [
            {
              type: "ul",
              items: [
                "Propose. The agent may suggest a missing fact, a diagnosis-code family, a procedure-code family, or a sentence that is already in the note.",
                "Cite. Every suggestion points at the words in the chart, or at the policy line, that justify it. No citation means no suggestion.",
                "Stop. A human accepts the packet. The agent does not click submit, does not sign, and does not “improve” the note.",
              ],
            },
            {
              type: "p",
              text: "Hold those moves against every later lesson. Eligibility agents, documentation agents, and code-candidate agents are the same idea with different tools. If a design cannot cite and cannot stop, it is not ready for APICO’s patients.",
            },
          ],
        },
        {
          heading: "How the six months are paced",
          blocks: [
            {
              type: "p",
              text: "There are 24 lessons. One lesson a week is a six-month bootcamp. Two lessons a week finishes near three months. Each lesson is a week’s work at the slower pace: a full explanation, one worked case, and two exercises you submit on this site. A correct answer closes with the studio seal. A wrong answer is corrected on the page so you can rewrite it.",
            },
            {
              type: "p",
              text: "The months run in order for a reason. You learn the room and the code sets, then the federal rules that make a false packet dangerous, then how models actually behave, then single-job agents, then the authorization packet itself, then a pilot you can defend to a physician and to counsel.",
            },
            {
              type: "call",
              title: "Not a credential",
              text: "Finishing the studio does not make you a certified coder, a lawyer, or a clinician. CPT is published by the American Medical Association and must be used from a licensed edition. Coverage rules change. The habit you are building is to read the current rule and to keep a human on the hook.",
            },
          ],
        },
      ],
      example: {
        title: "Worked case: the epidural that was not ready",
        blocks: [
          {
            type: "p",
            text: "Fictional patient J.R., age 58, is on the schedule at a clinic like APICO’s for a lumbar epidural. The note says the person has pain into the left leg, and that an MRI shows a disc problem at L4–L5 touching the nerve. A scheduler asks the agent: “Get this approved.”",
          },
          {
            type: "p",
            text: "A weak agent writes a letter that adds “failed six weeks of physical therapy and anti-inflammatory medication.” Those sentences are common in real letters. They are not in this note. The letter is fluent and unusable.",
          },
          {
            type: "p",
            text: "A record-room agent answers in three lines. The plan is active. The note supports radicular pain and names an imaging finding. The note does not state what conservative care was tried or for how long. Do not draft the request until someone records those facts, if they are true. If they are not true, the request waits for a different plan of care.",
          },
        ],
      },
      exercises: [
        {
          id: "e1",
          kind: "choice",
          prompt: "What is the agent’s job on an insurance approval?",
          options: [
            { id: "a", text: "Send the request as soon as a plausible code is chosen." },
            { id: "b", text: "Propose only what the chart supports, cite the source, and stop for a human before anything is sent." },
            { id: "c", text: "Pick the code most likely to be paid and shape the note to match it." },
            { id: "d", text: "Replace the clinician’s plan when the payer’s policy prefers a different procedure." },
          ],
          answer: "b",
          why: "Payment follows the record. The agent prepares; a person decides; the payer is told the truth of the chart.",
          correction:
            "The agent proposes what the chart supports, cites the sentence or policy line, and stops. It does not send, it does not choose a code because it pays, and it does not rewrite care so a policy is satisfied.",
        },
        {
          id: "e2",
          kind: "text",
          prompt:
            "The chart is missing the physical-therapy dates a payer policy asks for. The dates might be real, and they might not. What should the agent and the team do next? Write a short paragraph.",
          placeholder: "Say what happens to the request, and what nobody is allowed to invent.",
          min: 80,
          requiredGroups: [
            ["stop", "do not send", "dont send", "do not submit", "dont submit", "hold", "wait", "not ready"],
            ["invent", "fabricat", "make up", "made up", "guess", "fill in"],
            ["chart", "record", "note", "document"],
          ],
          why: "A missing fact is a stop, not a blank for the model to complete.",
          correction:
            "Hold the request. Ask the clinic to record the conservative care that actually happened, including when it happened. If that care did not happen, do not invent it and do not send a packet that pretends it did. The agent may list the missing fact. It may not supply the fact.",
        },
      ],
    },
    {
      id: "m1-companies",
      week: 2,
      title: "APICO and MedOpsHQ",
      hours: "4–8 hours",
      promise:
        "You can describe both organizations without confusing a public webpage with the contract in your drawer.",
      margin: [
        {
          label: "At APICO",
          text: "Public pages describe a Delaware pain practice led by Rany T. Abdallah, MD PhD MBA, with clinics in Bear, Milford, and Lewes, and a published appointment line of 855-932-7426.",
        },
        {
          label: "At MedOps",
          text: "Public pages at medops.pro describe a Wilmington operation: real-time eligibility, a documentation scribe that proposes ICD-10 and CPT candidates, and workflow automation. Your company’s working name in this course is MedOpsHQ.",
        },
      ],
      weekPlan: [
        "Read the public pages listed in Sources, then come back and write what you could verify.",
        "Separate verified facts from the internal relationship you already know.",
        "Submit both exercises.",
        "Sketch, on paper, the handoff from APICO’s front desk to MedOpsHQ.",
      ],
      sections: [
        {
          heading: "What the public record shows about APICO",
          blocks: [
            {
              type: "p",
              text: "APICO Pain Management, on its own site, presents itself as a full-service pain practice in Delaware. The clinics named on the homepage are Bear (100 Becks Woods Drive, Suite 201), Milford (1197 Airport Road, Suite 5), and Lewes (750 Kings Highway, Suite 104). A 2025 note on the site has also spoken of Dover; treat the live location list as something to confirm with the practice, not as a fact frozen in this course.",
            },
            {
              type: "p",
              text: "Dr. Abdallah’s public biography describes training in anesthesiology and pain medicine, and a multimodal practice: medication, restorative care with physical therapy, chiropractic, and occupational therapy, behavioral support, image-guided procedures, and complementary approaches. Conditions discussed publicly include headache, spine and joint pain, nerve pain, post-surgical pain, fibromyalgia, complex regional pain syndrome, cancer-related pain, and injuries from work or accidents. The stated values are compassion, the least invasive effective treatment, excellence, and treating patients as family.",
            },
            {
              type: "p",
              text: "That clinical picture is why coding and authorization are hard here. One visit can mix an evaluation, a procedure at a named spinal level, a drug, and a plan for therapy. Each of those can have its own code family and its own payer rule. “Pain management” is not a code.",
            },
          ],
        },
        {
          heading: "What the public record shows about MedOps",
          blocks: [
            {
              type: "p",
              text: "MedOps, at medops.pro, describes itself as an AI healthcare-operations company at 717 N. Union Street, Suite 20, Wilmington, Delaware. The services named in public are a real-time eligibility agent that checks coverage and writes the result into the chart, a scribe that drafts a SOAP note and proposes diagnosis and procedure codes for a person to review, and custom workflow automation. The site says the work is meant to be HIPAA-aligned. A public webpage is a description of a product, not an audit.",
            },
            {
              type: "p",
              text: "This bootcamp uses the name you use, MedOpsHQ, for the company that will carry the agent into APICO’s work. You told this studio that APICO receives services from MedOpsHQ. Keep two layers apart. Layer one is what a stranger can read on the web. Layer two is the statement of work, the business-associate agreement, and the list of systems your team is actually allowed to touch. Build the pilot from layer two. Use layer one to learn the vocabulary.",
            },
          ],
        },
        {
          heading: "Where an agent helps, and where it does not",
          blocks: [
            {
              type: "p",
              text: "The front of a visit is full of repeatable checks: Is this plan active today? What are the copay, deductible, and visit limits? Does this plan usually require authorization for an image-guided spine injection? Is the chart missing laterality, a level, or a date? Those are agent jobs, because they are lookups and gap lists.",
            },
            {
              type: "p",
              text: "The clinical core is not an agent job. Whether this person should have an injection, which level, whether sedation is safe, and whether the pain generator is the disc, the joint, or something else, belongs to the clinician. Whether the final codes match the service that was performed belongs to a qualified coder using the current licensed code set and the payer policy. MedOpsHQ can prepare. APICO’s clinician and coder remain responsible for what goes out under the practice’s name.",
            },
            {
              type: "call",
              title: "A clean sentence for your manager",
              text: "MedOpsHQ may build an agent that prepares approval work for APICO. The agent reads, proposes, and cites. The practice decides what is true and what is sent.",
            },
          ],
        },
      ],
      example: {
        title: "Worked case: two facts and one assumption",
        blocks: [
          {
            type: "p",
            text: "You are asked to brief a physician. You say: “APICO’s public site lists Bear, Milford, and Lewes, and describes image-guided procedures as part of multimodal care. MedOps publicly offers eligibility checks and code proposals inside a note. Our company states that we provide services to APICO. I have not yet opened our agreement, so I will not claim which of those products is in scope this quarter.”",
          },
          {
            type: "p",
            text: "That briefing is usable. The briefing that says “we already automate their authorizations end to end” is not, unless the contract says so. Agents amplify whatever story you give them. Start from the documents.",
          },
        ],
      },
      exercises: [
        {
          id: "e1",
          kind: "choice",
          prompt: "Which description is the fair one?",
          options: [
            { id: "a", text: "A public product page is enough to define MedOpsHQ’s contract with APICO." },
            { id: "b", text: "APICO is a Delaware pain practice, MedOps publicly describes eligibility and documentation agents, and the service relationship should be confirmed from your own agreement." },
            { id: "c", text: "APICO is a national hospital chain, so Medicare rules for inpatient hospitals are the only rules that matter." },
            { id: "d", text: "The agent should set the treatment plan, because it can read policies faster than a physician." },
          ],
          answer: "b",
          why: "Public pages teach vocabulary. The agreement and the chart teach what you may do.",
          correction:
            "Use the public record for what it is: APICO is a Delaware pain practice, and MedOps describes eligibility, scribe, and workflow tools. Confirm the live relationship, the systems, and the permitted data from your own contract and business-associate agreement.",
        },
        {
          id: "e2",
          kind: "text",
          prompt:
            "Name one concrete task an agent can take at the start of an APICO visit, and one decision it must leave to a clinician. Write both in a short paragraph.",
          placeholder: "Task the agent may prepare, and the decision it must not make.",
          min: 70,
          requiredGroups: [
            ["eligib", "coverage", "benefit", "copay", "deductible", "authorization", "missing", "laterality", "verification"],
            ["clinician", "physician", "doctor", "provider"],
            ["must not", "should not", "never", "leave", "stay with", "belongs", "reserved", "not the agent", "does not decide", "cannot decide"],
          ],
          why: "Scope is a clinical-safety decision, not a software feature list.",
          correction:
            "The agent may check eligibility and benefits, or list a missing chart fact such as laterality. It must not decide the procedure, the spinal level, or whether the care is appropriate. That judgment stays with the clinician. A coder still accepts any code that will be sent.",
        },
      ],
    },
    {
      id: "m1-codes",
      week: 3,
      title: "CPT, ICD-10, and modifiers",
      hours: "4–8 hours",
      promise:
        "You can explain which code says why the person was seen, which code says what was done, and why a modifier is not a key to payment.",
      margin: [
        {
          label: "At APICO",
          text: "A lumbar injection visit can need a diagnosis code, a procedure code, maybe an add-on for another level, a drug code, and a place of service. Mixing those up is how clean care becomes a denial or a compliance problem.",
        },
        {
          label: "On the record",
          text: "Short code notes in this lesson are teaching paraphrases. The official CPT text is the AMA’s. ICD-10-CM updates every October 1.",
        },
      ],
      weekPlan: [
        "Copy the small code table by hand. Writing it once beats highlighting it.",
        "On the fictional notes in the example, mark “why” and “what was done” in two colors.",
        "Submit both exercises.",
        "Ask a coder which book or encoder your team actually uses. Do not rely on memory from this page for a live claim.",
      ],
      sections: [
        {
          heading: "Four sets people mix together",
          blocks: [
            {
              type: "p",
              text: "ICD-10-CM is the diagnosis classification used in the United States. It answers why this person is being treated: lumbar radiculopathy, a disc disorder with radiculopathy, spinal stenosis, low back pain, chronic pain. You carry the code to the most specific characters the record supports, including laterality when the code has it. You do not pick a more specific code because it is on a coverage list.",
            },
            {
              type: "p",
              text: "ICD-10-PCS is a different system, used mainly for procedures in inpatient hospital claims. It is not the procedure system for a physician’s office or a typical clinic claim. If someone says “ICD code” for an injection at APICO, ask whether they mean the diagnosis (CM) or an inpatient procedure (PCS). Most of your approval work will be CM plus CPT.",
            },
            {
              type: "p",
              text: "CPT, Current Procedural Terminology, is published by the American Medical Association. It answers what service was performed: an office visit, a transforaminal epidural at one lumbar level, a facet injection, a nerve destruction. HCPCS Level II is the companion set for many supplies, drugs, and services that CPT does not name. A steroid injected during a procedure may need its own drug code on some claims. The procedure code does not automatically include the drug story.",
            },
            {
              type: "call",
              title: "Copyright and use",
              text: "Study from a licensed CPT edition or an encoder your company pays for. This course will not paste the official long descriptors. Paraphrase is for learning the shape of the system. A live code choice is looked up, not remembered from a bootcamp.",
            },
          ],
        },
        {
          heading: "A small map for pain work",
          blocks: [
            {
              type: "p",
              text: "These are common families in interventional pain. Confirm every one in the current year’s book and in the payer policy before anyone uses it.",
            },
            {
              type: "table",
              headers: ["Code", "Teaching paraphrase", "The question to ask"],
              rows: [
                ["M54.16", "Lumbar radiculopathy", "Does the note describe nerve-root pain, not only axial ache?"],
                ["M51.16", "Lumbar disc disorder with radiculopathy", "Does imaging and the exam point at the disc and the root?"],
                ["M54.50", "Low back pain, unspecified", "Is the record really no more specific than this?"],
                ["G89.29", "Other chronic pain", "Is this encounter for pain management, and does G89 add something the anatomical code does not?"],
                ["99214", "Established-patient office visit, moderate decision making", "Was a significant visit performed, and is it separate from a procedure the same day?"],
                ["64483", "Lumbar or sacral transforaminal epidural, one level, imaging included in this family", "Was it transforaminal, and was a second level truly done?"],
                ["62323", "Lumbar or sacral interlaminar epidural with imaging", "Was the route interlaminar, not transforaminal?"],
                ["64493", "Lumbar or sacral facet injection, one level, with imaging", "Is the pain story a facet story, or a radicular story?"],
                ["64635", "Destruction of a lumbar or sacral facet nerve, one joint, with imaging", "Did diagnostic blocks already happen, if the policy requires them?"],
              ],
            },
            {
              type: "p",
              text: "Add-on codes exist for additional levels in several of these families. An add-on is not billed alone, and it is not a way to describe a level you did not treat. Bilateral care has its own modifier rules. Laterality that the note does not state is laterality you do not code.",
            },
          ],
        },
        {
          heading: "G89, in plain language",
          blocks: [
            {
              type: "p",
              text: "Category G89 is for pain itself: acute, chronic, postprocedural, neoplasm-related, and pain not elsewhere classified. Official ICD-10-CM guidelines allow a G89 code to be sequenced first when the reason for the encounter is pain management, with the underlying condition coded as well. When the encounter is to treat the underlying condition and that condition is known, the anatomical diagnosis generally leads.",
            },
            {
              type: "p",
              text: "Payer coverage articles often list the anatomical diagnoses that support a procedure. Sequencing for the classification and “what the article wants to see” can look different. The coder follows the official guidelines and the article. The agent does not reorder codes because one order pays more often. When the two sources seem to argue, a person asks. That pause is a feature.",
            },
          ],
        },
        {
          heading: "Modifiers and unbundling",
          blocks: [
            {
              type: "p",
              text: "A modifier adds a fact about the service. Modifier 25 says a significant, separately identifiable evaluation happened on the same day as a procedure. Modifier 59 says a service was distinct, and the more specific X modifiers (separate encounter, structure, practitioner, or unusual service) sometimes say how. LT and RT name the side. Modifier 50 names a bilateral procedure when the payer wants it that way. Modifier 26 and TC split professional and technical components when a service is split.",
            },
            {
              type: "p",
              text: "The National Correct Coding Initiative, NCCI, publishes procedure-to-procedure edits. If two codes describe overlapping work, the edit says they normally are not both paid. A modifier overrides an edit only when the clinical fact makes the services truly distinct. Using 59 to force a second payment is a classic false-claim pattern. Many spine-injection codes already include imaging guidance in the descriptor. Billing a separate fluoroscopy code on top of a code that includes fluoroscopy is the usual unbundling mistake. Confirm the current descriptor and the current edit; both change.",
            },
            {
              type: "p",
              text: "Place of service changes payment too. Office, ambulatory surgery center, and hospital outpatient are not the same claim. Do not let an agent assume APICO’s procedures occur in a surgery center because many pain practices use one. Ask which room the service will use.",
            },
          ],
        },
      ],
      example: {
        title: "Worked case: axial pain is not a transforaminal story",
        blocks: [
          {
            type: "p",
            text: "Fictional patient A.M. has a note that says “low back pain, no pain below the knee, no numbness.” Someone suggests 64483 because “that is the injection we do for backs.”",
          },
          {
            type: "p",
            text: "64483 is a transforaminal epidural family, used when the target is the nerve root at a named level. This note does not describe radicular pain, does not name a level to treat, and does not describe that procedure as having been chosen by a clinician. The honest code conversation starts with M54.50 or a more specific low-back code if the record supports it, and with whatever service is actually planned. It does not start by renaming the pain “radiculopathy” so a procedure code looks covered.",
          },
        ],
      },
      exercises: [
        {
          id: "e1",
          kind: "choice",
          prompt:
            "A note documents axial low back pain and no leg symptoms. A teammate wants 64483 on the authorization because it is a familiar injection code. What is the sound response?",
          options: [
            { id: "a", text: "Use 64483. It is the standard code for back pain, and the diagnosis can be adjusted." },
            { id: "b", text: "Stop. The procedure family has to match the procedure and the story in the chart. Do not change the diagnosis so the code looks covered." },
            { id: "c", text: "Add modifier 59 so the payer treats the visit as medically necessary." },
            { id: "d", text: "Use an ICD-10-PCS code, because procedure coding always means PCS." },
          ],
          answer: "b",
          why: "The code follows the service and the documented condition. It does not lead them.",
          correction:
            "Stop. 64483 is a transforaminal epidural family, not a synonym for back pain. This note does not support radicular pain or that procedure. Do not edit the diagnosis to fit a code, do not add modifier 59 to create necessity, and do not reach for ICD-10-PCS on an ordinary clinic service.",
        },
        {
          id: "e2",
          kind: "text",
          prompt:
            "Explain the difference between an ICD-10-CM code and a CPT code, using a visit that includes both a reason for pain and a procedure. A short paragraph is enough.",
          placeholder: "Which code answers why, and which code answers what was done?",
          min: 70,
          requiredGroups: [
            ["diagnosis", "condition", "why", "reason"],
            ["procedure", "service", "what was done", "what was performed"],
            ["icd", "cm"],
            ["cpt"],
          ],
          why: "Managers who can say this out loud can supervise an agent that proposes both.",
          correction:
            "ICD-10-CM states the diagnosis: why this person is being seen, carried only as far as the note supports. CPT states the service that was performed, such as an office visit or a named injection. A pain visit often needs both. Neither code is a guess about what the payer would rather see.",
        },
      ],
    },
    {
      id: "m1-workbench",
      week: 4,
      title: "Install the workbench",
      hours: "4–8 hours",
      promise:
        "Cursor or VS Code is open, Node answers in the terminal, and you know where a real chart must never be pasted.",
      margin: [
        {
          label: "At APICO",
          text: "Real names, dates of birth, member IDs, and notes stay in the practice’s systems. This website and the IDE are for fictional cases and for your own sentences.",
        },
        {
          label: "On the record",
          text: "The panel below is live. It reads the Node version on the machine running this studio.",
        },
      ],
      weekPlan: [
        "Install the tools in order. Do not skip the version check.",
        "Open this project in the IDE and find the terminal.",
        "Submit the version exercise from the live panel.",
        "Write the rule about patient information in your own words and submit it.",
      ],
      sections: [
        {
          heading: "What you are installing",
          blocks: [
            {
              type: "p",
              text: "The classroom is this website. The workbench is the editor where, in later months, you will read a prompt, edit a small text file, and compare your words with the correction. You do not need to become a software engineer. You do need the same tools a careful operator uses, so that exercises are done in a real environment and not only in your head.",
            },
            {
              type: "p",
              text: "Install Cursor if you can. It is the editor this company is already using for the studio, and it includes an assistant beside the file. If Cursor is not available, Visual Studio Code is the same kind of tool and is enough for every exercise in the course. Both are integrated development environments: a place that holds files, a terminal, and a way to ask for an explanation.",
            },
          ],
        },
        {
          heading: "Install, in order, on Windows",
          blocks: [
            {
              type: "ul",
              items: [
                "Download Cursor from the vendor’s site, cursor.com, and run the installer. Accept the option that adds it to the right-click menu if you are offered one.",
                "Download the current Long Term Support build of Node.js from nodejs.org. Node is the runtime this studio’s server uses. The installer also gives you npm, which installs the project’s libraries.",
                "Close and reopen the terminal after installing Node so the new command is visible.",
                "In Cursor, choose File, then Open Folder, and select the MedOpsHQ folder that contains this course.",
                "Open the terminal inside Cursor. On Windows the menu path is Terminal, then New Terminal.",
                "Run node -v and then npm -v. You want a version line, not an error that the command is unknown.",
                "From the project folder run npm run install:all once. Then run npm run dev. Leave that terminal open.",
                "In the browser, open the local address the client prints, usually http://localhost:5173. You are looking at The Record Room.",
              ],
            },
            {
              type: "p",
              text: "If node is not recognized, the installer did not update the path your terminal sees. Sign out of Windows and back in, or restart Cursor, and try node -v again. If port 5173 or 4000 is already in use, another copy of the studio is running; close that terminal and start once.",
            },
            {
              type: "call",
              title: "The live panel",
              text: "When the server is running, the box under this lesson calls the studio API and shows the Node version, the system, and a health check. The first exercise asks for the major version from that box. That is how you know the classroom and the workbench are connected.",
            },
          ],
        },
        {
          heading: "How to use the IDE during an exercise",
          blocks: [
            {
              type: "p",
              text: "Read the lesson here. If you want a sentence explained, ask Cursor’s assistant in the side panel, or VS Code with whatever assistant you are allowed to use. Ask it to rephrase a rule. Ask it to quiz you. Then close the panel and write the submission yourself on this site. The seal responds to your words, not to a pasted essay from the model.",
            },
            {
              type: "p",
              text: "A useful prompt to the assistant is: “Explain modifier 59 as if I supervise staff who do not code. Do not invent a coverage rule.” A harmful prompt is: “Here is a real patient’s note. Write the authorization so it will be approved.” Do not put names, addresses, dates of birth, telephone numbers, member IDs, medical record numbers, account numbers, device identifiers, or full-face photos into the assistant. Do not put the note itself there if it is a real note. Fictional cases in this course are safe to discuss. APICO’s charts are not, unless counsel and your business-associate agreements have approved that exact tool for protected health information.",
            },
            {
              type: "p",
              text: "Later lessons will ask you to draft a short instruction you would give an agent. Write those drafts in a local file if you like, using File, then New Text File. Save nothing that contains a real patient’s information. The submission box on this website stores whether you were right. It is not a medical record system, and it should never become one.",
            },
          ],
        },
        {
          heading: "What the commands mean",
          blocks: [
            {
              type: "p",
              text: "npm run install:all downloads the libraries for the small server and for this React site. npm run dev starts both. The server answers at port 4000 under /api. The website asks that server to grade you. npm run selftest runs the grader against known answers so an engineer can see that corrections still fire. You do not need a database, a cloud account, or an API key for the course itself.",
            },
          ],
        },
      ],
      example: {
        title: "Worked case: a safe question to the assistant",
        blocks: [
          {
            type: "p",
            text: "You type to the IDE assistant: “From lesson one, what are the three moves of an approval agent? Answer in four sentences. Use no patient example other than the fictional J.R. already in the lesson.”",
          },
          {
            type: "p",
            text: "You read the reply, close it, and then you type your own exercise answer from memory. If you cannot say it without the reply open, you do not have it yet. That is the point of a bootcamp.",
          },
        ],
      },
      exercises: [
        {
          id: "e1",
          kind: "runtime",
          prompt:
            "Look at the live studio panel above this lesson’s exercises. Type the major Node version it shows: the number before the first dot.",
          placeholder: "For example, 22",
          correction:
            "The major version is the first number in the studio panel, currently {major}. If the panel is missing, start the server with npm run dev and reload this lesson.",
        },
        {
          id: "e2",
          kind: "text",
          prompt:
            "Where may a real APICO patient’s name and note go while you study? Write the rule you will follow in Cursor or VS Code.",
          placeholder: "Say what you will not paste, and what you may use instead.",
          min: 70,
          requiredGroups: [
            ["never", "must not", "do not", "dont", "will not", "wont"],
            ["name", "patient", "phi", "chart", "note", "identifier"],
            ["fiction", "fictional", "fake", "sample", "this course", "the course", "lesson"],
          ],
          why: "The workbench is for learning. The chart stays in systems that have a business reason and a contract.",
          correction:
            "Do not paste a real patient’s name, identifiers, or note into Cursor, VS Code’s assistant, or this exercise box. Study with the fictional cases in the lessons. A real chart moves only through systems your business-associate agreement and counsel have approved.",
        },
      ],
    },
  ],
};
