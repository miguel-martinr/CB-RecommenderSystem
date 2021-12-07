export class Recommender {
  constructor(textCorpus) {
    if (textCorpus) this.loadCorpusFromText(textCorpus);
  }


  loadCorpusFromText(textCorpus) {
    this.corpus = textCorpus
      .split("\n")
      .map(document => this.removePunctuation(document));
  }

  removePunctuation(text, _punctuation) {
    const punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~' + (_punctuation || '');
    const regex = new RegExp('[' + punctuation + ']', 'g');
    return text.replace(regex, '');
  }


}