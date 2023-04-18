const User = require('../models/userModel');
const twilio = require('twilio');
const jwt = require('jsonwebtoken');




//@route post /api/v1/auth/register

exports.register = async(req, res, next) =>{
    const {
        firstName,
        lastName,
        phoneNumber,
        emailID,
        street1,
        street2,
        pin,
        state,
    } = req.body;


    const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        emailID: emailID,
        street1:street1,
        street2:street2 || "",
        pin:pin,
        state:state
    });

    sendTokenResponse(user , 200 ,  res);
};


//send otp post api/v1/auth/sendOtp
exports.sendOtp = async(req,res,next) =>{
    try {
        const { phoneNumber } = req.body;
    
        // Generate a random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
    
        // Save the OTP to the user's document in the database
        const user = await User.findOneAndUpdate(
          { phoneNumber },
          { otp },
          { new: true }
        );
    
        // Send the OTP via SMS using Twilio
        const twilioClient = twilio(
          process.env.TWILIO_ACCOUNT_SID,
          process.env.TWILIO_AUTH_TOKEN
        );
        const message = await twilioClient.messages.create({
          body: `Your OTP is: ${otp}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phoneNumber
        });
    
        res.status(200).json({ message: 'OTP sent successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
};

//verify otp post api/v1/auth/verfiyOtp
exports.verifyOtp = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    // Check if the OTP matches the one in the user's document in the database
    const user = await User.findOne({ phoneNumber, otp });
    if (!user) {
      res.status(400).json({ message: 'Invalid OTP' });
      return;
    }

    // Create a session for the user and store their information
    req.session.user = user;

    // Send a response to the client with the JWT token and session ID
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie('sessionId', req.session.id, { httpOnly: true });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// get current logged in user 
// get /api/v1/auth/me

exports.getMe  = async(req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success : true,
    data : user
  });
}

exports.updateDetails = async(req, res, next ) =>{
  try {
      const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body,{
          new: true,
          runValidators: true
       });
       console.log(updatedUser)
       if(!updatedUser){
          return res.status(400).json({success: false, msg : "Update user not found"});
       }
    
    res.status(200).json({success: true, data: updatedUser});
  } catch (error) {
       res.status(400).json({success: false, error: error.message});   
  }
   
};

exports.logOut = async (req, res, next) => {

  res.cookie('token' , 'none' , {
    expires : new Date(Date.now() + 10 * 1000),
    httpOnly : true
  });

  // req.session.destroy((err) => {
  //   if (err) {
  //     console.error(err);
  //     return res.status(500).send('Failed to log out');
  //   }
  //   // If the session was successfully destroyed, send a 200 OK response
  //   res.clearCookie('sessionId');
  //   res.status(200).json({
  //     success : true,
  //     message : "Logged out successfully"
  //   });
  // });
};

const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};