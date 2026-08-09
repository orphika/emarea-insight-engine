import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import {
  DemoTag,
  Disclaimer,
  PageHeader,
  ScoreBar,
  Section,
} from "@/components/emarea/shell";
import { formatSurface } from "@/data/properties";
import { setSelectedProperty, useRequirement } from "@/data/requirement";
import { rankProperties } from "@/lib/matching";

export const Route = createFileRoute("/matching")({
  head: () => ({
    meta: [
      { title: "Correspondances expliquées — EMAREA Digital Intelligence" },
      {
        name: "description",
        content:
          "Recherche déterministe dans le portefeuille de démonstration : les biens sont classés et chaque critère retenu ou manquant est explicité.",
      },
      { property: "og:title", content: "Correspondances expliquées — EMAREA Digital Intelligence" },
      {
        property: "og:description",
        content:
          "Un classement lisible : pourquoi un site correspond, et sur quel critère il ne correspond pas.",
      },
    ],
  }),
  component: Matching,
});

function Matching() {
  const requirement = useRequirement();
  const results = rankProperties(requirement).slice(0, 3);
  const navigate = useNavigate();
  const best = results[0];

  return (
    <>
      <PageHeader
        step="Étape 04 — Correspondances"
        title="Trois sites du portefeuille répondent au besoin, avec le détail du pourquoi"
        intro={`Besoin analysé : ${requirement.client} — ${requirement.surfaceMin.toLocaleString("fr-FR")} à ${requirement.surfaceMax.toLocaleString("fr-FR")} m² sur ${requirement.wilayas.join(", ") || "aucune wilaya sélectionnée"}.`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <DemoTag>Recherche déterministe — aucun modèle d'IA exécuté</DemoTag>
          <Link to="/besoin" className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
            Modifier le besoin
          </Link>
        </div>
      </PageHeader>

      <Section>
        <div className="space-y-px bg-border">
          {results.map((r, i) => (
            <article key={r.property.id} className="bg-surface p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <p className="label-caps text-primary">
                    Candidat {String.fromCharCode(65 + i)} · {r.property.reference}
                  </p>
                  <h2 className="mt-3 text-xl font-bold md:text-2xl">{r.property.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {r.property.commune}, {r.property.wilaya} ·{" "}
                    {formatSurface(r.property.surfaceTotale)} · {r.property.kind}
                  </p>
                </div>
                <div className="min-w-40">
                  <p className="font-display text-5xl font-bold text-foreground">{r.score}%</p>
                  <p className="mt-1 label-caps text-muted-foreground">Compatibilité</p>
                  <div className="mt-3">
                    <ScoreBar value={r.score} />
                  </div>
                </div>
              </div>

              <ul className="mt-7 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {r.criteria.map((c) => (
                  <li key={c.label} className="flex items-baseline gap-3 text-sm">
                    <span
                      className={
                        c.status === "ok"
                          ? "text-success"
                          : c.status === "partiel"
                            ? "text-warning"
                            : "text-primary"
                      }
                      aria-hidden="true"
                    >
                      {c.status === "ok" ? "+" : c.status === "partiel" ? "~" : "−"}
                    </span>
                    <span className="flex-1">
                      <span className="text-foreground">{c.label}</span>
                      <span className="block text-xs text-muted-foreground">{c.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/biens/$id"
                  params={{ id: r.property.id }}
                  className="inline-flex items-center gap-2 border border-border-strong px-5 py-3 text-sm font-semibold transition-colors hover:bg-accent"
                >
                  Ouvrir la fiche technique
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProperty(r.property.id);
                    navigate({ to: "/dossier" });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  Générer le dossier client
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {best && (
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => {
                setSelectedProperty(best.property.id);
                navigate({ to: "/dossier" });
              }}
              className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Voir le meilleur candidat
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-sm text-muted-foreground">
              {best.property.title} — {best.score}% de compatibilité
            </p>
          </div>
        )}

        <div className="mt-10 max-w-3xl">
          <Disclaimer>
            Le classement est produit par une pondération de critères renseignés, pas par un modèle
            d'intelligence artificielle. Les poids devraient être calibrés avec EMAREA selon
            l'importance réelle de chaque critère.
          </Disclaimer>
        </div>
      </Section>
    </>
  );
}
