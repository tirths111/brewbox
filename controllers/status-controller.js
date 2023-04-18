
const Order = require("../models/statusModel");

exports.getStatus = async(req, res, next) =>{
   try {
      const order = await Order.findById(req.params.id);
      res.status(200).json({
          success: true,
          data: order
      })
  } catch (error) {
      res.status(400).json({
          success:false
      });
  }
}

exports.getAllStatus = async (req, res, next ) =>{
   try {
      const order = await Order.find();
      res.status(200).json({
          success: true,
          data: order,
          msg: "Get all Order"
      });
      
  } catch (error) {

      res.status(400).json({
          success:false
      });
      
  }
        
}
//create order
exports.createStatus = async(req, res, next ) =>{
 const order  = await Order.create(req.body);
 
 res.status(201).json({
    success: true,
    data: order
 });  
     
};

//update order

exports.updateStatus = async(req, res, next ) =>{
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
exports.deleteStatus =async(req, res, next ) =>{

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
exports.deleteAllStatus = async(req, res, next ) =>{

   try {
       const deletedOrder = await Food.deleteMany({});
       if(!deletedOrder){
          return res.status(400).json({success: false});
       }
    
    res.status(200).json({success: true, data: deletedOrder});
     } catch (error) {
       res.status(400).json({success: false});
     }
   
};

