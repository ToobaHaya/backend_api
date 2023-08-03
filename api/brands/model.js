const { Schema, model } = require('mongoose');

const BrandSchema = new Schema({
    brandId : {
        type: String,
        required: true,
        unique: true
    },
    BrandName :{
        type: String,
        required: true,
        unique: true
    },
    BrandImage :{
        type: String ,
        required : true
    }
})


const Brand = model('brand' , BrandSchema)
module.exports = {Brand}
