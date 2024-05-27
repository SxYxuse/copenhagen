---
title: 'Multi-factor authentication (MFA)'
---

# Multi-factor authentication (MFA)

## Overview

La MFA exige qu'un utilisateur fournisse plus qu'un simple mot de passe pour s'authentifier. Il existe principalement 5 types de facteurs :

- Quelque chose que vous savez : Mots de passe
- Quelque chose que vous avez : Appareil, adresse e-mail, SMS
- Quelque chose que vous êtes : Biométrie
- Où vous êtes
- Quelque chose que vous faites

## Time-based one-time passwords (TOTP)

Le TOTP est défini dans la [RFC 6238](https://datatracker.ietf.org/doc/html/rfc6238), qui est basée sur les mots de passe à usage unique basés sur le hachage (HOTP), définis dans la [RFC 4226](https://www.ietf.org/rfc/rfc4226.txt).

Le TOTP standard utilise une application d'authentification, généralement installée sur le dispositif mobile de l'utilisateur, pour générer un code pour l'utilisateur.

Chaque utilisateur possède une clé secrète. Celle-ci est partagée avec l'application d'authentification de l'utilisateur par un code QR. En utilisant cette clé secrète et l'heure actuelle, l'application d'authentification peut générer un nouveau OTP. Votre application demande le OTP actuel et peut le valider en en générant un en utilisant les mêmes paramètres. Étant donné que l'heure actuelle est utilisée pour générer le code, chaque code n'est valide que pour une période définie (généralement 30 secondes).

### Generate QR code

HMAC SHA-1 est utilisé pour générer les TOTPs. La clé secrète est exactement de 160 bits et doit être générée à l'aide d'un générateur aléatoire cryptographiquement sécurisé. Chaque utilisateur doit avoir sa propre clé secrète, qui doit être stockée sur votre serveur. La clé secrète peut être chiffrée avant le stockage si vous craignez de divulguer accidentellement les enregistrements de votre base de données. Il est important de se rappeler que le chiffrement des données ne protégera pas contre les attaquants ayant un accès au niveau du système à vos serveurs.

Pour partager la clé secrète, générez une [URI de clé](https://github.com/google/google-authenticator/wiki/Key-Uri-Format) et encodez-la dans un code QR. La `secret` est encodée en base32.

Vous devez vérifier que l'utilisateur a correctement scanné le code QR en demandant le OTP généré.

```untype
otpauth://totp/example%20app:John%20Doe?secret=JBSWY3DPEHPK3PXP&issuer=Example%20App&digits=6&period=30
```

Lorsque l'utilisateur demande un nouveau code QR, générez une nouvelle clé secrète et invalidez la précédente.

### Validate OTPs

Pour valider un TOTP, nous devons d'abord en générer un.

Les HOTPs sont générés en signant une valeur de compteur avec HMAC. Dans HOTP, le compteur est un entier qui est incrémenté chaque fois qu'un nouveau code est généré. Mais dans TOTP, le compteur est le temps UNIX actuel divisé par l'intervalle (généralement 30 secondes) avec la partie fractionnaire tronquée.

Le compteur, qui doit être de 8 octets, est haché avec HMAC SHA-1. 4 octets sont extraits en utilisant un décalage. Ensuite, les 31 derniers bits sont extraits et convertis en entier. Enfin, les 6 derniers chiffres sont utilisés comme OTP.

<!-- go -->

```untype
import (
	"crypto/hmac"
	"crypto/sha1"
	"encoding/binary"
	"fmt"
	"math"
)

func generateTOTP(secret []byte) string {
	digits := 6
	counter := time.Now().Unix() / 30

	// HOTP
	mac := hmac.New(sha1.New, secret)
	buf := make([]byte, 8)
	binary.BigEndian.PutUint64(buf, uint64(counter))
	mac.Write(buf)
	HS := mac.Sum(nil)
	offset := HS[19] & 0x0f
	Snum := binary.BigEndian.Uint32(HS[offset:offset+4]) & 0x7fffffff
	D := Snum % int(math.Pow(10, float64(digits)))
	// Pad "0" to make it 6 digits.
	return fmt.Sprintf("%06d", D)
}
```

Pour valider un OTP, vous pouvez simplement en générer un de votre côté et vérifier s'il correspond à celui fourni par l'utilisateur.

La limitation des tentatives doit être mise en œuvre. Un exemple de base est de bloquer les tentatives pendant 15 à 60 minutes après la 5e tentative échouée consécutive. L'utilisateur doit également être invité à changer le mot de passe.

## SMS

Nous déconseillons l'utilisation de la MFA basée sur les SMS car elle peut être interceptée et est parfois peu fiable. Cependant, elle peut être plus accessible que l'utilisation d'applications d'authentification. Voir le [guide des codes de vérification par e-mail](/content/email-verification#email-verification-codes) pour un guide sur la mise en œuvre des codes de vérification. Le code doit être valide pendant environ 5 minutes.

La limitation des tentatives doit être mise en œuvre. Un exemple de base est de bloquer les tentatives pendant 15 à 60 minutes après la 5e tentative échouée consécutive. L'utilisateur doit également être invité à changer le mot de passe.

## Passkeys

Les Passkeys vous permettent d'utiliser des méthodes d'authentification sur l'appareil, telles que la biométrie et les codes PIN. Voir le [guide Passkeys](/content/passkeys).

## Recovery codes

Si votre application utilise la MFA, nous recommandons de fournir aux utilisateurs un ou plusieurs codes de récupération. Ce sont des mots de passe à usage unique qui peuvent être utilisés à la place des passkeys/OTPs pour se connecter et réinitialiser leur second facteur lorsqu'un utilisateur perd l'accès à ses appareils. Les codes doivent être générés à l'aide d'un générateur aléatoire cryptographiquement sécurisé. Ils peuvent être générés avec seulement 40 bits d'entropie (10 caractères lorsqu'ils sont encodés en hexadécimal) en supposant que la limitation des tentatives est mise en œuvre.

À moins que vous ne puissiez stocker ces codes en toute sécurité, nous recommandons de les hacher avec votre algorithme de hachage de mot de passe préféré (par exemple, Argon2id). Dans ce cas, les codes ne sont visibles que la première fois que l'utilisateur enregistre son second facteur. L'utilisateur doit également avoir la possibilité de les régénérer s'il a accès à son second facteur.
