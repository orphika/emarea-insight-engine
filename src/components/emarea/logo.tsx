import { cn } from "@/lib/utils";

/**
 * Logotype typographique provisoire.
 * Remplacer ici par le fichier logo EMAREA (SVG/PNG) le jour où il est fourni.
 */
export function EmareaLogo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-baseline gap-2", className)}>
      <span className="font-display text-lg font-extrabold tracking-[0.22em] text-foreground">
        EMAREA
      </span>
      <span className="hidden h-3 w-px bg-border-strong sm:block" aria-hidden="true" />
      <span className="hidden label-caps text-primary sm:block">Digital Intelligence</span>
    </span>
  );
}
