import express from 'express'
import data from './data.js'
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
    const product = data.products.find(x=> x.slug===req.params.slug)
    if(product){ // if yes render the desired product
        res.send(product)
    }else{ // else show error msg telling not product found with that particular slug
        res.status(404).send({message:'Product not found!'})
    }
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})