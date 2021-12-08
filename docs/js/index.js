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
  resultsContainer.innerHTML = "";
  
  recommender.createTables().forEach((table, i) =>  {
    table = table.map(([term, tf, idf, tfIdf]) => [term, tf, idf.toFixed(2), tfIdf.toFixed(2)]);
    const htmlTable = createTable(table, opts);
    resultsContainer.innerHTML += createTableCard(htmlTable, i + 1);
  });
}

document.getElementById('fileInput').addEventListener('change', (ev) => {
  reader.readAsText(ev.target.files[0]);
});







