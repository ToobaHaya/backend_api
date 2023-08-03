const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
    CategoryId : {
        type: String,
        required: true,
        unique: true
    },
    CategoryName :{
        type: String,
        required: true,
        unique: true
    },

})


const Category  = model('category' , CategorySchema)
module.exports = { Category }
