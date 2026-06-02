export const RISK_DB = [
  {
    id: 'R01',
    nom: 'Effondrement des parois',
    definition:
      "Instabilité et effondrement des parois du forage pendant ou après le forage, pouvant entraîner la perte partielle ou totale du trou.",
    methods: ['Pieux Forés', 'Parois moulées', 'Parois sécantes'],
    primaryTriggers: ['sol_granulaire', 'nappe_elevee'],
    aggravatingTriggers: ['sol_meuble', 'grande_profondeur'],
    consequences:
      "Perte du trou, surconsommation de boue bentonitique, risques de tassements en surface, effondrement partiel du chantier.",
    preventive:
      "Utiliser la boue bentonitique ou le tubage provisoire, maintenir le niveau de boue au-dessus de la nappe, limiter le temps d'exposition des parois.",
    corrective:
      "Reforage avec tubage intégral, injection de coulis de ciment, consolidation préalable du sol (jet grouting).",
    baseCriticite: 'Élevée',
  },
  {
    id: 'R02',
    nom: 'Déviation du pieu',
    definition:
      "Déviation de l'axe du pieu par rapport à la verticalité ou à la position prévue, liée à la présence d'hétérogénéités ou d'obstacles dans le sol.",
    methods: ['Pieux Forés', 'Pieux CFA (Continuous Flight Auger)', 'Pieux hélicoïdaux', 'Pieux inclinés'],
    primaryTriggers: ['sol_heterogene', 'roche_dense'],
    aggravatingTriggers: ['grande_profondeur', 'grand_diametre'],
    consequences:
      "Non-respect des tolérances de positionnement, reprise des têtes de pieux, modifications de la structure de fondation, surcoûts importants.",
    preventive:
      "Contrôle d'inclinométrie en cours de forage, utilisation d'outils de guidage, reconnaissance géotechnique approfondie.",
    corrective:
      "Pieux compensatoires, élargissement de la semelle de liaison, modification du ferraillage.",
    baseCriticite: 'Moyenne',
  },
  {
    id: 'R03',
    nom: 'Refus prématuré',
    definition:
      "Arrêt inopiné du battage avant d'atteindre la côte de refus prévue, dû à la rencontre d'un obstacle rocheux ou d'une couche très dense.",
    methods: ['Pieux battus métalliques', 'Pieux battus préfabriqués béton', 'Pieux vibrofoncés'],
    primaryTriggers: ['roche_dense'],
    aggravatingTriggers: ['grande_profondeur'],
    consequences:
      "Pieu trop court, capacité portante insuffisante, risque de rupture du pieu par excès de battage, arrêt du chantier.",
    preventive:
      "Sondages carottés préalables, essais de battage préliminaires, adapter la méthode au contexte géologique.",
    corrective:
      "Passage en forage, pré-forage dans la couche dure, renforcement de fondation par micropieux.",
    baseCriticite: 'Élevée',
  },
  {
    id: 'R04',
    nom: 'Surconsommation de béton',
    definition:
      "Volume de béton mis en œuvre nettement supérieur au volume théorique du pieu, indiquant des pertes dans le terrain environnant.",
    methods: ['Pieux Forés', 'Jet grouting', 'Parois moulées', 'Pieux CFA (Continuous Flight Auger)'],
    primaryTriggers: ['sol_granulaire', 'nappe_elevee', 'cavites_naturelles'],
    aggravatingTriggers: ['grande_profondeur', 'grand_diametre'],
    consequences:
      "Surcoût majeur, poids excessif non prévu, risque de bulbes de béton hors-profil, perturbation des ouvrages voisins.",
    preventive:
      "Contrôle du volume de béton en continu, reconnaissance des cavités, utilisation de tubage provisoire.",
    corrective:
      "Injection de coulis de remplissage, reprise de l'estimation volumétrique, surveillance par radar géologique.",
    baseCriticite: 'Moyenne',
  },
  {
    id: 'R05',
    nom: 'Cavité imprévue',
    definition:
      "Rencontre d'une cavité naturelle (karst, vide géologique) ou anthropique (ancienne galerie, puits) lors du forage.",
    methods: ['Pieux Forés', 'Jet grouting', 'Parois moulées'],
    primaryTriggers: ['cavites_naturelles', 'roche_dense'],
    aggravatingTriggers: ['grande_profondeur'],
    consequences:
      "Perte soudaine des outils de forage, effondrement local, risque de dommages en surface, projet compromis.",
    preventive:
      "Tomographies électriques, sondages géophysiques, étude historique du site (carrières, mines), imagerie souterraine.",
    corrective:
      "Remplissage bétonné des cavités, re-forage en déviation, fondations profondes alternatives.",
    baseCriticite: 'Élevée',
  },
  {
    id: 'R06',
    nom: 'Blocage de la tarière',
    definition:
      "Blocage irrémédiable de la tarière CFA ou de l'outil de forage en cours d'exécution, nécessitant son extraction en urgence.",
    methods: ['Pieux CFA (Continuous Flight Auger)', 'Pieux Forés'],
    primaryTriggers: ['roche_dense'],
    aggravatingTriggers: ['sol_heterogene', 'grand_diametre'],
    consequences:
      "Immobilisation du matériel, endommagement de l'outil, coûts de réparation élevés, retard chantier important.",
    preventive:
      "Pré-forage dans les zones denses, choix d'un outillage adapté, suivi du couple de rotation.",
    corrective:
      "Extraction à la grue, forage alternatif, intervention de spécialistes en récupération d'outils.",
    baseCriticite: 'Élevée',
  },
  {
    id: 'R07',
    nom: 'Mauvaise injection / Jet grouting défectueux',
    definition:
      "Injection ou traitement au jet grouting inefficace, conduisant à une colonne non homogène ou des pertes de coulis excessives.",
    methods: ['Jet grouting', 'Pieux CFA (Continuous Flight Auger)'],
    primaryTriggers: ['sol_granulaire', 'nappe_elevee'],
    aggravatingTriggers: ['grande_profondeur'],
    consequences:
      "Résistance mécanique insuffisante, colonne de traitement de diamètre réduit, refus de la prestation, reprise totale.",
    preventive:
      "Essais préalables de jet grouting, contrôle du débit et de la pression, carottage de contrôle après traitement.",
    corrective:
      "Colonnes complémentaires, modification des paramètres d'injection, injection de consolidation.",
    baseCriticite: 'Élevée',
  },
  {
    id: 'R08',
    nom: 'Perte de verticalité',
    definition:
      "Inclinaison excessive du pieu au-delà des tolérances admissibles, compromettant la reprise des charges horizontales.",
    methods: [
      'Pieux Forés',
      'Pieux CFA (Continuous Flight Auger)',
      'Pieux hélicoïdaux',
      'Pieux inclinés',
      'Pieux battus métalliques',
    ],
    primaryTriggers: ['sol_heterogene', 'sol_meuble'],
    aggravatingTriggers: ['grande_profondeur', 'grand_diametre'],
    consequences:
      "Excentricité des efforts, sous-dimensionnement en tête, risque de rupture en flexion composée, non-conformité.",
    preventive:
      "Contrôle de verticalité en temps réel (inclinomètre intégré), réglage de l'équipement de forage, terrain préparé.",
    corrective:
      "Modification du ferraillage, ajout de pieux supplémentaires, reprise de calcul de la semelle.",
    baseCriticite: 'Moyenne',
  },
];

