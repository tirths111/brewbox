const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const userSchema = new Schema({
        firstName: {
            type : String,
            require: [true,"Please Enter First Name"]
        },
        lastName: {
            type : String,
            require: [true,"Please Enter Last Name"]
        },
        phoneNumber: {
            type : Number,
            match:[/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im],
            require: [true,"Please Enter Valid Phone Number "],
            unique: true
        },
        emailID: {
            type : String,
            match: [/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/],
            require: [true,"Please Enter Valid Email Id "],
            unique: true
        },
        street1: {
            type : String,
            require: [true,"Please Enter Address "]
        },
        street2: {
            type : String,
        },
        pin: {
            type : Number,
            require: [true,"Please Enter Pin"]
        },
        state:{
            type : String,
            require: [true,"Please Enter State "]
        },
        role: {
            type : String,
            enum: ['User','Admin'],
            default: 'User',
            require: true
        },
        orders: [{
            type : mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        }],
        otp: {
            type : String
        },
        createdAt:{
            type: Date,
            default: Date.now
        }
    });
// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
const User = mongoose.model('User', userSchema);
module.exports = User;
