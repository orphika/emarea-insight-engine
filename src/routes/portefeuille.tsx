import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText, Images, Ruler, Truck } from "lucide-react";
import { useMemo, useState } from "react";

import { DemoTag, PageHeader, Section } from "@/components/emarea/shell";
import { formatSurface, portfolioStats, properties } from "@/data/properties";

export const Route = createFileRoute("/portefeuille")({
  head: () => ({
    meta: [
      { title: "Portefeuille de démonstration — EMAREA Digital Intelligence" },
      {
        name: "description",
        content:
          "Cinq biens de démonstration (industriel, logistique, commercial) structurés en dossiers digitaux consultables et filtrables.",
      },
      { property: "og:title", content: "Portefeuille de démonstration — EMAREA Digital Intelligence" },
      {
        property: "og:description",
        content:
          "Un portefeuille immobilier d'entreprise structuré : surfaces, accès, utilités, documents et médias centralisés.",
      },
    ],
  }),
  component: Portefeuille,
});

const stats = [
  { label: "Biens au portefeuille", value: portfolioStats.total },
  { label: "Disponibles", value: portfolioStats.disponibles },
  { label: "Industriels", value: portfolioStats.industriels },
  { label: "Logistiques", value: portfolioStats.logistiques },
  { label: "Commerciaux", value: portfolioStats.commerciaux },
  { label: "En discussion", value: portfolioStats.enDiscussion },
];

const kinds = ["Tous", "Industriel", "Logistique", "Commercial"] as const;
const statuses = ["Tous", "Disponible", "En discussion", "Réservé"] as const;

function Portefeuille() {
  const [kind, setKind] = useState<(typeof kinds)[number]>("Tous");
  const [status, setStatus] = useState<(typeof statuses)[number]>("Tous");
  const [wilaya, setWilaya] = useState("Toutes");

  const wilayas = useMemo(
    () => ["Toutes", ...Array.from(new Set(properties.map((p) => p.wilaya)))],
    [],
  );

  const filtered = properties.filter(
    (p) =>
      (kind === "Tous" || p.kind === kind) &&
      (status === "Tous" || p.status === status) &&
      (wilaya === "Toutes" || p.wilaya === wilaya),
  );

  return (
    <>
      <PageHeader
        step="Étape 01 — Centralisation"
        title="Un portefeuille où chaque bien est un dossier complet"
        intro="Les mêmes informations qu'une annonce, mais structurées : surfaces, bâtiments, accès, utilités, équipements, documents et médias rattachés à une fiche unique."
      >
        <DemoTag>Portefeuille fictif — indicateurs de démonstration</DemoTag>
      </PageHeader>

      <Section>
        <div className="grid gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-surface p-6">
              <p className="font-display text-4xl font-bold text-foreground">{s.value}</p>
              <p className="mt-2 label-caps text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Filter label="Type" value={kind} options={[...kinds]} onChange={(v) => setKind(v as typeof kind)} />
          <Filter label="Wilaya" value={wilaya} options={wilayas} onChange={setWilaya} />
          <Filter
            label="Statut"
            value={status}
            options={[...statuses]}
            onChange={(v) => setStatus(v as typeof status)}
          />
        </div>

        <div className="mt-10 space-y-px bg-border">
          {filtered.map((p) => (
            <Link
              key={p.id}
              to="/biens/$id"
              params={{ id: p.id }}
              className="group block bg-surface p-6 transition-colors hover:bg-accent md:p-8"
            >
              {p.photos?.[0] && (
                <div className="mb-5 aspect-21/9 overflow-hidden border border-border">
                  <img
                    src={p.photos[0].src}
                    alt={p.photos[0].alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-wrap items-center gap-3">
                <span className="label-caps text-primary">{p.reference}</span>
                <span className="label-caps text-muted-foreground">{p.kind}</span>
                <span className="label-caps text-muted-foreground">{p.transaction}</span>
                <span className="ml-auto label-caps text-foreground">{p.status}</span>
              </div>
              <h2 className="mt-4 text-xl font-bold md:text-2xl">{p.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {p.commune}, {p.wilaya}
              </p>
              <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Metric icon={Ruler} label="Surface totale" value={formatSurface(p.surfaceTotale)} />
                <Metric icon={Ruler} label="Surface bâtie" value={formatSurface(p.surfaceBatie)} />
                <Metric
                  icon={Truck}
                  label="Accès grand tonnage"
                  value={p.capabilities.grandTonnage ? "Oui" : "Non"}
                />
                <Metric
                  icon={FileText}
                  label="Documents"
                  value={`${p.documents.length} pièces`}
                />
              </dl>
              <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Images className="h-4 w-4 text-muted-foreground" />
                {p.mediaPhotos} photos · {p.mediaVideos} vidéo(s)
                <ArrowRight className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          ))}
          {filtered.length === 0 && (
            <p className="bg-surface p-8 text-sm text-muted-foreground">
              Aucun bien de démonstration ne correspond à ces filtres.
            </p>
          )}
        </div>
      </Section>
    </>
  );
}

function Filter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="label-caps text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border border-input bg-surface px-3 py-3 text-sm text-foreground outline-none focus:border-ring"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Ruler;
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="flex items-center gap-2 label-caps text-muted-foreground">
        <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
        {label}
      </dt>
      <dd className="mt-2 text-sm font-semibold text-foreground">{value}</dd>
    </div>
  );
}
