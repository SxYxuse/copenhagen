---
title: 'OAuth'
---

# OAuth

## Vue d'ensemble

OAuth est un protocole largement utilisé pour l'autorisation. Il est à la base de fonctionnalités telles que "Sign in with Google" et "Sign in with GitHub". Il permet aux utilisateurs de donner accès à leurs ressources sur un service externe, comme Google, à votre application sans partager leurs identifiants. Plutôt que de mettre en œuvre une authentification basée sur des mots de passe, nous pouvons utiliser OAuth pour laisser un service tiers gérer l'authentification. Vous pouvez ensuite obtenir le profil de l'utilisateur et l'utiliser pour créer des utilisateurs et des sessions.

Dans un flux OAuth de base, l'utilisateur est redirigé vers un service tiers, le service authentifie l'utilisateur, et l'utilisateur est redirigé vers votre application. Un jeton d'accès pour l'utilisateur est alors disponible, permettant de demander des ressources au nom de l'utilisateur.

Cela nécessite 2 points de terminaison serveur dans votre application :

1. Point de terminaison de connexion (GET) : Redirige l'utilisateur vers le fournisseur OAuth.
2. Point de terminaison de rappel (GET) : Gère la redirection depuis le fournisseur OAuth.

Il existe plusieurs versions d'OAuth, la plus récente étant OAuth 2.0. Cette page ne couvrira que OAuth 2.0, en particulier le type d'octroi de code d'autorisation, comme standardisé dans la [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749). Le type d'octroi implicite est obsolète et ne doit pas être utilisé.

## Création de l'URL d'autorisation

En utilisant GitHub comme exemple, la première étape consiste à créer un point de terminaison GET (point de terminaison de connexion) qui redirige l'utilisateur vers GitHub. La destination de redirection est l'URL d'autorisation avec quelques paramètres.

```untype
https://github.com/login/oauth/authorize?
response_type=code
&client_id=<CLIENT_ID>
&redirect_uri=<CALLBACK_ENDPOINT>
&state=<STATE>
```

Le paramètre `state` est utilisé pour s'assurer que l'utilisateur initiant le processus et celui qui est redirigé (dans la section suivante) sont le même utilisateur. Ainsi, un nouvel état doit être généré à chaque demande. Bien qu'il ne soit pas strictement requis par la spécification, il est fortement recommandé et peut être requis en fonction du fournisseur. Il doit être généré à l'aide d'un générateur aléatoire cryptographiquement sécurisé et avoir au moins 112 bits d'entropie. Le `state` peut également être utilisé pour transmettre des données du point de terminaison de connexion au point de terminaison de rappel, bien qu'un cookie puisse également être utilisé à la place.

Votre serveur doit suivre l'état associé à chaque tentative. Une approche simple consiste à le stocker sous forme de cookie avec les attributs `HttpOnly`, `SameSite=Lax`, `Secure`, et `Path=/`. Vous pouvez également assigner l'état à la session en cours.

Vous pouvez définir un paramètre `scope` pour demander l'accès à des ressources supplémentaires. Si vous avez plusieurs portées, elles doivent être séparées par des espaces.

```untype
&scope=email%20identity
```

Vous pouvez créer un bouton "Se connecter" en ajoutant un lien vers le point de terminaison de connexion.

<!-- html -->

```untype
<a href="/login/github">Se connecter avec GitHub</a>
```

## Validation du code d'autorisation

L'utilisateur sera redirigé vers le point de terminaison de rappel (tel que défini dans `redirect_uri`) avec un code d'autorisation à usage unique, inclus comme paramètre de requête. Ce code est ensuite échangé contre un jeton d'accès.

```untype
https://example.com/login/github/callback?code=<CODE>&state=<STATE>
```

Si vous ajoutez un état à l'URL d'autorisation, la requête de redirection inclura un paramètre `state`. Il est crucial de vérifier qu'il correspond à l'état associé à la tentative. Retournez une erreur si l'état est manquant ou s'ils ne correspondent pas. Une erreur courante consiste à oublier de vérifier si le paramètre `state` existe dans l'URL.

