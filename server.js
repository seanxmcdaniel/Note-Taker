const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/db/db.json'));
});

app.post('/api/notes', (req, res) => {
  let newNote = req.body

  fs.readFile('./db/db.json', (err, data) => {
    if(err) throw err
    let dbFile = JSON.parse(data)
    dbFile.push(newNote)
    fs.writeFile('./db/db.json', JSON.stringify(dbFile), 'UTF-8', err => {
      if(err) throw err
      console.log('Saved new note.')
    })
  })
  res.redirect('/notes')
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Notes app listening on port ${PORT}`);
}); 
