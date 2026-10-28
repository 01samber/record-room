const sources = [
  {
    title: "APICO Pain Management",
    href: "https://apicopain.com/",
    note: "Public description of the Delaware practice, clinic list, and stated values. Confirm live locations with the practice.",
  },
  {
    title: "Rany T. Abdallah, MD PhD MBA",
    href: "https://apicopain.com/doctors/rany-abdallah/",
    note: "Public biography of the practice president, used here only to describe the clinical setting.",
  },
  {
    title: "MedOps public services",
    href: "https://www.medops.pro/services",
    note: "Eligibility, scribe, and workflow descriptions. MedHQ at medhq.com is a different company and is not the subject of this course.",
  },
  {
    title: "Social Security Act §1862",
    href: "https://www.ssa.gov/OP_Home/ssact/title18/1862.htm",
    note: "The reasonable-and-necessary payment rule for Medicare.",
  },
  {
    title: "Jurisdiction L Medicare Administrative Contractor",
    href: "https://www.cms.gov/medicare/medicare-contracting/medicare-administrative-contractors/who-are-the-macs-a-b-mac-jurisdiction-l-jl",
    note: "CMS page naming Novitas for Delaware. Re-check before a live packet; contracts are re-competed.",
  },
  {
    title: "Novitas Jurisdiction L payer IDs",
    href: "https://www.novitas-solutions.com/webcenter/portal/MedicareJL/pagebyid?contentId=00003666",
    note: "Delaware Part A 12101 and Part B 12102, as published by Novitas.",
  },
  {
    title: "CMS-0057-F prior authorization rule",
    href: "https://www.cms.gov/initiatives/burden-reduction/overview/interoperability/policies-regulations/cms-interoperability-prior-authorization-final-rule-cms-0057-f",
    note: "The 2024 interoperability and prior authorization final rule. Confirm current compliance dates on CMS.gov.",
  },
  {
    title: "HIPAA treatment, payment, and operations",
    href: "https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/disclosures-treatment-payment-health-care-operations/index.html",
    note: "HHS explanation of permitted uses, including the minimum-necessary standard.",
  },
  {
    title: "eClinicalWorks V12",
    href: "https://www.eclinicalworks.com/new/",
    note: "Public description of the EHR APICO uses: Scribe, Eva, PRISMA, medication ePA, and revenue-cycle tools. Confirm which modules your build has turned on. Menu names move.",
  },
  {
    title: "Laws against health care fraud",
    href: "https://www.cms.gov/files/document/overviewfwalawsagainstfactsheet072616pdf",
    note: "CMS overview of the False Claims Act and related statutes. Penalty dollar amounts in older fact sheets go stale; use the current Department of Justice figures.",
  },
];

export function Sources() {
  return (
    <article className="cover narrow">
      <h1>Sources</h1>
      <p className="deck">
        The course separates what a stranger can read on the public web from the contract you hold inside MedOpsHQ. Policies and code sets change. These links are the doors, not a frozen rulebook.
      </p>
      <ul className="source-list">
        {sources.map((source) => (
          <li key={source.href}>
            <a href={source.href} target="_blank" rel="noreferrer">
              {source.title}
            </a>
            <p>{source.note}</p>
          </li>
        ))}
      </ul>
      <p>
        CPT is published by the American Medical Association. Use a licensed edition or your encoder. ICD-10-CM official guidelines are published by the CDC and CMS and take effect each October 1. This studio paraphrases; it does not replace those books.
      </p>
    </article>
  );
}
