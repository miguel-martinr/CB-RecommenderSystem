import { removePunctuations } from "./utils.js";

export class CorpusDocument {
  constructor(textContent) {
    if (textContent) this.setup(textContent);
  }

  setup(textContent) {
    this.loadTextContent(textContent);
    this.loadNormalizedTF();
  }


  loadTextContent(textContent) {
    const terms = removePunctuations(textContent)
      .toLowerCase()
      .trim() 
      .split(/\s+/);

    this.TF = {};
    terms.forEach(term => this.TF[term] ? this.TF[term]++ : this.TF[term] = 1);
  }

  loadNormalizedTF() {
    const vectorLength = Object.values(this.TF).reduce((a, b) => a + b, 0);

    const normalizedTF = {...this.TF};
    Object.entries(normalizedTF).forEach(([term, tf]) => normalizedTF[term] = tf / vectorLength);
    this.normalizedTF = normalizedTF;
  }

}