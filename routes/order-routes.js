const express = require('express');
const {protect,authorize} = require('../middleware/auth');
const orderRouter = express.Router({mergeParams : true});
const  {
    getOrder,
    getAllOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    deleteAllOrder,
    getUserOrders
} = require("../controllers/order-controller");

orderRouter
    .route('/')
    .get(getUserOrders)
    .post(protect,authorize('User','Admin'),createOrder);

orderRouter
    .route('/all')
    .get(protect,authorize('Admin'),getAllOrder)
    .delete(protect,authorize('Admin'),deleteAllOrder);

orderRouter
    .route('/:id')
    .get(protect,authorize('Admin'),getOrder)
    .delete(protect,authorize('Admin'),deleteOrder)
    .put(protect,authorize('Admin'),updateOrder);


module.exports= orderRouter;