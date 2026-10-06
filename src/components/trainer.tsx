import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  Brain,
  CalendarDays,
  ClipboardCheck,
  GitCompare,
  LayoutDashboard,
  MessageSquare,
  Mic,
  PenLine,
  Volume2,
} from "lucide-react";
import { CONTRASTS, FAMILIES, SITUATIONS, WORDS, type Word } from "@/data/vocab";
import {
  LEVELS,
  band,
  bump,
  dueWords,
  emptyState,
  loadState,
  norm,
  pick,
  programDay,
  saveState,
  weakWords,
  type AppState,
  type Kind,
} from "@/lib/memory";

type View =
  | "dash"
  | "learn"
  | "recall"
  | "sentence"
  | "write"
  | "speak"
  | "talk"
  | "test"
  | "weak"
  | "progress"
  | "program"
  | "contrast";

const NAV: { id: View; label: string; icon: typeof BookOpen }[] = [
  { id: "dash", label: "Dashboard", icon: LayoutDashboard },
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "recall", label: "Active Recall", icon: Brain },
  { id: "sentence", label: "Sentences", icon: PenLine },
  { id: "write", label: "Writing", icon: PenLine },
  { id: "speak", label: "Speaking", icon: Mic },
  { id: "talk", label: "Conversation", icon: MessageSquare },
  { id: "test", label: "Mixed Test", icon: ClipboardCheck },
  { id: "weak", label: "Weak Words", icon: AlertTriangle },
  { id: "progress", label: "Progress", icon: BarChart3 },
  { id: "program", label: "7-day Program", icon: CalendarDays },
  { id: "contrast", label: "Contrasts", icon: GitCompare },
];

const TALKS = [
  {
    words: ["逐渐", "转变", "注重", "主动"],
    lines: [
      "你觉得一个人的生活习惯会随着年龄逐渐转变吗？",
      "为什么？",
      "你认为人们应该注重哪些方面？",
      "你在学习方面会主动寻找机会吗？",
    ],
  },
  {
    words: ["住房", "中介", "住址", "注册"],
    lines: [
      "你现在的住房是自己找的，还是通过中介找的？",
      "注册住址的时候你遇到过问题吗？",
      "如果住房条件一般，你会抓紧换吗？",
      "你更注重位置，还是更注重价格？",
    ],
  },
  {
    words: ["中医", "中药", "煮", "注重"],
    lines: [
      "你身边有人看中医吗？",
      "中药一般要怎么煮？",
      "你觉得年轻人应该注重哪些健康习惯？",
      "如果医生让你喝中药，你能坚持吗？",
    ],
  },
  {
    words: ["专家", "专心", "中级", "主题"],
    lines: [
      "你现在的汉语是中级水平吗？",
      "学习的时候你能专心多久？",
      "如果请一位专家来上课，你希望主题是什么？",
      "你会主动问专家问题吗？",
    ],
  },
];

const DRILL = ["中介", "逐渐", "注重", "抓紧", "转变"];

type Recog = {
  lang: string;
  onresult: ((ev: { results: { 0: { 0: { transcript: string } } } }) => void) | null;
  onerror: (() => void) | null;
  start: () => void;
};

function speakZh(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "zh-CN";
  u.rate = 0.92;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

function listenZh(onResult: (text: string) => void) {
  const w = window as unknown as {
    SpeechRecognition?: new () => Recog;
    webkitSpeechRecognition?: new () => Recog;
  };
  const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
  if (!Ctor) {
    onResult("");
    return;
  }
  const r = new Ctor();
  r.lang = "zh-CN";
  r.onresult = (ev) => onResult(ev.results[0][0].transcript);
  r.onerror = () => onResult("");
  r.start();
}

function byZh(zh: string) {
  const w = WORDS.find((x) => x.zh === zh);
  if (!w) throw new Error(zh);
  return w;
}

function meaningKey(w: Word) {
  return w.en.split(/[;/]/)[0].trim().toLowerCase().split(/\s+/)[0];
}

function typeCOk(val: string, w: Word) {
  const v = val.toLowerCase();
  const pyHit = v.includes(w.pyPlain.split(" ")[0]) || norm(val).includes(w.pyPlain.replace(/\s/g, ""));
  const key = meaningKey(w);
  return pyHit && key.length >= 3 && v.includes(key);
}

type RecallItem = { type: string; prompt: string; show: string; loose: boolean };

function makeRecall(w: Word): RecallItem {
  const type = ["A", "B", "C", "D", "E"][Math.floor(Math.random() * 5)];
  const ex = w.ex[1] ?? w.ex[0];
  if (type === "A") return { type, prompt: "English → Chinese", show: w.en, loose: false };
  if (type === "B") return { type, prompt: "Pinyin → Chinese", show: w.py, loose: false };
  if (type === "C") return { type, prompt: "Chinese → pinyin and meaning", show: w.zh, loose: true };
  if (type === "D") return { type, prompt: "Fill the blank", show: ex.zh.replace(w.zh, "____"), loose: false };
  const sit = SITUATIONS.find((s) => s.words.includes(w.zh)) ?? SITUATIONS[0];
  return { type, prompt: "Situation → Chinese", show: `${sit.place}. Produce the word for: ${w.en}`, loose: false };
}

function recallOk(val: string, item: RecallItem, w: Word) {
  if (item.loose) return typeCOk(val, w);
  return norm(val) === norm(w.zh);
}

const btn = "inline-flex min-h-11 items-center justify-center rounded-xl border border-line bg-card px-4 font-semibold text-ink";
const btnPrimary = `${btn} border-accent bg-accent text-card`;
const btnGood = `${btn} border-strong bg-strong-soft text-strong`;
const btnBad = `${btn} border-weak bg-weak-soft text-weak`;

function Tag({ children, tone = "plain" }: { children: ReactNode; tone?: "plain" | "weak" | "strong" | "master" }) {
  const toneClass =
    tone === "weak" ? "bg-weak-soft text-weak" : tone === "strong" ? "bg-strong-soft text-strong" : tone === "master" ? "bg-master-soft text-master" : "bg-paper text-ink";
  return <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${toneClass}`}>{children}</span>;
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-card border border-line bg-card p-4 shadow-sm ${className}`}>{children}</section>;
}

