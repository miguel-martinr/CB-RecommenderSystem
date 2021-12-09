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

  sim(aIndex, bIndex) {
    
    const a = this.corpus[aIndex];
    const b = this.corpus[bIndex];

    const commonTerms = Object.keys(this.IDF).filter(term => a.normalizedTF.hasOwnProperty(term) && b.normalizedTF.hasOwnProperty(term));

    const dotProduct = commonTerms.map(term => a.normalizedTF[term] * b.normalizedTF[term]).reduce((sum, v) => sum + v, 0);
    
    let denomA = 0;
    let denomB = 0; 

    commonTerms.forEach(term => {
      denomA += a.normalizedTF[term] ** 2;
      denomB += b.normalizedTF[term] ** 2;
    });



    return dotProduct / (Math.sqrt(denomA) * Math.sqrt(denomB));
  }

}