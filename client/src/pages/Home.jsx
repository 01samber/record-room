import { Link } from "react-router-dom";
import { useStudio } from "../studio.js";

export function Home() {
  const { outline, error } = useStudio();
  const tracks = outline?.tracks || [];
  const ecwTracks = tracks.filter((track) => track.id.startsWith("ecw"));
  const coding = tracks.filter((track) => !track.id.startsWith("ecw"));

  return (
    <article className="cover">
      <div className="partners">
        <img src="/logos/apico.webp" alt="APICO Pain Management" />
        <span className="partners-rule" aria-hidden="true" />
        <img className="logo-medops" src="/logos/medops-hq.png" alt="MedOpsHQ" />
      </div>
      <p className="stamp">Twenty-four weeks</p>
      <h1>The Record Room</h1>
      <p className="draw-rule" aria-hidden="true" />
      <p className="deck">
        A bootcamp in artificial intelligence for the person who will put an approval agent into APICO Pain Management, through MedOpsHQ. The agent may prepare. The chart decides. A person sends.
      </p>
      {error && <p className="banner">{error} Start the studio with npm run dev, then reload.</p>}
      <section className="brief" aria-labelledby="briefing">
        <h2 id="briefing">Briefing</h2>
        <p>
          This studio is for the manager who will decide how an approval agent enters the work of prior authorization at APICO Pain Management, with MedOpsHQ operating beside the practice. The job is narrow. The agent reads the note it was given, quotes the words that support a fact, lists what is still missing, and names a procedure family only when the note names the route. A person reviews that report. A person sends.
        </p>
        <p>
          The load is twenty-four weeks, seven days in a week, four hours in a day: six hundred seventy-two hours. The morning is the chapter, on the chart, the law, or the payer. The afternoon is a file you type and run. Python holds the agent. JavaScript holds the tools and this classroom. SQL holds the audit rows. A right answer closes with the seal, “Held to the record.” A wrong answer is corrected on the page. You run the programs on your own machine. The studio checks their shape.
        </p>
        <p>
          Three shelves. The record is the twenty-four-week path: the two companies, CPT and ICD-10 as study paraphrases, HIPAA, medical necessity, the False Claims Act, how a model invents a fluent sentence, an agent that stops, the packet, and a pilot a person can defend. The coding courses build one program on a single fictional note, “Pain into the left calf. Level L5.” Training stays on a sentence or a pair of numbers you type. The last file returns a report with sent set to false. ECW features is its own shelf, one course for each desk: virtual scribes, providers, prior authorization, and billing. Those lessons stay on the eClinicalWorks screens. The agent comes after the desks know the record.
        </p>
        <p>
          At the end you can sit with a draft and say where each sentence came from, which line would invent a duration, and who is allowed to send. That is the briefing you can give back to the practice.
        </p>
      </section>
      <svg className="diagram" viewBox="0 0 760 168" role="img" aria-label="The agent path stops at a human: chart, code, rule, then a person.">
        <path className="diagram-line" d="M48 64 H700" />
        {[
          ["48", "Chart"],
          ["250", "Code"],
          ["470", "Rule"],
          ["700", "Human"],
        ].map(([x, label]) => (
          <g key={label} transform={`translate(${x} 64)`}>
            <circle r="7" />
            <text y="36" textAnchor="middle">
              {label}
            </text>
          </g>
        ))}
      </svg>
      <p className="diagram-caption">
        Every design in this studio has to survive that last stop. If the model cannot cite the chart, it does not get closer to the payer.
      </p>
      <section className="roadmap" aria-labelledby="roadmap">
        <h2 id="roadmap">Roadmap</h2>
        <p>The path runs in order. Each block is four weeks, and each week holds seven days.</p>
        <ol className="docket">
          {stages.map((stage) => (
            <li key={stage.to}>
              <Link to={stage.to}>
                <span className="when">{stage.when}</span>
                <span>
                  <strong>{stage.title}</strong>
                  <small>{stage.summary}</small>
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <h3>One day</h3>
        <ol className="day-road">
          <li><span>Hour 1</span> Read the chapter with the editor closed.</li>
          <li><span>Hour 2</span> Trace the function on paper and say what each line returns.</li>
          <li><span>Hour 3</span> Type the lab and run it with py or node.</li>
          <li><span>Hour 4</span> Submit both exercises. Rewrite any correction before the next day.</li>
        </ol>
        <h3>Beside the weeks</h3>
        <p>
          ECW features can be opened on its own. It teaches the screens and stays off the agent. The coding courses can be opened on their own. They meet these weeks in the same fictional note, and they end in one file that quotes, lists the gap, and does not send.
        </p>
      </section>
      <div className="cover-actions">
        <Link className="btn primary" to="/week/1">
          Open week one
        </Link>
        <Link className="btn" to="/lesson/sc-note">
          Open ECW features
        </Link>
      </div>
      <section className="month-map">
        <h2>ECW features</h2>
        <p>Four courses on eClinicalWorks itself. Each desk learns the screens it uses. These lessons do not discuss agents.</p>
        <ol>
          {ecwTracks.map((track) => (
            <li key={track.id}>
              <Link to={track.lessons?.[0] ? `/lesson/${track.lessons[0].id}` : "/"}>
                <span>{track.title}</span>
                <small>{track.summary}</small>
              </Link>
            </li>
          ))}
        </ol>
      </section>
      <section className="month-map">
        <h2>Coding courses</h2>
        <p>These six courses build one program. Python writes the tools. JavaScript returns the same report as JSON. SQL stores the quote and the gap. The model course scores a sentence against the note. The training course stays on numbers and characters you type. The last lesson runs all of it on one fictional note, and the report is never sent.</p>
        <ol>
          {coding.map((track) => (
            <li key={track.id}>
              <Link to={track.lessons?.[0] ? `/lesson/${track.lessons[0].id}` : "/"}>
                <span>{track.title}</span>
                <small>{track.summary}</small>
              </Link>
            </li>
          ))}
        </ol>
      </section>
      <section className="month-map">
        <h2>Six months, one folder</h2>
        <ol>
          {(outline?.months || fallbackMonths).map((month) => (
            <li key={month.title}>
              <Link to={month.lessons ? `/lesson/${month.lessons[0].id}` : "/"}>
                <span>{month.title}</span>
                <small>{month.summary}</small>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}

const stages = [
  {
    when: "Weeks 1–4",
    title: "The room and the tools",
    summary: "The job, APICO and MedOpsHQ, diagnosis and procedure codes, and a workbench you can run.",
    to: "/week/1",
  },
  {
    when: "Weeks 5–8",
    title: "The law on the chart",
    summary: "HIPAA, medical necessity, the False Claims Act, and a pain note read the way an auditor will.",
    to: "/week/5",
  },
  {
    when: "Weeks 9–12",
    title: "How a model reads",
    summary: "Next-token guesses, prompts that must quote, tests, and a lumbar lab on fiction.",
    to: "/week/9",
  },
  {
    when: "Weeks 13–16",
    title: "Agents with one job",
    summary: "A loop that stops, then eligibility, completeness, and a code family only when the route is named.",
    to: "/week/13",
  },
  {
    when: "Weeks 17–20",
    title: "The packet",
    summary: "What a request holds, what CMS-0057-F changes, side and level, and a denial answered from the record.",
    to: "/week/17",
  },
  {
    when: "Weeks 21–24",
    title: "A pilot you can defend",
    summary: "Human checkpoints, vendors, a narrow pilot, and a capstone you can hand to the practice.",
    to: "/week/21",
  },
];

const fallbackMonths = [
  { title: "The room and the tools", summary: "The job, the two companies, the code sets, and the workbench." },
  { title: "The law on the chart", summary: "HIPAA, medical necessity, the False Claims Act, and how to read a note." },
  { title: "How a model reads", summary: "Invention, prompts that quote, tests, and a lumbar lab." },
  { title: "Agents with one job", summary: "A loop that stops, then eligibility, completeness, and code candidates." },
  { title: "The packet", summary: "What a request holds, CMS-0057-F, levels and side, honest appeals." },
  { title: "A pilot you can defend", summary: "Humans, vendors, a narrow pilot, and the capstone page." },
];
