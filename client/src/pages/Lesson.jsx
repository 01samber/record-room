import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api.js";
import { useStudio } from "../studio.js";

function Blocks({ blocks }) {
  return blocks.map((block, index) => {
    if (block.type === "p") return <p key={index}>{block.text}</p>;
    if (block.type === "ul") {
      return (
        <ul key={index}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    }
    if (block.type === "call") {
      return (
        <aside className="call" key={index}>
          <strong>{block.title}</strong>
          <p>{block.text}</p>
        </aside>
      );
    }
    if (block.type === "code") {
      return (
        <pre className="code" key={index}>
          <span>{block.lang}</span>
          <code>{block.text}</code>
        </pre>
      );
    }
    if (block.type === "hours") {
      return (
        <ol className="hours-plan" key={index}>
          {block.items.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <em>{item.time}</em>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      );
    }
    if (block.type === "table") {
      return (
        <div className="table-wrap" key={index}>
          <table>
            <thead>
              <tr>
                {block.headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (block.type === "figure") {
      return (
        <figure className="lesson-figure" key={index}>
          <img src={block.src} alt={block.alt} />
          <figcaption>{block.caption}</figcaption>
        </figure>
      );
    }
    return null;
  });
}

function Seal() {
  return (
    <div className="seal" role="status">
      <svg viewBox="0 0 88 88" aria-hidden="true">
        <circle className="seal-ring" cx="44" cy="44" r="32" />
        <path className="seal-check" d="M30 46 l10 10 20-24" />
      </svg>
      <p>Held to the record</p>
    </div>
  );
}

function Exercise({ lessonId, exercise, onGraded }) {
  const [choice, setChoice] = useState("");
  const [text, setText] = useState("");
  const [fields, setFields] = useState({});
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setChoice("");
    setText("");
    setFields({});
    setResult(null);
    setError("");
  }, [exercise.id]);

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const answer =
      exercise.kind === "choice" ? choice : exercise.kind === "fields" ? fields : text;
    try {
      const graded = await api("/api/grade", {
        method: "POST",
        body: JSON.stringify({ lessonId, exerciseId: exercise.id, answer }),
      });
      setResult(graded);
      onGraded();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const picked = exercise.options?.find((option) => option.id === choice);
  const showCorrection = result && !result.correct && !result.empty;

  return (
    <form className="exercise" onSubmit={submit}>
      <h3>{exercise.prompt}</h3>
      {exercise.kind === "choice" && (
        <div className="options" role="radiogroup" aria-label="Answer">
          {exercise.options.map((option) => (
            <label key={option.id} className={choice === option.id ? "option on" : "option"}>
              <input
                type="radio"
                name={exercise.id}
                value={option.id}
                checked={choice === option.id}
                onChange={() => setChoice(option.id)}
              />
              <span>{option.text}</span>
            </label>
          ))}
        </div>
      )}
      {(exercise.kind === "text" || exercise.kind === "runtime" || exercise.kind === "code") && (
        <>
          {exercise.starter && <pre className="code"><span>start from here</span><code>{exercise.starter}</code></pre>}
          <textarea
            className={exercise.kind === "code" ? "code-input" : undefined}
            value={text}
            placeholder={exercise.placeholder || (exercise.kind === "code" ? "Write the code here" : "Your answer")}
            onChange={(event) => setText(event.target.value)}
            rows={exercise.kind === "runtime" ? 2 : exercise.kind === "code" ? 12 : 6}
            spellCheck={exercise.kind === "code" ? false : undefined}
          />
        </>
      )}
      {exercise.kind === "fields" &&
        exercise.fields.map((field) => (
          <label key={field.id} className="field">
            <span>{field.label}</span>
            {field.hint && <small>{field.hint}</small>}
            <textarea
              value={fields[field.id] || ""}
              rows={3}
              onChange={(event) => setFields((current) => ({ ...current, [field.id]: event.target.value }))}
            />
          </label>
        ))}
      <div className="exercise-actions">
        <button className="btn primary" type="submit" disabled={busy}>
          {busy ? "Checking the record" : "Check this answer"}
        </button>
        {result?.attempts ? <p>Attempt {result.attempts}</p> : null}
      </div>
      {error && <p className="banner">{error}</p>}
      {result?.message && !result.correct && <p className="hint-line">{result.message}</p>}
      {result?.correct && (
        <div className="result-ok">
          <Seal key={result.attempts} />
          {result.why && <p>{result.why}</p>}
        </div>
      )}
      {showCorrection && (
        <div className="correction" role="status" tabIndex={-1}>
          {picked && <p className="struck">{picked.text}</p>}
          {exercise.kind !== "choice" && exercise.kind !== "fields" && text && (
            <p className="struck">{text}</p>
          )}
          {result.fields?.some((field) => !field.correct) && (
            <ul>
              {result.fields
                .filter((field) => !field.correct)
                .map((field) => (
                  <li key={field.id}>
                    {field.label} {field.empty || field.tooShort ? "needs a fuller answer." : "still misses the idea."}
                  </li>
                ))}
            </ul>
          )}
          <p>{result.correction}</p>
          {result.missing?.length > 0 && (
            <p className="hint-line">
              {exercise.kind === "code"
                ? `The file still needs this: ${result.missing[0]}`
                : `Say this more plainly, including the idea of “${result.missing[0]}”.`}
            </p>
          )}
        </div>
      )}
    </form>
  );
}

export function Lesson() {
  const { id } = useParams();
  const { outline, refresh } = useStudio();
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState("");
  const [runtime, setRuntime] = useState(null);
  const [note, setNote] = useState("");
  const [noteState, setNoteState] = useState("");

  useEffect(() => {
    let live = true;
    setPayload(null);
    setError("");
    api(`/api/lessons/${id}`)
      .then((data) => {
        if (live) setPayload(data);
      })
      .catch((err) => {
        if (live) setError(err.message);
      });
    api("/api/progress")
      .then((progress) => {
        if (live) setNote(progress.notes?.[id] || "");
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [id]);

  useEffect(() => {
    if (id !== "m1-workbench") return;
    api("/api/runtime")
      .then(setRuntime)
      .catch(() => setRuntime({ ok: false }));
  }, [id]);

  async function saveNote() {
    setNoteState("Saving");
    try {
      await api("/api/notes", {
        method: "PUT",
        body: JSON.stringify({ lessonId: id, note }),
      });
      setNoteState("Saved on this machine’s studio");
    } catch (err) {
      setNoteState(err.message);
    }
  }

  if (error) {
    return (
      <article className="lesson">
        <p className="banner">{error}</p>
      </article>
    );
  }

  if (!payload) {
    return (
      <article className="lesson">
        <p className="loading">Opening the chart</p>
      </article>
    );
  }

  const { lesson, prev, next } = payload;
  const titles = Object.fromEntries(
    (outline?.months.flatMap((month) => month.lessons) || []).map((item) => [item.id, item.title])
  );

  return (
    <article className="lesson">
      <header className="lesson-head">
        <p className="stamp">
          {lesson.week
            ? `Week ${lesson.week} of 24${lesson.day ? ` · Day ${lesson.day}` : ""}`
            : lesson.trackTitle || "Coding course"}
        </p>
        <p className="month-kicker">{lesson.monthTitle || lesson.trackTitle}</p>
        <h1>{lesson.title}</h1>
        <p className="promise">{lesson.promise}</p>
        <p className="hours">
          {lesson.hours}
          {lesson.day ? " today" : lesson.sequence === "record" ? " for the chapter" : " for this lesson"}
        </p>
        {lesson.week ? (
          <p>
            <Link to={`/week/${lesson.week}`}>Open the seven days of this week</Link>
          </p>
        ) : null}
      </header>
      <div className="lesson-grid">
        <div className="prose">
          {lesson.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <Blocks blocks={section.blocks} />
            </section>
          ))}
          <section className="example">
            <h2>{lesson.example.title}</h2>
            <Blocks blocks={lesson.example.blocks} />
          </section>
          {!lesson.sections.some((section) => section.blocks.some((block) => block.type === "hours")) && (
            <section>
              <h2>How to spend the time</h2>
              <ol className="week-plan">
                {lesson.weekPlan.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>
          )}
          {id === "m1-workbench" && (
            <section className="panel" aria-live="polite">
              <h2>Studio panel</h2>
              {runtime?.ok ? (
                <dl>
                  <div>
                    <dt>Node</dt>
                    <dd>{runtime.node}</dd>
                  </div>
                  <div>
                    <dt>Major version</dt>
                    <dd>{runtime.major}</dd>
                  </div>
                  <div>
                    <dt>System</dt>
                    <dd>{runtime.platform}</dd>
                  </div>
                  <div>
                    <dt>API</dt>
                    <dd>Responding</dd>
                  </div>
                </dl>
              ) : (
                <p>The panel is quiet. Start the server with npm run dev and reload this lesson.</p>
              )}
            </section>
          )}
          {lesson.exercises.map((exercise) => (
            <Exercise key={exercise.id} lessonId={lesson.id} exercise={exercise} onGraded={refresh} />
          ))}
          <section className="note-box">
            <h2>A note to yourself</h2>
            <p>Keep a study reminder here. Do not type a real patient’s name, member number, or note.</p>
            <textarea value={note} rows={4} onChange={(event) => setNote(event.target.value)} />
            <button className="btn" type="button" onClick={saveNote}>
              Save this note
            </button>
            {noteState && <p className="hint-line">{noteState}</p>}
          </section>
          <nav className="pager" aria-label="Adjacent lessons">
            {prev ? <Link className="btn" to={`/lesson/${prev}`}>{titles[prev] || "Previous lesson"}</Link> : <span />}
            {next ? <Link className="btn primary" to={`/lesson/${next}`}>{titles[next] || "Next lesson"}</Link> : <Link className="btn primary" to="/progress">See your progress</Link>}
          </nav>
        </div>
        <aside className="margin-notes">
          {lesson.margin.map((item) => (
            <div key={item.label}>
              <h2>{item.label}</h2>
              <p>{item.text}</p>
            </div>
          ))}
        </aside>
      </div>
    </article>
  );
}
