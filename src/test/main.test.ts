import {
  util,
  sounds,
  getPluralSuffix,
  makePlural,
  getEqualitySuffix,
  makeEqual,
  getVoicedConsonant,
  alterToVoicedConsonant,
  getPossesiveSuffix,
  makePossesive,
  alterToVowelDrop,
  Pronoun,
  getCompleteSuffix,
  makeComplete,
  getCaseSuffix,
  Case,
  makeCase,
  getCompounderSuffix,
  makeCompounder,
  getCompoundeeSuffix,
  makeCompoundee,
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
  expect(getPluralSuffix('Araba')).toBe('lar');
  expect(getPluralSuffix('İsim')).toBe('ler');
  expect(getPluralSuffix('kanaat')).toBe('lar');
  expect(getPluralSuffix('elit')).toBe('ler');
});

test('Create plural', () => {
  expect(makePlural('Araba')).toBe('Arabalar');
  expect(makePlural('İsim')).toBe('İsimler');
  expect(makePlural('kanaat')).toBe('kanaatlar');
  expect(makePlural('elit')).toBe('elitler');
  expect(makePlural('O')).toBe('Onlar');
});

test('Query equality suffix', () => {
  expect(getEqualitySuffix('Çocuk')).toBe('ça');
  expect(getEqualitySuffix('Bebek')).toBe('çe');
  expect(getEqualitySuffix('akıllı')).toBe('ca');
  expect(getEqualitySuffix('sebepsiz')).toBe('ce');
});

test('Make noun equal', () => {
  expect(makeEqual('Çocuk')).toBe('Çocukça');
  expect(makeEqual('Bebek')).toBe('Bebekçe');
  expect(makeEqual('akıllı')).toBe('akıllıca');
  expect(makeEqual('sebepsiz')).toBe('sebepsizce');
  expect(makeEqual('sen')).toBe('sence');
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
  expect(getPossesiveSuffix('araba', Pronoun.SingularThird)).toBe('sı');
  expect(getPossesiveSuffix('araba', Pronoun.SingularFirst)).toBe('m');
  expect(getPossesiveSuffix('kaçak', Pronoun.SingularThird)).toBe('ı');
  expect(getPossesiveSuffix('bitki', Pronoun.SingularThird)).toBe('si');
});

test('Make noun possesive', () => {
  expect(makePossesive('Çocuk', Pronoun.SingularFirst)).toBe('Çocuğum');
  expect(makePossesive('Bebek', Pronoun.SingularSecond)).toBe('Bebeğin');
  expect(makePossesive('Sebep', Pronoun.SingularThird)).toBe('Sebebi');
  expect(makePossesive('Akıl', Pronoun.PluralFirst)).toBe('Aklımız');
  expect(makePossesive('Merak', Pronoun.PluralSecond)).toBe('Merakınız');
  expect(makePossesive('Ağaç', Pronoun.PluralThird)).toBe('Ağaçları');
  expect(makePossesive('Ayşe', Pronoun.SingularFirst, true)).toBe("Ayşe'm");
  expect(makePossesive('Türkiye', Pronoun.SingularSecond, true)).toBe("Türkiye'n");
  expect(makePossesive('açık', Pronoun.PluralSecond)).toBe('açığınız');
  expect(makePossesive('araba', Pronoun.SingularThird)).toBe('arabası');
  expect(makePossesive('kaçak', Pronoun.SingularThird)).toBe('kaçağı');
  expect(makePossesive('bitki', Pronoun.SingularThird)).toBe('bitkisi');
  expect(makePossesive('renk', Pronoun.SingularThird)).toBe('rengi');
  expect(makePossesive('Uç', Pronoun.SingularThird)).toBe('Ucu');
  expect(makePossesive('Süt', Pronoun.SingularThird)).toBe('Sütü');
});

test('Query complete suffix', () => {
  expect(getCompleteSuffix(makePlural('Araba'))).toBe('ın');
  expect(getCompleteSuffix(makePlural('O'))).toBe('ın');
});

test('Make noun complete', () => {
  expect(makeComplete(makePlural('O'))).toBe('Onların');
  expect(`${makeComplete(makePlural('O'))} ${makePossesive('araba', Pronoun.PluralThird)}`).toBe('Onların arabaları');
  expect(makeComplete('araç')).toBe('aracın');
  expect(`${makeComplete('araç')} ${makePossesive('renk', Pronoun.SingularThird)}`).toBe('aracın rengi');
});

