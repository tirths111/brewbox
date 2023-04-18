const express = require('express');
const {protect,authorize} = require('../middleware/auth');
const productRouter = express.Router( {mergeParams : true}); 
const  {
    getProduct,
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteAllProduct
    
} = require('../controllers/product-controller');

productRouter
    .route('/')
    .get(protect,getAllProduct)
    .post(protect,authorize('Admin'),createProduct)
    .delete(protect,authorize('Admin'),deleteAllProduct);

productRouter
    .route('/:id')
    .get(protect,getProduct)
    .delete(protect,authorize('Admin'),deleteProduct)
    .put(protect,authorize('Admin'),updateProduct);


module.exports= productRouter;