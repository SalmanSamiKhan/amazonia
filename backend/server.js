import express from 'express'
import path from 'path'
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';

// configuring .env file
dotenv.config();

// connect to mongoose, details are written in .env file
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to db');
    })
    .catch((err) => {
        console.log(err.message);
    });

const app = express();

// Form data in the post req will be converted into json obj
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

// Deployment setup
const _dirname = path.resolve()
app.use(express.static(path.join(_dirname, '/frontend/build')))
app.get('*', (req,res)=>
    res.sendFile(path.join(_dirname, '/frontend/build/index.html'))
)

// handle useRoutes error
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});