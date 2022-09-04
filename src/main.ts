export interface WordComponent {
  letter: string;
  vowel: string;
}

export enum Pronoun {
  /** Birinci Tekil Şahıs */
  SingularFirst,
  /** İkinci Tekil Şahıs */
  SingularSecond,
  /** Üçüncü Tekil Şahıs */
  SingularThird,
  /** Birinci Çoğul Şahıs */
  PluralFirst,
  /** İkinci Çoğul Şahıs */
  PluralSecond,
  /** Üçüncü Çoğul Şahıs */
  PluralThird,
}

export enum Case {
  /** İsmin Yalın Hâli - */
  Absolute,
  /** İsmin Belirtme Hâli -i */
  Accusative,
  /** İsmin Ayrılma Hâli -den */
  Ablative,
  /** İsmin Bulunma Hâli -de */
  Locative,
  /** İsmin Vasıta Hâli -ile */
  Instrumental,
  /** İsmin Yönelme Hâli -e */
  Dative,
}

export enum Compound {
  /** Tamlayan */
  Compounder,
  /** Tamlanan */
  Compoundee,
}

interface Util {
  duplicateToUppercase: (list: string[]) => string[];
  getComponents: (base: string) => WordComponent;
  getSyllableCount: (base: string) => number;
  getNumberText: (value: number) => string;
}

