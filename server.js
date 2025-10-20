//Server (Node+Express) This uses process.env.EVENTCAST_TOKEN (load locally with dotenv during dev)

require('dotenv').config(); // dev only; on production your host will set env vars
const express = require('express');
const fetch = (...args) => import('node-fetch').then(m => m.default(...args)); // Node <18 compat
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/events', async (req, res) => {
  try {
    const token = process.env.EVENTCAST_TOKEN;
    if (!token) return res.status(500).json({ error: 'Server misconfiguration' });

    // call the upstream API using the token — replace URL with the real API
    const upstream = await fetch('https://upstream.example/api/events', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!upstream.ok) {
      return res.status(upstream.status).send(await upstream.text());
    }

    const data = await upstream.json();

    // Optionally sanitize or limit fields before returning to clients
    return res.json(data);
  } catch (err) {
    console.error('Error fetching events:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
});

app.listen(PORT, () => console.log(`API proxy listening on ${PORT}`));
