const express = require('express');

const userRouter = express.Router({mergeParams : true});
const  {
    getUser,
    getAllUser,
    createUser,
    updateUser,
    deleteUser,
    deleteAllUser
} = require("../controllers/user-controller");

const orderRouter = require('./order-routes');
const {protect, authorize} = require('../middleware/auth');
userRouter.use('/:userId/orders' , orderRouter);
userRouter.use(protect);
userRouter.use(authorize("Admin"));
userRouter
    .route('/')
    .get(protect,getAllUser)
    .post(protect,createUser)
    .delete(protect,authorize('Admin'),deleteAllUser);

userRouter
    .route('/:id')
    .get(protect,getUser)
    .delete(protect,authorize('Admin'),deleteUser)
    .put(protect,updateUser);


module.exports= userRouter;