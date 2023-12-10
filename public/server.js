const express = require('express');
const path = require('path');
const api = require('./assets/js/index.js');
const { clog } = require('./middleware/clog')

const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "clog"
app.use(clog);

// Middleware for pasrsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for index/home page page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);