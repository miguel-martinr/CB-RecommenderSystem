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
}