import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Database, Layers, Sparkles } from "lucide-react";

import { Section } from "@/components/emarea/shell";
import { HeroScrub } from "@/components/emarea/hero-scrub";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/emarea/motion";

// Schema.org JSON-LD — pour la lecture par les moteurs de recherche (SEO) et les agents/LLM (GEO).
// Uniquement des données confirmées (voir assets/SOURCES.md §3) : pas d'adresse/téléphone inventé.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "EMAREA — Immobilier d'Entreprise",
  description:
    "Cabinet de courtage immobilier d'entreprise à Alger, spécialisé dans les actifs industriels, logistiques et commerciaux.",
  email: "info.emarea@gmail.com",
  telephone: ["+213555192648", "+213661121067"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Boulevard 11 Décembre, Lot 42 B, Val d'Hydra",
    addressLocality: "El-Biar",
    addressRegion: "Alger",
    addressCountry: "DZ",
  },
  areaServed: {
    "@type": "City",
    name: "Alger",
  },
  knowsAbout: [
    "Immobilier industriel",
    "Immobilier logistique",
    "Immobilier commercial",
    "Courtage immobilier d'entreprise",
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EMAREA Digital Intelligence — Démonstration immobilier industriel" },
      {
        name: "description",
        content:
          "Prototype conceptuel : transformer chaque bien industriel en actif digital exploitable — centraliser, présenter, qualifier, trouver plus vite.",
      },
      { property: "og:title", content: "EMAREA Digital Intelligence — Démonstration" },
      {
        property: "og:description",
        content:
          "Centraliser. Présenter. Qualifier. Trouver plus vite. Une démonstration d'infrastructure digitale pour l'immobilier d'entreprise.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationJsonLd),
      },
    ],
  }),
  component: Index,
});

const pillars = [
  {
    icon: Clock,
    title: "Gain de temps",
    body: "La même information n'est plus recherchée cinq fois : elle est saisie une fois et réutilisée partout.",
  },
  {
    icon: Database,
    title: "Centralisation",
    body: "Chaque bien possède un dossier unique : caractéristiques techniques, documents, médias, contacts.",
  },
  {
    icon: Layers,
    title: "Image professionnelle",
    body: "Un actif industriel se présente comme un produit structuré, pas comme une simple annonce.",
  },
  {
    icon: Sparkles,
    title: "Capacité commerciale",
    body: "Traiter davantage de biens et de demandes sans augmenter proportionnellement le travail administratif.",
  },
];

const journey = [
  "Besoin client structuré",
  "Recherche dans le portefeuille",
  "Correspondances expliquées",
  "Dossier client généré",
];

function Index() {
  return (
    <>
      <HeroScrub />

      <Section>
        <StaggerGroup className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <StaggerItem key={p.title} className="bg-surface p-7">
              <p.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
              <h2 className="mt-6 label-caps text-foreground">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section className="border-t border-border">
        <Reveal>
          <p className="label-caps text-primary">Le parcours de la démonstration</p>
          <h2 className="mt-4 max-w-3xl text-2xl font-bold md:text-4xl">
            Un scénario complet, du cahier des charges au dossier envoyé au client.
          </h2>
        </Reveal>
        <StaggerGroup className="mt-10 grid gap-px border border-border bg-border md:grid-cols-4">
          {journey.map((label, i) => (
            <StaggerItem key={label} className="bg-surface p-7">
              <span className="font-display text-3xl font-bold text-primary">0{i + 1}</span>
              <p className="mt-4 text-sm leading-relaxed text-foreground">{label}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <p className="mt-8 text-sm text-muted-foreground">
          Environ cinq minutes suffisent pour parcourir l'ensemble.{" "}
          <Link to="/besoin" className="text-foreground underline underline-offset-4">
            Commencer par le besoin client
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
