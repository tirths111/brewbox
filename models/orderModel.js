const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
        user: {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        total: {
            type : Number,
            require: true,
        },
        products: [{
            product_id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Product',
              required: true
            },
            quantity: {
              type: Number,
              required: true
            }
        }],
        status : {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'Status',
            require : true
        },
        createdAt:{
            type: Date,
            default: Date.now
        }
    });  

    orderSchema.post('findOneAndUpdate', async function(doc) {
        // Find the updated order document
        const order = await this.model.findOne({ _id: doc._id }).populate('products.product_id');
      
        // Calculate the new total
        let total = 0;
        order.products.forEach(product => {
          total += product.product_id.price * product.quantity;
        });
      
        // Update the total field in the order document
        await order.updateOne({ $set: { total } });
      });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
