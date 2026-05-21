// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.get('/api/db', async (req, res) => {
  try {
    const response = await fetch('https://json-server-vercel-five-sand.vercel.app');
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

