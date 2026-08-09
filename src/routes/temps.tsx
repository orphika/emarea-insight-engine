import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { DemoTag, Disclaimer, PageHeader, Section } from "@/components/emarea/shell";

export const Route = createFileRoute("/temps")({
  head: () => ({
    meta: [
      { title: "Temps gagné — simulation indicative | EMAREA Digital Intelligence" },
      {
        name: "description",
        content:
          "Simulateur indicatif : comparer le temps passé manuellement à préparer et retrouver l'information avec un workflow structuré.",
      },
      { property: "og:title", content: "Temps gagné — simulation indicative" },
      {
        property: "og:description",
        content: "Moins de temps perdu, moins d'informations dispersées : une estimation à calibrer.",
      },
    ],
  }),
  component: Temps,
});

function Temps() {
  const [biens, setBiens] = useState(12);
  const [demandes, setDemandes] = useState(20);
  const [minutesDossier, setMinutesDossier] = useState(60);
  const [minutesRecherche, setMinutesRecherche] = useState(25);
  const [minutesQuestions, setMinutesQuestions] = useState(15);

  const manuel = biens * minutesDossier + demandes * (minutesRecherche + minutesQuestions);
  const structure = Math.round(
    biens * minutesDossier * 0.45 + demandes * (minutesRecherche * 0.25 + minutesQuestions * 0.35),
  );
  const gain = Math.max(0, manuel - structure);

  return (
    <>
      <PageHeader
        step="Étape 06 — Temps gagné"
        title="Combien de temps la structuration de l'information pourrait libérer"
        intro="Les paramètres sont modifiables : l'objectif est de raisonner sur des ordres de grandeur, pas de produire une promesse."
      >
        <DemoTag>Simulation indicative</DemoTag>
      </PageHeader>

      <Section>
        <div className="grid gap-px border border-border bg-border lg:grid-cols-2">
          <div className="space-y-8 bg-surface p-7">
            <Range label="Biens traités par mois" value={biens} min={1} max={60} onChange={setBiens} unit="biens" />
            <Range
              label="Demandes clients par mois"
              value={demandes}
              min={1}
              max={120}
              onChange={setDemandes}
              unit="demandes"
            />
            <Range
              label="Minutes pour préparer un dossier de bien"
              value={minutesDossier}
              min={10}
              max={180}
              step={5}
              onChange={setMinutesDossier}
              unit="min"
            />
            <Range
              label="Minutes pour retrouver une information"
              value={minutesRecherche}
              min={5}
              max={90}
              step={5}
              onChange={setMinutesRecherche}
              unit="min"
            />
            <Range
              label="Minutes de réponses aux questions répétitives"
              value={minutesQuestions}
              min={5}
              max={90}
              step={5}
              onChange={setMinutesQuestions}
              unit="min"
            />
          </div>

          <div className="space-y-8 bg-surface p-7">
            <Result label="Temps manuel estimé" minutes={manuel} tone="muted" />
            <Result label="Temps avec workflow structuré" minutes={structure} tone="muted" />
            <Result label="Temps potentiellement économisé" minutes={gain} tone="primary" />
            <Disclaimer>
              Simulation indicative — à calibrer avec les données réelles d'EMAREA. Aucune projection
              financière n'est formulée.
            </Disclaimer>
          </div>
        </div>
      </Section>
    </>
  );
}

function Range({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-4">
        <span className="label-caps text-muted-foreground">{label}</span>
        <span className="font-display text-lg font-bold text-foreground">
          {value} {unit}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-primary"
      />
    </label>
  );
}

function Result({
  label,
  minutes,
  tone,
}: {
  label: string;
  minutes: number;
  tone: "muted" | "primary";
}) {
  const heures = Math.round((minutes / 60) * 10) / 10;
  return (
    <div className="border-b border-border pb-6">
      <p className="label-caps text-muted-foreground">{label}</p>
      <p
        className={
          tone === "primary"
            ? "mt-3 font-display text-5xl font-bold text-primary"
            : "mt-3 font-display text-4xl font-bold text-foreground"
        }
      >
        {heures.toLocaleString("fr-FR")} h
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        soit {minutes.toLocaleString("fr-FR")} minutes par mois
      </p>
    </div>
  );
}
