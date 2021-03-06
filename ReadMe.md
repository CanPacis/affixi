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
- [getCaseSuffix](#getCaseSuffix)
- [makeCase](#makeCase)
- [getCompoundSuffix](#getCompoundSuffix)
- [makeCompound](#makeCompound)
- [getVoicedConsonant](#getVoicedConsonant)
- [alterToVoicedConsonant](#alterToVoicedConsonant)
- [alterToVowelDrop](#alterToVowelDrop)
- [util](#util)
  - [getComponents](#getComponents)
  - [getSyllableCount](#getSyllableCount)

### Classes

- [AffixiWord](#AffixiWord)

### Objects

- [sounds](#sounds)

### Enums

- [Pronoun](#pronoun)
- [Case](#case)
- [Compound](#compound)

### Interfaces

- [AffixiWordState](#AffixiWordState)

## Usage

install

```bash
npm install affixi
```

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

Proper nouns are seperated with an apostrophe character.

e.g:

- `makePossesive("Çocuk", Pronoun.SingularFirst) // Çocuğum`
- `makePossesive("Çocuk", Pronoun.SingularSecond) // Çocuğun`
- `makePossesive("Sen", Pronoun.SingularSecond) // Senin`
- `makePossesive("Ayşe", Pronoun.SingularFirst, true) // Ayşe'm`

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
makeCase(base: string, _case: Case, isProperNoun: boolean = false) => string
```

Returns the word base concatenated with the appropriate case suffix for a given base word and a [case](#case)
Proper nouns are seperated with an apostrophe character.

- `makeCase('Ev', Case.Ablative) // Evden`
- `makeCase('Balıkesir', Case.Ablative, true) // Balıkesir'den`
- `makeCase('Şehir', Case.Dative) // Şehre`
- `makeCase('Sinema', Case.Dative) // Sinemaya`

#### getCompoundSuffix

```typescript
getCompoundSuffix(base: string, compound: Compound) => string
```

Returns the appropriate compound suffix for a given base word and a [compound](#compound)

- `getCompoundSuffix('Köprü', Compound.Compounder) // nün`
- `getCompoundSuffix('Öğretmen', Compound.Compounder) // in`
- `getCompoundSuffix('Köprü', Compound.Compoundee) // sü`
- `getCompoundSuffix('Akıl', Compound.Compoundee) // ı`

#### makeCompound

```typescript
makeCompound(base: string, compound: Compound, isProperNoun: boolean = false) => string
```

Returns the word base concatenated with the appropriate compound suffix for a given base word and a [compound](#compound)
Proper nouns are seperated with an apostrophe character.

- `makeCompound('Köprü', Compound.Compounder) // Köprünün`
- `makeCompound('Öğretmen', Compound.Compounder) // Öğretmenin`
- `makeCompound('Köprü', Compound.Compoundee) // Köprüsü`
- `makeCompound('Akıl', Compound.Compoundee) // Aklı`

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

### Classes

#### AffixiWord

`AffixiWord` is a construct that makes it easier to handle nouns in a complex manner. It holds a state that can be undone and handles aspects like compoundness in itslef. It has a `toString` method that returns the resulting word and can be used with `String(word)`. All its methods apart from toString return the instance itself so they are chainable.

##### Properties

```typescript
  base: string; // Given base word
  word: string; // Current state of the word
  isCompound: boolean;
  isProperNoun: boolean;
  history: AffixiWordState[] = [];
```

**See: [AffixiWordState](#AffixiWordState)**

##### Methods

###### AffixiWord.makeCompound

Concatenates the word with the appropriate compound suffix for a given compound type.

```typescript
makeCompound(type: Compound): AffixiWord
```

###### AffixiWord.makeCase

Concatenates the word with the appropriate case suffix for a given case.

```typescript
makeCase(_case: Case): AffixiWord
```

###### AffixiWord.makeComplete

Concatenates the word with the completion suffix.

```typescript
makeComplete(): AffixiWord
```

###### AffixiWord.makePossesive

Concatenates the word with the possesive suffix for a given pronoun.

```typescript
  makePossesive(pronoun: Pronoun): AffixiWord
```

###### AffixiWord.makeEqual

Transforms the word into equal form.

```typescript
makeEqual(): AffixiWord
```

###### AffixiWord.makePlural

Transforms the word into plural form.

```typescript
makePlural(): AffixiWord
```

###### AffixiWord.undo

Undoes the last operation

```typescript
undo(): AffixiWord
```

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
  SingularFirst, // I
  SingularSecond, // You (singular)
  SingularThird, // He/She/It
  PluralFirst, // We
  PluralSecond, // You (plural)
  PluralThird, // They
}
```

I think this one is pretty self-explanatory.

#### Case

```typescript
enum Case {
  Absolute,
  Accusative, // -i
  Ablative, // -den
  Locative, // -de
  Instrumental, // -le
  Dative, // -e
}
```

Turkish noun case names.

#### Compound

```typescript
enum Compound {
  Compounder, // tamlayan
  Compoundee, // tamlanan
}
```

Turkish compound types

### Interfaces

#### AffixiWordState

```typescript
export interface AffixiWordState {
  word: string;
  isCompound: boolean;
  isProperNoun: boolean;
}
```
