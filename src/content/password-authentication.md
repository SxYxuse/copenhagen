---
title: 'Password authentication'
---

# Password authentication

## Input validation

- Les mots de passe doivent comporter au moins 8 caractères.
- Ne fixez pas une longueur maximale de mot de passe trop basse. Une valeur comprise entre 64 et 256 caractères est une bonne limite maximale.
- Ne modifiez pas ou ne tronquez pas les entrées de manière silencieuse.
- Tous les caractères Unicode valides doivent être autorisés, y compris les espaces.
- Utilisez des bibliothèques comme [`zxcvbn`](https://github.com/dropbox/zxcvbn) pour vérifier la faiblesse des mots de passe.
- Détectez les mots de passe compromis avec des API telles que [haveibeenpwned](https://haveibeenpwned.com/API/v3).

### Checking for compromised passwords

Un service gratuit appelé [haveibeenpwned](https://haveibeenpwned.com/API/v3) peut être utilisé pour vérifier un mot de passe contre les fuites passées. Hash le mot de passe avec SHA-1 (encodé en hexadécimal) et envoyez les 5 premiers caractères.

```untype
GET https://api.pwnedpasswords.com/range/12345
```

L'API fournira une liste de suffixes de mots de passe hachés commençant par les 5 caractères fournis.

```untype
ec68dea7966a1ea2ba9408be4dcc409884f
248b2dddf14a111b9d08b906d06224a0a79
f10a49ecd2ada17a120dc359f162b84e12c
```

## Password storage

Les mots de passe doivent être salés et hachés avant le stockage. Nous recommandons d'utiliser [Argon2id](#argon2id) avec salage.

Dans sa forme la plus basique, le hachage est un processus à sens unique pour générer une représentation unique de l'entrée. La même entrée doit produire le même hachage. Contrairement au chiffrement, il n'est pas réversible - vous ne pouvez pas obtenir les données d'origine à partir du hachage. Des exemples populaires incluent MD5, SHA-1 et SHA-256 - **NE PAS UTILISER CES DERNIERS POUR LES MOTS DE PASSE**.

Le hachage garantit que si vous subissez une violation de données, les pirates ne pourront pas obtenir le mot de passe d'origine. C'est particulièrement important si la violation est limitée. Même s'ils ne pouvaient lire que la table des utilisateurs, ils auraient effectivement accès à tout une fois qu'ils auront mis la main sur les mots de passe des utilisateurs. Plus important encore, cela protège vos utilisateurs contre des dommages supplémentaires. Les utilisateurs réutilisent souvent les mots de passe. Avec des mots de passe divulgués, les pirates peuvent accéder aux comptes utilisateurs dans d'autres applications également.

Cependant, un gros problème avec les mots de passe est qu'ils ne sont pas vraiment aléatoires. Techniquement, il existe 62^8 combinaisons possibles de mots de passe alphanumériques de 8 caractères, mais la réalité est que la plupart des mots de passe utilisent des mots et des noms courants, peut-être avec quelques chiffres à la fin. Cela réduit considérablement le nombre de combinaisons à tester lors des attaques par force brute.

Ainsi, des algorithmes de hachage lents spécifiquement conçus pour les mots de passe sont utilisés. Les algorithmes de hachage communs comme SHA-256 sont conçus pour être aussi rapides que possible.

Même en utilisant un algorithme lent, une table de hachages pré-calculés de mots de passe courants appelée table arc-en-ciel peut être utilisée. Le salage est une technique courante pour prévenir ces attaques en ajoutant des valeurs aléatoires à chaque mot de passe avant le hachage. Le sel doit être généré en utilisant un générateur aléatoire cryptographiquement sûr et il doit avoir au moins 120 bits d'entropie.

```untype
sel = valeursAléatoires()
hachage = hacherMotDePasse(motDePasse + sel) + sel
```

Une autre option est le poivrage où vous utilisez une clé secrète lors du hachage du mot de passe. Alors que les sels sont stockés avec les hachages, la clé secrète est stockée dans un emplacement séparé. Concevoir votre propre mécanisme de hachage peut être une mauvaise idée, alors cela ne devrait être fait que si l'algorithme que vous utilisez le supporte.

Lors de la comparaison des hachages de mots de passe, utilisez la comparaison en temps constant au lieu de `==`. Cela garantit que votre application n'est pas vulnérable aux attaques basées sur le temps, où un attaquant peut extraire des informations en fonction du temps qu'il a fallu pour comparer le mot de passe avec le hachage.

<!-- go -->

```untype
import (
	"crypto/subtle"
	"golang.org/x/crypto/argon2"
)

var storedHash []byte
var password []byte
hash := argon2.IDKey(password, salt, 2, 19*1024, 1, 32)

if (subtle.ConstantTimeCompare(hash, storedHash)) {
	// Mot de passe valide.
}
```

Argon2id doit être votre premier choix, suivi de Scrypt, puis de Bcrypt pour les systèmes hérités.

Le hachage des mots de passe est intensif en ressources et est vulnérable aux attaques par déni de service (DoS).

### Argon2id

Argon2 a été le gagnant du concours de hachage de mots de passe de 2013 et dispose de 3 versions : Argon2i, Argon2d et Argon2id. Argon2id doit être votre option par défaut car il offre un bon équilibre entre résistance aux attaques par canal auxiliaire et aux attaques basées sur GPU. Paramètres minimaux recommandés :

- `memorySize` : 19456 (19 MB)
- `iterations` : 2
- `parallelism` : 1

Optionnellement, utilisez le paramètre `secret` pour poivrer vos hachages. [Voir OWASP pour plus de détails](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#argon2id).

### Scrypt

Paramètres minimaux recommandés :

- `N` : 16384
- `P` : 16
- `r` : 1
- `dkLen` : 64

[Voir OWASP pour plus de détails](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#scrypt).

### Bcrypt

Le facteur de travail doit être d'au moins 10.

Bcrypt a une longueur d'entrée maximale de 72 octets, et certaines implémentations peuvent avoir une limite aussi basse que 50 octets. Le pré-hachage du mot de passe avec des algorithmes comme SHA-256/512 n'est pas recommandé car certaines implémentations de Bcrypt ne sont pas conçues pour gérer les octets nuls. N'essayez pas de mettre en œuvre le poivrage en utilisant HMAC non plus. Utilisez des algorithmes comme [Argon2id](#argon2id) ou [Scrypt](#scrypt) à la place si vous devez prendre en charge des mots de passe plus longs.

[Voir OWASP pour plus de détails](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#bcrypt).

## Brute-force attacks

Les mots de passe sont vulnérables aux attaques par force brute. Il existe principalement 2 approches pour les attaques par force brute :

1. L'attaquant essaie un tas de mots de passe courants.
2. L'attaquant cible des comptes spécifiques en utilisant des mots de passe divulgués (bourrage d'identifiants).

[L'authentification multi-facteurs (MFA)](/content/mfa) est la meilleure défense contre les attaques par force brute. Bien qu'elle ne prévient pas les attaques par force brute elles-mêmes, elle rend ces attaques quasiment inutiles. Les utilisateurs doivent être encouragés à activer la MFA et cela devrait être obligatoire pour les applications critiques en matière de sécurité.

Le throttling basé sur l'IP doit toujours être mis en œuvre. Un exemple basique consiste à bloquer toutes les tentatives d'une adresse IP pendant 10 minutes après 10 échecs consécutifs. D'autres idées incluent l'augmentation de la période de blocage à chaque verrouillage et la réautorisation progressive des nouvelles tentatives à intervalles réguliers après un verrouillage. Cela empêche également les attaques par déni de service (DoS) car le hachage des mots de passe est intensif en ressources. Un throttling basé sur l'identifiant peut également être mis en œuvre en plus du throttling basé sur l'IP, bien que cela puisse introduire des vulnérabilités DoS (voir [device cookies](https://owasp.org/www-community/Slow_Down_Online_Guessing_Attacks_with_Device_Cookies)).

Une autre couche de sécurité que vous pouvez mettre en œuvre est la détection des bots en utilisant des tests comme les Captchas.

Enfin, assurez-vous d'avoir une certaine robustesse des mots de passe pour les utilisateurs. Assurez-vous que les mots de passe ne sont pas faibles et qu'ils n'ont pas été inclus dans des fuites antérieures.

<!-- Voir la section [Validation des mots de passe](#password-validation). -->

## Error handling

Comme règle générale, les messages d'erreur devraient être vagues et génériques. Par exemple, un formulaire de connexion devrait afficher "Nom d'utilisateur ou mot de passe incorrect" plutôt que "Nom d'utilisateur incorrect" ou "Mot de passe incorrect". De même, un formulaire de connexion ne devrait pas indiquer si un e-mail est déjà utilisé par un compte existant.

Cependant, d'un point de vue de l'expérience utilisateur, il est plus convivial de dire directement à l'utilisateur que son nom d'utilisateur ou son e-mail est incorrect. Cela devrait convenir pour les sites où les noms d'utilisateur sont déjà publics (par exemple, les réseaux sociaux) ou où la validité d'un e-mail n'est pas importante (c'est-à-dire la plupart des sites). Cela rend les attaques de force brute légèrement plus faciles car les attaquants n'ont besoin que de deviner des mots de passe, mais vous devriez déjà avoir mis en place des [mesures appropriées](#brute-force-attacks).

Si vous devez garder le nom d'utilisateur ou l'e-mail privé, assurez-vous de ne pas divulguer ces informations via les formulaires d'inscription et de réinitialisation de mot de passe. Par exemple, lors de la création d'un compte, vous pouvez demander à l'utilisateur un message du type "Nous avons envoyé un e-mail dans votre boîte de réception avec des instructions supplémentaires" indépendamment de la disponibilité de l'e-mail. S'ils ont déjà un compte, vous pouvez inclure cette information dans l'e-mail lui-même. Même en renvoyant un message générique, il peut être possible de déterminer si un utilisateur existe ou non en vérifiant les temps de réponse. Par exemple, si vous ne validez le mot de passe que lorsque le nom d'utilisateur est valide. La protection contre les attaques par temporisation est difficile, alors n'optez pour cette solution que si c'est strictement nécessaire.

## Other considerations

- Ne pas empêcher les utilisateurs de copier-coller des mots de passe car cela décourage l'utilisation de gestionnaires de mots de passe.
- Demander le mot de passe actuel lorsqu'un utilisateur tente de changer son mot de passe.
- [Redirection ouverte](/content/open-redirect).
