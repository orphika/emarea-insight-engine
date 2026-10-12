/**
 * Extension du portefeuille (src/data/properties.ts) pour l'écran Rentabilité, tenue à
 * part pour ne pas alourdir le fichier portefeuille — voir src/data/performance.ts pour
 * le contexte des taux de commission et le pourquoi de cette séparation.
 *
 * Clé = `Property.id`. Aucune donnée réelle EMAREA — fictif, ordre de grandeur pour la
 * démonstration uniquement.
 */
import type { Property } from "./properties";
import { commissionPotentielle, type Segment } from "./performance";

export interface PropertyPerformance {
  /** Segment métier réel d'EMAREA (distinct de `kind`, qui décrit la nature physique du bien). */
  segment: Segment;
  /** Valeur de référence du mandat en DZD — prix de vente, ou loyer mensuel si location. */
  valeur: number;
  /** Jours écoulés depuis la dernière demande client reçue sur ce bien. */
  derniereDemandeJours: number;
}

const performanceByPropertyId: Record<string, PropertyPerformance> = {
  "site-3s-boumerdes": {
    segment: "Logistique / Industriel",
    valeur: 340_000_000,
    derniereDemandeJours: 6,
  },
  "plateforme-blida": {
    segment: "Logistique / Industriel",
    valeur: 1_650_000,
    derniereDemandeJours: 52,
  },
  "site-industriel-rouiba": {
    segment: "Logistique / Industriel",
    valeur: 185_000_000,
    derniereDemandeJours: 3,
  },
  "terrain-tipaza": {
    segment: "Foncier",
    valeur: 210_000_000,
    derniereDemandeJours: 95,
  },
  "actif-commercial-alger": {
    segment: "Bureaux",
    valeur: 720_000,
    derniereDemandeJours: 12,
  },
};

/** Fallback prudent si un bien n'a pas (encore) de données de performance renseignées. */
const fallback: PropertyPerformance = {
  segment: "Commercial",
  valeur: 0,
  derniereDemandeJours: 0,
};

export function getPropertyPerformance(id: string): PropertyPerformance {
  return performanceByPropertyId[id] ?? fallback;
}

export interface PropertyWithPerformance extends Property, PropertyPerformance {}

export function withPerformance(properties: Property[]): PropertyWithPerformance[] {
  return properties.map((p) => ({ ...p, ...getPropertyPerformance(p.id) }));
}

export function propertyCommissionPotentielle(p: Property): number {
  const perf = getPropertyPerformance(p.id);
  return commissionPotentielle({ transaction: p.transaction, valeur: perf.valeur });
}
