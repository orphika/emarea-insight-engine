// 7 photos réelles du bien "site-3s-boumerdes" (fournies par le client, dossier
// assets/property-01/final/, voir assets/SOURCES.md §7 pour la provenance). Les 4
// autres biens de démonstration restent sans photos réelles — pas de substitution
// générique (règle de non-invention du projet).
import propertyPhoto01 from "../../assets/property-01/final/01-cour-camions-gares.jpg";
import propertyPhoto02 from "../../assets/property-01/final/02-showroom-mack.jpg";
import propertyPhoto03 from "../../assets/property-01/final/03-quai-chargement-exterieur.jpg";
import propertyPhoto04 from "../../assets/property-01/final/04-entrepot-interieur-allees.jpg";
import propertyPhoto05 from "../../assets/property-01/final/05-showroom-man-reception.jpg";
import propertyPhoto06 from "../../assets/property-01/final/06-batiment-quai-facade.jpg";
import propertyPhoto07 from "../../assets/property-01/final/07-entrepot-rayonnage.jpg";

export type PropertyKind = "Industriel" | "Logistique" | "Commercial";
export type PropertyStatus = "Disponible" | "En discussion" | "Réservé";
export type DocumentStatus = "Document fourni" | "Document à vérifier";

export interface PropertyDocument {
  label: string;
  status: DocumentStatus;
}

export interface PropertyPhoto {
  src: string;
  alt: string;
}

export interface PropertyCapabilities {
  grandTonnage: boolean;
  showroom: boolean;
  sav: boolean;
  piecesDetachees: boolean;
  administration: boolean;
  centreFormation: boolean;
  utilites: boolean;
  documents: "complet" | "partiel" | "absent";
}

export interface Property {
  id: string;
  reference: string;
  title: string;
  kind: PropertyKind;
  transaction: "Location" | "Vente" | "Location / Vente";
  wilaya: string;
  commune: string;
  status: PropertyStatus;
  surfaceTotale: number;
  surfaceBatie: number;
  hauteurUtile: string;
  hangars: string;
  bureaux: string;
  autoroute: string;
  electricite: string;
  eau: string;
  gaz: string;
  parking: string;
  equipements: string[];
  documents: PropertyDocument[];
  mediaPhotos: number;
  mediaVideos: number;
  /** Photos réelles rattachées au dossier — absent si non fourni (pas de placeholder). */
  photos?: PropertyPhoto[];
  contactName: string;
  contactRole: string;
  synthese: string;
  capabilities: PropertyCapabilities;
}

/**
 * Données de démonstration. Aucune donnée réelle EMAREA.
 * Séparées de l'UI pour pouvoir être remplacées par une base de données
 * sans réécrire les écrans.
 */
