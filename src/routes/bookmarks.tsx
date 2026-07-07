import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { QUESTIONS } from "@/data/questions";
import { useStats } from "@/hooks/use-stats";

export const Route = createFileRoute("/bookmarks")({
  component: BookmarksPage,
});

function BookmarksPage() {
  const stats = useStats();
  const ids = stats?.bookmarks ?? [];
  const items = QUESTIONS.filter((q) => ids.includes(q.id));

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-4 pt-6">
        <div className="flex items-center gap-2 mb-6">
          <Bookmark className="size-5 text-primary" />
          <h1 className="text-2xl font-bold font-display">Favoris</h1>
        </div>

        {items.length === 0 ? (
          <div className="glass rounded-2xl p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Aucune question sauvegardée. Ajoute-les en cliquant sur l'icône signet
              pendant un quiz.
            </p>
            <Link
              to="/quiz/$mode"
              params={{ mode: "quick" }}
              className="mt-4 inline-flex rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Commencer un quiz
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((q) => (
              <details
                key={q.id}
                className="group rounded-xl border border-border bg-surface/40 p-4"
              >
                <summary className="flex items-start gap-2 cursor-pointer list-none">
                  <ChevronRight className="size-4 mt-1 transition-transform group-open:rotate-90 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-wider text-primary font-semibold">
                      {q.domain}
                    </div>
                    <div className="text-sm mt-0.5">{q.prompt}</div>
                  </div>
                </summary>
                <div className="mt-3 pl-6 space-y-1.5 text-sm">
                  {q.choices.map((c) => (
                    <div
                      key={c.id}
                      className={
                        q.answer.includes(c.id)
                          ? "text-emerald-400 font-medium"
                          : "text-muted-foreground"
                      }
                    >
                      {q.answer.includes(c.id) ? "✓" : "○"} {c.text}
                    </div>
                  ))}
                  <div className="pt-2 text-xs text-muted-foreground border-t border-border/60 mt-3">
                    {q.explanation}
                  </div>
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
