import express from 'express'
import data from './data.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
// promise (then) and catch error
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('connected to db')
}).catch((err) => {
    console.log(err.message)
})

const app = express()
app.get('/api/products', (req, res) => {
    res.send(data.products)
})

// '/api/products/slug/:slug dynamic url :slug is dynamic part. change based on browser input url

app.get('/api/products/slug/:slug', (req, res) => {
    /**
     * data.products.find()
     * inside find method an arrow func finding out if product.slug == the slug from browser url
     */
    const product = data.products.find(x => x.slug === req.params.slug)
    if (product) { // if yes render the desired product
        res.send(product)
    } else { // else show error msg telling product not found with that particular slug
        res.status(404).send({ message: 'Product not found!' })
    }
})

app.get('/api/products/:id', (req, res) => {
    /**
     * Manage cart
     * sending info based on id
     * for handling cart
     */
    const product = data.products.find((x) => x._id === req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})