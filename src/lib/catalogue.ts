// Catalogue des services — contenu issu du document « CatalogueMultiSphere_Agency.docx ».
// Les tarifs sont des propositions internes indicatives à valider par l'équipe :
// ils ne constituent pas des tarifs officiellement établis.

export const catalogueIntro = {
  badge: 'Catalogue des services',
  title: 'Nos prestations et nos',
  titleAccent: 'tarifs indicatifs',
  description:
    "MultiSphere Agency accompagne les entreprises et les entrepreneurs qui démarrent ou développent leur activité. Cinq expertises complémentaires en communication, stratégie, développement et cybersécurité pour construire des solutions adaptées à chaque projet.",
  disclaimer:
    "Les tarifs présentés sont des propositions indicatives. Le prix final est confirmé dans le devis selon le périmètre, la charge de travail et la complexité du projet.",
}

export type CatalogueRate = {
  service: string
  from: string
}

export type CataloguePole = {
  id: string
  number: string
  title: string
  shortTitle: string
  icon: string
  lead: string
  leadLabel: string
  intro: string
  services: string[]
  rates: CatalogueRate[]
  note?: string
}

export const cataloguePoles: CataloguePole[] = [
  {
    id: 'communication',
    number: '01',
    title: 'Communication & Identité Visuelle',
    shortTitle: 'Communication',
    icon: 'Megaphone',
    lead: 'Maureen SOTOHOU',
    leadLabel: 'Responsable',
    intro:
      "Nous accompagnons les marques dans la construction de leur image et le développement de leur présence digitale.",
    services: [
      'Stratégie de communication digitale',
      'Audit de présence digitale',
      'Identité visuelle',
      'Charte graphique',
      'Création de contenus',
      'Community management',
      'Copywriting et rédaction web',
      'Storytelling',
      'Calendrier éditorial',
      'Affiches et supports digitaux',
      'Personal branding',
      'Campagnes Meta Ads',
    ],
    rates: [
      { service: 'Audit digital', from: '50 000 FCFA' },
      { service: 'Stratégie de communication', from: '100 000 FCFA' },
      { service: 'Identité visuelle', from: '100 000 FCFA' },
      { service: 'Charte graphique', from: '75 000 FCFA' },
      { service: 'Création de contenu', from: '15 000 FCFA' },
      { service: 'Copywriting', from: '10 000 FCFA' },
      { service: 'Calendrier éditorial', from: '40 000 FCFA' },
      { service: 'Community management', from: '100 000 FCFA/mois' },
      { service: 'Meta Ads', from: '75 000 FCFA/campagne' },
      { service: 'Personal branding', from: '100 000 FCFA' },
    ],
  },
  {
    id: 'developpement',
    number: '02',
    title: 'Développement & Solutions Digitales',
    shortTitle: 'Développement',
    icon: 'Code2',
    lead: 'Armel BOSSOUKPO',
    leadLabel: 'Responsable',
    intro:
      "Nous concevons des solutions digitales adaptées aux besoins des entreprises et organisations.",
    services: [
      'Landing pages',
      'Sites vitrines',
      'Sites institutionnels',
      'Sites e-commerce',
      'Applications web',
      'UI/UX',
      'Intégration de solutions de paiement',
      'Développement front-end et back-end',
      'Bases de données',
      "Systèmes d'authentification",
      'Déploiement',
      'Maintenance et correction de bugs',
    ],
    rates: [
      { service: 'Landing page', from: '150 000 FCFA' },
      { service: 'Site vitrine', from: '250 000 FCFA' },
      { service: 'Site vitrine professionnel', from: '400 000 FCFA' },
      { service: 'Site institutionnel', from: '700 000 FCFA' },
      { service: 'Site e-commerce', from: '700 000 FCFA' },
      { service: 'UI/UX', from: '150 000 FCFA' },
      { service: 'Intégration paiement', from: '100 000 FCFA' },
      { service: 'Application web', from: '2 000 000 FCFA' },
      { service: 'Maintenance', from: '50 000 FCFA/mois' },
    ],
    note: 'Projets complexes : sur devis.',
  },
  {
    id: 'cybersecurite',
    number: '03',
    title: 'Réseaux & Cybersécurité',
    shortTitle: 'Cybersécurité',
    icon: 'ShieldCheck',
    lead: 'Daziano TOGBEDJI',
    leadLabel: 'Responsable',
    intro:
      "Nous aidons les entreprises à protéger leurs systèmes, réseaux, sites et accès numériques.",
    services: [
      'Audit de sécurité',
      'Audit de sécurité web',
      'Sécurisation de sites',
      'Sécurisation des comptes et appareils',
      "Tests d'intrusion autorisés",
      'Configuration et sécurisation des réseaux',
      'Installation et configuration Linux',
      'Diagnostic informatique',
      'Maintenance et assistance technique',
      'Protection des données et des accès',
    ],
    rates: [
      { service: 'Diagnostic informatique', from: '15 000 FCFA' },
      { service: 'Installation/configuration système', from: '20 000 FCFA' },
      { service: 'Optimisation ordinateur', from: '20 000 FCFA' },
      { service: 'Configuration smartphone', from: '10 000 FCFA' },
      { service: 'Diagnostic de sécurité', from: '50 000 FCFA' },
      { service: 'Audit de sécurité web', from: '150 000 FCFA' },
      { service: "Sécurisation d'un site", from: '100 000 FCFA' },
      { service: "Test d'intrusion autorisé", from: '250 000 FCFA' },
      { service: 'Sécurisation compte/appareil', from: '30 000 FCFA' },
    ],
    note: 'Missions complexes : sur devis.',
  },
  {
    id: 'business',
    number: '04',
    title: 'Business, Stratégie & Gestion de Projet',
    shortTitle: 'Business',
    icon: 'Briefcase',
    lead: 'Noah SOGLO',
    leadLabel: 'Direction',
    intro:
      "Nous accompagnons les entrepreneurs et organisations dans la structuration, le développement et le pilotage de leurs projets.",
    services: [
      'Étude de marché',
      'Analyse concurrentielle',
      'Business Model Canvas',
      'Business plan',
      'Structuration de projet',
      'Stratégie commerciale',
      'Stratégie marketing',
      'Prospection commerciale',
      'Développement de partenariats',
      'Pitch deck',
      'Gestion de projet',
      'Conseil en entrepreneuriat',
      'Accompagnement au développement',
    ],
    rates: [
      { service: 'Étude de marché', from: '150 000 FCFA' },
      { service: 'Analyse concurrentielle', from: '75 000 FCFA' },
      { service: 'Business Model Canvas', from: '50 000 FCFA' },
      { service: 'Business plan', from: '150 000 FCFA' },
      { service: 'Structuration de projet', from: '100 000 FCFA' },
      { service: 'Stratégie commerciale', from: '100 000 FCFA' },
      { service: 'Plan de prospection', from: '75 000 FCFA' },
      { service: 'Pitch deck', from: '75 000 FCFA' },
      { service: 'Dossier de partenariat', from: '75 000 FCFA' },
      { service: 'Conseil entrepreneurial', from: '75 000 FCFA' },
    ],
  },
  {
    id: 'assistance',
    number: '05',
    title: 'Assistance informatique, Systèmes & Solutions Web',
    shortTitle: 'Assistance',
    icon: 'Wrench',
    lead: 'Bachar TOURE',
    leadLabel: 'Responsable',
    intro: 'Prestations informatiques et web.',
    services: [
      'Diagnostic & dépannage informatique : résolution de problèmes logiciels sur PC, Mac et smartphones (Android/iOS).',
      "Systèmes d'exploitation : installation, configuration et optimisation (Windows, macOS, Linux/Kali Linux).",
      'Création de sites vitrines & boutiques e-commerce : design premium, responsive, avec intégration des moyens de paiement locaux et tunnels de commande optimisés.',
      'Sécurisation web : développement de sites avec application directe des bonnes pratiques de sécurité.',
    ],
    rates: [
      { service: 'Diagnostic & dépannage informatique', from: '15 000 FCFA' },
      { service: 'Installation, configuration et optimisation des systèmes', from: '20 000 FCFA' },
      { service: 'Site vitrine premium responsive', from: '400 000 FCFA' },
      { service: 'Boutique e-commerce avec paiement et tunnel de commande', from: '800 000 FCFA' },
      { service: 'Sécurisation web', from: '100 000 FCFA' },
    ],
  },
]

