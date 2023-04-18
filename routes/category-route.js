const express = require('express');

const {protect, authorize} = require('../middleware/auth');

const categoryRouter = express.Router();
const  {
    getCategory,
    getAllCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    deleteAllCategory
    
} = require('../controllers/category-controller');

const productRouter = require("./product-routes");

categoryRouter.use('/:categoriesId/products', productRouter);

categoryRouter
    .route('/')
    .get(protect,getAllCategory)
    .post(protect, authorize('Admin'),createCategory)
    .delete(protect ,authorize('Admin'),deleteAllCategory);

categoryRouter
    .route('/:id')
    .get(protect,getCategory)
    .delete(protect ,authorize('Admin'),deleteCategory)
    .put(protect, authorize('Admin'),updateCategory);


module.exports= categoryRouter;