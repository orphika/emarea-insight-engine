# Sources des visuels EMAREA — preuve de provenance

Document obligatoire avant tout usage commercial de visuels tiers dans le prototype. Chaque
image utilisée dans `assets/` doit apparaître ici avec sa source exacte.

## 1. Logo EMAREA — OBTENU

| Champ | Valeur |
|---|---|
| Fichier local | `assets/branding/emarea-logo.png` |
| URL source directe | https://darjadida.com/agences/logo/logo_5342.png |
| Page où trouvé | https://darjadida.com/annuaire/agence-immobiliere-emarea-immo-entreprise-el-djazair-5342 (fiche annuaire "Agence Immobiliere EMAREA Immo Entreprise El-Djazair") |
| Date de récupération | 2026-08-10 |
| Contenu de l'image | Logo EMAREA : pictogramme d'immeubles stylisés rouge/orange, texte "EMAREA" en noir, sous-titre "IMMOBILIER EL-DJAZAIR" |
| Confiance | **Élevée**. Le nom de fichier (`logo_5342.png`) correspond à l'ID de fiche annuaire de cette agence précise (pas un logo générique de l'annuaire). Les deux numéros de mobile affichés sur cette fiche (0555192648 / 0661121067) correspondent exactement aux numéros +213 555 192 648 et +213 661 121 067 retrouvés indépendamment sur des posts LinkedIn signés Yassine KEDJAR / EMAREA (voir §3) — recoupement entre deux sources indépendantes. |
| Statut | Téléchargé et exploitable tel quel pour la démo. Qualité correcte (49 Ko) mais pas de version vectorielle/HD trouvée publiquement — si Yassine peut fournir un SVG ou un PNG plus grand, le remplacer. |

## 2. Photos de biens industriels EMAREA — NON OBTENUES

**Aucune photo réelle de bien EMAREA n'a pu être téléchargée.** Détail des blocages :

- **Page Facebook** (https://www.facebook.com/EMAREAImmoDZ/, page "Emarea", El Biar, ~520
  mentions J'aime) : confirmée comme la page officielle. Contient très probablement des
  photos d'annonces (façades, hangars, bureaux) vu l'activité de l'agence, mais Facebook sert
  une page d'erreur ("Facebook n'est pas disponible sur ce navigateur") à tout client HTTP non
  authentifié / sans JavaScript complet — y compris la version `m.facebook.com`. Impossible de
  lister ou télécharger les photos sans connexion à un compte Facebook.
  - Post repéré mais non exploitable : https://m.facebook.com/EMAREAImmoDZ/photos/a.2055261981380522/2941843212722390/
    (annonce de location d'un immeuble de bureaux à Hydra, Alger — pas un bien industriel).
  - Seconde page trouvée : https://www.facebook.com/EmareaElDjazair/ ("Emarea Immobilier
    El-Djazair") — même blocage technique.

- **LinkedIn** — trois posts publics identifiés avec des annonces industrielles détaillées et
  cohérentes avec l'activité décrite (surfaces, hangars, accès poids lourds), mais LinkedIn ne
  sert que le texte du post en accès non authentifié ; les photos jointes sont chargées en
  JavaScript et absentes du HTML accessible sans connexion :
  - https://www.linkedin.com/posts/amira-kedjar-a72771151_emareaimmobilierentreprise-emareaimmobiliercommercial-activity-6886270803902574592-CBQX
    — complexe mixte 11 000 m² terrain / 4 650 m² bâti, Oued Semmar, Alger (showroom 700 m²,
    bureaux 750 m², atelier 2 700 m²).
  - https://www.linkedin.com/posts/amira-kedjar-a72771151_zoned%C3%A9p%C3%B4ptstockage-b%C3%A9nitamou-blida-activity-6980461220948561920-9u3a
    — hangar de stockage neuf, Béni Tamou, Blida, 3 600 m² dont 2 900 m² bâti.
  - https://www.linkedin.com/posts/yassinekedjar_alger-boumerdes-blida-activity-7005871839809794048-fiPn
    — recherche de site industriel (Alger/Boumerdès/Blida/Tipaza) pour un client pharmaceutique.
  - Profil du directeur : https://www.linkedin.com/in/yassinekedjar/ (non accessible sans
    connexion — retourne une erreur serveur).

- **Ouedkniss** — la conversation ChatGPT collée dans le README affirme avoir retrouvé une
  annonce EMAREA à Tipaza (15 ha, hangars 20 000 m²). Recherche refaite indépendamment : je
  n'ai pas pu retrouver ni confirmer cette annonce précise (Ouedkniss est une application
  JavaScript, aucun contenu de liste n'est accessible sans navigateur complet). **Cette annonce
  Tipaza ne doit pas être considérée comme confirmée** tant qu'elle n'a pas été revue par
  Sofiane directement sur ouedkniss.com.

- **Annuaires (darjadida.com, rhinotenders.com)** : fiches d'agence uniquement (coordonnées,
  logo pour darjadida), aucune photo de bien associée.

