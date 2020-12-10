import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import data from '../data.js';

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req,res) => {
    const produtos = await Product.find({});
    res.send(produtos);
}))

productRouter.get('/seed', expressAsyncHandler(async(req,res) => {
    await Product.remove({});
    const createdProducts = await Product.insertMany(data.produtos);
    res.send({createdProducts});
})
);

productRouter.get('/:id', expressAsyncHandler(async(req,res) => {
    const produto = await Product.findById(req.params.id);
    if(produto){
    res.send(produto);
    }
    else{
        res.status(404).send({message: 'Produto não encontrado'});
    }
}))

export default productRouter;