#  Séance 3 Next.js — TP : Full-Stack (Prisma + Performance + Déploiement)  — Réponses

---

## Q1 : Prisma Studio

Oui, tu dois voir les données dans **Project** et **User** si :

- la migration a réussi (`prisma migrate dev`)
- le seed a été exécuté (`npx tsx prisma/seed.ts`)

Sinon → problèmes classiques :

- seed non exécuté  
- mauvais `DATABASE_URL`  
- erreur silencieuse dans le seed  

---

## Q2 : Comparaison avec fs

### Ancien code (fs + JSON) :

- lecture fichier  
- parsing JSON  
- modification tableau  
- écriture fichier  
- gestion erreurs  

 ~15–25 lignes  

### Avec Prisma :

 3–6 lignes  

### Conclusion :

- –70% à –80% de code  
- plus fiable  
- transactionnel  
- typé  

---

## Q3 : Supprimer db.json

Oui, l’app fonctionne toujours.

### Pourquoi ?

- Prisma utilise SQLite (`dev.db`) comme source de vérité  
- Plus aucun code ne dépend du fichier JSON  

 Si ça casse → migration incomplète  

---

## Q4 : Server vs Client Component

### Server Component :

- tourne côté serveur  
- accès direct à Prisma (Node.js runtime)  
- accès sécurisé à la base  

### Client Component (`'use client'`) :

- tourne dans le navigateur  
- aucun accès direct DB  
- sinon → fail critique de sécurité  

 **Règle : Prisma = serveur uniquement**

---

## Q5 : next/font

 0 requêtes externes  

### Pourquoi :

- police téléchargée au build  
- servie localement  

### Gain :

- pas de latence Google Fonts  
- pas de blocage réseau  

---

## Q6 : generateStaticParams

 Pages générées **au build**

---

## Q7 : Nouveau projet après build

 Oui, page générée à la demande (fallback dynamique)

### Mais :

- plus lent que pré-généré  
- SEO moins optimisé initialement  

---

## Q8 : URL Vercel

Format standard :
https://react-next-vue-t-ps.vercel.app/


### Si ça ne marche pas :

- `DATABASE_URL` mal configurée  
- SQLite bloqué (normal en production)  

---

## Q9 : Comparaison

| Critère            | React SPA (Vite)            | Next.js Full-Stack              |
|-------------------|----------------------------|--------------------------------|
| Routing           | react-router               | file-based                     |
| Data fetching     | fetch / axios              | direct (Server Components)     |
| CRUD              | API séparée (Express)      | Server Actions / API Routes    |
| Auth              | manuel (JWT etc.)          | intégré (cookies, middleware)  |
| Base de données   | backend externe            | direct via Prisma              |
| Déploiement       | 2 apps                     | 1 seule app                    |
| SEO               | mauvais                    | excellent                      |
| Performance       | moyenne                    | élevée (SSR, SSG)              |
| Complexité        | élevée                     | plus structurée                |
| Nombre de projets | 2                          | 1                              |

---

## Q10 : Choix startup

Choisir React SPA + Express en 2026 sans raison solide → mauvaise décision.

### Choix recommandé : Next.js full-stack

**Pourquoi :**

- moins de code (backend réduit)  
- time-to-market rapide  
- SEO natif  
- meilleures performances  
- infrastructure simplifiée  

### React SPA + Express utile seulement si :

- architecture microservices complexe  
- app très temps réel (WebSocket intensif)  
- besoin de backend strictement découplé  

 Sinon → overengineering  

---