import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, TrendingUp, Award, Target, Flame, Trophy } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useStats } from "@/hooks/use-stats";
import { computeAggregates } from "@/lib/quiz-store";

export const Route = createFileRoute("/stats")({
  component: StatsPage,
});

function StatsPage() {
  const stats = useStats();
  const agg = stats ? computeAggregates(stats) : null;

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 space-y-6 sm:space-y-8">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="size-5 text-primary" />
          <h1 className="text-2xl sm:text-3xl font-bold font-display">Statistiques</h1>
        </div>

        {/* Overview */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          <StatCard
            icon={Trophy}
            label="XP Total"
            value={stats?.xp ?? 0}
            tint="text-primary"
          />
          <StatCard
            icon={Flame}
            label="Série"
            value={stats?.streak ?? 0}
            unit="jours"
            tint="text-orange-400"
          />
          <StatCard
            icon={Target}
            label="Niveau"
            value={agg?.level ?? 1}
            tint="text-accent"
          />
          <StatCard
            icon={TrendingUp}
            label="Précision"
            value={agg ? Math.round(agg.accuracy) : 0}
            unit="%"
            tint="text-emerald-400"
          />
        </section>

        {/* Progress */}
        {agg && agg.total > 0 && (
          <section className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold font-display mb-4">Progression</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-1">
                  <span className="text-muted-foreground">Questions répondues</span>
                  <span className="font-medium">{agg.total} / 200</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-orange-500 transition-all"
                    style={{ width: `${Math.min(100, (agg.total / 200) * 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-1">
                  <span className="text-muted-foreground">Niveau {agg?.level ?? 1}</span>
                  <span className="font-medium">{agg?.xpInLevel ?? 0} / 500 XP</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent to-blue-500 transition-all"
                    style={{ width: `${(agg?.xpInLevel ?? 0) / 5}%` }}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Domain performance */}
        {agg && Object.keys(agg.byDomain).length > 0 && (
          <section className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold font-display mb-4">Performance par domaine</h2>
            <div className="space-y-3">
              {Object.entries(agg.byDomain)
                .sort((a, b) => b[1].accuracy - a[1].accuracy)
                .map(([domain, data]) => (
                  <div key={domain} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs sm:text-sm mb-1">
                        <span className="font-medium">{domain}</span>
                        <span className="text-muted-foreground">{data.total} questions</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            data.accuracy >= 70
                              ? "bg-emerald-500"
                              : data.accuracy >= 50
                              ? "bg-warning"
                              : "bg-destructive"
                          }`}
                          style={{ width: `${data.accuracy}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm font-bold tabular-nums w-12 text-right">
                      {Math.round(data.accuracy)}%
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Recent attempts */}
        {stats && stats.attempts.length > 0 && (
          <section className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold font-display mb-4">Sessions récentes</h2>
            <div className="space-y-2">
              {stats.attempts.slice(0, 10).map((a) => {
                const pct = Math.round((a.correct / a.total) * 100);
                return (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-lg sm:rounded-xl border border-border bg-surface/40 px-3 sm:px-4 py-2 sm:py-3"
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-medium capitalize">{a.mode}</div>
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

        {/* Empty state */}
        {!stats || stats.attempts.length === 0 ? (
          <section className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center">
            <Award className="size-12 sm:size-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Aucune statistique</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Commencez un quiz pour voir vos statistiques et votre progression.
            </p>
          </section>
        ) : null}
      </div>
    </AppShell>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  tint,
}: {
  icon: typeof Trophy;
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
