import {
  util,
  sounds,
  getPlural,
  makePlural,
  getEqual,
  makeEqual,
  getVoicedConsonant,
  alterToVoicedConsonant,
  getPossesiveSuffix,
  alterToVowelDrop,
  makePossesiveSuffix,
  Pronoun,
} from '../main';

test('Component getter', () => {
  expect(util.getComponents('isim')).toEqual({ letter: 'm', vowel: 'i' });
  expect(util.getComponents('araç')).toEqual({ letter: 'ç', vowel: 'a' });
  expect(util.getComponents('kaya')).toEqual({ letter: 'a', vowel: 'a' });
});

test('List duplicater', () => {
  expect(util.duplicateToUppercase(['a', 'e', 'ı', 'i'])).toEqual(['a', 'e', 'ı', 'i', 'A', 'E', 'I', 'İ']);
  expect(util.duplicateToUppercase(['o', 'ö'])).toEqual(['o', 'ö', 'O', 'Ö']);
});

test('Sounds object generation', () => {
  expect(sounds.roundedVowels).toEqual(['o', 'u', 'ö', 'ü', 'O', 'U', 'Ö', 'Ü']);
  expect(sounds.unRoundedVowels).toEqual(['a', 'ı', 'e', 'i', 'A', 'I', 'E', 'İ']);
  expect(sounds.vowels).toEqual(['a', 'e', 'ı', 'i', 'o', 'ö', 'u', 'ü', 'A', 'E', 'I', 'İ', 'O', 'Ö', 'U', 'Ü']);
});

test('Query plural', () => {
  expect(getPlural('Araba')).toBe('lar');
  expect(getPlural('İsim')).toBe('ler');
  expect(getPlural('kanaat')).toBe('lar');
  expect(getPlural('elit')).toBe('ler');
});

test('Create plural', () => {
  expect(makePlural('Araba')).toBe('Arabalar');
  expect(makePlural('İsim')).toBe('İsimler');
  expect(makePlural('kanaat')).toBe('kanaatlar');
  expect(makePlural('elit')).toBe('elitler');
});

test('Query equality', () => {
  expect(getEqual('Çocuk')).toBe('ça');
  expect(getEqual('Bebek')).toBe('çe');
  expect(getEqual('akıllı')).toBe('ca');
  expect(getEqual('sebepsiz')).toBe('ce');
});

test('Create equality', () => {
  expect(makeEqual('Çocuk')).toBe('Çocukça');
  expect(makeEqual('Bebek')).toBe('Bebekçe');
  expect(makeEqual('akıllı')).toBe('akıllıca');
  expect(makeEqual('sebepsiz')).toBe('sebepsizce');
});

test('Query voiced consonant counterpart', () => {
  expect(getVoicedConsonant('Çocuk')).toBe('ğ');
  expect(getVoicedConsonant('Bebek')).toBe('ğ');
  expect(getVoicedConsonant('Ağaç')).toBe('c');
  expect(getVoicedConsonant('Sebep')).toBe('b');
  expect(getVoicedConsonant('akıllı')).toBe(undefined);
  expect(getVoicedConsonant('sebepsiz')).toBe(undefined);
});

test('Make voiced consonant counterpart', () => {
  expect(alterToVoicedConsonant('Çocuk')).toBe('Çocuğ');
  expect(alterToVoicedConsonant('Bebek')).toBe('Bebeğ');
  expect(alterToVoicedConsonant('Ağaç')).toBe('Ağac');
  expect(alterToVoicedConsonant('Sebep')).toBe('Sebeb');
  expect(alterToVoicedConsonant('akıllı')).toBe('akıllı');
  expect(alterToVoicedConsonant('sebepsiz')).toBe('sebepsiz');
});

test('Alter word to vowel dropped version', () => {
  expect(alterToVowelDrop('oğul')).toBe('oğl');
  expect(alterToVowelDrop('basın')).toBe('basın');
  expect(alterToVowelDrop('bağır')).toBe('bağr');
  expect(alterToVowelDrop('bebek')).toBe('bebek');
  expect(alterToVowelDrop('beyin')).toBe('beyn');
  expect(alterToVowelDrop('kafa')).toBe('kafa');
  expect(alterToVowelDrop('burun ')).toBe('burn');
  expect(alterToVowelDrop('fare')).toBe('fare');
  expect(alterToVowelDrop('ağız')).toBe('ağz');
  expect(alterToVowelDrop('karın')).toBe('karn');
  expect(alterToVowelDrop('içeri')).toBe('içeri');
  expect(alterToVowelDrop('şura')).toBe('şura');
  expect(alterToVowelDrop('yayın')).toBe('yayın');
});

test('Query possesive suffix', () => {
  expect(getPossesiveSuffix('Çocuk', Pronoun.SingularFirst)).toBe('um');
  expect(getPossesiveSuffix('Bebek', Pronoun.SingularSecond)).toBe('in');
  expect(getPossesiveSuffix('Sebep', Pronoun.SingularThird)).toBe('i');
  expect(getPossesiveSuffix('Akıl', Pronoun.PluralFirst)).toBe('ımız');
  expect(getPossesiveSuffix('Merak', Pronoun.PluralSecond)).toBe('ınız');
  expect(getPossesiveSuffix('Ağaç', Pronoun.PluralThird)).toBe('ları');
});

test('Make possesive suffix', () => {
  expect(makePossesiveSuffix('Çocuk', Pronoun.SingularFirst)).toBe('Çocuğum');
  expect(makePossesiveSuffix('Bebek', Pronoun.SingularSecond)).toBe('Bebeğin');
  expect(makePossesiveSuffix('Sebep', Pronoun.SingularThird)).toBe('Sebebi');
  expect(makePossesiveSuffix('Akıl', Pronoun.PluralFirst)).toBe('Aklımız');
  expect(makePossesiveSuffix('Merak', Pronoun.PluralSecond)).toBe('Merakınız');
  expect(makePossesiveSuffix('Ağaç', Pronoun.PluralThird)).toBe('Ağaçları');
  expect(makePossesiveSuffix('Ayşe', Pronoun.SingularFirst, true)).toBe("Ayşe'm");
  expect(makePossesiveSuffix('Türkiye', Pronoun.SingularSecond, true)).toBe("Türkiye'n");
  expect(makePossesiveSuffix('açık', Pronoun.PluralSecond)).toBe('açığınız');
});
