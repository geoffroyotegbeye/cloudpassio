// LocalStorage-backed progression store for the MVP.
// SSR-safe: all reads guard on typeof window.

export interface Attempt {
  id: string;
  mode: "quick" | "practice" | "exam";
  date: number; // epoch ms
  total: number;
  correct: number;
  byDomain: Record<string, { total: number; correct: number }>;
  durationMs: number;
}

export interface UserStats {
  attempts: Attempt[];
  bookmarks: string[]; // question ids
  wrongIds: string[]; // question ids answered wrong at least once
  xp: number;
  lastActivity: number | null;
  streak: number;
  dailyGoal: number;
}

const KEY = "cloudpassio:stats:v1";

const empty: UserStats = {
  attempts: [],
  bookmarks: [],
  wrongIds: [],
  xp: 0,
  lastActivity: null,
  streak: 0,
  dailyGoal: 10,
};

export function loadStats(): UserStats {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return empty;
  }
}

export function saveStats(stats: UserStats) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(stats));
  window.dispatchEvent(new CustomEvent("cloudpassio:stats"));
}

function isSameDay(a: number, b: number) {
  const da = new Date(a);
  const db = new Date(b);
  return (
    da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
  );
}

function isYesterday(prev: number, today: number) {
  const y = new Date(today);
  y.setDate(y.getDate() - 1);
  return isSameDay(prev, y.getTime());
}

export function recordAttempt(attempt: Omit<Attempt, "id" | "date">, wrongIds: string[]) {
  const stats = loadStats();
  const now = Date.now();
  const full: Attempt = { ...attempt, id: crypto.randomUUID(), date: now };
  stats.attempts.unshift(full);
  stats.attempts = stats.attempts.slice(0, 50);

  // XP: 10 per correct, 15 bonus if >=80%
  const bonus = attempt.correct / attempt.total >= 0.8 ? 15 : 0;
  stats.xp += attempt.correct * 10 + bonus;

  // Streak
  if (stats.lastActivity == null) stats.streak = 1;
  else if (isSameDay(stats.lastActivity, now)) {
    /* same day, keep */
  } else if (isYesterday(stats.lastActivity, now)) stats.streak += 1;
  else stats.streak = 1;
  stats.lastActivity = now;

  // Merge wrong ids (dedup)
  stats.wrongIds = Array.from(new Set([...stats.wrongIds, ...wrongIds]));

  saveStats(stats);
  return full;
}

export function toggleBookmark(id: string) {
  const s = loadStats();
  s.bookmarks = s.bookmarks.includes(id)
    ? s.bookmarks.filter((x) => x !== id)
    : [...s.bookmarks, id];
  saveStats(s);
  return s.bookmarks.includes(id);
}

export function computeAggregates(stats: UserStats) {
  const total = stats.attempts.reduce((a, x) => a + x.total, 0);
  const correct = stats.attempts.reduce((a, x) => a + x.correct, 0);
  const accuracy = total ? (correct / total) * 100 : 0;

  const byDomain: Record<string, { total: number; correct: number; accuracy: number }> = {};
  stats.attempts.forEach((a) => {
    for (const [d, v] of Object.entries(a.byDomain)) {
      byDomain[d] ??= { total: 0, correct: 0, accuracy: 0 };
      byDomain[d].total += v.total;
      byDomain[d].correct += v.correct;
    }
  });
  for (const d of Object.values(byDomain)) {
    d.accuracy = d.total ? (d.correct / d.total) * 100 : 0;
  }

  const level = Math.floor(stats.xp / 500) + 1;
  const xpInLevel = stats.xp % 500;
  const readiness = Math.min(100, Math.round(accuracy * 0.6 + Math.min(total, 200) * 0.2));

  const domainList = Object.entries(byDomain).sort((a, b) => a[1].accuracy - b[1].accuracy);
  const weak = domainList.slice(0, 2).map(([d]) => d);
  const strong = [...domainList].reverse().slice(0, 2).map(([d]) => d);

  return { total, correct, accuracy, byDomain, level, xpInLevel, readiness, weak, strong };
}