Le code est envoyé au point de terminaison du jeton du fournisseur OAuth via une requête POST `application/x-www-form-urlencoded`.

```untype
POST https://github.com/login/oauth/access_token
Accept: application/json
Authorization: Basic <CREDENTIALS>
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&client_id=<CLIENT_ID>
&redirect_uri=<CALLBACK_ENDPOINT>
&code=<CODE>
```

Si votre fournisseur OAuth utilise un secret client, il doit être encodé en base64 avec l'ID client et le secret inclus dans l'en-tête d'autorisation (schéma d'autorisation HTTP basic).

<!-- go -->

```untype
var clientId, clientSecret string
credentials := base64.StdEncoding.EncodeToString([]byte(clientId + ":" + clientSecret))
```

Certains fournisseurs permettent également d'inclure le secret client dans le corps de la requête.

```untype
POST https://github.com/login/oauth/access_token
Accept: application/json
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&client_id=<CLIENT_ID>
&client_secret=<CLIENT_SECRET>
&redirect_uri=<CALLBACK_ENDPOINT>
&code=<CODE>
```

La requête retournera un jeton d'accès, qui peut ensuite être utilisé pour obtenir l'identité de l'utilisateur. Elle peut également inclure d'autres champs tels que `refresh_token` et `expires_in`.

```untype
{ "access_token": "<ACCESS_TOKEN>" }
```

Par exemple, en utilisant le jeton d'accès, vous pouvez obtenir leur profil GitHub et stocker leur ID utilisateur GitHub, ce qui vous permettra d'obtenir leur compte enregistré lorsqu'ils se reconnecteront. Soyez conscient que l'adresse e-mail fournie par le fournisseur OAuth peut ne pas être vérifiée. Vous devrez peut-être vérifier manuellement les e-mails des utilisateurs ou bloquer les utilisateurs sans e-mail vérifié.

Le jeton d'accès lui-même ne doit jamais être utilisé comme substitut aux sessions.

## Flux de preuve de clé pour l'échange de code (PKCE)

PKCE a été introduit dans la [RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636) pour fournir une protection supplémentaire pour OAuth 2.0. Nous recommandons de l'utiliser en plus de `state` et d'un secret client si votre fournisseur OAuth le supporte. Sachez que certains fournisseurs OAuth n'exigent pas de secret client lorsque PKCE est activé, auquel cas PKCE ne devrait pas être utilisé.

PKCE peut remplacer complètement `state`, car les deux protègent contre les attaques CSRF, mais il peut être requis par votre fournisseur OAuth.

Un nouveau vérificateur de code doit être généré à chaque demande. Il doit être généré à l'aide d'un générateur aléatoire cryptographiquement sécurisé et avoir au moins 112 bits d'entropie (256 bits recommandés par la RFC). Comme pour `state`, votre application doit suivre le vérificateur de code associé à chaque tentative (en utilisant des cookies ou des sessions). Un hachage SHA256 encodé en base64url (sans remplissage) de celui-ci, appelé un défi de code, est inclus dans l'URL d'autorisation.

<!-- go -->

```untype
var codeVerifier string
codeChallengeBuf := sha256.Sum256([]byte(codeVerifier))
codeChallenge := base64.URLEncoding.WithPadding(base64.NoPadding).EncodeToString(codeChallengeBuf)
```

```untype
https://accounts.google.com/o/oauth2/v2/auth?
response_type=code
&client_id=<...>
&redirect_uri=<...>
&state=<...>
&code_challenge_method=S256
&code_challenge=<CODE_CHALLENGE>
```

Dans le point de terminaison de rappel, le vérificateur de code de la tentative actuelle doit être envoyé en même temps que le code d'autorisation.

```untype
POST https://oauth2.googleapis.com/token
Accept: application/json
Authorization: Basic <CREDENTIALS>
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&client_id=<...>
&redirect_uri=<...>
&code=<...>
&code_verifier=<CODE_VERIFIER>
```

