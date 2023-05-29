const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,"Please enter product name"]
        //trim: true
    },
    description:{
        type: String,
        required:[true,"Please enter product name"]
    },
    price:{
        type:Number,
        required:[true,"Please enter product name"]
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    quantity:{
        type:Number,
        required:true
    },
    image:{
        data:Buffer,
        contentType:String
    },
    shipping:{
        type:Boolean
    }
})//,{timestamps:true})
productSchema.index({ name: 'text', description: 'text' });
module.exports = mongoose.model('product', productSchema);