import { CorpusDocument } from "./Document.js";

export class Recommender {
  constructor(textCorpus) {
    if (textCorpus) this.setup(textCorpus);
  }

  setup(textCorpus) {
    this.loadCorpusFromText(textCorpus);
    this.IDF = this.getIDF();
  }


  loadCorpusFromText(textCorpus) {
    this.corpus = textCorpus
      .split("\n")
      .map(docContent => new CorpusDocument(docContent));
  }

  getIDF() {
    const terms = new Set(this.corpus.map(doc => Object.keys(doc.TF)).flat());
    
    const IDF = {};
    
    terms.forEach(term => {
      const dfx = this.corpus.filter(doc => doc.TF.hasOwnProperty(term)).length;
      IDF[term] = Math.log(this.corpus.length / dfx);
    });

    return IDF;
  }

  getTable(doc) {
    const table = Object.entries(doc.TF)
      .map(([term, freq], i) => {
        const idf = this.IDF[term];
        return [term, freq, idf, freq * idf];
      });
    return table;
  }

  createTables() {
    return this.corpus.map(doc => this.getTable(doc));
  }

  getTermMean(term) {
    const tfIdfValues = this.corpus
      .filter(({TF}) => TF.hasOwnProperty(term))
      .map(({TF}) => TF[term] * this.IDF[term]);

    return tfIdfValues.reduce((a, b) => a + b, 0) / tfIdfValues.length;
  }

  sim(aIndex, bIndex) {

    const a = this.corpus[aIndex];
    const b = this.corpus[bIndex];

    const commonTerms = Object.keys(this.IDF).filter(term => a.normalizedTF.hasOwnProperty(term) && b.normalizedTF.hasOwnProperty(term));

    const aTf = commonTerms.map(term => a.TF[term]);
    const bTf = commonTerms.map(term => b.TF[term]);

    const dotProduct = aTf.map((aValue, i) => aValue * bTf[i]).reduce((sum, val) => sum + val, 0);

    let denomA = 0;
    let denomB = 0;

    commonTerms.forEach((_, i) => {
      denomA += aTf[i] ** 2;
      denomB += bTf[i] ** 2;
    });

    return dotProduct / (Math.sqrt(denomA) * Math.sqrt(denomB));
  }

}