export function Trainer() {
  const [view, setView] = useState<View>("dash");
  const [state, setState] = useState<AppState>(() => emptyState());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(loadState());
    setReady(true);
  }, []);

  function commit(next: AppState) {
    saveState(next);
    setState(next);
  }

  function mark(n: number, ok: boolean, kind: Kind) {
    setState((prev) => {
      const next = bump(prev, n, ok, kind);
      saveState(next);
      return next;
    });
  }

  const stats = useMemo(() => {
    const levels = WORDS.map((w) => state.words[w.n]?.level ?? 0);
    return {
      mastered: levels.filter((l) => l >= 7).length,
      strong: levels.filter((l) => l === 6).length,
      weak: levels.filter((l) => l > 0 && l <= 3).length,
      due: ready ? dueWords(state).length : 0,
      weakList: ready ? weakWords(state) : [],
    };
  }, [state, ready]);

  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_1fr]">
      <aside className="bg-sidebar text-card md:sticky md:top-0 md:h-screen md:overflow-auto">
        <div className="px-4 pb-2 pt-4">
          <p className="font-serif text-lg leading-tight">HSK5 Vocabulary Mastery</p>
          <p className="mt-1 text-sm text-line">3521–3560 · 40 words</p>
        </div>
        <nav className="flex flex-nowrap gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:overflow-visible">
          {NAV.map((item) => {
            const Icon = item.icon;
            const on = view === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setView(item.id)}
                className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl px-3 text-left text-sm font-semibold ${on ? "bg-sidebar-2 text-card" : "text-line"}`}
              >
                <Icon size={16} aria-hidden />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="mx-3 mb-4 hidden rounded-xl bg-sidebar-2 p-3 text-sm md:block">
          <p className="text-line">Today</p>
          <p className="font-semibold">
            {state.today.reviewed} reviewed · {state.today.correct} correct
          </p>
          <p className="mt-1 text-line">Weak: {stats.weakList.slice(0, 3).map((w) => w.zh).join(" ") || "—"}</p>
        </div>
      </aside>
      <main className="mx-auto w-full max-w-5xl px-4 py-6 md:px-8 md:py-8">
        {view === "dash" && (
          <Dashboard state={state} stats={stats} setView={setView} />
        )}
        {view === "learn" && <Learn state={state} commit={commit} onTest={() => setView("recall")} />}
        {view === "recall" && <Recall state={state} mark={mark} focus={DRILL} />}
        {view === "sentence" && <Sentences state={state} mark={mark} commit={commit} />}
        {view === "write" && <Writing mark={mark} />}
        {view === "speak" && <Speaking mark={mark} />}
        {view === "talk" && <Talk mark={mark} />}
        {view === "test" && <MixedTest mark={mark} />}
        {view === "weak" && <Weak state={state} onDrill={() => setView("recall")} />}
        {view === "progress" && (
          <Progress
            state={state}
            onReset={() => {
              const fresh = emptyState();
              commit(fresh);
            }}
          />
        )}
        {view === "program" && <Program state={state} mark={mark} onRecall={() => setView("recall")} />}
        {view === "contrast" && <Contrasts mark={mark} />}
      </main>
    </div>
  );
}

function Dashboard({
  state,
  stats,
  setView,
}: {
  state: AppState;
  stats: { mastered: number; strong: number; weak: number; due: number; weakList: Word[] };
  setView: (v: View) => void;
}) {
  const rest = Math.max(0, 40 - stats.mastered - stats.strong - stats.weak);
  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-serif text-3xl">HSK5 Vocabulary Mastery</h1>
        <p className="mt-1 text-muted">Words 3521–3560. Recognition is not the goal. Produce the word.</p>
      </header>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat n={state.today.reviewed} label="Reviewed today" />
        <Stat n={state.today.correct} label="Correct recall" />
        <Stat n={state.today.sentence} label="Sentence uses" />
        <Stat n={state.today.speak} label="Speaking attempts" />
        <Stat n={state.today.write} label="Writing marks" />
        <Stat n={stats.weakList.length} label="Weak words" />
        <Stat n={stats.mastered} label="Mastered" />
        <Stat n={stats.due} label="Due now" />
      </div>
      <Card>
        <h2 className="font-serif text-xl">Mastery mix</h2>
        <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-line">
          <i className="block h-full bg-master" style={{ width: `${(stats.mastered / 40) * 100}%` }} />
          <i className="block h-full bg-strong" style={{ width: `${(stats.strong / 40) * 100}%` }} />
          <i className="block h-full bg-muted" style={{ width: `${(rest / 40) * 100}%` }} />
          <i className="block h-full bg-accent" style={{ width: `${(stats.weak / 40) * 100}%` }} />
        </div>
        <p className="mt-2 text-sm text-muted">
          A word is not mastered after one correct answer. Mastered is level 7, after repeated successful retrieval.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Tag tone="master">Mastered {stats.mastered}</Tag>
          <Tag tone="strong">Strong {stats.strong}</Tag>
          <Tag>Needs review {rest}</Tag>
          <Tag tone="weak">Weak {stats.weak}</Tag>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" className={btnPrimary} onClick={() => setView("recall")}>
            Today's Practice
          </button>
          <button type="button" className={btn} onClick={() => setView("program")}>
            7-day Program
          </button>
          <button type="button" className={btn} onClick={() => setView("recall")}>
            Drill 中介 → 转变
          </button>
        </div>
      </Card>
      <Card>
        <h2 className="font-serif text-xl">Support comes off in stages</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted">
          <li>Chinese + pinyin + English</li>
          <li>Chinese + pinyin</li>
          <li>Chinese only</li>
          <li>English situation → Chinese</li>
          <li>Chinese situation → spontaneous Chinese</li>
          <li>Conversation without showing the target word first</li>
        </ol>
      </Card>
    </div>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <Card>
      <p className="font-serif text-3xl">{n}</p>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
    </Card>
  );
}

function Learn({ state, commit, onTest }: { state: AppState; commit: (s: AppState) => void; onTest: () => void }) {
  const [n, setN] = useState(3521);
  const [hideZh, setHideZh] = useState(false);
  const [hidePy, setHidePy] = useState(false);
  const [hideEn, setHideEn] = useState(false);
  const w = WORDS.find((x) => x.n === n) ?? WORDS[0];
  const s = state.words[w.n];

  function open(num: number) {
    setN(num);
    const cur = state.words[num];
    if (cur && cur.level < 1) {
      const next = {
        ...state,
        words: { ...state.words, [num]: { ...cur, level: 1, last: Date.now() } },
      };
      commit(next);
    }
  }

  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-serif text-3xl">Learn</h1>
        <p className="text-muted">Hide the supports, then test yourself. Audio uses your browser voice.</p>
      </header>
      <div className="flex flex-wrap gap-2">
        <button type="button" className={hideEn ? btnPrimary : btn} onClick={() => setHideEn((v) => !v)}>
          Hide English
        </button>
        <button type="button" className={hidePy ? btnPrimary : btn} onClick={() => setHidePy((v) => !v)}>
          Hide pinyin
        </button>
        <button type="button" className={hideZh ? btnPrimary : btn} onClick={() => setHideZh((v) => !v)}>
          Hide characters
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {WORDS.map((word) => (
          <button key={word.n} type="button" onClick={() => open(word.n)} className="rounded-card border border-line bg-card p-3 text-left">
            <span className="text-xs text-muted">{word.n}</span>
            <p className="font-serif text-2xl">{word.zh}</p>
            <p className="text-sm text-accent">{word.py}</p>
          </button>
        ))}
      </div>
      <Card>
        <div className="flex flex-wrap items-center gap-2">
          <Tag>{w.n}</Tag>
          <Tag tone={band(s.level) === "master" ? "master" : band(s.level) === "strong" ? "strong" : band(s.level) === "weak" ? "weak" : "plain"}>
            {LEVELS[s.level]}
          </Tag>
          <button type="button" className={btn} onClick={() => speakZh(w.zh)}>
            <Volume2 size={16} aria-hidden /> Play
          </button>
          <button type="button" className={btnPrimary} onClick={onTest}>
            Test me
          </button>
        </div>
        <p className={`mt-3 font-serif text-5xl ${hideZh ? "blur-md" : ""}`}>{w.zh}</p>
        <p className={`text-lg text-accent ${hidePy ? "blur-md" : ""}`}>{w.py}</p>
        <p className={`text-muted ${hideEn ? "blur-md" : ""}`}>{w.en}</p>
        <h3 className="mt-4 font-semibold">Character breakdown</h3>
        <p>{w.parts.map((p) => `${p.c} = ${p.m}`).join(" · ")}</p>
        <h3 className="mt-3 font-semibold">Memory hook</h3>
        <p>{w.hook}</p>
        <h3 className="mt-3 font-semibold">Natural usage</h3>
        <p>{w.usage}</p>
        <h3 className="mt-3 font-semibold">Collocations</h3>
        <div className="mt-1 flex flex-wrap gap-2">
          {w.cols.map((c) => (
            <Tag key={c}>{c}</Tag>
          ))}
        </div>
        <h3 className="mt-4 font-semibold">Examples</h3>
        <div className="mt-2 space-y-2">
          {w.ex.map((e) => (
            <div key={e.zh} className="rounded-xl bg-paper p-3">
              <p className="text-xs text-muted">Level {e.lv}</p>
              <p className="font-serif text-2xl">{e.zh}</p>
              <p className="text-accent">{e.py}</p>
              <p className="text-muted">{e.en}</p>
              <button type="button" className={`${btn} mt-2`} onClick={() => speakZh(e.zh)}>
                Play
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Recall({ state, mark, focus }: { state: AppState; mark: (n: number, ok: boolean, kind: Kind) => void; focus: string[] }) {
  const [queue, setQueue] = useState<Word[]>(() => pick(WORDS, 10));
  const [i, setI] = useState(0);
  const [nonce, setNonce] = useState(0);
  const [val, setVal] = useState("");
  const [shown, setShown] = useState(false);
  const [ok, setOk] = useState(false);
  const w = queue[i];
  const item = useMemo(() => (w ? makeRecall(w) : null), [w, nonce]);

  if (!w || !item) {
    return (
      <Card>
        <h1 className="font-serif text-3xl">Recall set done</h1>
        <p className="mt-2 text-muted">Missed words drop a level and come back sooner.</p>
        <button
          type="button"
          className={`${btnPrimary} mt-4`}
          onClick={() => {
            const due = dueWords(state);
            setQueue(pick(due.length ? due : WORDS, 10));
            setI(0);
            setNonce((n) => n + 1);
            setShown(false);
            setVal("");
          }}
        >
          Another set
        </button>
      </Card>
    );
  }

  function grade(forceWrong: boolean) {
    const pass = !forceWrong && recallOk(val, item!, w);
    setOk(pass);
    setShown(true);
    mark(w.n, pass, "recall");
  }

  function next() {
    setI((n) => n + 1);
    setNonce((n) => n + 1);
    setVal("");
    setShown(false);
  }

  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-serif text-3xl">Active Recall</h1>
        <p className="text-muted">
          {i + 1} / {queue.length} · Type {item.type}. The answer stays hidden.
        </p>
      </header>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={btn}
          onClick={() => {
            setQueue(focus.map(byZh));
            setI(0);
            setNonce((n) => n + 1);
            setShown(false);
            setVal("");
          }}
        >
          Five-word check
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => {
            const due = dueWords(state);
            setQueue(pick(due.length ? due : WORDS, 10));
            setI(0);
            setNonce((n) => n + 1);
            setShown(false);
            setVal("");
          }}
        >
          Due words
        </button>
      </div>
      <Card>
        <Tag>{item.prompt}</Tag>
        <p className="mt-3 font-serif text-3xl">{item.show}</p>
        <p className="mt-1 text-sm text-muted">Type Chinese unless the prompt asks for pinyin and meaning.</p>
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !shown) grade(false);
          }}
          className="mt-3 w-full rounded-xl border border-line bg-card px-3 py-3 text-lg"
          placeholder="Your answer"
          autoComplete="off"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" className={btnPrimary} disabled={shown} onClick={() => grade(false)}>
            Check
          </button>
          <button type="button" className={btn} disabled={shown} onClick={() => grade(true)}>
            I Don't Know
          </button>
          <button type="button" className={btn} disabled={shown} onClick={() => grade(true)}>
            Show Answer
          </button>
        </div>
        {shown && (
          <div className={`mt-4 border-l-4 pl-3 ${ok ? "border-strong bg-strong-soft" : "border-accent bg-accent-soft"}`}>
            <p className="font-semibold">{ok ? "Correct" : "Not yet"}</p>
            <p className="font-serif text-3xl">{w.zh}</p>
            <p className="text-accent">{w.py}</p>
            <p>{w.en}</p>
            <p className="mt-1">
              {w.ex[0].zh} · {w.ex[0].en}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {!ok && (
                <button
                  type="button"
                  className={btnGood}
                  onClick={() => {
                    mark(w.n, true, "recall");
                    next();
                  }}
                >
                  Correct
                </button>
              )}
              <button type="button" className={btn} onClick={next}>
                Almost
              </button>
              {ok && (
                <button
                  type="button"
                  className={btnBad}
                  onClick={() => {
                    mark(w.n, false, "recall");
                    next();
                  }}
                >
                  Wrong
                </button>
              )}
              <button type="button" className={btnPrimary} onClick={next}>
                Next
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function Sentences({ state, mark, commit }: { state: AppState; mark: (n: number, ok: boolean, kind: Kind) => void; commit: (s: AppState) => void }) {
  const [queue, setQueue] = useState<Word[]>(() => pick(WORDS, 5));
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [note, setNote] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const w = queue[i];
  if (!w) return null;
  const saved = state.sentences[w.n] ?? [];
  const prompts = [
    `Write a sentence about something you personally care about, using ${w.zh}.`,
    `Write a sentence about your own study or work, using ${w.zh}.`,
    `Write a sentence about a real place or person, using ${w.zh}.`,
  ];

  function evalSentence() {
    const has = text.includes(w.zh);
    const long = text.replace(/\s/g, "").length >= 6;
    const pass = has && long;
    setOk(pass);
    setNote(
      pass
        ? "Target word used in a full clause. It does not have to match the model."
        : `${has ? "" : "Target word missing. "}${long ? "" : "Too short to be a sentence."}`,
    );
    mark(w.n, pass, "sentence");
  }

  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-serif text-3xl">Sentence Builder</h1>
        <p className="text-muted">
          {i + 1} / {queue.length}. Use the word yourself. A model appears only after you try.
        </p>
      </header>
      <Card>
        <p className="font-serif text-4xl">{w.zh}</p>
        <p className="text-accent">
          {w.py} · {w.en}
        </p>
        <div className="mt-3 rounded-xl bg-paper p-3">
          <p className="text-xs font-semibold uppercase text-muted">Level 3 — personal</p>
          <p>{prompts[w.n % 3]}</p>
        </div>
        <p className="mt-3 text-sm text-muted">Level 1 and 2 models stay hidden until you submit.</p>
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="mt-3 min-h-28 w-full rounded-xl border border-line p-3 text-lg" placeholder="用这个词写一个完整的句子" />
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" className={btnPrimary} onClick={evalSentence}>
            Evaluate
          </button>
          <button
            type="button"
            className={btn}
            onClick={() => {
              const t = text.trim();
              if (!t) return;
              commit({ ...state, sentences: { ...state.sentences, [w.n]: [...saved, t] } });
            }}
          >
            Save my sentence
          </button>
        </div>
        {note && (
          <div className={`mt-4 border-l-4 pl-3 ${ok ? "border-strong" : "border-accent"}`}>
            <p>{note}</p>
            <p className="mt-2">Basic model: {w.ex[0].zh}</p>
            <p>HSK5 version: {w.ex[1]?.zh ?? w.ex[0].zh}</p>
            <p className="text-sm text-muted">{w.usage}</p>
            <button
              type="button"
              className={`${btnPrimary} mt-3`}
              onClick={() => {
                const n = i + 1;
                setText("");
                setNote(null);
                if (n >= queue.length) {
                  setQueue(pick(WORDS, 5));
                  setI(0);
                } else setI(n);
              }}
            >
              Next
            </button>
          </div>
        )}
      </Card>
      <Card>
        <h2 className="font-semibold">Your sentences</h2>
        {saved.length === 0 && <p className="text-sm text-muted">None saved for this word yet.</p>}
        <ul className="mt-2 space-y-2">
          {saved.map((s) => (
            <li key={s} className="rounded-xl bg-paper p-3">
              {s}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function Writing({ mark }: { mark: (n: number, ok: boolean, kind: Kind) => void }) {
  const kinds = ["en", "py", "hide", "sent", "dict"] as const;
  const [queue, setQueue] = useState<Word[]>(() => pick(WORDS, 5));
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [fb, setFb] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const w = queue[i];
  if (!w) return null;
  const kind = kinds[i % 5];
  const show =
    kind === "en" ? w.en : kind === "py" ? w.py : kind === "hide" ? "Characters hidden — type them" : kind === "dict" ? w.ex[0].py : `${w.zh} · write a full formal sentence`;
  const label =
    kind === "en" ? "English → Chinese" : kind === "py" ? "Pinyin → Chinese" : kind === "hide" ? "Character recall" : kind === "dict" ? "Dictation" : "Sentence writing";

  function check(force: boolean) {
    let pass = false;
    let note = "";
    if (kind === "sent") {
      pass = !force && text.includes(w.zh) && text.length >= 8;
      note = pass ? "Word used in a sentence." : "Include the target word in a full sentence.";
    } else if (kind === "dict") {
      pass = !force && norm(text) === norm(w.ex[0].zh);
      note = pass ? "Dictation matched." : `Expected: ${w.ex[0].zh}`;
    } else {
      pass = !force && norm(text) === norm(w.zh);
      if (!pass && text) {
        const miss = [...w.zh].filter((ch) => !text.includes(ch));
        const extra = [...text].filter((ch) => ch.trim() && !w.zh.includes(ch));
        note = `${miss.length ? `Missing: ${miss.join(" ")}. ` : ""}${extra.length ? `Wrong or extra: ${extra.join(" ")}` : ""}`;
      }
    }
    setOk(pass);
    setFb(note || (pass ? "Correct." : "Not yet."));
    mark(w.n, pass, "write");
  }

  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-serif text-3xl">Writing</h1>
        <p className="text-muted">
          {label} · {i + 1}/{queue.length}
        </p>
      </header>
      <Card>
        <p className="font-serif text-3xl">{show}</p>
        {kind === "dict" && (
          <button type="button" className={`${btn} mt-3`} onClick={() => speakZh(w.ex[0].zh)}>
            Play sentence
          </button>
        )}
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="mt-3 min-h-28 w-full rounded-xl border border-line p-3 text-lg" placeholder="写出汉字" />
        <div className="mt-3 flex gap-2">
          <button type="button" className={btnPrimary} onClick={() => check(false)} disabled={fb !== null}>
            Check
          </button>
          <button type="button" className={btn} onClick={() => check(true)} disabled={fb !== null}>
            I Don't Know
          </button>
        </div>
        {fb && (
          <div className={`mt-4 border-l-4 pl-3 ${ok ? "border-strong" : "border-accent"}`}>
            <p className="font-semibold">{ok ? "Correct" : "Needs work"}</p>
            <p>{fb}</p>
            <p className="font-serif text-2xl">{kind === "dict" ? w.ex[0].zh : w.zh}</p>
            <p className="text-accent">{w.py}</p>
            <button
              type="button"
              className={`${btnPrimary} mt-3`}
              onClick={() => {
                setText("");
                setFb(null);
                if (i + 1 >= queue.length) {
                  setQueue(pick(WORDS, 5));
                  setI(0);
                } else setI(i + 1);
              }}
            >
              Next
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}

function Speaking({ mark }: { mark: (n: number, ok: boolean, kind: Kind) => void }) {
  const [queue, setQueue] = useState<Word[]>(() => pick(WORDS, 3));
  const [i, setI] = useState(0);
  const [said, setSaid] = useState("");
  const [fb, setFb] = useState<{ score: number; used: boolean } | null>(null);
  const [listening, setListening] = useState(false);
  const w = queue[i];
  if (!w) return null;
  const sit = SITUATIONS.find((s) => s.words.includes(w.zh)) ?? SITUATIONS[0];

  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-serif text-3xl">Speaking</h1>
        <p className="text-muted">The model stays hidden until you answer. Minor recognition errors are not punished.</p>
      </header>
      <Card>
        <Tag>{sit.place}</Tag>
        <p className="mt-3 font-serif text-2xl">请你用“{w.zh}”说一句话。</p>
        <p className="text-accent">{w.py}</p>
        <p className="text-muted">
          {w.en}. {sit.zh}.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            className={btnPrimary}
            onClick={() => {
              setListening(true);
              listenZh((t) => {
                setListening(false);
                if (t) setSaid(t);
              });
            }}
          >
            <Mic size={16} aria-hidden /> {listening ? "Listening…" : "Speak"}
          </button>
          <button type="button" className={btn} onClick={() => speakZh(`请你用${w.zh}说一句话`)}>
            Hear the prompt
          </button>
        </div>
        <textarea value={said} onChange={(e) => setSaid(e.target.value)} className="mt-3 min-h-24 w-full rounded-xl border border-line p-3 text-lg" placeholder="Speech appears here. You can also type." />
        <button
          type="button"
          className={`${btn} mt-3`}
          disabled={fb !== null}
          onClick={() => {
            const used = said.includes(w.zh);
            let score = 4;
            if (used) score += 3;
            if (said.length >= 8) score += 2;
            if (/[。！？]/.test(said) || said.length > 12) score += 1;
            setFb({ score: Math.min(10, score), used });
            mark(w.n, used, "speak");
          }}
        >
          I have answered
        </button>
        {fb && (
          <div className={`mt-4 border-l-4 pl-3 ${fb.used ? "border-strong" : "border-accent"}`}>
            <p className="font-semibold">Score {fb.score}/10</p>
            <p>Target word: {fb.used ? "used" : "not detected"}.</p>
            <p>Grammar: {said.length >= 8 ? "full enough to judge" : "expand to a clause"}.</p>
            <p>Fluency is not scored from the recognizer.</p>
            <p className="mt-2 font-serif text-2xl">{w.ex[1]?.zh ?? w.ex[0].zh}</p>
            <p className="text-accent">{w.ex[1]?.py ?? w.ex[0].py}</p>
            <p>{w.ex[1]?.en ?? w.ex[0].en}</p>
            <button
              type="button"
              className={`${btnPrimary} mt-3`}
              onClick={() => {
                setSaid("");
                setFb(null);
                if (i + 1 >= queue.length) {
                  setQueue(pick(WORDS, 3));
                  setI(0);
                } else setI(i + 1);
              }}
            >
              Next
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}

function Talk({ mark }: { mark: (n: number, ok: boolean, kind: Kind) => void }) {
  const [pack, setPack] = useState(() => TALKS[Math.floor(Math.random() * TALKS.length)]);
  const [i, setI] = useState(0);
  const [log, setLog] = useState<{ role: string; text: string }[]>([]);
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const line = pack.lines[i];

  function finish(history: { role: string; text: string }[]) {
    const all = history.map((s) => s.text).join("");
    const used = pack.words.filter((z) => all.includes(z));
    const missed = pack.words.filter((z) => !all.includes(z));
    used.forEach((z) => mark(byZh(z).n, true, "speak"));
    missed.forEach((z) => mark(byZh(z).n, false, "speak"));
    setDone(true);
  }

  if (done) {
    const all = log.map((s) => s.text).join("");
    const used = pack.words.filter((z) => all.includes(z));
    const missed = pack.words.filter((z) => !all.includes(z));
    return (
      <Card>
        <h1 className="font-serif text-3xl">Conversation report</h1>
        <p className="mt-3">Words used: {used.map((z) => `${z} ✓`).join(" ") || "—"}</p>
        <p>Not used: {missed.join("、") || "—"}</p>
        <button
          type="button"
          className={`${btnPrimary} mt-4`}
          onClick={() => {
            setPack(TALKS[Math.floor(Math.random() * TALKS.length)]);
            setI(0);
            setLog([]);
            setText("");
            setDone(false);
          }}
        >
          New conversation
        </button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-serif text-3xl">Conversation</h1>
        <p className="text-muted">Answer in complete sentences. Target words are not listed until the end.</p>
      </header>
      <Card>
        <div className="space-y-2">
          {log.map((s, idx) => (
            <div key={`${s.role}-${idx}`} className="rounded-xl bg-paper p-3">
              <p className="text-xs font-semibold text-muted">{s.role}</p>
              <p className="font-serif text-xl">{s.text}</p>
            </div>
          ))}
        </div>
        {line && (
          <>
            <div className="mt-3 rounded-xl bg-paper p-3">
              <p className="text-xs font-semibold text-muted">对方</p>
              <p className="font-serif text-2xl">{line}</p>
              <button type="button" className={`${btn} mt-2`} onClick={() => speakZh(line)}>
                Play
              </button>
            </div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} className="mt-3 min-h-24 w-full rounded-xl border border-line p-3 text-lg" placeholder="用完整的句子回答" />
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                className={btnPrimary}
                onClick={() => {
                  const answer = text.trim() || "（没有回答）";
                  const history = [...log, { role: "对方", text: line }, { role: "我", text: answer }];
                  setLog(history);
                  setText("");
                  if (i + 1 >= pack.lines.length) finish(history);
                  else setI(i + 1);
                }}
              >
                回答
              </button>
              <button type="button" className={btn} onClick={() => listenZh((t) => t && setText(t))}>
                Speak
              </button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

type TQ = { k: string; w: Word; show: string; expect: string };

function buildTest(): TQ[] {
  const qs: TQ[] = [];
  pick(WORDS, 10).forEach((w) => qs.push({ k: "Chinese → meaning", w, show: w.zh, expect: w.en.split(/[;/]/)[0] }));
  pick(WORDS, 10).forEach((w) => qs.push({ k: "Meaning → Chinese", w, show: w.en, expect: w.zh }));
  pick(WORDS, 5).forEach((w) => qs.push({ k: "Pinyin → Chinese", w, show: w.py, expect: w.zh }));
  pick(WORDS, 5).forEach((w) => qs.push({ k: "Blank", w, show: (w.ex[1] ?? w.ex[0]).zh.replace(w.zh, "____"), expect: w.zh }));
  pick(WORDS, 5).forEach((w) => qs.push({ k: "Correction", w, show: `改成自然的句子，必须用上“${w.zh}”。提示：时间我们要${w.zh}。`, expect: w.zh }));
  pick(WORDS, 5).forEach((w) => qs.push({ k: "Translation", w, show: w.ex[0].en, expect: w.zh }));
  pick(WORDS, 5).forEach((w) => qs.push({ k: "Speaking", w, show: `说或写一句带“${w.zh}”的话`, expect: w.zh }));
  return pick(qs, qs.length);
}

function MixedTest({ mark }: { mark: (n: number, ok: boolean, kind: Kind) => void }) {
  const [qs, setQs] = useState<TQ[] | null>(null);
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [scores, setScores] = useState({ v: 0, nv: 0, w: 0, nw: 0, g: 0, ng: 0, s: 0, ns: 0, wrong: [] as number[] });

  if (!qs) {
    return (
      <div className="space-y-4">
        <h1 className="font-serif text-3xl">Mixed Test</h1>
        <p className="text-muted">45 items in random order: meaning, characters, pinyin, blanks, corrections, translation, speaking.</p>
        <button
          type="button"
          className={btnPrimary}
          onClick={() => {
            setQs(buildTest());
            setI(0);
            setScores({ v: 0, nv: 0, w: 0, nw: 0, g: 0, ng: 0, s: 0, ns: 0, wrong: [] });
          }}
        >
          Start test
        </button>
      </div>
    );
  }

  if (i >= qs.length) {
    const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0);
    const parts = [pct(scores.v, scores.nv), pct(scores.w, scores.nw), pct(scores.g, scores.ng), pct(scores.s, scores.ns)];
    const overall = Math.round(parts.reduce((a, b) => a + b, 0) / 4);
    const weakest = [...new Set(scores.wrong)].slice(0, 5).map((n) => WORDS.find((w) => w.n === n)?.zh);
    return (
      <Card>
        <h1 className="font-serif text-3xl">Results</h1>
        <p className="mt-3">Vocabulary {parts[0]} · Writing {parts[1]} · Grammar {parts[2]} · Speaking {parts[3]}</p>
        <p className="font-serif text-4xl">{overall}</p>
        <p>Weakest: {weakest.filter(Boolean).join("、") || "none"}</p>
      </Card>
    );
  }

  const q = qs[i];
  function submit(force: boolean) {
    const val = text.trim();
    let pass = !force && (norm(val).includes(norm(q.expect)) || val.includes(q.w.zh));
    if (q.k === "Chinese → meaning") pass = !force && val.toLowerCase().includes(q.expect.toLowerCase().split(/\s+/)[0]);
    if (q.k === "Speaking") pass = !force && val.includes(q.w.zh);
    const kind: Kind = q.k === "Speaking" ? "speak" : q.k === "Correction" || q.k === "Translation" ? "write" : "recall";
    mark(q.w.n, pass, kind);
    setScores((s) => {
      const next = { ...s, wrong: pass ? s.wrong : [...s.wrong, q.w.n] };
      if (q.k === "Chinese → meaning" || q.k === "Meaning → Chinese" || q.k === "Pinyin → Chinese") return { ...next, nv: s.nv + 1, v: s.v + (pass ? 1 : 0) };
      if (q.k === "Blank" || q.k === "Translation") return { ...next, nw: s.nw + 1, w: s.w + (pass ? 1 : 0) };
      if (q.k === "Correction") return { ...next, ng: s.ng + 1, g: s.g + (pass ? 1 : 0) };
      return { ...next, ns: s.ns + 1, s: s.s + (pass ? 1 : 0) };
    });
    setText("");
    setI((n) => n + 1);
  }

  return (
    <div className="space-y-4">
      <h1 className="font-serif text-3xl">Mixed Test</h1>
      <Card>
        <p className="text-sm text-muted">
          {i + 1} / 45 · {q.k}
        </p>
        <p className="mt-2 font-serif text-3xl">{q.show}</p>
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="mt-3 min-h-24 w-full rounded-xl border border-line p-3 text-lg" />
        <div className="mt-3 flex gap-2">
          <button type="button" className={btnPrimary} onClick={() => submit(false)}>
            Submit
          </button>
          <button type="button" className={btn} onClick={() => submit(true)}>
            I Don't Know
          </button>
        </div>
      </Card>
    </div>
  );
}

function Weak({ state, onDrill }: { state: AppState; onDrill: () => void }) {
  const list = weakWords(state);
  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-serif text-3xl">Weak Words</h1>
        <p className="text-muted">A miss lowers mastery and brings the word back sooner. Contexts here are not the recall card you just saw.</p>
      </header>
      {list.length === 0 && <Card>No weak words yet. Miss a recall item and it will collect here.</Card>}
      {list.map((w) => {
        const s = state.words[w.n];
        const sit = SITUATIONS[w.n % SITUATIONS.length];
        return (
          <Card key={w.n}>
            <p className="font-serif text-4xl">{w.zh}</p>
            <p className="text-accent">{w.py}</p>
            <p>{w.en}</p>
            <p className="mt-2">{w.hook}</p>
            <p className="mt-2">Example: {w.ex[1]?.zh ?? w.ex[0].zh}</p>
            <p className="text-sm text-muted">
              {s.wrong} incorrect / {s.correct} correct. {s.reasons.join("; ") || "Recent miss."}
            </p>
            <p className="mt-2">New sentence: 在“{sit.place}”用“{w.zh}”写一句话。</p>
            <p>New speaking: 请用“{w.zh}”说明{sit.zh}里的一件事。</p>
            <button type="button" className={`${btnPrimary} mt-3`} onClick={onDrill}>
              Drill in recall
            </button>
          </Card>
        );
      })}
    </div>
  );
}

function Progress({ state, onReset }: { state: AppState; onReset: () => void }) {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-serif text-3xl">Progress / Memory</h1>
        <p className="text-muted">0 New through 7 Mastered. Up only after a successful retrieval. Intervals: same session, then 1, 3, 7, 14, 30 days.</p>
      </header>
      <div className="grid gap-2 md:grid-cols-2">
        {WORDS.map((w) => {
          const s = state.words[w.n];
          const next = s.next ? new Date(s.next).toLocaleDateString() : "now";
          return (
            <Card key={w.n}>
              <div className="flex flex-wrap gap-2">
                <Tag>{w.n}</Tag>
                <Tag tone={band(s.level) === "master" ? "master" : band(s.level) === "strong" ? "strong" : band(s.level) === "weak" ? "weak" : "plain"}>{LEVELS[s.level]}</Tag>
              </div>
              <p className="font-serif text-3xl">{w.zh}</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-line">
                <div className="h-full bg-strong" style={{ width: `${(s.level / 7) * 100}%` }} />
              </div>
              <p className="mt-2 text-sm text-muted">
                Attempts {s.attempts} · correct {s.correct} · wrong {s.wrong}
                <br />
                Sentence {s.sentence} · writing {s.writing} · speaking {s.speaking}
                <br />
                Next review {next}
              </p>
            </Card>
          );
        })}
      </div>
      <button
        type="button"
        className={btn}
        onClick={() => {
          if (confirm("Reset all mastery data in this browser?")) onReset();
        }}
      >
        Reset progress
      </button>
    </div>
  );
}

const DAYS: { from: number; to: number; text: string }[] = [
  { from: 3521, to: 3530, text: "Learn 3521–3530. Active recall and writing." },
  { from: 3531, to: 3540, text: "Learn 3531–3540. Review earlier words. Speaking." },
  { from: 3541, to: 3550, text: "Learn 3541–3550. Review. Sentence building." },
  { from: 3551, to: 3560, text: "Learn 3551–3560. Review. Writing and speaking." },
  { from: 3521, to: 3560, text: "All 40. Mixed recall and word families." },
  { from: 3521, to: 3560, text: "All 40. Sentences, speaking, conversation." },
  { from: 3521, to: 3560, text: "Full test, speaking, and the five-word story." },
];

function Program({ state, mark, onRecall }: { state: AppState; mark: (n: number, ok: boolean, kind: Kind) => void; onRecall: () => void }) {
  const day = programDay(state.dayAnchor);
  const [five, setFive] = useState<Word[] | null>(null);
  const [text, setText] = useState("");
  const [started, setStarted] = useState(0);
  const [score, setScore] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-serif text-3xl">7-day Program</h1>
        <p className="text-muted">Day {day} of 7. After day 7, missed words stay in the review cycle.</p>
      </header>
      {DAYS.map((d, idx) => (
        <div key={d.text} className="border-l-4 border-accent pl-3">
          <p className="font-semibold">
            Day {idx + 1}
            {idx + 1 === day ? " · today" : ""}
          </p>
          <p className="text-muted">{d.text}</p>
          <button type="button" className={`${btn} mt-2`} onClick={onRecall}>
            Start recall
          </button>
        </div>
      ))}
      <Card>
        <h2 className="font-serif text-xl">Five-word story</h2>
        <p className="text-sm text-muted">Use all five words. About 60–90 seconds. Exact wording is not required.</p>
        <button
          type="button"
          className={`${btnPrimary} mt-3`}
          onClick={() => {
            setFive(pick(WORDS, 5));
            setText("");
            setScore(null);
            setStarted(Date.now());
          }}
        >
          Start story challenge
        </button>
        {five && (
          <div className="mt-3">
            <p className="font-serif text-2xl">{five.map((w) => w.zh).join("、")}</p>
            <textarea value={text} onChange={(e) => setText(e.target.value)} className="mt-3 min-h-28 w-full rounded-xl border border-line p-3" placeholder="写一个小故事，或把口述贴在这里" />
            <button
              type="button"
              className={`${btnPrimary} mt-3`}
              onClick={() => {
                const used = five.filter((w) => text.includes(w.zh));
                const sec = Math.round((Date.now() - started) / 1000);
                const total = Math.round((used.length / 5) * 40 + (text.length > 20 ? 20 : 10) + 15 + (text.length > 40 ? 15 : 8) + (sec <= 90 ? 10 : 6));
                used.forEach((w) => mark(w.n, true, "sentence"));
                five.filter((w) => !text.includes(w.zh)).forEach((w) => mark(w.n, false, "sentence"));
                setScore(`Score ${total}/100. Used ${used.map((w) => w.zh).join("、") || "none"}. Time ${sec}s.`);
              }}
            >
              Score
            </button>
            {score && <p className="mt-3">{score}</p>}
          </div>
        )}
      </Card>
      <Card>
        <h2 className="font-serif text-xl">Word families</h2>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {FAMILIES.map((f) => (
            <div key={f.root}>
              <p className="font-serif text-2xl">{f.root}</p>
              <ul className="mt-1 text-sm">
                {f.items.map((z) => (
                  <li key={z}>├── {z}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Contrasts({ mark }: { mark: (n: number, ok: boolean, kind: Kind) => void }) {
  const [quiz, setQuiz] = useState<{ w: Word; opts: string[] } | null>(null);
  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-serif text-3xl">Contrasts</h1>
        <p className="text-muted">Choose the word. Reading the note is not the exercise.</p>
      </header>
      {CONTRASTS.map((c) => (
        <Card key={c.id}>
          <h2 className="font-serif text-xl">{c.title}</h2>
          <p className="mt-1">{c.body}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {c.words.map((z) => (
              <Tag key={z}>{z}</Tag>
            ))}
          </div>
          <button
            type="button"
            className={`${btn} mt-3`}
            onClick={() => {
              const w = byZh(c.words[0]);
              const opts = pick(
                [...c.words, ...pick(WORDS.map((x) => x.zh).filter((z) => !c.words.includes(z)), 2)],
                4,
              );
              setQuiz({ w, opts: pick(opts, opts.length) });
            }}
          >
            Quiz this set
          </button>
        </Card>
      ))}
      {quiz && (
        <Card>
          <p>Which word matches: {quiz.w.en}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {quiz.opts.map((z) => (
              <button
                key={z}
                type="button"
                className={btn}
                onClick={() => {
                  mark(quiz.w.n, z === quiz.w.zh, "recall");
                  setQuiz(null);
                }}
              >
                {z}
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