### Cause technique du blocage
L'outil WebFetch disponible dans cette session convertit le HTML en texte/markdown et ne
peut pas déclencher le JavaScript qui charge les photos sur Facebook/LinkedIn/Ouedkniss —
ces plateformes affichent une page d'erreur ou un contenu vide aux clients non-navigateur.
L'extension Chrome (`claude-in-chrome`) qui aurait permis une navigation réelle n'était pas
connectée dans cet environnement (message : "Browser extension is not connected").

### Ce que Sofiane doit faire pour compléter (5-10 minutes, avec son propre compte)
1. Ouvrir https://www.facebook.com/EMAREAImmoDZ/ dans son navigateur (connecté ou non), aller
   dans l'onglet Photos, identifier 6-10 photos d'un même bien industriel (façade, hangars,
   bureaux, accès poids lourds, vue aérienne si dispo) et les enregistrer (clic droit >
   Enregistrer l'image, ou capture d'écran haute résolution).
2. Faire la même chose sur https://www.facebook.com/EmareaElDjazair/ si la première page est
   pauvre en photos.
3. Vérifier l'annonce Ouedkniss Tipaza mentionnée dans le brief ChatGPT (recherche
   "EMAREA" ou "Cabinet EMAREA" sur ouedkniss.com, filtrer Tipaza/immobilier) — si elle existe
   encore, elle est probablement le meilleur candidat (bien réel + caractéristiques déjà
   alignées avec le scénario 3S poids lourds du prototype).
4. Déposer les fichiers récupérés dans `assets/property-01/` (et `assets/property-02/` pour un
   second bien) en les nommant selon leur contenu réel (`facade.jpg`, `hangar-01.jpg`,
   `bureaux.jpg`, `acces-pl.jpg`, `vue-aerienne.jpg` — adapter, ne pas forcer un nom qui ne
   correspond pas à la photo).
5. Compléter ce fichier SOURCES.md avec l'URL du post Facebook/LinkedIn exact d'où vient
   chaque photo, avant de les référencer dans le code.

## 3. Recoupements utiles (texte, pas image)

- Emails confirmés : `info.emarea@gmail.com`, `ak.emarea@gmail.com`
- Téléphones confirmés (recoupés annuaire + LinkedIn) : `+213 555 192 648`, `+213 661 121 067`,
  `+213 558 733 797` (ce dernier propre à Amira KEDJAR)
- Adresse agence : Boulevard 11 décembre, Lot 42 B, Val d'Hydra, El-Biar, Alger
- Contact commercial identifié : Amira KEDJAR (consultante EMAREA)
- Page LinkedIn personnelle du directeur : https://www.linkedin.com/in/yassinekedjar/
  (30 200+ abonnés au moment des posts consultés)

## 4. Comment brancher le logo (non fait ici — à valider avant de coder)

Constaté en lisant le code :

- `src/components/emarea/logo.tsx` est un logo typographique (texte "EMAREA" + séparateur),
  avec un commentaire explicite : *"Remplacer ici par le fichier logo EMAREA (SVG/PNG) le jour
  où il est fourni."* Le fichier est prêt à recevoir une image.
- Le projet importe ses images comme `import truckFleet from "@/assets/truck-fleet.jpg.asset.json"`
  — c'est la convention **Lovable** : le binaire réel vit sur l'infra R2 de Lovable, le fichier
  `.asset.json` dans `src/assets/` n'est qu'un pointeur (voir `src/assets/truck-fleet.jpg.asset.json`).
  Un PNG classique déposé directement dans `src/assets/` et importé nature (`import logo from
  "@/assets/emarea-logo.png"`) fonctionnera aussi en local (Vite gère l'import d'image standard),
  mais il ne bénéficiera pas de la synchronisation Lovable tant qu'il n'aura pas été re-uploadé
  depuis l'éditeur Lovable — donc si Sofiane continue à éditer ce projet dans Lovable.dev après
  le prototype, il vaut mieux qu'il glisse le PNG directement dans l'éditeur Lovable pour que le
  pipeline `.asset.json` le prenne en charge, plutôt que de committer le fichier brut par git.
