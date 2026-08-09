# EMAREA Digital Intelligence — Prototype de démonstration

Objectif : une démo B2B premium, en français, qui montre à Yacine (EMAREA) non pas un site vitrine, mais l'infrastructure digitale derrière : centraliser les biens, qualifier un besoin client, faire le matching, générer un dossier client.

Fil narratif unique : une entreprise internationale de poids lourds cherche un site 3S (showroom + SAV + pièces détachées) → EMAREA structure le besoin → le système propose 3 sites du portefeuille → génération du dossier client.

## Périmètre (MVP démonstratif)

Huit écrans, tous cliquables de bout en bout, utilisables en 5 minutes :

1. **Accueil / intro démo** — « Et si chaque bien EMAREA devenait un actif digital exploitable ? » + sous-titre « Centraliser. Présenter. Qualifier. Trouver plus vite. » + 4 piliers (Gain de temps, Centralisation, Image professionnelle, Capacité commerciale) + CTA « Voir la démonstration ».
2. **Portefeuille** — 5 biens fictifs (industriel, logistique, commercial), filtres par type/wilaya/statut, compteurs en haut (total, disponibles, industriels, logistiques, en discussion), tous marqués « Démonstration ».
3. **Fiche bien (Property Intelligence)** — galerie, informations générales, localisation, surfaces, bâtiments, accès, utilités, équipements, documents, contact, statut. Score de compatibilité affiché avec la mention « Score de démonstration basé sur les critères renseignés » et le détail des critères.
4. **Besoin client** — formulaire pré-rempli avec le cas « International Heavy Truck Company » : Alger/Blida/Boumerdès, 16 000–20 000 m², accès grand tonnage, showroom, SAV, pièces détachées, administration, centre de formation, utilités, documents. CTA « Analyser les correspondances ».
5. **Matching** — 3 biens classés (92 % / 84 % / 76 %), avec le détail du « pourquoi » (+ surface compatible, + accès grand tonnage, − SAV absent). Matching déterministe, aucune prétention d'IA en fonctionnement.
6. **Générateur de dossier client** — choix FR/EN, format (présentation web / PDF / lien partageable), aperçu d'un dossier professionnel généré (hero, aperçu, localisation, spécifications, infrastructure, accès, photos, documents, contact) + CTA « Partager avec le client ».
7. **Simulateur de temps gagné** — curseurs (biens/mois, demandes/mois, minutes par dossier, minutes de recherche, minutes de questions répétitives) → temps manuel estimé vs workflow structuré vs temps potentiellement économisé, avec la mention « Simulation indicative — à calibrer avec les données réelles d'EMAREA ». Aucune projection financière.
8. **Roadmap de collaboration** — 6 phases (prototype → présentation digitale → base centralisée → CRM/besoins → matching & automatisation → workflows assistés par IA), plus le schéma d'architecture et la phrase « Le site n'est que la vitrine. La véritable valeur est dans l'infrastructure derrière. »

Reportés (à ajouter si Yacine valide) : page Avant/Après, Document Center complet, CRM/pipeline, page Vision autonome.

## Garde-fous de crédibilité

- Bandeau discret « Prototype conceptuel » et pied de page : « Les données et indicateurs présentés dans cette démonstration sont fictifs sauf indication contraire. »
- Aucune affirmation selon laquelle EMAREA utilise ce système aujourd'hui.
- Documents affichés avec le statut « Document fourni » / « Document à vérifier » et la mention « Document de démonstration — non contractuel ». Aucun document juridique réel reproduit.
- Les visuels de camions (vos images) sont regroupés dans le scénario client uniquement, étiquetés « Visualisation conceptuelle — image générée par IA ». Jamais dans la galerie d'un bien.
- Emplacements photo prêts pour vos vraies photos de biens ; en attendant, blocs neutres étiquetés, pas de fausses photos immobilières.

## Design

Premium institutionnel : fond très sombre graphite, un seul accent rouge industriel (cohérent avec vos visuels camions), typographie sobre et serrée, angles nets, aucune décoration inutile. Registre « conseil institutionnel + intelligence industrielle », pas « dashboard IA flashy ». Icônes fines pour les caractéristiques techniques (grand tonnage, hangar, administration, électricité, eau, parking, autoroute, documents, surface) — pas de photo par caractéristique.

Logo : logotype typographique « EMAREA » provisoire, isolé dans un composant pour être remplacé par votre fichier en une seule modification.

Responsive desktop / tablette / mobile, aucun bouton mort.

## Détails techniques

- Stack du projet : TanStack Start + React + TypeScript + Tailwind (et non Next.js — même architecture de composants, résultat identique).
- Une route par écran sous `src/routes/` avec métadonnées SEO propres à chaque page.
- Données de démo isolées dans `src/data/` (biens, besoins clients, documents, règles de matching) — séparées de l'UI, prêtes à être branchées plus tard sur une base de données Lovable Cloud sans réécrire les écrans.
- Matching : fonction pure de scoring pondéré par critère, testable, retournant le détail des correspondances.
- Vos 4 images de camions intégrées via le CDN d'assets ; les autres captures d'écran servent de référence uniquement.
- Pas d'authentification, pas de paiement, pas de backend pour cette démo.

## Ce dont j'ai besoin ensuite (non bloquant)

Vos photos de biens réels et le logo EMAREA : uploadez-les quand vous voulez, je les insère dans les emplacements déjà prévus.