## OpenID Connect (OIDC)

[OpenID Connect](https://openid.net/specs/openid-connect-core-1_0.html) est un protocole largement utilisé basé sur OAuth 2.0. Une addition importante à OAuth est que le fournisseur d'identité renvoie un jeton d'ID en plus du jeton d'accès. Un jeton d'ID est un [JSON Web Token](https://datatracker.ietf.org/doc/html/rfc7519) qui inclut les données utilisateur. Il inclura toujours un identifiant unique pour l'utilisateur dans le champ `sub`.

```untype
{
	"access_token": "<ACCESS_TOKEN>",
	"id_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaXNzIjoiZXhhbXBsZS5jb20ifQ.uMMQPfp7LwcLiBbfZdoHdIPjKgS2HUfOr5vlY71el8A"
}
```

Bien que vous puissiez valider le jeton avec une clé publique,

ce n'est pas strictement nécessaire pour les applications côté serveur si vous utilisez HTTPS pour les communications.

### Découverte OpenID Connect

OpenID Connect définit un [mécanisme de découverte](https://openid.net/specs/openid-connect-discovery-1_0.html) qui permet aux clients de récupérer dynamiquement la configuration du fournisseur OpenID, y compris les emplacements des points de terminaison OAuth 2.0. Cela élimine la nécessité de coder en dur les URL des points de terminaison dans votre application. Pour utiliser la découverte OpenID Connect, votre fournisseur OpenID doit avoir un point de terminaison de découverte disponible.

Le point de terminaison de découverte est une URL bien connue qui renvoie un document JSON contenant les informations de configuration du fournisseur OpenID. Notez que tous les fournisseurs OAuth ne supportent pas la découverte OpenID Connect. Consultez la documentation de votre fournisseur pour déterminer s'ils offrent un point de terminaison de découverte. Sinon, vous devrez peut-être toujours configurer manuellement les URL des points de terminaison dans votre application.

L'URL bien connue a le chemin `/.well-known/openid-configuration`. Par exemple, le point de terminaison de découverte de Google ressemble à ceci :

```untype
https://accounts.google.com/.well-known/openid-configuration
```

Le point de terminaison retournera un objet JSON contenant la configuration du fournisseur OpenID, y compris les URL des points de terminaison pour l'autorisation, l'échange de jetons et la récupération des informations utilisateur.

<!-- json -->

```untype
{
	"issuer": "https://example.com",
	"authorization_endpoint": "https://example.com/oauth2/authorize",
	"token_endpoint": "https://example.com/oauth2/token",
	"userinfo_endpoint": "https://example.com/oauth2/userinfo",
	"code_challenge_methods_supported": ["S256"],
	"grant_types_supported": ["authorization_code", "refresh_token"],
	"scopes_supported": ["openid", "email", "profile"]
}
```

Avec la découverte OpenID Connect, votre application peut s'adapter dynamiquement aux changements dans la configuration du fournisseur OpenID sans nécessiter de mises à jour du code. Cela garantit que votre application utilise toujours les URL des points de terminaison les plus récentes. L'inconvénient est que vous devrez effectuer des requêtes supplémentaires.

## Liaison de comptes

La liaison de comptes permet aux utilisateurs de se connecter avec n'importe lequel de leurs comptes sociaux et d'être authentifiés en tant que même utilisateur sur votre application. Cela se fait généralement en vérifiant l'adresse e-mail enregistrée auprès du fournisseur. Si vous utilisez l'email pour lier les comptes, assurez-vous de valider l'email de l'utilisateur. La plupart des fournisseurs fournissent un champ `is_verified` ou similaire dans les profils utilisateur. Ne supposez pas que l'email est vérifié à moins que le fournisseur ne le mentionne explicitement dans leur documentation. Les utilisateurs sans email vérifié doivent être empêchés de terminer le processus d'authentification et invités à vérifier leur email d'abord.

## Autres considérations

- [Redirection ouverte](/content/open-redirect)
