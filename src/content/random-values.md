---
title: 'Génération de valeurs aléatoires'
---

# Génération de valeurs aléatoires

## Vue d'ensemble

Les générateurs pseudo-aléatoires souvent fournis par le package mathématique standard sont rapides mais prévisibles. Lorsqu'il s'agit de cryptographie, avoir accès à un générateur aléatoire fort est essentiel.

Cette page décrit comment générer des chaînes et des nombres aléatoires à partir de bits générés de manière aléatoire.

## Chaînes aléatoires

La manière la plus facile et la plus sûre de générer des chaînes aléatoires est de générer des octets aléatoires et de les encoder avec des schémas d'encodage base16 (hex), base32 ou base64.

<!-- go -->

```untype
import (
	"crypto/rand"
	"encoding/base32"
)

func generateRandomString() string {
	bytes := make([]byte, 12)
	rand.Read(bytes)
	return base32.StdEncoding.EncodeToString(bytes)
}
```

### Ensemble de caractères personnalisé

Si la longueur de l'ensemble de caractères correspond à un schéma d'encodage existant (par exemple, base64), vous pouvez personnaliser les caractères utilisés.

<!-- go -->

```untype
import (
	"crypto/rand"
	"encoding/base32"
)

var customEncoding = base32.NewEncoding("0123456789ABCDEFGHJKMNPQRSTVWXYZ")

func generateRandomString() string {
	bytes := make([]byte, 12)
	rand.Read(bytes)
	return customEncoding.EncodeToString(bytes)
}
```

Sinon, vous auriez besoin d'un générateur de nombres aléatoires de haute qualité pour générer un entier dans une plage personnalisée.

<!-- go -->

```untype
const alphabet = "abcdefg"

func generateRandomString() string {
	var result string
	for i := 0; i < 12; i ++ {
		result += string(alphabet[generateRandomInt(0, len(alphabet))])
	}
	return result
}
```

## Entiers aléatoires

Si la plage est une puissance de 2 (2, 4, 8, 16, etc.), un simple masquage de bits fera l'affaire.

<!-- go -->

```untype
bytes := make([]byte, 1)
rand.Read(bytes)
value := bytes[0] & 0x03 // valeur aléatoire entre [0, 3]
```

Pour une plage personnalisée, une approche simple consiste à générer un très grand nombre aléatoire par rapport au maximum et à utiliser l'opérateur modulo. Étant donné que cela introduit [un biais de modulo](#biais), l'entier aléatoire doit être suffisamment grand. Par exemple, si le maximum était 10 et que nous avons généré 32 bits aléatoires, le biais serait d'environ 1/250,000,000 - ce qui peut être suffisant pour la plupart des cas d'utilisation.

<!-- go -->

```untype
import (
	"crypto/rand"
	"encoding/binary"
)

// Génère un entier aléatoire entre [0, max).
// `max` ne devrait pas être un nombre très grand.
func generateRandomUint32(max uint32): uint32 {
	var max uint32 = 10
	bytes := make([]byte, 4)
	rand.Read(bytes)
	randUint32 := binary.BigEndian.Uint32(bytes) // Convertit les octets en uint32
	return randUint32 % max
}
```

Une autre approche courante consiste à multiplier notre maximum par un nombre flottant aléatoire. Cela peut également [introduire un biais](#biais) mais cela peut être acceptable si le maximum est assez petit et, contrairement à notre première approche, le biais est réparti.

<!-- go -->

```untype
func generateRandomUint32(max uint32): uint32 {
	var max uint32 = 10
	return uint32(max * generateRandomFloat32())
}
```

L'approche la plus sûre consiste alors à utiliser l'échantillonnage par rejet, où une valeur aléatoire est générée à plusieurs reprises jusqu'à ce qu'elle soit inférieure au maximum. Pour augmenter la probabilité que la valeur aléatoire soit inférieure au maximum, nous ne pouvons générer que le nombre maximum de bits nécessaires pour représenter le maximum. Par exemple, si le maximum est 10, nous n'aurions qu'à générer 4 bits aléatoires. Dans le code ci-dessous, nous générons un octet aléatoire, puis masquons les 4 bits de tête pour obtenir 4 bits aléatoires (8-4=4).

<!-- go -->

```untype
import (
	"crypto/rand"
	"math/big"
)

func generateRandomUint64(max *big.Int) uint64 {
	randVal := new(big.Int)
	shift := max.BitLen() % 8
	bytes := make([]byte, (max.BitLen() / 8) + 1)
	rand.Read(bytes)
	if shift != 0 {
		bytes[0] &= (1 << shift) - 1
	}
	randVal.SetBytes(bytes)
	for randVal.Cmp(max) >= 0 {
		rand.Read(bytes)
		if shift != 0 {
			bytes[0] &= (1 << shift) - 1
		}
		randVal.SetBytes(bytes)
	}
	return randVal.Uint64()
}
```

### Nombres flottants aléatoires entre 0 et 1

Une approche courante consiste à générer un entier aléatoire et à le diviser par un très grand nombre. Lorsque vous faites cela, il est crucial que le dénominateur soit suffisamment grand et que le dénominateur soit une puissance de 2 pour être représenté de manière précise par float64.

<!-- go -->

```untype
func generateRandomFloat64() float64 {
	return float64(generateRandomInteger(1<<53)) / (1 << 53)
}
```

Une autre approche consiste à générer 52 bits aléatoires pour la mantisse (float64) et à convertir cela en un flottant dans [0, 1). Cela sera généralement plus rapide car il évite la division.

<!-- go -->

```untype
import (
	"crypto/rand"
	"math"
)

func generateRandomFloat64() float64 {
	bytes := make([]byte, 7)
	rand.Read(bytes)
	bytes = append(make([]byte, 1), bytes...)
	// Définit la partie exposant à 0b01111111111
	bytes[0] = 0x3f
	bytes[1] |= 0xf
	return math.Float64frombits(binary.BigEndian.Uint64(bytes)) - 1
}
```

## Biais

Un biais très courant observé dans la nature est le biais de modulo. Par exemple, si `RANDOM_INT` est un entier dans [0, 10), certains nombres apparaîtront 3 fois (0, 1) tandis que d'autres apparaîtront 2 fois (2, 3).

```untype
RANDOM_INT % 4
```

Pour calculer le biais approximatif, nous pouvons utiliser la formule ci-dessous.

```untype
1 / ( RANDOM_BITS - LOG2(MAX) )
```

Par exemple, si nous utilisons 8 bits aléatoires et que le maximum est 100, le biais approximatif serait de 0,6 :

```untype
1 / ( 8 - LOG2(100) ) ≈ 1 / (8-6.4) ≈ 0.6
```

Multiplier le maximum par un nombre flottant aléatoire peut également introduire un biais. Dans cet exemple, `RANDOM_FLOAT` est compris entre [0, 1), donc la sortie sera [0, 5).

```untype
FLOOR( RANDOM_FLOAT * 5 )
```

Disons que `RANDOM_FLOAT` peut être l'une des 8 valeurs : 0, 0,125, 0,25, ..., 0,875. Dans ce cas, (0, 1, 3) apparaîtront 1/4 du temps tandis que (2, 4) n'apparaîtront que 1/8 du temps. Bien que ce soit un exemple extrême, il est essentiel que le flottant aléatoire fournisse suffisamment de "hasard" par rapport au maximum.
