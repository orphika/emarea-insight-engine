import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * Dictionnaire maison minimal (pas de lib i18n) : le projet est un prototype de
 * démonstration, une seule route (la landing "/") est intégralement traduite pour
 * l'instant — voir note dans src/routes/index.tsx. Le reste des écrans outils
 * (portefeuille, dossier, etc.) reste en français : ce sont des données de
 * démonstration denses, pas le support commercial destiné à un lecteur anglophone.
 *
 * Persistance : localStorage uniquement (pas de cookie — pas de SSR sensible à la
 * langue ici, tout est rendu par défaut en FR côté serveur puis resynchronisé après
 * montage pour éviter un mismatch d'hydratation).
 */
export type Lang = "fr" | "en";

const STORAGE_KEY = "emarea-lang";

type NavKey = "intro" | "portefeuille" | "besoin" | "matching" | "dossier" | "temps" | "roadmap";

export type Dict = {
  nav: Record<NavKey, string>;
  topBanner: string;
  langToggleLabel: string;
  langToggleShort: string;
  footer: { tag: string; disclaimer: string };
  hero: {
    tag: string;
    illustrationBadge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    note: string;
  };
  pillars: { title: string; body: string }[];
  journey: {
    eyebrow: string;
    title: string;
    steps: string[];
    footerPrefix: string;
    footerLink: string;
  };
};

const dict: Record<Lang, Dict> = {
  fr: {
    nav: {
      intro: "Intro",
      portefeuille: "Portefeuille",
      besoin: "Besoin client",
      matching: "Correspondances",
      dossier: "Dossier client",
      temps: "Temps gagné",
      roadmap: "Roadmap",
    },
    topBanner: "Prototype conceptuel — données de démonstration",
    langToggleLabel: "English version",
    langToggleShort: "EN",
    footer: {
      tag: "Prototype conceptuel — EMAREA Digital Intelligence",
      disclaimer:
        "Les données et indicateurs présentés dans cette démonstration sont fictifs sauf indication contraire. Ce prototype ne décrit pas les processus internes actuels du Cabinet EMAREA et n'implique aucune vérification juridique des documents évoqués.",
    },
    hero: {
      tag: "Prototype conceptuel — non contractuel",
      illustrationBadge: "Vidéo — illustration générée (non tournée sur un site EMAREA)",
      title: "Combien de biens dorment dans vos dossiers, invisibles pour l'acheteur qui les cherche déjà ?",
      subtitle: "Centraliser. Présenter. Qualifier. Trouver plus vite.",
      ctaPrimary: "Explorer le dossier client en direct",
      ctaSecondary: "Comprendre le mécanisme",
      note: "Cette démonstration ne présente pas un site vitrine. Elle montre la couche d'information qui pourrait se trouver derrière la présence digitale d'un cabinet d'immobilier d'entreprise.",
    },
    pillars: [
      {
        title: "Gain de temps",
        body: "La même information n'est plus recherchée cinq fois : elle est saisie une fois et réutilisée partout.",
      },
      {
        title: "Centralisation",
        body: "Chaque bien possède un dossier unique : caractéristiques techniques, documents, médias, contacts.",
      },
      {
        title: "Image professionnelle",
        body: "Un actif industriel se présente comme un produit structuré, pas comme une simple annonce.",
      },
      {
        title: "Capacité commerciale",
        body: "Traiter davantage de biens et de demandes sans augmenter proportionnellement le travail administratif.",
      },
    ],
    journey: {
      eyebrow: "Le parcours de la démonstration",
      title: "Un scénario complet, du cahier des charges au dossier envoyé au client.",
      steps: [
        "Besoin client structuré",
        "Recherche dans le portefeuille",
        "Correspondances expliquées",
        "Dossier client généré",
      ],
      footerPrefix: "Environ cinq minutes suffisent pour parcourir l'ensemble.",
      footerLink: "Commencer par le besoin client",
    },
  },
  en: {
    nav: {
      intro: "Intro",
      portefeuille: "Portfolio",
      besoin: "Client brief",
      matching: "Matches",
      dossier: "Client file",
      temps: "Time saved",
      roadmap: "Roadmap",
    },
    topBanner: "Conceptual prototype — demonstration data",
    langToggleLabel: "Version française",
    langToggleShort: "FR",
    footer: {
      tag: "Conceptual prototype — EMAREA Digital Intelligence",
      disclaimer:
        "The data and indicators shown in this demonstration are fictitious unless stated otherwise. This prototype does not describe the Cabinet EMAREA's current internal processes and involves no legal verification of the documents mentioned.",
    },
    hero: {
      tag: "Conceptual prototype — non-contractual",
      illustrationBadge: "Video — generated illustration (not filmed on an EMAREA site)",
      title: "How many properties are sitting in your files, invisible to the buyer already looking for them?",
      subtitle: "Centralize. Present. Qualify. Find faster.",
      ctaPrimary: "Walk through a live client file",
      ctaSecondary: "See how it works",
      note: "This demonstration is not a showcase website. It shows the information layer that could sit behind the digital presence of a commercial real estate firm.",
    },
    pillars: [
      {
        title: "Time saved",
        body: "The same information is no longer looked up five times over: it is entered once and reused everywhere.",
      },
      {
        title: "Centralization",
        body: "Every property gets a single file: technical specs, documents, media, contacts.",
      },
      {
        title: "Professional image",
        body: "An industrial asset is presented as a structured product, not a plain listing.",
      },
      {
        title: "Sales capacity",
        body: "Handle more properties and more requests without a proportional rise in admin work.",
      },
    ],
    journey: {
      eyebrow: "The walkthrough",
      title: "A complete scenario, from the client brief to the file sent to the client.",
      steps: [
        "Structured client brief",
        "Search across the portfolio",
        "Matches, explained",
        "Client file generated",
      ],
      footerPrefix: "About five minutes is enough to go through all of it.",
      footerLink: "Start with the client brief",
    },
  },
};

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "en") setLangState(stored);
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: dict[lang] }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage doit être utilisé sous LanguageProvider");
  return ctx;
}
