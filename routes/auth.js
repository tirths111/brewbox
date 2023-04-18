const express = require('express');

const {protect } = require('../middleware/auth');


const {register, sendOtp,verifyOtp, getMe,updateDetails,logOut} = require('../controllers/auth');

const router = express.Router();

router
.route('/register')
.post(register);

router
.route('/sendOtp')
.post(sendOtp);

router
.route('/verifyOtp')
.post(verifyOtp);


router
.route('/me')
.get(protect,getMe);

router
.route('/updateDetails')
.put(protect,updateDetails);

// router
// .route('/logOut')
// .get(logOut);

module.exports = router;