export type CataloguePack = {
  id: string
  name: string
  icon: string
  goal: string
  prestations: string[]
  livrables: string[]
  range: string
  highlighted?: boolean
}

export const cataloguePacks: CataloguePack[] = [
  {
    id: 'lancement',
    name: 'Pack Lancement Digital',
    icon: 'Rocket',
    goal: "Accompagner les entrepreneurs qui souhaitent créer des bases solides pour leur activité et leur présence numérique.",
    prestations: [
      'Diagnostic du projet et définition de la stratégie commerciale.',
      'Cadrage administratif et financier.',
      "Création de l'identité visuelle de base.",
      'Mise en place des premiers canaux numériques.',
      'Configuration des outils numériques et sécurisation de base.',
    ],
    livrables: [
      "Mini-plan d'action.",
      'Logo.',
      'Charte graphique simplifiée.',
      'Page professionnelle.',
      'Checklist de sécurité.',
    ],
    range: '100 000 à 300 000 FCFA',
  },
  {
    id: 'croissance',
    name: 'Pack Croissance Digitale',
    icon: 'TrendingUp',
    goal: "Aider les entreprises déjà actives à améliorer leur visibilité, leur image et leur capacité à attirer des clients.",
    prestations: [
      "Élaboration d'une stratégie de communication.",
      "Création d'un calendrier éditorial et de contenus.",
      "Conception ou amélioration d'un site vitrine.",
      "Optimisation de l'expérience utilisateur.",
      'Audit de sécurité et recommandations techniques.',
      'Suivi des indicateurs de performance et plan de croissance.',
    ],
    livrables: [
      'Stratégie de communication.',
      'Calendrier éditorial.',
      'Contenus définis au contrat.',
      'Site vitrine.',
      'Rapport de recommandations.',
    ],
    range: '200 000 à 500 000 FCFA',
    highlighted: true,
  },
  {
    id: 'ecommerce',
    name: 'Pack E-commerce Sécurisé',
    icon: 'ShoppingCart',
    goal: "Accompagner les entreprises qui veulent lancer une boutique en ligne fiable ou améliorer leur dispositif de vente numérique.",
    prestations: [
      'Définition de la stratégie commerciale et du catalogue.',
      "Création ou harmonisation de l'identité de marque.",
      'Conception de la boutique et du parcours de commande.',
      'Intégration des moyens de paiement compatibles.',
      'Configuration de la sécurité et des accès.',
      'Mise en place d’outils de suivi administratif et financier.',
    ],
    livrables: [
      'Boutique fonctionnelle.',
      'Fiches produits selon un volume convenu.',
      'Parcours de commande testé.',
      "Documentation d'utilisation.",
      'Tableau de suivi des ventes.',
    ],
    range: '400 000 à 600 000 FCFA',
  },
]

