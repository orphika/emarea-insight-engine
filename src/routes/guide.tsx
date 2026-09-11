import { createFileRoute } from "@tanstack/react-router";

import { CtaLink, DemoTag, Disclaimer, PageHeader, Section } from "@/components/emarea/shell";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Guide de lecture — EMAREA Digital Intelligence" },
      {
        name: "description",
        content:
          "Dans quel ordre parcourir la démonstration, ce que montre chaque écran, et ce qui est réel ou illustratif.",
      },
      { property: "og:title", content: "Guide de lecture — EMAREA Digital Intelligence" },
      {
        property: "og:description",
        content: "Sept écrans, un seul scénario : du portefeuille au dossier client envoyé.",
      },
    ],
  }),
  component: Guide,
});

const parcours = [
  {
    n: "01",
    lien: "/portefeuille",
    titre: "Portefeuille",
    repond: "Un portefeuille où chaque bien est un dossier complet",
    note: "Point de départ. Chaque bien listé a sa propre fiche — cliquer sur l'un d'eux ouvre son dossier technique complet.",
  },
  {
    n: "02",
    lien: "/besoin",
    titre: "Besoin client",
    repond: "Un cahier des charges devient une liste de critères exploitables",
    note: "Un formulaire, rempli une seule fois, qui alimente ensuite la recherche et le dossier — jamais ressaisi.",
  },
  {
    n: "03",
    lien: "/matching",
    titre: "Correspondances",
    repond: "Trois sites du portefeuille répondent au besoin, avec le détail du pourquoi",
    note: "Le résultat n'est pas une liste brute : chaque score est expliqué critère par critère.",
  },
  {
    n: "04",
    lien: "/dossier",
    titre: "Dossier client",
    repond: "Créer un dossier client à partir de la fiche du bien",
    note: "La présentation envoyée au client, générée depuis les données déjà saisies — rien à recopier.",
  },
  {
    n: "05",
    lien: "/temps",
    titre: "Temps gagné",
    repond: "Combien de temps la structuration de l'information pourrait libérer",
    note: "Une estimation, pas une mesure — un ordre de grandeur à recalibrer avec vos propres chiffres.",
  },
  {
    n: "06",
    lien: "/roadmap",
    titre: "Roadmap",
    repond: "Le site n'est que la vitrine — la vraie valeur est dans l'infrastructure derrière",
    note: "Comment ce prototype pourrait s'étendre par étapes, sans engagement pris d'avance.",
  },
] as const;

function Guide() {
  return (
    <>
      <PageHeader
        step="Guide de lecture"
        title="Comment parcourir cette démonstration"
        intro="Six écrans, un seul scénario : un besoin client arrive, trouve un bien dans le portefeuille, et repart en dossier prêt à envoyer. Environ cinq minutes pour tout voir, dans l'ordre ci-dessous ou en piochant directement."
      >
        <DemoTag>Cette page ne fait pas partie du scénario — c'est le mode d'emploi</DemoTag>
      </PageHeader>

      <Section>
        <h2 className="label-caps text-primary">Le parcours, écran par écran</h2>
        <ol className="mt-5 grid gap-px border border-border bg-border md:grid-cols-2">
          {parcours.map((p) => (
            <li key={p.n} className="bg-surface p-7">
              <p className="label-caps text-muted-foreground">Écran {p.n}</p>
              <h3 className="mt-3 font-display text-lg font-bold text-foreground">{p.titre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{p.repond}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.note}</p>
              <CtaLink to={p.lien} variant="ghost">
                Ouvrir cet écran
              </CtaLink>
            </li>
          ))}
        </ol>

        <h2 className="mt-14 label-caps text-primary">Ce qui est réel, ce qui ne l'est pas</h2>
        <div className="mt-5 space-y-4">
          <Disclaimer>
            Les biens, les clients, les montants et les documents affichés sont fictifs. Rien
            n'a été copié depuis un dossier réel du Cabinet EMAREA.
          </Disclaimer>
          <Disclaimer>
            Les images marquées « illustration générée » sont produites par IA — elles ne
            montrent aucun site, véhicule ou local réellement commercialisé.
          </Disclaimer>
          <Disclaimer>
            Ce prototype ne décrit pas vos processus internes actuels : c'est une proposition de
            direction, pas un audit de ce qui existe déjà chez vous.
          </Disclaimer>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <CtaLink to="/portefeuille">Commencer par le portefeuille</CtaLink>
          <CtaLink to="/roadmap" variant="ghost">
            Aller directement à la roadmap
          </CtaLink>
        </div>
      </Section>
    </>
  );
}
