import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js';

const app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/ptb_cart', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

app.use('/api/products', productRouter);

app.get('/', (req, res) =>{
    res.send('Servidor pronto!!');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Serve at http://localhost:${port}");
})