import { Recommender } from './Recommender.js';
const recommender = new Recommender();


// Debug
window.recommender = recommender;


// Read input
const reader = new FileReader();
reader.onload = () => {
  recommender.loadCorpusFromText(reader.result);
}

document.getElementById('fileInput').addEventListener('change', (ev) => {
  reader.readAsText(ev.target.files[0]);
});