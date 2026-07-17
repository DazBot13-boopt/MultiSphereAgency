// Centralised site configuration & content for MultiSphere Agency

export const siteConfig = {
  name: "MultiSphere Agency",
  tagline: "L'union des expertises, la force de vos projets.",
  description:
    "Agence pluridisciplinaire à Abomey-Calavi, Bénin. Événementiel, communication digitale, développement web & mobile, cybersécurité et gestion administrative. Un interlocuteur unique pour piloter vos projets à 360°.",
  phone: "+229 01 63 91 88 96",
  phoneHref: "tel:+2290163918896",
  whatsappHref:
    "https://wa.me/2290163918896?text=Bonjour%20MultiSphere%20Agency%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20services.",
  email: "multisphere.agency@gmail.com",
  address: "Abomey-Calavi, Bénin",
  social: {
    facebook: "https://www.facebook.com/people/Multisphere-Agency/61592002491375/",
    instagram: "https://www.instagram.com/multisphere.agency",
    linkedin: "https://www.linkedin.com/in/multisphere-agency-a62980420/",
    tiktok: "https://www.tiktok.com/@multisphere.agenc",
    whatsapp:
      "https://wa.me/2290163918896?text=Bonjour%20MultiSphere%20Agency%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20services.",
  },
}

export const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#a-propos" },
  { label: "Services", href: "#services" },
  { label: "Pourquoi nous", href: "#pourquoi-nous" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Assistant", href: "#assistant" },
  { label: "Témoignages", href: "#temoignages" },
  { label: "Contact", href: "#contact" },
]

export const services = [
  {
    id: "evenementiel",
    title: "Événementiel",
    icon: "PartyPopper",
    image: "/images/service-event.png",
    short: "Conception, organisation et pilotage d'événements d'entreprise sur mesure.",
    description:
      "De l'idée au bilan, nous concevons et orchestrons des événements mémorables qui font rayonner votre marque.",
    features: [
      "Conception et organisation complète (lancements, conférences, séminaires, cérémonies)",
      "Planification, pilotage et suivi de projets (planning, budget, jalons, reporting)",
      "Coordination des prestataires et des équipes le jour J",
      "Gestion des invitations, inscriptions et accueil des participants",
      "Bilan post-événement : rapport, indicateurs et recommandations",
    ],
  },
  {
    id: "communication",
    title: "Communication & Marketing Digital",
    icon: "Megaphone",
    image: "/images/service-marketing.png",
    short: "Faire rayonner votre marque, en ligne et hors ligne.",
    description:
      "Une stratégie de communication créative et data-driven pour construire une marque forte et engagée.",
    features: [
      "Stratégie de communication digitale et plan de contenu",
      "Création et gestion des réseaux sociaux (community management)",
      "Identité visuelle & branding : logo, charte graphique, supports print et digitaux",
      "Création de contenus : visuels, affiches, vidéos, newsletters",
      "Campagnes publicitaires en ligne (sponsoring, ciblage, suivi des résultats)",
      "Couverture digitale d'événements (live, photos, aftermovie)",
    ],
  },
  {
    id: "developpement",
    title: "Développement Web & Mobile",
    icon: "Code2",
    image: "/images/service-dev.png",
    short: "Des solutions numériques modernes, performantes et sur mesure.",
    description:
      "Sites, applications et plateformes conçus avec les technologies les plus modernes pour une expérience utilisateur irréprochable.",
    features: [
      "Sites vitrines et sites e-commerce modernes et responsives",
      "Applications web et mobiles sur mesure",
      "Plateformes événementielles : billetterie, inscription en ligne, badges QR",
      "Outils de gestion interne (facturation, suivi client, tableaux de bord)",
      "Maintenance, hébergement et évolution des solutions livrées",
    ],
  },
  {
    id: "cybersecurite",
    title: "Cybersécurité",
    icon: "ShieldCheck",
    image: "/images/service-security.png",
    short: "Protéger vos données, vos plateformes et vos événements numériques.",
    description:
      "Nous sécurisons vos actifs numériques avec une approche préventive et réactive, en conformité avec les bonnes pratiques.",
    features: [
      "Audit de sécurité des sites, applications et systèmes",
      "Sécurisation des plateformes développées (chiffrement, sauvegardes)",
      "Protection des données clients et conformité",
      "Sensibilisation et formation des équipes aux risques numériques",
      "Sécurisation des événements digitaux (visioconférences, plateformes d'inscription)",
    ],
  },
  {
    id: "gestion",
    title: "Gestion Administrative & Financière",
    icon: "ClipboardList",
    image: "/images/service-admin.png",
    short: "Piloter vos projets avec rigueur, du devis au reporting.",
    description:
      "Une gestion transparente et rigoureuse qui vous donne une vision claire de vos budgets et de votre rentabilité.",
    features: [
      "Élaboration de devis et facturation professionnelle",
      "Suivi budgétaire des projets et des événements",
      "Gestion des contrats clients et prestataires",
      "Reporting financier par projet",
    ],
  },
]

