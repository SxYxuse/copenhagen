---
title: 'Réinitialisation de mot de passe'
---

# Réinitialisation de mot de passe

## Vue d'ensemble

Une approche courante pour la réinitialisation de mot de passe consiste à utiliser l'adresse e-mail de l'utilisateur. L'utilisateur saisit son adresse e-mail et, si l'e-mail est valide, un lien de réinitialisation de mot de passe est envoyé à la boîte aux lettres. Cela nécessite que chaque utilisateur ait une adresse e-mail unique - consultez le guide de [Vérification d'e-mail](/content/email-verification).

L'e-mail n'a pas besoin d'être vérifié avant d'envoyer un lien de réinitialisation. Vous devriez même marquer l'adresse e-mail d'un utilisateur comme vérifiée s'ils réinitialisent leur mot de passe.

Cette page ne couvrira que les liens de réinitialisation de mot de passe car c'est l'approche la plus courante.

## Liens de réinitialisation de mot de passe

La réinitialisation de mot de passe nécessite 2 pages. La première est la page où les utilisateurs saisissent leur adresse e-mail.

```untype
https://example.com/reset-password
```

Ensuite, c'est le formulaire de réinitialisation de mot de passe proprement dit, où l'utilisateur saisit son nouveau mot de passe. C'est le lien qui est envoyé à la boîte aux lettres de l'utilisateur. Un [jeton](/content/server-side-tokens) de réinitialisation de mot de passe est inclus dans le chemin d'URL.

```untype
https://example.com/reset-password/<TOKEN>
```

Les jetons doivent être valides pendant environ une heure, et au plus 24 heures. Invalidez les jetons existants lors de l'envoi d'un autre jeton, ou réutilisez un jeton valide existant s'il en existe déjà un. Il est recommandé de hacher les jetons avec SHA-256 avant de les stocker.

Le jeton doit être à usage unique. Supprimez le jeton lorsque l'utilisateur envoie un mot de passe valide via le formulaire.

Assurez-vous de définir la balise [Politique de référent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy) sur `no-referrer` pour tout chemin qui inclut des jetons afin de protéger les jetons contre les fuites de référents.

Si l'utilisateur a mis en œuvre [l'authentification multi-facteurs](/content/mfa), par exemple via des applications d'authentification ou des passkeys, il devrait être invité à s'authentifier en utilisant son deuxième facteur avant de saisir son nouveau mot de passe.

## Gestion des erreurs

Si l'e-mail est invalide, vous pouvez soit dire à l'utilisateur que l'e-mail est invalide, soit garder le message vague (par exemple, "Nous enverrons un e-mail de réinitialisation si le compte existe"). Cela dépendra de si vous souhaitez rendre la validité des e-mails publique ou privée. Voir [Gestion des erreurs](/content/password-authentication#error-handling) dans le guide d'authentification par mot de passe pour plus d'informations.

## Limitation du débit

Tout point de terminaison pouvant envoyer des e-mails devrait avoir une limitation stricte du débit mise en œuvre. Utilisez des Captchas si nécessaire.
