// Portfolio selection based on the project review and CV shortlist discussed with Thibaut.
// Planet artwork is an editorial background, not a screenshot from these games.
export const projects = [
  {
    slug: 'solnish', title: 'Solnish — GStudio', shortTitle: 'Solnish', group: 'featured',
    category: 'Jeu 2D · Projet collectif', role: 'Lead Programmer', stack: ['C++', 'SFML', 'JSON'],
    accent: '#d0ddaa', planet: 'solnish',
    summary: 'Un jeu 2D et son moteur personnalisé, avec une responsabilité de lead sur le projet.',
    overview: 'Solnish est un projet collectif réalisé au Gaming Campus. Le jeu repose sur un moteur 2D en C++/SFML et des niveaux décrits en JSON. J’ai assuré le rôle de lead du projet et de Lead Programmer, du développement des systèmes à leur intégration dans une version jouable.',
    facts: [['Cadre', 'Projet scolaire'], ['Rôle', 'Lead Programmer'], ['Technologies', 'C++ / SFML'], ['Données', 'Niveaux JSON']],
    workTitle: 'Ma contribution',
    work: ['Coordination technique, suivi des priorités et intégration du travail de l’équipe.', 'Chargement des niveaux JSON, génération des tuiles et placement du joueur.', 'Travail sur les entités, les collisions, les animations et la machine à états du personnage.', 'Développement et correction de l’audio, support manette et préparation d’une release.'],
    learning: ['Faire communiquer les systèmes de gameplay, de rendu, d’audio et d’entrées dans un moteur C++.', 'Arbitrer les priorités et résoudre les problèmes d’intégration dans un projet collectif.'],
    links: [['Voir le code', 'https://github.com/ThibautPat/Solnish-GStudio']]
  },
  {
    slug: 'god-over-drinks', title: 'God Over Drinks', group: 'featured', category: 'Unity · Multijoueur', role: 'Développement en équipe', stack: ['Unity', 'C#', 'Steam'], accent: '#dbb7df', planet: 'god-over-drinks',
    summary: 'Un projet multijoueur Unity : fonctionnalités réseau, interface, audio et retours de jeu.',
    overview: 'God Over Drinks est un jeu multijoueur développé en équipe sous Unity, avec une intégration Steam. Ma participation porte sur plusieurs systèmes : échanges réseau, interface des joueurs, audio et éléments de gameplay.',
    facts: [['Cadre', 'Projet collectif'], ['Moteur', 'Unity'], ['Langage', 'C#'], ['Intégration', 'Steam']],
    workTitle: 'Ma contribution',
    work: ['Travail sur les RPC, les joueurs connectés, les pseudonymes et les scènes de chargement.', 'Développement de systèmes audio, du push-to-talk et du menu pause.', 'Amélioration des retours visuels, de l’éclairage, des rotations et de l’affichage des dés.', 'Travail sur les cartes, les indices, leur traduction et la génération de carte.'],
    learning: ['Synchroniser le gameplay, l’interface et les retours audiovisuels en multijoueur.', 'Intégrer des améliorations régulières dans une équipe travaillant sur plusieurs branches.'],
    links: [['Voir le code', 'https://github.com/gto634/God-Over-Drinks']]
  },
  {
    slug: 'squadron25', title: 'Squadron25', group: 'featured', category: 'C++ · Gameplay & moteur', role: 'Programmation gameplay', stack: ['C++', 'DirectX 12', 'Moteur personnalisé'], accent: '#e1b09f', planet: 'squadron25',
    summary: 'Des systèmes de combat en C++ intégrés dans un moteur DirectX 12.',
    overview: 'Squadron25 est un projet de jeu C++ reposant sur un moteur personnalisé. Le travail de gameplay s’intègre à une architecture qui réunit rendu, physique, interface et gestion des ressources.',
    facts: [['Cadre', 'Projet collectif'], ['Langage', 'C++'], ['Rendu', 'DirectX 12'], ['Domaine', 'Gameplay / combat']],
    workTitle: 'Ma contribution',
    work: ['Développement et correction des armes : railgun, grenade, poings, dégâts et surchauffe.', 'Travail sur les raycasts, les impacts et les problèmes de modèles et de maillages.', 'Création et correction de salles, de chargements et d’éléments de carte.', 'Intégration des systèmes de combat avec la physique et le rendu du moteur.'],
    learning: ['Relier des systèmes de gameplay à une architecture moteur C++ complexe.', 'Diagnostiquer les problèmes à la frontière entre physique, rendu et level design.'],
    links: [['Voir le code', 'https://github.com/Sayanel07/Squadron25']]
  },
  {
    slug: 'starlancer', title: 'StarLancer', group: 'featured', category: 'C++ · Réseau', role: 'Développement en équipe', stack: ['C++', 'Client / serveur', 'Linux'], accent: '#a4dce9', planet: 'starlancer',
    summary: 'Une arène spatiale rétro en multijoueur, avec un serveur Linux déployable sur VPS.',
    overview: 'StarLancer est un jeu d’arène multijoueur en temps réel réalisé pendant un module scolaire. Le joueur pilote un vaisseau dans un mode chacun pour soi. Le projet comprend un client C++ et une architecture serveur compatible Linux.',
    facts: [['Cadre', 'Module multijoueur'], ['Langage', 'C++'], ['Architecture', 'Client / serveur'], ['Serveur', 'Linux']],
    workTitle: 'Ma contribution',
    work: ['Travail sur le gameplay joueur, la vie et la fin de partie.', 'Intégration des pseudonymes et participation à la génération de carte.', 'Intégration de branches et stabilisation des fonctionnalités multijoueur.', 'Participation à une architecture permettant le déploiement du serveur sur un VPS Linux.'],
    learning: ['Comprendre les contraintes de synchronisation d’un jeu en temps réel.', 'Séparer les responsabilités du client, du serveur et du gameplay.'],
    links: [['Voir le code', 'https://github.com/ThibautPat/StarLancer']]
  },
  {
    slug: 'for-shure', title: 'For-Shure', group: 'featured', category: 'C++ · Programmation graphique', role: 'Contribution au moteur', stack: ['C++', 'DirectX 12'], accent: '#c0cddd', planet: 'for-shure',
    summary: 'Un moteur de rendu en C++/DirectX 12, créé pendant mes cours.',
    overview: 'For-Shure est un moteur de rendu en C++/DirectX 12 créé pendant mes cours. Ce projet scolaire collectif m’a permis de travailler sur l’organisation d’un moteur graphique et l’intégration de ses composants.',
    facts: [['Cadre', 'Projet scolaire'], ['Langage', 'C++'], ['API graphique', 'DirectX 12'], ['Domaine', 'Rendu']],
    workTitle: 'Ma contribution',
    work: ['Travail et intégration autour du système de fenêtre.', 'Participation à l’architecture du moteur et à l’intégration des composants graphiques.', 'Manipulation des composants de rendu : périphérique, commandes, matériaux et caméra.'],
    learning: ['Comprendre les responsabilités explicites d’une API graphique bas niveau.', 'Intégrer des composants conçus en parallèle dans une architecture commune.'],
    links: [['Voir le code', 'https://github.com/Arnaud-bd/For-Shure-Proto']]
  },
  {
    slug: 'killer-penguin', title: 'Killer Penguin: The Lost', shortTitle: 'Killer Penguin', group: 'experiments', category: 'Plateforme · Game jam', role: 'Projet en équipe', stack: ['Plateforme', 'Windows', 'Game jam'], accent: '#b4e1ed', planet: 'killer-penguin', cover: 'killer-penguin.png',
    summary: 'Mr. Plop, un pingouin, part retrouver ce qu’il a perdu dans une aventure sur la glace.',
    overview: 'Killer Penguin: The Lost est un jeu de plateforme réalisé en équipe pour la Brackeys Game Jam 2025.2. Le joueur incarne Mr. Plop et l’accompagne à travers un environnement glacé. Une version Windows a été publiée sur itch.io.',
    facts: [['Cadre', 'Brackeys Jam 2025.2'], ['Genre', 'Plateforme'], ['Plateforme', 'Windows'], ['Disponibilité', 'Version publiée']],
    workTitle: 'Le projet',
    work: ['Un jeu de plateforme centré sur le personnage de Mr. Plop.', 'Un projet collectif repris moins de 24 heures avant le rendu de la jam.', 'Une version jouable Windows distribuée sur itch.io.'],
    learning: ['Revoir le périmètre du jeu sous une forte contrainte de temps.', 'Concentrer le travail collectif sur une version jouable à livrer.'],
    links: [['Télécharger sur itch.io', 'https://apogriff.itch.io/killerpenguinthelost']]
  },
  {
    slug: 'undesired', title: 'Undesired: One Room', group: 'experiments', category: 'Aventure · Game jam', role: 'Équipe de trois', stack: ['Première personne', 'Game jam', 'Windows / macOS / Linux'], accent: '#d6c3ab', planet: 'undesired', cover: 'undesired.png',
    summary: 'Une aventure psychologique à la première personne, créée pendant une jam de 36 heures.',
    overview: 'Dans Undesired, le joueur est enfermé dans une pièce et doit chercher des indices pour en sortir. Le jeu repose sur une ambiance psychologique et des événements qui remettent en question ce qui paraît normal. Il a été réalisé en équipe de trois pendant une jam de 36 heures.',
    facts: [['Cadre', 'Game jam'], ['Durée de la jam', '36 heures'], ['Équipe', '3 personnes'], ['Genre', 'Aventure / énigmes']],
    workTitle: 'Le projet',
    work: ['Une expérience à la première personne située dans une seule pièce.', 'Exploration, recherche d’indices et résolution d’énigmes.', 'Réalisation collective avec Ethan Alves et Thibaut Hody, puis publication sur itch.io.'],
    learning: ['Définir une expérience courte autour d’un lieu et d’une intention précis.', 'Organiser le travail d’équipe et livrer dans le temps imparti par une jam.'],
    links: [['Télécharger sur itch.io', 'https://apogriff.itch.io/undesired-one-room']]
  },
  {
    slug: 'chronopost', title: 'ChronoPost Simulator', group: 'experiments', category: 'Course & livraison · Game jam', role: 'Développement en équipe', stack: ['Unity', 'C#', 'Windows'], accent: '#ecd1a0', planet: 'chronopost', cover: 'chronopost.png',
    summary: 'Livrer les colis le plus vite possible, en évitant les obstacles sur la route.',
    overview: 'ChronoPost Simulator est un jeu 3D de course et de livraison réalisé pendant la Beginner’s Jam Winter 2024. Le joueur doit distribuer les colis d’une ville en évitant les obstacles. Le projet a été publié sur itch.io sous le nom SHARKstudio.',
    facts: [['Cadre', 'Winter Game Jam 2024'], ['Moteur', 'Unity'], ['Langage', 'C#'], ['Plateforme', 'Windows']],
    workTitle: 'Ma participation',
    work: ['Participation à la création d’un jeu de livraison en équipe.', 'Prototypage et intégration rapide dans le temps limité de la game jam.', 'Finalisation collective d’une version jouable publiée sur itch.io.'],
    learning: ['Cadrer le projet et prioriser une boucle de jeu complète.', 'Passer du prototype à une version jouable dans un délai court.'],
    links: [['Télécharger sur itch.io', 'https://sharkgamestudio.itch.io/chronopost-simulator'], ['Voir le code', 'https://github.com/ThibautPat/ChronosPost-Simulator']]
  },
  {
    slug: 'squadron24', title: 'Squadron24', group: 'featured', category: 'Shoot’em up · Projet scolaire', role: 'Projet scolaire', stack: ['C++', 'Windows'], accent: '#b0e4d0', planet: 'squadron24', cover: 'squadron24.png',
    summary: 'Un shoot’em up de science-fiction en C++, disponible sur Windows.',
    overview: 'Squadron24 est un shoot’em up scolaire développé en C++. Il s’appuie sur une structure de moteur personnalisé et possède une version Windows publiée sur itch.io.',
    facts: [['Cadre', 'Projet scolaire'], ['Genre', 'Shoot’em up'], ['Langage', 'C++'], ['Plateforme', 'Windows']],
    workTitle: 'Le projet',
    work: ['Un jeu de tir de science-fiction développé en C++.', 'Une structure de projet organisée autour d’un moteur personnalisé.', 'Une version Windows publiée et accompagnée d’un dépôt de code.'],
    learning: ['Travailler sur la structure d’un jeu C++ complet.', 'Préparer une version jouable et la rendre accessible en dehors du projet de développement.'],
    links: [['Télécharger sur itch.io', 'https://apogriff.itch.io/squadron24'], ['Voir le code', 'https://github.com/ThibautPat/Squadron24']]
  },
  {
    slug: 'glouglouparc', title: 'GlouGlouParc', group: 'experiments', category: 'Unity · Game jam', role: 'Développement en équipe', stack: ['Unity', 'C#', 'ShaderLab'], accent: '#afe4d6', planet: 'glouglouparc',
    summary: 'Une game jam Unity, du GameManager aux événements et à l’intégration visuelle.',
    overview: 'GlouGlouParc est un projet collectif Unity réalisé dans un contexte de game jam. Le travail réunit programmation gameplay, effets visuels, interface et intégration des scènes.',
    facts: [['Cadre', 'Game jam'], ['Moteur', 'Unity'], ['Langages', 'C# / ShaderLab'], ['Domaine', 'Gameplay / intégration']],
    workTitle: 'Ma contribution',
    work: ['Développement du GameManager et d’événements de jeu.', 'Ajout de particules liées à l’interface.', 'Intégration et correction des scènes, de la musique, des arrière-plans et des éléments visuels.'],
    learning: ['Prioriser les fonctionnalités essentielles et intégrer rapidement les contenus.', 'Finaliser un projet collectif sous contrainte de temps.'],
    links: [['Voir le code', 'https://github.com/ThibautPat/GlouGlouParc'], ['Dépôt d’équipe', 'https://github.com/doriansimonet/GameJam-GlouGlouParc']]
  },
  {
    slug: 'foras', title: 'FORAS', group: 'experiments', category: 'Unity · Simulation', role: 'Projet personnel', stack: ['Unity', 'C#', 'Balistique'], accent: '#e0c1a1', planet: 'foras',
    summary: 'Un sandbox balistique : impacts, pénétration d’armure et dégâts internes.',
    overview: 'FORAS est un projet personnel de simulation balistique sous Unity, inspiré par les systèmes de War Thunder. Il explore les impacts de projectiles, les couches de protection et les dégâts à l’intérieur d’une cible.',
    facts: [['Cadre', 'Projet personnel'], ['Moteur', 'Unity'], ['Langage', 'C#'], ['État', 'En développement']],
    workTitle: 'Ce que je développe',
    work: ['Conception d’une architecture balistique modulaire.', 'Expérimentation sur les impacts et la pénétration d’armure.', 'Travail sur les dégâts internes et la réutilisation des systèmes.'],
    learning: ['Décomposer une simulation en systèmes indépendants et réutilisables.', 'Tester les interactions entre un projectile, un matériau et les composants internes.'],
    links: [['Voir le code', 'https://github.com/ThibautPat/FORAS']]
  }
];
