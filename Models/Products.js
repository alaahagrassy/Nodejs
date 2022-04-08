const mongoose = require('mongoose');
const {model} = mongoose;
const ProductSchema = new mongoose.Schema({

    name:{
        required:true,
        type:String,
    },
    price: {
        required : true,
        type:Number,
    },
    description: {
        required:true,
        type:String
    },
    productImage:{required:true, type:String}
})


const ProductModel = model('Product', ProductSchema);


module.exports = ProductModel;