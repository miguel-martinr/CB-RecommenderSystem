import { CorpusDocument } from "./Document.js";

export class Recommender {
  constructor(textCorpus) {
    if (textCorpus) this.loadCorpusFromText(textCorpus);
  }


  loadCorpusFromText(textCorpus) {
    this.corpus = textCorpus
      .split("\n")
      .map(docContent => new CorpusDocument(docContent));
  }

  getIDF(doc) {
    const terms = new Set(this.corpus.map(doc => Object.keys(doc.TF)).flat());
    
    const IDF = {};
    
    terms.forEach(term => {
      const dfx = this.corpus.filter(doc => doc.TF.hasOwnProperty(term)).length;
      IDF[term] = Math.log(this.corpus.length / dfx);
    });

    return IDF;
  }
}