export const stats = [
  { value: 90, suffix: "+", label: "Clients satisfaits" },
  { value: 100, suffix: "+", label: "Projets réalisés" },
  { value: 5, suffix: "", label: "Expertises réunies" },
  { value: 24, suffix: "h", label: "Délai de réponse" },
]

export const whyChooseUs = [
  {
    icon: "Layers",
    title: "Multi-expertises",
    description:
      "5 pôles d'expertise complémentaires, un seul interlocuteur pour piloter l'ensemble de votre projet.",
  },
  {
    icon: "Award",
    title: "Qualité reconnue",
    description:
      "Une exigence de résultat, une créativité affirmée et une rigueur de livraison à chaque étape.",
  },
  {
    icon: "Users",
    title: "Équipe professionnelle",
    description:
      "Des experts passionnés dans chaque domaine, mobilisés autour de vos objectifs.",
  },
  {
    icon: "Headset",
    title: "Support réactif",
    description:
      "Nous restons disponibles et à l'écoute, pour vous accompagner avant, pendant et après le projet.",
  },
  {
    icon: "Wallet",
    title: "Tarifs justes",
    description:
      "Une tarification transparente et compétitive, alignée sur la valeur réellement livrée.",
  },
  {
    icon: "Compass",
    title: "Approche 360°",
    description:
      "Une vision globale de votre projet, de la stratégie à la livraison, sans angle mort.",
  },
]

export const processSteps = [
  {
    number: "01",
    title: "Discovery & Stratégie",
    description:
      "Nous écoutons vos besoins, analysons vos objectifs et définissons ensemble une stratégie claire et mesurable.",
    icon: "Search",
  },
  {
    number: "02",
    title: "Conception & Design",
    description:
      "Nos experts élaborent les livrables créatifs et techniques : maquettes, architecture, plan d'action.",
    icon: "PenTool",
  },
  {
    number: "03",
    title: "Développement & Exécution",
    description:
      "Nous donnons vie au projet avec rigueur, en respectant les délais et en vous tenant informé à chaque étape.",
    icon: "Rocket",
  },
  {
    number: "04",
    title: "Livraison & Suivi",
    description:
      "Nous livrons, mesurons les résultats et restons à vos côtés pour faire évoluer votre projet dans le temps.",
    icon: "TrendingUp",
  },
]

export const portfolio = [
  {
    title: "Festival des Innovations",
    category: "Événementiel",
    description: "Organisation complète d'un festival tech rassemblant 500+ participants.",
    image: "/images/portfolio-festival.png",
    tags: ["Pilotage", "Logistique", "Couverture"],
  },
  {
    title: "Refonte de marque",
    category: "Communication",
    description: "Identité visuelle et stratégie digitale pour une PME en pleine croissance.",
    image: "/images/portfolio-branding.png",
    tags: ["Branding", "Social Media", "Content"],
  },
  {
    title: "Plateforme e-commerce",
    category: "Développement",
    description: "Boutique en ligne performante avec gestion des stocks et paiement mobile.",
    image: "/images/portfolio-ecommerce.png",
    tags: ["Web", "Mobile Money", "Dashboard"],
  },
  {
    title: "Audit de sécurité",
    category: "Cybersécurité",
    description: "Sécurisation complète d'une plateforme financière et formation des équipes.",
    image: "/images/portfolio-security.png",
    tags: ["Audit", "Pentest", "Formation"],
  },
  {
    title: "Gestion financière 360°",
    category: "Gestion",
    description: "Pilotage budgétaire et reporting pour un portefeuille de 12 projets.",
    image: "/images/portfolio-finance.png",
    tags: ["Devis", "Reporting", "Contrats"],
  },
  {
    title: "Lancement produit",
    category: "Événementiel",
    description: "Événement de lancement combinant présentiel et live streaming.",
    image: "/images/portfolio-launch.png",
    tags: ["Hybride", "Streaming", "Aftermovie"],
  },
]

