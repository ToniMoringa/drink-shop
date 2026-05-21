// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.get('/api/db', (req, res) => {
  const data = require('./db.json');
  res.status(200).json(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
