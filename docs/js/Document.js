import { removePunctuations } from "./utils.js";

export class CorpusDocument {
  constructor(textContent) {
    if (textContent) this.loadTextContent(textContent);
  }


  loadTextContent(textContent) {
    const terms = removePunctuations(textContent)
      .toLowerCase()
      .trim() 
      .split(/\s+/);

    this.TF = {};
    terms.forEach(term => this.TF[term] ? this.TF[term]++ : this.TF[term] = 1);
  }


}