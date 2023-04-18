const categoryModel = require("../models/categoryModel");
const productModel = require("../models/productModel");


exports.getProduct = async(req, res, next ) =>{
    try {
        const product = await productModel.findById(req.params.id).populate('category');
        res.status(200).json({
            success: true,
            data: product
        })
    } catch (error) {
        res.status(400).json({
            success:false
        });
    }    
     
};

exports.getAllProduct = async(req, res, next ) =>{
    
    try {
        let query;
        if (req.params.categoryId){
            query = productModel.find({
                category : req.params.categoryId
            });
        }
        else{
            query = productModel.find().populate('category');
        }
        const product = await query;
        res.status(200).json({
            success: true,
            count : product.length,
            data: product,
            msg: "Get all food"
        });
        
    } catch (error) {

        res.status(400).json({
            success:false
        });
        
    }
    
     
};
//@route post /api/v1/categories/:categoriesid/products
exports.createProduct = async(req, res, next ) =>{
   try {req.body.category = req.params.categoryId;
    const category = await categoryModel.findById(req.params.categoryId);
    const product  = await productModel.create(req.body);
    res.status(201).json({
       success: true,
       data: product
    });  
        }
    catch(error){
        res.status(400).json({success: false});
    }
};

exports.updateProduct = async(req, res, next ) =>{
    try { 
        let updatedProduct = await productModel.findById(req.params.id);
         if(!updatedProduct){
            return res.status(400).json({success: false});
         }
      product = await productModel.findByIdAndUpdate(req.params.id, req.body,{
        new : true,
        runValidators: true
      })
      res.status(200).json({success: true, data: updatedProduct});
        
    } catch (error) {
        res.status(400).json({success: false});
    }
     
};

exports.deleteProduct = async(req, res, next ) =>{

    try {
        const deletedProduct = await productModel.findById(req.params.id);
        if(!deletedProduct){

           return res.status(400).json({success: false});
        }
     await deletedProduct.deleteOne();
     res.status(200).json({success: true, data: {}});
      } catch (error) {
        res.status(400).json({success: false});
      }
       
     
};

exports.deleteAllProduct = async(req, res, next ) =>{

    try {
        const deletedFood = await Food.deleteMany({});
        if(!deletedFood){
           return res.status(400).json({success: false});
        }
     
     res.status(200).json({success: true, data: deletedFood});
      } catch (error) {
        res.status(400).json({success: false});
      }
    
};
