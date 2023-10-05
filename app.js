const express = require('express')
const app = express()
const path = require('path');
const axios = require('axios');
const hbs = require('hbs');
const port = 3000

const viewPath = path.join(__dirname, '/templates/views');
const partialsPath = path.join(__dirname, '/templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
    res.send('Welcome To Tut: How to get data from json api url using axios!')
})

app.get('/products', async (req, res) => {
    try {
        // Fetch data from the API
        const response = await axios.get('https://fakestoreapi.com/products');
        const products = response.data;

        res.render('jsoncomments.hbs', { products });
        // res.render('jsoncomments')
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from the API');
    }
});


app.get('/products/category/:categoryName', (req, res) => {
    // const category = 'electronics';
    // axios.get('https://fakestoreapi.com/products', { params: { category } })
    const categoryName = req.params.categoryName;
    axios.get(`https://fakestoreapi.com/products/category/${categoryName}`)
        .then(response => {
            console.log('Successful Response:');
            const products = response.data;
            res.render('jsoncomments', { products })
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

app.get('/products/:id', async (req, res) => {
    try {
        // Fetch data from the API
        const id = req.params.id;
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        const products = response.data;

        res.render('displayproducts.hbs', { products });
        // res.render('jsoncomments')
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from the API');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})



