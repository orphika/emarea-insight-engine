import { cn } from "@/lib/utils";
import emareaLogo from "@/assets/emarea-logo.png";

/**
 * Logo réel EMAREA (source : assets/branding/emarea-logo.png, voir assets/SOURCES.md
 * pour la provenance et le niveau de confiance). Le sous-titre "Digital Intelligence"
 * est conservé à côté car il ne fait pas partie du logo d'origine.
 */
export function EmareaLogo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <img src={emareaLogo} alt="EMAREA" className="h-9 w-auto" />
      <span className="hidden h-3 w-px bg-border-strong sm:block" aria-hidden="true" />
      <span className="hidden label-caps text-primary sm:block">Digital Intelligence</span>
    </span>
  );
}