export const testimonials = [
  {
    name: "Aïcha Bello",
    role: "Directrice Générale, BelloCom",
    content:
      "MultiSphere Agency a transformé notre vision en un événement mémorable. Professionnalisme, réactivité et créativité — tout était au rendez-vous.",
    rating: 5,
    initials: "AB",
  },
  {
    name: "Koffi Mensah",
    role: "Fondateur, TechBénin",
    content:
      "Notre plateforme e-commerce a été livrée dans les délais, avec une qualité technique irréprochable. L'équipe est véritablement partenaire de notre croissance.",
    rating: 5,
    initials: "KM",
  },
  {
    name: "Mariam Touré",
    role: "Responsable Marketing, NordSud",
    content:
      "Une approche 360° qui nous a fait gagner un temps précieux. Un seul interlocuteur pour la com, le dev et l'événementiel — bluffant.",
    rating: 5,
    initials: "MT",
  },
  {
    name: "David Hounsa",
    role: "CEO, FinancePlus",
    content:
      "L'audit de cybersécurité a révélé des failles que nous ignorions. La mise en place des correctifs et la formation ont été exemplaires.",
    rating: 5,
    initials: "DH",
  },
  {
    name: "Fatima Issa",
    role: "Gérante, Élégance Events",
    content:
      "Le suivi administratif et financier nous a apporté une visibilité totale sur nos projets. Du devis au reporting, tout est carré.",
    rating: 5,
    initials: "FI",
  },
]

export const team = [
  {
    name: "Klingo SOGLO",
    role: "Directeur de projet",
    initials: "KS",
    image: "/images/team/klingo-soglo.png",
    bio: "Visionnaire et stratège, il pilote la vision 360° de l'agence et veille à l'excellence de chaque mission.",
    skills: ["Stratégie", "Pilotage 360°", "Leadership"],
    social: {
      linkedin: "https://www.linkedin.com/in/multisphere-agency-a62980420/",
      email: "multisphere.agency@gmail.com",
    },
  },
  {
    name: "Maureen SOTOHOU",
    role: "Directrice Communication & Marketing",
    initials: "MS",
    image: "/images/team/maureen-sotohou.png",
    bio: "Créative obsessionnelle, elle donne vie aux marques les plus exigeantes et fédère des communautés engagées.",
    skills: ["Branding", "Storytelling", "Social Media"],
    social: {
      linkedin: "https://www.linkedin.com/in/multisphere-agency-a62980420/",
      email: "multisphere.agency@gmail.com",
    },
  },
  {
    name: "Daziano TOGBEDJI",
    role: "Lead Développement & Cybersécurité",
    initials: "DT",
    image: "/images/team/daziano-togbedji.png",
    bio: "Architecte technique passionné par les solutions robustes, performantes et sécurisées.",
    skills: ["Next.js", "Audit sécurité", "Architecture"],
    social: {
      linkedin: "https://www.linkedin.com/in/multisphere-agency-a62980420/",
      email: "multisphere.agency@gmail.com",
    },
  },
  {
    name: "Armel BOSSOUKPO",
    role: "Responsable Développement web",
    initials: "AB",
    image: "/images/team/armel-bossoukpo.png",
    bio: "Développeur passionné, il transforme vos idées en applications web modernes, rapides et intuitives.",
    skills: ["React", "Node.js", "UX/UI"],
    social: {
      linkedin: "https://www.linkedin.com/in/multisphere-agency-a62980420/",
      email: "multisphere.agency@gmail.com",
    },
  },
  {
    name: "Bacharou TOURE",
    role: "Responsable Gestion Administrative & Financière",
    initials: "BT",
    image: "/images/team/bacharou-toure.png",
    bio: "Rigoureux et transparent, il pilote budgets, devis et reporting pour une visibilité totale sur vos projets.",
    skills: ["Reporting", "Devis", "Contrats"],
    social: {
      linkedin: "https://www.linkedin.com/in/multisphere-agency-a62980420/",
      email: "multisphere.agency@gmail.com",
    },
  },
]

export const faqs = [
  {
    question: "Quels types de projets MultiSphere Agency accompagne-t-elle ?",
    answer:
      "Nous accompagnons tout type de projet nécessitant une ou plusieurs de nos expertises : événementiel, communication digitale, développement web/mobile, cybersécurité et gestion administrative. Notre force est de pouvoir piloter l'ensemble sous un seul toit.",
  },
  {
    question: "Combien de temps pour obtenir un devis ?",
    answer:
      "Nous nous engageons à répondre sous 24 heures à toute demande de devis. Après un premier échange pour cerner vos besoins, nous vous transmettons une proposition détaillée et transparente.",
  },
  {
    question: "Travaillez-vous avec des clients hors du Bénin ?",
    answer:
      "Oui. Bien que basés à Abomey-Calavi, nous accompagnons des clients dans toute la sous-région ouest-africaine et travaillons à distance pour de nombreux projets digitaux.",
  },
  {
    question: "Comment se déroule la collaboration ?",
    answer:
      "Un interlocuteur dédié vous accompagne du début à la fin. Nous définissons ensemble un planning, des jalons et un reporting clair. Vous gardez à tout moment la visibilité sur l'avancement du projet.",
  },
  {
    question: "Proposez-vous de la maintenance après la livraison ?",
    answer:
      "Absolument. Nous proposons des contrats de maintenance, d'hébergement et d'évolution pour les solutions web et mobiles que nous livrons, afin de garantir leur pérennité.",
  },
  {
    question: "Quels sont vos moyens de paiement ?",
    answer:
      "Nous acceptons les virements bancaires, les mobile money et les espèces. Les conditions de paiement sont définies ensemble et détaillées dans le devis.",
  },
]

