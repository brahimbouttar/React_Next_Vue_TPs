# EMSI — Développement Front-End  
## TP 3 : React Router, Axios & CRUD

### Q1 — Pourquoi utiliser `<Navigate />` et pas `navigate()` ici ?

`<Navigate />` est un **composant de redirection utilisé dans le rendu JSX**.  
Dans `ProtectedRoute`, on est dans le rendu du composant, donc on doit retourner un composant React.

`navigate()` est une **fonction utilisée dans les événements ou les effets (useEffect)**.

---

### Q2 — Différence entre `navigate(from)` et `navigate(from, { replace: true })` ?

`navigate(from)` :

- ajoute une nouvelle entrée dans l’historique du navigateur
- l’utilisateur peut revenir à la page précédente avec le bouton retour

`navigate(from, { replace: true })` :

- remplace la page actuelle dans l’historique
- empêche l’utilisateur de revenir à la page de login après connexion

---

### Q3 — Après un POST, pourquoi utiliser `setProjects(prev => [...prev, data])` plutôt qu’un GET ?

Parce que :

- on a déjà la nouvelle donnée retournée par l’API (`data`)
- on met à jour le state local directement
- cela évite une requête réseau supplémentaire

Cela rend l’application **plus rapide et plus efficace**.

---

### Q4 — Résultat des scénarios de navigation

a) `/dashboard` sans être connecté  
→ redirection vers `/login`.

b) `/projects/1` sans être connecté  
→ redirection vers `/login`.

c) `/nimportequoi`  
→ redirection vers `/dashboard`.

d) `/` (racine)  
→ redirection vers `/dashboard`.

e) Connecté puis bouton Retour du navigateur  
→ l’utilisateur reste sur les pages protégées sauf si logout.

---

### Q5 — Différence entre `<Link>` et `<NavLink>` ?

`<Link>` :

- permet simplement de naviguer entre les pages.

`<NavLink>` :

- fonctionne comme `<Link>`
- ajoute automatiquement un **état actif (`isActive`)** si la route correspond.

On utilise `NavLink` dans la sidebar pour **mettre en évidence le projet actif**.

---

### Q6 — Ce composant sert pour POST et PUT. Qu’est-ce qui change ?

Le composant est le même mais :

POST (création) :
- champs initialement vides
- crée un nouveau projet

PUT (édition) :
- champs pré-remplis avec les données existantes
- met à jour un projet existant

La différence se situe dans la fonction `onSubmit`.

---

### Q7 — Si json-server est arrêté et qu’on tente un POST, que se passe-t-il ?

La requête Axios échoue et une erreur est capturée dans le `catch`.

Le message d’erreur est affiché dans l’interface grâce au state `error`.

---

### Q8 — Différence entre `fetch` et `Axios` pour les erreurs HTTP

Avec **fetch** :

- les erreurs HTTP (404, 500) ne lancent pas automatiquement d’exception
- il faut vérifier `response.ok` manuellement

Avec **Axios** :

- les codes HTTP d’erreur déclenchent automatiquement une exception
- l’erreur est capturée directement dans `catch`