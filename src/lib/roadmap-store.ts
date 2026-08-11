// LocalStorage-backed progress store for the CloudPulse roadmap.
// SSR-safe: all reads guard on typeof window. Mirrors the pattern in quiz-store.ts.

export type TaskStatus = "todo" | "progress" | "waiting" | "done";

export interface RoadmapState {
  statuses: Record<string, TaskStatus>;
  journal: string;
}

const KEY = "cloudpassio:roadmap:v1";

const empty: RoadmapState = {
  statuses: {},
  journal: "",
};

export const STATUS_ORDER: TaskStatus[] = [
  "todo",
  "progress",
  "waiting",
  "done",
];

export function nextStatus(current: TaskStatus): TaskStatus {
  const i = STATUS_ORDER.indexOf(current);
  return STATUS_ORDER[(i + 1) % STATUS_ORDER.length];
}

export function loadRoadmap(): RoadmapState {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return empty;
  }
}

function saveRoadmap(state: RoadmapState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent("cloudpassio:roadmap"));
}

export function cycleTaskStatus(id: string) {
  const s = loadRoadmap();
  const current = s.statuses[id] ?? "todo";
  s.statuses = { ...s.statuses, [id]: nextStatus(current) };
  saveRoadmap(s);
  return s;
}

export function setJournal(text: string) {
  const s = loadRoadmap();
  s.journal = text;
  saveRoadmap({ ...s, journal: text });
}

export function resetTaskStatuses() {
  const s = loadRoadmap();
  saveRoadmap({ ...s, statuses: {} });
}
