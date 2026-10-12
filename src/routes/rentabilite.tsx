import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { DemoTag, PageHeader, Section } from "@/components/emarea/shell";
import {
  CommissionParSegment,
  DelaiParSegment,
  ValeurPortefeuille,
} from "@/components/emarea/rentabilite-blocks";
import { BiensDormants, FunnelConversion } from "@/components/emarea/rentabilite-funnel";
import { properties } from "@/data/properties";
import { withPerformance, propertyCommissionPotentielle } from "@/data/property-performance";
import { clientFunnel, segmentPerformance } from "@/data/performance";

export const Route = createFileRoute("/rentabilite")({
  head: () => ({
    meta: [
      { title: "Rentabilité — EMAREA Digital Intelligence" },
      {
        name: "description",
        content:
          "Où se fait réellement l'argent, quels mandats relancer, quels biens dorment : un tableau de bord décisionnel bâti sur le portefeuille de démonstration.",
      },
      { property: "og:title", content: "Rentabilité — EMAREA Digital Intelligence" },
      {
        property: "og:description",
        content:
          "Cinq lectures de l'activité qui ne se voient pas dans un tableur de suivi classique.",
      },
    ],
  }),
  component: Rentabilite,
});

function Rentabilite() {
  const perfBySegment = useMemo(() => segmentPerformance(), []);

  const biensAvecPerf = useMemo(
    () =>
      withPerformance(properties)
        .filter((p) => p.status !== "Réservé")
        .map((p) => ({ ...p, commissionPotentielle: propertyCommissionPotentielle(p) })),
    [],
  );
  const valeurTotale = biensAvecPerf.reduce((sum, p) => sum + p.valeur, 0);
  const commissionTotale = biensAvecPerf.reduce((sum, p) => sum + p.commissionPotentielle, 0);

  const [seuilDormance, setSeuilDormance] = useState(45);
  const biensDormants = useMemo(
    () =>
      withPerformance(properties)
        .filter((p) => p.derniereDemandeJours >= seuilDormance)
        .map((p) => ({ ...p, commissionPotentielle: propertyCommissionPotentielle(p) }))
        .sort((a, b) => b.derniereDemandeJours - a.derniereDemandeJours),
    [seuilDormance],
  );
  const commissionImmobilisee = biensDormants.reduce((sum, p) => sum + p.commissionPotentielle, 0);

  return (
    <>
      <PageHeader
        step="Rentabilité"
        title="Ce que votre activité rapporte, par segment et par bien"
        intro="Ces cinq lectures ne figurent généralement pas dans un tableur de suivi de mandats : elles répondent chacune à une décision concrète, pas seulement à un constat."
      >
        <DemoTag>Indicateurs de démonstration — chiffres fictifs</DemoTag>
      </PageHeader>

      <Section>
        <CommissionParSegment perf={perfBySegment} />
      </Section>

      <Section className="border-t border-border">
        <ValeurPortefeuille
          biens={biensAvecPerf}
          valeurTotale={valeurTotale}
          commissionTotale={commissionTotale}
        />
      </Section>

      <Section className="border-t border-border">
        <DelaiParSegment perf={perfBySegment} />
      </Section>

      <Section className="border-t border-border">
        <FunnelConversion stages={clientFunnel} />
      </Section>

      <Section className="border-t border-border">
        <BiensDormants
          biens={biensDormants}
          seuil={seuilDormance}
          onSeuilChange={setSeuilDormance}
          commissionImmobilisee={commissionImmobilisee}
        />
      </Section>
    </>
  );
}
