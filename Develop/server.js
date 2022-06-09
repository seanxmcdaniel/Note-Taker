
const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = 3001;

const app = express();
const apiRoute = require('./router/routes');
const htmlRoute = require('./router/routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/api', apiRoute);
app.use('/', htmlRoute);

app.listen(PORT, () => {
  console.log(`Notes app listening on port ${PORT}`);
}); 
