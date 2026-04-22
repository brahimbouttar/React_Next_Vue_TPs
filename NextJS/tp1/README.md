# TaskFlow Next — Séance 1

## Du CSR au SSR avec Next.js

---

##  Objectif

Migration d’une app React (CSR) vers Next.js (SSR + App Router).

---

##  Partie 1 — Structure

### Q1 — Différences React vs Next.js

* React (Vite) :

  * Routing via `react-router-dom`
  * Structure libre (src/)
* Next.js :

  * Routing basé sur dossiers (`app/`)
  * `layout.tsx` + `page.tsx`
  * SSR natif

➡️ Différence clé : **routing déclaratif vs conventionnel**

---

##  Partie 2 — Routing

### Q2 — Nombre de fichiers pour une route

* Next.js : 1 fichier (`page.tsx`)
* React : composant + route + import

➡️ Next.js réduit la complexité

### Q3 — Récupération de l’id

* React : `useParams()` (client)
* Next.js : `params` (server)

➡️ Différence : **Client vs Server**

---

##  Partie 3 — Layout

* `layout.tsx` permet un header persistant
* Pas besoin de wrapper manuel comme en React

---

##  Partie 4 — Server Component

### Q5 — Complexité fetch

* React : ~10 lignes (state + effect)
* Next.js : ~3 lignes

### Q6 — Requête visible dans Network ?

Non
➡️ exécutée côté serveur

---

##  Partie 5 — Client Component

### Q7 — Pourquoi 'use client' ?

* Login = interactivité (state, events)
* Dashboard = affichage statique (server)

### Q8 — Alternative à useNavigate

➡️ `useRouter()`

---

##  Partie 6 — View Source

### Q9 — React SPA

* HTML vide (`<div id="root">`)

### Q10 — Next.js

* HTML complet avec données

➡️ avantage SEO + performance

---

## Partie 7 — Réflexion

### Q11

React : layout manuel (App + Router)
Next : layout automatique

### Q12

Créer `app/dashboard/layout.tsx`

### Q13

Non → Server Component ≠ interactivité

### Q14

Non → isoler un Client Component

### Q15

Avantage :

* API cachée
* sécurité accrue
* pas exposée au client

---

## ✅ Conclusion

* SSR > CSR pour SEO et performance
* Routing simplifié
* Séparation client/server claire

---
