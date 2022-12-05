import express from 'express'
import data from './data.js'
const app = express()

app.get('/api/product', (req, res) => {
    res.send(data)
})

const port = process.env.PORT || 500

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})