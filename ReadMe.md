# Affixi

A helper library for Turkish noun suffixes written in typescript.

## Table

### Functions

- [getPluralSuffix](#getPluralSuffix)
- [makePlural](#makePlural)
- [getEqualitySuffix](#getEqualitySuffix)
- [makeEqual](#makeEqual)
- [getPossesiveSuffix](#getPossesiveSuffix)
- [makePossesive](#makePossesive)
- [getCompleteSuffix](#getCompleteSuffix)
- [makeComplete](#makeComplete)
- [getCaseSuffix](#getCaseSuffix)
- [makeCase](#makeCase)
- [getVoicedConsonant](#getVoicedConsonant)
- [alterToVoicedConsonant](#alterToVoicedConsonant)
- [alterToVowelDrop](#alterToVowelDrop)
- [util](#util)
  - [getComponents](#getComponents)
  - [getSyllableCount](#getSyllableCount)

### Objects

- [sounds](#sounds)

### Enums

- [Pronoun](#pronoun)
- [Case](#case)

## Usage

There is no default export in the library, so you can import whatever you need and only the things you need. This makes the library tree-shakable.

```typescript
import { makePlural, makePossesive, Pronoun } from 'affixi';

makePlural('O'); // Onlar
makePossesive('Akıl', Pronoun.PluralFirst); // Aklımız
makeCase(makePossesive('Ongözlü Köprü', Pronoun.SingularThird), Case.Locative, true); // Ongözlü Köprüsü'nde
```

## Reference

### Functions

#### getPluralSuffix

```typescript
getPluralSuffix(base: string) => string
```

Returns the appropriate plural suffix for a given noun. Suffixes are affected by vowel harmony rules.

e.g:

- Araç > lar
- Bebek > ler

#### makePlural

```typescript
makePlural(base: string) => string
```

Returns the word base concatenated with the appropriate plural suffix for a given noun.

e.g:

- Araç > Araçlar
- Bebek > Bebekler

#### getEqualitySuffix

```typescript
getEqualitySuffix(base: string) => string
```

Returns the appropriate equality suffix for a given noun. These types of suffixes are affected by both vowel harmony, consonant softening, consonant assimilation and buch of other rules.

e.g:

- Çocuk > ça
- Sen > ce

#### makeEqual

```typescript
makeEqual(base: string) => string
```

Returns the word base concatenated with the appropriate equality suffix for a given noun.

e.g:

- Çocuk > Çocukça
- Sen > Sence

#### getPossesiveSuffix

```typescript
getPossesiveSuffix(base: string, pronoun: Pronoun) => string
```

Returns the appropriate possesive suffix for a given noun and pronoun. These types of suffixes are affected by vowel harmony and given [pronoun](#pronoun).

e.g:

- `getPossesiveSuffix("Çocuk", Pronoun.SingularFirst) // um`
- `getPossesiveSuffix("Çocuk", Pronoun.SingularSecond) // un`
- `getPossesiveSuffix("Sen", Pronoun.SingularSecond) // in`

#### makePossesive

```typescript
makePossesive(base: string, pronoun: Pronoun, isProperNoun: boolean = false) => string
```

Returns the word base concatenated with the appropriate possesive suffix for a given noun and [pronoun](#pronoun).

Proper nouns are seperated with and apostrophe character.

e.g:

- `getPossesiveSuffix("Çocuk", Pronoun.SingularFirst) // Çocuğum`
- `getPossesiveSuffix("Çocuk", Pronoun.SingularSecond) // Çocuğun`
- `getPossesiveSuffix("Sen", Pronoun.SingularSecond) // Senin`
- `getPossesiveSuffix("Ayşe", Pronoun.SingularFirst, true) // Ayşe'm`

#### getCompleteSuffix

```typescript
getCompleteSuffix(base: string) => string
```

Returns the appropriate completion suffix for a given noun. These types of suffixes are affected by vowel harmony.

e.g:

- Araba > ın
- Onlar > ın
- Eller > in

#### makeComplete

```typescript
makeComplete(base: string) => string
```

Returns the word base concatenated with the appropriate completion suffix for a given noun.

e.g:

- Araba > Araba(n)ın > Arabanın
- Onlar > Onların
- Eller > Ellerin

#### getCaseSuffix

```typescript
getCaseSuffix(base: string, _case: Case) => string
```

Returns the appropriate case suffix for a given base word and a [case](#case)

- `makeCase('Ev', Case.Ablative) // den`
- `makeCase('Şehir', Case.Dative) // e`
- `makeCase('Sinema', Case.Dative) // ya`

#### makeCase

```typescript
makeCase(base: string, _case: Case) => string
```

Returns the word base concatenated with the appropriate case suffix for a given base word and a [case](#case)

- `makeCase('Ev', Case.Ablative) // Evden`
- `makeCase('Şehir', Case.Dative) // Şehre`
- `makeCase('Sinema', Case.Dative) // Sinemaya`

#### getVoicedConsonant

```typescript
getVoicedConsonant(base: string) => string | undefined
```

Some words that end with an unvoiced consonants (p,ç,t,k) may be converted into their voiced counterparts (b,c,d,ğ). If extist, this function returns the voiced consonant. If not returns undefined.

- Ağaç > c
- Sebep > b
- Akıllı > undefined

#### alterToVoicedConsonant

```typescript
alterToVoicedConsonant(base: string) => string
```

This function returns the mutated version of a word with its voiced consonant. If base does not have a voiced counterpart, the base itself is returned.

- Ağaç > Ağac
- Sebep > Sebeb
- Akıllı > Akıllı
- Renk > Reng

### alterToVowelDrop

```typescript
alterToVowelDrop(base: string) => string
```

Some two syllable words that has acute vowels in their last syllable drop that vowel after they are conjugated with a suffix. This function returns the words mutated version with the dropped vowel.

**Note: Because certain words are subjected to this phenomenon, these words are kept in an exceptions array. Contributions to this limited list is appreciated.**

- Akıl > Akl
- Bağır > Bağr
- Şehir > Şehr

#### Util

Some utility functions that may help word generation.

##### getComponents

```typescript
util.getComponents(base: string) => WordComponent
```

This method returns the last letter and the last vowel in the last syllable of a given word. It returns a `WordComponent` interface.

```typescript
export interface WordComponent {
  letter: string;
  vowel: string;
}
```

- Araba > `{ letter: "a", vowel: "a" }`
- Oyuncak > `{ letter: "k", vowel: "a" }`
- Sebep > `{ letter: "p", vowel: "e" }`

##### getSyllableCount

```typescript
util.getSyllableCount(base: string) => number
```

This method returns the syllable count of a base word. Almost always the syllabale count of a word is equal to the vowel count of a word in Turkish because the stress is delimited by vowels.

- Muvaffak > 3
- Elma > 2
- Süpermarket > 4

### Objects

#### sounds

Turkish sounds categorized by different metrics.

```typescript
interface sounds {
  unvoicedStoppingConsonants: string[];
  unvoicedContinuousConsonants: string[];
  voicedStoppingConsonants: string[];
  concatentorConsonants: string[];
  unvoicedConsonants: string[];
  roundedVowels: string[];
  unRoundedVowels: string[];
  backVowels: string[];
  frontVowels: string[];
  acuteVowels: string[];
  wideVowels: string[];
  vowels: string[];
}
```

### Enums

#### Pronoun

```typescript
enum Pronoun {
  SingularFirst,
  SingularSecond,
  SingularThird,
  PluralFirst,
  PluralSecond,
  PluralThird,
}
```

I think this one is pretty self-explanatory.

#### Case

```typescript
enum Case {
  Absolute,
  Accusative,
  Ablative,
  Locative,
  Instrumental,
  Dative,
}
```

Turkish noun case names.
