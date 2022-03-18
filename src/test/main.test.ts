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
  alterToVowelDrop,
  makePossesive,
  Pronoun,
  getCompleteSuffix,
  makeComplete,
  getCaseSuffix,
  Case,
  makeCase,
  getQuestionSuffix,
  makeQuestion,
  makeRelative,
} from '../main';

test('Component getter', () => {
  expect(util.getComponents('isim')).toEqual({ letter: 'm', vowel: 'i', syllableCount: 2 });
  expect(util.getComponents('araç')).toEqual({ letter: 'ç', vowel: 'a', syllableCount: 2 });
  expect(util.getComponents('kaya')).toEqual({ letter: 'a', vowel: 'a', syllableCount: 2 });
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
  expect(getPluralSuffix('Araba')).toEqual({ suffix: 'lar', prefix: '', infix: '' });
  expect(getPluralSuffix('İsim')).toEqual({ suffix: 'ler', prefix: '', infix: '' });
  expect(getPluralSuffix('kanaat')).toEqual({ suffix: 'lar', prefix: '', infix: '' });
  expect(getPluralSuffix('elit')).toEqual({ suffix: 'ler', prefix: '', infix: '' });
});

test('Create plural', () => {
  expect(makePlural('Araba')).toBe('Arabalar');
  expect(makePlural('İsim')).toBe('İsimler');
  expect(makePlural('kanaat')).toBe('kanaatlar');
  expect(makePlural('elit')).toBe('elitler');
  expect(makePlural('O')).toBe('Onlar');
});

test('Query equality suffix', () => {
  expect(getEqualitySuffix('Çocuk')).toEqual({ suffix: 'ça', prefix: '', infix: '' });
  expect(getEqualitySuffix('Bebek')).toEqual({ suffix: 'çe', prefix: '', infix: '' });
  expect(getEqualitySuffix('akıllı')).toEqual({ suffix: 'ca', prefix: '', infix: '' });
  expect(getEqualitySuffix('sebepsiz')).toEqual({ suffix: 'ce', prefix: '', infix: '' });
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
  expect(getPossesiveSuffix('Çocuk', Pronoun.SingularFirst)).toEqual({ suffix: 'um', infix: '', prefix: '' });
  expect(getPossesiveSuffix('Bebek', Pronoun.SingularSecond)).toEqual({ suffix: 'in', infix: '', prefix: '' });
  expect(getPossesiveSuffix('Sebep', Pronoun.SingularThird)).toEqual({ suffix: 'i', infix: '', prefix: '' });
  expect(getPossesiveSuffix('Akıl', Pronoun.PluralFirst)).toEqual({ suffix: 'ımız', infix: '', prefix: '' });
  expect(getPossesiveSuffix('Merak', Pronoun.PluralSecond)).toEqual({ suffix: 'ınız', infix: '', prefix: '' });
  expect(getPossesiveSuffix('Ağaç', Pronoun.PluralThird)).toEqual({ suffix: 'ları', infix: '', prefix: '' });
  expect(getPossesiveSuffix('araba', Pronoun.SingularThird)).toEqual({ suffix: 'ı', infix: 's', prefix: '' });
  expect(getPossesiveSuffix('araba', Pronoun.SingularFirst)).toEqual({ suffix: 'm', infix: '', prefix: '' });
  expect(getPossesiveSuffix('kaçak', Pronoun.SingularThird)).toEqual({ suffix: 'ı', infix: '', prefix: '' });
  expect(getPossesiveSuffix('bitki', Pronoun.SingularThird)).toEqual({ suffix: 'i', infix: 's', prefix: '' });
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
  expect(getCompleteSuffix(makePlural('Araba'))).toEqual({ suffix: 'ın', prefix: '', infix: '' });
  expect(getCompleteSuffix(makePlural('O'))).toEqual({ suffix: 'ın', prefix: '', infix: '' });
});

test('Make noun complete', () => {
  expect(makeComplete("Azerbaycan", true)).toBe("Azerbaycan'ın")
  expect(makeComplete(makePlural('O'))).toBe('Onların');
  expect(`${makeComplete(makePlural('O'))} ${makePossesive('araba', Pronoun.PluralThird)}`).toBe('Onların arabaları');
  expect(makeComplete('araç')).toBe('aracın');
  expect(`${makeComplete('araç')} ${makePossesive('renk', Pronoun.SingularThird)}`).toBe('aracın rengi');
});

