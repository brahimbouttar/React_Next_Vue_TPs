# EMSI — Développement Front-End  
## TP 2 : Auth Context & Protected Layout

### Q2 — Pourquoi `useAuth()` lance une erreur si le context est null ? Quel bug cela prévient ?

L’erreur garantit que `useAuth()` est utilisé uniquement à l’intérieur de `AuthProvider`.  
Cela évite un bug où un composant tente d’accéder au context alors qu’il n’est pas enveloppé par le Provider, ce qui provoquerait des valeurs `undefined` et des erreurs difficiles à diagnostiquer.

---

### Q3 — Sans Context, comment partager le user entre Header, Sidebar et Login ? Combien de props ?

Sans Context, il faudrait utiliser le **prop drilling**.

Le state `user` serait stocké dans `App` puis passé à chaque composant via props :

```

App → Header
App → Sidebar
App → Login

```

Chaque composant recevrait les données via props, ce qui augmenterait rapidement le nombre de props et compliquerait la maintenance de l’application.

---

### Q4 — Pourquoi `e.preventDefault()` est indispensable dans `handleSubmit` ?

`e.preventDefault()` empêche le comportement par défaut du formulaire HTML.

Sans cela :

- le navigateur recharge la page
- le state React est perdu
- la logique de login ne peut pas s’exécuter correctement

Cela permet de gérer la soumission du formulaire entièrement avec React.

---

### Q5 — Que fait la destructuration `{ password: _, ...user }` ? Pourquoi exclure le password ?

Cette destructuration extrait `password` de l’objet utilisateur et crée un nouvel objet `user` sans ce champ.

Exemple :

```

{ id, email, password, name }

```

devient

```

{ id, email, name }

```

Le mot de passe est exclu pour des raisons de sécurité afin de ne pas stocker ou transmettre cette information dans l’état de l’application.

---

### Q6 — Pourquoi le composant `Dashboard` est séparé de `App` ?

Séparer `Dashboard` permet :

- de garder `App` simple et responsable uniquement de la logique d’authentification
- d’améliorer la lisibilité du code
- de séparer clairement la logique **authentification / interface principale**

`App` décide simplement :

```

si user connecté → Dashboard
sinon → Login

```

---

### Q7 — Flux complet du login et logout

Flux de fonctionnement :

1. L’utilisateur ouvre l’application.
2. Si aucun utilisateur n’est connecté → affichage de **Login**.
3. L’utilisateur entre `admin@taskflow.com / admin123`.
4. React envoie une requête à l’API json-server.
5. Si les identifiants sont corrects → `LOGIN_SUCCESS`.
6. L’utilisateur est stocké dans le state.
7. `Dashboard` est affiché.
8. L’utilisateur clique sur **Déconnexion**.
9. Action `LOGOUT`.
10. L’état revient à `user = null`.
11. React affiche de nouveau **Login**.

---

### Q8 — Flux du callback `onLogout`

Flux de données :

```

Header
↓
onClick bouton logout
↓
onLogout()
↓
dispatch({ type: 'LOGOUT' })
↓
authReducer met à jour le state
↓
user = null
↓
App re-render
↓
affichage de Login

```

---

### Q9 — Pourquoi le flash disparaît avec `useLayoutEffect` ?

`useLayoutEffect` s’exécute **avant que le navigateur ne peigne l’écran**.

Cycle :

```

Render → Commit → useLayoutEffect → Paint

```

La position du tooltip est calculée avant l’affichage, donc l’utilisateur ne voit pas la position initiale `(0,0)`.

Avec `useEffect`, l’effet s’exécute **après le paint**, ce qui provoque un flash visuel.

---

### Q10 — Pourquoi ne pas utiliser `useLayoutEffect` partout ?

`useLayoutEffect` bloque le rendu du navigateur jusqu’à la fin de son exécution.

Si utilisé partout :

- le rendu devient plus lent
- les performances de l’interface peuvent se dégrader

Il doit être utilisé seulement lorsque l’on doit **lire ou modifier le layout du DOM avant l’affichage** (mesure de position, animation, tooltip, etc.).
```
