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

interface Util {
  duplicateToUppercase: (list: string[]) => string[];
  getComponents: (base: string) => WordComponent;
  getSyllableCount: (base: string) => number;
}

export const util: Util = {
  duplicateToUppercase: (list: string[]): string[] => {
    const copy = [...list];
    return [...list, ...copy.map((item) => item.toLocaleUpperCase())];
  },
  getComponents: (base: string): WordComponent => {
    const input = base.split('').reverse().join('');

    let index = 0;
    const letter = input[0].toLocaleLowerCase();
    let vowel = input[index].toLocaleLowerCase();

    while (!sounds.vowels.includes(vowel)) {
      index++;
      vowel = input[index].toLocaleLowerCase();
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
  unvoiced: ['hukuk', 'bilet', 'tabiat', 'devlet', 'bisiklet', 'millet', 'ahret', 'ahiret', 'merak'],
  vowelDrop: [
    'oğul',
    'bağır',
    'beyin',
    'burun',
    'ağız',
    'karın',
    'şehir',
    'nehir',
    'akıl',
    'göğüs',
    'devir',
    'seyir',
    'kayıp',
    'hapis',
    'zulüm',
    'gönül',
    'boyun',
  ],
};

export const getVoicedConsonant = (base: string, isProperNoun: boolean = false): string | undefined => {
  const { letter } = util.getComponents(base);
  if (
    util.getSyllableCount(base) > 1 &&
    sounds.unvoicedStoppingConsonants.includes(letter) &&
    !isProperNoun &&
    !exceptions.unvoiced.includes(base.toLocaleLowerCase())
  ) {
    const i = sounds.unvoicedStoppingConsonants.indexOf(base[base.length - 1]);
    let voicedCounterPart;

    let isNK =
      base
        .split('')
        .slice(base.length - 2, base.length)
        .join('') === 'nk';
    if (isNK) {
      voicedCounterPart = 'g';
    } else {
      voicedCounterPart = sounds.voicedStoppingConsonants[i];
    }

    return voicedCounterPart;
  }
  return;
};

export const alterToVoicedConsonant = (base: string, isProperNoun: boolean = false): string => {
  const voicedCounterPart = getVoicedConsonant(base, isProperNoun);

  if (voicedCounterPart) {
    let result =
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
export const alterToVowelDrop = (base: string): string => {
  const { vowel } = util.getComponents(base);
  const word = base.trim();

  if (
    util.getSyllableCount(base) == 2 &&
    sounds.acuteVowels.includes(vowel) &&
    exceptions.vowelDrop.includes(word.toLocaleLowerCase())
  ) {
    // Remove the last vowel e.g 'Akıl' -> 'Akl'
    let result = word.split('').reverse().join('').replace(vowel, '').split('').reverse().join('');
    return result;
  }

  return word;
};

/** Returns the plural suffix for a given word -
 * Verilen kelimenin çoğul ekini dödürür */
export const getPlural = (base: string): string => {
  const { vowel } = util.getComponents(base);
  let result: string;

  if (sounds.frontVowels.includes(vowel)) {
    result = 'lar';
  } else if (sounds.backVowels.includes(vowel)) {
    result = 'ler';
  } else {
    throw Error('Unknown vowel');
  }

  return result;
};

/** Transforms a given word into plural form -
 * Verilen kelimeyi çoğul hale getirir */
export const makePlural = (base: string): string => {
  return `${base}${getPlural(base)}`;
};

/** Returns the equality suffix for a given word -
 * Verilen kelimenin eşitlik ekini dödürür; e.g 'Çocuk' -> 'ça' */
export const getEqual = (base: string): string => {
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
 * Verilen kelimeye eşitlik ekini ekler; e.g 'Çocuk' -> 'Çocukça' */
export const makeEqual = (base: string): string => {
  return `${base}${getEqual(base)}`;
};

/** Returns the possesive suffix for a given word and pronoun -
 * Verilen kelimeye ve zamire uygun iyelik ekini döndürür */
export const getPossesiveSuffix = (base: string, pronoun: Pronoun): string => {
  const { vowel, letter } = util.getComponents(base);
  let result = '';
  let vowelSuffix: string;

  if (!sounds.vowels.includes(letter) && pronoun !== Pronoun.PluralThird) {
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
    if (sounds.frontVowels.includes(vowel)) {
      if (sounds.roundedVowels.includes(vowel)) {
        vowelSuffix = 'u';
      } else {
        vowelSuffix = 'ı';
      }
    } else {
      if (sounds.roundedVowels.includes(vowel)) {
        vowelSuffix = 'ü';
      } else {
        vowelSuffix = 'i';
      }
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
      if (sounds.backVowels.includes(vowelSuffix)) {
        result += 'leri';
      } else {
        result += 'ları';
      }
      break;
  }

  return result;
};

export const makePossesiveSuffix = (base: string, pronoun: Pronoun, isProperNoun: boolean = false): string => {
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
  return `${root}${punctuation}${suffix}`;
};
