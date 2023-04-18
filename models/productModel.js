const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
        name: {
            type : String,
            require: [true, "Please Enter Name"],
            unique: true
        },
        price: {
            type : Number,
            require: [true, "Please Enter Price"]
        },
        photo: {
            type : String,
            default: "no-photo.jpg"
        },
        category: {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            require: [true, "Please Enter Category"],
        },
        createdAt:{
            type: Date,
            default: Date.now
        }
    });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;






