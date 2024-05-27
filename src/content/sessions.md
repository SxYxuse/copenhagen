---
title: 'Sessions'
---

# Sessions

## Vue d'ensemble

Tout au long de la visite d'un utilisateur sur votre site web, il effectuera plusieurs requêtes à votre serveur. Si vous devez maintenir un état persistant, comme les préférences utilisateur, entre ces requêtes, HTTP ne fournit pas de mécanisme pour cela. C'est un protocole sans état.

Les sessions sont un moyen de persister l'état sur le serveur. Elles sont particulièrement utiles pour gérer l'état d'authentification, comme l'identité du client. Nous pouvons attribuer à chaque session un ID unique et le stocker sur le serveur pour l'utiliser comme jeton. Ensuite, le client peut associer la requête à une session en envoyant l'ID de session avec celle-ci. Pour implémenter l'authentification, nous pouvons simplement stocker les données utilisateur avec la session.

Il est important que l'ID de session soit suffisamment long et aléatoire, sinon quelqu'un pourrait usurper l'identité d'autres utilisateurs en devinant simplement leurs IDs de session. Consultez le guide [Server-side tokens](/content/server-side-tokens) pour générer des IDs de session sécurisés. Les IDs de session peuvent être hachés avant le stockage pour fournir un niveau supplémentaire de sécurité.

Selon votre application, vous pouvez avoir à gérer des sessions uniquement pour les utilisateurs authentifiés, ou pour les utilisateurs authentifiés et non authentifiés. Vous pouvez même gérer deux types de sessions différents - une pour l'authentification et une autre pour l'état non lié à l'authentification.

## Durée de vie des sessions

