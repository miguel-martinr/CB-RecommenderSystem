export function removePunctuations(text, _punctuation) {
  const punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~' + (_punctuation || '');
  const regex = new RegExp('[' + punctuation + ']', 'g');
  return text.replace(regex, '');
}

