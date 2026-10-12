import { Disclaimer } from "@/components/emarea/shell";
import type { PropertyWithPerformance } from "@/data/property-performance";
import { formatDZD, type SegmentPerformance } from "@/data/performance";

/** Décision : où concentrer la prospection commerciale. */
export function CommissionParSegment({ perf }: { perf: SegmentPerformance[] }) {
  const max = Math.max(...perf.map((s) => s.commissionTotale), 1);

  return (
    <>
      <p className="label-caps text-primary">Décision : où concentrer la prospection</p>
      <h2 className="mt-3 max-w-2xl text-2xl font-bold md:text-3xl">
        Commissions générées par segment
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Sur les transactions conclues de la démonstration — le volume de mandats ne dit pas où se
        fait réellement l'argent.
      </p>

      <div className="mt-8 space-y-5">
        {perf.map((s) => (
          <div key={s.segment}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm font-semibold text-foreground">{s.segment}</span>
              <span className="text-sm text-muted-foreground">
                {formatDZD(s.commissionTotale)} · {s.nombreTransactions} transaction
                {s.nombreTransactions > 1 ? "s" : ""}
              </span>
            </div>
            <div className="mt-2 h-2 w-full bg-muted">
              <div
                className="h-full bg-primary"
                style={{ width: `${(s.commissionTotale / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <Disclaimer>
        Commission calculée à titre indicatif à 1 % vendeur + 1 % acheteur en vente, et l'équivalent
        d'un mois de loyer de chaque côté en location (usage courant encadré par le décret exécutif
        n° 09-18 du 20 janvier 2009) — le taux réellement pratiqué par EMAREA reste à confirmer.
      </Disclaimer>
    </>
  );
}

interface PropertyRow extends PropertyWithPerformance {
  commissionPotentielle: number;
}

/** Décision : quels mandats actifs prioriser. */
export function ValeurPortefeuille({
  biens,
  valeurTotale,
  commissionTotale,
}: {
  biens: PropertyRow[];
  valeurTotale: number;
  commissionTotale: number;
}) {
  return (
    <>
      <p className="label-caps text-primary">Décision : quels mandats actifs prioriser</p>
      <h2 className="mt-3 max-w-2xl text-2xl font-bold md:text-3xl">
        Valeur du portefeuille en cours et commission potentielle
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Si l'ensemble des mandats disponibles ou en discussion se concluait — un plafond théorique,
        pas une prévision.
      </p>

      <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2">
        <div className="bg-surface p-7">
          <p className="label-caps text-muted-foreground">Valeur totale des mandats actifs</p>
          <p className="mt-3 font-display text-4xl font-bold text-foreground">
            {formatDZD(valeurTotale)}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Prix de vente pour les biens en vente, loyer mensuel pour les biens en location — deux
            notions différentes additionnées pour donner un ordre de grandeur global.
          </p>
        </div>
        <div className="bg-surface p-7">
          <p className="label-caps text-muted-foreground">Commission potentielle totale</p>
          <p className="mt-3 font-display text-4xl font-bold text-primary">
            {formatDZD(commissionTotale)}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Si tous les mandats actifs listés ci-dessous se concluaient aux taux indiqués plus haut.
          </p>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto border border-border">
        <table className="w-full min-w-150 text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="label-caps px-4 py-3 font-medium text-muted-foreground">Bien</th>
              <th className="label-caps px-4 py-3 font-medium text-muted-foreground">Segment</th>
              <th className="label-caps px-4 py-3 font-medium text-muted-foreground">Statut</th>
              <th className="label-caps px-4 py-3 text-right font-medium text-muted-foreground">
                Valeur
              </th>
              <th className="label-caps px-4 py-3 text-right font-medium text-muted-foreground">
                Commission potentielle
              </th>
            </tr>
          </thead>
          <tbody>
            {biens.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-foreground">{p.title}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.segment}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.status}</td>
                <td className="px-4 py-3 text-right text-foreground">{formatDZD(p.valeur)}</td>
                <td className="px-4 py-3 text-right font-semibold text-foreground">
                  {formatDZD(p.commissionPotentielle)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/** Décision : quel type de bien dort, lequel tourne vite. */
export function DelaiParSegment({ perf }: { perf: SegmentPerformance[] }) {
  const avecTransactions = perf.filter((s) => s.nombreTransactions > 0);
  const max = Math.max(...avecTransactions.map((s) => s.delaiMoyenJours), 1);

  return (
    <>
      <p className="label-caps text-primary">
        Décision : quel type de bien dort, lequel tourne vite
      </p>
      <h2 className="mt-3 max-w-2xl text-2xl font-bold md:text-3xl">
        Délai moyen entre la mise en portefeuille et la conclusion
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Sur les transactions conclues de la démonstration, par segment.
      </p>

      <div className="mt-8 space-y-5">
        {avecTransactions.map((s) => (
          <div key={s.segment}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm font-semibold text-foreground">{s.segment}</span>
              <span className="text-sm text-muted-foreground">{s.delaiMoyenJours} jours</span>
            </div>
            <div className="mt-2 h-2 w-full bg-muted">
              <div
                className="h-full bg-warning"
                style={{ width: `${(s.delaiMoyenJours / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <Disclaimer>
        Un segment lent n'est pas nécessairement un problème — le foncier se traite structurellement
        sur des cycles plus longs que le commercial. La lecture utile est la comparaison dans le
        temps, pas la valeur absolue d'un mois donné.
      </Disclaimer>
    </>
  );
}
