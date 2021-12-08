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


}