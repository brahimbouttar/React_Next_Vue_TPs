# TaskFlow Next — Séance 2

## Server Actions, API Routes & Auth

---

##  Partie 1 — Server Actions

### Q1 — Après POST

* React : `setState`
* Next.js : `revalidatePath()`

➡️ rafraîchissement automatique

---

##  Partie 2 — Actions CRUD

### Q3 — Pourquoi form et pas onClick ?

* Server Component → pas de JS client
* Form = communication native avec serveur

---

##  Partie 3 — API Routes

### Q4 — /api/projects

Retourne JSON des projets

### Q5 — API Routes vs Server Actions

| API Routes         | Server Actions          |
| ------------------ | ----------------------- |
| Backend public     | logique serveur liée UI |
| accessible externe | usage interne           |
| REST classique     | form-based              |

---

##  Partie 4 — Auth Cookies

### Q6 — useState réduit ?

Oui → remplacé par `useActionState`

### Q7 — Cookie visible ?

Oui (Application tab)
❌ pas accessible via JS (httpOnly)

---

## ️ Partie 5 — Middleware

### Q8 — Différence React

* React : flash avant redirect
* Next : blocage AVANT rendu

### Q9 — Pourquoi racine ?

Middleware agit globalement

---

##  Partie 6 — User

### Q10 — Lecture auth

* React : Context + state
* Next : `cookies()` direct serveur

---

##  Partie 7 — Réflexion

### Q11

* Form → Server Actions
* API externe → API Routes

### Q12

Next.js plus sécurisé :

* cookies httpOnly
* pas exposé JS

### Q13

Oui → API Routes remplacent json-server

### Q14

Non → httpOnly protège contre XSS

---

## ✅ Conclusion

* Backend intégré
* Auth sécurisée (cookies)
* suppression dépendance externe

---