export const packsIntro =
  "Chaque offre mobilise collectivement les cinq membres de MultiSphere Agency. Les prestations et livrables effectivement retenus, ainsi que leurs volumes, sont confirmés dans le devis avant le démarrage."

export const commercialTerms = [
  {
    point: 'Périmètre et livrables',
    condition:
      "Le devis fixe les livrables retenus, leurs volumes (contenus, pages ou fiches produits), les formats, les délais et les conditions de réception. Toute demande hors périmètre fait l'objet d'un devis complémentaire avant réalisation.",
  },
  {
    point: 'Tarifs',
    condition:
      "Les fourchettes affichées sont indicatives. Le prix final est confirmé dans le devis selon le périmètre, la charge de travail et la complexité du projet.",
  },
  {
    point: 'Devis',
    condition: "Les projets complexes font l'objet d'un devis personnalisé.",
  },
  {
    point: 'Acompte',
    condition: 'Un acompte est demandé avant le démarrage du projet.',
  },
  {
    point: 'Corrections',
    condition:
      "Le nombre de séries de corrections incluses est précisé dans le devis ou le contrat.",
  },
  {
    point: 'Frais externes',
    condition:
      "Les frais liés à l'hébergement, aux noms de domaine, aux outils, aux services tiers ou autres dépenses nécessaires peuvent être facturés séparément.",
  },
  {
    point: 'Publicité',
    condition:
      "Le budget publicitaire destiné à Meta ou à toute autre plateforme n'est pas inclus dans les frais de gestion de campagne.",
  },
]
