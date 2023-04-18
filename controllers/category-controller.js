const Category = require("../models/categoryModel");
const Product = require('../models/productModel');


exports.getCategory = async(req, res, next ) =>{
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json({
            success: true,
            count : category.length,
            data: category
        })
    } catch (error) {
        res.status(400).json({
            success:false
        });
    }    
     
};

exports.getAllCategory = async(req, res, next ) =>{
    
    try {
        const category = await Category.find().populate('products');
        res.status(200).json({
            success: true,
            count : category.length,
            data: category,
            msg: "Get all food"
        });
        
    } catch (error) {

        res.status(400).json({
            success:false
        });
        
    }
    
     
};

exports.createCategory = async(req, res, next ) =>{
    const category  = await Category.create(req.body);
 
    res.status(201).json({
       success: true,
       data: category
    });  
        
};

exports.updateCategory = async(req, res, next ) =>{
    try {

        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
         });
         if(!updatedCategory){
            return res.status(400).json({success: false});
         }
      
      res.status(200).json({success: true, data: updatedCategory});
        
    } catch (error) {
        res.status(400).json({success: false});
    }
     
};

exports.deleteCategory = async(req, res, next ) =>{

    try {
        const categoryId = req.params.id;
        const deletedCategory = await Category.findById(categoryId);
        console.log("Deleted :" , deletedCategory);

            await Product.deleteMany({
                category : categoryId
            });

            await deletedCategory.deleteOne();

        res
            .status(200)
            .json(
                {
                    success: true,
                    count : deletedCategory.length,
                    data: deletedCategory
                });
      } catch (error) {
        res.status(400).json({success: false,
            error : error,
        msg: error.message});
      }
       
     
};

exports.deleteAllCategory = async(req, res, next ) =>{

    try {
        const deletedCategory = await Category.deleteMany({});
        if(!deletedFood){
           return res.status(400).json({success: false});
        }
     
     res.status(200).json({success: true,count : category.length, data: deletedCategory});
      } catch (error) {
        res.status(400).json({success: false});
      }
    
};
