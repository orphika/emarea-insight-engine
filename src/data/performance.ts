/**
 * Données de démonstration pour l'écran "Rentabilité" (src/routes/rentabilite.tsx).
 *
 * Distinct du portefeuille actif (src/data/properties.ts) : ce fichier modélise des
 * mandats déjà CONCLUS (transactions passées), utilisé pour calculer les commissions
 * réellement générées et les délais moyens par segment — deux informations qu'un
 * portefeuille de biens "en cours" ne peut pas fournir par nature. Le portefeuille actif
 * reste la source pour la valeur des mandats en cours et les biens dormants.
 *
 * Aucune donnée réelle EMAREA. Montants, dates et volumes sont fictifs, choisis à un
 * ordre de grandeur plausible pour de l'immobilier d'entreprise algérien, cohérent avec
 * le portefeuille de démonstration (mêmes segments, mêmes wilayas).
 *
 * Taux de commission : approximation d'usage courant pour l'immobilier d'entreprise en
 * Algérie — décret exécutif n° 09-18 du 20 janvier 2009 (répartition vendeur/acheteur en
 * vente ; équivalent d'un mois de loyer en location, ici compté une fois par partie).
 * Donnée de pré-entraînement fournie en contexte — à confirmer avec EMAREA avant tout
 * usage commercial : le taux réellement pratiqué par le cabinet peut différer.
 */

export type Segment =
  "Logistique / Industriel" | "Bureaux" | "Commercial" | "Foncier" | "Résidentiel haut de gamme";

export const segments: Segment[] = [
  "Logistique / Industriel",
  "Bureaux",
  "Commercial",
  "Foncier",
  "Résidentiel haut de gamme",
];

/** 1 % côté vendeur + 1 % côté acheteur — approximation, à confirmer avec EMAREA. */
export const COMMISSION_TAUX_VENTE = 0.02;
/** Un mois de loyer de chaque côté — approximation, à confirmer avec EMAREA. */
export const COMMISSION_MOIS_LOYER_LOCATION = 2;

export function formatDZD(montant: number): string {
  const arrondi = Math.round(montant);
  if (Math.abs(arrondi) >= 1_000_000) {
    return `${(arrondi / 1_000_000).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} M DZD`;
  }
  return `${arrondi.toLocaleString("fr-FR")} DZD`;
}

export interface ClosedDeal {
  id: string;
  segment: Segment;
  transaction: "Vente" | "Location";
  wilaya: string;
  /** Prix de vente si transaction = Vente, loyer mensuel si transaction = Location. */
  valeur: number;
  dateMandat: string;
  dateConclusion: string;
}

function joursEntre(debut: string, fin: string): number {
  return Math.round((new Date(fin).getTime() - new Date(debut).getTime()) / 86_400_000);
}

function commissionDeal(d: ClosedDeal): number {
  return d.transaction === "Vente"
    ? d.valeur * COMMISSION_TAUX_VENTE
    : d.valeur * COMMISSION_MOIS_LOYER_LOCATION;
}

