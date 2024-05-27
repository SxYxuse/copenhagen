---
title: 'Passkeys'
---

# Clés d'accès

## Vue d'ensemble

Les clés d'accès sont basées sur le standard [Web Authentication (WebAuthn)](https://www.w3.org/TR/webauthn-2/) et permettent aux applications d'authentifier les utilisateurs via des méthodes d'authentification intégrées dans les appareils, y compris les biométries et les codes PIN. Elles peuvent être plus sécurisées que les mots de passe traditionnels car elles ne nécessitent pas que l'utilisateur se souvienne de ses mots de passe. Elles peuvent remplacer complètement les mots de passe ou être utilisées en plus des mots de passe comme [second facteur](/content/mfa).

Les clés d'accès sont basées sur la cryptographie à clé publique, où chaque utilisateur possède une paire de clés publique-privée. La clé privée est stockée dans l'appareil de l'utilisateur, tandis que la clé publique est stockée dans votre application. L'appareil crée une signature avec la clé privée et votre application peut utiliser la clé publique pour la vérifier.

## Défi

Chaque attestation et assertion est associée à un défi. Un défi est un [jeton](/content/server-side-tokens) à usage unique généré aléatoirement et stocké sur le serveur pour empêcher les attaques de relecture. L'entropie minimale recommandée est de 16 octets.

## Enregistrement

Sur le client, obtenez un nouveau défi du serveur et créez un nouvel identifiant avec l'[API Web Authentication](https://developer.mozilla.org/fr/docs/Web/API/Web_Authentication_API). Cela invite l'utilisateur à s'authentifier avec son appareil. Les navigateurs comme Safari ne permettront d'appeler cette méthode que si elle a été initiée par une interaction utilisateur (clic sur un bouton).

```typescript
const publicKeyCredential: PublicKeyCredential = await navigator.credentials.create({
	publicKey: {
		rp: { name: 'My app' },
		user: {
			id: crypto.getRandomValues(new Uint8Array(32)),
			name: userId,
			displayName: username
		},
		pubKeyCredParams: [
			{
				type: 'public-key',
				// ECDSA avec SHA-256
				alg: -7
			}
		],
		challenge
	}
});
const response: AuthenticatorAttestationResponse = publicKeyCredential.response;

const publicKey: ArrayBuffer = response.getPublicKey();
const clientDataJSON: ArrayBuffer = response.clientDataJSON;
const authenticatorData: ArrayBuffer = response.getAuthenticatorData();
const credentialId: string = publicKeyCredential.id;
```

- `rp.name` : Le nom de votre application
- `user.id` : ID aléatoire
- `user.name` : Identifiant unique de l'utilisateur (ID utilisateur, nom d'utilisateur, e-mail)
- `user.displayName` : Ne doit pas nécessairement être unique

