import { properties, type Property } from "@/data/properties";
import type { ClientNeeds, Requirement } from "@/data/requirement";
import { needLabels } from "@/data/requirement";

export interface CriterionResult {
  label: string;
  weight: number;
  earned: number;
  status: "ok" | "partiel" | "manquant";
  detail: string;
}

export interface MatchResult {
  property: Property;
  score: number;
  criteria: CriterionResult[];
}

const needWeights: Record<keyof ClientNeeds, number> = {
  grandTonnage: 15,
  showroom: 10,
  sav: 10,
  piecesDetachees: 6,
  administration: 6,
  centreFormation: 4,
  utilites: 2,
  documents: 2,
};

const SURFACE_WEIGHT = 25;
const LOCATION_WEIGHT = 20;

/**
 * Scoring déterministe, pondéré par critère. Aucun modèle d'IA n'est exécuté :
 * le score n'est qu'une lecture structurée des critères renseignés.
 */
export function scoreProperty(property: Property, requirement: Requirement): MatchResult {
  const criteria: CriterionResult[] = [];

  const { surfaceMin, surfaceMax } = requirement;
  const surface = property.surfaceTotale;
  let surfaceEarned = 0;
  let surfaceStatus: CriterionResult["status"] = "manquant";
  if (surface >= surfaceMin && surface <= surfaceMax) {
    surfaceEarned = SURFACE_WEIGHT;
    surfaceStatus = "ok";
  } else {
    const target = surface < surfaceMin ? surfaceMin : surfaceMax;
    const ecart = Math.abs(surface - target) / target;
    if (ecart <= 0.35) {
      surfaceEarned = Math.round(SURFACE_WEIGHT * (1 - ecart));
      surfaceStatus = "partiel";
    }
  }
  criteria.push({
    label: "Surface totale",
    weight: SURFACE_WEIGHT,
    earned: surfaceEarned,
    status: surfaceStatus,
    detail: `${surface.toLocaleString("fr-FR")} m² pour un besoin de ${surfaceMin.toLocaleString("fr-FR")}–${surfaceMax.toLocaleString("fr-FR")} m²`,
  });

  const locationOk = requirement.wilayas.includes(property.wilaya);
  criteria.push({
    label: "Localisation",
    weight: LOCATION_WEIGHT,
    earned: locationOk ? LOCATION_WEIGHT : 0,
    status: locationOk ? "ok" : "manquant",
    detail: locationOk
      ? `${property.wilaya} fait partie des wilayas recherchées`
      : `${property.wilaya} hors des wilayas recherchées`,
  });

  (Object.keys(needWeights) as (keyof ClientNeeds)[]).forEach((key) => {
    if (!requirement.needs[key]) return;
    const weight = needWeights[key];
    if (key === "documents") {
      const state = property.capabilities.documents;
      const earned = state === "complet" ? weight : state === "partiel" ? Math.round(weight / 2) : 0;
      criteria.push({
        label: needLabels[key],
        weight,
        earned,
        status: state === "complet" ? "ok" : state === "partiel" ? "partiel" : "manquant",
        detail:
          state === "complet"
            ? "Ensemble des documents listés comme fournis"
            : state === "partiel"
              ? "Une partie des documents reste à vérifier"
              : "Aucun document listé",
      });
      return;
    }
    const has = property.capabilities[key] as boolean;
    criteria.push({
      label: needLabels[key],
      weight,
      earned: has ? weight : 0,
      status: has ? "ok" : "manquant",
      detail: has ? "Présent sur le site" : "Absent du site",
    });
  });

  const totalWeight = criteria.reduce((s, c) => s + c.weight, 0);
  const earned = criteria.reduce((s, c) => s + c.earned, 0);
  const score = totalWeight === 0 ? 0 : Math.round((earned / totalWeight) * 100);

  return { property, score, criteria };
}

export function rankProperties(requirement: Requirement): MatchResult[] {
  return properties
    .map((p) => scoreProperty(p, requirement))
    .sort((a, b) => b.score - a.score);
}