const dealsInput: ClosedDeal[] = [
  // Logistique / Industriel — cycle de décision long, tickets élevés
  {
    id: "LOG-1",
    segment: "Logistique / Industriel",
    transaction: "Vente",
    wilaya: "Boumerdès",
    valeur: 320_000_000,
    dateMandat: "2025-02-10",
    dateConclusion: "2025-07-02",
  },
  {
    id: "LOG-2",
    segment: "Logistique / Industriel",
    transaction: "Location",
    wilaya: "Alger",
    valeur: 1_400_000,
    dateMandat: "2025-04-01",
    dateConclusion: "2025-06-20",
  },
  {
    id: "LOG-3",
    segment: "Logistique / Industriel",
    transaction: "Vente",
    wilaya: "Blida",
    valeur: 210_000_000,
    dateMandat: "2024-11-15",
    dateConclusion: "2025-05-10",
  },

  // Bureaux — cycle plus court
  {
    id: "BUR-1",
    segment: "Bureaux",
    transaction: "Location",
    wilaya: "Alger",
    valeur: 650_000,
    dateMandat: "2025-05-05",
    dateConclusion: "2025-07-01",
  },
  {
    id: "BUR-2",
    segment: "Bureaux",
    transaction: "Vente",
    wilaya: "Alger",
    valeur: 95_000_000,
    dateMandat: "2025-01-20",
    dateConclusion: "2025-04-15",
  },
  {
    id: "BUR-3",
    segment: "Bureaux",
    transaction: "Location",
    wilaya: "Alger",
    valeur: 480_000,
    dateMandat: "2025-06-01",
    dateConclusion: "2025-07-20",
  },

  // Commercial — cycle court, tickets plus faibles
  {
    id: "COM-1",
    segment: "Commercial",
    transaction: "Location",
    wilaya: "Alger",
    valeur: 380_000,
    dateMandat: "2025-03-10",
    dateConclusion: "2025-04-25",
  },
  {
    id: "COM-2",
    segment: "Commercial",
    transaction: "Vente",
    wilaya: "Oran",
    valeur: 68_000_000,
    dateMandat: "2025-02-01",
    dateConclusion: "2025-04-10",
  },
  {
    id: "COM-3",
    segment: "Commercial",
    transaction: "Location",
    wilaya: "Alger",
    valeur: 520_000,
    dateMandat: "2025-07-01",
    dateConclusion: "2025-08-15",
  },

  // Foncier — cycle très long, essentiellement de la vente
  {
    id: "FON-1",
    segment: "Foncier",
    transaction: "Vente",
    wilaya: "Tipaza",
    valeur: 140_000_000,
    dateMandat: "2024-09-01",
    dateConclusion: "2025-04-20",
  },
  {
    id: "FON-2",
    segment: "Foncier",
    transaction: "Vente",
    wilaya: "Boumerdès",
    valeur: 95_000_000,
    dateMandat: "2025-01-05",
    dateConclusion: "2025-08-01",
  },
  {
    id: "FON-3",
    segment: "Foncier",
    transaction: "Vente",
    wilaya: "Blida",
    valeur: 180_000_000,
    dateMandat: "2024-12-10",
    dateConclusion: "2025-06-30",
  },

  // Résidentiel haut de gamme — cycle moyen, tickets élevés
  {
    id: "RES-1",
    segment: "Résidentiel haut de gamme",
    transaction: "Vente",
    wilaya: "Alger",
    valeur: 220_000_000,
    dateMandat: "2025-03-01",
    dateConclusion: "2025-06-15",
  },
  {
    id: "RES-2",
    segment: "Résidentiel haut de gamme",
    transaction: "Location",
    wilaya: "Alger",
    valeur: 950_000,
    dateMandat: "2025-05-15",
    dateConclusion: "2025-07-25",
  },
  {
    id: "RES-3",
    segment: "Résidentiel haut de gamme",
    transaction: "Vente",
    wilaya: "Alger",
    valeur: 175_000_000,
    dateMandat: "2025-01-10",
    dateConclusion: "2025-05-30",
  },
];

export const closedDeals: ClosedDeal[] = dealsInput;

export interface SegmentPerformance {
  segment: Segment;
  commissionTotale: number;
  nombreTransactions: number;
  delaiMoyenJours: number;
}

export function segmentPerformance(): SegmentPerformance[] {
  return segments.map((segment) => {
    const deals = closedDeals.filter((d) => d.segment === segment);
    const commissionTotale = deals.reduce((sum, d) => sum + commissionDeal(d), 0);
    const delais = deals.map((d) => joursEntre(d.dateMandat, d.dateConclusion));
    const delaiMoyenJours = delais.length
      ? Math.round(delais.reduce((a, b) => a + b, 0) / delais.length)
      : 0;
    return { segment, commissionTotale, nombreTransactions: deals.length, delaiMoyenJours };
  });
}

/**
 * Entonnoir de conversion, agrégé sur les 12 derniers mois glissants de la démonstration.
 * Chiffres fictifs — pas de suivi CRM réel derrière ce prototype.
 */
export interface FunnelStage {
  key: "demandes" | "dossiers" | "transactions";
  label: string;
  count: number;
}

export const clientFunnel: FunnelStage[] = [
  { key: "demandes", label: "Demandes clients reçues", count: 46 },
  { key: "dossiers", label: "Dossiers envoyés", count: 27 },
  { key: "transactions", label: "Transactions conclues", count: 11 },
];

/** Poids estimé de la commission dans le calcul d'un bien location vs. vente, pour affichage pédagogique. */
export function commissionPotentielle(bien: {
  transaction: "Location" | "Vente" | "Location / Vente";
  valeur: number;
}): number {
  // "Location / Vente" : le champ `valeur` porte alors un prix de vente indicatif —
  // on calcule la commission sur cette base (hypothèse à confirmer avec EMAREA).
  if (bien.transaction === "Location") {
    return bien.valeur * COMMISSION_MOIS_LOYER_LOCATION;
  }
  return bien.valeur * COMMISSION_TAUX_VENTE;
}
