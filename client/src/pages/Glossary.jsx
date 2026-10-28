const terms = [
  ["Agent", "A model in a loop, allowed to call only the tools you gave it, required to stop for a person. In this studio it prepares approval work. It does not send it."],
  ["Business associate", "A vendor that handles protected health information for a covered entity. MedOpsHQ needs a business-associate agreement before it processes APICO charts, and so does any model host that can see them."],
  ["CMS-0057-F", "The 2024 CMS rule pushing impacted payers toward electronic prior authorization, decision clocks, and specific denial reasons. It is not a national switch that turns every fee-for-service Medicare injection into an API."],
  ["CPT", "The AMA procedure code set. It says what was done. An add-on code is an additional service that actually happened, not a second sentence in a template."],
  ["False Claims Act", "The federal civil law for knowingly presenting a false claim. Knowingly includes reckless disregard, so an unchecked agent that invents chart facts can create liability without anyone planning a fraud."],
  ["FHIR", "A standard for exchanging health data between systems. Useful when a payer’s prior-authorization channel uses it. The truth of the packet does not depend on the transport."],
  ["HCPCS", "The procedure and supply code system that includes CPT as Level I and drugs, supplies, and some services as Level II. A drug used in a procedure may need its own code."],
  ["HIPAA", "The federal privacy, security, and breach rules for protected health information. Payment is a permitted purpose. It is not permission to paste a chart into an unsanctioned chat."],
  ["ICD-10-CM", "The diagnosis classification. It says why the person is being treated, only as specifically as the note supports. It is not ICD-10-PCS, which is an inpatient procedure system."],
  ["LCD", "A local coverage determination from a Medicare Administrative Contractor. For Delaware fee-for-service Medicare, that contractor is Novitas under Jurisdiction L, until CMS says otherwise."],
  ["Medical necessity", "The fit between this person’s record and a current coverage rule. Medicare’s root phrase is reasonable and necessary, in Social Security Act section 1862(a)(1)(A)."],
  ["Minimum necessary", "The HIPAA limit on how much protected health information is used for payment and operations. An authorization task does not need the entire life chart."],
  ["NCCI", "Medicare’s correct-coding edits. They stop two codes from being paid when one already includes the other, unless the facts truly make the services distinct. Modifier 59 is not a key."],
  ["Prior authorization", "A plan’s permission to proceed under its rules. It is not a promise of payment, and it is not proof the record is complete."],
  ["Protected health information", "Health information that identifies a person, or could, when a covered entity or business associate holds it. A name plus a diagnosis is enough."],
  ["eClinicalWorks", "The EHR APICO uses for the chart, the orders, the authorizations, and the claims. These courses follow the names eClinicalWorks publishes. Menu labels in a given build can differ."],
  ["Eva", "eClinicalWorks’ in-chart assistant. It can show history, compare Progress Notes, open a flowsheet, and help with a refill or the problem list without leaving the current window."],
  ["PRISMA", "eClinicalWorks’ search of records exchanged with other organizations, plus the chart you already have. V12 also reaches it from the right chart panel, a floating toolbar, and the screen you are on."],
  ["ePA", "Electronic prior authorization for medications, described by eClinicalWorks next to prescribing. A procedure authorization is a separate record unless your build uses one screen for both."],
  ["Scribe", "eClinicalWorks’ speech-to-text documentation into the Progress Note, on the desktop, eClinicalTouch, or eClinicalMobile. Sunoh is the separate ambient-listening product."],
  ["Shadow mode", "The agent drafts beside the real process, and a person still sends the old way. You compare invention and gaps before any draft is allowed near a payer."],
  ["Upcoding", "Choosing a higher code than the service and the record support. Borrowing a diagnosis because it sits on a coverage list is the same family of failure."],
];

export function Glossary() {
  return (
    <article className="cover narrow">
      <h1>Glossary</h1>
      <p className="deck">
        The words a manager needs in the room with a coder, a clinician, and a vendor. Each one is aimed at approval work for a pain practice, not at software in general.
      </p>
      <dl className="glossary">
        {terms.map(([term, meaning]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{meaning}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
