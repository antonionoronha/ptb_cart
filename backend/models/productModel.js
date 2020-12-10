import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        descricao: { type: String, required: true, unique: true},
        unidade: { type: String, required: true},
        volume: { type: String, required: true},
        marca:{ type: String, required: true},
        peso:{ type: String, required: true},
        quantidade:{ type: Number, required: true},
        preco: { type: Number, required: true},
        index:{ type: Number, required: true},
        
    },

);
const Product = mongoose.model('Product', productSchema);

export default Product;