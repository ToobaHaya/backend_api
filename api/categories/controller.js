const { Category } = require('./model')
const mongoose = require('mongoose')
require('dotenv').config()

const CreateCategory = async (req,res) => {
  
    const {CategoryId, CategoryName } =  req.body
    if(!CategoryName || !CategoryId){
        res.json({
            message:"Please insert proper value"
        })
    }
    else{
        try {
            await mongoose.connect(process.env.MONGO_URL)
        console.log("DB Connected")
        const existingname= await Category.exists({ CategoryName: CategoryName })
        const existingid = await Category.exists({ CategoryId:     CategoryId })
      if (existingname) {
        res.status(208).json({
          message: "Category Name already exists",
        });
      } else if (existingid) {
        res.status(208).json({
          message: "Category Id already exists",
        });
    }
        else{
      await Category.create({CategoryId, CategoryName })
      res.status(201).json({
        message : "Category created successfully"
      })
        }
    }
         catch (error) {
            res.json({
                message:error.message
            })
    
    }
}
}

const CategoryByID = async (req,res) => {

    const { CategoryId } = req.params
    try {
      await mongoose.connect(process.env.MONGO_URL)
      const Categories = await Category.findOne({ CategoryId: CategoryId })
      res.json(
          {
            Categories: Categories
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


const CategoryByName = async (req,res) => {

    const { CategoryName } = req.params
    try {
      await mongoose.connect(process.env.MONGO_URL)
      const Categories = await Category.findOne({ CategoryName: CategoryName })
      res.json(
          {
            Categories: Categories
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
const updateCategory = async (req, res) => {
  const { _id, CategoryName, CategoryImage } = req.body

  const filter = { _id };
  const update = { CategoryName, CategoryImage };

  try {
      await connect(process.env.MONGO_URL)

      await Category.findOneAndUpdate(filter, update, {
          new: true
      });

      const category = await Category.find()

      res.json({
          message: "Success",
          category
      })

  }


  catch (error) {
      res.status(400).json({
          message: error.message
      })
  }

}

const deletecategory = async (req, res) => {

  const { _id } = req.body


  try {
      await connect(process.env.MONGO_URL)
      await Category.deleteOne({ _id })
      const category = await Category.find()
      res.status(200).json({
          message: "Deleted Successfully",
          category
      })
  }


  catch (error) {
      res.status(400).json({
          message: error.message
      })
  }

}

module.exports = { CreateCategory , CategoryByID ,CategoryByName , deletecategory , updateCategory } 