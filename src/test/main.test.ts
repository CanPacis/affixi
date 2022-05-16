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
  getCompoundSuffix,
  makeCompound,
  AffixiWord,
  Compound,
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
  expect(makePossesive('Ömür', Pronoun.SingularFirst)).toBe('Ömrüm');
  expect(makePossesive('Ses', Pronoun.PluralThird)).toBe('Sesleri');
  expect(makePossesive('Süt', Pronoun.PluralSecond)).toBe('Sütünüz');
  expect(makePossesive('Süt', Pronoun.PluralSecond)).toBe('Sütünüz');
  expect(makePossesive('Monako', Pronoun.SingularSecond, true)).toBe('Monako\'n');
});

// test('Query complete suffix', () => {
//   expect(getCompleteSuffix(makePlural('Araba'))).toBe('ın');
//   expect(getCompleteSuffix(makePlural('O'))).toBe('ın');
// });

// test('Make noun complete', () => {
//   expect(makeComplete(makePlural('O'))).toBe('Onların');
//   expect(`${makeComplete(makePlural('O'))} ${makePossesive('araba', Pronoun.PluralThird)}`).toBe('Onların arabaları');
//   expect(makeComplete('araç')).toBe('aracın');
//   expect(`${makeComplete('araç')} ${makePossesive('renk', Pronoun.SingularThird)}`).toBe('aracın rengi');
// });

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
  expect(makeCase(makeCompound('Köprü', Compound.Compoundee), Case.Instrumental)).toBe('Köprüsüyle');
  expect(makeCase('Kalem', Case.Instrumental)).toBe('Kalemle');
  expect(makeCase('Bardak', Case.Absolute)).toBe('Bardak');
  expect(makeCase('Araba', Case.Dative)).toBe('Arabaya');
  expect(makeCase('Araba', Case.Locative)).toBe('Arabada');
  expect(makeCase('Ofis', Case.Locative)).toBe('Ofiste');
  expect(makeCase(makeCompound('Köprü', Compound.Compoundee), Case.Locative, false, true)).toBe('Köprüsünde');
  expect(makeCase(makeCompound('Han', Compound.Compoundee), Case.Locative, true, true)).toBe("Hanı'nda");
});

test('Query compounder suffix', () => {
  expect(getCompoundSuffix('Köprü', Compound.Compounder)).toBe('nün');
  expect(getCompoundSuffix('Han', Compound.Compounder)).toBe('ın');
  expect(getCompoundSuffix('Camisi', Compound.Compounder)).toBe('nin');
  expect(getCompoundSuffix('Müdür', Compound.Compounder)).toBe('ün');
  expect(getCompoundSuffix('Kablo', Compound.Compounder)).toBe('nun');
  expect(getCompoundSuffix('Öğretmen', Compound.Compounder)).toBe('in');
});

test('Make compunder noun', () => {
  expect(makeCompound('Akıl', Compound.Compounder)).toBe('Aklın');
  expect(makeCompound('Köprü', Compound.Compounder)).toBe('Köprünün');
  expect(makeCompound('Kahverenk', Compound.Compounder)).toBe('Kahverengin');
  expect(makeCompound('Hukuk', Compound.Compounder)).toBe('Hukukun');
  expect(makeCompound('Süt', Compound.Compounder)).toBe('Sütün');
  expect(makeCompound('Azerbaycan', Compound.Compounder, true)).toBe("Azerbaycan'ın");
  expect(makeCompound('Monako', Compound.Compounder, true)).toBe('Monako\'nun');
});

test('Query compoundee suffix', () => {
  expect(getCompoundSuffix('Kağıt', Compound.Compoundee)).toBe('ı');
  expect(getCompoundSuffix('Köprü', Compound.Compoundee)).toBe('sü');
  expect(getCompoundSuffix('Han', Compound.Compoundee)).toBe('ı');
  expect(getCompoundSuffix('Camisi', Compound.Compoundee)).toBe('si');
  expect(getCompoundSuffix('Müdür', Compound.Compoundee)).toBe('ü');
  expect(getCompoundSuffix('Kablo', Compound.Compoundee)).toBe('su');
  expect(getCompoundSuffix('Öğretmen', Compound.Compoundee)).toBe('i');
});

test('Make compundee noun', () => {
  expect(makeCompound('Kağıt', Compound.Compoundee)).toBe('Kağıdı');
  expect(makeCompound('Akıl', Compound.Compoundee)).toBe('Aklı');
  expect(makeCompound('Köprü', Compound.Compoundee)).toBe('Köprüsü');
  expect(makeCompound('Kahverenk', Compound.Compoundee)).toBe('Kahverengi');
});

test('Make compound phrase', () => {
  expect(
    `Siyah ${makeCompound('araba', Compound.Compounder)} çirkin ${makeCompound('anahtar', Compound.Compoundee)}`,
  ).toBe('Siyah arabanın çirkin anahtarı');
  expect(
    `Siyah ${makeCompound('araba', Compound.Compounder)} çirkin ${makeCompound(
      makePlural('anahtar'),
      Compound.Compoundee,
    )}`,
  ).toBe('Siyah arabanın çirkin anahtarları');
  expect(`${makeCompound('araç', Compound.Compounder)} ${makeCompound('renk', Compound.Compoundee)}`).toBe(
    'aracın rengi',
  );
  expect(`kestane ${makeCompound('bal', Compound.Compoundee)}`).toBe('kestane balı');
  expect(
    `kestane ${makeCompound(makeCompound('bal', Compound.Compoundee), Compound.Compounder)} ${makeCompound(
      'diyar',
      Compound.Compoundee,
    )}`,
  ).toBe('kestane balının diyarı');
});

test('Test AffixiWord construct', () => {
  let ses = new AffixiWord('Ses');

  ses.makePossesive(Pronoun.SingularThird).makeCase(Case.Ablative);
  expect(ses.toString()).toBe('Sesinden');
  ses.undo();
  expect(ses.toString()).toBe('Sesi');
  ses.makeCase(Case.Ablative);
  expect(ses.history.length).toBe(2);
  ses.undo().undo();
  expect(ses.toString()).toBe('Ses');
  expect(ses.isCompound).toBe(false);
  ses.makePossesive(Pronoun.SingularFirst).makeCase(Case.Ablative);
  expect(ses.toString()).toBe('Sesimden');
  ses.undo();
  ses.undo();
  ses.makePossesive(Pronoun.SingularSecond).makeCase(Case.Ablative);
  expect(ses.toString()).toBe('Sesinden');
  ses.undo();
  ses.undo();
  ses.makePossesive(Pronoun.SingularThird).makeCase(Case.Ablative);
  expect(ses.toString()).toBe('Sesinden');
});
