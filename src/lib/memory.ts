import { WORDS, type Word } from "@/data/vocab";

export type Kind = "recall" | "sentence" | "write" | "speak";

export type WordStat = {
  level: number;
  attempts: number;
  correct: number;
  wrong: number;
  last: number;
  next: number;
  sentence: number;
  writing: number;
  speaking: number;
  reasons: string[];
};

export type Today = {
  date: string;
  reviewed: number;
  correct: number;
  sentence: number;
  speak: number;
  write: number;
};

export type AppState = {
  words: Record<number, WordStat>;
  sentences: Record<number, string[]>;
  dayAnchor: number;
  today: Today;
};

const KEY = "hsk5-3521-3560-v2";
const INTERVALS = [0, 0, 1, 3, 7, 14, 30, 45];

export const LEVELS = [
  "New",
  "Seen",
  "Recognized",
  "Recalled",
  "Used in sentence",
  "Used in speaking",
  "Strong",
  "Mastered",
] as const;

export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function blankStat(): WordStat {
  return {
    level: 0,
    attempts: 0,
    correct: 0,
    wrong: 0,
    last: 0,
    next: 0,
    sentence: 0,
    writing: 0,
    speaking: 0,
    reasons: [],
  };
}

export function emptyState(): AppState {
  const words: Record<number, WordStat> = {};
  for (const w of WORDS) words[w.n] = blankStat();
  return { words, sentences: {}, dayAnchor: Date.now(), today: freshToday() };
}

function freshToday(): Today {
  return { date: todayKey(), reviewed: 0, correct: 0, sentence: 0, speak: 0, write: 0 };
}

export function loadState(): AppState {
  const base = emptyState();
  if (typeof window === "undefined") return base;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw) as Partial<AppState>;
    const words = { ...base.words };
    for (const w of WORDS) {
      const s = parsed.words?.[w.n];
      if (s) words[w.n] = { ...blankStat(), ...s, reasons: s.reasons ?? [] };
    }
    const state: AppState = {
      words,
      sentences: parsed.sentences ?? {},
      dayAnchor: parsed.dayAnchor ?? Date.now(),
      today: parsed.today?.date === todayKey() ? parsed.today : freshToday(),
    };
    return state;
  } catch {
    return base;
  }
}

export function saveState(state: AppState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function band(level: number) {
  if (level >= 7) return "master" as const;
  if (level >= 6) return "strong" as const;
  if (level > 0 && level <= 3) return "weak" as const;
  if (level === 0) return "new" as const;
  return "review" as const;
}

export function bump(state: AppState, n: number, ok: boolean, kind: Kind): AppState {
  const next: AppState = {
    ...state,
    words: { ...state.words, [n]: { ...state.words[n], reasons: [...(state.words[n]?.reasons ?? [])] } },
    today: state.today.date === todayKey() ? { ...state.today } : freshToday(),
    sentences: state.sentences,
  };
  const s = next.words[n];
  s.attempts += 1;
  s.last = Date.now();
  next.today.reviewed += 1;
  if (ok) {
    s.correct += 1;
    next.today.correct += 1;
    if (kind === "sentence") {
      s.sentence += 1;
      next.today.sentence += 1;
      s.level = s.level < 4 ? 4 : Math.min(6, s.level + 1);
    } else if (kind === "speak") {
      s.speaking += 1;
      next.today.speak += 1;
      s.level = s.level < 5 ? 5 : Math.min(7, s.level + 1);
    } else if (kind === "write") {
      s.writing += 1;
      next.today.write += 1;
      s.level = s.level < 4 ? 4 : Math.min(6, s.level + 1);
    } else if (s.level < 7) {
      s.level += 1;
    }
    const days = INTERVALS[Math.min(s.level, 7)];
    s.next = Date.now() + days * 86400000;
  } else {
    s.wrong += 1;
    s.level = Math.max(0, s.level - 1);
    s.next = Date.now();
    s.reasons = [...s.reasons, `${kind} miss ${todayKey()}`].slice(-4);
  }
  return next;
}

export function dueWords(state: AppState): Word[] {
  return WORDS.filter((w) => {
    const s = state.words[w.n];
    return s.next <= Date.now() || s.level < 2;
  }).sort((a, b) => state.words[a.n].level - state.words[b.n].level || state.words[b.n].wrong - state.words[a.n].wrong);
}

export function weakWords(state: AppState): Word[] {
  return WORDS.filter((w) => state.words[w.n].wrong > 0 && state.words[w.n].level < 6).sort(
    (a, b) =>
      state.words[b.n].wrong - state.words[b.n].correct - (state.words[a.n].wrong - state.words[a.n].correct),
  );
}

export function norm(s: string) {
  return (s || "").replace(/\s+/g, "").replace(/[。！？，、．.!?]/g, "").toLowerCase();
}

export function pick<T>(arr: T[], n: number): T[] {
  const c = arr.slice();
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c.slice(0, n);
}

export function programDay(anchor: number) {
  return Math.min(7, Math.floor((Date.now() - anchor) / 86400000) + 1);
}