export const util: Util = {
  duplicateToUppercase: (list: string[]): string[] => {
    const copy = [...list];
    return [...list, ...copy.map((item) => item.toLocaleUpperCase('tr'))];
  },
  getComponents: (base: string): WordComponent => {
    const input = base.split('').reverse().join('');

    let index = 0;
    const letter = input[0].toLocaleLowerCase('tr');
    let vowel = input[index].toLocaleLowerCase('tr');

    while (!sounds.vowels.includes(vowel)) {
      index++;
      vowel = input[index].toLocaleLowerCase('tr');
    }

    return { letter, vowel };
  },
  getSyllableCount: (base: string): number => {
    let count = 0;
    const input = base.split('');

    input.forEach((letter) => {
      if (sounds.vowels.includes(letter)) count++;
    });

    return count;
  },
  getNumberText: (value: number): string => {
    const numberString = value.toString();
    const map = ['sıfır', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz'];
    const tensMap = [null, 'on', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan'];
    const lastDigit = value % 10;

    if (value === 0) {
      return map[0];
    }

    if (lastDigit !== 0) {
      return map[lastDigit];
    }

    let coefficientIndex = 0;
    let currentValue = '0';
    while (currentValue === '0') {
      coefficientIndex++;
      currentValue = numberString.split('').reverse()[coefficientIndex];
    }

    if (coefficientIndex === 1) {
      const tensDigit = value.toString().split('').reverse()[1];
      return tensMap[parseInt(tensDigit, 10)] as string;
    }

    if (coefficientIndex === 2) {
      return 'yüz';
    }

    if (coefficientIndex >= 3 && coefficientIndex < 6) {
      return 'bin';
    }

    if (coefficientIndex >= 6 && coefficientIndex < 9) {
      return 'milyon';
    }

    if (coefficientIndex >= 9 && coefficientIndex < 12) {
      return 'milyar';
    }

    if ((coefficientIndex >= 12 && coefficientIndex < 15) || (coefficientIndex >= 15 && coefficientIndex < 18)) {
      return 'trilyon';
    }

    return 'a';
  },
};

export const sounds = {
  unvoicedStoppingConsonants: util.duplicateToUppercase(['p', 'ç', 't', 'k']),
  unvoicedContinuousConsonants: util.duplicateToUppercase(['f', 's', 'ş', 'h']),
  voicedStoppingConsonants: util.duplicateToUppercase(['b', 'c', 'd', 'ğ']),
  concatentorConsonants: util.duplicateToUppercase(['y', 'ş', 's', 'n']),
  unvoicedConsonants: util.duplicateToUppercase(['f', 's', 'ş', 'h', 'p', 'ç', 't', 'k']),
  roundedVowels: util.duplicateToUppercase(['o', 'u', 'ö', 'ü']),
  unRoundedVowels: util.duplicateToUppercase(['a', 'ı', 'e', 'i']),
  backVowels: util.duplicateToUppercase(['e', 'i', 'ö', 'ü']),
  frontVowels: util.duplicateToUppercase(['a', 'ı', 'o', 'u']),
  acuteVowels: util.duplicateToUppercase(['ı', 'i', 'u', 'ü']),
  wideVowels: util.duplicateToUppercase(['a', 'e', 'o', 'ö']),
  vowels: util.duplicateToUppercase(['a', 'e', 'ı', 'i', 'o', 'ö', 'u', 'ü']),
};

export const exceptions = {
  /** Unvoiced exceptions that does not soften with a vowel suffix immediately after */
  unvoiced: ['hukuk', 'bilet', 'tabiat', 'devlet', 'bisiklet', 'millet', 'ahret', 'ahiret', 'merak'],
  /** Unvoiced single syllable exceptions that does soften with a vowel suffix immediately after */
  unvoicedSingleSyllable: ['uç'],
  /** Exceptions that need to be filled when made plural */
  plural: ['o'],
  /** Limited list of words that drop their vowe upon a cretain condition */
  vowelDrop: [
    'ağız',
    'akıl',
    'alın',
    'bağır',
    'beyin',
    'boyun',
    'burun',
    'çevir',
    'devir',
    'emir',
    'fikir',
    'göğüs',
    'gönül',
    'hapis',
    'isim',
    'karın',
    'kayıp',
    'nehir',
    'oğul',
    'ömür',
    'sabır',
    'seyir',
    'şehir',
    'şekil',
    'zulüm',
  ],
};

export type BaseValue = string | number;

function transformBase(_base: BaseValue): string {
  if (typeof _base === 'number') {
    return util.getNumberText(_base);
  }

  return _base;
}

/** Some words that end with an unvoiced consonants (p,ç,t,k) may be converted into their voiced counterparts (b,c,d,ğ).
 * If extist, this function returns the voiced consonant. If not returns undefined -
 * Eğer kelime sert ünsüz ile bitiyorsa, ünsüzün yumuşak halini, bitmiyorsa undefined döndürür
 */
export const getVoicedConsonant = (_base: BaseValue, isProperNoun: boolean = false): string | undefined => {
  const base = transformBase(_base);

  const { letter } = util.getComponents(base);
  if (
    sounds.unvoicedStoppingConsonants.includes(letter) &&
    !isProperNoun &&
    !exceptions.unvoiced.includes(base.toLocaleLowerCase('tr'))
  ) {
    const i = sounds.unvoicedStoppingConsonants.indexOf(base[base.length - 1]);
    let voicedCounterPart;

    const isNK =
      base
        .split('')
        .slice(base.length - 2, base.length)
        .join('') === 'nk';
    if (isNK) {
      voicedCounterPart = 'g';
    } else {
      if (util.getSyllableCount(base) > 1 || exceptions.unvoicedSingleSyllable.includes(base.toLocaleLowerCase('tr'))) {
        voicedCounterPart = sounds.voicedStoppingConsonants[i];
      }
    }

    return voicedCounterPart;
  }
  return;
};

/** This function returns the mutated version of a word with its voiced consonant. If base does not have a voiced counterpart, the base itself is returned -
 * Kelimenin sonunda sert ünsüz varsa, sert ünsüzü yumuşak haliyle değiştirir, yoksa kelimenin kendisini döndürür
 * 'Renk' -> 'Reng'
 * 'Akıl' -> 'Akıl'
 */
export const alterToVoicedConsonant = (_base: BaseValue, isProperNoun: boolean = false): string => {
  const base = transformBase(_base);
  const voicedCounterPart = getVoicedConsonant(base, isProperNoun);

  if (voicedCounterPart) {
    const result =
      base
        .split('')
        .splice(0, base.length - 1)
        .join('') + voicedCounterPart;
    return result;
  }

  return base;
};

/** Alter given word to its vowel dropped version. If no vowel is supposed to drop, the word itself is returned -
 * Verilen kelimenin hecesi düşmüş versiyonunu döndürür. Eğer kelimede ünlü düşmesi yoksa, kelimenin kendisi döndürülür
 * e.g 'Akıl' -> 'Akl',
 * e.g 'Bebek' -> 'Bebek'
 */
export const alterToVowelDrop = (_base: BaseValue): string => {
  const base = transformBase(_base);
  const { vowel } = util.getComponents(base);
  const word = base.trim();

  if (
    util.getSyllableCount(base) === 2 &&
    sounds.acuteVowels.includes(vowel) &&
    exceptions.vowelDrop.includes(word.toLocaleLowerCase('tr'))
  ) {
    // Remove the last vowel e.g 'Akıl' -> 'Akl'
    const result = word.split('').reverse().join('').replace(vowel, '').split('').reverse().join('');
    return result;
  }

  return word;
};

/** Returns the plural suffix for a given word -
 * Verilen kelimenin çoğul ekini dödürür
 */
export const getPluralSuffix = (_base: BaseValue): string => {
  const base = transformBase(_base);
  const { vowel } = util.getComponents(base);
  let result: string;
  let infix = '';

  if (sounds.frontVowels.includes(vowel)) {
    result = 'lar';
  } else if (sounds.backVowels.includes(vowel)) {
    result = 'ler';
  } else {
    throw Error('Unknown vowel');
  }

  if (exceptions.plural.includes(base.toLocaleLowerCase('tr'))) {
    infix = 'n';
  }

  return infix + result;
};

/** Transforms a given word into plural form -
 * Verilen kelimeyi çoğul hale getirir
 */
export const makePlural = (_base: BaseValue): string => {
  const base = transformBase(_base);
  return `${base}${getPluralSuffix(base)}`;
};

/** Returns the equality suffix for a given word -
 * Verilen kelimenin eşitlik ekini dödürür; e.g 'Çocuk' -> 'ça'
 */
export const getEqualitySuffix = (_base: BaseValue): string => {
  const base = transformBase(_base);
  const { vowel, letter } = util.getComponents(base);
  let result = '';

  if (sounds.unvoicedConsonants.includes(letter)) {
    result += 'ç';
  } else {
    result += 'c';
  }

  if (sounds.frontVowels.includes(vowel)) {
    result += 'a';
  } else if (sounds.backVowels.includes(vowel)) {
    result += 'e';
  } else {
    throw Error('Unknown vowel');
  }

  return result;
};

/** Transforms a given word into equal form -
 * Verilen kelimeye eşitlik ekini ekler; e.g 'Çocuk' -> 'Çocukça'
 */
export const makeEqual = (_base: BaseValue): string => {
  const base = transformBase(_base);
  return `${base}${getEqualitySuffix(base)}`;
};

/** Returns the possesive suffix for a given word and pronoun -
 * Verilen kelimeye ve zamire uygun iyelik ekini döndürür
 */
export const getPossesiveSuffix = (_base: BaseValue, pronoun: Pronoun): string => {
  const base = transformBase(_base);
  const { vowel, letter } = util.getComponents(base);
  let result = '';
  let infix = '';
  let vowelSuffix: string;

  if (sounds.vowels.includes(letter)) {
    if (pronoun === Pronoun.SingularThird) {
      infix = 's';

      if (sounds.frontVowels.includes(vowel)) {
        if (sounds.roundedVowels.includes(vowel)) {
          result += 'u';
          vowelSuffix = 'u';
        } else {
          result += 'ı';
          vowelSuffix = 'ı';
        }
      } else {
        if (sounds.roundedVowels.includes(vowel)) {
          result += 'ü';
          vowelSuffix = 'ü';
        } else {
          result += 'i';
          vowelSuffix = 'i';
        }
      }
    } else {
      vowelSuffix = '';
    }
  } else {
    if (pronoun !== Pronoun.PluralThird) {
      if (sounds.frontVowels.includes(vowel)) {
        if (sounds.roundedVowels.includes(vowel)) {
          result += 'u';
          vowelSuffix = 'u';
        } else {
          result += 'ı';
          vowelSuffix = 'ı';
        }
      } else {
        if (sounds.roundedVowels.includes(vowel)) {
          result += 'ü';
          vowelSuffix = 'ü';
        } else {
          result += 'i';
          vowelSuffix = 'i';
        }
      }
    } else {
      vowelSuffix = '';
    }
  }

  switch (pronoun) {
    case Pronoun.SingularFirst:
      result += 'm';
      break;
    case Pronoun.SingularSecond:
      result += 'n';
      break;
    case Pronoun.SingularThird:
      break;
    case Pronoun.PluralFirst:
      switch (vowelSuffix) {
        case 'u':
          result += 'muz';
          break;
        case 'ı':
          result += 'mız';
          break;
        case 'ü':
          result += 'müz';
          break;
        case 'i':
          result += 'miz';
          break;
      }
      break;
    case Pronoun.PluralSecond:
      switch (vowelSuffix) {
        case 'u':
          result += 'nuz';
          break;
        case 'ı':
          result += 'nız';
          break;
        case 'ü':
          result += 'nüz';
          break;
        case 'i':
          result += 'niz';
          break;
      }
      break;
    case Pronoun.PluralThird:
      const targetVowel = vowelSuffix !== '' ? vowelSuffix : vowel;

      if (sounds.backVowels.includes(targetVowel)) {
        result += 'leri';
      } else {
        result += 'ları';
      }
      break;
  }

  return infix + result;
};

/** Concatenates the word with the possesive suffix for a given base and pronoun -
 * Verilen kelimeye ve zamire uygun iyelik ekini ekler
 */
export const makePossesive = (_base: BaseValue, pronoun: Pronoun, isProperNoun: boolean = false): string => {
  const base = transformBase(_base);
  const suffix = getPossesiveSuffix(base, pronoun);
  const firstLetter = suffix[0];
  let root: string;

  const word = alterToVowelDrop(base);
  if (sounds.vowels.includes(firstLetter)) {
    root = alterToVoicedConsonant(word);
  } else {
    root = word;
  }

  const punctuation = isProperNoun ? "'" : '';
  return root + punctuation + suffix;
};

/** Returns the appropriate case suffix for a given base word and a case -
 * Verilen kelimeye ve hâle uygun hâl ekini döndürür.
 */
export const getCaseSuffix = (_base: BaseValue, _case: Case, isCompound: boolean = false): string => {
  const base = transformBase(_base);
  const { vowel, letter } = util.getComponents(base);
  let result: string;
  let infix = '';

  switch (_case) {
    case Case.Absolute:
      result = '';
      break;
    case Case.Accusative:
      if (sounds.vowels.includes(letter)) {
        infix = 'n';
      }

      if (sounds.frontVowels.includes(vowel)) {
        if (sounds.roundedVowels.includes(vowel)) {
          result = 'u';
        } else {
          result = 'ı';
        }
      } else {
        if (sounds.roundedVowels.includes(vowel)) {
          result = 'ü';
        } else {
          result = 'i';
        }
      }
      break;
    case Case.Ablative:
      if (sounds.vowels.includes(letter) && isCompound) {
        infix = 'n';
      }

      if (sounds.unvoicedConsonants.includes(letter)) {
        result = 't';
      } else {
        result = 'd';
      }

      if (sounds.frontVowels.includes(vowel)) {
        result += 'an';
      } else {
        result += 'en';
      }
      break;
    case Case.Locative:
      if (sounds.vowels.includes(letter) && isCompound) {
        infix = 'n';
      }

      if (sounds.unvoicedConsonants.includes(letter)) {
        result = 't';
      } else {
        result = 'd';
      }

      if (sounds.frontVowels.includes(vowel)) {
        result += 'a';
      } else {
        result += 'e';
      }
      break;
    case Case.Instrumental:
      if (sounds.vowels.includes(letter)) {
        infix = 'y';
      }

      if (sounds.frontVowels.includes(vowel)) {
        result = 'la';
      } else {
        result = 'le';
      }
      break;
    case Case.Dative:
      if (sounds.vowels.includes(letter)) {
        if (isCompound) {
          infix = 'n';
        } else {
          infix = 'y';
        }
      }

      if (sounds.frontVowels.includes(vowel)) {
        result = 'a';
      } else {
        result = 'e';
      }
      break;
  }

  return infix + result;
};

/** Returns the word base concatenated with the appropriate case suffix for a given base word and a case
 * Verilen kelimeye ve hâle uygun hâl ekini ekler
 */
export const makeCase = (
  _base: BaseValue,
  _case: Case,
  isProperNoun: boolean = false,
  isCompound: boolean = false,
): string => {
  const base = transformBase(_base);
  const suffix = getCaseSuffix(base, _case, isCompound);
  const punctuation = isProperNoun ? "'" : '';
  let word = _case === Case.Absolute ? base : alterToVoicedConsonant(base);
  const firstLetter = suffix[0];

  if (sounds.vowels.includes(firstLetter)) {
    word = alterToVowelDrop(word);
  }

  return word + punctuation + suffix;
};

/** Returns the appropriate compounder suffix for a given base word -
 * Verilen kelimeye uygun tamlayan ekini döndürür.
 */
const getCompounderSuffix = (_base: BaseValue): string => {
  const base = transformBase(_base);
  const { vowel, letter } = util.getComponents(base);

  let infix = '';
  let result = '';

  if (sounds.vowels.includes(letter)) {
    infix += 'n';
  }

  if (sounds.unRoundedVowels.includes(vowel)) {
    if (sounds.frontVowels.includes(vowel)) {
      result += 'ın';
    } else {
      result += 'in';
    }
  } else {
    if (sounds.frontVowels.includes(vowel)) {
      result += 'un';
    } else {
      result += 'ün';
    }
  }

  return infix + result;
};

/** Returns the appropriate compoundee suffix for a given base word -
 * Verilen kelimeye uygun tamlanan ekini döndürür.
 */
const getCompoundeeSuffix = (_base: BaseValue): string => {
  const base = transformBase(_base);
  const { vowel, letter } = util.getComponents(base);

  let infix = '';
  let result = '';

  if (sounds.vowels.includes(letter)) {
    infix += 's';
  }

  if (sounds.unRoundedVowels.includes(vowel)) {
    if (sounds.frontVowels.includes(vowel)) {
      result += 'ı';
    } else {
      result += 'i';
    }
  } else {
    if (sounds.frontVowels.includes(vowel)) {
      result += 'u';
    } else {
      result += 'ü';
    }
  }

  return infix + result;
};

/** Returns the appropriate case suffix for a given base word and a compound type -
 * Verilen kelimeye ve tamlama tipine uygun tamlama ekini döndürür.
 */
export const getCompoundSuffix = (_base: BaseValue, type: Compound): string => {
  const base = transformBase(_base);
  switch (type) {
    case Compound.Compoundee:
      return getCompoundeeSuffix(base);
    case Compound.Compounder:
      return getCompounderSuffix(base);
  }
};

/** Returns the word base concatenated with the appropriate compound suffix for a given base word and a compound type
 * Verilen kelimeye ve tamlama tipine uygun tamlama ekini ekler
 */
export const makeCompound = (_base: BaseValue, type: Compound, isProperNoun: boolean = false): string => {
  const base = transformBase(_base);
  let suffix;
  let firstLetter;
  let word = alterToVoicedConsonant(base);
  const punctuation = isProperNoun ? "'" : '';

  switch (type) {
    case Compound.Compoundee:
      suffix = getCompoundeeSuffix(base);
      firstLetter = suffix[0];

      if (sounds.vowels.includes(firstLetter)) {
        word = alterToVowelDrop(word);
      }

      return word + punctuation + suffix;
    case Compound.Compounder:
      suffix = getCompounderSuffix(base);
      firstLetter = suffix[0];

      if (sounds.vowels.includes(firstLetter)) {
        word = alterToVowelDrop(word);
      }

      return word + punctuation + suffix;
  }
};

/** Represents a state of word at a given time with properties like isCompound and isProperNoun */
export interface AffixiWordState {
  word: string;
  isCompound: boolean;
  isProperNoun: boolean;
}

/** AffixiWord is a construct that makes it easier to handle nouns in a complex manner.
 * It holds a state that can be undone and handles aspects like compoundness in itslef.
 * It has a toString method that returns the resulting word and can be used with String(word).
 * All its methods apart from toString return the instance itself so they are chainable.
 */
export class AffixiWord {
  isCompound = false;
  word: string;
  history: AffixiWordState[] = [];
  constructor(public base: BaseValue, public isProperNoun: boolean = false) {
    this.word = transformBase(this.base);
  }

  /** Concatenates the word with the appropriate compound suffix for a given compound type -
   * Kelimeye verilen tamlama tipine uygun tamlama ekini ekler
   */
  makeCompound(type: Compound): AffixiWord {
    this.commit();
    this.word = makeCompound(this.word, type, this.isProperNoun);
    this.isCompound = true;
    return this;
  }

  /** Concatenates the word with the appropriate case suffix for a given case -
   * Kelimeye verilen hâle uygun hâl ekini ekler
   */
  makeCase(_case: Case): AffixiWord {
    this.commit();
    this.word = makeCase(this.word, _case, this.isProperNoun, this.isCompound);
    return this;
  }

  /** Concatenates the word with the possesive suffix for a given pronoun -
   * Kelimeye verilen zamire uygun iyelik ekini ekler
   */
  makePossesive(pronoun: Pronoun): AffixiWord {
    this.commit();
    this.word = makePossesive(this.word, pronoun, this.isProperNoun);
    this.isCompound = true;
    return this;
  }

  /** Transforms the word into equal form -
   * Kelimeye eşitlik ekini ekler; e.g 'Çocuk' -> 'Çocukça'
   */
  makeEqual(): AffixiWord {
    this.commit();
    this.word = makeEqual(this.word);
    return this;
  }

  /** Transforms the word into plural form -
   * Kelimeyi çoğul hale getirir
   */
  makePlural(): AffixiWord {
    this.commit();
    this.word = makePlural(this.word);
    return this;
  }

  private commit(): void {
    if (this.history.length >= 20) {
      this.history.shift();
    }

    this.history.push({
      word: this.word,
      isCompound: this.isCompound,
      isProperNoun: this.isProperNoun,
    });
  }

  /** Undoes the last operation */
  undo(): AffixiWord {
    const oldState = this.history.pop();
    if (oldState) {
      this.word = oldState.word;
      this.isCompound = oldState.isCompound;
      this.isProperNoun = oldState.isProperNoun;
    }
    return this;
  }

  toString(): string {
    return this.word;
  }
}
