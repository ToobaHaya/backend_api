const {Brand} = require('./model')
const mongoose = require('mongoose')
require('dotenv').config()

const AddBrand = async (req,res) => {
  
    const {brandId, BrandName, BrandImage } =  req.body
    if(!BrandName || !BrandImage ){
        req.json({
            message:"Please insert proper value"
        })
    }
    else{
        try {
            await mongoose.connect(process.env.MONGO_URL)
        console.log("DB Connected")
        const existingBrand = await Brand.exists({ BrandName: BrandName })
        const existingid = await Category.exists({ brandId:     brandId })
        if(existingBrand) {
            res.status(208).json({
                message: "Brand Already Exists"
            })
        }
        else if (existingid) {
            res.status(208).json({
              message: "Brand Id already exists",
            });
        }
        else{
      await Brand.create({brandId, BrandName, BrandImage })
      res.status(201).json({
        message : "brand created successfully"
      })
        }
    }
         catch (error) {
            res.json({
                message: error.message
            })
    
    }
}
}

const brandByID = async (req,res) => {

    const { brandId } = req.params
    try {
        await mongoose.connect(process.env.MONGO_URL)
        const Brands = await Brand.findOne({ brandId : brandId  })
        res.json(
            {
                Brands: Brands
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


const getAllBrands = async (req,res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        const Brands = await Brand.find()
        res.json(
            {
               Brands: Brands
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

const brandByName = async (req,res) => {

    const { BrandName } = req.params
    try {
        await mongoose.connect(process.env.MONGO_URL)
        const Brands = await Brand.findOne({ BrandName : BrandName  })
        res.json(
            {
                Brands: Brands
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
const deletebrand = async (req, res) => {          

    const { _id } = req.body
  
  
    try {
        await connect(process.env.MONGO_URL)
        await Brand.deleteOne({ _id })
        const brand = await Brand.find()
        res.status(200).json({
            message: "Deleted Successfully",
            brand
        })
    }
  
  
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
  
  }
  

  const updateBrand = async (req, res) => {
    const { _id, brandId,BrandName,BrandImage } = req.body
  
    const filter = { _id };
    const update = {  brandId,BrandName,BrandImage };
  
    try {
        await connect(process.env.MONGO_URL)
  
        await Brand.findOneAndUpdate(filter, update, {
            new: true
        });
  
        const brand = await Brand.find()
  
        res.json({
            message: "Success",
            brand
        })
  
    }
  
  
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
  
  }

module.exports = { AddBrand , brandByID , getAllBrands , brandByName , deletebrand , updateBrand } 