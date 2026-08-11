import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  MapPin,
  Briefcase,
  GraduationCap,
  Languages,
  ArrowUpRight,
  Download,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import {
  PROFILE,
  HIGHLIGHTS,
  SKILLS,
  EXPERIENCE,
  TRAINING,
  PRODUCTS,
  PERSONAL_PROJECT,
  EDUCATION,
  LANGUAGES,
} from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portfolio")({
  component: PortfolioPage,
});

function PortfolioPage() {
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
          <div className="absolute -top-12 -right-12 sm:-top-16 sm:-right-16 size-48 sm:size-64 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-accent mb-2 sm:mb-3">
              <MapPin className="size-2.5 sm:size-3" />
              {PROFILE.location}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display leading-tight">
              {PROFILE.name.split(" ")[0]}{" "}
              <span className="text-gradient-primary">
                {PROFILE.name.split(" ").slice(1).join(" ")}
              </span>
            </h1>
            <p className="mt-1 text-sm sm:text-base font-medium text-foreground/90">
              {PROFILE.role}
            </p>
            <p className="mt-0.5 text-[11px] sm:text-xs font-mono text-muted-foreground">
              {PROFILE.tagline}
            </p>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
              {PROFILE.summary}
            </p>
            <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
              <a
                href={PROFILE.cvUrl}
                download={PROFILE.cvFileName}
                className="inline-flex items-center gap-1.5 rounded-lg sm:rounded-xl bg-primary px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity"
              >
                <Download className="size-3 sm:size-3.5" />
                Télécharger le CV
              </a>
              <ContactLink
                href={`mailto:${PROFILE.email}`}
                icon={Mail}
                label={PROFILE.email}
              />
              <ContactLink
                href={`tel:${PROFILE.phone.replace(/\s+/g, "")}`}
                icon={Phone}
                label={PROFILE.phone}
              />
              <ContactLink
                href={PROFILE.linkedin}
                icon={Linkedin}
                label="LinkedIn"
                external
              />
              <ContactLink
                href={PROFILE.github}
                icon={Github}
                label="GitHub"
                external
              />
            </div>
          </div>
        </motion.section>

        {/* Highlights */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          {HIGHLIGHTS.map((h) => (
            <div
              key={h.label}
              className="rounded-xl sm:rounded-2xl border border-border bg-surface/40 p-3 sm:p-4"
            >
              <div className="text-xl sm:text-2xl font-bold font-display text-gradient-primary tabular-nums">
                {h.value}
              </div>
              <div className="mt-0.5 text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground">
                {h.label}
              </div>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold font-display mb-3 sm:mb-4">
            Compétences
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {SKILLS.map((group) => (
              <div key={group.category}>
                <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 sm:mb-2">
                  {group.category}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-[11px] sm:text-xs font-mono px-2 sm:px-2.5 py-1 rounded-md sm:rounded-lg bg-secondary border border-border text-foreground/90"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Briefcase className="size-4 sm:size-5 text-primary" />
            <h2 className="text-base sm:text-lg font-semibold font-display">
              Expérience
            </h2>
          </div>
          <div className="relative pl-5 sm:pl-6 space-y-4 sm:space-y-5 before:absolute before:left-[7px] sm:before:left-[9px] before:top-2 before:bottom-2 before:w-px before:bg-border">
            {EXPERIENCE.map((e) => (
              <div
                key={e.role}
                className="relative glass rounded-2xl sm:rounded-3xl p-4 sm:p-6"
              >
                <span
                  className={cn(
                    "absolute -left-5 sm:-left-6 top-6 sm:top-8 size-3.5 sm:size-4 rounded-full border-2 border-background",
                    e.current ? "bg-primary" : "bg-muted-foreground/50",
                  )}
                />
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold font-display">
                      {e.role}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {e.company} · {e.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {e.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 text-primary px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap">
                        <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                        en cours
                      </span>
                    )}
                    <span className="text-[11px] sm:text-xs font-mono text-muted-foreground whitespace-nowrap">
                      {e.period}
                    </span>
                  </div>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {e.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-2 text-xs sm:text-sm text-muted-foreground leading-relaxed"
                    >
                      <span className="text-primary shrink-0">•</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="relative glass rounded-2xl sm:rounded-3xl p-4 sm:p-6">
              <span className="absolute -left-5 sm:-left-6 top-6 sm:top-8 size-3.5 sm:size-4 rounded-full border-2 border-background bg-muted-foreground/50" />
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold font-display">
                    {TRAINING.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {TRAINING.org}
                  </p>
                </div>
                <span className="text-[11px] sm:text-xs font-mono text-muted-foreground whitespace-nowrap">
                  {TRAINING.period}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Product ecosystem */}
        <section className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold font-display mb-1">
            Écosystème produit
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-5">
            Une suite intégrée conçue et développée chez VIPP INTERSTIS.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {PRODUCTS.map((p) => (
              <div
                key={p.name}
                className="rounded-xl sm:rounded-2xl border border-border bg-surface/40 p-3.5 sm:p-4"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-sm sm:text-base font-semibold font-display">
                    {p.name}
                  </h3>
                  <span className="text-[10px] sm:text-[11px] text-accent font-mono whitespace-nowrap">
                    {p.tagline}
                  </span>
                </div>
                <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {p.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-md bg-secondary border border-border text-foreground/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <p className="mt-3 pt-3 border-t border-dashed border-border text-[11px] sm:text-xs text-muted-foreground">
                  {p.role}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 sm:mt-5 text-[11px] sm:text-xs text-muted-foreground/80 italic">
            Catarina alimente CallSight Analytics en données d'appels, qui
            alimente ScriptOptimizer AI, qui améliore les scripts utilisés dans
            Catarina — une boucle fermée, pilotée via Dev-Manager.
          </p>
        </section>

        {/* Personal project */}
        <section className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-accent">
              Projet personnel
            </h2>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-bold font-display">
              {PERSONAL_PROJECT.name}
            </h3>
            <span className="text-xs sm:text-sm font-medium text-accent">
              {PERSONAL_PROJECT.tagline}
            </span>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            {PERSONAL_PROJECT.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {PERSONAL_PROJECT.stack.map((s) => (
              <span
                key={s}
                className="text-[11px] sm:text-xs font-mono px-2 sm:px-2.5 py-1 rounded-md sm:rounded-lg bg-secondary border border-border text-foreground/90"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* Education & languages */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="rounded-xl sm:rounded-2xl border border-border bg-surface/40 p-3.5 sm:p-4">
            <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground mb-2">
              <GraduationCap className="size-3.5 sm:size-4 text-primary" />
              <span className="text-[9px] sm:text-[11px] uppercase tracking-wider">
                Formation
              </span>
            </div>
            <div className="text-xs sm:text-sm font-medium">
              {EDUCATION.degree}
            </div>
            <div className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
              {EDUCATION.org} · {EDUCATION.year}
            </div>
          </div>
          <div className="rounded-xl sm:rounded-2xl border border-border bg-surface/40 p-3.5 sm:p-4">
            <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground mb-2">
              <Languages className="size-3.5 sm:size-4 text-primary" />
              <span className="text-[9px] sm:text-[11px] uppercase tracking-wider">
                Langues
              </span>
            </div>
            <div className="flex flex-col gap-1">
              {LANGUAGES.map((l) => (
                <div
                  key={l.name}
                  className="flex items-center justify-between text-xs sm:text-sm"
                >
                  <span className="font-medium">{l.name}</span>
                  <span className="text-muted-foreground">{l.level}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent text-center">
          <h2 className="text-lg sm:text-xl font-bold font-display">
            Discutons de votre prochain projet
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            Ouvert aux opportunités fullstack, IA appliquée et architecture
            technique.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-primary px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 transition"
            >
              <Mail className="size-3.5 sm:size-4" />
              M'écrire
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-border bg-surface-elevated/60 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold hover:bg-secondary transition"
            >
              <Linkedin className="size-3.5 sm:size-4" />
              LinkedIn
            </a>
            <a
              href={PROFILE.cvUrl}
              download={PROFILE.cvFileName}
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-border bg-surface-elevated/60 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold hover:bg-secondary transition"
            >
              <Download className="size-3.5 sm:size-4" />
              Télécharger le CV
            </a>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function ContactLink({
  href,
  icon: Icon,
  label,
  external,
}: {
  href: string;
  icon: typeof Mail;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="inline-flex items-center gap-1.5 rounded-lg sm:rounded-xl border border-border bg-surface/60 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium hover:bg-secondary hover:border-primary/40 transition-colors"
    >
      <Icon className="size-3 sm:size-3.5 text-primary shrink-0" />
      <span className="truncate max-w-[140px] sm:max-w-none">{label}</span>
      {external && (
        <ArrowUpRight className="size-2.5 sm:size-3 text-muted-foreground shrink-0" />
      )}
    </a>
  );
}
