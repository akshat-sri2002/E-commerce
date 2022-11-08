const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String
        // required:true
    },
    imageUrl:{
        type:String
    },
    brand:{
        type:String
        // required:true
    },
    price:{
        type:Number
        // required:true
    },
    description:{
        type:String
        // required:true
    },
    specification:{
        type:String
        // required:true
    },
    rating:{
        type:Number,
        max:5,
        default:0
    },
    review:{
        type:String
        // required:true
    },
    quantity:{
        type:Number,
        default:0
    },
    category:{
        type:String
    },
    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})

module.exports =  new mongoose.model('product',productSchema)