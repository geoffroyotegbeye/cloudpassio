import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Zap, Target, Timer, Flame, Trophy, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { useStats } from "@/hooks/use-stats";
import { computeAggregates } from "@/lib/quiz-store";
import { ProgressRing } from "@/components/progress-ring";
import { AppShell } from "@/components/app-shell";
import { MODE_META, type QuizMode } from "@/data/questions";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const MODES: { key: QuizMode; icon: typeof Zap; tone: string }[] = [
  { key: "quick", icon: Zap, tone: "from-primary/20 to-primary/5" },
  { key: "practice", icon: Target, tone: "from-accent/20 to-accent/5" },
  { key: "exam", icon: Timer, tone: "from-fuchsia-500/20 to-purple-500/5" },
];

function Dashboard() {
  const stats = useStats();
  const agg = stats ? computeAggregates(stats) : null;

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 space-y-6 sm:space-y-8">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 sm:-top-16 sm:-right-16 size-48 sm:size-64 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
          <div className="grid grid-cols-1 sm:grid-cols-[auto,1fr] gap-4 sm:gap-6 md:gap-8 items-center relative">
            <div className="flex justify-center sm:justify-start order-1 sm:order-1">
              <ProgressRing
                value={agg?.readiness ?? 0}
                label="Préparation"
                sublabel={agg && agg.total > 0 ? `${agg.total} questions` : "Commence maintenant"}
              />
            </div>
            <div className="order-2 sm:order-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-primary mb-2 sm:mb-3">
                <Sparkles className="size-2.5 sm:size-3" />
                <span className="hidden sm:inline">AWS Certified Cloud Practitioner · CLF-C02</span>
                <span className="sm:hidden">AWS CLF-C02</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display leading-tight">
                Prêt pour ta prochaine session,{" "}
                <span className="text-gradient-primary">apprenant.</span>
              </h1>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground max-w-md mx-auto sm:mx-0">
                Passe de 40 % à 90 % de réussite grâce à un entraînement adaptatif, des
                explications détaillées et des examens blancs conditions réelles.
              </p>
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2 justify-center sm:justify-start">
                <Link
                  to="/quiz/$mode"
                  params={{ mode: "quick" }}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-primary px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 transition"
                >
                  <Zap className="size-3.5 sm:size-4" /> <span className="hidden sm:inline">Quiz rapide (10 Q)</span><span className="sm:hidden">Quiz (10)</span>
                </Link>
                <Link
                  to="/quiz/$mode"
                  params={{ mode: "exam" }}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-border bg-surface-elevated/60 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold hover:bg-secondary transition"
                >
                  <Timer className="size-3.5 sm:size-4" /> <span className="hidden sm:inline">Examen blanc</span><span className="sm:hidden">Examen</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stats grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          <StatTile
            icon={Flame}
            label="Série"
            value={stats?.streak ?? 0}
            unit="jours"
            tint="text-orange-400"
          />
          <StatTile icon={Trophy} label="XP" value={stats?.xp ?? 0} tint="text-primary" />
          <StatTile
            icon={TrendingUp}
            label="Précision"
            value={agg ? Math.round(agg.accuracy) : 0}
            unit="%"
            tint="text-emerald-400"
          />
          <StatTile
            icon={Target}
            label="Niveau"
            value={agg?.level ?? 1}
            tint="text-accent"
          />
        </section>

        {/* Modes */}
        <section>
          <h2 className="text-base sm:text-lg font-semibold font-display mb-2 sm:mb-3 flex items-center gap-2">
            Modes d'entraînement
          </h2>
          <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-3">
            {MODES.map(({ key, icon: Icon, tone }, idx) => {
              const meta = MODE_META[key];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.4 }}
                >
                  <Link
                    to="/quiz/$mode"
                    params={{ mode: key }}
                    className={`group block relative overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-gradient-to-br ${tone} p-3 sm:p-5 hover:border-primary/40 transition-all hover:-translate-y-0.5`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="size-8 sm:size-10 rounded-lg sm:rounded-xl bg-background/60 flex items-center justify-center border border-border">
                        <Icon className="size-4 sm:size-5" />
                      </div>
                      <ArrowRight className="size-3.5 sm:size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="mt-3 sm:mt-4">
                      <div className="text-sm sm:text-base font-semibold font-display">{meta.label}</div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">{meta.description}</div>
                      <div className="mt-2 sm:mt-3 flex gap-2 sm:gap-3 text-[9px] sm:text-[11px] text-muted-foreground">
                        <span>{meta.questions} questions</span>
                        {meta.minutes && <span>· {meta.minutes} min</span>}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Weak / Strong */}
        {agg && agg.total > 0 && (
          <section className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2">
            <DomainList
              title="Domaines à travailler"
              tone="destructive"
              items={agg.weak.length ? agg.weak : ["Aucun encore"]}
              subtitle="Sessions recommandées"
            />
            <DomainList
              title="Points forts"
              tone="success"
              items={agg.strong.length ? agg.strong : ["Aucun encore"]}
              subtitle="Continue comme ça"
            />
          </section>
        )}

        {stats && stats.attempts.length > 0 && (
          <section>
            <h2 className="text-base sm:text-lg font-semibold font-display mb-2 sm:mb-3">Sessions récentes</h2>
            <div className="space-y-1.5 sm:space-y-2">
              {stats.attempts.slice(0, 5).map((a) => {
                const pct = Math.round((a.correct / a.total) * 100);
                return (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-lg sm:rounded-xl border border-border bg-surface/40 px-3 sm:px-4 py-2 sm:py-3"
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-medium">{MODE_META[a.mode].label}</div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">
                        {new Date(a.date).toLocaleString("fr-FR", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm sm:text-base font-semibold tabular-nums">
                        {a.correct}/{a.total}
                      </div>
                      <div
                        className={`text-[10px] sm:text-xs tabular-nums ${
                          pct >= 70 ? "text-emerald-400" : pct >= 50 ? "text-warning" : "text-destructive"
                        }`}
                      >
                        {pct}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
  unit,
  tint,
}: {
  icon: typeof Zap;
  label: string;
  value: number;
  unit?: string;
  tint: string;
}) {
  return (
    <div className="rounded-xl sm:rounded-2xl border border-border bg-surface/40 p-3 sm:p-4">
      <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
        <Icon className={`size-3.5 sm:size-4 ${tint}`} />
        <span className="text-[9px] sm:text-[11px] uppercase tracking-wider">{label}</span>
      </div>
      <div className="mt-1 sm:mt-1.5 text-xl sm:text-2xl font-bold font-display tabular-nums">
        {value}
        {unit && <span className="text-xs sm:text-sm font-medium text-muted-foreground ml-1">{unit}</span>}
      </div>
    </div>
  );
}

function DomainList({
  title,
  items,
  tone,
  subtitle,
}: {
  title: string;
  items: string[];
  tone: "destructive" | "success";
  subtitle: string;
}) {
  const dot = tone === "destructive" ? "bg-destructive" : "bg-emerald-400";
  return (
    <div className="rounded-xl sm:rounded-2xl border border-border bg-surface/40 p-3 sm:p-4">
      <div className="text-xs sm:text-sm font-medium">{title}</div>
      <div className="text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3">{subtitle}</div>
      <ul className="space-y-1 sm:space-y-1.5">
        {items.map((it) => (
          <li key={it} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
            <span className={`size-1.5 rounded-full ${dot}`} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
