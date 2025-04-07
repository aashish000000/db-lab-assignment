const express = require('express');
const nedb = require('nedb-promises');

const app = express();
const db = nedb.create('myfile.jsonl');

app.use(express.static('public'));
app.use(express.json()); // allows parsing JSON in POST body

// RESTful POST route to insert a document
app.post('/insert', (req, res) => {
  const doc = req.body;
  db.insert(doc)
    .then(insertedDoc => {
      res.json({ status: 'inserted', data: insertedDoc });
    })
    .catch(err => {
      res.status(500).json({ error: 'Insert failed' });
    });
});

// RESTful POST route to search documents
app.post('/search', (req, res) => {
  const query = req.body;
  db.find(query)
    .then(docs => {
      res.json({ results: docs });
    })
    .catch(err => {
      res.status(500).json({ error: 'Search failed' });
    });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});