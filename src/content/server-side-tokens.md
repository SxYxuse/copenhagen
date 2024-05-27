---
title: 'Server-side tokens'
---

# Server-side tokens

## Vue d'ensemble

Un "Server-side token" est une chaîne longue et aléatoire qui est stockée sur le serveur. Il peut être persisté dans une base de données ou un stockage de données en mémoire (par exemple Redis) et est utilisé pour l'authentification et la vérification. Un jeton peut être validé en vérifiant s'il existe dans le stockage. Les exemples incluent les identifiants de session, les jetons de vérification d'e-mail et les jetons d'accès.

```untype
CREATE TABLE token (
	token STRING NOT NULL UNIQUE,
	expires_at INTEGER NOT NULL,
	user_id INTEGER NOT NULL,

	FOREIGN KEY (user_id) REFERENCES user(id)
)
```

Pour les jetons à usage unique, toute récupération doit également garantir la suppression. Par exemple, en SQL, une opération atomique telle qu'une transaction doit être utilisée lors de la récupération d'un jeton.

## Génération de jetons

Les jetons doivent avoir au moins 112 bits d'entropie (120-256 est une bonne plage). Par exemple, vous pouvez générer 15 octets aléatoires et les encoder en base32 pour obtenir un jeton de 24 caractères. Si vous générez des jetons en choisissant des caractères aléatoires un par un, vous devez vous assurer d'un niveau d'entropie similaire. Consultez la page [Génération de valeurs aléatoires](/content/random-values) pour plus d'informations.

Les jetons doivent être générés à l'aide d'un générateur de nombres aléatoires cryptographiquement sécurisé. Les générateurs rapides et pseudo-aléatoires, comme ceux généralement fournis par les packages mathématiques standard, doivent être évités à cet effet.

Les jetons doivent être sensibles à la casse, mais vous voudrez peut-être limiter la génération de vos jetons à des lettres minuscules si votre stockage est insensible à la casse (par exemple, MySQL).

> Pour un jeton de 120 bits, il faudrait à quelqu'un 2 quintillions d'années avant de deviner un jeton valide s'ils génèrent 10 000 jetons par seconde et qu'il y a 1 000 000 de jetons valides dans le système.

<!-- go -->

```untype
import (
	"crypto/rand"
	"encoding/base32"
)

bytes := make([]byte, 15)
rand.Read(bytes)
sessionId := base32.StdEncoding.EncodeToString(bytes)
```

UUID v4 peut répondre à ces exigences (122 bits d'entropie), mais gardez à l'esprit que UUID v4 est inefficace en termes d'espace et que la spécification ne garantit pas l'utilisation d'un générateur aléatoire cryptographiquement sécurisé.

## Stockage des jetons

Les jetons qui nécessitent un niveau de sécurité supplémentaire, tels que les jetons de réinitialisation de mot de passe, doivent être hachés avec SHA-256. SHA-256 peut être utilisé à la place d'un algorithme plus lent ici car le jeton est suffisamment long et aléatoire. Les jetons peuvent être validés en hachant le jeton entrant avant la requête.

Les exemples concrets de fuites accidentelles incluent [Paleohacks](https://www.vpnmentor.com/blog/report-paleohacks-breach/) and [Spoutible](https://www.troyhunt.com/how-spoutibles-leaky-api-spurted-out-a-deluge-of-personal-data/).
