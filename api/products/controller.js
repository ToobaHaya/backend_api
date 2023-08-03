const mongoose = require('mongoose')
require('dotenv').config()
const Product = require('./schema');

const Productbybrand = async (req,res) => {

    const { brand } = req.params
    try {
      await mongoose.connect(process.env.MONGO_URL)
      const brands = await Product.findOne({ brand: brand })
      res.json(
          {
            brands: brands
          }
        )

    }
    catch (error) {
        res.json(
            {
                message: error.message
            }
        )

    }
}

const Productbycategory = async (req,res) => {

    const { brand } = req.params
    try {
      await mongoose.connect(process.env.MONGO_URL)
      const categories = await Product.findOne({ category: category })
      res.json(
          {
            categories: categories
          }
        )

    }
    catch (error) {
        res.json(
            {
                message: error.message
            }
        )

    }
}


const postProducts = async (req, res) => {
    const { id, title, price, brand, category, images } = req.body;
    console.log({ id, title, price, brand, category, images });
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connected");

        // Create a new instance of the Product model
        const newProduct = new Product({
            id,
            title,
            price,
            brand,
            category,
            images,
        });

        // Save the new product to the database
        await newProduct.save();

        res.status(208).json({
            message: "Product Added Successfully",
        });
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
};

const updateproduct = async (req, res) => {
    const { _id, id ,title, price, brand, category, images} = req.body
  
    const filter = { _id };
    const update = { id,title, price, brand, category, images };
  
    try {
        await connect(process.env.MONGO_URL)
  
        await Product.findOneAndUpdate(filter, update, {
            new: true
        });
  
        const product = await Product.find()
  
        res.json({
            message: "Success",
            product
        })
  
    }
  
  
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
  
  }

const deleteproduct = async (req, res) => {

    const { _id } = req.body
  
  
    try {
        await connect(process.env.MONGO_URL)
        await Product.deleteOne({ _id })
        const product = await Product.find()
        res.status(200).json({
            message: "Deleted Successfully",
            product
        })
    }
  
  
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
  
  }

module.exports = { Productbybrand, postProducts , Productbycategory , updateproduct , deleteproduct}