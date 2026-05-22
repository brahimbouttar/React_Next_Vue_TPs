# Réponses aux questions – TP Vue.js / React

## Q1 – Fichier `.vue` (3 sections) vs `.tsx` (tout en un)

**Avantage de l’approche Vue (`.vue`) :**  
Séparation claire du template, de la logique et du style. Cela rend le composant plus lisible et maintenable, surtout en équipe.

**Inconvénient :**  
Nécessite de connaître trois syntaxes différentes (HTML, JS/TS, CSS) dans un même fichier, ce qui peut surprendre au début.

**Avantage de l’approche React (`.tsx`) :**  
Tout est dans un seul langage (TSX = JavaScript + XML). Très flexible, permet de placer du JSX partout, pas de contexte changeant.

**Inconvénient :**  
Le mélange HTML/JS peut devenir confus pour les grands composants. Le style nécessite souvent une bibliothèque externe (CSS-in-JS, modules CSS).

---

## Q2 – Pourquoi React n’a pas de `v-model` natif ?

React suit un flux de données **unidirectionnel** explicite. Le two-way binding cache la source des changements et peut rendre le débogage plus difficile. En imposant `value` + `onChange`, React oblige le développeur à contrôler précisément quand et comment l’état est mis à jour. C’est un choix philosophique : *explicite plutôt qu’implicite*.

---

## Q3 – Pourquoi `tasks.value.push(data)` fonctionne en Vue mais pas en React ?

Vue utilise des **Proxy** pour envelopper les objets réactifs (`ref`, `reactive`). Quand on modifie un tableau avec `push()`, le Proxy intercepte l’opération et déclenche la mise à jour du DOM. React, sans Proxy, ne peut pas détecter une mutation directe – il nécessite une nouvelle référence (immutabilité) pour savoir que l’état a changé.

---

## Q4 – Lisibilité : `onMounted` vs `useEffect([])`

**`onMounted(fn)`** est plus lisible car son nom décrit exactement ce qu’il fait (appel après le montage).  
`useEffect(fn, [])` est plus générique (effet sans dépendances) mais moins évident pour un débutant.

**Pourquoi un tableau de dépendances dans React ?**  
Pour optimiser les ré-exécutions et permettre de réagir à des changements sélectifs. Sans tableau, l’effet tourne après chaque rendu. Le tableau donne un contrôle fin, au prix d’une complexité cognitive.

---

## Q5 – Fonctions en props (React) vs événements (Vue)

L’approche **Vue** (`@delete`) est plus proche du HTML natif, car on retrouve le système d’événements du DOM (`click`, `change`, etc.). Cela rend le code plus familier pour un développeur web classique.  
React utilise des callbacks en props – c’est plus JavaScript pur mais moins “HTML-like”.

---

## Q6 – Oubli de `onDelete` (React) vs `@delete` (Vue)

- **React** : si la fonction n’est pas passée, `props.onDelete` vaut `undefined`. L’appel `props.onDelete(id)` provoque une erreur (`undefined is not a function`) → l’application crash.
- **Vue** : un événement émis sans écouteur est **silencieusement ignoré**. Vue n’avertit pas, car les événements sont optionnels par conception.

---

## Q7 – `useParams`/`useNavigate` vs `useRoute`/`useRouter`

La logique est **strictement identique** :  
- `useParams` ↔ `useRoute().params`  
- `useNavigate` ↔ `useRouter()` (avec `push`/`replace`)

Seuls les noms et l’organisation changent. Les deux bibliothèques fournissent des hooks pour accéder à l’URL et naviguer.

---

## Q8 – Routes en JSX (React) vs fichier de config (Vue)

**Avantage de la séparation Vue** :  
- Centralisation de toutes les routes dans un seul fichier (`router/index.ts`).  
- Plus facile à maintenir dans une grande application (pas de routes éparpillées dans le JSX).  
- Validation et typage plus simples (ex. avec TypeScript).  
- Le routage est **déclaratif pur**, sans mélange avec les composants.

