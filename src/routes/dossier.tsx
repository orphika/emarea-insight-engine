import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Link2, Printer } from "lucide-react";
import { useState } from "react";

import { DemoTag, DataRow, Disclaimer, PageHeader, Section } from "@/components/emarea/shell";
import { formatSurface, getProperty, properties } from "@/data/properties";
import { useRequirement, useSelectedProperty, setSelectedProperty } from "@/data/requirement";
import { scoreProperty } from "@/lib/matching";

export const Route = createFileRoute("/dossier")({
  head: () => ({
    meta: [
      { title: "Générateur de dossier client — EMAREA Digital Intelligence" },
      {
        name: "description",
        content:
          "Générer une présentation professionnelle d'un actif industriel en français ou en anglais, à partir des informations déjà saisies une seule fois.",
      },
      { property: "og:title", content: "Générateur de dossier client — EMAREA Digital Intelligence" },
      {
        property: "og:description",
        content:
          "Une information saisie une fois, réutilisée dans la fiche, le matching et la présentation client.",
      },
    ],
  }),
  component: Dossier;
});

const labels = {
  fr: {
    overview: "Aperçu du bien",
    location: "Localisation",
    specs: "Spécifications techniques",
    infra: "Infrastructure",
    access: "Accès",
    docs: "Documents",
    contact: "Contact",
    surfaceTotale: "Surface totale",
    surfaceBatie: "Surface bâtie",
    hauteur: "Hauteur utile",
    hangars: "Hangars",
    admin: "Administration",
    utilites: "Utilités",
    share: "Partager avec le client",
  },
  en: {
    overview: "Property overview",
    location: "Location",
    specs: "Technical specifications",
    infra: "Infrastructure",
    access: "Access",
    docs: "Documents",
    contact: "Contact",
    surfaceTotale: "Total land area",
    surfaceBatie: "Built area",
    hauteur: "Clear height",
    hangars: "Warehouses",
    admin: "Administration",
    utilites: "Utilities",
    share: "Share with the client",
  },
} as const;

