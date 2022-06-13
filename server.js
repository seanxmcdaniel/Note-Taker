const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
const uniqid = require('uniqid');

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
  let noteID = uniqid();
  newNote.id = noteID;
  fs.readFile('./db/db.json', (err, data) => {
    if(err) throw err
    let database = JSON.parse(data)
    database.push(newNote)
    fs.writeFile('./db/db.json', JSON.stringify(database), 'UTF-8', err => {
      if(err) throw err
      console.log('Saved a new note.')
    })
  })
  res.redirect('/notes')
});

app.delete('/api/notes/:id', (req, res) => {
  let readfileSync = fs.readFileSync(path.join(__dirname, '/db/db.json'));
  let database = JSON.parse(readfileSync)
  let currentID = req.params.id
  let databaseFiltered = database.filter(note => note.id != currentID)
  fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(databaseFiltered)) 
  res.sendStatus(200) 
});

app.listen(PORT, () => {
  console.log(`Notes app is now listening on port ${PORT}`);
}); 
