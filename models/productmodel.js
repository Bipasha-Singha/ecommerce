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
    quantity:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        contentType:String
    },
    shipping:{
        type:Boolean
    }
})//,{timestamps:true})
module.exports = mongoose.model('product', productSchema);