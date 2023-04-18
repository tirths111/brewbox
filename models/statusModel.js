const mongoose =  require('mongoose');
const Schema  = mongoose.Schema;

const statusSchema = new mongoose.Schema({
    statusName : {
        type: String,
        require: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Status', statusSchema);