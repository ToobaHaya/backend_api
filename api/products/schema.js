const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    images: {
        type: [String], // Change the type to an array of strings
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "product"
    },
});

const Product = model('product', ProductSchema);
module.exports = Product;
