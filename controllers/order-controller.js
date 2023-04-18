
const Order = require("../models/orderModel");

const User = require('../models/userModel');

exports.getOrder = async(req, res, next) =>{
   try {
      const order = await Order
                           .findById(req.params.id)
                           .populate('status')
                           .populate('user')
                           .populate({
                              path : 'product',
                              populate : {
                                 path : 'category',
                                 model : 'Category'
                              }
                           });
      res.status(200).json({
          success: true,
          count : order.length,
          data: order
      })
  } catch (error) {
      res.status(400).json({
          success:false
      });
  }
}

exports.getAllOrder = async (req, res, next ) =>{
   try {
      const order =  await Order.find()
                                 .populate('status')
                                 .populate('user')
                                 .populate({
                                    path : 'product',
                                    populate : {
                                       path : 'category',
                                       model : 'Category'
                                    }
      });
      res.status(200).json({
          success: true,
          count : order.length,
          data: order,
          msg: "Get all Order"
      });
      
  } catch (error) {

      res.status(400).json({
          success:false
      });
      
  }
        
}

exports.getUserOrders = async (req, res) => {
   const { userId } = req.params;
 
   try {
     const orders = await Order.find({ user: userId })
       .populate('user', 'firstName lastName')
       .populate('products.product_id')
       .populate('status');
 
     res.json({ orders });
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 };
 
 


//create order
exports.createOrder = async (req, res) => {
   const userId  = req.params.userId;
   console.log(userId);
   const { products, total, status } = req.body;
 
   try {
     const order = new Order({
       user: userId,
       products: products,
       total: total,
       status: status,
     });
 
     const savedOrder = await order.save();
 
     res.status(201).json(savedOrder );
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 };
 

//update order

exports.updateOrder = async(req, res, next ) =>{
 try {
   const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body,{
      new: true,
      runValidators: true
   });
   if(!updatedOrder){
      return res.status(400).json({success: false});
   }

res.status(200).json({success: true, data: updatedOrder});
 } catch (error) {
   res.status(400).json({success: false});
 }
     
};


// Delete Order
exports.deleteOrder =async(req, res, next ) =>{

   try {
      const deletedOrder = await Order.findByIdAndDelete(req.params.id);
      if(!deletedOrder){
         return res.status(400).json({success: false});
      }
   
   res.status(200).json({success: true, data: {}});
    } catch (error) {
      res.status(400).json({success: false});
    }
     
};


exports.deleteAllOrder = async(req, res, next ) =>{

   try {
       const deletedOrder = await Order.deleteMany({});
       if(!deletedOrder){
          return res.status(400).json({success: false});
       }
    
    res.status(200).json({success: true, data: deletedOrder});
     } catch (error) {
       res.status(400).json({success: false, error : error.message});
     }
   
};

