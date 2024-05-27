---
title: 'Open redirect'
---

# Open redirect

La redirection ouverte est une vulnérabilité où votre application permet à un utilisateur de contrôler une redirection.

Par exemple, vous pouvez vouloir rediriger l'utilisateur vers sa page d'origine après qu'il se soit connecté. Pour ce faire, vous ajoutez un paramètre d'URL `redirect_to` à la page et au formulaire de connexion. Lorsqu'un utilisateur se connecte, il est redirigé vers l'emplacement défini dans `redirect_to`.

```untype
https://example.com/login?redirect_to=%2Fhome
```

Mais que se passe-t-il si vous acceptez n'importe quel emplacement de redirection sans le valider ?

```untype
https://example.com/login?redirect_to=https%3A%2F%2Fscam.com
```

Cela peut sembler inoffensif au début, mais cela facilite grandement l'escroquerie des utilisateurs. L'utilisateur pourrait être redirigé vers un site identique créé par un attaquant et être invité à saisir son mot de passe à nouveau.
