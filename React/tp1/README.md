# EMSI — Développement Front-End  
## TP 1 : TaskFlow (React + Vite)

### Q1 — Que contient le `<body>` dans `index.html` ? Lien avec le CSR ?

Le `<body>` contient généralement :

```html
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
````

`#root` est l’élément où React monte l’application.
Avec le **Client Side Rendering (CSR)**, le navigateur charge une page HTML minimale puis React génère toute l’interface côté client via JavaScript.

---

### Q2 — Différence entre des données en dur et une API REST ?

**Données en dur :**

* définies directement dans le code
* statiques
* nécessitent de modifier le code pour changer les données

**API REST :**

* les données sont récupérées via HTTP (GET, POST, PUT, DELETE)
* données dynamiques
* séparation entre frontend et backend
* plusieurs applications peuvent utiliser la même API

---

### Q3 — Pourquoi `className` au lieu de `class` en JSX ?

Parce que `class` est un mot réservé en JavaScript.
React utilise donc `className` pour appliquer des classes CSS dans JSX.

---

### Q4 — Pourquoi `key={p.id}` est obligatoire dans `.map()` ? Que se passe-t-il avec l’index ?

La propriété `key` permet à React d’identifier chaque élément dans une liste et d’optimiser les mises à jour du **Virtual DOM**.

Si on utilise l’index comme clé :

* React peut mal identifier les éléments si l’ordre change
* cela peut provoquer des bugs d’affichage ou de gestion d’état

Il est préférable d’utiliser un identifiant unique et stable comme `id`.

---

### Q5 — Combien de fois `useEffect` s’exécute-t-il ? Pourquoi ?

`useEffect` s’exécute **une seule fois** car le tableau de dépendances est vide :

```javascript
useEffect(() => {
  fetchData();
}, []);
```

Cela signifie que l’effet s’exécute uniquement **au montage du composant**.

---

### Q6 — Que se passe-t-il si `json-server` est arrêté ?

Les requêtes `fetch` échouent.
Une erreur apparaît dans la console (ex: `Failed to fetch`) et les données ne sont pas chargées dans l’application.

---

### Q7 — Dans l’onglet Network, voit-on les requêtes vers `localhost:4000` ? Code HTTP ?

Oui. Les requêtes visibles sont par exemple :

```
GET http://localhost:4000/projects
GET http://localhost:4000/columns
```

Le code HTTP est généralement **200 OK**, ce qui signifie que la requête a réussi.

---

### Q8 — Si on modifie `db.json`, les nouvelles données s’affichent-elles ?

Oui. Après modification de `db.json` et rechargement de l’application :

1. React envoie une requête `fetch`
2. `json-server` renvoie les nouvelles données
3. `useState` met à jour l’état
4. React re-render les composants
5. les nouvelles données apparaissent dans l’interface

---

### Q9 — Flux des données dans l’application

```
db.json
   ↓
json-server
   ↓
fetch()
   ↓
useEffect()
   ↓
useState()
   ↓
Composants React
   ↓
props
   ↓
Interface utilisateur
```
