import { createContext, createElement, useContext, useEffect, useMemo, useState } from "react";
import { api } from "./api.js";

const StudioContext = createContext(null);

export function useStudio() {
  return useContext(StudioContext);
}

export function lessonComplete(progress, lesson) {
  if (!progress || !lesson) return false;
  const done = Object.keys(progress.completed || {}).filter(
    (key) => key.startsWith(`${lesson.id}:`) && progress.completed[key]
  ).length;
  return done >= lesson.exerciseCount;
}

export function StudioProvider({ children }) {
  const [outline, setOutline] = useState(null);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState("");

  async function refresh() {
    const [nextOutline, nextProgress] = await Promise.all([api("/api/outline"), api("/api/progress")]);
    setOutline(nextOutline);
    setProgress(nextProgress);
    setError("");
  }

  useEffect(() => {
    refresh().catch((err) => setError(err.message));
  }, []);

  const value = useMemo(
    () => ({ outline, progress, setProgress, refresh, error }),
    [outline, progress, error]
  );

  return createElement(StudioContext.Provider, { value }, children);
}
