# NIRD – base web Nuit de l'Info

Projet statique en HTML/CSS/JS pour présenter les défis Nuit de l'Info autour du NIRD (défense des droits numériques, promotion de Linux et du libre).

## Structure du projet
- `index.html` : redirection vers l'accueil.
- `assets/` : ressources partagées.
  - `css/style.css`
  - `js/main.js` (génère l'en-tête/pied de page et la logique CVE)
- `pages/` : un dossier par page, chaque dossier contenant un `index.html`.
  - `home/` : page d'accueil et liens vers les défis.
  - `femmes-info/`
  - `decathlon/`
  - `cve-explorer/`
  - `ergonomie/`

## Ajouter une nouvelle page
1. Créer un dossier sous `pages/<mon-sujet>/` et y ajouter un `index.html`.
2. Copier ce squelette minimal (chemins déjà corrects à ce niveau de profondeur) :

   ```html
   <!doctype html>
   <html lang="fr">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Titre de la page – NIRD</title>
     <link rel="stylesheet" href="../../assets/css/style.css">
   </head>
   <body data-page="slug">
     <header id="site-header"></header>
     <main>
       <section class="section">
         <div class="panel">
           <div class="badge">Nouveau défi</div>
           <h1>Titre à remplir</h1>
           <p>Contenu…</p>
         </div>
       </section>
     </main>
     <footer id="site-footer"></footer>
     <script src="../../assets/js/main.js"></script>
   </body>
   </html>
   ```

3. Définir `data-page` sur un identifiant unique (ex. `data-page="nouveau"`).
4. Ouvrir `assets/js/main.js` et ajouter un lien dans la navigation avec le même chemin (`../<mon-sujet>/`).
5. Optionnel : ajouter une carte de raccourci sur la page d'accueil (`pages/home/index.html`).

## Utilisation
Ouvrez `index.html` dans un navigateur ou servez le dossier avec un serveur statique. Tous les chemins sont relatifs et supposent que les pages vivent dans `pages/<nom>/`.
