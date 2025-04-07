const insertField = document.getElementById("insert-field");
const searchField = document.getElementById("search-field");
const insertButton = document.getElementById("insert-button");
const searchButton = document.getElementById("search-button");
const resultDiv = document.getElementById("result");

insertButton.addEventListener("click", () => {
  try {
    const input = insertField.value.trim();  // trim whitespace
    const doc = JSON.parse(input);  // parse safely
    fetch('/insert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doc)
    })
    .then(res => res.json())
    .then(data => {
      resultDiv.textContent = JSON.stringify(data, null, 2);
    });
  } catch (e) {
    resultDiv.textContent = "⚠️ Invalid JSON format! Please check your input.";
  }
});

searchButton.addEventListener("click", () => {
  try {
    const input = searchField.value.trim();
    const query = JSON.parse(input);
    fetch('/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    })
    .then(res => res.json())
    .then(data => {
      resultDiv.textContent = JSON.stringify(data.results, null, 2);
    });
  } catch (e) {
    resultDiv.textContent = "⚠️ Invalid JSON format! Please check your input.";
  }
});