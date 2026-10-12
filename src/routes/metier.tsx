import { createFileRoute } from "@tanstack/react-router";

import { CtaLink, DemoTag, Disclaimer, PageHeader, Section } from "@/components/emarea/shell";

export const Route = createFileRoute("/metier")({
  head: () => ({
    meta: [
      { title: "Le métier d'EMAREA — EMAREA Digital Intelligence" },
      {
        name: "description",
        content:
          "Les cinq segments d'activité, la logique de commission des deux côtés de la transaction, et où chaque écran de la démonstration s'insère dans le cycle du cabinet.",
      },
      { property: "og:title", content: "Le métier d'EMAREA, tel que l'outil le comprend" },
      {
        property: "og:description",
        content: "Comprendre le métier avant de juger l'outil qui le sert.",
      },
    ],
  }),
  component: Metier,
});

const segments = [
  {
    nom: "Logistique / industriel",
    detail: "Entrepôts, plateformes logistiques, sites industriels et ateliers.",
  },
  {
    nom: "Bureaux",
    detail: "Plateaux et immeubles de bureaux pour sièges et administrations d'entreprise.",
  },
  {
    nom: "Commercial",
    detail: "Locaux commerciaux, showrooms et surfaces de vente ou d'exposition.",
  },
  {
    nom: "Foncier",
    detail: "Terrains nus ou viabilisés, pour construction ou réserve d'implantation.",
  },
  {
    nom: "Résidentiel haut de gamme",
    detail: "Biens résidentiels premium, hors périmètre technique des quatre segments ci-dessus.",
  },
];

const cycle = [
  {
    n: "01",
    etape: "Mandat",
    explication:
      "Un propriétaire confie un bien au cabinet, à la vente ou à la location. Point d'entrée du cycle — cette démonstration ne modélise pas la prise de mandat elle-même, elle part du bien déjà confié.",
    lien: null,
  },
  {
    n: "02",
    etape: "Portefeuille",
    explication:
      "Le mandat devient une fiche structurée dans le portefeuille de biens à commercialiser.",
    lien: "/portefeuille",
  },
  {
    n: "03",
    etape: "Demande client",
    explication:
      "Un acheteur ou locataire potentiel exprime un besoin : surface, localisation, contraintes techniques.",
    lien: "/besoin",
  },
  {
    n: "04",
    etape: "Correspondance",
    explication:
      "Le besoin est confronté au portefeuille pour identifier les biens qui y répondent, et sur quels critères.",
    lien: "/matching",
  },
  {
    n: "05",
    etape: "Dossier",
    explication:
      "Le bien retenu est présenté au client sous une forme structurée, prête à être envoyée.",
    lien: "/dossier",
  },
  {
    n: "06",
    etape: "Transaction",
    explication:
      "Le client et le propriétaire concluent — vente ou location. Cette démonstration ne simule pas la négociation ; elle n'en garde que la trace agrégée (écran Rentabilité).",
    lien: null,
  },
  {
    n: "07",
    etape: "Commission",
    explication:
      "Le cabinet perçoit sa rémunération, des deux côtés de la transaction. C'est la lecture de l'écran Rentabilité.",
    lien: "/rentabilite",
  },
] as const;

function Metier() {
  return (
    <>
      <PageHeader
        step="Contexte métier"
        title="Le métier d'EMAREA, tel que l'outil le comprend"
        intro="Avant de juger la démonstration, comprendre l'activité qu'elle sert. Cette page ne fait pas partie du scénario — c'est le cadre dans lequel il s'inscrit."
      >
        <DemoTag>Page de contexte — ne fait pas partie du scénario de démonstration</DemoTag>
      </PageHeader>

      <Section>
        <h2 className="label-caps text-primary">Le cabinet</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground">
          Le Cabinet EMAREA Immo Entreprise El-Djazair est un cabinet d'immobilier d'entreprise
          algérien, créé en 2006 et dirigé par Yassine Kedjar, basé à El-Biar (Alger). Son activité
          couvre cinq segments d'immobilier professionnel et résidentiel haut de gamme.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Sa présence digitale actuelle repose entièrement sur LinkedIn (environ 7 650 abonnés,
          publications tous les 2 à 4 jours) et son réseau ; le cabinet n'a pas de site web et son
          contact public passe par une adresse Gmail.
        </p>

        <h2 className="mt-14 label-caps text-primary">Cinq segments d'activité</h2>
        <ul className="mt-5 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {segments.map((s) => (
            <li key={s.nom} className="bg-surface p-6">
              <h3 className="font-display text-base font-bold text-foreground">{s.nom}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-14 label-caps text-primary">Comment le cabinet est rémunéré</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground">
          EMAREA perçoit une commission d'agence, des deux côtés de la transaction — vendeur et
          acheteur en vente, bailleur et locataire en location. En Algérie, le décret exécutif n°
          09-18 du 20 janvier 2009 encadre le calcul et la répartition de cette commission ; l'usage
          courant rapporté est d'environ 1 % côté vendeur et 1 % côté acheteur pour une vente, et
          l'équivalent d'un mois de loyer pour une location.
        </p>
        <div className="mt-4 max-w-3xl">
          <Disclaimer>
            Le taux exact et son mode de répartition (décret, usages de la place) sont une donnée de
            pré-entraînement — à vérifier et à recaler avec le taux réellement pratiqué par EMAREA
            avant tout usage commercial de ce chiffre. C'est la même hypothèse que celle utilisée
            pour les calculs de l'écran Rentabilité.
          </Disclaimer>
        </div>

        <h2 className="mt-14 label-caps text-primary">Le cycle, et où s'insère chaque écran</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Un mandat entre en portefeuille, une demande client arrive, une correspondance est
          établie, un dossier est envoyé, une transaction se conclut, une commission est perçue.
          Cette démonstration ne couvre pas tout le cycle — elle montre la partie qui peut être
          outillée sans toucher à la négociation elle-même.
        </p>
        <ol className="mt-5 grid gap-px border border-border bg-border md:grid-cols-2">
          {cycle.map((c) => (
            <li key={c.n} className="bg-surface p-6">
              <p className="label-caps text-muted-foreground">Étape {c.n}</p>
              <h3 className="mt-2 font-display text-base font-bold text-foreground">{c.etape}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.explication}</p>
              {c.lien && (
                <div className="mt-3">
                  <CtaLink to={c.lien} variant="ghost">
                    Voir l'écran
                  </CtaLink>
                </div>
              )}
            </li>
          ))}
        </ol>

        <h2 className="mt-14 label-caps text-primary">
          Ce qui est vérifié, ce qui reste une hypothèse
        </h2>
        <div className="mt-5 space-y-4">
          <Disclaimer>
            Sourcé et confirmé : les cinq segments d'activité, la rémunération aux deux extrémités
            de la transaction, l'ancienneté du cabinet et l'absence actuelle de site web.
          </Disclaimer>
          <Disclaimer>
            Hypothèse à confirmer avec EMAREA : le taux de commission exact, le poids réel de chaque
            segment dans le chiffre d'affaires, et le fait que la répartition en cinq segments
            distincts corresponde à la manière dont le cabinet catégorise déjà ses mandats en
            interne.
          </Disclaimer>
          <Disclaimer>
            Ce prototype ne décrit pas les processus internes actuels du cabinet — c'est une
            proposition de lecture, pas un audit de l'existant.
          </Disclaimer>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <CtaLink to="/guide">Voir comment parcourir la démonstration</CtaLink>
          <CtaLink to="/portefeuille" variant="ghost">
            Aller directement au portefeuille
          </CtaLink>
        </div>
      </Section>
    </>
  );
}
