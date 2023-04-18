const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Protect routes
exports.protect =async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
    // Set token from cookie
  }
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  console.log(token);
  // Make sure token exists
  if (!token) {
   res.status(400).json({
    success: false,
    msg: 'Token Not Found'
   })
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await User.findById(decoded.userId);
    console.log("req:",req.user);
    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: 'Not authorized to access this route'
     })
  
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(400).json({
        success: false,
        msg: `User role ${req.user.role} is not authorized to access this route`
      });       
    } else {
      if (!res.headersSent) {
        next();
      }
    }
};

  // return (req, res, next) => {
   
  //   if (!roles.includes(req.user.role)) {
  //     res.status(400).json({
  //       success: false,
  //       msg:   `User role ${req.user.role} is not authorized to access this route`
  //      });       

  //   }
  //   next();
  // };
  
};

