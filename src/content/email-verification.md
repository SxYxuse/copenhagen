---
title: 'Email verification'
---

# Email verification

Si votre application nécessite que les adresses e-mail des utilisateurs soient uniques, la vérification des e-mails est indispensable. Elle décourage les utilisateurs de saisir une adresse e-mail aléatoire et, si la réinitialisation du mot de passe est implémentée, permet aux utilisateurs de récupérer les comptes créés avec leur adresse e-mail. Vous pouvez même vouloir bloquer l'accès au contenu de votre application jusqu'à ce que l'utilisateur vérifie son adresse e-mail.

## Input validation

Les e-mails sont complexes et ne peuvent pas être entièrement validés à l'aide de Regex. Tenter d'utiliser Regex peut également introduire des [vulnérabilités ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS). Ne compliquez pas trop :

- Inclut au moins un caractère `@`.
- Possède au moins un caractère avant le `@`.
- La partie domaine inclut au moins un `.` et possède au moins un caractère avant celui-ci.
- Ne commence ni ne se termine par un espace blanc.
- Maximum de 255 caractères.

### Sub-addressing

Certains fournisseurs de messagerie, y compris Google, permettent aux utilisateurs de spécifier une étiquette qui sera ignorée par leurs serveurs. Par exemple, un utilisateur avec `user@example.com` peut utiliser `user+foo@example.com` et `user+bar@example.com`. Vous pouvez bloquer les e-mails avec `+` pour empêcher les utilisateurs de créer plusieurs comptes avec la même adresse e-mail, mais les utilisateurs pourront toujours utiliser des adresses e-mail temporaires ou simplement créer une nouvelle adresse e-mail. Ne supprimez jamais silencieusement la partie étiquette de la saisie de l'utilisateur car une adresse e-mail avec `+` peut être une adresse e-mail valide et régulière.

## Email verification codes

Une façon de vérifier un e-mail est d'envoyer un code secret stocké sur le serveur à la boîte aux lettres de l'utilisateur.

Cette approche doit être préférée à l'utilisation de liens. Les gens sont de moins en moins susceptibles de cliquer sur des liens, et certains filtres peuvent bloquer les e-mails contenant des liens. L'utilisation de liens limite également l'appareil que l'utilisateur peut utiliser pour créer un compte (par exemple, si l'utilisateur n'a pas accès à sa boîte aux lettres sur son téléphone).

Le code de vérification doit comporter au moins 8 chiffres si le code est numérique, et au moins 6 chiffres s'il est alphanumérique. Vous devez éviter d'utiliser à la fois des lettres minuscules et majuscules. Vous pouvez également vouloir supprimer les chiffres et les lettres pouvant être mal lus (0, O, 1, I, etc.). Il doit être généré à l'aide d'un générateur aléatoire cryptographiquement sécurisé.

Un seul code de vérification doit être lié à un seul utilisateur et à une seule adresse e-mail. Ceci est particulièrement important si vous permettez aux utilisateurs de changer leur adresse e-mail après qu'un e-mail leur a été envoyé. Chaque code doit être valide pendant au moins 15 minutes (entre 1 et 24 heures est recommandé). Le code doit être à usage unique et immédiatement invalidé après validation. Un nouveau code de vérification doit être généré à chaque demande de nouvel e-mail/code de l'utilisateur.

De la même manière qu'un formulaire de connexion régulier, un throttling ou une limitation de débit basé sur l'identifiant utilisateur doit être implémenté. Une bonne limite est d'environ 10 tentatives par heure. En supposant une limitation correcte, le code peut être valide jusqu'à 24 heures. Vous devez générer et renvoyer un nouveau code si le code fourni par l'utilisateur a expiré.

Toutes les sessions d'un utilisateur doivent être invalidées lorsque son e-mail est vérifié.

## Email verification links

Une autre façon de vérifier les e-mails est d'utiliser un lien de vérification contenant un long jeton aléatoire à usage unique [token](/content/server-side-tokens).

```untype
https://example.com/verify-email/<TOKEN>
```

Un seul jeton doit être lié à un seul utilisateur et à une seule adresse e-mail. Ceci est particulièrement important si vous permettez aux utilisateurs de changer leur adresse e-mail après qu'un e-mail leur a été envoyé. Les jetons doivent être à usage unique et être immédiatement supprimés du stockage après vérification. Le jeton doit être valide pendant au moins 15 minutes (entre 1 et 24 heures est recommandé). Lorsque l'utilisateur demande un autre e-mail de vérification, vous pouvez renvoyer le jeton précédent si celui-ci est encore valide.

Assurez-vous de définir l'étiquette [Referrer Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy) sur `no-referrer` pour tout chemin incluant des jetons afin de protéger les jetons contre les fuites de référents.

Toutes les sessions doivent être invalidées lorsque l'e-mail est vérifié (et en créer une nouvelle pour l'utilisateur actuel afin qu'il reste connecté).

## Changing emails

L'utilisateur doit être invité à saisir son mot de passe ou, si [l'authentification multi-facteurs](/content/mfa) est activée, à s'authentifier avec un de ses seconds facteurs. Le nouvel e-mail doit être stocké séparément de l'e-mail actuel jusqu'à sa vérification. Par exemple, le nouvel e-mail pourrait être stocké avec le jeton/code de vérification.

Une notification doit être envoyée à l'ancienne adresse e-mail lorsque l'utilisateur change son adresse e-mail.

## Rate limiting

Tout point de terminaison pouvant envoyer des e-mails doit avoir une limitation stricte du débit.
