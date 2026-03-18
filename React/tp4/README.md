# EMSI — Développement Front-End  
## TP 4 : MUI vs Bootstrap & Architecture BDD

### Q1 — Combien de lignes de CSS pour Header MUI ?

0 ligne de CSS.

Tout le style est intégré directement avec `sx={{}}`.

Comparé à Header.module.css :
- MUI réduit fortement le besoin de fichiers CSS externes
- moins de séparation mais plus rapide à coder

---

### Q2 — Comparaison Header MUI vs Bootstrap

MUI :
- plus structuré
- utilise des composants riches (AppBar, Toolbar)
- style inline avec `sx`

Bootstrap :
- plus simple
- plus court
- basé sur classes CSS (`className`)

Conclusion :
- Bootstrap = plus rapide à écrire
- MUI = plus propre et maintenable sur gros projet

---

### Q3 — sx (MUI) vs className (Bootstrap)

sx (MUI) :
- style directement dans le composant
- plus flexible et dynamique
- pas besoin de CSS externe

className (Bootstrap) :
- basé sur classes prédéfinies
- plus rapide pour layout simple
- moins flexible pour personnalisation fine

Préférence :
- MUI pour contrôle précis
- Bootstrap pour rapidité

---
| Critère                         | Material UI                                  | React-Bootstrap                           |
|---------------------------------|---------------------------------------------|-------------------------------------------|
| Installation                    | Plus lourd (plusieurs packages MUI)         | Simple (bootstrap + react-bootstrap)      |
| Nombre de composants utilisés   | Élevé (AppBar, Toolbar, Box, Typography…)   | Moyen (Navbar, Container, Button…)        |
| Lignes de CSS écrites           | 0 (style avec sx)                           | Faible (classes Bootstrap prédéfinies)    |
| Système de style                | sx (JS-in-CSS, dynamique)                   | className (CSS classes)                   |
| Personnalisation couleurs       | Très flexible (thème MUI)                   | Limitée sans override CSS                 |
| Responsive                      | Très bon (Grid, breakpoints intégrés)       | Bon (grid Bootstrap)                      |
| Lisibilité du code              | Structuré mais plus verbeux                 | Plus simple et rapide à lire              |
| Documentation                   | Très complète mais dense                    | Simple et claire                          |
| Votre préférence                | Material UI (scalable et puissant)          | Bootstrap (rapide mais limité)            |
### Q4 — Choix d’une seule library en production

Material UI

Raisons :
- meilleure scalabilité
- composants plus complets
- système de design cohérent
- meilleure intégration avec React

---

### Q5 — Pourquoi React ne peut pas se connecter directement à MySQL ?

Parce que :

- MySQL est une base de données (pas une API HTTP)
- React fonctionne côté client (navigateur)
- exposer MySQL directement = faille de sécurité

Il faut un backend (API) entre React et MySQL.

---

### Q6 — Pourquoi ne pas utiliser json-server en production ?

1. Pas sécurisé (aucune authentification réelle)
2. Pas performant pour gros volume
3. Pas de logique métier avancée

---

### Q7 — Pourquoi Firebase permet une connexion directe ?

Firebase fournit :
- une API sécurisée
- gestion d’authentification
- règles de sécurité intégrées

Donc React peut communiquer directement via SDK.

Contrairement à MySQL :
- pas d’API HTTP native
- pas de sécurité côté client

---

### Q8 — Passer de json-server à production

Étapes :

1. Créer un backend (Express, Django…)
2. Ajouter authentification (JWT)
3. Sécuriser les routes
4. Connecter à une vraie base (MySQL, MongoDB)
5. Déployer backend + frontend
6. Gérer logs et monitoring

---

### Q9 — Risques des libraries externes

1. Taille du bundle plus grande → performance réduite
2. Dépendance aux mises à jour
3. Risque de breaking changes
4. Perte de contrôle sur le design

---

### Q10 — App de chat temps réel : choix

Firebase

Raisons :
- temps réel natif (WebSockets intégrés)
- pas besoin de backend
- rapide à développer

json-server :
- impossible (pas temps réel)

Backend custom :
- plus puissant mais plus long à développer