test('Query case suffix', () => {
  expect(getCaseSuffix('Kağıt', Case.Accusative)).toEqual({ suffix: 'ı', infix: '', prefix: '' });
  expect(getCaseSuffix('Ev', Case.Ablative)).toEqual({ suffix: 'den', infix: '', prefix: '' });
  expect(getCaseSuffix('Kalem', Case.Instrumental)).toEqual({ suffix: 'le', infix: '', prefix: '' });
  expect(getCaseSuffix('Bardak', Case.Absolute)).toEqual({ suffix: '', infix: '', prefix: '' });
  expect(getCaseSuffix('Araba', Case.Dative)).toEqual({ suffix: 'a', infix: 'y', prefix: '' });
  expect(getCaseSuffix('Ofis', Case.Locative)).toEqual({ suffix: 'te', infix: '', prefix: '' });
});

test('Make noun case', () => {
  expect(makeCase('Kağıt', Case.Accusative)).toBe('Kağıdı');
  expect(makeCase(makePossesive('Ses', Pronoun.SingularThird), Case.Instrumental)).toBe('Sesiyle');
  expect(makeCase(makePossesive('Ses', Pronoun.SingularThird), Case.Ablative)).toBe('Sesinden');
  expect(makeCase('Ev', Case.Ablative)).toBe('Evden');
  expect(makeCase('Şehir', Case.Dative)).toBe('Şehre');
  expect(makeCase('Sinema', Case.Dative)).toBe('Sinemaya');
  expect(makeCase('Kalem', Case.Instrumental)).toBe('Kalemle');
  expect(makeCase('Bardak', Case.Absolute)).toBe('Bardak');
  expect(makeCase('Araba', Case.Dative)).toBe('Arabaya');
  expect(makeCase('Araba', Case.Locative)).toBe('Arabada');
  expect(makeCase('Araba', Case.Ablative)).toBe('Arabadan');
  expect(makeCase('Ofis', Case.Locative)).toBe('Ofiste');
  expect(makeCase('Hanı', Case.Locative)).toBe('Hanında');
  expect(makeCase('Hanı', Case.Accusative)).toBe('Hanını');
  expect(makeCase('Hanı', Case.Locative, true)).toBe("Hanı'nda");
  expect(makeCase(makePossesive('Ongözlü Köprü', Pronoun.SingularThird), Case.Locative, true)).toBe(
    "Ongözlü Köprüsü'nde",
  );
  expect(makeCase('Hasan Paşa Hanı', Case.Locative, true)).toBe("Hasan Paşa Hanı'nda");
  expect(makeCase('Diyarbakır Ulu Cami', Case.Locative, true)).toBe("Diyarbakır Ulu Cami'nde");
});

test('Query question suffix/preposition', () => {
  expect(getQuestionSuffix('Kağıt')).toEqual({ suffix: ' mı', infix: '', prefix: '' });
  expect(getQuestionSuffix('Ev')).toEqual({ suffix: ' mi', infix: '', prefix: '' });
  expect(getQuestionSuffix('Kök')).toEqual({ suffix: ' mü', infix: '', prefix: '' });
  expect(getQuestionSuffix('Kuyruk')).toEqual({ suffix: ' mu', infix: '', prefix: '' });
});

test('Make noun interrogatvie', () => {
  expect(makeQuestion('Kağıt')).toBe('Kağıt mı');
  expect(makeQuestion('Ev')).toBe('Ev mi');
  expect(makeQuestion('Kök')).toBe('Kök mü');
  expect(makeQuestion('Kuyruk')).toBe('Kuyruk mu');
});

test('Make noun relative', () => {
  expect(makeRelative('Ali', Pronoun.SingularSecond, true)).toBe("Ali'ninki");
});

test('Misc tests', () => {
  expect(makePossesive('Çakmak', Pronoun.PluralSecond)).toBe('Çakmağınız');
  expect(makePossesive(makePlural('Çakmak'), Pronoun.SingularThird)).toBe('Çakmakları');
  expect(makeCase('Kek', Case.Dative)).toBe('Keke');
  expect(makeCase('Çakmak', Case.Dative)).toBe('Çakmağa');
  expect(util.concat('AVM', getCaseSuffix('aveme', Case.Ablative), true)).toBe("AVM'den");
});
