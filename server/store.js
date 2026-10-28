import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(root, "data", "progress.json");

const empty = () => ({
  completed: {},
  attempts: {},
  notes: {},
  updatedAt: null,
});

export function readProgress() {
  try {
    const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
    return { ...empty(), ...parsed };
  } catch {
    return empty();
  }
}

export function writeProgress(data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const next = { ...data, updatedAt: new Date().toISOString() };
  fs.writeFileSync(file, JSON.stringify(next, null, 2));
  return next;
}
