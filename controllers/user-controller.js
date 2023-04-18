const User = require("../models/userModel");


exports.getUser = async(req, res, next ) =>{
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            count: user.length,
            data: user
        })
    } catch (error) {
        res.status(400).json({
            success:false
        });
    }
};

exports.getAllUser = async(req, res, next ) =>{
    let headersSent = false;

try {
  const user = await User.find();
  if (!headersSent) {
    res.status(200).json({
      success: true,
      count : user.length,
      data: user,
      msg: "Get all User"
    });
    headersSent = true;
  }
} catch (error) {
  if (!headersSent) {
    res.status(400).json({
      success:false,
      error : error.message
    });
    headersSent = true;
  }
}

    // try {
    //     const user = await User.find();
    //     res.status(200).json({
    //         success: true,
    //         count : user.length,
    //         data: user,
    //         msg: "Get all User"
    //     });
        
    // } catch (error) {
  
    //     res.status(400).json({
    //         success:false,
    //         error : error.message
    //     });
        
    // }
     
};

exports.createUser = async(req, res, next ) =>{
    try {
      const user = await User.create(req.body);
  
      res.status(201).json({
        success: true,
        data: user
      });  
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  };
  
  exports.updateUser = async(req, res, next ) =>{
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true
      });
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }
    
      res.status(200).json({
        success: true,
        data: updatedUser
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });   
    } 
  };
  
  exports.deleteUser = async(req, res, next ) =>{
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }
   
      res.status(200).json({
        success: true,
        data: {}
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    } 
  };
  
  exports.deleteAllUser = async(req, res, next ) =>{
    try {
      const deletedAllUser = await User.deleteMany({});
      if (!deletedAllUser) {
        return res.status(404).json({
          success: false,
          error: 'No users found'
        });
      }
   
      res.status(200).json({
        success: true,
        data: deletedAllUser
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    } 
  };
  
// exports.createUser = async(req, res, next ) =>{
//     const user  = await User.create(req.body);
 
//     res.status(201).json({
//        success: true,
//        data: user
//     });  
        
// };

// exports.updateUser = async(req, res, next ) =>{
//     try {
//         const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body,{
//             new: true,
//             runValidators: true
//          });
//          if(!updatedUser){
//             return res.status(400).json({success: false});
//          }
      
//       res.status(200).json({success: true, data: updatedUser});
//     } catch (error) {
//          res.status(400).json({success: false});   
//     }
     
// };

// exports.deleteUser =async(req, res, next ) =>{

//     try {
//         const deletedUser = await User.findByIdAndDelete(req.params.id);
//         if(!deletedUser){
//            return res.status(400).json({success: false});
//         }
     
//      res.status(200).json({success: true, data: {}});
//       } catch (error) {
//         res.status(400).json({success: false});
//       }
     
// };
// exports.deleteAllUser = async(req, res, next ) =>{

//     try {
//         const deletedAllUser = await User.deleteMany({});
//         if(!deletedAllUser){
//            return res.status(400).json({success: false});
//         }
     
//      res.status(200).json({success: true, data: deletedAllUser});
//       } catch (error) {
//         res.status(400).json({success: false , error : error.message});
//       }
    
//  };