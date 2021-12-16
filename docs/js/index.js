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
  
  const loadingMessage = document.getElementById('loadingMessage');
  loadingMessage.hidden = false;
  

  // Docs similarity matrix
  const simMatrix = recommender.getSimMatrix().map(row => row.map(sim => sim.toFixed(3)));
  const simHtmlTable = createTable(simMatrix, {...opts, rowHeaders: "Doc ", colHeaders: "Doc "});
  resultsContainer.innerHTML = createTableCard(simHtmlTable, 0, `Similitud coseno entre documentos`);
  
  // Terms matrix by document
  recommender.createTables().forEach((table, i) =>  {
    table = table.map(([term, tf, idf, tfIdf]) => [term, tf, idf.toFixed(2), tfIdf.toFixed(2)]);
    const htmlTable = createTable(table, opts);
    resultsContainer.innerHTML += createTableCard(htmlTable, i + 1, `Documento ${i + 1}`);
  });




  loadingMessage.hidden = true;
}

document.getElementById('fileInput').addEventListener('change', (ev) => {
  reader.readAsText(ev.target.files[0]);
});