Si vous ne gérez que des sessions pour les utilisateurs authentifiés, une nouvelle session est créée chaque fois qu'un utilisateur se connecte. Si vous prévoyez de gérer des sessions pour les utilisateurs non authentifiés également, des sessions doivent être automatiquement créées lorsqu'une requête entrante ne comprend pas une session valide. Assurez-vous de ne pas rendre votre application vulnérable aux [attaques de fixations de session](#session-fixation-attacks).

Pour les applications critiques en matière de sécurité, il est crucial que les sessions expirent automatiquement. Cela minimise le temps dont dispose un attaquant pour détourner des sessions. L'expiration doit correspondre à la durée pendant laquelle l'utilisateur est censé utiliser votre application en une seule session.

Cependant, pour les sites web moins critiques, comme une application de médias sociaux, il serait ennuyeux pour les utilisateurs de devoir se connecter chaque jour. Une bonne pratique ici est de fixer l'expiration à une durée raisonnable, comme 30 jours, mais de prolonger l'expiration chaque fois que la session est utilisée. Par exemple, les sessions peuvent expirer par défaut dans 30 jours, mais l'expiration est repoussée de 30 jours lorsqu'elles sont utilisées dans les 15 jours avant l'expiration. Cela invalide efficacement les sessions des utilisateurs inactifs, tout en gardant les utilisateurs actifs connectés.

Vous pouvez également combiner les deux approches. Par exemple, vous pouvez fixer l'expiration à une heure et la prolonger toutes les 30 minutes, mais définir une expiration absolue de 12 heures pour que les sessions ne durent pas plus longtemps que cela.

<!-- go -->

```untype
const sessionExpiresIn = 30 * 24 * time.Hour

func validateSession(sessionId string) (*Session, error) {
	session, ok := getSessionFromStorage(sessionId)
	if !ok {
		return nil, errors.New("invalid session id")
	}
	if time.Now().After(session.ExpiresAt) {
		return nil, errors.New("expired session")
	}
	if time.Now().After(session.expiresAt.Sub(sessionExpiresIn / 2)) {
		session.ExpiresAt = time.Now().Add(sessionExpiresIn)
		updateSessionExpiration(session.Id, session.ExpiresAt)
	}
	return session, nil
}
```

### Mode sudo

Une alternative aux sessions de courte durée est d'implémenter des sessions de longue durée couplées avec le mode sudo. Le mode sudo permet aux utilisateurs authentifiés d'accéder à des composants critiques pour la sécurité pendant une période limitée en se réauthentifiant avec l'une de leurs informations d'identification (mot de passe, clé d'accès, TOTP, etc.). Une façon simple de mettre en œuvre cela est de suivre le moment où l'utilisateur a utilisé ses informations d'identification pour la dernière fois dans chaque session. Cette approche offre les avantages de sécurité des sessions de courte durée sans ennuyer les utilisateurs fréquents. Cela peut également aider à lutter contre le [détournement de session](#session-hijacking).

## Détournement de session

Le détournement de session est un autre terme pour le vol de sessions. Les attaques courantes incluent le cross-site scripting (XSS), les attaques de type man-in-the-middle (MITM) et le sniffing de session. Les attaques MITM sont particulièrement difficiles à atténuer car il incombe finalement aux utilisateurs de protéger leur appareil et leur réseau. Néanmoins, il existe quelques moyens de protéger vos utilisateurs.

Tout d'abord, envisagez de suivre l'agent utilisateur (appareil) et l'adresse IP liés à la session pour détecter les requêtes suspectes. Les adresses IP peuvent être dynamiques pour les utilisateurs mobiles, il peut donc être préférable de suivre la zone générale (pays) plutôt que l'adresse spécifique. Limiter le nombre de sessions connectées à un utilisateur en fonction de ces informations est également une bonne protection.

Étant donné que les adresses IP et les en-têtes de requête peuvent être facilement usurpés, il est recommandé d'implémenter le [mode sudo](#sudo-mode) pour toutes les applications critiques en matière de sécurité.

## Invalidation des sessions

Les sessions peuvent être invalidées en les supprimant du stockage côté serveur et côté client.

Lorsqu'un utilisateur se déconnecte, invalidez la session en cours, ou pour les applications critiques en matière de sécurité, invalidez toutes les sessions appartenant à cet utilisateur.

Toutes les sessions de l'utilisateur doivent également être invalidées lorsqu'il obtient de nouveaux droits (vérification de l'email, nouveau rôle, etc.) ou change de mot de passe.

## Stockage côté client

Le client doit stocker l'ID de session sur l'appareil de l'utilisateur pour être utilisé lors des requêtes suivantes. Le navigateur fournit principalement 2 moyens de stocker les données - les cookies et l'API Web Storage. Les cookies doivent être préférés pour les sites web car ils sont automatiquement inclus dans les requêtes par le navigateur.

### Cookies

Les cookies de session doivent avoir les attributs suivants :

- `HttpOnly`: Les cookies sont accessibles uniquement côté serveur
- `SameSite=Lax`: Utilisez `Strict` pour les sites critiques
- `Secure`: Les cookies ne peuvent être envoyés que via HTTPS
- `Max-Age` ou `Expires`: Doit être défini pour persister les cookies
- `Path=/`: Les cookies peuvent être accessibles depuis toutes les routes

La [protection CSRF](/content/csrf) doit être implémentée lors de l'utilisation de cookies, et l'utilisation du drapeau `SameSite` ne suffit pas. L'utilisation de cookies ne protège pas automatiquement vos utilisateurs contre les attaques cross-site scripting (XSS) non plus. Bien que l'ID de session ne puisse pas être lu directement, des requêtes authentifiées peuvent toujours être effectuées car les navigateurs incluent automatiquement les cookies dans les requêtes.

L'expiration maximale pour un cookie est comprise entre 1 et 2 ans. Si vous prévoyez que la session soit de longue durée, définissez continuellement le cookie à un intervalle défini (par exemple, lorsque vous prolongez l'expiration de la session).

`Lax` doit être préféré à `Strict` pour l'attribut `SameSite` car l'utilisation de`Strict` empêchera le navigateur d'envoyer le cookie de session lorsque l'utilisateur visite votre application via un lien externe.

### Stockage Web API

Une autre option est de stocker les IDs de session dans `localStorage` ou `sessionStorage`. Si votre site web a une vulnérabilité XSS, cela permettra aux attaquants de lire directement et de voler l'ID de session de l'utilisateur. Il est particulièrement vulnérable aux attaques de la chaîne d'approvisionnement, car les jetons peuvent être volés en lisant simplement l'ensemble du stockage local, sans utiliser d'exploits spécifiques à l'application.

Les jetons de session peuvent être envoyés avec la requête en utilisant l'en-tête `Authorization` par exemple. Ne les envoyez pas dans les URLs comme paramètres de requête ou dans les données de formulaire, ni les jetons envoyés de cette manière ne doivent être acceptés.

## Attaques de fixation de session

Les applications qui maintiennent des sessions pour les utilisateurs authentifiés et non authentifiés et réutilisent la session en cours lorsqu'un utilisateur se connecte sont vulnérables aux attaques de fixation de session.

Disons qu'une application permet que l'ID de session soit envoyé dans l'URL comme paramètre de requête. Si un attaquant partage un lien vers la page de connexion avec un ID de session déjà inclus et que l'utilisateur se connecte, l'attaquant a maintenant un ID de session valide pour usurper cet utilisateur. Une attaque similaire peut être effectuée si l'application accepte les IDs de session dans les formulaires ou les cookies, bien que ce dernier nécessite une vulnérabilité XSS pour être exploité.

Cela peut être évité en créant toujours une nouvelle session lorsque l'utilisateur se connecte et en acceptant uniquement les IDs de session via des cookies et des en-têtes de requête.
