import { Link, useRouterState } from "@tanstack/react-router";
import {
  GraduationCap,
  LayoutDashboard,
  Bookmark,
  BarChart3,
  Cloud,
  Map,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  {
    to: "/",
    label: "Quiz",
    icon: GraduationCap,
    match: (p: string) =>
      p === "/" ||
      p === "/bookmarks" ||
      p === "/stats" ||
      p.startsWith("/quiz"),
  },
  {
    to: "/roadmap",
    label: "Roadmap",
    icon: Map,
    match: (p: string) => p === "/roadmap",
  },
  {
    to: "/portfolio",
    label: "Portfolio",
    icon: UserRound,
    match: (p: string) => p === "/portfolio",
  },
] as const;

const QUIZ_TABS = [
  { to: "/", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/bookmarks", label: "Favoris", icon: Bookmark },
  { to: "/stats", label: "Stats", icon: BarChart3 },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const showQuizTabs =
    pathname === "/" || pathname === "/bookmarks" || pathname === "/stats";

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-40 glass border-b border-border/60">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-3 sm:px-4 h-12 sm:h-14">
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2">
            <div className="size-7 sm:size-8 rounded-lg bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center shadow-lg shadow-primary/30">
              <Cloud
                className="size-3.5 sm:size-4 text-primary-foreground"
                strokeWidth={2.5}
              />
            </div>
            <div className="font-display font-bold tracking-tight text-base sm:text-lg">
              Cloud<span className="text-gradient-primary">Passio</span>
            </div>
          </Link>
          <div className="hidden sm:flex items-center gap-1">
            {NAV.map((n) => {
              const active = n.match(pathname);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "px-2.5 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors",
                    active
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {n.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quiz sub-navigation — Favoris & Stats live under Quiz */}
        {showQuizTabs && (
          <div className="border-t border-border/40">
            <div className="max-w-5xl mx-auto px-3 sm:px-4 flex items-center gap-1 h-10 overflow-x-auto">
              {QUIZ_TABS.map((t) => {
                const active = pathname === t.to;
                const Icon = t.icon;
                return (
                  <Link
                    key={t.to}
                    to={t.to}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium transition-colors whitespace-nowrap shrink-0",
                      active
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                    )}
                  >
                    <Icon
                      className="size-3 sm:size-3.5"
                      strokeWidth={active ? 2.5 : 2}
                    />
                    {t.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 pb-20 sm:pb-8">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 glass border-t border-border/60 pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-3 h-14 sm:h-16">
          {NAV.map((n) => {
            const Icon = n.icon;
            const active = n.match(pathname);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 text-[10px] sm:text-[11px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon
                  className="size-4 sm:size-5"
                  strokeWidth={active ? 2.5 : 2}
                />
                {n.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
