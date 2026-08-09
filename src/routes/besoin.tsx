import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { DemoTag, Disclaimer, PageHeader, Section } from "@/components/emarea/shell";
import truckFleet from "@/assets/truck-fleet.jpg.asset.json";
import {
  needLabels,
  setRequirement,
  useRequirement,
  wilayasDisponibles,
  type ClientNeeds,
  type Requirement,
} from "@/data/requirement";

export const Route = createFileRoute("/besoin")({
  head: () => ({
    meta: [
      { title: "Besoin client structuré — EMAREA Digital Intelligence" },
      {
        name: "description",
        content:
          "Scénario de démonstration : un constructeur international de poids lourds recherche un site 3S de 16 000 à 20 000 m² à Alger, Blida ou Boumerdès.",
      },
      { property: "og:title", content: "Besoin client structuré — EMAREA Digital Intelligence" },
      {
        property: "og:description",
        content:
          "Transformer un cahier des charges en critères exploitables pour rechercher dans le portefeuille.",
      },
    ],
  }),
  component: Besoin,
});

function Besoin() {
  const requirement = useRequirement();
  const [draft, setDraft] = useState<Requirement>(requirement);
  const navigate = useNavigate();

  function toggleWilaya(w: string) {
    setDraft((d) => ({
      ...d,
      wilayas: d.wilayas.includes(w) ? d.wilayas.filter((x) => x !== w) : [...d.wilayas, w],
    }));
  }

  function toggleNeed(key: keyof ClientNeeds) {
    setDraft((d) => ({ ...d, needs: { ...d.needs, [key]: !d.needs[key] } }));
  }

  return (
    <>
      <PageHeader
        step="Étape 03 — Qualification du besoin"
        title="Un cahier des charges devient une liste de critères exploitables"
        intro="Le besoin est saisi une seule fois, puis réutilisé pour la recherche, le scoring et le dossier client."
      >
        <DemoTag>Scénario illustratif à valider avec EMAREA</DemoTag>
      </PageHeader>

      <Section>
        <div className="grid gap-px border border-border bg-border lg:grid-cols-3">
          <div className="bg-surface p-7 lg:col-span-2">
            <h2 className="label-caps text-primary">Cahier des charges</h2>

            <label className="mt-6 block">
              <span className="label-caps text-muted-foreground">Client</span>
              <input
                value={draft.client}
                onChange={(e) => setDraft({ ...draft, client: e.target.value })}
                className="mt-2 w-full border border-input bg-background px-3 py-3 text-sm outline-none focus:border-ring"
              />
            </label>

            <label className="mt-5 block">
              <span className="label-caps text-muted-foreground">Projet</span>
              <input
                value={draft.projet}
                onChange={(e) => setDraft({ ...draft, projet: e.target.value })}
                className="mt-2 w-full border border-input bg-background px-3 py-3 text-sm outline-none focus:border-ring"
              />
            </label>

            <fieldset className="mt-8">
              <legend className="label-caps text-muted-foreground">Localisations recherchées</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {wilayasDisponibles.map((w) => {
                  const active = draft.wilayas.includes(w);
                  return (
                    <button
                      key={w}
                      type="button"
                      onClick={() => toggleWilaya(w)}
                      aria-pressed={active}
                      className={
                        active
                          ? "border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                          : "border border-border-strong px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      }
                    >
                      {w}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="label-caps text-muted-foreground">Surface minimale (m²)</span>
                <input
                  type="number"
                  min={0}
                  step={500}
                  value={draft.surfaceMin}
                  onChange={(e) => setDraft({ ...draft, surfaceMin: Number(e.target.value) })}
                  className="mt-2 w-full border border-input bg-background px-3 py-3 text-sm outline-none focus:border-ring"
                />
              </label>
              <label className="block">
                <span className="label-caps text-muted-foreground">Surface maximale (m²)</span>
                <input
                  type="number"
                  min={0}
                  step={500}
                  value={draft.surfaceMax}
                  onChange={(e) => setDraft({ ...draft, surfaceMax: Number(e.target.value) })}
                  className="mt-2 w-full border border-input bg-background px-3 py-3 text-sm outline-none focus:border-ring"
                />
              </label>
            </div>

            <fieldset className="mt-8">
              <legend className="label-caps text-muted-foreground">Exigences techniques</legend>
              <div className="mt-3 grid gap-px border border-border bg-border sm:grid-cols-2">
                {(Object.keys(needLabels) as (keyof ClientNeeds)[]).map((key) => (
                  <label
                    key={key}
                    className="flex cursor-pointer items-center gap-3 bg-surface p-4 text-sm text-foreground"
                  >
                    <input
                      type="checkbox"
                      checked={draft.needs[key]}
                      onChange={() => toggleNeed(key)}
                      className="h-4 w-4 accent-primary"
                    />
                    {needLabels[key]}
                  </label>
                ))}
              </div>
            </fieldset>

            <button
              type="button"
              onClick={() => {
                setRequirement(draft);
                navigate({ to: "/matching" });
              }}
              className="mt-8 inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Analyser les correspondances
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="bg-surface p-7">
            <h2 className="label-caps text-primary">Projet client — implantation poids lourds</h2>
            <figure className="mt-5">
              <img
                src={truckFleet.url}
                alt="Flotte de camions poids lourds alignée devant une plateforme logistique"
                loading="lazy"
                className="w-full border border-border object-cover"
              />
              <figcaption className="mt-3 label-caps text-warning">
                Visualisation conceptuelle — image générée par IA
              </figcaption>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Illustration du scénario d'implantation. Il ne s'agit pas de véhicules réels ni d'un
                bien commercialisé par le Cabinet EMAREA.
              </p>
            </figure>

            <h3 className="mt-8 label-caps text-muted-foreground">Programme du site 3S</h3>
            <ul className="mt-3 space-y-2 text-sm text-foreground">
              {[
                "Showroom véhicules neufs",
                "Atelier après-vente poids lourds",
                "Magasin pièces détachées",
                "Bloc administratif et commercial",
                "Centre de formation technique",
                "Parc de stationnement grand tonnage",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Disclaimer>
                Besoin illustratif construit pour la démonstration. Les critères réels seraient
                confirmés avec le client et avec EMAREA.
              </Disclaimer>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
