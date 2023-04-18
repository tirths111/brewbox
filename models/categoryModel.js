const mongoose =  require('mongoose');
const Schema  = mongoose.Schema;

const categorySchema  = new Schema({

    name : {
        type : String,
        require : [true , "Please specify the name"],
        trim: true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }

},
{
toJSON: {
    virtuals: true
},
toObject: {
    virtuals: true
}
});
categorySchema.virtual('products',{
    ref: 'Product',
    localField: '_id',
    foreignField: 'category',
    justOne: false
});

categorySchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    console.log(`products being removed from bootcamp ${this._id}`);
    await this.model('Product').deleteMany({ category: this._id });
    next();
});

module.exports = mongoose.model('Category', categorySchema);