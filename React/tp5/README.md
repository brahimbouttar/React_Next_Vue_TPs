# TaskFlow — Séance 5

## Sécurité JWT, Redux Toolkit & Performance

### Contexte

Ce projet est la continuité de TaskFlow (Séances 1–4).
Objectif : améliorer la sécurité, la gestion d’état et les performances.

---

##  Partie 1 — Sécurité XSS

### Q1 — Le script s’exécute-t-il ?

Non.
React échappe automatiquement les chaînes dans le JSX.
Le HTML est affiché comme texte brut → aucune exécution.

### Q2 — Avec `dangerouslySetInnerHTML` ?

Le script s’exécute.
➡️ Cela désactive la protection XSS de React.
❌ À ne jamais utiliser avec des données utilisateur.

---

##  Partie 2 — Authentification JWT

### Q3 — Header Authorization visible ?

Oui.
Dans Network (F12), on voit :

```
Authorization: Bearer <token>
```

### Q4 — Pourquoi éviter localStorage ?

* Accessible par tout script JS → vulnérable XSS
* Le state React est en mémoire → plus sécurisé

---

##  Partie 3 — Redux Toolkit

### Q5 — Différence avec authReducer

* Plus de `switch/case`
* Plus de types d’actions manuels
* Utilisation de **Immer** → mutation simplifiée
* Code plus lisible et maintenable

---

##  Partie 4 — Performance
### Q6 — Re-renders inutiles

Lors du toggle sidebar :

* Sidebar ✔️
* MainContent ❌ (inutile)
* autres composants ❌

### Q7 — Pourquoi React.memo fonctionne ?

React.memo compare les **props (shallow comparison)**
➡️ Si pas de changement → pas de re-render

### Q8 — useMemo vs useCallback

| Hook        | Utilité               |
| ----------- | --------------------- |
| useMemo     | mémorise une valeur   |
| useCallback | mémorise une fonction |

➡️ useCallback utilisé pour éviter recréation de fonctions

---

##  Partie 5 — Custom Hook

### Objectif

Extraire la logique CRUD dans `useProjects`

### Résultat

* Dashboard simplifié
* Code réutilisable
* Séparation logique/UI

---

## Partie 6 — React Profiler

### Q10 — Analyse

#### Avant optimisation

* Beaucoup de re-renders inutiles
* Temps de rendu élevé

#### Après optimisation (React.memo + useCallback)

* Réduction significative des re-renders
* Meilleure performance globale

---

## Structure finale

```
src/
├── api/axios.ts
├── features/auth/authSlice.ts
├── hooks/useProjects.ts
├── store.ts
├── components/
│   ├── MainContent.tsx
│   └── Sidebar.tsx
├── pages/Dashboard.tsx
└── main.tsx
```

---

## Concepts clés maîtrisés

* Protection XSS en React
* JWT (simulation + intercepteur Axios)
* Redux Toolkit
* Optimisation React (memo, callback)
* Custom Hooks
* Analyse performance avec Profiler

---

## Points critiques

* ❌ Ne jamais utiliser `dangerouslySetInnerHTML` avec user input
* ❌ Ne pas stocker JWT dans localStorage
* ⚠️ Attention aux fonctions passées en props (re-render)

---

## Conclusion

Cette séance améliore :

*  Sécurité (XSS + JWT)
*  Architecture (Redux Toolkit)
*  Performance (memo + hooks)

Projet prêt pour une base **production-level (frontend)**.

---