export const partners = [
  "BelloCom",
  "TechBénin",
  "NordSud",
  "FinancePlus",
  "Élégance Events",
  "AgriPro",
  "MediCare+",
  "EduNova",
]

export const blogPosts = [
  {
    id: "evenementiel-hybride",
    title: "L'événementiel hybride : le futur des événements d'entreprise",
    excerpt:
      "Présentiel + distanciel : comment combiner le meilleur des deux mondes pour des événements qui rassemblent et engagent.",
    category: "Événementiel",
    readTime: "5 min",
    date: "2025-06-12",
    color: "from-rose-500/20 to-orange-500/20",
    icon: "PartyPopper",
  },
  {
    id: "marketing-digital-2025",
    title: "Marketing digital en 2025 : 5 tendances à ne pas manquer",
    excerpt:
      "IA générative, vidéo courte, social commerce… Découvrez les leviers qui vont transformer votre stratégie cette année.",
    category: "Communication",
    readTime: "7 min",
    date: "2025-06-05",
    color: "from-blue-500/20 to-cyan-500/20",
    icon: "Megaphone",
  },
  {
    id: "securite-pme",
    title: "Cybersécurité pour les PME : par où commencer ?",
    excerpt:
      "80 % des cyberattaques ciblent les petites structures. Voici un plan d'action concret pour protéger votre entreprise.",
    category: "Cybersécurité",
    readTime: "6 min",
    date: "2025-05-28",
    color: "from-emerald-500/20 to-teal-500/20",
    icon: "ShieldCheck",
  },
  {
    id: "site-web-performant",
    title: "Les 10 clés d'un site web qui convertit",
    excerpt:
      "Vitesse, clarté, mobile-first, appel à l'action… Les principes essentiels pour transformer vos visiteurs en clients.",
    category: "Développement",
    readTime: "8 min",
    date: "2025-05-20",
    color: "from-violet-500/20 to-purple-500/20",
    icon: "Code2",
  },
]

export const pricingPlans = [
  {
    id: "essentiel",
    name: "Essentiel",
    tagline: "Pour lancer votre projet",
    price: "150 000",
    currency: "FCFA",
    period: "/ projet",
    description: "Idéal pour les PME et startups qui ont besoin d'une expertise ciblée.",
    features: [
      "1 expertise au choix",
      "Accompagnement par un expert dédié",
      "2 allers-retours de révision",
      "Livraison sous 10 jours ouvrés",
      "Support par email & WhatsApp",
      "Bilan de mission livré",
    ],
    cta: "Démarrer un projet",
    popular: false,
  },
  {
    id: "professionnel",
    name: "Professionnel",
    tagline: "Le choix le plus plébiscité",
    price: "500 000",
    currency: "FCFA",
    period: "/ projet",
    description: "Pour les entreprises qui veulent combiner plusieurs expertises.",
    features: [
      "Jusqu'à 3 expertises combinées",
      "Chef de projet dédié",
      "Allers-retours de révision illimités",
      "Livraison sous 21 jours ouvrés",
      "Support prioritaire 7j/7",
      "Stratégie & planning détaillés",
      "Reporting hebdomadaire",
      "Garantie satisfaction 30 jours",
    ],
    cta: "Choisir ce pack",
    popular: true,
  },
  {
    id: "entreprise",
    name: "Entreprise",
    tagline: "Sur-mesure & récurrent",
    price: "Sur devis",
    currency: "",
    period: "",
    description: "Pour les grands comptes et les besoins pluriannuels récurrents.",
    features: [
      "Les 5 expertises réunies",
      "Équipe pluridisciplinaire dédiée",
      "Pilotage 360° de votre projet",
      "SLA & engagements sur mesure",
      "Support dédié 24/7",
      "Tableau de bord & KPIs temps réel",
      "Audit & consulting stratégique",
      "Évolution continue des livrables",
    ],
    cta: "Demander un devis",
    popular: false,
  },
]