function Dossier() {
  const selectedId = useSelectedProperty();
  const requirement = useRequirement();
  const property = getProperty(selectedId) ?? properties[0]!;
  const { score } = scoreProperty(property, requirement);
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [format, setFormat] = useState<"web" | "pdf" | "lien">("web");
  const [shared, setShared] = useState(false);
  const t = labels[lang];

  return (
    <>
      <PageHeader
        step="Étape 05 — Présentation client"
        title="Créer un dossier client à partir de la fiche du bien"
        intro="Aucune ressaisie : photos, caractéristiques, documents et contacts proviennent du dossier du bien."
      >
        <DemoTag>Aperçu simulé — non contractuel</DemoTag>
      </PageHeader>

      <Section>
        <div className="grid gap-px border border-border bg-border lg:grid-cols-3">
          <div className="space-y-8 bg-surface p-7">
            <div>
              <p className="label-caps text-primary">Bien sélectionné</p>
              <select
                value={property.id}
                onChange={(e) => setSelectedProperty(e.target.value)}
                className="mt-3 w-full border border-input bg-background px-3 py-3 text-sm outline-none focus:border-ring"
              >
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.reference} — {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="label-caps text-primary">Langue du dossier</p>
              <div className="mt-3 flex gap-2">
                {(["fr", "en"] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                    className={
                      lang === l
                        ? "border border-primary bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
                        : "border border-border-strong px-5 py-2 text-sm text-muted-foreground hover:text-foreground"
                    }
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="label-caps text-primary">Format</p>
              <div className="mt-3 space-y-2">
                {(
                  [
                    { key: "web", label: "Présentation web", icon: Printer },
                    { key: "pdf", label: "Document PDF", icon: FileText },
                    { key: "lien", label: "Lien partageable", icon: Link2 },
                  ] as const
                ).map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setFormat(f.key)}
                    aria-pressed={format === f.key}
                    className={
                      format === f.key
                        ? "flex w-full items-center gap-3 border border-primary px-4 py-3 text-sm font-semibold text-foreground"
                        : "flex w-full items-center gap-3 border border-border px-4 py-3 text-sm text-muted-foreground hover:text-foreground"
                    }
                  >
                    <f.icon className="h-4 w-4" strokeWidth={1.5} />
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShared(true)}
              className="w-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t.share}
            </button>
            {shared && (
              <p className="text-sm text-success">
                Partage simulé — dans la version réelle, un lien suivi serait envoyé au client et
                rattaché à sa demande.
              </p>
            )}

            <Disclaimer>
              Aperçu de démonstration. Aucun document n'est réellement produit, vérifié ou transmis.
            </Disclaimer>
          </div>

          <div className="bg-background p-6 lg:col-span-2 md:p-10">
            <article className="border border-border">
              <header className="border-b border-border bg-surface p-7">
                <p className="label-caps text-primary">
                  {property.reference} · {property.kind} · {formatSurface(property.surfaceTotale)}
                </p>
                <h2 className="mt-4 text-2xl font-bold md:text-3xl">{property.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {property.commune}, {property.wilaya}
                </p>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground">
                  {property.synthese}
                </p>
                <p className="mt-5 label-caps text-muted-foreground">
                  {lang === "fr" ? "Compatibilité avec le besoin" : "Requirement fit"} : {score}% —{" "}
                  {requirement.client}
                </p>
              </header>

              <div className="grid grid-cols-3 gap-px bg-border">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex aspect-4/3 items-center justify-center bg-muted label-caps text-muted-foreground"
                  >
                    Photo {i + 1}
                  </div>
                ))}
              </div>

              <div className="grid gap-px bg-border sm:grid-cols-2">
                <section className="bg-surface p-7">
                  <h3 className="label-caps text-primary">{t.specs}</h3>
                  <dl className="mt-4">
                    <DataRow label={t.surfaceTotale} value={formatSurface(property.surfaceTotale)} />
                    <DataRow label={t.surfaceBatie} value={formatSurface(property.surfaceBatie)} />
                    <DataRow label={t.hauteur} value={property.hauteurUtile} />
                  </dl>
                </section>
                <section className="bg-surface p-7">
                  <h3 className="label-caps text-primary">{t.infra}</h3>
                  <dl className="mt-4">
                    <DataRow label={t.hangars} value={property.hangars} />
                    <DataRow label={t.admin} value={property.bureaux} />
                    <DataRow label={t.utilites} value={property.electricite} />
                  </dl>
                </section>
                <section className="bg-surface p-7">
                  <h3 className="label-caps text-primary">{t.access}</h3>
                  <p className="mt-4 text-sm text-foreground">{property.autoroute}</p>
                  <p className="mt-2 text-sm text-foreground">{property.parking}</p>
                </section>
                <section className="bg-surface p-7">
                  <h3 className="label-caps text-primary">{t.docs}</h3>
                  <ul className="mt-4 space-y-2 text-sm">
                    {property.documents.map((d) => (
                      <li key={d.label} className="flex justify-between gap-4">
                        <span className="text-foreground">{d.label}</span>
                        <span
                          className={
                            d.status === "Document fourni"
                              ? "label-caps text-success"
                              : "label-caps text-warning"
                          }
                        >
                          {d.status === "Document fourni"
                            ? lang === "fr"
                              ? "Fourni"
                              : "Provided"
                            : lang === "fr"
                              ? "À vérifier"
                              : "To verify"}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 label-caps text-muted-foreground">
                    Document de démonstration — non contractuel
                  </p>
                </section>
              </div>

              <footer className="border-t border-border bg-surface p-7">
                <h3 className="label-caps text-primary">{t.contact}</h3>
                <p className="mt-3 text-sm text-foreground">{property.contactName}</p>
                <p className="text-sm text-muted-foreground">{property.contactRole}</p>
                <p className="mt-4 text-xs text-muted-foreground">
                  Format sélectionné :{" "}
                  {format === "web"
                    ? "présentation web"
                    : format === "pdf"
                      ? "document PDF"
                      : "lien partageable"}{" "}
                  · {lang.toUpperCase()}
                </p>
              </footer>
            </article>

            <p className="mt-6 text-sm text-muted-foreground">
              <Link to="/temps" className="text-foreground underline underline-offset-4">
                Estimer le temps que cette réutilisation permettrait de gagner
              </Link>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
