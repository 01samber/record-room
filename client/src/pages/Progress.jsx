import { Link } from "react-router-dom";
import { lessonComplete, useStudio } from "../studio.js";

export function Progress() {
  const { outline, progress, error } = useStudio();
  const chapters = outline?.months.flatMap((month) => month.lessons) || [];
  const courses = outline?.tracks.flatMap((track) => track.lessons) || [];
  const days = outline?.weeks.flatMap((week) => week.days) || [];
  const lessons = [...chapters, ...courses, ...days];
  const done = lessons.filter((lesson) => lessonComplete(progress, lesson)).length;
  const finished = lessons.length > 0 && done === lessons.length;

  return (
    <article className="cover narrow">
      <h1>Progress</h1>
      <p className="deck">
        A lesson is held when both of its exercises have been answered correctly. You can retry as many times as you need. The studio keeps the result, not the paragraph you typed.
      </p>
      {error && <p className="banner">{error}</p>}
      {finished && (
        <div className="seal finish">
          <svg viewBox="0 0 88 88" aria-hidden="true">
            <circle className="seal-ring" cx="44" cy="44" r="32" />
            <path className="seal-check" d="M30 46 l10 10 20-24" />
          </svg>
          <p>The studio is complete</p>
        </div>
      )}
      <p className="hours">{done} of {lessons.length || 228} lessons</p>
      <ol className="progress-list">
        {outline?.weeks.map((week) => (
          <li key={week.week}>
            <h2>Week {week.week}. {week.title}</h2>
            <ul>
              {week.days.map((day) => (
                <li key={day.id}>
                  <Link to={`/lesson/${day.id}`}>
                    <i className={lessonComplete(progress, day) ? "tick held" : "tick"} aria-hidden="true" />
                    Day {day.day}. {day.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
        {outline?.months.map((month) => (
          <li key={month.id}>
            <h2>{month.title}</h2>
            <ul>
              {month.lessons.map((lesson) => (
                <li key={lesson.id}>
                  <Link to={`/lesson/${lesson.id}`}>
                    <i className={lessonComplete(progress, lesson) ? "tick held" : "tick"} aria-hidden="true" />
                    {lesson.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
        {outline?.tracks.map((track) => (
          <li key={track.id}>
            <h2>{track.title}</h2>
            <ul>
              {track.lessons.map((lesson) => (
                <li key={lesson.id}>
                  <Link to={`/lesson/${lesson.id}`}>
                    <i className={lessonComplete(progress, lesson) ? "tick held" : "tick"} aria-hidden="true" />
                    {lesson.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </article>
  );
}