export const properties: Property[] = [
  {
    id: "site-3s-boumerdes",
    reference: "DEMO-IND-014",
    title: "Site industriel & showroom poids lourds",
    kind: "Industriel",
    transaction: "Location / Vente",
    wilaya: "Boumerdès",
    commune: "Ouled Moussa",
    status: "Disponible",
    surfaceTotale: 18400,
    surfaceBatie: 6200,
    hauteurUtile: "9,5 m sous ferme",
    hangars: "2 hangars — 3 400 m² et 1 800 m²",
    bureaux: "Bloc administratif R+1 — 1 000 m²",
    autoroute: "Autoroute Est-Ouest à 4,2 km",
    electricite: "Transformateur 630 kVA",
    eau: "Raccordement réseau + bâche 200 m³",
    gaz: "Raccordé",
    parking: "Aire de manœuvre 3 200 m² — 40 places PL",
    equipements: [
      "Showroom vitré 900 m²",
      "Atelier SAV 6 ponts poids lourds",
      "Magasin pièces détachées 700 m²",
      "Pont bascule 60 t",
      "Clôture périphérique + poste de garde",
    ],
    documents: [
      { label: "Acte de propriété", status: "Document fourni" },
      { label: "Livret foncier", status: "Document fourni" },
      { label: "Permis de construire", status: "Document fourni" },
      { label: "Certificat de conformité", status: "Document à vérifier" },
    ],
    mediaPhotos: 24,
    mediaVideos: 2,
    photos: [
      { src: propertyPhoto01, alt: "Vue aérienne de la cour avec plusieurs camions poids lourds garés" },
      { src: propertyPhoto02, alt: "Showroom véhicules Mack" },
      { src: propertyPhoto03, alt: "Quai de chargement extérieur" },
      { src: propertyPhoto04, alt: "Intérieur de l'entrepôt, allées de circulation" },
      { src: propertyPhoto05, alt: "Showroom MAN, espace réception" },
      { src: propertyPhoto06, alt: "Façade du bâtiment côté quai" },
      { src: propertyPhoto07, alt: "Entrepôt, zone de rayonnage" },
    ],
    contactName: "Chargé d'affaires — Pôle industriel",
    contactRole: "Cabinet EMAREA (démonstration)",
    synthese:
      "Site conçu pour une activité 3S : commercialisation, atelier et pièces détachées sur une même emprise, avec accès grand tonnage direct.",
    capabilities: {
      grandTonnage: true,
      showroom: true,
      sav: true,
      piecesDetachees: true,
      administration: true,
      centreFormation: false,
      utilites: true,
      documents: "partiel",
    },
  },
  {
    id: "plateforme-blida",
    reference: "DEMO-LOG-027",
    title: "Plateforme logistique avec quais de chargement",
    kind: "Logistique",
    transaction: "Location",
    wilaya: "Blida",
    commune: "Oued Alleug",
    status: "Disponible",
    surfaceTotale: 21000,
    surfaceBatie: 9800,
    hauteurUtile: "11 m sous ferme",
    hangars: "Entrepôt unique 9 000 m² — 14 quais",
    bureaux: "Bureaux d'exploitation — 800 m²",
    autoroute: "Échangeur autoroutier à 1,8 km",
    electricite: "Transformateur 1 000 kVA",
    eau: "Forage + réseau",
    gaz: "Non raccordé",
    parking: "Cour de manœuvre 5 000 m² — 60 places PL",
    equipements: [
      "14 quais niveleurs",
      "Sol dallé 5 t/m²",
      "Sprinklage",
      "Bureau transporteurs",
    ],
    documents: [
      { label: "Acte de propriété", status: "Document fourni" },
      { label: "Livret foncier", status: "Document fourni" },
      { label: "Permis de construire", status: "Document fourni" },
      { label: "Certificat de conformité", status: "Document fourni" },
    ],
    mediaPhotos: 18,
    mediaVideos: 1,
    contactName: "Chargé d'affaires — Pôle logistique",
    contactRole: "Cabinet EMAREA (démonstration)",
    synthese:
      "Volume et accessibilité poids lourds excellents, mais pas d'atelier après-vente ni de surface de exposition existante.",
    capabilities: {
      grandTonnage: true,
      showroom: false,
      sav: false,
      piecesDetachees: true,
      administration: true,
      centreFormation: false,
      utilites: true,
      documents: "complet",
    },
  },
  {
    id: "site-industriel-rouiba",
    reference: "DEMO-IND-031",
    title: "Unité industrielle avec atelier et aire technique",
    kind: "Industriel",
    transaction: "Vente",
    wilaya: "Alger",
    commune: "Rouiba",
    status: "En discussion",
    surfaceTotale: 15600,
    surfaceBatie: 5400,
    hauteurUtile: "8 m sous ferme",
    hangars: "3 hangars — 2 200 m², 1 600 m², 900 m²",
    bureaux: "Administration — 700 m²",
    autoroute: "Rocade Est à 3 km",
    electricite: "Transformateur 400 kVA",
    eau: "Réseau",
    gaz: "Raccordé",
    parking: "Aire technique 1 800 m² — 18 places PL",
    equipements: [
      "Atelier mécanique 3 ponts",
      "Centre de formation technique 400 m²",
      "Zone de lavage",
      "Local groupe électrogène",
    ],
    documents: [
      { label: "Acte de propriété", status: "Document fourni" },
      { label: "Livret foncier", status: "Document à vérifier" },
      { label: "Permis de construire", status: "Document fourni" },
      { label: "Certificat de conformité", status: "Document à vérifier" },
    ],
    mediaPhotos: 15,
    mediaVideos: 0,
    contactName: "Chargé d'affaires — Pôle industriel",
    contactRole: "Cabinet EMAREA (démonstration)",
    synthese:
      "Atelier et centre de formation déjà en place, mais surface totale inférieure au besoin exprimé et pas de showroom.",
    capabilities: {
      grandTonnage: true,
      showroom: false,
      sav: true,
      piecesDetachees: true,
      administration: true,
      centreFormation: true,
      utilites: true,
      documents: "partiel",
    },
  },
  {
    id: "terrain-tipaza",
    reference: "DEMO-FON-008",
    title: "Foncier industriel nu, viabilisé",
    kind: "Industriel",
    transaction: "Vente",
    wilaya: "Tipaza",
    commune: "Koléa",
    status: "Disponible",
    surfaceTotale: 30000,
    surfaceBatie: 0,
    hauteurUtile: "—",
    hangars: "Aucune construction",
    bureaux: "Aucun",
    autoroute: "Pénétrante autoroutière à 6 km",
    electricite: "En limite de propriété",
    eau: "En limite de propriété",
    gaz: "En limite de propriété",
    parking: "À aménager",
    equipements: ["Terrain plat", "Voirie d'accès bitumée", "Clôture partielle"],
    documents: [
      { label: "Acte de propriété", status: "Document fourni" },
      { label: "Livret foncier", status: "Document fourni" },
      { label: "Certificat d'urbanisme", status: "Document à vérifier" },
    ],
    mediaPhotos: 9,
    mediaVideos: 0,
    contactName: "Chargé d'affaires — Pôle foncier",
    contactRole: "Cabinet EMAREA (démonstration)",
    synthese:
      "Réserve foncière importante pour une construction sur mesure, mais aucun bâti existant : délai de mise en service long.",
    capabilities: {
      grandTonnage: true,
      showroom: false,
      sav: false,
      piecesDetachees: false,
      administration: false,
      centreFormation: false,
      utilites: false,
      documents: "partiel",
    },
  },
  {
    id: "actif-commercial-alger",
    reference: "DEMO-COM-019",
    title: "Actif commercial et bureaux d'entreprise",
    kind: "Commercial",
    transaction: "Location",
    wilaya: "Alger",
    commune: "Bab Ezzouar",
    status: "Disponible",
    surfaceTotale: 2400,
    surfaceBatie: 2400,
    hauteurUtile: "3,2 m par niveau",
    hangars: "Aucun",
    bureaux: "Plateaux bureaux R+3 — 1 900 m²",
    autoroute: "Accès autoroutier à 1 km",
    electricite: "Réseau + onduleur",
    eau: "Réseau",
    gaz: "Raccordé",
    parking: "Sous-sol — 40 places VL",
    equipements: ["Showroom rez-de-chaussée 500 m²", "Climatisation centralisée", "Ascenseurs"],
    documents: [
      { label: "Acte de propriété", status: "Document fourni" },
      { label: "Certificat de conformité", status: "Document fourni" },
    ],
    mediaPhotos: 12,
    mediaVideos: 1,
    contactName: "Chargé d'affaires — Pôle bureaux",
    contactRole: "Cabinet EMAREA (démonstration)",
    synthese:
      "Vitrine commerciale et sièges d'entreprise : pertinent pour une représentation, pas pour une implantation technique poids lourds.",
    capabilities: {
      grandTonnage: false,
      showroom: true,
      sav: false,
      piecesDetachees: false,
      administration: true,
      centreFormation: false,
      utilites: true,
      documents: "complet",
    },
  },
];

export function getProperty(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

export const portfolioStats = {
  total: properties.length,
  disponibles: properties.filter((p) => p.status === "Disponible").length,
  industriels: properties.filter((p) => p.kind === "Industriel").length,
  logistiques: properties.filter((p) => p.kind === "Logistique").length,
  commerciaux: properties.filter((p) => p.kind === "Commercial").length,
  enDiscussion: properties.filter((p) => p.status === "En discussion").length,
};

export function formatSurface(m2: number): string {
  return `${m2.toLocaleString("fr-FR")} m²`;
}
