import { Link, type LinkProps } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState, type ReactNode } from "react";

import { EmareaLogo } from "@/components/emarea/logo";
import { cn } from "@/lib/utils";

const steps = [
  { to: "/", label: "Intro" },
  { to: "/portefeuille", label: "Portefeuille" },
  { to: "/besoin", label: "Besoin client" },
  { to: "/matching", label: "Correspondances" },
  { to: "/dossier", label: "Dossier client" },
  { to: "/temps", label: "Temps gagné" },
  { to: "/roadmap", label: "Roadmap" },
] as const;

export function DemoShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="border-b border-border bg-surface">
        <p className="mx-auto max-w-7xl px-5 py-2 label-caps text-muted-foreground">
          Prototype conceptuel — données de démonstration
        </p>
      </div>

      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <Link to="/" className="shrink-0">
            <EmareaLogo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {steps.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: s.to === "/" }}
              >
                {s.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:text-foreground lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>

        {open && (
          <nav className="border-t border-border bg-surface lg:hidden">
            {steps.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                onClick={() => setOpen(false)}
                className="block border-b border-border px-5 py-3 text-sm text-muted-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: s.to === "/" }}
              >
                {s.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl space-y-3 px-5 py-10">
          <p className="label-caps text-foreground">Prototype conceptuel — EMAREA Digital Intelligence</p>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Les données et indicateurs présentés dans cette démonstration sont fictifs sauf
            indication contraire. Ce prototype ne décrit pas les processus internes actuels du
            Cabinet EMAREA et n'implique aucune vérification juridique des documents évoqués.
          </p>
        </div>
      </footer>
    </div>
  );
}

export function PageHeader({
  step,
  title,
  intro,
  children,
}: {
  step: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-border">
      <div className="mx-auto max-w-7xl px-5 py-12 md:py-16">
        <p className="label-caps text-primary">{step}</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
}

export function Section({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <section className={cn("mx-auto max-w-7xl px-5 py-12 md:py-16", className)}>{children}</section>
  );
}

export function DemoTag({ children = "Démonstration" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center border border-border-strong px-2 py-1 label-caps text-muted-foreground">
      {children}
    </span>
  );
}

export function Disclaimer({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-2 border-primary/60 pl-4 text-sm italic leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}

export function CtaLink({
  to,
  variant = "primary",
  children,
}: {
  to: LinkProps["to"];
  variant?: "primary" | "ghost";
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-colors",
        variant === "primary"
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "border border-border-strong text-foreground hover:bg-accent",
      )}
    >
      {children}
    </Link>
  );
}

export function ScoreBar({ value }: { value: number }) {
  return (
    <div className="h-1 w-full bg-muted">
      <div className="h-full bg-primary" style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}

export function DataRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
      <dt className="label-caps text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground sm:text-right">{value}</dd>
    </div>
  );
}
