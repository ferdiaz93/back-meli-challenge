
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

app.get('/api/items', async(req, res) => {
    const result = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}`).then(res => res.json())
    res.status(200).json(result)
});

app.get('/api/items/:id', async(req, res) => {
    const result = await fetch(`https://api.mercadolibre.com/items/${req.params.id}`).then(res => res.json())
    const result_description = await fetch(`https://api.mercadolibre.com/items/${req.params.id}/description`).then(res => res.json())
    res.status(200).json(result_description)
});

app.listen(PORT, () => {
    console.log(`PUERTO ${PORT}`);
});
