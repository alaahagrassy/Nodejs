const mongoose  = require("mongoose");

const {model}  = mongoose

const chartsSchema = new mongoose.Schema({

    Product:{
        type: mongoose.Schema.Types.ObjectId,ref:'Product'},
    Quntity:{
        type:Number, 
        default: 1 
    },
    userId:{
        required:false,
        type:mongoose.Schema.Types.ObjectId,ref:'User'
    },
})

const cartModel = model('cart', chartsSchema);

module.exports = cartModel