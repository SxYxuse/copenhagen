---
title: 'Falsification de requête intersite (CSRF)'
---

# Falsification de requête intersite (CSRF)

## Vue d'ensemble

Les attaques CSRF permettent à un attaquant de faire des requêtes authentifiées au nom des utilisateurs lorsque les identifiants sont stockés dans des cookies.

Lorsqu'un client effectue une requête cross-origin, le navigateur envoie une requête préliminaire pour vérifier si la requête est autorisée (CORS). Cependant, pour certaines requêtes "simples", y compris les soumissions de formulaires, cette étape est omise. Et comme les cookies sont automatiquement inclus même pour les requêtes cross-origin, cela permet à un acteur malveillant de faire des requêtes comme utilisateur authentifié sans jamais voler directement le jeton d'aucun domaine. La [politique de même origine](https://developer.mozilla.org/fr/docs/Web/Security/Same-origin_policy) interdit aux clients cross-origin de lire les réponses par défaut, mais la requête passe quand même.

Par exemple, si vous êtes connecté à `banque.com`, votre cookie de session sera envoyé avec cette soumission de formulaire même si le formulaire est hébergé sur un domaine différent.

<!-- html -->

```untype
<form action="https://banque.com/envoyer-argent" method="post">
	<input name="recipient" value="attaquant" />
	<input name="value" value="$100" />
	<button>Envoyer de l'argent</button>
</form>
```

Cela peut simplement être une requête `fetch()`, donc aucune entrée utilisateur n'est requise.

<!-- ts -->

```untype
const body = new URLSearchParams();
body.set('recipient', 'attaquant');
body.set('value', '$100');

await fetch('https://banque.com/envoyer-argent', {
	method: 'POST',
	body
});
```

### Cross-site vs cross-origin

Bien que les requêtes entre deux domaines totalement différents soient considérées à la fois comme cross-site et cross-origin, celles entre deux sous-domaines ne sont pas considérées comme cross-site mais sont considérées comme des requêtes cross-origin. Bien que le nom de falsification de requête intersite implique des requêtes cross-site, vous devriez être strict par défaut et protéger votre application contre les attaques cross-origin également.

## Prévention

Les attaques CSRF peuvent être évitées en n'acceptant que les requêtes POST et similaires (PUT, DELETE, etc.) faites par les navigateurs à partir d'une origine de confiance.

La protection doit être mise en œuvre pour toutes les routes qui traitent des formulaires. Si votre application n'utilise actuellement pas de formulaires, il peut néanmoins être judicieux de vérifier au moins l'[en-tête `Origin`](#origin-header) pour éviter les problèmes futurs. Il est également généralement bon de n'utiliser que des requêtes POST et similaires pour modifier des ressources.

Pour la méthode courante basée sur des jetons, le jeton ne doit pas être à usage unique (par exemple, un nouveau jeton pour chaque soumission de formulaire) car cela se casserait avec un seul bouton de retour. Il est également crucial que vos pages aient une politique stricte de partage de ressources cross-origin (CORS). Si `Access-Control-Allow-Credentials` n'est pas strict, un site malveillant peut envoyer une requête GET pour obtenir un formulaire HTML avec un jeton CSRF valide.

### Jetons anti-CSRF

Il s'agit d'une méthode très simple où chaque session a un jeton CSRF [unique](/content/server-side-tokens) associé.

<!-- html -->

```untype
<form method="post">
	<input name="message" />
	<input type="hidden" name="__csrf" value="<CSRF_TOKEN>" />
	<button>Soumettre</button>
</form>
```

### Cookies double soumission signés

Si le stockage du jeton côté serveur n'est pas une option, l'utilisation de cookies double soumission signés est une autre approche. Cela diffère du simple cookie double soumission en ce que le jeton inclus dans le formulaire est signé avec un secret.

Un nouveau [jeton](/content/server-side-tokens) est généré et haché avec HMAC SHA-256 en utilisant une clé secrète.

<!-- go -->

```untype
func generateCSRFToken() (string, []byte) {
	buffer := [10]byte{}
	crypto.rand.Read(buffer)
	csrfToken := base64.StdEncoding.encodeToString(buffer)
	mac := hmac.New(sha256.New, secret)
	mac.Write([]byte(csrfToken))
	csrfTokenHMAC := mac.Sum(nil)
	return csrfToken, csrfTokenHMAC
}

// Optionnellement, lier le cookie à un identifiant de session spécifique.
func generateCSRFToken(sessionId string) (string, []byte) {
	// ...
	mac.Write([]byte(csrfToken + "." + sessionId))
	csrfTokenHMAC := mac.Sum(nil)
	return csrfToken, csrfTokenHMAC
}
```

Le jeton est stocké sous forme de cookie et le HMAC est stocké dans le formulaire. Le cookie doit avoir les drapeaux `Secure`, `HttpOnly` et `SameSite`. Pour valider une requête, le cookie peut être utilisé pour vérifier la signature envoyée dans les données du formulaire.

#### Cookies double soumission traditionnels

Les cookies double soumission réguliers qui ne sont pas signés vous laisseront toujours vulnérables si un attaquant a accès à un sous-domaine du domaine de votre application. Cela leur permettrait de définir leurs propres cookies double soumission.

### En-tête Origin

Une façon très simple de prévenir les attaques CSRF est de vérifier l'en-tête `Origin` de la requête pour les requêtes non-GET. Il s'agit d'un en-tête relativement nouveau qui inclut l'[origine](https://developer.mozilla.org/fr/docs/Glossary/Origin) de la requête. Si vous vous appuyez sur cet en-tête, il est crucial que votre application n'utilise pas de requêtes GET pour modifier des ressources.

Bien que l'en-tête `Origin` puisse être usurpé en utilisant un client personnalisé, l'important est que cela ne peut pas être fait en utilisant du JavaScript côté client. Les utilisateurs ne sont vulnérables aux CSRF que lorsqu'ils utilisent un navigateur.

<!-- go -->

```untype
func handleRequest(w http.ResponseWriter, request *http.Request) {
  	if request.Method != "GET" {
		originHeader := request.Header.Get()
		// Vous pouvez également le comparer avec l'en-tête Host ou X-Forwarded-Host.
		if originHeader != "https://example.com" {
			// Origine de requête non valide
			w.WriteHeader(403)
			return
		}
  	}
  	// ...
}
```

L'en-tête `Origin` est pris en charge par tous les navigateurs modernes depuis environ 2020, bien que Chrome et Safari l'aient pris en charge avant cela. Si l'en-tête `Origin` n'est pas inclus, n'autorisez pas la requête.

L'en-tête `Referer` est un en-tête similaire introduit avant l'en-tête `Origin`. Cela peut être utilisé en tant que solution de repli si l'en-tête `Origin` n'est pas défini.

## Attribut SameSite des cookies

Les cookies de session doivent avoir un drapeau `SameSite`. Ce drapeau détermine quand le navigateur inclut le cookie dans les requêtes. Les cookies `SameSite=Lax` ne seront envoyés dans les requêtes cross-site que si la requête utilise une [méthode HTTP sûre](https://developer.mozilla.org/fr/docs/Glossary/Safe/HTTP) (comme GET), tandis que les cookies `SameSite=Strict` ne seront envoyés dans aucune requête cross-site. Nous recommandons d'utiliser `Lax` par défaut car les cookies `Strict` ne seront pas envoyés lorsqu'un utilisateur accède à votre site via un lien externe.

Si vous définissez la valeur sur `Lax`, il est crucial que votre application n'utilise pas de requêtes GET pour modifier des ressources. Le support des navigateurs pour le drapeau `SameSite` montre qu'il est actuellement disponible pour 96 % des utilisateurs web. Il est important de noter que le drapeau ne protège que contre la falsification de requête cross-site (_cross-site_ request forgery) (et non la falsification de requête cross-origin (_cross-origin_ request forgery)), et ne devrait généralement pas être votre seule couche de défense.
