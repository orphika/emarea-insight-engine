import { useSyncExternalStore } from "react";

export interface ClientNeeds {
  grandTonnage: boolean;
  showroom: boolean;
  sav: boolean;
  piecesDetachees: boolean;
  administration: boolean;
  centreFormation: boolean;
  utilites: boolean;
  documents: boolean;
}

export interface Requirement {
  client: string;
  projet: string;
  wilayas: string[];
  surfaceMin: number;
  surfaceMax: number;
  needs: ClientNeeds;
}

export const wilayasDisponibles = ["Alger", "Blida", "Boumerdès", "Tipaza"];

export const needLabels: Record<keyof ClientNeeds, string> = {
  grandTonnage: "Accès grand tonnage",
  showroom: "Showroom / exposition",
  sav: "Atelier après-vente (SAV)",
  piecesDetachees: "Magasin pièces détachées",
  administration: "Bloc administratif",
  centreFormation: "Centre de formation",
  utilites: "Utilités raccordées",
  documents: "Documentation juridique complète",
};

export const defaultRequirement: Requirement = {
  client: "International Heavy Truck Company",
  projet: "Implantation d'un site 3S — vente, service, pièces détachées",
  wilayas: ["Alger", "Blida", "Boumerdès"],
  surfaceMin: 16000,
  surfaceMax: 20000,
  needs: {
    grandTonnage: true,
    showroom: true,
    sav: true,
    piecesDetachees: true,
    administration: true,
    centreFormation: true,
    utilites: true,
    documents: true,
  },
};

/* Store minimal partagé entre le formulaire de besoin, le matching et le dossier client. */
let current: Requirement = defaultRequirement;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setRequirement(next: Requirement) {
  current = next;
  listeners.forEach((l) => l());
}

export function useRequirement(): Requirement {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => defaultRequirement,
  );
}

let selectedPropertyId = "site-3s-boumerdes";
const selectionListeners = new Set<() => void>();

export function setSelectedProperty(id: string) {
  selectedPropertyId = id;
  selectionListeners.forEach((l) => l());
}

export function useSelectedProperty(): string {
  return useSyncExternalStore(
    (l) => {
      selectionListeners.add(l);
      return () => selectionListeners.delete(l);
    },
    () => selectedPropertyId,
    () => "site-3s-boumerdes",
  );
}
