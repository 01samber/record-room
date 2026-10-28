import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { lessonComplete, useStudio } from "./studio.js";

function Mark() {
  return (
    <svg className="mark-seal" viewBox="0 0 64 64" aria-hidden="true">
      <circle className="mark-ring" cx="32" cy="32" r="22" />
      <text x="32" y="37" textAnchor="middle">
        SB
      </text>
    </svg>
  );
}

function Branch({ id, title, open, onToggle, children }) {
  return (
    <section className={open ? "branch open" : "branch"}>
      <button className="branch-toggle" type="button" aria-expanded={open} onClick={() => onToggle(id)}>
        {title}
      </button>
      {open ? <div className="branch-body">{children}</div> : null}
    </section>
  );
}

export function Shell() {
  const { outline, progress } = useStudio();
  const [menuOpen, setMenuOpen] = useState(false);
  const [branches, setBranches] = useState({});
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const path = location.pathname;
    const next = {};
    if (path.startsWith("/week/") || /\/lesson\/d\d/.test(path)) next.daily = true;
    const month = outline?.months.find((item) => item.lessons.some((lesson) => path === `/lesson/${lesson.id}`));
    if (month) {
      next.record = true;
      next[month.id] = true;
    }
    const track = outline?.tracks.find((item) => item.lessons.some((lesson) => path === `/lesson/${lesson.id}`));
    if (track?.id.startsWith("ecw")) {
      next.ecw = true;
      next[track.id] = true;
    } else if (track) {
      next.coding = true;
      next[track.id] = true;
    }
    if (Object.keys(next).length) setBranches((current) => ({ ...current, ...next }));
  }, [location.pathname, outline]);

  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function toggleBranch(id) {
    setBranches((current) => ({ ...current, [id]: !current[id] }));
  }

  const lessons = [
    ...(outline?.months.flatMap((month) => month.lessons) || []),
    ...(outline?.tracks.flatMap((track) => track.lessons) || []),
    ...(outline?.weeks.flatMap((week) => week.days) || []),
  ];
  const done = lessons.filter((lesson) => lessonComplete(progress, lesson)).length;

  return (
    <div className={menuOpen ? "shell nav-open" : "shell"}>
      <a className="skip" href="#content">
        Skip to the lesson
      </a>
      <header className="topbar">
        <button className="btn quiet menu-btn" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? "Close the curriculum" : "Open the curriculum"}
        </button>
        <p className="topbar-progress">
          {outline ? `${done} of ${lessons.length} lessons held` : "Opening the studio"}
        </p>
      </header>
      <nav className="spine" aria-label="Curriculum">
        <NavLink className="brand" to="/" end>
          <Mark />
          <span>
            <strong>The Record Room</strong>
            <em>Samer Berbara</em>
          </span>
        </NavLink>
        <div className="spine-links">
          <NavLink to="/progress">Progress</NavLink>
          <NavLink to="/glossary">Glossary</NavLink>
          <NavLink to="/sources">Sources</NavLink>
        </div>
        <Branch id="daily" title="Daily path" open={branches.daily} onToggle={toggleBranch}>
          {outline?.weeks.map((week) => {
            const held = week.days.every((day) => lessonComplete(progress, day));
            return (
              <NavLink key={week.week} to={`/week/${week.week}`} end>
                <i className={held ? "tick held" : "tick"} aria-hidden="true" />
                <span>Week {week.week}. {week.title}</span>
              </NavLink>
            );
          })}
        </Branch>
        <Branch id="record" title="The record" open={branches.record} onToggle={toggleBranch}>
          {outline?.months.map((month) => (
            <Branch key={month.id} id={month.id} title={month.title} open={branches[month.id]} onToggle={toggleBranch}>
              {month.lessons.map((lesson) => (
                <NavLink key={lesson.id} to={`/lesson/${lesson.id}`}>
                  <i className={lessonComplete(progress, lesson) ? "tick held" : "tick"} aria-hidden="true" />
                  <span>{lesson.title}</span>
                </NavLink>
              ))}
            </Branch>
          ))}
        </Branch>
        <Branch id="coding" title="Coding" open={branches.coding} onToggle={toggleBranch}>
          {outline?.tracks.filter((track) => !track.id.startsWith("ecw")).map((track) => (
            <Branch key={track.id} id={track.id} title={track.title} open={branches[track.id]} onToggle={toggleBranch}>
              {track.lessons.map((lesson) => (
                <NavLink key={lesson.id} to={`/lesson/${lesson.id}`}>
                  <i className={lessonComplete(progress, lesson) ? "tick held" : "tick"} aria-hidden="true" />
                  <span>{lesson.title}</span>
                </NavLink>
              ))}
            </Branch>
          ))}
        </Branch>
        <Branch id="ecw" title="ECW features" open={branches.ecw} onToggle={toggleBranch}>
          {outline?.tracks.filter((track) => track.id.startsWith("ecw")).map((track) => (
            <Branch key={track.id} id={track.id} title={track.title} open={branches[track.id]} onToggle={toggleBranch}>
              {track.lessons.map((lesson) => (
                <NavLink key={lesson.id} to={`/lesson/${lesson.id}`}>
                  <i className={lessonComplete(progress, lesson) ? "tick held" : "tick"} aria-hidden="true" />
                  <span>{lesson.title}</span>
                </NavLink>
              ))}
            </Branch>
          ))}
        </Branch>
      </nav>
      {menuOpen && <button className="scrim" type="button" aria-label="Close the curriculum" onClick={() => setMenuOpen(false)} />}
      <main id="content" className="main">
        <Outlet />
        <footer className="colophon">
          <p>© Samer Berbara. Held to the record.</p>
          <p>The Record Room teaches judgment for MedOpsHQ’s work with APICO Pain Management. It is not legal advice, a coding credential, or a promise of payment.</p>
        </footer>
      </main>
    </div>
  );
}
