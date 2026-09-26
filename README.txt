Portfolio de Thibaut Patry

Le site comprend une page d'accueil et douze fiches projet internes.
Les planètes sont des images fixes, sans animation ni bouton de contrôle.

Pour consulter le site sans installation : ouvrir index.html dans un navigateur.
Les pages et leurs images utilisent des chemins relatifs.

Pour modifier les projets : data/projects.mjs contient les textes, liens,
technologies et références des images. scripts/render-projects.mjs produit
les fiches et la grille de l'accueil à partir de ces données.

Avec Node.js :
  npm run dev   : aperçu local sur http://127.0.0.1:4173
  npm run build : génération, vérification des liens et copie du site dans dist/

Le dossier dist/ contient le site statique complet à héberger.
La police utilise Google Fonts, avec une police de remplacement hors ligne.

Les jaquettes des jeux existantes sont conservées. Les planètes créées pour
ce portfolio sont des illustrations décoratives, pas des captures des jeux.