export const SOL_GRANULAIRE = new Set([
  'Grave','Grave argileuse','Grave limoneuse','Gravier','Gravier sableux',
  'Sable argileux','Sable fin','Sable graveleux','Sable grossier',
  'Sable limoneux','Sable moyen','Sol sablo-argileux',
  'Alluvions','Dépôts fluviaux','Dépôts éoliens','Sol saturé',
]);

export const SOL_MEUBLE = new Set([
  'Argile molle','Limon','Limon argileux','Limon sableux',
  'Sol meuble','Vase','Tourbe','Sol organique','Sol saturé',
]);

export const SOL_HETEROGENE = new Set([
  'Sol hétérogène','Remblai non compacté','Colluvions',
  'Alluvions','Dépôts fluviaux','Dépôts éoliens','Dépôts marins',
  'Remblai compacté',
]);

export const ROCHE_DENSE = new Set([
  'Basalte','Calcaire','Calcaire fissuré','Craie','Granite',
  'Marne','Roche altérée','Roche fracturée','Roche saine',
  'Schiste','Tuf','Sol dense',
]);

export const CAVITES_NAT = new Set([
  'Calcaire fissuré','Roche fracturée','Roche altérée','Tuf',
]);

export const TRIGGER_LABELS = {
  sol_granulaire: 'Sol granulaire',
  nappe_elevee: 'Nappe élevée (< 3 m)',
  sol_heterogene: 'Sol hétérogène',
  roche_dense: 'Roche / Sol dense',
  sol_meuble: 'Sol meuble',
  cavites_naturelles: 'Cavités naturelles',
  grande_profondeur: 'Grande profondeur (> 20 m)',
  grand_diametre: 'Grand diamètre (> 800 mm)',
};

export function classifyConditions(sol, profondeur, diametre, nappe, env) {
  return {
    sol_granulaire: SOL_GRANULAIRE.has(sol),
    nappe_elevee: nappe !== null && nappe < 3.0,
    sol_heterogene: SOL_HETEROGENE.has(sol),
    roche_dense: ROCHE_DENSE.has(sol),
    sol_meuble: SOL_MEUBLE.has(sol),
    cavites_naturelles:
      CAVITES_NAT.has(sol) ||
      (env && (env.includes('instable') || env.includes('rocheuse') || env.includes('fluviale'))),
    grande_profondeur: profondeur !== null && profondeur > 20,
    grand_diametre: diametre !== null && diametre > 800,
  };
}

export const RISK_IMAGES = {
  R01: 'Effondrement.png',
  R02: 'Déviation.png',
  R03: 'Refus.png',
  R04: 'Surconsommation-Béton.png',
  R05: 'Cavité.png',
  R06: 'Blocage tarière.png',
  R07: 'Mauvaise Injection.png',
  R08: 'Perte de verticalité.png',
};

export function computeRisks(sol, methode, profondeur, nappe, diametre, env) {
  const cond = classifyConditions(sol, profondeur, diametre, nappe, env);
  const triggered = [];

  for (const risk of RISK_DB) {
    const methodMatch = risk.methods.some(
      (m) => m === methode || m.split(' ')[0] === methode.split(' ')[0]
    );
    if (!methodMatch) continue;

    const activePrimary = risk.primaryTriggers.filter((t) => cond[t]);
    if (activePrimary.length === 0) continue;

    const activeAggravating = risk.aggravatingTriggers.filter((t) => cond[t]);

    let criticite = risk.baseCriticite;
    if (activeAggravating.length >= 2) {
      criticite = 'Critique';
    } else if (activeAggravating.length === 1 && risk.baseCriticite === 'Élevée') {
      criticite = 'Critique';
    } else if (activeAggravating.length === 1 && risk.baseCriticite === 'Moyenne') {
      criticite = 'Élevée';
    }

    const scoreMap = { Critique: 3, Élevée: 2, Moyenne: 1 };
    triggered.push({ ...risk, criticite, activePrimary, activeAggravating, score: scoreMap[criticite] || 1 });
  }

  return triggered.sort((a, b) => b.score - a.score);
}
