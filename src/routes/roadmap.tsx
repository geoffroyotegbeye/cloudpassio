import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Satellite, ArrowRight, RotateCcw, NotebookPen } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ProgressRing } from "@/components/progress-ring";
import { useRoadmap } from "@/hooks/use-roadmap";
import {
  cycleTaskStatus,
  resetTaskStatuses,
  setJournal,
  type TaskStatus,
} from "@/lib/roadmap-store";
import {
  PHASES,
  GOLDEN_RULE,
  TECH_STACK,
  PIPELINE_STAGES,
  FINAL_OBJECTIVE_QUOTE,
  getCampaignDay,
  type RoadmapTask,
} from "@/lib/roadmap-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/roadmap")({
  component: RoadmapPage,
});

const STATUS_META: Record<TaskStatus, { label: string; className: string }> = {
  todo: { label: "À faire", className: "bg-secondary text-muted-foreground" },
  progress: { label: "En cours", className: "bg-accent/15 text-accent" },
  waiting: { label: "En attente", className: "bg-warning/15 text-warning" },
  done: { label: "Fait", className: "bg-success/15 text-success" },
};

const STATUS_KEYS: TaskStatus[] = ["todo", "progress", "waiting", "done"];

function RoadmapPage() {
  const state = useRoadmap();
  const [campaign, setCampaign] = useState<ReturnType<
    typeof getCampaignDay
  > | null>(null);
  const [journalDraft, setJournalDraft] = useState("");
  const [journalSaved, setJournalSaved] = useState(false);
  const journalInitialized = useRef(false);
  const journalTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setCampaign(getCampaignDay(new Date()));
  }, []);

  useEffect(() => {
    if (state && !journalInitialized.current) {
      setJournalDraft(state.journal);
      journalInitialized.current = true;
    }
  }, [state]);

  const getStatus = (id: string): TaskStatus => state?.statuses[id] ?? "todo";

  const overall = useMemo(() => {
    const counts: Record<TaskStatus, number> = {
      todo: 0,
      progress: 0,
      waiting: 0,
      done: 0,
    };
    let total = 0;
    PHASES.forEach((phase) =>
      phase.tasks.forEach((t) => {
        counts[state?.statuses[t.id] ?? "todo"]++;
        total++;
      }),
    );
    return {
      counts,
      total,
      pct: total ? Math.round((counts.done / total) * 100) : 0,
    };
  }, [state]);

  function handleJournalChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setJournalDraft(value);
    if (journalTimer.current) clearTimeout(journalTimer.current);
    journalTimer.current = setTimeout(() => {
      setJournal(value);
      setJournalSaved(true);
      setTimeout(() => setJournalSaved(false), 1200);
    }, 500);
  }

  function handleReset() {
    if (typeof window === "undefined") return;
    if (
      !window.confirm(
        "Réinitialiser le suivi des tâches ? Le journal ne sera pas effacé.",
      )
    )
      return;
    resetTaskStatuses();
  }

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 pb-4 space-y-6 sm:space-y-8">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 sm:-top-16 sm:-right-16 size-48 sm:size-64 bg-accent/20 blur-3xl rounded-full pointer-events-none" />
          <div className="grid grid-cols-1 sm:grid-cols-[auto,1fr] gap-4 sm:gap-6 md:gap-8 items-center relative">
            <div className="flex justify-center sm:justify-start">
              <ProgressRing
                value={overall.pct}
                size={150}
                stroke={12}
                label="Progression"
                sublabel={`${overall.counts.done}/${overall.total} tâches`}
              />
            </div>
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-accent mb-2 sm:mb-3">
                <Satellite className="size-2.5 sm:size-3" />
                CloudPulse · 10 août 2026 → 28 février 2027
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display leading-tight">
                Software Engineer →{" "}
                <span className="text-gradient-primary">
                  Cloud Data Engineer.
                </span>
              </h1>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground max-w-md mx-auto sm:mx-0">
                202 jours pour transformer un projet en preuve publique, puis en
                premier client freelance international.
              </p>
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2 justify-center sm:justify-start">
                <span className="inline-flex items-center rounded-lg sm:rounded-xl bg-primary/15 text-primary px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono font-semibold tabular-nums">
                  {campaign === null
                    ? "—"
                    : campaign.dayIndex <= 0
                      ? "Démarre le 10 août"
                      : campaign.dayIndex > campaign.totalDays
                        ? `Terminé · ${campaign.totalDays}/${campaign.totalDays}`
                        : `Jour ${campaign.dayIndex} / ${campaign.totalDays}`}
                </span>
                {STATUS_KEYS.map((s) => (
                  <span
                    key={s}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono tabular-nums",
                      STATUS_META[s].className,
                    )}
                  >
                    <span className="size-1.5 rounded-full bg-current" />
                    {overall.counts[s]} {STATUS_META[s].label.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Phase timeline nav */}
        <section>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-x-2 gap-y-3 sm:gap-3">
            {PHASES.map((phase) => {
              const total = phase.tasks.length;
              const done = phase.tasks.filter(
                (t) => getStatus(t.id) === "done",
              ).length;
              const pct = total ? Math.round((done / total) * 100) : 0;
              const isCurrent = campaign?.currentPhaseId === phase.id;
              return (
                <a
                  key={phase.id}
                  href={`#phase-${phase.id}`}
                  className="flex flex-col gap-1.5 group"
                >
                  <span className="h-1.5 rounded-full bg-secondary overflow-hidden block">
                    <span
                      className={cn(
                        "h-full block rounded-full transition-all",
                        pct === 100
                          ? "bg-success"
                          : isCurrent
                            ? "bg-primary"
                            : "bg-muted-foreground/40",
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </span>
                  <span
                    className={cn(
                      "text-[9px] sm:text-[10px] font-mono uppercase tracking-wide truncate",
                      isCurrent
                        ? "text-primary font-semibold"
                        : "text-muted-foreground/70 group-hover:text-foreground",
                    )}
                  >
                    {phase.short}
                  </span>
                </a>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] sm:text-xs text-muted-foreground/70">
            Clique sur un statut de tâche pour le faire tourner : à faire → en
            cours → en attente → fait.
          </p>
        </section>

        {/* Project card */}
        <section className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-display">
                CloudPulse — E-commerce Data Platform
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-2xl">
                Plateforme cloud de bout en bout : ingestion multi-source,
                transformation, data lake, data warehouse et analytics. Un seul
                projet principal, poussé jusqu'au niveau production.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 text-primary px-3 py-1 text-[11px] sm:text-xs font-mono font-semibold whitespace-nowrap">
              🎯 Cible : Cloud Data Engineer
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4">
            {TECH_STACK.map((t) => (
              <span
                key={t}
                className="text-[11px] sm:text-xs font-mono px-2 sm:px-2.5 py-1 rounded-md sm:rounded-lg bg-secondary border border-border text-foreground/90"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-5 sm:mt-6 flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-1">
            {PIPELINE_STAGES.map((stage, i) => (
              <div
                key={stage}
                className="flex items-center gap-1 sm:gap-1.5 shrink-0"
              >
                <span className="text-[10px] sm:text-[11px] font-mono px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-border bg-surface/60 whitespace-nowrap">
                  {stage}
                </span>
                {i < PIPELINE_STAGES.length - 1 && (
                  <ArrowRight className="size-3 sm:size-3.5 text-muted-foreground/50 shrink-0" />
                )}
              </div>
            ))}
          </div>

          <p className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-dashed border-border text-xs sm:text-sm text-muted-foreground">
            <strong className="text-foreground">
              L'architecture est générique, la logique métier est spécifique.
            </strong>{" "}
            Le moteur (ingestion → orchestration → data lake → transformation →
            data warehouse) est réutilisable pour n'importe quel secteur. C'est
            ce socle réutilisable qui devient l'offre freelance.
          </p>
        </section>

        {/* Golden rule */}
        <section className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-accent/10 border border-accent/20">
          <h2 className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-accent mb-3">
            Règle transversale
          </h2>
          <p className="font-display font-semibold text-sm sm:text-base mb-4">
            Chaque compétence apprise doit produire une preuve — sinon,
            questionne sa priorité.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
            {GOLDEN_RULE.map((r) => (
              <div
                key={r.skill}
                className="flex items-center justify-between gap-3 text-xs sm:text-sm py-1.5 border-b border-border/60 last:border-b-0"
              >
                <span className="text-muted-foreground">{r.skill}</span>
                <span className="font-medium text-right">→ {r.proof}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Phases */}
        {PHASES.map((phase) => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            isCurrent={campaign?.currentPhaseId === phase.id}
            getStatus={getStatus}
            onCycle={cycleTaskStatus}
          />
        ))}

        {/* Journal */}
        <section className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <NotebookPen className="size-4 sm:size-5 text-primary" />
            <h2 className="text-base sm:text-lg font-semibold font-display">
              Journal de bord
            </h2>
            <span
              className={cn(
                "text-[10px] sm:text-[11px] font-mono text-accent transition-opacity",
                journalSaved ? "opacity-100" : "opacity-0",
              )}
            >
              enregistré
            </span>
          </div>
          <textarea
            value={journalDraft}
            onChange={handleJournalChange}
            placeholder={
              "Day 1 — Building my first Cloud Data Platform...\nDay 7 — Why I chose Airflow for orchestration...\n\nNote ce que tu apprends, ce qui bloque, ce qui a marché. C'est la matière brute de tes futurs posts LinkedIn et de ton case study."
            }
            className="w-full min-h-[160px] resize-y rounded-xl sm:rounded-2xl border border-border bg-surface/60 p-3 sm:p-4 text-xs sm:text-sm leading-relaxed placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="mt-2 text-[11px] sm:text-xs text-muted-foreground/70">
            Sauvegardé automatiquement sur cet appareil.
          </p>
        </section>

        {/* Final objective */}
        <section className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
          <h2 className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-primary mb-3">
            L'objectif final
          </h2>
          <p className="font-mono italic text-xs sm:text-sm leading-relaxed border-l-2 border-primary pl-3 sm:pl-4">
            "{FINAL_OBJECTIVE_QUOTE}"
          </p>
          <p className="mt-4 text-xs sm:text-sm text-muted-foreground">
            Pas "j'ai étudié pendant 6 mois". Et surtout :{" "}
            <strong className="text-primary">tu peux montrer le GitHub.</strong>
          </p>
        </section>

        <footer className="flex items-center justify-between gap-3 pt-2">
          <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground/60">
            Suivi stocké localement sur cet appareil
          </span>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[11px] sm:text-xs text-muted-foreground hover:text-warning hover:border-warning/50 transition-colors"
          >
            <RotateCcw className="size-3 sm:size-3.5" />
            Réinitialiser le suivi
          </button>
        </footer>
      </div>
    </AppShell>
  );
}

function StatusButton({
  status,
  onClick,
}: {
  status: TaskStatus;
  onClick: () => void;
}) {
  const meta = STATUS_META[status];
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 w-[92px] sm:w-[104px] inline-flex items-center justify-center gap-1.5 rounded-full px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold font-display tracking-wide transition-colors",
        meta.className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {meta.label}
    </button>
  );
}

function TaskRow({
  task,
  status,
  onCycle,
}: {
  task: RoadmapTask;
  status: TaskStatus;
  onCycle: (id: string) => void;
}) {
  return (
    <li
      className={cn(
        "flex items-center gap-2.5 sm:gap-3 rounded-lg px-2 py-1.5 sm:py-2 hover:bg-secondary/40 transition-colors",
        task.milestone && "bg-secondary/30",
      )}
    >
      <StatusButton status={status} onClick={() => onCycle(task.id)} />
      <span
        className={cn(
          "text-xs sm:text-sm leading-snug",
          task.milestone && "font-semibold",
          status === "done" &&
            "text-muted-foreground line-through decoration-success/60",
        )}
      >
        {task.milestone && "🏁 "}
        {task.text}
      </span>
    </li>
  );
}

function PhaseCard({
  phase,
  isCurrent,
  getStatus,
  onCycle,
}: {
  phase: (typeof PHASES)[number];
  isCurrent: boolean;
  getStatus: (id: string) => TaskStatus;
  onCycle: (id: string) => void;
}) {
  const total = phase.tasks.length;
  const done = phase.tasks.filter((t) => getStatus(t.id) === "done").length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <section
      id={`phase-${phase.id}`}
      className={cn(
        "scroll-mt-20 glass rounded-2xl sm:rounded-3xl p-4 sm:p-6",
        isCurrent && "ring-1 ring-primary/50",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-[11px] font-mono text-muted-foreground/60">
            Phase {phase.id}
          </span>
          <h3 className="text-base sm:text-lg font-semibold font-display">
            {phase.title}
          </h3>
          <span className="text-[11px] sm:text-xs text-muted-foreground">
            {phase.dateLabel}
          </span>
          {isCurrent && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 text-primary px-2 py-0.5 text-[10px] font-semibold">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              en cours
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 min-w-[120px]">
          <div className="h-1.5 flex-1 min-w-[60px] rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-orange-500 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-[11px] sm:text-xs font-mono text-muted-foreground tabular-nums whitespace-nowrap">
            {done}/{total}
          </span>
        </div>
      </div>

      {phase.note && (
        <p className="text-xs sm:text-sm text-muted-foreground mt-2 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-dashed border-border">
          {phase.note}
        </p>
      )}

      <ul className={cn("space-y-0.5", !phase.note && "mt-3 sm:mt-4")}>
        {phase.tasks.map((t) => (
          <TaskRow
            key={t.id}
            task={t}
            status={getStatus(t.id)}
            onCycle={onCycle}
          />
        ))}
      </ul>
    </section>
  );
}