test('Query case suffix', () => {
  expect(getCaseSuffix('Kağıt', Case.Accusative)).toBe('ı');
  expect(getCaseSuffix('Ev', Case.Ablative)).toBe('den');
  expect(getCaseSuffix('Kalem', Case.Instrumental)).toBe('le');
  expect(getCaseSuffix('Bardak', Case.Absolute)).toBe('');
  expect(getCaseSuffix('Araba', Case.Dative)).toBe('ya');
  expect(getCaseSuffix('Araba', Case.Locative)).toBe('da');
  expect(getCaseSuffix('Ofis', Case.Locative)).toBe('te');
});

test('Make noun case', () => {
  expect(makeCase('Kağıt', Case.Accusative)).toBe('Kağıdı');
  expect(makeCase(makePossesive('Ses', Pronoun.SingularThird), Case.Instrumental)).toBe('Sesiyle');
  expect(makeCase(makePossesive('Ses', Pronoun.SingularThird), Case.Ablative, false, true)).toBe('Sesinden');
  expect(makeCase('Ev', Case.Ablative)).toBe('Evden');
  expect(makeCase('Araba', Case.Ablative)).toBe('Arabadan');
  expect(makeCase('Hanı', Case.Ablative, false, true)).toBe('Hanından');
  expect(makeCase('Şehir', Case.Dative)).toBe('Şehre');
  expect(makeCase('Araba', Case.Dative)).toBe('Arabaya');
  expect(makeCase(makePossesive('Ses', Pronoun.SingularThird), Case.Dative, false, true)).toBe('Sesine');
  expect(makeCase('Sinema', Case.Dative)).toBe('Sinemaya');
  expect(makeCase('Köprü', Case.Instrumental)).toBe('Köprüyle');
  expect(makeCase(makeCompoundee('Köprü'), Case.Instrumental)).toBe('Köprüsüyle');
  expect(makeCase('Kalem', Case.Instrumental)).toBe('Kalemle');
  expect(makeCase('Bardak', Case.Absolute)).toBe('Bardak');
  expect(makeCase('Araba', Case.Dative)).toBe('Arabaya');
  expect(makeCase('Araba', Case.Locative)).toBe('Arabada');
  expect(makeCase('Ofis', Case.Locative)).toBe('Ofiste');
  expect(makeCase(makeCompoundee('Köprü'), Case.Locative, false, true)).toBe('Köprüsünde');
  expect(makeCase(makeCompoundee('Han'), Case.Locative, true, true)).toBe("Hanı'nda");
});

test('Query compounder suffix', () => {
  expect(getCompounderSuffix('Köprü')).toBe('nün');
  expect(getCompounderSuffix('Han')).toBe('ın');
  expect(getCompounderSuffix('Camisi')).toBe('nin');
  expect(getCompounderSuffix('Müdür')).toBe('ün');
  expect(getCompounderSuffix('Kablo')).toBe('nun');
  expect(getCompounderSuffix('Öğretmen')).toBe('in');
});

test('Make compunder noun', () => {
  expect(makeCompounder('Akıl')).toBe('Aklın');
  expect(makeCompounder('Köprü')).toBe('Köprünün');
  expect(makeCompounder('Kahverenk')).toBe('Kahverengin');
});

test('Query compoundee suffix', () => {
  expect(getCompoundeeSuffix('Kağıt')).toBe('ı');
  expect(getCompoundeeSuffix('Köprü')).toBe('sü');
  expect(getCompoundeeSuffix('Han')).toBe('ı');
  expect(getCompoundeeSuffix('Camisi')).toBe('si');
  expect(getCompoundeeSuffix('Müdür')).toBe('ü');
  expect(getCompoundeeSuffix('Kablo')).toBe('su');
  expect(getCompoundeeSuffix('Öğretmen')).toBe('i');
});

test('Make compundee noun', () => {
  expect(makeCompoundee('Kağıt')).toBe('Kağıdı');
  expect(makeCompoundee('Akıl')).toBe('Aklı');
  expect(makeCompoundee('Köprü')).toBe('Köprüsü');
  expect(makeCompoundee('Kahverenk')).toBe('Kahverengi');
});