- `assets/branding/emarea-logo.png` (téléchargé par cette tâche) est donc volontairement resté
  **hors de `src/`** : c'est un dossier de sourcing/preuve, pas un dossier servi par l'app.
  Étape suivante quand Sofiane valide l'image : copier ou re-uploader ce PNG dans
  `src/assets/`, puis dans `logo.tsx` remplacer le `<span>` texte par `<img src={logo}
  alt="EMAREA" className="h-8 w-auto" />` (garder le sous-titre "Digital Intelligence" à côté
  si le logo seul ne le contient pas).

## 5. Comment brancher des photos de biens (une fois obtenues)

- `src/data/properties.ts` n'a aujourd'hui aucun champ image — uniquement `mediaPhotos: number`
  (juste un compteur pour l'affichage, ex. `mediaPhotos: 24`). Ajouter un champ `photos?:
  string[]` (chemins ou imports d'images) à l'interface `Property`, rempli uniquement pour le
  bien qui aura de vraies photos (les 4 autres biens démo restent sans `photos` — pas de
  substitution par du générique).
- Le composant qui affiche la fiche bien (à identifier dans `src/routes/` — non exploré en
  détail dans cette tâche, prévoir un passage dédié) devra afficher une galerie si `photos` est
  renseigné, sinon garder le comportement actuel (probablement un simple compteur ou un
  placeholder).

## 6. Photos réelles — bien "site-3s-boumerdes" — OBTENUES (2026-08-11)

| Champ | Valeur |
|---|---|
| Fichiers locaux | `assets/property-01/final/01-cour-camions-gares.jpg` à `07-entrepot-rayonnage.jpg` (7 fichiers) |
| Origine | Envoyées par Sofiane via WhatsApp (fichiers bruts dans `assets/property-01/extracted/`, versions rognées dans `assets/property-01/cropped/`, versions finales nommées dans `assets/property-01/final/`) |
| Nature | Photographies réelles d'un site industriel poids lourds (cour avec camions garés, showrooms Mack/MAN, quai de chargement, entrepôt intérieur) |
| Confiance | Élevée — photos réelles fournies directement par le client, pas de recherche web |
| Statut | Branchées dans `src/data/properties.ts` (champ `photos`) sur le bien `site-3s-boumerdes` uniquement — cohérent avec la fiche existante (showroom, atelier SAV poids lourds). Les 4 autres biens de démonstration restent sans photo réelle. |

## 7. Vidéo drone hero — illustration générée — OBTENUE (2026-08-11)

| Champ | Valeur |
|---|---|
| Fichier local | `assets/property-01/hero-drone-entrepot.mp4` |
| Origine | Générée par le client via Google Flow (IA générative vidéo) — survol drone d'un entrepôt logistique |
| Nature | **Illustration générée, pas un tournage réel d'un site EMAREA** |
| Usage | Fond vidéo de la section hero de la page d'accueil (`src/components/emarea/hero-scrub.tsx`), avec effet de scroll-scrub GSAP ScrollTrigger |
| Étiquetage obligatoire | Badge visible sur la page ("Vidéo — illustration générée, non tournée sur un site EMAREA") — voir `.hero-scrub-illustration-badge` dans `hero-scrub.tsx`. Ne jamais retirer ce badge ni présenter cette vidéo comme un tournage réel. |

## Règle de non-invention (rappel)

Aucune image de bien EMAREA n'a été inventée, générée par IA, ni substituée par une image
générique dans les fiches biens. Les 7 photos du §6 sont réelles (fournies par le client) ; la
vidéo drone du §7 est une illustration générée et reste étiquetée comme telle partout où elle
apparaît. `assets/property-02/` reste vide tant que Sofiane n'y a pas déposé de vraies photos
d'un second bien avec leur source documentée ci-dessus. Le composant logo
(`src/components/emarea/logo.tsx`) reste sur son texte typographique tant que le logo n'est
pas branché (voir section suivante).
