import { Disclaimer, DataRow } from "@/components/emarea/shell";
import { formatDZD, type FunnelStage } from "@/data/performance";
import type { PropertyWithPerformance } from "@/data/property-performance";

/** Décision : où se perd la conversion. */
export function FunnelConversion({ stages }: { stages: FunnelStage[] }) {
  const max = stages[0]?.count ?? 1;

  return (
    <>
      <p className="label-caps text-primary">Décision : où se perd la conversion</p>
      <h2 className="mt-3 max-w-2xl text-2xl font-bold md:text-3xl">
        Taux de transformation, du besoin client à la transaction
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Sur les 12 derniers mois de la démonstration.
      </p>

      <div className="mt-8 space-y-5">
        {stages.map((stage, i) => {
          const previous = stages[i - 1];
          const tauxDepuisDebut = Math.round((stage.count / max) * 100);
          const tauxEtapePrecedente = previous
            ? Math.round((stage.count / previous.count) * 100)
            : null;
          return (
            <div key={stage.key}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-semibold text-foreground">{stage.label}</span>
                <span className="text-sm text-muted-foreground">
                  {stage.count}
                  {tauxEtapePrecedente !== null &&
                    ` · ${tauxEtapePrecedente}% de l'étape précédente`}
                </span>
              </div>
              <div className="mt-2 h-2 w-full bg-muted">
                <div className="h-full bg-primary" style={{ width: `${tauxDepuisDebut}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      <Disclaimer>
        Aucun suivi CRM réel ne produit ces chiffres aujourd'hui — ils illustrent ce qu'un entonnoir
        de conversion outillé rendrait visible en continu.
      </Disclaimer>
    </>
  );
}

interface DormantProperty extends PropertyWithPerformance {
  commissionPotentielle: number;
}

/** Décision : quel mandat relancer ou repositionner en prix. */
export function BiensDormants({
  biens,
  seuil,
  onSeuilChange,
  commissionImmobilisee,
}: {
  biens: DormantProperty[];
  seuil: number;
  onSeuilChange: (v: number) => void;
  commissionImmobilisee: number;
}) {
  return (
    <>
      <p className="label-caps text-primary">
        Décision : quel mandat relancer ou repositionner en prix
      </p>
      <h2 className="mt-3 max-w-2xl text-2xl font-bold md:text-3xl">Biens dormants</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Aucune demande client reçue depuis au moins le seuil ci-dessous.
      </p>

      <label className="mt-6 block max-w-md">
        <span className="flex items-baseline justify-between gap-4">
          <span className="label-caps text-muted-foreground">Seuil de dormance</span>
          <span className="font-display text-lg font-bold text-foreground">{seuil} jours</span>
        </span>
        <input
          type="range"
          min={15}
          max={120}
          step={5}
          value={seuil}
          onChange={(e) => onSeuilChange(Number(e.target.value))}
          className="mt-3 w-full accent-primary"
        />
      </label>

      <div className="mt-8 space-y-px bg-border">
        {biens.map((p) => (
          <div
            key={p.id}
            className="flex flex-wrap items-center justify-between gap-4 bg-surface p-6"
          >
            <div>
              <p className="text-sm font-semibold text-foreground">{p.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {p.segment} · {p.commune}, {p.wilaya}
              </p>
            </div>
            <div className="text-right">
              <p className="label-caps text-warning">{p.derniereDemandeJours} jours sans demande</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Commission immobilisée : {formatDZD(p.commissionPotentielle)}
              </p>
            </div>
          </div>
        ))}
        {biens.length === 0 && (
          <p className="bg-surface p-8 text-sm text-muted-foreground">
            Aucun bien du portefeuille de démonstration ne dépasse ce seuil.
          </p>
        )}
      </div>

      {biens.length > 0 && (
        <div className="mt-6">
          <DataRow
            label="Commission immobilisée sur les biens dormants"
            value={formatDZD(commissionImmobilisee)}
          />
        </div>
      )}

      <Disclaimer>
        « Dormant » ici veut dire une chose précise et mesurable : aucune demande client enregistrée
        depuis le seuil choisi. Ce n'est pas un jugement sur la qualité du bien.
      </Disclaimer>
    </>
  );
}