L'ID de l'algorithme est tiré du [registre IANA des algorithmes COSE](https://www.iana.org/assignments/cose/cose.xhtml). L'ECDSA avec SHA-256 (ES256) est recommandé car il est largement supporté. Vous pouvez également passer `-257` pour RSASSA-PKCS1-v1_5 (RS256) pour prendre en charge une gamme plus large d'appareils, bien que les appareils ne supportant que celui-ci soient rares.

La clé publique, les données du client, les données de l'authentificateur, l'ID de l'identifiant et le défi sont envoyés au serveur pour vérification. Une façon simple d'envoyer des données binaires est de les encoder en base64.

La première étape consiste à valider le défi. Assurez-vous de supprimer le défi du stockage car il est à usage unique. Ensuite, vérifiez les données du client et de l'authentificateur. L'origine est le domaine sur lequel votre application est hébergée, y compris le protocole et le port, et l'ID de la partie de confiance est le domaine sans le protocole ni le port.

```go
import (
	"bytes"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"errors"
)

var challenge []byte

// Vérifiez le défi et supprimez-le du stockage.

var publicKey, clientDataJSON, authenticatorData []byte
var credentialId string

var clientData ClientData
json.Unmarshal(clientDataJSON, &clientData)

if clientData.Type != "webauthn.create" {
	return errors.New("type invalide")
}
if clientData.Challenge != base64.URLEncoding.WithPadding(base64.NoPadding).EncodeToString(challenge) {
	return errors.New("défi invalide")
}
if clientData.Origin != "https://example.com" {
	return errors.New("origine invalide")
}

if len(authenticatorData) < 37 {
	return errors.New("données de l'authentificateur invalides")
}
rpIdHash := authenticatorData[0:32]
expectedRpIdHash := sha256.Sum256([]byte("example.com"))
if bytes.Equal(rpIdHash, expectedRpIdHash[:]) {
	return errors.New("ID de la partie de confiance invalide")
}
// Vérifiez le drapeau "utilisateur présent".
if (authenticatorData[32] & 1) != 1 {
	return errors.New("drapeau invalide")
}

type ClientData struct {
	Type	  string `json:"type"`
	Challenge string `json:"challenge"`
	Origin	string `json:"origin"`
}
```

Optionnellement, validez l'énoncé d'attestation pour vérifier que l'attestation provient d'un appareil légitime. Cependant, à moins que votre application n'ait des exigences de sécurité strictes ou doive vérifier l'authenticité de l'appareil de l'utilisateur, cela est probablement inutile.

Les données de l'authentificateur incluent également un compteur de signatures qui est incrémenté à chaque nouvelle signature générée, ce qui peut être utilisé pour détecter les authentificateurs clonés. Cependant, pour les clés d'accès en particulier, cela n'est pas nécessaire car les identifiants sont conçus pour être exportés et partagés.

Enfin, vérifiez si la clé publique est valide et créez un nouvel utilisateur avec sa clé publique et l'ID de l'identifiant. La clé publique est au format SubjectPublicKeyInfo. Si vous supportez plusieurs algorithmes, vous pouvez analyser la clé publique pour obtenir l'identifiant de l'algorithme.

## Authentification

Générez un défi sur le serveur et utilisez-le pour authentifier l'utilisateur côté client.

```typescript
const publicKeyCredential: PublicKeyCredential = await navigator.credentials.get({
	publicKey: {
		challenge
	}
});

const response: AuthenticatorAssertionResponse = publicKeyCredential.response;
const clientDataJSON: ArrayBuffer = response.clientDataJSON;
const authenticatorData: ArrayBuffer = response.authenticatorData;
const signature: ArrayBuffer = response.signature;
const credentialId: string = publicKeyCredential.id;
```

Les données du client, les données de l'authentificateur, la signature, le défi et l'ID de l'identifiant sont envoyés au serveur. Le défi, l'authentificateur et les données du client sont d'abord vérifiés. Cette partie est presque identique aux étapes de vérification de l'attestation.

```go
import (
	"bytes"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"errors"
)

var challenge []byte

// Vérifiez le défi et supprimez-le du stockage.

var clientDataJSON, authenticatorData []byte

var clientData ClientData
json.Unmarshal(clientDataJSON, &clientData)

if clientData.Type != "webauthn.get" {
	return errors.New("type invalide")
}
if clientData.Challenge != base64.URLEncoding.WithPadding(base64.NoPadding).EncodeToString(challenge) {
	return errors.New("défi invalide")
}
if clientData.Origin != "https://example.com" {
	return errors.New("origine invalide")
}

if len(authenticatorData) < 37 {
	return errors.New("données de l'authentificateur invalides")
}
rpIdHash := authenticatorData[0:32]
expectedRpIdHash := sha256.Sum256([]byte("example.com"))
if !bytes.Equal(rpIdHash, expectedRpIdHash[:]) {
	return errors.New("ID de la partie de confiance invalide")
}
// Vérifiez le drapeau "utilisateur présent".
if (authenticatorData[32] & 1) != 1 {
	return errors.New("drapeau invalide")
}
```

L'étape suivante consiste à vérifier la signature. Utilisez l'ID de l'identifiant pour obtenir la clé publique de l'utilisateur et vérifiez la signature, qui est encodée en ASN.1 DER. L'algorithme dépend des paramètres passés lors de la création de l'identifiant.

```go
import (
	"crypto/ecdsa"
	"crypto/sha256"
	"errors"
)

var publicKey *ecdsa.PublicKey
var signature []byte

hashedClientDataJSON := sha256.Sum256(clientDataJSON)
// Concaténez les données de l'authentificateur avec les données JSON du client hachées.
data := append(authenticatorData, hashedClientDataJSON[:]...)
hash := sha256.Sum256(data)

validSignature := ecdsa.VerifyASN1(publicKey, hash[:], signature)
if !validSignature {
	return errors.New("signature invalide")
}
```
