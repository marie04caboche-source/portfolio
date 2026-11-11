# Portfolio — Marie Caboche

Site portfolio statique construit avec HTML, CSS, JavaScript et Jekyll. Prévu pour être publié gratuitement sur GitHub Pages.

## Aperçu local
Ouvre `index.html` dans un navigateur pour un aperçu simple de la mise en page. Pour voir les pages projets et les contenus Jekyll exactement comme en ligne, lance le site avec Jekyll (`bundle exec jekyll serve`) après installation.

## Publication GitHub Pages
1. Créer un dépôt GitHub public nommé `TON-PSEUDO.github.io`.
2. Ajouter tous les fichiers de ce dossier à la racine du dépôt.
3. Dans GitHub : Settings → Pages → Deploy from a branch → `main` → `/ (root)`.
4. Attendre la publication : le site sera accessible à `https://TON-PSEUDO.github.io`.

## Modifier le contenu sans coder
Le site est préparé pour Pages CMS :
1. Aller sur https://app.pagescms.org et se connecter avec GitHub.
2. Autoriser Pages CMS uniquement sur le dépôt du portfolio.
3. Ouvrir le dépôt : le fichier `.pages.yml` configure les champs éditables.
4. Dans la collection « Projets », modifier un projet ou en créer un nouveau.
5. Ajouter les photos dans le champ de couverture ou dans la médiathèque `assets/uploads`.
6. Enregistrer : Pages CMS écrit les modifications dans GitHub. GitHub Pages republie le site automatiquement.

Pages CMS est un service tiers gratuit et open source au moment de la création de ce kit. Le site public reste hébergé séparément sur GitHub Pages ; si l'éditeur Pages CMS change ou devient indisponible, les fichiers du site restent dans ton dépôt GitHub et pourront être modifiés autrement.

## À personnaliser avant publication
- Remplacer `TON-EMAIL@EXEMPLE.COM` dans `index.html`.
- Remplacer le lien LinkedIn générique.
- Ajouter ton CV PDF dans `assets/uploads` puis relier son chemin dans `index.html`.
- Ajouter tes propres photos de projets dans `assets/uploads` et les sélectionner dans Pages CMS.
- Vérifier les textes des projets préremplis et compléter les missions / visuels.

## Important
Le dépôt GitHub doit être public pour utiliser GitHub Pages avec un compte GitHub Free. Ne mets jamais de données privées, identifiants ou documents confidentiels dans le dépôt.
