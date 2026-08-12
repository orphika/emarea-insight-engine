import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Database, Layers, Sparkles } from "lucide-react";
import { useRef } from "react";

import { CtaLink, DemoTag, Section } from "@/components/emarea/shell";
import { LandingBackground } from "@/components/emarea/landing-background";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/emarea/motion";
import { useLanguage } from "@/lib/i18n";

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

const pillarIcons = [Clock, Database, Layers, Sparkles] as const;

/**
 * Landing ("/") — traitement immersif complet : fond vidéo scroll-scratch plein écran sur
 * toute la hauteur de page (landing-background.tsx), blocs de texte en verre dépoli
 * (glass-panel, landing-immersive.css), copywriting à tension + CTA à forte valeur perçue,
 * FR/EN (useLanguage). Ce traitement est volontairement confiné à cette route : les écrans
 * outils (portefeuille, dossier, etc.) restent des surfaces opaques classiques — le
 * glassmorphisme sur une interface de données denses est un anti-pattern de lisibilité.
 */
function Index() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const { t } = useLanguage();

  return (
    <div ref={pageRef} className="landing-immersive">
      <LandingBackground pageRef={pageRef} illustrationLabel={t.hero.illustrationBadge} />

      <div className="landing-immersive-content">
        <Section className="pb-8 pt-20 md:pb-12 md:pt-32">
          <div className="glass-panel max-w-4xl px-6 py-10 md:px-12 md:py-14">
            <DemoTag>{t.hero.tag}</DemoTag>
            <h1 className="mt-8 text-4xl font-bold leading-[1.05] md:text-6xl">
              {t.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl font-display text-xl text-muted-foreground md:text-2xl">
              {t.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <CtaLink to="/portefeuille">
                {t.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </CtaLink>
              <CtaLink to="/roadmap" variant="ghost">
                {t.hero.ctaSecondary}
              </CtaLink>
            </div>
            <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {t.hero.note}
            </p>
          </div>
        </Section>

        <Section className="pt-8 md:pt-12">
          <StaggerGroup className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {t.pillars.map((p, i) => {
              const Icon = pillarIcons[i] ?? Sparkles;
              return (
                <StaggerItem key={p.title} className="glass-panel p-7">
                  <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  <h2 className="mt-6 label-caps text-foreground">{p.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </Section>

        <Section className="pb-24 pt-8 md:pb-32 md:pt-12">
          <Reveal>
            <div className="glass-panel max-w-3xl px-6 py-8 md:px-10 md:py-10">
              <p className="label-caps text-primary">{t.journey.eyebrow}</p>
              <h2 className="mt-4 text-2xl font-bold md:text-4xl">{t.journey.title}</h2>
            </div>
          </Reveal>
          <StaggerGroup className="mt-10 grid gap-4 md:grid-cols-4">
            {t.journey.steps.map((label, i) => (
              <StaggerItem key={label} className="glass-panel p-7">
                <span className="font-display text-3xl font-bold text-primary">0{i + 1}</span>
                <p className="mt-4 text-sm leading-relaxed text-foreground">{label}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <p className="mt-8 text-sm text-muted-foreground">
            {t.journey.footerPrefix}{" "}
            <Link to="/besoin" className="text-foreground underline underline-offset-4">
              {t.journey.footerLink}
            </Link>
            .
          </p>
        </Section>
      </div>
    </div>
  );
}
