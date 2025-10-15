const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing url parameter.');

  try {
    const response = await fetch(url, { headers: { "User-Agent": "Nebula-Proxy" } });
    const contentType = response.headers.get('content-type');
    if (contentType) res.set('content-type', contentType);

    response.body.pipe(res);
  } catch (err) {
    res.status(500).send('Error fetching the requested URL.');
  }
});

app.listen(PORT, () => {
  console.log(`Nebula Proxy running at http://localhost:${PORT}`);
});
