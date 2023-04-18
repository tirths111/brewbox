const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');


//Loading env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Category = require('./models/categoryModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const User = require('./models/userModel');
const Status = require('./models/statusModel');


// connect db
mongoose.connect(process.env.MONGO_URI);

//read json files
const category = JSON.parse(
    fs.readFileSync(`${__dirname}/data/category.json`, 'utf-8')
);

const product = JSON.parse(
    fs.readFileSync(`${__dirname}/data/product.json`, 'utf-8')
);

const order = JSON.parse(
    fs.readFileSync(`${__dirname}/data/Order.json`, 'utf-8')
);

const user = JSON.parse(
    fs.readFileSync(`${__dirname}/data/User.json`, 'utf-8')
);

const status = JSON.parse(
    fs.readFileSync(`${__dirname}/data/status.json`, 'utf-8')
);

//import db
const importData = async () => {
    try {
        
      //  await Category.create(category);

        console.log(" Category Data imported successfully".green.inverse);

       // await Product.create(product);

        console.log("Product Data imported successfully".green.inverse);

      //  await Order.create(order);

        console.log("Order Data imported successfully".green.inverse);

        await User.create(user);

        console.log("User Data imported successfully".green.inverse);

       // await Status.create(status);

        console.log("Status Data imported successfully".green.inverse);

        process.exit();

    } catch (error) {

        console.log(error);
        
    }
}

//delete db
const deleteData = async () => {
    try {
        
        // await Category.deleteMany({});

        // await Product.deleteMany({});

        // await Status.deleteMany({});

        await User.deleteMany({});

       // await Order.deleteMany({});

        console.log("Data deleted successfully".red.inverse);

        process.exit();

    } catch (error) {

        console.log(error);
        
    }
}

if (process.argv[2] === '-i') {

    importData();

} else if (process.argv[2] === '-d') {
    
    deleteData();

}