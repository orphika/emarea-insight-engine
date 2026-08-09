import { createFileRoute } from "@tanstack/react-router";

import { CtaLink, DemoTag, PageHeader, Section } from "@/components/emarea/shell";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Architecture & roadmap de collaboration — EMAREA Digital Intelligence" },
      {
        name: "description",
        content:
          "Le site n'est que la vitrine : architecture de l'infrastructure proposée et roadmap progressive en six phases.",
      },
      { property: "og:title", content: "Architecture & roadmap de collaboration" },
      {
        property: "og:description",
        content:
          "Six phases progressives, du prototype aux workflows assistés, sans engagement technologique prématuré.",
      },
    ],
  }),
  component: Roadmap,
});

const architecture = `DONNÉES BIENS   +   MÉDIAS   +   DOCUMENTS   +   BESOINS CLIENTS   +   CRM
                              |
                     PROPERTY INTELLIGENCE
                              |
                          MATCHING
                              |
                     PRÉSENTATION CLIENT
                              |
                        SUIVI COMMERCIAL
                              |
                    AUTOMATISATION / IA`;

const phases = [
  { n: "Phase 1", title: "Prototype", body: "Cette démonstration : périmètre restreint, aucun engagement." },
  { n: "Phase 2", title: "Présentation digitale des biens", body: "Fiches structurées et dossiers client générés." },
  { n: "Phase 3", title: "Base de biens centralisée", body: "Une source unique pour les données, médias et documents." },
  { n: "Phase 4", title: "CRM & besoins clients", body: "Demandes qualifiées, historique et suivi des envois." },
  { n: "Phase 5", title: "Matching & automatisation", body: "Recherche pondérée et tâches répétitives supprimées." },
  { n: "Phase 6", title: "Workflows assistés par IA", body: "Rédaction, traduction et synthèse, sur une base fiable." },
];

function Roadmap() {
  return (
    <>
      <PageHeader
        step="Étape 07 — Vision & collaboration"
        title="Le site n'est que la vitrine. La véritable valeur est dans l'infrastructure derrière."
        intro="Moins de temps perdu. Moins d'informations dispersées. Une meilleure présentation. Une meilleure capacité à traiter davantage d'opportunités."
      >
        <DemoTag>Proposition de démarche — à discuter</DemoTag>
      </PageHeader>

      <Section>
        <h2 className="label-caps text-primary">Architecture</h2>
        <pre className="mt-5 overflow-x-auto border border-border bg-surface p-6 text-xs leading-relaxed text-muted-foreground md:text-sm">
{architecture}
        </pre>

        <h2 className="mt-14 label-caps text-primary">Roadmap progressive</h2>
        <ol className="mt-5 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {phases.map((p) => (
            <li key={p.n} className="bg-surface p-7">
              <p className="label-caps text-muted-foreground">{p.n}</p>
              <h3 className="mt-3 font-display text-lg font-bold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-wrap gap-3">
          <CtaLink to="/besoin">Revoir le scénario client</CtaLink>
          <CtaLink to="/portefeuille" variant="ghost">
            Revenir au portefeuille
          </CtaLink>
        </div>
      </Section>
    </>
  );
}
