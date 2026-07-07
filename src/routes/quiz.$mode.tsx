import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Lightbulb,
  Sparkles,
  Trophy,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { MODE_META, getQuestionsByMode, type Question, type QuizMode } from "@/data/questions";
import { loadStats, recordAttempt, toggleBookmark } from "@/lib/quiz-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/quiz/$mode")({
  component: QuizPage,
});

function QuizPage() {
  const { mode } = Route.useParams();
  const navigate = useNavigate();
  const validMode = (["quick", "practice", "exam"] as const).includes(mode as QuizMode)
    ? (mode as QuizMode)
    : "quick";
  const meta = MODE_META[validMode];

  const questions = useMemo(() => getQuestionsByMode(validMode), [validMode]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);
  const [bookmarked, setBookmarked] = useState<string[]>(() =>
    typeof window !== "undefined" ? loadStats().bookmarks : [],
  );
  const startedAt = useRef(Date.now());

  // Timer for exam mode
  const [remaining, setRemaining] = useState(meta.minutes ? meta.minutes * 60 : 0);
  useEffect(() => {
    if (!meta.minutes) return;
    const t = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(t);
          setFinished(true);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [meta.minutes]);

  const q = questions[index];
  const selected = answers[q?.id] ?? [];
  const isRevealed = revealed[q?.id];

  function select(cid: string) {
    if (isRevealed) return;
    setAnswers((a) => {
      const cur = a[q.id] ?? [];
      if (q.type === "single") return { ...a, [q.id]: [cid] };
      return {
        ...a,
        [q.id]: cur.includes(cid) ? cur.filter((x) => x !== cid) : [...cur, cid],
      };
    });
  }

  function reveal() {
    if (selected.length === 0) return;
    setRevealed((r) => ({ ...r, [q.id]: true }));
  }

  function next() {
    if (index + 1 >= questions.length) {
      finish();
    } else {
      setIndex(index + 1);
    }
  }

  function finish() {
    // Compute results
    let correct = 0;
    const byDomain: Record<string, { total: number; correct: number }> = {};
    const wrongIds: string[] = [];
    for (const qq of questions) {
      const sel = [...(answers[qq.id] ?? [])].sort().join(",");
      const good = [...qq.answer].sort().join(",");
      const isGood = sel === good;
      if (isGood) correct++;
      else wrongIds.push(qq.id);
      byDomain[qq.domain] ??= { total: 0, correct: 0 };
      byDomain[qq.domain].total++;
      if (isGood) byDomain[qq.domain].correct++;
    }
    recordAttempt(
      {
        mode: validMode,
        total: questions.length,
        correct,
        byDomain,
        durationMs: Date.now() - startedAt.current,
      },
      wrongIds,
    );
    setFinished(true);
  }

  function toggleBM(id: string) {
    const on = toggleBookmark(id);
    setBookmarked((b) => (on ? [...b, id] : b.filter((x) => x !== id)));
  }

  if (finished) {
    return <Results questions={questions} answers={answers} mode={validMode} />;
  }

  if (!q) return null;

  const progressPct = ((index + 1) / questions.length) * 100;

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-3 sm:px-4 pt-3 sm:pt-4 pb-6 sm:pb-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <button
            onClick={() => navigate({ to: "/" })}
            className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5 sm:size-4" /> <span className="hidden sm:inline">Quitter</span>
          </button>
          <div className="text-[10px] sm:text-xs font-medium tabular-nums text-muted-foreground">
            Question {index + 1} / {questions.length}
          </div>
          {meta.minutes ? (
            <div
              className={cn(
                "flex items-center gap-1 text-xs sm:text-sm font-semibold tabular-nums px-2 sm:px-2.5 py-1 sm:py-1 rounded-lg",
                remaining < 300
                  ? "text-destructive bg-destructive/10"
                  : "text-foreground bg-surface-elevated",
              )}
            >
              <Clock className="size-3.5 sm:size-4" />
              {formatTime(remaining)}
            </div>
          ) : (
            <div className="w-10 sm:w-14" />
          )}
        </div>

        {/* Progress */}
        <div className="h-1 sm:h-1.5 rounded-full bg-secondary overflow-hidden mb-4 sm:mb-6">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-orange-500"
            initial={false}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={q.id + "-" + index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-7"
          >
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
              <Badge>{q.domain}</Badge>
              {q.service && <Badge variant="accent">{q.service}</Badge>}
              <Badge variant="ghost">{q.difficulty}</Badge>
              {q.type === "multiple" && <Badge variant="warning">Réponses multiples</Badge>}
              <button
                onClick={() => toggleBM(q.id)}
                className="ml-auto text-muted-foreground hover:text-primary p-1"
                aria-label="Ajouter aux favoris"
              >
                {bookmarked.includes(q.id) ? (
                  <BookmarkCheck className="size-4 sm:size-5 text-primary" />
                ) : (
                  <Bookmark className="size-4 sm:size-5" />
                )}
              </button>
            </div>

            {q.scenario && (
              <div className="mb-3 sm:mb-4 rounded-xl border border-accent/20 bg-accent/5 p-2.5 sm:p-3 text-xs sm:text-sm text-muted-foreground">
                <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-accent mb-1 font-semibold">
                  Scénario
                </div>
                {q.scenario}
              </div>
            )}

            <h2 className="text-base sm:text-lg md:text-xl font-semibold font-display leading-snug">
              {q.prompt}
            </h2>

            <div className="mt-4 sm:mt-5 space-y-1.5 sm:space-y-2">
              {q.choices.map((c) => {
                const isSel = selected.includes(c.id);
                const isCorrect = q.answer.includes(c.id);
                const showState = isRevealed;
                return (
                  <button
                    key={c.id}
                    onClick={() => select(c.id)}
                    disabled={isRevealed}
                    className={cn(
                      "w-full text-left rounded-lg sm:rounded-xl border p-2.5 sm:p-3.5 flex items-start gap-2 sm:gap-3 transition-all",
                      "hover:border-primary/40",
                      !showState &&
                        (isSel
                          ? "border-primary bg-primary/10"
                          : "border-border bg-surface/40"),
                      showState &&
                        isCorrect &&
                        "border-emerald-500/60 bg-emerald-500/10",
                      showState &&
                        !isCorrect &&
                        isSel &&
                        "border-destructive/60 bg-destructive/10",
                      showState && !isCorrect && !isSel && "border-border opacity-60",
                    )}
                  >
                    <div
                      className={cn(
                        "size-4 sm:size-5 shrink-0 rounded-md border flex items-center justify-center mt-0.5 text-[10px] sm:text-xs font-bold",
                        isSel && !showState && "bg-primary border-primary text-primary-foreground",
                        showState && isCorrect && "bg-emerald-500 border-emerald-500 text-white",
                        showState && !isCorrect && isSel && "bg-destructive border-destructive text-white",
                      )}
                    >
                      {showState && isCorrect && <CheckCircle2 className="size-3 sm:size-3.5" />}
                      {showState && !isCorrect && isSel && <XCircle className="size-3 sm:size-3.5" />}
                      {!showState && isSel && "✓"}
                    </div>
                    <span className="text-xs sm:text-sm flex-1 leading-relaxed">{c.text}</span>
                  </button>
                );
              })}
            </div>

            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 sm:mt-5 rounded-xl sm:rounded-2xl border border-border bg-surface-elevated/60 p-3 sm:p-4 space-y-2.5 sm:space-y-3"
              >
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary">
                  <Lightbulb className="size-3.5 sm:size-4" /> Explication
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-foreground/90">{q.explanation}</p>

                {q.whyWrong && (
                  <div className="pt-2 border-t border-border/60 space-y-1 sm:space-y-1.5">
                    <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Pourquoi les autres sont incorrects
                    </div>
                    {Object.entries(q.whyWrong).map(([cid, why]) => {
                      const choice = q.choices.find((c) => c.id === cid);
                      if (!choice) return null;
                      return (
                        <div key={cid} className="text-[10px] sm:text-xs text-muted-foreground">
                          <span className="text-destructive font-medium">✗ {choice.text} :</span>{" "}
                          {why}
                        </div>
                      );
                    })}
                  </div>
                )}

                {q.commonTrap && (
                  <div className="rounded-lg bg-warning/10 border border-warning/20 p-2 sm:p-2.5 text-[10px] sm:text-xs">
                    <span className="font-semibold text-warning">⚠️ Piège d'examen :</span>{" "}
                    {q.commonTrap}
                  </div>
                )}

                {q.memoryTrick && (
                  <div className="rounded-lg bg-primary/10 border border-primary/20 p-2 sm:p-2.5 text-[10px] sm:text-xs">
                    <span className="font-semibold text-primary">Astuce mnémo :</span>{" "}
                    {q.memoryTrick}
                  </div>
                )}

                {q.relatedServices && q.relatedServices.length > 0 && (
                  <div className="pt-2 border-t border-border/60">
                    <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1 sm:mb-1.5">
                      Services liés
                    </div>
                    <div className="flex flex-wrap gap-0.5 sm:gap-1">
                      {q.relatedServices.map((svc) => (
                        <span
                          key={svc}
                          className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20"
                        >
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {q.docUrl && (
                  <div className="pt-1">
                    <a
                      href={q.docUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] sm:text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      📚 Documentation AWS
                    </a>
                  </div>
                )}

                <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1">
                  {q.keywords.map((k) => (
                    <span
                      key={k}
                      className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border"
                    >
                      #{k}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="mt-5 sm:mt-6 flex justify-end gap-2">
              {!isRevealed ? (
                <button
                  onClick={reveal}
                  disabled={selected.length === 0}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-primary px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Valider
                </button>
              ) : (
                <button
                  onClick={next}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-primary px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 transition"
                >
                  {index + 1 >= questions.length ? "Terminer" : "Suivant"}
                  <ChevronRight className="size-3.5 sm:size-4" />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </AppShell>
  );
}

function Results({
  questions,
  answers,
  mode,
}: {
  questions: Question[];
  answers: Record<string, string[]>;
  mode: QuizMode;
}) {
  const navigate = useNavigate();
  const correct = questions.reduce((acc, qq) => {
    const sel = [...(answers[qq.id] ?? [])].sort().join(",");
    const good = [...qq.answer].sort().join(",");
    return acc + (sel === good ? 1 : 0);
  }, 0);
  const pct = Math.round((correct / questions.length) * 100);
  const pass = pct >= 70;

  const handleReplay = () => {
    navigate({ to: "/quiz/$mode", params: { mode }, replace: true });
    window.location.reload();
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-4 pt-8 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-8 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
          <div className="relative">
            <div className="inline-flex size-16 rounded-2xl bg-primary/15 border border-primary/30 items-center justify-center mb-4">
              {pass ? (
                <Trophy className="size-8 text-primary" />
              ) : (
                <Sparkles className="size-8 text-primary" />
              )}
            </div>
            <div className="text-6xl font-bold font-display text-gradient-primary tabular-nums">
              {pct}%
            </div>
            <div className="text-lg font-semibold mt-1">
              {correct} / {questions.length} bonnes réponses
            </div>
            <p className="mt-3 text-sm text-muted-foreground max-w-sm mx-auto">
              {pass
                ? "Excellent ! Tu es sur la bonne voie pour la certification."
                : "Continue à t'entraîner — les erreurs vont revenir pour être maîtrisées."}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button
                onClick={handleReplay}
                className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90"
              >
                Rejouer
              </button>
              <Link
                to="/"
                className="rounded-xl border border-border bg-surface-elevated/60 px-4 py-2.5 text-sm font-semibold hover:bg-secondary"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 space-y-3 sm:space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Détail par question
          </h3>
          {questions.map((qq, i) => {
            const selected = answers[qq.id] ?? [];
            const sel = [...selected].sort().join(",");
            const good = [...qq.answer].sort().join(",");
            const isGood = sel === good;
            return (
              <div
                key={qq.id + i}
                className={`rounded-xl sm:rounded-2xl border ${isGood ? "border-emerald-500/30 bg-emerald-500/5" : "border-destructive/30 bg-destructive/5"} p-3 sm:p-4`}
              >
                <div className="flex items-start gap-2 sm:gap-3 mb-3">
                  {isGood ? (
                    <CheckCircle2 className="size-4 sm:size-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="size-4 sm:size-5 text-destructive shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] sm:text-xs text-muted-foreground">Q{i + 1}</span>
                      <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">{qq.domain}</span>
                      {qq.type === "multiple" && <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-warning/10 text-warning border border-warning/20">Multiple</span>}
                    </div>
                    <div className="text-xs sm:text-sm font-medium">{qq.prompt}</div>
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2 mt-3 sm:mt-4">
                  {qq.choices.map((c) => {
                    const isSelected = selected.includes(c.id);
                    const isCorrect = qq.answer.includes(c.id);
                    const showCorrect = !isGood && isCorrect;
                    const showWrong = !isGood && isSelected && !isCorrect;
                    
                    return (
                      <div
                        key={c.id}
                        className={`flex items-start gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg border ${
                          isSelected && isCorrect
                            ? "bg-emerald-500/10 border-emerald-500/30"
                            : isSelected && !isCorrect
                            ? "bg-destructive/10 border-destructive/30"
                            : showCorrect
                            ? "bg-emerald-500/5 border-emerald-500/20"
                            : "bg-surface/40 border-border opacity-60"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 mt-0.5">
                          {isSelected && isCorrect && <CheckCircle2 className="size-3.5 sm:size-4 text-emerald-400" />}
                          {isSelected && !isCorrect && <XCircle className="size-3.5 sm:size-4 text-destructive" />}
                          {showCorrect && <CheckCircle2 className="size-3.5 sm:size-4 text-emerald-400/50" />}
                          {!isSelected && !showCorrect && <div className="size-3.5 sm:size-4 rounded-full border border-border" />}
                        </div>
                        <div className="flex-1 text-xs sm:text-sm">
                          <span className={isSelected && isCorrect ? "text-emerald-400 font-medium" : isSelected && !isCorrect ? "text-destructive font-medium" : ""}>
                            {c.text}
                          </span>
                          {showCorrect && <span className="ml-2 text-emerald-400/60 text-[10px] sm:text-xs">(Réponse correcte)</span>}
                          {showWrong && <span className="ml-2 text-destructive/60 text-[10px] sm:text-xs">(Votre choix)</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {!isGood && (
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/60">
                    <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 sm:mb-2">
                      Explication
                    </div>
                    <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">{qq.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "accent" | "warning" | "ghost";
}) {
  const styles = {
    default: "bg-primary/10 text-primary border-primary/20",
    accent: "bg-accent/10 text-accent border-accent/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    ghost: "bg-secondary text-muted-foreground border-border",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border",
        styles[variant],
      )}
    >
      {children}
    </span>
  );
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}