React Router mélange la déclaration des routes avec le reste du JSX, ce qui peut être pratique pour de petites apps mais devient moins lisible pour 50+ pages.

---

## Q9 – Nombre de concepts à apprendre (Redux Toolkit vs Pinia)

**Redux Toolkit** :  
`createSlice` + `configureStore` + `Provider` + `useSelector` + `useDispatch` → **5 concepts essentiels**.

**Pinia** :  
`defineStore` + `useTaskStore()` (le store lui-même) → **2 concepts**.

Pinia est beaucoup plus simple pour un projet moyen. Redux apporte plus de structure mais une courbe d’apprentissage plus raide.

---

## Q10 – `dispatch(action)` vs `store.action()`

**Pinia est plus intuitif** : on appelle directement une méthode du store (`store.addTask(title)`), comme n’importe quel objet JavaScript.  
**Redux** impose le pattern `dispatch` + `action` (objet avec `type`), plus proche du pattern Redux historique.

**Avantage que Redux a sur Pinia** :  
Le *time‑travel debugging* (revenir en arrière dans l’état) est plus mature sur Redux DevTools, car chaque action est immuable et enregistrée. Pinia peut le faire aussi, mais avec moins de finesse.

---

## Q11 – Concepts identiques vs fondamentalement différents

**Identiques (nom différent) :**  
- Composants / props / events  
- Router : lien, paramètres d’URL, navigation  
- Cycle de vie (montage, mise à jour)  
- State local (useState / ref)  
- Effets de bord (useEffect / watch + onMounted)

**Fondamentalement différents :**  
- **Two‑way binding** : Vue avec `v-model`, React avec `value` + `onChange`  
- **Mutations** : Vue autorise les mutations directes (Proxy), React exige l’immutabilité  
- **Template** : Vue a un langage de template spécifique (`v-if`, `v-for`) ; React utilise du JSX pur  
- **Style** : Vue a un bloc `<style>` scoped ; React utilise CSS Modules ou CSS-in-JS

---

## Q12 – Lequel est le plus « magique » ? Avantage ou inconvénient ?

**Vue est plus magique** : `v-model`, mutations directes, `ref` automatique, etc.  
**Avantage** : rapidité de développement, moins de code boilerplate, plus accessible pour les débutants.  
**Inconvénient** : on peut perdre le contrôle de *quand* et *comment* les données changent ; le débogage de la réactivité peut être plus délicat dans de grandes apps.

React, moins magique, force une compréhension plus fine du flux de données, ce qui est un avantage pour la maintenabilité à long terme.

---

## Q13 – E‑commerce 50+ pages, équipe de 10 devs, dashboard complexe → React ou Vue ?

**Réponse : React** (avec un écosystème comme Next.js).  
Justifications :  
- Écosystème plus large (bibliothèques UI, state management, outils de test).  
- Plus de développeurs disponibles sur le marché.  
- Typescript et immutabilité facilitent le travail en équipe sur de gros projets.  
- Next.js apporte le SSR et le routing intégré, idéal pour l’e‑commerce.  
- Vue (avec Nuxt) reste excellent, mais React domine dans les environnements professionnels à très grande échelle.

---

## Q14 – Quel framework apprendre en premier pour un débutant ?

**Conseil : Vue.js**  
Pourquoi ?  
- Syntaxe plus proche du HTML/CSS classique, moins de concepts étranges (JSX, immutabilité obligatoire).  
- La barrière d’entrée est plus basse : `v-model`, `v-if`, `v-for` sont intuitifs.  
- La documentation est excellente et progressive.  
- Un débutant peut rapidement créer une app fonctionnelle sans se heurter à la complexité de Redux ou des hooks.

React peut venir ensuite pour comprendre le flux unidirectionnel et l’écosystème “tout en JS”.