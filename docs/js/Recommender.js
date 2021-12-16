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
      IDF[term] = Math.log10(this.corpus.length / dfx);
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

    const aNormTF = commonTerms.map(term => a.normalizedTF[term]);
    const bNormTF = commonTerms.map(term => b.normalizedTF[term]);

    const cosine = aNormTF.map((aTf, i) => aTf * bNormTF[i]).reduce((sum, v) => sum + v, 0);
    return cosine;
  }

  getSimMatrix() {
    const simMatrix = Array(this.corpus.length).fill(0).map(row => new Array(this.corpus.length).fill(0));
    
    for (let i = 0; i < this.corpus.length; i++) {
      for (let j = 0; j <= i; j++) {
        const ijSim = this.sim(i, j);
        simMatrix[i][j] = ijSim;
        simMatrix[j][i] = ijSim;
      }
    }
    return simMatrix;
  }

}