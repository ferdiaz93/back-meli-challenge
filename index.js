
import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 3001;

app.use(cors())

app.get('/api/items', async(req, res) => {
    try{
        const { data:{ categories, results } } = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}`);
        // const { data: { nickname }} = await axios.get(`https://api.mercadolibre.com/users/${data.seller_id}`);
        const response = {
            author:{
                name: "author test",
            },
            categories: categories,
            items: results.map(item => ({
                id: item.id,
                title: item.title,
                price: {
                    currency: item.currency_id,
                    amount: Math.floor(item.price),
                    decimals: item.price.toString().split('.')[1]
                },
                picture: item.thumbnail,
                condition: item.condition,
                free_shipping: item.shipping.free_shipping,
            }))
        }
        res.status(200).json(response)
    }catch(error){
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
});

app.get('/api/items/:id', async(req, res) => {
    try{
        const { data: { id, title, currency_id, price, thumbnail, condition, shipping, sold_quantity, seller_id } } = await axios.get(`https://api.mercadolibre.com/items/${req.params.id}`);
        const { data: { plain_text }} = await axios.get(`https://api.mercadolibre.com/items/${req.params.id}/description`);
        const { data: { nickname }} = await axios.get(`https://api.mercadolibre.com/users/${seller_id}`);
        const finalResponse = {
            author:{
                name: nickname,
            },
            item:{
                id: id,
                title: title,
                price: {
                    currency: currency_id,
                    amount: Math.floor(price),
                    decimals: price.toString().split('.')[1]
                },
                picture: thumbnail,
                condition: condition,
                free_shipping: shipping.free_shipping,
                sold_quantity: sold_quantity,
                description: plain_text
            }
        }
        res.status(200).json(finalResponse)
    }catch(error){
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
});

app.listen(PORT, () => {
    console.log(`PUERTO ${PORT}`);
});
