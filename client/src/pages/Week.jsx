import { Link, useParams } from "react-router-dom";
import { lessonComplete, useStudio } from "../studio.js";

export function Week() {
  const { week } = useParams();
  const { outline, progress } = useStudio();
  const guide = outline?.weeks?.find((item) => String(item.week) === String(week));
  const number = Number(week);

  if (!outline) {
    return (
      <article className="cover narrow">
        <p className="loading">Opening the week</p>
      </article>
    );
  }

  if (!guide) {
    return (
      <article className="cover narrow">
        <h1>That week is not on the chart</h1>
        <Link to="/">Return to the studio</Link>
      </article>
    );
  }

  return (
    <article className="cover narrow">
      <p className="stamp">Week {guide.week} of 24</p>
      <h1>{guide.title}</h1>
      <p className="deck">{guide.blurb}</p>
      <p>
        Seven days, four hours each. Start with the chapter, then write the code. The chapter is{" "}
        <Link to={`/lesson/${guide.domainId}`}>{guide.domain}</Link>.
      </p>
      <ol className="progress-list">
        {guide.days.map((day) => (
          <li key={day.id}>
            <Link to={`/lesson/${day.id}`}>
              <i className={lessonComplete(progress, day) ? "tick held" : "tick"} aria-hidden="true" />
              Day {day.day}. {day.title}
              <small>{day.hours}</small>
            </Link>
          </li>
        ))}
      </ol>
      <div className="cover-actions">
        {number > 1 ? <Link className="btn" to={`/week/${number - 1}`}>Previous week</Link> : <span />}
        {number < 24 ? <Link className="btn primary" to={`/week/${number + 1}`}>Next week</Link> : <Link className="btn primary" to="/lesson/m6-capstone">Open the capstone chapter</Link>}
      </div>
    </article>
  );
}
