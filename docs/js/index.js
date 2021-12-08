import { Recommender } from './Recommender.js';
import { createTable, createTableCard } from './utils.js';


const recommender = new Recommender();


// Debug
window.recommender = recommender;


// Read input
const reader = new FileReader();
reader.onload = () => {
  recommender.setup(reader.result);

  const opts = {
    markedCells: [],
    styleClasses: [],
    rowHeaders: " ",
    colHeaders: ["Término", "TF", "IDF", "TF-IDF"],
  };
  const resultsContainer = document.getElementById('resultsContainer');
  
  
  recommender.createTables().forEach((table, i) =>  {
    const htmlTable = createTable(table, opts);
    resultsContainer.innerHTML += createTableCard(htmlTable, i + 1);
  });
}

document.getElementById('fileInput').addEventListener('change', (ev) => {
  reader.readAsText(ev.target.files[0]);
});







